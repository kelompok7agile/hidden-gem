@echo off
setlocal

:: Nama root project (ubah sesuai kebutuhan)
set PROJECT_ROOT=project-root

:: Membuat direktori utama
mkdir %PROJECT_ROOT%
cd %PROJECT_ROOT%

:: Membuat subdirektori dalam src
mkdir src
cd src
mkdir config routes controllers services repositories models middlewares utils validations tests
cd ..

:: Membuat file utama
echo. > src\app.js
echo. > .env
echo. > package.json
echo. > knexfile.js
echo. > server.js

echo Struktur folder berhasil dibuat!
pause
