$diffPath = "scratch\code_diff.txt"
$lines = Get-Content -Path $diffPath

$extracted = @()
$currentLineNum = 0
$currentNewLines = @()
$inNewBlock = $false

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match "^Line\s*:\s*(\d+)") {
        $currentLineNum = [int]$Matches[1]
        $inNewBlock = $false
        $currentNewLines = @()
    }
    elseif ($line -match "^New\s*:\s*(.*)") {
        $text = $Matches[1]
        $currentNewLines += $text
        $inNewBlock = $true
        
        # Read subsequent continuation lines (if any)
        for ($j = $i + 1; $j -lt $lines.Length; $j++) {
            $nextLine = $lines[$j]
            if ($nextLine -match "^Line\s*:" -or $nextLine -match "^Old\s*:" -or $nextLine -match "^New\s*:") {
                break
            }
            # This is a continuation line, append it
            $currentNewLines += $nextLine
            $i = $j # Advance main loop index
        }
        
        # If the line number is >= 1500, keep it
        if ($currentLineNum -ge 1500) {
            $extracted += [PSCustomObject]@{
                Line = $currentLineNum
                Code = $currentNewLines -join "`n"
            }
        }
    }
}

# Sort by line number
$sorted = $extracted | Sort-Object Line

$codeOutput = @()
foreach ($item in $sorted) {
    $codeOutput += "// --- Line $($item.Line) ---"
    $codeOutput += $item.Code
}

Set-Content -Path "scratch\reconstructed_code_1500_plus.js" -Value ($codeOutput -join "`r`n") -Encoding utf8
Write-Host "Reconstructed code saved to scratch\reconstructed_code_1500_plus.js"
