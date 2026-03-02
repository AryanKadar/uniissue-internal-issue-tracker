@echo off
setlocal enabledelayedexpansion

:: Enable ANSI colors in Windows 10+
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
echo %MAGENTA%%BOLD%  ╔══════════════════════════════════════════════════════════╗%RESET%
echo %MAGENTA%%BOLD%  ║      ⚡  UNICO  —  Issue Tracker  ^|  FRONTEND           ║%RESET%
echo %MAGENTA%%BOLD%  ║              React  +  Vite  +  TypeScript               ║%RESET%
echo %MAGENTA%%BOLD%  ╚══════════════════════════════════════════════════════════╝%RESET%
echo.

:: ─── Kill any process already using port 5173 ─────────────────────────────
echo %DIM%  ──────────────────────────────────────────────────────────%RESET%
echo %BLUE%  ⟳  Checking for existing process on port 5173...%RESET%
set "KILLED=0"
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173 " ^| find "LISTENING" 2^>nul') do (
    echo %YELLOW%  ⚠  Found process PID %%a on port 5173 — terminating...%RESET%
    taskkill /F /PID %%a >nul 2>&1
    set "KILLED=1"
)
if "!KILLED!"=="1" (
    echo %GREEN%  ✔  Port 5173 is now free.%RESET%
) else (
    echo %GREEN%  ✔  Port 5173 is available.%RESET%
)
echo.

:: ─── Navigate to Frontend directory ───────────────────────────────────────
cd /d "%~dp0Frontend"

:: ─── node_modules check ───────────────────────────────────────────────────
echo %BLUE%  ⟳  Checking node_modules...%RESET%
if not exist "node_modules" (
    echo %YELLOW%  ⚠  node_modules not found — running npm install...%RESET%
    echo.
    npm install
    echo.
    echo %GREEN%  ✔  Dependencies installed.%RESET%
) else (
    echo %GREEN%  ✔  node_modules found.%RESET%
)
echo.

:: ─── .env check ───────────────────────────────────────────────────────────
echo %BLUE%  ⟳  Checking environment configuration...%RESET%
if not exist ".env" (
    echo %YELLOW%  ⚠  .env not found — copying from .env.example%RESET%
    copy .env.example .env >nul
) else (
    echo %GREEN%  ✔  .env loaded.%RESET%
)
echo.

:: ─── Launch info ──────────────────────────────────────────────────────────
echo %DIM%  ──────────────────────────────────────────────────────────%RESET%
echo %GREEN%%BOLD%  ┌─────────────────────────────────────────────────────┐%RESET%
echo %GREEN%%BOLD%  │  🌐  Frontend  →  http://localhost:5173              │%RESET%
echo %GREEN%%BOLD%  │  🔗  Backend   →  http://localhost:8000  (API)       │%RESET%
echo %GREEN%%BOLD%  └─────────────────────────────────────────────────────┘%RESET%
echo.
echo %YELLOW%  💡  Tip: Make sure backend.bat is also running!%RESET%
echo.
echo %MAGENTA%  ▶  Starting Vite dev server...%RESET%
echo %DIM%  ──────────────────────────────────────────────────────────%RESET%
echo.

npm run dev

echo.
echo %DIM%  ──────────────────────────────────────────────────────────%RESET%
echo %YELLOW%  ⚠  Frontend server stopped.%RESET%
echo.
pause
