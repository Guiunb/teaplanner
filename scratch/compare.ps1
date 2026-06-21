# Compare index - 20260603.html and index.html up to the backup fallback
$oldLines = [System.IO.File]::ReadAllLines("c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index - 20260603.html", [System.Text.Encoding]::UTF8)
$newLines = [System.IO.File]::ReadAllLines("c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html", [System.Text.Encoding]::UTF8)

# We only care about code, so limit to the first 9200 lines of the new file
$newLinesCodeOnly = $newLines[0..9199]

# Use Compare-Object to see differences
Compare-Object -ReferenceObject $oldLines -DifferenceObject $newLinesCodeOnly -IncludeEqual -ExcludeDifferent | Out-Null # warm up

# Let's write a custom comparison to show block differences with line numbers
$diffs = @()
$maxLines = [Math]::Max($oldLines.Count, $newLinesCodeOnly.Count)

for ($i = 0; $i -lt $maxLines; $i++) {
    $oldVal = if ($i -lt $oldLines.Count) { $oldLines[$i] } else { $null }
    $newVal = if ($i -lt $newLinesCodeOnly.Count) { $newLinesCodeOnly[$i] } else { $null }
    
    if ($oldVal -ne $newVal) {
        $diffs += [PSCustomObject]@{
            Line = $i + 1
            Old = $oldVal
            New = $newVal
        }
    }
}

$diffs | Format-List | Out-File "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\scratch\code_diff.txt" -Encoding utf8
Write-Output "Comparison completed. Diff saved to scratch\code_diff.txt"
