import asyncio
from datetime import datetime
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
import uuid 
from dotenv import load_dotenv
import os
from passlib.context import CryptContext # <-- Import CryptContext

# Define the Password Handler (as provided in your prompt)
class PasswordHandler:
    pwd_context = CryptContext(
        schemes=["bcrypt"],
        deprecated="auto",
    )

    @staticmethod
    def hash(password: str):
        return PasswordHandler.pwd_context.hash(password)

    @staticmethod
    def verify(hashed_password, plain_password):
        return PasswordHandler.pwd_context.verify(plain_password, hashed_password)


# Load environment variables from .env
load_dotenv()
# Note: The output shows 'sqlite+aiosqlite:///./db.sqlite'
DATABASE_URL=os.getenv("DATABASE_URL")
engine = create_async_engine(DATABASE_URL, echo=True)
SECURE_PASSWORD = 'securepass'
# ⚠️ This is the crucial step: hash the password before inserting
HASHED_PASSWORD = PasswordHandler.hash(SECURE_PASSWORD) 
async def seed():
    # --- Python-side Data Generation for SQLite compatibility ---
    # Generate the current timestamp once for all 'created_at'/'updated_at' fields
    now = datetime.now()

    # Prepare user data and generate UUIDs in Python
    users_data = [
        (str(uuid.uuid4()),'commander@military.com', 'commander', True),
        (str(uuid.uuid4()),'operator@military.com', 'operator1', False),
        (str(uuid.uuid4()),'analyst@military.com','analyst', False),
        (str(uuid.uuid4()),'pilot@military.com', 'pilot', False),
        (str(uuid.uuid4()),'engineer@military.com', 'engineer', False),
    ]

    # Create a list of dictionaries for bulk insertion
    users_values = [
        {
            "id": index+1,
            "uuid": uuid, # Use Python's uuid.uuid4()
            "email": email,
            "password": HASHED_PASSWORD,
            "username": username,
            "is_admin": is_admin,
            "created_at": now,
            "updated_at": now
        }
        for   index,(uuid, email, username, is_admin) in enumerate(users_data)
    ]
    # -----------------------------------------------------------

    async with engine.begin() as conn:
        # --- Clear existing data (optional) ---
        # await conn.execute(
        #     text(
        #         "TRUNCATE test_category_people, test_category_equipment, test_categories, "
        #         "project_tests, projects, equipment, people, cameras, sensors, documents, users "
        #         "RESTART IDENTITY CASCADE"
        #     )
        # )

        # --- Seed Users ---
        # Parameters (:uuid, :created_at, :updated_at) replace SQL functions
        for params in users_values:
            await conn.execute(
                text(
                    """
                INSERT INTO users ( uuid, email, password, username, is_admin, created_at, updated_at)
                VALUES ( :uuid, :email, :password, :username, :is_admin, :created_at, :updated_at)
                """
                ),
                params, # Execute one row at a time
            )

        # --- Seed People ---
        # Note: Added 'created_at' and 'updated_at' columns for consistency, parameterized with :now
        await conn.execute(
            text(
                """
            INSERT INTO people (name, role, email, phone, organization, calendar_integration_id, created_at, updated_at)
            VALUES
            ('Captain John Miller', 'Radar Officer', 'john.miller@military.com', '+10000001', 'Air Defense', NULL, :now, :now),
            ('Lt. Sarah Connor', 'Comms Specialist', 'sarah.connor@military.com', '+10000002', 'Signal Corps', NULL, :now, :now),
            ('Sgt. Alex Turner', 'Special Forces', 'alex.turner@military.com', '+10000003', 'SpecOps', NULL, :now, :now),
            ('WO2 Maria Lopez', 'Drone Operator', 'maria.lopez@military.com', '+10000004', 'UAV Unit', NULL, :now, :now),
            ('Cpt. Mark Benson', 'Intelligence Officer', 'mark.benson@military.com', '+10000005', 'Intel Unit', NULL, :now, :now)
            """
            ),
            {"now": now},
        )

        # --- Seed Equipment ---
        # Note: Added 'created_at' and 'updated_at' columns for consistency, parameterized with :now
        await conn.execute(
            text(
                """
            INSERT INTO equipment (name, type, manufacturer, model, serial_number, location, notes, created_at, updated_at)
            VALUES
            ('AN/TPS-77 Radar', 'Radar System', 'Lockheed Martin', 'TPS-77', 'RADAR-001', 'Airbase Alpha', 'Long-range radar', :now, :now),
            ('Harris Falcon III', 'Radio', 'L3Harris', 'Falcon III', 'RADIO-001', 'Command Post', 'Encrypted communications', :now, :now),
            ('AN/PVS-31 NVG', 'Night Vision', 'Elbit Systems', 'PVS-31', 'NVG-001', 'SpecOps Unit', 'Night vision goggles', :now, :now),
            ('MQ-9 Reaper', 'Drone', 'General Atomics', 'MQ-9', 'DRONE-001', 'UAV Hangar', 'Surveillance drone', :now, :now),
            ('Radar Jammer RJ-1', 'Electronic Warfare', 'Raytheon', 'RJ-1', 'EW-001', 'Airbase Alpha', 'Jamming radar signals', :now, :now)
            """
            ),
            {"now": now},
        )

        # --- Seed Cameras ---
        # Note: Added 'created_at' and 'updated_at' columns for consistency, parameterized with :now
        await conn.execute(
            text(
                """
            INSERT INTO cameras (name, model, resolution, serial_number, notes, created_at, updated_at)
            VALUES
            ('Surveillance Cam A', 'Canon XF705', '4K', 'CAM-001', 'Airbase perimeter cam', :now, :now),
            ('Recon Cam B', 'Sony PXW-Z90V', 'HD', 'CAM-002', 'Recon training cam', :now, :now),
            ('Recon Cam C', 'Panasonic HC-X1', '4K', 'CAM-003', 'Perimeter monitoring', :now, :now),
            ('Drone Cam D', 'DJI Zenmuse X7', '6K', 'CAM-004', 'Drone-mounted cam', :now, :now),
            ('Observation Cam E', 'Blackmagic URSA', '4K', 'CAM-005', 'Observation post', :now, :now)
            """
            ),
            {"now": now},
        )

        # --- Seed Sensors ---
        # :now parameter replaces NOW() for 'calibration_date', 'created_at', 'updated_at'
        await conn.execute(
            text(
                """
            INSERT INTO sensors (name, type, model, serial_number, calibration_date, notes, created_at, updated_at)
            VALUES
            ('Thermal Sensor T1', 'Thermal', 'FLIR T860', 'SENS-001', :now, 'Used for heat signature detection', :now, :now),
            ('LIDAR Scanner L2', 'Lidar', 'Velodyne VLP-16', 'SENS-002', :now, 'Terrain scanning lidar', :now, :now),
            ('Motion Detector M3', 'Motion', 'Bosch M3', 'SENS-003', :now, 'Detects intrusions', :now, :now),
            ('Acoustic Sensor A4', 'Acoustic', 'Honeywell AS-4', 'SENS-004', :now, 'Gunshot detection', :now, :now),
            ('Pressure Sensor P5', 'Pressure', 'Siemens PS-5', 'SENS-005', :now, 'Perimeter breach detection', :now, :now)
            """
            ),
            {"now": now},
        )

        # --- Seed Documents ---
        # :now parameter replaces NOW() for 'uploaded_at', 'created_at', 'updated_at'
        await conn.execute(
            text(
                """
            INSERT INTO documents (name, file_path, type, description, uploaded_at, created_at, updated_at)
            VALUES
            ('Mission Brief - Iron Shield', '/docs/iron_shield.pdf', 'PDF', 'Air defense coordination mission briefing', :now, :now, :now),
            ('Recon Plan - Silent Dagger', '/docs/silent_dagger.pdf', 'PDF', 'Covert ops recon mission plan', :now, :now, :now),
            ('Intel Report - Night Hawk', '/docs/night_hawk.pdf', 'PDF', 'Special ops intel report', :now, :now, :now),
            ('Drone Ops Manual', '/docs/drone_ops.pdf', 'PDF', 'UAV operational procedures', :now, :now, :now),
            ('Comm Protocols', '/docs/comm_protocols.pdf', 'PDF', 'Secure communications guidelines', :now, :now, :now)
            """
            ),
            {"now": now},
        )

        # --- Seed Projects ---
        # :now parameter replaces NOW() for timestamps
        await conn.execute(
            text(
                """
            INSERT INTO projects (date, title, subtitle, project_type, created_at, updated_at)
            VALUES
            (:d1, 'Operation Iron Shield', 'Air defense coordination', 'Military Exercise', :now, :now),
            (:d2, 'Operation Silent Dagger', 'Covert reconnaissance mission', 'Special Ops', :now, :now),
            (:d3, 'Operation Night Hawk', 'Special ops intel', 'Special Ops', :now, :now),
            (:d4, 'Operation Eagle Eye', 'UAV surveillance', 'Reconnaissance', :now, :now),
            (:d5, 'Operation Secure Comm', 'Comm security upgrade', 'Communications', :now, :now)
            """
            ),
            {
                "d1": datetime(2025, 9, 20),
                "d2": datetime(2025, 9, 25),
                "d3": datetime(2025, 9, 28),
                "d4": datetime(2025, 9, 30),
                "d5": datetime(2025, 10, 2),
                "now": now, # Pass the Python 'now' object
            },
        )

        # --- Seed Project Tests ---
        # :now parameter replaces NOW() for timestamps
        await conn.execute(
            text(
                """
            INSERT INTO project_tests (project_id, schedule, safety, maps, simulation, summary, created_at, updated_at)
            VALUES
            (1, 'Simulated drills on 2025-09-21', 'Live ammo safety enforced', 'Air defense maps', 'Radar simulation', 'Initial deployment test', :now, :now),
            (2, 'Night ops scheduled for 2025-09-26', 'Stealth training with safety measures', 'Recon maps', 'Drone simulation', 'Covert test mission', :now, :now),
            (3, 'Intel mission on 2025-09-29', 'Secure data handling', 'Ops maps', 'Intel simulation', 'Recon & intel test', :now, :now),
            (4, 'UAV patrols 2025-10-01', 'Drone safety protocols', 'Surveillance maps', 'UAV simulation', 'Drone patrol test', :now, :now),
            (5, 'Comm system upgrade on 2025-10-03', 'Encryption verification', 'Comm maps', 'Network simulation', 'Communication security test', :now, :now)
            """
            ),
            {"now": now},
        )

        # --- Seed Test Categories ---
        # :now parameter replaces NOW() for timestamps
        await conn.execute(
            text(
                """
            INSERT INTO test_categories (name, test_id, created_at, updated_at)
            VALUES
            ('Missile Tracking', 1, :now, :now),
            ('Communication Systems', 1, :now, :now),
            ('Stealth Navigation', 2, :now, :now),
            ('Drone Surveillance', 2, :now, :now),
            ('Intel Analysis', 3, :now, :now),
            ('UAV Operations', 4, :now, :now),
            ('Comm Encryption', 5, :now, :now)
            """
            ),
            {"now": now},
        )

        # --- Assign Equipment ---
        # :now parameter replaces NOW() for timestamps
        await conn.execute(
            text(
                """
            INSERT INTO test_category_equipment (category_id, equipment_id, created_at, updated_at)
            VALUES
            (1, 1, :now, :now), -- Radar
            (2, 2, :now, :now), -- Radio
            (3, 3, :now, :now), -- Night Vision
            (4, 4, :now, :now), -- Drone
            (5, 5, :now, :now)  -- Radar Jammer
            """
            ),
            {"now": now},
        )

        # --- Assign People ---
        # :now parameter replaces NOW() for timestamps
        await conn.execute(
            text(
                """
            INSERT INTO test_category_people (category_id, people_id, created_at, updated_at)
            VALUES
            (1, 1, :now, :now), -- Radar officer
            (2, 2, :now, :now), -- Comms specialist
            (3, 3, :now, :now), -- Special forces
            (4, 4, :now, :now), -- Drone operator
            (5, 5, :now, :now)  -- Intel officer
            """
            ),
            {"now": now},
        )

    print("✅ Military seed data inserted successfully!")

if __name__ == "__main__":
    asyncio.run(seed())