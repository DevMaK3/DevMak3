@echo off
title DevMaK3 Local Server
echo ========================================================
echo   Iniciando servidor local para DevMaK3...
echo   URL: http://localhost:3000
echo ========================================================
start http://localhost:3000
node server.js
pause
