import platform
from pydantic import BaseSettings, RedisDsn
from dotenv import load_dotenv
import os
import sys
import tempfile
import shutil

def get_persistent_app_dir(app_name="Atlas"):
    system = platform.system()
    
    if system == "Windows":
        base_dir = os.getenv("APPDATA")  # usually C:\Users\<user>\AppData\Roaming
    elif system == "Darwin":  # macOS
        base_dir = os.path.join(os.path.expanduser("~"), "Library", "Application Support")
    else:  # Linux/Other
        base_dir = os.path.join(os.path.expanduser("~"), f".{app_name.lower()}")

    app_dir = os.path.join(base_dir, app_name)
    os.makedirs(app_dir, exist_ok=True)
    return app_dir

print("=== STARTING APPLICATION ===")
print(f"Running frozen/exe: {getattr(sys, 'frozen', False)}")
print(f"Python executable: {sys.executable}")
print(f"Current working directory: {os.getcwd()}")

# -----------------------------
# 1️⃣ Load .env from persistent path if running exe
# -----------------------------
def load_env():
    print("\n[ENV] Loading .env...")
    if getattr(sys, "frozen", False):
        # Running from PyInstaller exe, use persistent folder
        app_data_dir = get_persistent_app_dir("Atlas")
        persistent_env_path = os.path.join(app_data_dir, ".env")

        # Copy embedded .env to persistent folder on first run
        bundle_env_path = os.path.join(sys._MEIPASS, ".env")
        if not os.path.exists(persistent_env_path):
            if os.path.exists(bundle_env_path):
                shutil.copyfile(bundle_env_path, persistent_env_path)
                print(f"[ENV] Copied embedded .env to persistent path: {persistent_env_path}")
            else:
                print("[ENV] No embedded .env found in bundle")
        else:
            print(f"[ENV] Using existing persistent .env: {persistent_env_path}")

        # Load the persistent .env
        load_dotenv(persistent_env_path)
        print(f"[ENV] Loaded .env from persistent path: {persistent_env_path}")
        os.environ["PERSISTENT_ENV_PATH"] = persistent_env_path
    else:
        # Normal script: load from cwd if exists
        dotenv_path = os.path.join(os.getcwd(), ".env")
        if os.path.exists(dotenv_path):
            load_dotenv(dotenv_path)
            print(f"[ENV] Loaded .env from {dotenv_path}")
        else:
            print("[ENV] No .env file found in cwd")

load_env()

# -----------------------------
# 2️⃣ Prepare persistent SQLite DB
# -----------------------------
print("\n[DB] Preparing SQLite database...")

if getattr(sys, "frozen", False):
    bundle_db_path = os.path.join(sys._MEIPASS, "db.sqlite")

    # Use persistent app folder
    app_data_dir = get_persistent_app_dir("Atlas")
    print(f"Persistent folder path: {app_data_dir}")
    os.makedirs(app_data_dir, exist_ok=True)
    persistent_db_path = os.path.join(app_data_dir, "db.sqlite")

    if not os.path.exists(persistent_db_path):
        shutil.copyfile(bundle_db_path, persistent_db_path)
        print(f"[DB] Copied bundled DB to persistent path: {persistent_db_path}")
    else:
        print(f"[DB] Using existing persistent DB: {persistent_db_path}")

    DB_URL = f"sqlite+aiosqlite:///{persistent_db_path}"
else:
    # Normal script
    DB_URL = os.getenv("DATABASE_URL", f"sqlite+aiosqlite:///./db.sqlite")
    persistent_db_path = "./db.sqlite"

# Ensure DATABASE_URL in os.environ matches persistent DB
os.environ["DATABASE_URL"] = DB_URL

print("\n=== CONFIG SUMMARY ===")
print(f"DB_URL = {DB_URL}")
print(f"Working directory = {os.getcwd()}")
print(f"Persistent DB path = {persistent_db_path}")
print("=== STARTING APPLICATION SERVER ===\n")

# -----------------------------
# 3️⃣ Pydantic Settings
# -----------------------------
class EnvironmentType:
    DEVELOPMENT = "development"
    PRODUCTION = "production"

class Config(BaseSettings):
    DEBUG: int = 0
    DEFAULT_LOCALE: str = "en_US"
    ENVIRONMENT: str = EnvironmentType.DEVELOPMENT

    DATABASE_URL: str = DB_URL

    REDIS_URL: RedisDsn = os.getenv("REDIS_URL", "redis://localhost:6379/7")
    RELEASE_VERSION: str = "0.1"
    SHOW_SQL_ALCHEMY_QUERIES: int = 0
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24
    CELERY_BROKER_URL: str = os.getenv(
        "CELERY_BROKER_URL", "amqp://rabbit:password@localhost:5672"
    )
    CELERY_BACKEND_URL: str = os.getenv(
        "CELERY_BACKEND_URL", "redis://localhost:6379/0"
    )

    class Config:
        env_file = os.environ.get("PERSISTENT_ENV_PATH", ".env")
        env_file_encoding = "utf-8"

config: Config = Config()
print(f"Config DATABASE_URL = {config.DATABASE_URL}")
