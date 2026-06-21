$htmlPath = "index.html"
$content = Get-Content -Path $htmlPath -Raw

$targetBad = 'document.querySelector(.list[data-quad=""])'
$replacementGood = 'document.querySelector(`.list[data-quad="${targetQuad}"]`)'

if ($content.Contains($targetBad)) {
    $content = $content.Replace($targetBad, $replacementGood)
    [System.IO.File]::WriteAllText($htmlPath, $content, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "Fixed bad selectors successfully!"
} else {
    Write-Error "Could not find bad selector in index.html"
}
