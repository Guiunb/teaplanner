$lines = Get-Content -Path 'index.html'
for ($i = 8700; $i -le 8950; $i++) {
    if ($i -le $lines.Length) {
        Write-Host "$($i): $($lines[$i - 1])"
    }
}
