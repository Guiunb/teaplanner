# Script de Compilação (Build) para TEA PLANNER 2.0
# Junta HTML, CSS e JS em um único index.html na raiz do projeto

$PSScriptRoot = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
if ([string]::IsNullOrEmpty($PSScriptRoot)) { $PSScriptRoot = Get-Location }

# 1. Carregar arquivos de origem
$htmlPath = Join-Path $PSScriptRoot "src/index.html"
$cssPath = Join-Path $PSScriptRoot "src/style.css"
$jsDir = Join-Path $PSScriptRoot "src/js"

if (!(Test-Path $htmlPath) -or !(Test-Path $cssPath)) {
    Write-Error "Arquivos src/index.html ou src/style.css não foram encontrados."
    Exit 1
}

Write-Host "Iniciando compilação do TEA PLANNER 2.0..." -ForegroundColor Cyan

# 2. Ler CSS
$cssContent = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)

# 3. Ler JS na ordem exata de dependência
$jsFiles = @(
    "core.js",
    "auth.js",
    "database.js",
    "timers.js",
    "kanban.js",
    "agenda.js",
    "ai.js",
    "init.js"
)

$jsContent = ""
foreach ($file in $jsFiles) {
    $filePath = Join-Path $jsDir $file
    if (Test-Path $filePath) {
        Write-Host "Adicionando módulo: $file" -ForegroundColor Gray
        $fileText = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
        $jsContent += "`n// ===== MODULE: $file =====`n" + $fileText + "`n"
    } else {
        Write-Error "Módulo JS obrigatório não encontrado: $file"
        Exit 1
    }
}

# 4. Ler HTML base
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# 5. Efetuar as substituições dos placeholders usando expressões regulares (Regex)
# O regex '.*?' casa com qualquer conteúdo de forma não-gulosa (single-line mode (?s))

# Substituição do Bloco CSS
$cssReplacement = "    <style>`n$cssContent`n    </style>"
$htmlContent = [System.Text.RegularExpressions.Regex]::Replace($htmlContent, "(?s)<!-- BUILD_STYLE_START -->.*?<!-- BUILD_STYLE_END -->", $cssReplacement)

# Substituição do Bloco JS (embrulhado no window.onload)
$jsReplacement = "    <script>`n        window.addEventListener('load', function () {`n$jsContent`n        });`n    </script>"
$htmlContent = [System.Text.RegularExpressions.Regex]::Replace($htmlContent, "(?s)<!-- BUILD_JS_START -->.*?<!-- BUILD_JS_END -->", $jsReplacement)

# 6. Salvar o arquivo compilado final na raiz
$outputPath = Join-Path $PSScriptRoot "index.html"
[System.IO.File]::WriteAllText($outputPath, $htmlContent, (New-Object System.Text.UTF8Encoding $false))

Write-Host "Compilação concluída com sucesso! Gerado: $outputPath" -ForegroundColor Green
