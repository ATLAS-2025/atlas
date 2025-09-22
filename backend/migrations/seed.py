import asyncio
from datetime import datetime
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

# ✅ Same DB URL as in alembic.ini
DATABASE_URL = "postgresql+asyncpg://postgres:password123@127.0.0.1:5432/fastapi-db"
engine = create_async_engine(DATABASE_URL, echo=True)

async def seed():
    async with engine.begin() as conn:
        # --- Clear existing data (optional) ---
        await conn.execute(
            text(
                "TRUNCATE test_category_people, test_category_equipment, test_categories, "
                "project_tests, projects, equipment, people, cameras, sensors, documents, users "
                "RESTART IDENTITY CASCADE"
            )
        )

        # --- Seed Users ---
        await conn.execute(
            text(
                """
            INSERT INTO users (uuid, email, password, username, is_admin, created_at, updated_at)
            VALUES
            (gen_random_uuid(), 'commander@military.com', 'securepass', 'commander', TRUE, NOW(), NOW()),
            (gen_random_uuid(), 'operator@military.com', 'securepass', 'operator1', FALSE, NOW(), NOW()),
            (gen_random_uuid(), 'analyst@military.com', 'securepass', 'analyst', FALSE, NOW(), NOW()),
            (gen_random_uuid(), 'pilot@military.com', 'securepass', 'pilot', FALSE, NOW(), NOW()),
            (gen_random_uuid(), 'engineer@military.com', 'securepass', 'engineer', FALSE, NOW(), NOW())
        """
            )
        )

        # --- Seed People ---
        await conn.execute(
            text(
                """
            INSERT INTO people (name, role, email, phone, organization, calendar_integration_id)
            VALUES
            ('Captain John Miller', 'Radar Officer', 'john.miller@military.com', '+10000001', 'Air Defense', NULL),
            ('Lt. Sarah Connor', 'Comms Specialist', 'sarah.connor@military.com', '+10000002', 'Signal Corps', NULL),
            ('Sgt. Alex Turner', 'Special Forces', 'alex.turner@military.com', '+10000003', 'SpecOps', NULL),
            ('WO2 Maria Lopez', 'Drone Operator', 'maria.lopez@military.com', '+10000004', 'UAV Unit', NULL),
            ('Cpt. Mark Benson', 'Intelligence Officer', 'mark.benson@military.com', '+10000005', 'Intel Unit', NULL)
        """
            )
        )

        # --- Seed Equipment ---
        await conn.execute(
            text(
                """
            INSERT INTO equipment (name, type, manufacturer, model, serial_number, location, notes)
            VALUES
            ('AN/TPS-77 Radar', 'Radar System', 'Lockheed Martin', 'TPS-77', 'RADAR-001', 'Airbase Alpha', 'Long-range radar'),
            ('Harris Falcon III', 'Radio', 'L3Harris', 'Falcon III', 'RADIO-001', 'Command Post', 'Encrypted communications'),
            ('AN/PVS-31 NVG', 'Night Vision', 'Elbit Systems', 'PVS-31', 'NVG-001', 'SpecOps Unit', 'Night vision goggles'),
            ('MQ-9 Reaper', 'Drone', 'General Atomics', 'MQ-9', 'DRONE-001', 'UAV Hangar', 'Surveillance drone'),
            ('Radar Jammer RJ-1', 'Electronic Warfare', 'Raytheon', 'RJ-1', 'EW-001', 'Airbase Alpha', 'Jamming radar signals')
        """
            )
        )

        # --- Seed Cameras ---
        await conn.execute(
            text(
                """
            INSERT INTO cameras (name, model, resolution, serial_number, notes)
            VALUES
            ('Surveillance Cam A', 'Canon XF705', '4K', 'CAM-001', 'Airbase perimeter cam'),
            ('Recon Cam B', 'Sony PXW-Z90V', 'HD', 'CAM-002', 'Recon training cam'),
            ('Recon Cam C', 'Panasonic HC-X1', '4K', 'CAM-003', 'Perimeter monitoring'),
            ('Drone Cam D', 'DJI Zenmuse X7', '6K', 'CAM-004', 'Drone-mounted cam'),
            ('Observation Cam E', 'Blackmagic URSA', '4K', 'CAM-005', 'Observation post')
        """
            )
        )

        # --- Seed Sensors ---
        await conn.execute(
            text(
                """
            INSERT INTO sensors (name, type, model, serial_number, calibration_date, notes)
            VALUES
            ('Thermal Sensor T1', 'Thermal', 'FLIR T860', 'SENS-001', NOW(), 'Used for heat signature detection'),
            ('LIDAR Scanner L2', 'Lidar', 'Velodyne VLP-16', 'SENS-002', NOW(), 'Terrain scanning lidar'),
            ('Motion Detector M3', 'Motion', 'Bosch M3', 'SENS-003', NOW(), 'Detects intrusions'),
            ('Acoustic Sensor A4', 'Acoustic', 'Honeywell AS-4', 'SENS-004', NOW(), 'Gunshot detection'),
            ('Pressure Sensor P5', 'Pressure', 'Siemens PS-5', 'SENS-005', NOW(), 'Perimeter breach detection')
        """
            )
        )

        # --- Seed Documents ---
        await conn.execute(
            text(
                """
            INSERT INTO documents (name, file_path, type, description, uploaded_at)
            VALUES
            ('Mission Brief - Iron Shield', '/docs/iron_shield.pdf', 'PDF', 'Air defense coordination mission briefing', NOW()),
            ('Recon Plan - Silent Dagger', '/docs/silent_dagger.pdf', 'PDF', 'Covert ops recon mission plan', NOW()),
            ('Intel Report - Night Hawk', '/docs/night_hawk.pdf', 'PDF', 'Special ops intel report', NOW()),
            ('Drone Ops Manual', '/docs/drone_ops.pdf', 'PDF', 'UAV operational procedures', NOW()),
            ('Comm Protocols', '/docs/comm_protocols.pdf', 'PDF', 'Secure communications guidelines', NOW())
        """
            )
        )

        # --- Seed Projects ---
        await conn.execute(
            text(
                """
            INSERT INTO projects (date, title, subtitle, project_type, created_at, updated_at)
            VALUES
            (:d1, 'Operation Iron Shield', 'Air defense coordination', 'Military Exercise', NOW(), NOW()),
            (:d2, 'Operation Silent Dagger', 'Covert reconnaissance mission', 'Special Ops', NOW(), NOW()),
            (:d3, 'Operation Night Hawk', 'Special ops intel', 'Special Ops', NOW(), NOW()),
            (:d4, 'Operation Eagle Eye', 'UAV surveillance', 'Reconnaissance', NOW(), NOW()),
            (:d5, 'Operation Secure Comm', 'Comm security upgrade', 'Communications', NOW(), NOW())
        """
            ),
            {
                "d1": datetime(2025, 9, 20),
                "d2": datetime(2025, 9, 25),
                "d3": datetime(2025, 9, 28),
                "d4": datetime(2025, 9, 30),
                "d5": datetime(2025, 10, 2),
            },
        )

        # --- Seed Project Tests ---
        await conn.execute(
            text(
                """
            INSERT INTO project_tests (project_id, schedule, safety, maps, simulation, summary, created_at, updated_at)
            VALUES
            (1, 'Simulated drills on 2025-09-21', 'Live ammo safety enforced', 'Air defense maps', 'Radar simulation', 'Initial deployment test', NOW(), NOW()),
            (2, 'Night ops scheduled for 2025-09-26', 'Stealth training with safety measures', 'Recon maps', 'Drone simulation', 'Covert test mission', NOW(), NOW()),
            (3, 'Intel mission on 2025-09-29', 'Secure data handling', 'Ops maps', 'Intel simulation', 'Recon & intel test', NOW(), NOW()),
            (4, 'UAV patrols 2025-10-01', 'Drone safety protocols', 'Surveillance maps', 'UAV simulation', 'Drone patrol test', NOW(), NOW()),
            (5, 'Comm system upgrade on 2025-10-03', 'Encryption verification', 'Comm maps', 'Network simulation', 'Communication security test', NOW(), NOW())
        """
            )
        )

        # --- Seed Test Categories ---
        await conn.execute(
            text(
                """
            INSERT INTO test_categories (name, test_id, created_at, updated_at)
            VALUES
            ('Missile Tracking', 1, NOW(), NOW()),
            ('Communication Systems', 1, NOW(), NOW()),
            ('Stealth Navigation', 2, NOW(), NOW()),
            ('Drone Surveillance', 2, NOW(), NOW()),
            ('Intel Analysis', 3, NOW(), NOW()),
            ('UAV Operations', 4, NOW(), NOW()),
            ('Comm Encryption', 5, NOW(), NOW())
        """
            )
        )

        # --- Assign Equipment ---
        await conn.execute(
            text(
                """
            INSERT INTO test_category_equipment (category_id, equipment_id, created_at, updated_at)
            VALUES
            (1, 1, NOW(), NOW()), -- Radar
            (2, 2, NOW(), NOW()), -- Radio
            (3, 3, NOW(), NOW()), -- Night Vision
            (4, 4, NOW(), NOW()), -- Drone
            (5, 5, NOW(), NOW())  -- Radar Jammer
        """
            )
        )

        # --- Assign People ---
        await conn.execute(
            text(
                """
            INSERT INTO test_category_people (category_id, people_id, created_at, updated_at)
            VALUES
            (1, 1, NOW(), NOW()), -- Radar officer
            (2, 2, NOW(), NOW()), -- Comms specialist
            (3, 3, NOW(), NOW()), -- Special forces
            (4, 4, NOW(), NOW()), -- Drone operator
            (5, 5, NOW(), NOW())  -- Intel officer
        """
            )
        )

    print("✅ Military seed data inserted successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
