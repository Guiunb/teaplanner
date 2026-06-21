$filePath = "scratch\reconstructed_code_1500_plus.js"
$lines = Get-Content -Path $filePath

$cleanLines = @()
foreach ($line in $lines) {
    if ($line -like '// --- Line *') {
        continue
    }
    $cleanLines += $line
}

$cleanText = $cleanLines -join "`r`n"

# Fix typical double-encoding / garbled issues from logs
$cleanText = $cleanText -replace 'Recorrncia', 'Recorrência'
$cleanText = $cleanText -replace 'RecorrǦncia', 'Recorrência'
$cleanText = $cleanText -replace 'ms\(es\)', 'mês(es)'
$cleanText = $cleanText -replace 'Sbado', 'Sábado'
$cleanText = $cleanText -replace 'Tera', 'Terça'
$cleanText = $cleanText -replace 's/aos', 'às/aos'
$cleanText = $cleanText -replace 'horrio', 'horário'
$cleanText = $cleanText -replace 'notificao', 'notificação'
$cleanText = $cleanText -replace 'Notificaes', 'Notificações'
$cleanText = $cleanText -replace 'Ateno', 'Atenção'
$cleanText = $cleanText -replace 'Concludo', 'Concluído'
$cleanText = $cleanText -replace 'personalizada', 'personalizada'
$cleanText = $cleanText -replace 'excluir', 'excluir'
$cleanText = $cleanText -replace 'usurio', 'usuário'
$cleanText = $cleanText -replace 'configurao', 'configuração'

Set-Content -Path "scratch\extracted_premium_clean.js" -Value $cleanText -Encoding utf8
Write-Host "Cleaned code written to scratch\extracted_premium_clean.js"
