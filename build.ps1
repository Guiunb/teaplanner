# ============================================================
# TEA PLANNER - BUILD v8.1
# Gera o index.html da raiz a partir de src/ (fonte da verdade).
# DUAS etapas obrigatorias (nao remover nenhuma!):
#   1. CSS: src/style.css e inlinado no lugar de BUILD_STYLE_START/END
#   2. JS : modulos de src/js concatenados no lugar de BUILD_JS_START/END
# Formato comprovado em producao: concatenacao plana, sem wrapper.
# A ordem dos modulos IMPORTA (override intencional: getPrecoAtual do
# centralbank redefine o fallback do economy - documentado nos arquivos).
# Uso: powershell -ExecutionPolicy Bypass -File build.ps1
# ============================================================
$ErrorActionPreference = "Stop"
$src = Join-Path $PSScriptRoot "src"
$out = Join-Path $PSScriptRoot "index.html"

$modulos = @(
    "core.js","auth.js","database.js","timers.js","kanban.js","agenda.js","ai.js",
    "gamification.js","economy.js","streaks.js","wellbeing.js","centralbank.js",
    "flow.js","rituals.js","companion.js","revisao.js","init.js"
)

# --- Etapa 1: CSS inline ---
$cssPath = Join-Path $src "style.css"
if (-not (Test-Path $cssPath)) { throw "src/style.css nao encontrado!" }
$css = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)

$html = [System.IO.File]::ReadAllText((Join-Path $src "index.html"), [System.Text.Encoding]::UTF8)
$padraoCss = "(?s)<!-- BUILD_STYLE_START -->.*?<!-- BUILD_STYLE_END -->"
if ($html -notmatch $padraoCss) { throw "Placeholders BUILD_STYLE_START/END nao encontrados" }
$blocoCss = "<style>`r`n" + $css + "`r`n    </style>"
$html = [System.Text.RegularExpressions.Regex]::Replace($html, $padraoCss, { param($m) $blocoCss }, "Singleline")

# --- Etapa 2: JS inline ---
$js = ""
foreach ($m in $modulos) {
    $caminho = Join-Path $src ("js\" + $m)
    if (-not (Test-Path $caminho)) { throw "Modulo ausente: $caminho" }
    $js += "`r`n// ===== MODULO: $m =====`r`n" + [System.IO.File]::ReadAllText($caminho, [System.Text.Encoding]::UTF8) + "`r`n"
}
$padraoJs = "(?s)<!-- BUILD_JS_START -->.*?<!-- BUILD_JS_END -->"
if ($html -notmatch $padraoJs) { throw "Placeholders BUILD_JS_START/END nao encontrados" }
$blocoJs = "<script>`r`n" + $js + "`r`n</script>"
$html = [System.Text.RegularExpressions.Regex]::Replace($html, $padraoJs, { param($m) $blocoJs }, "Singleline")

# --- Gravacao UTF-8 SEM BOM + validacoes ---
$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($out, $html, $enc)
$abre = ([regex]::Matches($html, "<script")).Count
$fecha = ([regex]::Matches($html, "</script>")).Count
$mods = ([regex]::Matches($html, "// ===== MODULO:")).Count
$temStyle = $html.Contains("<style>")
$temLink = $html.Contains('rel="stylesheet"')
Write-Host "Build OK -> $out"
Write-Host "Modulos: $mods/$($modulos.Count) | script $abre/$fecha | style inline: $temStyle | link externo restante: $temLink"
if ($abre -ne $fecha) { throw "Tags script desbalanceadas" }
if ($mods -ne $modulos.Count) { throw "Modulos faltando no bundle" }
if (-not $temStyle) { throw "CSS NAO foi inlinado!" }
if ($temLink) { throw "Link de CSS externo sobrou no build!" }
