$path = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Normalize any CRLF to LF temporarily, do replacement, and output back as CRLF
$content = $content -replace "`r`n", "`n"

$oldText = '            function setBoardTheme(color) {
                const r = document.querySelector('':root'');
                const safeColor = color || DEFAULT_THEME_COLOR;
                const theme = THEMES[safeColor] || THEMES[DEFAULT_THEME_COLOR];

                if (theme) {
                    r.style.setProperty(''--brand'', theme.brand);
                    r.style.setProperty(''--bg'', theme.bg);
                    r.style.setProperty(''--panel'', theme.panel);
                    r.style.setProperty(''--card'', theme.card);
                    r.style.setProperty(''--ink'', theme.text);
                } else {
                    r.style.setProperty(''--brand'', safeColor);
                    r.style.setProperty(''--bg'', ''#0f1a2a'');
                    r.style.setProperty(''--panel'', ''#0f223d'');
                    r.style.setProperty(''--card'', ''#112b4a'');
                    r.style.setProperty(''--ink'', ''#e9f1ff'');
                }
            }'

# Normalize oldText to LF
$oldText = $oldText -replace "`r`n", "`n"

$newText = '            function setBoardTheme(color) {
                const r = document.querySelector('':root'');
                const safeColor = color || DEFAULT_THEME_COLOR;
                const theme = THEMES[safeColor] || THEMES[DEFAULT_THEME_COLOR];

                if (theme) {
                    r.style.setProperty(''--brand'', theme.brand);
                    r.style.setProperty(''--bg'', theme.bg);
                    r.style.setProperty(''--panel'', theme.panel);
                    r.style.setProperty(''--card'', theme.card);
                    r.style.setProperty(''--ink'', theme.text);
                } else {
                    r.style.setProperty(''--brand'', safeColor);
                    r.style.setProperty(''--bg'', ''#0f1a2a'');
                    r.style.setProperty(''--panel'', ''#0f223d'');
                    r.style.setProperty(''--card'', ''#112b4a'');
                    r.style.setProperty(''--ink'', ''#e9f1ff'');
                }

                // Dynamic Header Adaptation based on contrast/brightness of the brand color
                const brightness = getContrastYIQ(safeColor);
                if (brightness === ''light'') {
                    r.style.setProperty(''--header-text'', ''#0f172a'');
                    r.style.setProperty(''--header-btn-bg'', ''rgba(15, 23, 42, 0.08)'');
                    r.style.setProperty(''--header-btn-border'', ''rgba(15, 23, 42, 0.15)'');
                    r.style.setProperty(''--header-btn-hover'', ''rgba(15, 23, 42, 0.15)'');
                    r.style.setProperty(''--header-btn-hover-border'', ''rgba(15, 23, 42, 0.3)'');
                } else {
                    r.style.setProperty(''--header-text'', ''#ffffff'');
                    r.style.setProperty(''--header-btn-bg'', ''rgba(255, 255, 255, 0.12)'');
                    r.style.setProperty(''--header-btn-border'', ''rgba(255, 255, 255, 0.2)'');
                    r.style.setProperty(''--header-btn-hover'', ''rgba(255, 255, 255, 0.22)'');
                    r.style.setProperty(''--header-btn-hover-border'', ''rgba(255, 255, 255, 0.35)'');
                }
            }'

# Normalize newText to LF
$newText = $newText -replace "`r`n", "`n"

if ($content.Contains($oldText)) {
    $content = $content.Replace($oldText, $newText)
    # Restore CRLF line endings
    $content = $content -replace "`n", "`r`n"
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "SUCCESS: Replaced setBoardTheme successfully!"
} else {
    Write-Host "ERROR: Could not find oldText in index.html"
}
