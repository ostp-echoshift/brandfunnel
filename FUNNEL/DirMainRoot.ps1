# ==============================================
# DirMainRoot.ps1 - Generador de Estructura Base
# Nuevo Proyecto OSTP
# ==============================================

param(
    [string]$ProjectName,
    [string]$BasePath = "C:\Proyectos"
)

# Si no se pasa nombre, preguntar
if (-not $ProjectName) {
    $ProjectName = Read-Host "🚀 Nombre del nuevo proyecto"
}

$ProjectPath = Join-Path $BasePath $ProjectName

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  CONSTRUYENDO ESTRUCTURA BASE PARA: $ProjectName" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# ==============================================
# 1. CREAR CARPETA PRINCIPAL
# ==============================================
if (-not (Test-Path $ProjectPath)) {
    New-Item -ItemType Directory -Path $ProjectPath -Force | Out-Null
    Write-Host "✅ Creada carpeta raíz: $ProjectPath" -ForegroundColor Green
} else {
    Write-Host "⚠️  La carpeta ya existe: $ProjectPath" -ForegroundColor Yellow
}

# ==============================================
# 2. DEFINIR ESTRUCTURA DE CARPETAS
# ==============================================
$carpetas = @(
    "assets\css",
    "assets\js",
    "assets\img",
    "assets\icon",
    "assets\logo",
    "assets\fonts",
    "components",
    "data",
    "docs",
    "services"
)

Write-Host "`n📁 Creando carpetas..." -ForegroundColor Yellow

foreach ($carpeta in $carpetas) {
    $ruta = Join-Path $ProjectPath $carpeta
    New-Item -ItemType Directory -Path $ruta -Force | Out-Null
    Write-Host "  ✅ Creada: $carpeta" -ForegroundColor Green
}

# ==============================================
# 3. CREAR ARCHIVOS BASE
# ==============================================
Write-Host "`n📄 Creando archivos base..." -ForegroundColor Yellow

$archivos = @(
    "index.html",
    "servicios.html",
    "captura.html",
    "gracias.html",
    "404.html",
    "README.md",
    ".gitignore",
    "config.json",
    "package.json",
    "assets\css\main.css",
    "assets\css\components.css",
    "assets\js\main.js",
    "assets\js\utils.js",
    "assets\icon\favicon.ico",
    "assets\logo\logo.svg",
    "docs\parametros.md"
)

foreach ($archivo in $archivos) {
    $ruta        = Join-Path $ProjectPath $archivo
    $extension   = [System.IO.Path]::GetExtension($archivo)
    $nombreArchivo = [System.IO.Path]::GetFileName($archivo)

    if (-not (Test-Path $ruta)) {
        New-Item -ItemType File -Path $ruta -Force | Out-Null

        # ── Contenido según nombre o extensión ──────────────────────
        switch ($nombreArchivo) {

            # ── Casos especiales por nombre exacto ──────────────────
            ".gitignore" {
"node_modules/
.DS_Store
*.log
.env
dist/
build/" | Out-File $ruta -Encoding UTF8
            }

            "package.json" {
"{
  `"name`": `"$ProjectName`",
  `"version`": `"1.0.0`",
  `"description`": `"Proyecto OSTP`",
  `"main`": `"index.html`"
}" | Out-File $ruta -Encoding UTF8
            }

            "config.json" {
                "{}" | Out-File $ruta -Encoding UTF8
            }

            "favicon.ico" {
                # Archivo binario — se deja vacío intencionalmente.
                # Reemplazar con un .ico real antes de producción.
            }

            # ── Casos por extensión ──────────────────────────────────
            default {
                switch ($extension) {

                    ".html" {
"<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>$ProjectName</title>
    <link rel='stylesheet' href='assets/css/main.css'>
</head>
<body>
    <h1>$ProjectName</h1>
</body>
</html>" | Out-File $ruta -Encoding UTF8
                    }

                    ".css" {
"/* $ProjectName - Estilos base */
:root {
    --primary:   #00f0ff;
    --secondary: #7b2eda;
    --dark:      #0a0c14;
}" | Out-File $ruta -Encoding UTF8
                    }

                    ".js" {
"// $ProjectName - JavaScript
console.log('🚀 $ProjectName cargado');" | Out-File $ruta -Encoding UTF8
                    }

                    ".md" {
"# $ProjectName

## Descripción
Proyecto base OSTP

## Estructura
- \`/assets\`     - Recursos estáticos
- \`/components\` - Fragmentos reutilizables
- \`/data\`       - Datos JSON
- \`/docs\`       - Documentación
- \`/services\`   - Servicios específicos" | Out-File $ruta -Encoding UTF8
                    }

                    ".svg" {
"<svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='50' cy='50' r='40' fill='#00f0ff'/>
</svg>" | Out-File $ruta -Encoding UTF8
                    }
                }
            }
        }

        Write-Host "  ✅ Creado: $archivo" -ForegroundColor Green

    } else {
        Write-Host "  ⏩ Ya existe: $archivo" -ForegroundColor Yellow
    }
}

# ==============================================
# 4. CREAR project-config.json
# ==============================================
$configPath = Join-Path $ProjectPath "project-config.json"
$config = @{
    nombre          = $ProjectName
    fecha_creacion  = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    version         = "1.0.0"
    autor           = "OSTP"
    estructura      = $carpetas
    archivos        = $archivos
} | ConvertTo-Json

$config | Out-File $configPath -Encoding UTF8
Write-Host "  ✅ Creado: project-config.json" -ForegroundColor Green

# ==============================================
# 5. MOSTRAR ESTRUCTURA FINAL
# ==============================================
Write-Host "`n📁 ESTRUCTURA GENERADA:" -ForegroundColor Cyan
Write-Host "$ProjectName/" -ForegroundColor White
Write-Host "├── index.html"            -ForegroundColor White
Write-Host "├── servicios.html"        -ForegroundColor White
Write-Host "├── captura.html"          -ForegroundColor White
Write-Host "├── gracias.html"          -ForegroundColor White
Write-Host "├── 404.html"              -ForegroundColor White
Write-Host "├── README.md"             -ForegroundColor White
Write-Host "├── .gitignore"            -ForegroundColor White
Write-Host "├── config.json"           -ForegroundColor White
Write-Host "├── package.json"          -ForegroundColor White
Write-Host "├── project-config.json"   -ForegroundColor White
Write-Host "├── assets/"               -ForegroundColor White
Write-Host "│   ├── css/"              -ForegroundColor White
Write-Host "│   ├── js/"               -ForegroundColor White
Write-Host "│   ├── img/"              -ForegroundColor White
Write-Host "│   ├── icon/"             -ForegroundColor White
Write-Host "│   ├── logo/"             -ForegroundColor White
Write-Host "│   └── fonts/"            -ForegroundColor White
Write-Host "├── components/"           -ForegroundColor White
Write-Host "├── data/"                 -ForegroundColor White
Write-Host "├── docs/"                 -ForegroundColor White
Write-Host "└── services/"             -ForegroundColor White

# ==============================================
# 6. RESUMEN FINAL
# ==============================================
$totalArchivos = $archivos.Count + 1   # +1 por project-config.json

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║               CONSTRUCCIÓN COMPLETADA                     ║" -ForegroundColor Cyan
Write-Host "╠════════════════════════════════════════════════════════════╣" -ForegroundColor Cyan
Write-Host "║  📁 Proyecto : $ProjectName"                               -ForegroundColor White
Write-Host "║  📂 Ruta     : $ProjectPath"                               -ForegroundColor White
Write-Host "║  📊 Carpetas : $($carpetas.Count)"                         -ForegroundColor Green
Write-Host "║  📄 Archivos : $totalArchivos"                             -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 LISTO: Primero la casa, luego los muebles."               -ForegroundColor Green
Write-Host "📌 Siguiente paso: definir el contenido de cada archivo."    -ForegroundColor Yellow