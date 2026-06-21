$logPath = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\scratch\extracted_edits.txt"
$lines = Get-Content -Path $logPath

$found = $false
$block = @()

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -like '*ReplacementContent : "            function openAgendaDialog(card)*') {
        Write-Host "Found matching ReplacementContent at line $($i + 1)"
        $found = $true
        
        # Extract starting text
        $lineText = $lines[$i]
        $prefix = 'ReplacementContent : "'
        $idx = $lineText.IndexOf($prefix)
        $text = $lineText.Substring($idx + $prefix.Length)
        $block += $text
        
        # Read next lines
        for ($j = $i + 1; $j -lt $lines.Length; $j++) {
            $nextLine = $lines[$j]
            if ($nextLine -like 'StepIndex*' -or $nextLine -like 'Type*' -or $nextLine -like 'StartLine*' -or $nextLine -like 'TargetContent*') {
                break
            }
            $block += $nextLine
        }
        break
    }
}

if ($found) {
    $rawStr = $block -join "`n"
    $rawStr = $rawStr.Trim()
    if ($rawStr.EndsWith('"')) {
        $rawStr = $rawStr.Substring(0, $rawStr.Length - 1)
    }
    
    # Unescape escaped characters (like \n, \", \\)
    $clean = $rawStr -replace '\\n', "`n"
    $clean = $clean -replace '\\"', '"'
    $clean = $clean -replace "\\'", "'"
    $clean = $clean -replace '\\t', "`t"
    $clean = $clean -replace '\\\\', '\'
    
    Set-Content -Path "scratch\extracted_agenda_code.txt" -Value $clean -Encoding utf8
    Write-Host "Successfully extracted code to scratch\extracted_agenda_code.txt"
} else {
    Write-Error "Could not find openAgendaDialog block in logs."
}
