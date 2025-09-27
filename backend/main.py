# main.py
import uvicorn
import os
import sys

# 1. CRUCIAL PATH FIX (Keep this! It ensures the import below works.)
# current_dir = os.path.dirname(os.path.abspath(__file__))
# sys.path.append(current_dir)
# ------------------

# 2. DIRECT IMPORT: Import the app object BEFORE uvicorn.run
try:
    from core.server import app as application # Renaming to 'application' is optional but clear
    from core.config import config
except ImportError as e:
    print(f"FATAL ERROR: Could not import 'core' package or 'server' module. {e}")
    sys.exit(1) # Exit immediately if the import fails

print("Setting up the server")
if __name__ == "__main__":
    uvicorn.run(
        # 3. PASS THE OBJECT: Pass the imported application object, not a string
        application,
        reload=False,
        workers=1,
    )