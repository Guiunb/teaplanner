$html = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$scriptRegex = [regex]'(?si)<script\b[^>]*>(.*?)</script>'
$matches = $scriptRegex.Matches($html)
$js = $matches[3].Groups[1].Value

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
    
    if ($char -eq '{') {
        $stack += '{'
        $stackLine += $lineNum
        $stackChar += $i
    } elseif ($char -eq '}') {
        if ($stack.Count -gt 1) {
            $stack = $stack[0..($stack.Count-2)]
            $stackLine = $stackLine[0..($stackLine.Count-2)]
            $stackChar = $stackChar[0..($stackChar.Count-2)]
        } else {
            $stack = @()
            $stackLine = @()
            $stackChar = @()
        }
    }
}

Write-Host "Unclosed Braces Count: $($stack.Count)"
for ($k = 0; $k -lt $stack.Count; $k++) {
    $charIdx = $stackChar[$k]
    $start = [Math]::Max(0, $charIdx - 20)
    $len = [Math]::Min(60, $js.Length - $start)
    $snippet = $js.Substring($start, $len).Replace("`r", "").Replace("`n", " ")
    Write-Host "Unclosed '{' opened at line $($stackLine[$k]) (char $charIdx): '$snippet'"
}
