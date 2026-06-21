$filePath = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$encoding = New-Object System.Text.UTF8Encoding($false) # UTF-8 without BOM

# Load file content using UTF-8
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# 1. Update THEMES (Azul Padrão rename & Branco-Gelo add)
$oldThemesPattern = "'#1976d2':\s*\{\s*name:\s*'Azul\s*\(Padr.*?o\)',\s*brand:\s*'#1976d2',\s*bg:\s*'#0f1a2a',\s*panel:\s*'#0f223d',\s*card:\s*'#112b4a',\s*text:\s*'#e9f1ff'\s*\},"
$newThemesReplacement = "'#1976d2': { name: 'Azul Padrão', brand: '#1976d2', bg: '#0f1a2a', panel: '#0f223d', card: '#112b4a', text: '#e9f1ff' },`r`n                '#e2e8f0': { name: 'Branco-Gelo', brand: '#e2e8f0', bg: '#0b0f19', panel: '#151e2c', card: '#1d273a', text: '#f1f5f9' },"
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldThemesPattern, $newThemesReplacement)

# 2. Premium Dropdown Styling
$oldDropdownCssPattern = "(?s)/\* Styling for Header Dropdowns \*/.*?\.header-dropdown-content button:hover \{.*?background-color: #1a2538;.*?\}"
$newDropdownCss = @'
        /* Styling for Header Dropdowns */
        .header-dropdown {
            position: relative;
            display: inline-block;
        }

        .header-dropdown-btn {
            background: rgba(25, 118, 210, 0.12) !important;
            color: #fff !important;
            border: 1px solid rgba(25, 118, 210, 0.25) !important;
            border-radius: 8px;
            padding: 6px 14px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
            height: 28px;
            line-height: 1;
        }

        .header-dropdown-btn:hover {
            background: rgba(25, 118, 210, 0.22) !important;
            border-color: rgba(25, 118, 210, 0.45) !important;
            box-shadow: 0 0 10px rgba(25, 118, 210, 0.15);
        }

        .header-dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(11, 18, 32, 0.96) !important;
            backdrop-filter: blur(10px);
            min-width: 190px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05);
            z-index: 1000;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 6px;
            border: 1px solid rgba(255,255,255,0.08) !important;
            animation: dropdownFadeIn 0.18s ease-out;
        }

        @keyframes dropdownFadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .header-dropdown-content button {
            color: #e9f1ff !important;
            padding: 10px 16px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            text-align: left;
            background: transparent;
            border: none;
            border-radius: 0;
            font-size: 13px;
            font-weight: 500;
            transition: background-color 0.2s, color 0.2s;
            cursor: pointer;
        }

        .header-dropdown-content button:hover {
            background-color: rgba(25, 118, 210, 0.2) !important;
            color: #fff !important;
        }
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldDropdownCssPattern, $newDropdownCss)

# 3. Emojis in Dropdowns HTML
$oldDropdownHtmlPattern = "(?s)<div class=""header-dropdown"" id=""boardDropdownContainer"">.*?<button type=""button"" id=""menuExportJson"">Salvar Json</button>.*?<button type=""button"" id=""menuImportJson"">Importar Json</button>.*?</div>\s*</div>"
$newDropdownHtml = @'
            <div class="header-dropdown" id="boardDropdownContainer">
                <button class="header-dropdown-btn" type="button">Quadros ▾</button>
                <div class="header-dropdown-content">
                    <button type="button" id="menuNewBoard">➕ Adicionar Quadro</button>
                    <button type="button" id="menuRenameBoard">✏️ Renomear Quadro</button>
                    <button type="button" id="menuCloneBoard">💾 Salvar Quadro como...</button>
                    <button type="button" id="menuBoardTheme">🎨 Cor do Quadro</button>
                    <button type="button" id="menuDeleteBoard" style="color: #ff6b6b;">🗑️ Excluir Quadro</button>
                </div>
            </div>
            
            <div class="header-dropdown" id="dataDropdownContainer">
                <button class="header-dropdown-btn" type="button">Dados ▾</button>
                <div class="header-dropdown-content">
                    <button type="button" id="menuExportJson">📥 Salvar Json</button>
                    <button type="button" id="menuImportJson">📤 Importar Json</button>
                </div>
            </div>
        </div>
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldDropdownHtmlPattern, $newDropdownHtml)

# 4. Scrollbar in Color Selector Grid (Theme Modal)
$oldThemeGridPattern = "(?s)const grid = el\('div'\);\s*grid\.style\.display = 'grid';\s*grid\.style\.gridTemplateColumns = 'repeat\(auto-fill, minmax\(130px, 1fr\)\)';\s*grid\.style\.gap = '10px';"
$newThemeGrid = @'
                    const grid = el('div');
                    grid.style.display = 'grid';
                    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr))';
                    grid.style.gap = '10px';
                    grid.style.maxHeight = '65vh';
                    grid.style.overflowY = 'auto';
                    grid.style.paddingRight = '8px';
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldThemeGridPattern, $newThemeGrid)

# 5. Brasília Time Backup Filename
$oldBackupExportPattern = "(?s)const timestamp = new Date\(\)\.toISOString\(\)\.replace\(/\[:.\]/g, '-'\);\s*const filename = `tea-planner-backup-\\\${timestamp}\.json`;"
$newBackupExport = @'
                let username = 'tea-planner';
                const userInfoEl = document.getElementById('userInfo');
                if (userInfoEl && userInfoEl.textContent) {
                    const text = userInfoEl.textContent.trim();
                    if (text.startsWith('Olá, ')) {
                        username = text.substring(5).trim();
                    }
                }
                username = username.replace(/[\\/:*?"<>|]/g, '_');

                const now = new Date();
                const yyyy = now.getFullYear();
                const mm = to2(now.getMonth() + 1);
                const dd = to2(now.getDate());
                const hh = to2(now.getHours());
                const min = to2(now.getMinutes());
                const filename = `${username} ${yyyy}${mm}${dd}-${hh}${min}.json`;
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldBackupExportPattern, $newBackupExport)

# Write output file in UTF-8
[System.IO.File]::WriteAllText($filePath, $content, $encoding)
Write-Output "All modifications successfully written to index.html using robust regex replaces."
