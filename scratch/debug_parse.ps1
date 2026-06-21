$html = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$scriptRegex = [regex]'(?si)<script\b[^>]*>(.*?)</script>'
$matches = $scriptRegex.Matches($html)

foreach ($m in $matches) {
    $js = $m.Groups[1].Value
    if ($js.Length -lt 1000) { continue }
    
    $stack = @()
    $stackLine = @()
    $stackChar = @()
    $inSingleQuote = $false
    $inDoubleQuote = $false
    $inBacktick = $false
    $inLineComment = $false
    $inBlockComment = $false
    
    $lineNum = 1
    
    for ($i = 0; $i -lt $js.Length; $i++) {
        $char = $js[$i]
        $nextChar = if ($i + 1 -lt $js.Length) { $js[$i+1] } else { $null }
        $prevChar = if ($i -gt 0) { $js[$i-1] } else { $null }
        
        if ($char -eq "`n") { $lineNum++ }
        
        if ($prevChar -eq '\' -and $js[$i-2] -ne '\') {
            continue
        }
        
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
        
        if ($char -eq '{' -or $char -eq '[' -or $char -eq '(') {
            $stack += $char
            $stackLine += $lineNum
            $stackChar += $i
        } elseif ($char -eq '}' -or $char -eq ']' -or $char -eq ')') {
            if ($stack.Count -eq 0) {
                Write-Host "Unmatched closing char '$char' at line $lineNum, char $i"
                break
            }
            $last = $stack[-1]
            if (($char -eq '}' -and $last -ne '{') -or
                ($char -eq ']' -and $last -ne '[') -or
                ($char -eq ')' -and $last -ne '(')) {
                Write-Host "Mismatched char: opened '$last' at line $($stackLine[-1]), closed '$char' at line $lineNum, char $i"
                break
            }
            $stack = $stack[0..($stack.Count-2)]
            $stackLine = $stackLine[0..($stackLine.Count-2)]
            $stackChar = $stackChar[0..($stackChar.Count-2)]
        }
    }
    
    if ($stack.Count -gt 0) {
        Write-Host "Unclosed stack trace:"
        for ($k = 0; $k -lt $stack.Count; $k++) {
            Write-Host "Opened '$($stack[$k])' at line $($stackLine[$k])"
        }
    }
}
