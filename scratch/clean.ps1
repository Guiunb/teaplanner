$lines = Get-Content -Path "scratch\extracted_premium_clean.js"
$cleanLines = @()
foreach ($line in $lines) {
    if ($line.Trim() -ne '') {
        $cleanLines += $line
    }
}
$cleanLines | Set-Content -Path "scratch\clean_extracted.html" -Encoding utf8
Write-Host "Done"
