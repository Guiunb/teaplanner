$extractedPath = "scratch\clean_extracted.html"
$htmlPath = "index.html"

# Read all lines of clean_extracted.html
$lines = Get-Content -Path $extractedPath -Raw
$linesArray = $lines -split "`r`n"
if ($linesArray.Count -le 1) {
    $linesArray = $lines -split "`n"
}

# Extract Block 1 (lines 2958 to 3048, 1-indexed)
# In 0-indexed: index 2957 to 3047
$block1Lines = $linesArray[2957..3047]
$block1 = $block1Lines -join "`r`n"

# Extract Block 2 (lines 4257 to 5504, 1-indexed)
# In 0-indexed: index 4256 to 5503
$block2Lines = $linesArray[4256..5503]
$block2 = $block2Lines -join "`r`n"

# Combine functions
$injectedCode = @"

// ==========================================
// RESTORED PREMIUM FUNCTIONS (ALERTS, TOASTS)
// ==========================================
$block1

// ==========================================
// RESTORED PREMIUM FUNCTIONS (RECURRENCE & TIME PICKER)
// ==========================================
$block2

"@

# Read index.html
$indexContent = Get-Content -Path $htmlPath -Raw

# 1. Insert functions before function initApp()
$target = "            function initApp() {"
if ($indexContent.Contains($target)) {
    $indexContent = $indexContent.Replace($target, $injectedCode + "`r`n" + $target)
    Write-Host "Injected premium functions before initApp()"
} else {
    Write-Error "Could not find initApp() function definition in index.html"
}

# 2. Add startAlertCheck() inside initApp() after initAiControls()
$targetAi = "                initAiControls();"
if ($indexContent.Contains($targetAi)) {
    $indexContent = $indexContent.Replace($targetAi, $targetAi + "`r`n                startAlertCheck();")
    Write-Host "Added startAlertCheck() inside initApp()"
} else {
    Write-Error "Could not find initAiControls() inside initApp()"
}

# Save index.html
[System.IO.File]::WriteAllText($htmlPath, $indexContent, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Done saving index.html"
