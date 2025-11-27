@echo off
cd /d "c:\Users\albor\OneDrive\Escritorio\Taller_programacion"
echo Iniciando servidor en http://localhost:8000/menu.html
echo Presiona Ctrl+C para detener el servidor
timeout /t 2
start http://localhost:8000/menu.html
npx http-server -p 8000
pause
