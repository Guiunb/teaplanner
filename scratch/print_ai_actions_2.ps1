$lines = Get-Content -Path 'index.html'
for ($i = 8945; $i -le 9015; $i++) {
    if ($i -le $lines.Length) {
        Write-Host "$($i): $($lines[$i - 1])"
    }
}
