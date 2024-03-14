@echo off

rem Cambiar al directorio del proyecto
cd "C:\Users\distr\development\pos-quiroz\dev"

rem Ejecutar el comando 'npm start' definido en el package.json
start /min cmd /c npm start

rem Esperar unos segundos para que el servidor se inicie completamente
timeout /t 1 /nobreak >nul

rem Abrir en Brave
start /min /WAIT brave --start-fullscreen "http://localhost:1234"

rem Esperar hasta que el proceso del navegador se cierre
:LOOP
timeout /t 1 /nobreak >nul
tasklist | findstr "brave.exe" > nul
if errorlevel 1 (
    rem Cerrar el servidor cuando se cierra el navegador
    taskkill /f /im node.exe
    rem Salir del bucle
    goto END
)

rem Volver al inicio del bucle
goto LOOP

:END
rem Cerrar la ventana de la terminal
exit
