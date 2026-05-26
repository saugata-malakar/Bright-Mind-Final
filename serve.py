"""
BrightMind - Render Bootstrapper
Automatically installs backend python dependencies and runs the unified FastAPI app on Render's port.
"""

import os
import sys
import subprocess

def main():
    print("+----------------------------------------------------+")
    print("|      BrightMind Render Bootstrapper starting...    |")
    print("+----------------------------------------------------+")
    
    # 1. Install/verify python dependencies from backend/requirements.txt
    requirements_path = os.path.join("backend", "requirements.txt")
    if os.path.exists(requirements_path):
        print("[INFO] Installing and verifying python dependencies...")
        try:
            subprocess.check_call([
                sys.executable, "-m", "pip", "install", "-r", requirements_path
            ])
            print("[SUCCESS] Dependencies successfully installed/verified!")
        except Exception as e:
            print(f"[WARNING] pip install failed: {e}. Attempting startup anyway...")
    else:
        print("[WARNING] backend/requirements.txt not found.")

    # 2. Retrieve dynamic port from environment
    port = os.getenv("PORT", "8000")
    print(f"[STARTING] Launching FastAPI backend via Uvicorn on port {port}...")

    # 3. Run uvicorn pointing to app.main:app inside the backend folder
    backend_dir = os.path.abspath("backend")
    
    # Execute uvicorn as a subprocess and inherit exit status
    sys.exit(
        subprocess.call([
            sys.executable, "-m", "uvicorn",
            "app.main:app",
            "--host", "0.0.0.0",
            "--port", str(port)
        ], cwd=backend_dir)
    )

if __name__ == "__main__":
    main()
