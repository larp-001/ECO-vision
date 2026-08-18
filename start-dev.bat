@echo off
echo Starting Eco-Smart Factory Dev Server...
SET PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"

IF NOT EXIST "node_modules" (
    echo node_modules not found. Installing dependencies...
    call npm install
)

echo.
echo  Open browser: http://localhost:5173/
echo  Press Ctrl+C to stop
echo.
npm run dev
pause
