@echo off
cd /d "%~dp0"  REM Change directory to the script location
echo Starting frontend...
start cmd /k "npm run start"  REM Opens a new terminal for frontend
timeout /t 5  REM Waits 5 seconds (optional)
echo Starting backend...
start cmd /k "node server.js"  REM Opens a new terminal for backend
pause  REM Keeps the window open
