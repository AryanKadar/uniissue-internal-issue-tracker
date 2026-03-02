@echo off
setlocal enabledelayedexpansion

:: Enable ANSI colors in Windows 10+
for /f "tokens=4-5 delims=. " %%i in ('ver') do set VERSION=%%i.%%j
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1

:: ANSI color codes
set "RESET=[0m"
set "BOLD=[1m"
set "CYAN=[96m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "MAGENTA=[95m"
set "DIM=[2m"
set "WHITE=[97m"

echo.
echo %CYAN%%BOLD%  ╔══════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%%BOLD%  ║      🚀  UNICO  —  Issue Tracker  ^|  BACKEND            ║%RESET%
echo %CYAN%%BOLD%  ║              FastAPI  +  PostgreSQL                      ║%RESET%
echo %CYAN%%BOLD%  ╚══════════════════════════════════════════════════════════╝%RESET%
echo.

:: ─── Kill any process already using port 8000 ─────────────────────────────
echo %DIM%  ──────────────────────────────────────────────────────────%RESET%
echo %BLUE%  ⟳  Checking for existing process on port 8000...%RESET%
set "KILLED=0"
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8000 " ^| find "LISTENING" 2^>nul') do (
    echo %YELLOW%  ⚠  Found process PID %%a on port 8000 — terminating...%RESET%
    taskkill /F /PID %%a >nul 2>&1
    set "KILLED=1"
)
if "!KILLED!"=="1" (
    echo %GREEN%  ✔  Port 8000 is now free.%RESET%
) else (
    echo %GREEN%  ✔  Port 8000 is available.%RESET%
)
echo.

:: ─── Navigate to Backend directory ────────────────────────────────────────
cd /d "%~dp0Backend"

:: ─── Virtual environment check ────────────────────────────────────────────
echo %BLUE%  ⟳  Checking virtual environment...%RESET%

if not exist "venv\Scripts\python.exe" (
    echo %RED%  ✖  Virtual environment not found!%RESET%
    echo.
    echo %YELLOW%  Please run the following commands first:%RESET%
    echo %DIM%    cd Backend%RESET%
    echo %DIM%    python -m venv venv%RESET%
    echo %DIM%    venv\Scripts\pip install -r requirements.txt%RESET%
    echo %DIM%    venv\Scripts\python -m alembic upgrade head%RESET%
    echo.
    pause
    exit /b 1
)

echo %GREEN%  ✔  Virtual environment found.%RESET%
echo.

:: ─── .env check ───────────────────────────────────────────────────────────
echo %BLUE%  ⟳  Checking environment configuration...%RESET%
if not exist ".env" (
    echo %YELLOW%  ⚠  .env not found — copying from .env.example%RESET%
    copy .env.example .env >nul
    echo %YELLOW%  ⚠  Please edit Backend\.env and set your DB_PASSWORD!%RESET%
) else (
    echo %GREEN%  ✔  .env loaded.%RESET%
)
echo.

:: ─── Launch info ──────────────────────────────────────────────────────────
echo %DIM%  ──────────────────────────────────────────────────────────%RESET%
echo %GREEN%%BOLD%  ┌─────────────────────────────────────────────────────┐%RESET%
echo %GREEN%%BOLD%  │  🌐  Server     →  http://localhost:8000             │%RESET%
echo %GREEN%%BOLD%  │  📖  Swagger UI →  http://localhost:8000/docs        │%RESET%
echo %GREEN%%BOLD%  │  💓  Health     →  http://localhost:8000/health      │%RESET%
echo %GREEN%%BOLD%  └─────────────────────────────────────────────────────┘%RESET%
echo.
echo %MAGENTA%  ▶  Starting FastAPI server with hot-reload...%RESET%
echo %DIM%  ──────────────────────────────────────────────────────────%RESET%
echo.

venv\Scripts\python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

echo.
echo %DIM%  ──────────────────────────────────────────────────────────%RESET%
echo %YELLOW%  ⚠  Backend server stopped.%RESET%
echo.
pause
