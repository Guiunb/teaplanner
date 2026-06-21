@echo off
title Deploy TEA PLANNER 2.0
echo Iniciando build, validacao e deploy...
powershell -NoProfile -ExecutionPolicy Bypass -File .\deploy.ps1
echo.
pause
