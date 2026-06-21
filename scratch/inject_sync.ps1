$htmlPath = "index.html"
$content = Get-Content -Path $htmlPath -Raw

$target = "            function serializeAndSeparate() {"
$replacement = @"
            function syncAllCardsOrderFromDOM() {
                const domCards = Array.from(document.querySelectorAll('.card:not(.mirror-card)'));
                if (domCards.length === 0) return;
                const domCardSet = new Set(domCards);
                const nonDomCards = allCards.filter(c => !domCardSet.has(c));
                allCards = [...domCards, ...nonDomCards];
            }

            function serializeAndSeparate() {
                syncAllCardsOrderFromDOM();
"@

if ($content.Contains($target)) {
    $content = $content.Replace($target, $replacement)
    [System.IO.File]::WriteAllText($htmlPath, $content, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "Success"
} else {
    Write-Error "Could not find serializeAndSeparate function in index.html"
}
