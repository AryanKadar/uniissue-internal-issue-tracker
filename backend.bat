@echo off
echo Starting Issue Tracker Backend...
cd /d "%~dp0Backend"

REM Use the venv Python directly — avoids "cannot find path" activate issues on Windows
if exist "venv\Scripts\python.exe" (
    echo Using virtual environment...
    venv\Scripts\python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
) else (
    echo [ERROR] Virtual environment not found in Backend\venv
    echo Run: python -m venv venv  THEN  venv\Scripts\pip install -r requirements.txt
    pause
    exit /b 1
)
pause
