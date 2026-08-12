@echo off
echo Starting Eco-Smart Factory Dev Server...
SET PATH=C:\Program Files\nodejs;%PATH%
cd /d D:\project\eco-smart-factory
echo.
echo  Open browser: http://localhost:5173/
echo  Press Ctrl+C to stop
echo.
npm run dev
pause
