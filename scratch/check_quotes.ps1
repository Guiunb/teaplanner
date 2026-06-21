$lines = [System.IO.File]::ReadAllLines("index.html", [System.Text.Encoding]::UTF8)
for ($i = 7200; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    $sq = ($line -split "'").Count - 1
    $dq = ($line -split '"').Count - 1
    
    if ($line.Trim().StartsWith("//") -or $line.Trim().StartsWith("/*") -or $line.Trim().StartsWith("*")) {
        continue
    }
    
    if ($line.Contains([char]96)) {
        continue
    }
    
    if (($sq % 2 -ne 0) -or ($dq % 2 -ne 0)) {
        $msg = "Line " + ($i+1) + ": " + $line.Trim() + " (Single: " + $sq + ", Double: " + $dq + ")"
        Write-Host $msg
    }
}
