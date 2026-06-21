$html = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$scriptRegex = [regex]'(?si)<script\b[^>]*>(.*?)</script>'
$matches = $scriptRegex.Matches($html)
$errors = 0

foreach ($m in $matches) {
    $js = $m.Groups[1].Value
    $stack = @()
    $inSingleQuote = $false
    $inDoubleQuote = $false
    $inBacktick = $false
    $inLineComment = $false
    $inBlockComment = $false
    
    for ($i = 0; $i -lt $js.Length; $i++) {
        $char = $js[$i]
        $nextChar = if ($i + 1 -lt $js.Length) { $js[$i+1] } else { $null }
        $prevChar = if ($i -gt 0) { $js[$i-1] } else { $null }
        
        # Handle escape sequence
        if ($prevChar -eq '\' -and $js[$i-2] -ne '\') {
            continue
        }
        
        # Comments
        if ($inLineComment) {
            if ($char -eq "`n") { $inLineComment = $false }
            continue
        }
        if ($inBlockComment) {
            if ($char -eq '*' -and $nextChar -eq '/') {
                $inBlockComment = $false
                $i++
            }
            continue
        }
        
        # Strings
        if ($inSingleQuote) {
            if ($char -eq "'") { $inSingleQuote = $false }
            continue
        }
        if ($inDoubleQuote) {
            if ($char -eq '"') { $inDoubleQuote = $false }
            continue
        }
        if ($inBacktick) {
            if ($char -eq '`') { $inBacktick = $false }
            continue
        }
        
        # Start Comments/Strings
        if ($char -eq '/' -and $nextChar -eq '/') {
            $inLineComment = $true
            $i++
            continue
        }
        if ($char -eq '/' -and $nextChar -eq '*') {
            $inBlockComment = $true
            $i++
            continue
        }
        if ($char -eq "'") {
            $inSingleQuote = $true
            continue
        }
        if ($char -eq '"') {
            $inDoubleQuote = $true
            continue
        }
        if ($char -eq '`') {
            $inBacktick = $true
            continue
        }
        
        # Braces & Brackets
        if ($char -eq '{' -or $char -eq '[' -or $char -eq '(') {
            $stack += $char
        } elseif ($char -eq '}' -or $char -eq ']' -or $char -eq ')') {
            if ($stack.Count -eq 0) {
                Write-Host "Unmatched closing char '$char' at character $i"
                $errors++
                break
            }
            $last = $stack[-1]
            if (($char -eq '}' -and $last -ne '{') -or
                ($char -eq ']' -and $last -ne '[') -or
                ($char -eq ')' -and $last -ne '(')) {
                Write-Host "Mismatched char: opened '$last', closed '$char' at character $i"
                $errors++
                break
            }
            $stack = $stack[0..($stack.Count-2)]
        }
    }
    
    if ($stack.Count -gt 0) {
        Write-Host "Unclosed characters at end of script block: $( [string]::Join('', $stack) )"
        $errors++
    }
}

if ($errors -eq 0) {
    Write-Host "SUCCESS: Balanced brackets and strings!"
} else {
    Write-Host "FAILED: $errors syntax issues detected."
    exit 1
}
