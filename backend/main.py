from io import StringIO
import shutil
import tempfile
import uvicorn
import aiosqlite
import passlib.handlers.bcrypt   
from dotenv import load_dotenv
import os, sys
import pkgutil

from core.config import config


# print("=== STARTING APPLICATION ===")
# print(f"Running frozen/exe: {getattr(sys, 'frozen', False)}")
# print(f"Python executable: {sys.executable}")
# print(f"Current working directory: {os.getcwd()}")

# # -----------------------------
# # 1️⃣ Load .env from bundle
# # -----------------------------
# def load_env_from_bundle():
#     print("\n[ENV] Loading .env...")
#     if getattr(sys, 'frozen', False):
#         # Running from PyInstaller exe
#         bundle_path = sys._MEIPASS
#         dotenv_path = os.path.join(bundle_path, ".env")
#         if os.path.exists(dotenv_path):
#             load_dotenv(dotenv_path)
#             print(f"[ENV] Loaded .env from PyInstaller bundle: {dotenv_path}")
#         else:
#             print("[ENV] No .env found in bundle")
#     else:
#         # Normal script
#         dotenv_path = os.path.join(os.getcwd(), ".env")
#         if os.path.exists(dotenv_path):
#             load_dotenv(dotenv_path)
#             print(f"[ENV] Loaded .env from {dotenv_path}")
#         else:
#             print("[ENV] No .env file found in cwd")

# load_env_from_bundle()

# # -----------------------------
# # 2️⃣ Prepare SQLite DB from bundle
# # -----------------------------
# print("\n[DB] Preparing SQLite database...")
# if getattr(sys, 'frozen', False):
#     bundle_path = sys._MEIPASS
#     bundled_db_path = os.path.join(bundle_path, "db.sqlite")
#     if not os.path.exists(bundled_db_path):
#         raise FileNotFoundError("[DB] Bundled db.sqlite not found in PyInstaller bundle")

#     # Copy bundled DB to temp folder for sqlite usage
#     temp_db_path = os.path.join(tempfile.gettempdir(), "db.sqlite")
#     import shutil
#     shutil.copyfile(bundled_db_path, temp_db_path)
#     DB_URL = f"sqlite+aiosqlite:///{temp_db_path}"
#     print(f"[DB] Copied bundled db.sqlite to temp path: {temp_db_path}")
# else:
#     DB_URL = os.getenv("DATABASE_URL", f"sqlite+aiosqlite:///./db.sqlite")
#     print(f"[DB] Using DATABASE_URL from env or default: {DB_URL}")

# print("\n=== CONFIG SUMMARY ===")
# print(f"DB_URL = {DB_URL}")
# print(f"Working directory = {os.getcwd()}")
# print(f"Temp directory = {tempfile.gettempdir()}")
# print("=== STARTING APPLICATION SERVER ===\n")
# Now you can use env vars
print(config)

from core.server import app

if __name__ == "__main__":
    uvicorn.run(
        app="core.server:app",
        # reload=True if config.ENVIRONMENT != "production" else False,
        workers=1,
    )
