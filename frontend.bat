@echo off
echo Starting Issue Tracker Frontend...
cd /d "%~dp0Frontend"
echo Frontend running at http://localhost:5173
npm run dev
pause
