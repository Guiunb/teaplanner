$path = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Normalize CRLF to LF
$content = $content -replace "`r`n", "`n"

# ==================== BLOCK 1: CSS DROPDOWN ====================
$oldCssDropdown = '        .header-dropdown {
            position: relative;
            display: inline-block;
        }

        .header-dropdown-btn {
            background: #0e58a5;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 6px 12px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            transition: background-color 0.2s;
            height: 28px;
            line-height: 1;
        }

        .header-dropdown-btn:hover {
            background: #0c4d91;
        }

        .header-dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: #0b1220;
            min-width: 180px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.5);
            z-index: 1000;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #24314a;
            margin-top: 5px;
        }

        .header-dropdown-content button {
            color: #fff;
            padding: 10px 14px;
            text-decoration: none;
            display: block;
            width: 100%;
            text-align: left;
            background: transparent;
            border: none;
            border-radius: 0;
            font-size: 13px;
            transition: background-color 0.2s;
            cursor: pointer;
        }

        .header-dropdown-content button:hover {
            background-color: #1a2538;
        }

        .header-dropdown.active .header-dropdown-content {
            display: block;
        }'

$oldCssDropdown = $oldCssDropdown -replace "`r`n", "`n"

$newCssDropdown = '        /* Styling for Header Dropdowns - Premium Glassmorphism */
        :root {
            --header-text: #ffffff;
            --header-btn-bg: rgba(255, 255, 255, 0.12);
            --header-btn-border: rgba(255, 255, 255, 0.2);
            --header-btn-hover: rgba(255, 255, 255, 0.22);
            --header-btn-hover-border: rgba(255, 255, 255, 0.35);
        }

        .header-dropdown {
            position: relative;
            display: inline-block;
        }

        .header-dropdown-btn {
            background: var(--header-btn-bg) !important;
            color: var(--header-text) !important;
            border: 1px solid var(--header-btn-border) !important;
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
            background: var(--header-btn-hover) !important;
            border-color: var(--header-btn-hover-border) !important;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
        }

        .header-dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(15, 23, 42, 0.95) !important;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            min-width: 210px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08);
            z-index: 1000;
            border-radius: 12px;
            overflow: hidden;
            margin-top: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            padding: 4px 0;
            animation: dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes dropdownFadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .header-dropdown-content button {
            color: #f1f5f9 !important;
            padding: 8px 16px;
            margin: 2px 6px;
            border-radius: 6px;
            width: calc(100% - 12px);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
            text-align: left;
            background: transparent;
            border: none;
            font-size: 13px;
            font-weight: 500;
            transition: background-color 0.15s, color 0.15s;
            cursor: pointer;
        }

        .header-dropdown-content button:hover {
            background-color: var(--brand) !important;
            color: #fff !important;
        }

        .header-dropdown.active .header-dropdown-content {
            display: block;
        }'

$newCssDropdown = $newCssDropdown -replace "`r`n", "`n"


# ==================== BLOCK 2: CSS HEADER.APP ====================
$oldCssHeader = '        header.app {
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            gap: 10px;
            align-items: center;
            padding: 10px 12px;
            background: var(--brand);
            color: #fff;
            flex-wrap: wrap;
            transition: background-color .3s;
            flex-shrink: 0;
        }

        header.app.filters-active {
            background: #b85d00
        }

        header.app h1 {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            margin-right: auto;
            display: flex;
            align-items: center;
        }

        .header-icon {
            width: 22px;
            height: 22px;
            stroke: #fff;
            vertical-align: -4px;
            margin-right: 8px;
        }

        header.app input,
        header.app button {
            border: none;
            border-radius: 8px;
            padding: 6px 10px;
            background: #0e58a5;
            color: #fff
        }

        header.app button {
            cursor: pointer
        }

        header.app button.active {
            background: #ffd54f;
            color: #10243a
        }'

$oldCssHeader = $oldCssHeader -replace "`r`n", "`n"

$newCssHeader = '        header.app {
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            gap: 10px;
            align-items: center;
            padding: 10px 12px;
            background: var(--brand);
            color: var(--header-text);
            flex-wrap: wrap;
            transition: background-color .3s;
            flex-shrink: 0;
        }

        header.app.filters-active {
            background: #b85d00 !important;
            color: #ffffff !important;
        }

        header.app h1 {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
            margin-right: auto;
            display: flex;
            align-items: center;
        }

        .header-icon {
            width: 22px;
            height: 22px;
            stroke: var(--header-text);
            vertical-align: -4px;
            margin-right: 8px;
        }

        header.app input,
        header.app button {
            border: 1px solid var(--header-btn-border);
            border-radius: 8px;
            padding: 6px 10px;
            background: var(--header-btn-bg);
            color: var(--header-text);
            transition: background-color 0.2s, border-color 0.2s;
        }

        header.app button {
            cursor: pointer;
        }

        header.app button:hover {
            background: var(--header-btn-hover);
            border-color: var(--header-btn-hover-border);
        }

        header.app button.active {
            background: #ffd54f !important;
            color: #10243a !important;
            border-color: #ffd54f !important;
        }'

$newCssHeader = $newCssHeader -replace "`r`n", "`n"


# ==================== BLOCK 3: HTML BOARD DROPDOWNS ====================
$oldHtmlDropdowns = '            <div class="header-dropdown" id="boardDropdownContainer">
                <button class="header-dropdown-btn" type="button">Quadros ▾</button>
                <div class="header-dropdown-content">
                    <button type="button" id="menuNewBoard">Adicionar Quadro</button>
                    <button type="button" id="menuRenameBoard">Renomear Quadro</button>
                    <button type="button" id="menuCloneBoard">Salvar Quadro como...</button>
                    <button type="button" id="menuBoardTheme">Cor do Quadro</button>
                    <button type="button" id="menuDeleteBoard" style="color: #ff6b6b;">Excluir Quadro</button>
                </div>
            </div>
            
            <div class="header-dropdown" id="dataDropdownContainer">
                <button class="header-dropdown-btn" type="button">Dados ▾</button>
                <div class="header-dropdown-content">
                    <button type="button" id="menuExportJson">Salvar Json</button>
                    <button type="button" id="menuImportJson">Importar Json</button>
                </div>
            </div>'

$oldHtmlDropdowns = $oldHtmlDropdowns -replace "`r`n", "`n"

$newHtmlDropdowns = '            <div class="header-dropdown" id="boardDropdownContainer">
                <button class="header-dropdown-btn" type="button">Quadros &#9662;</button>
                <div class="header-dropdown-content">
                    <button type="button" id="menuNewBoard">➕ Adicionar Quadro</button>
                    <button type="button" id="menuRenameBoard">✏️ Renomear Quadro</button>
                    <button type="button" id="menuCloneBoard">💾 Salvar Quadro como...</button>
                    <button type="button" id="menuBoardTheme">🎨 Cor do Quadro</button>
                    <button type="button" id="menuDeleteBoard" style="color: #ff6b6b;">🗑️ Excluir Quadro</button>
                </div>
            </div>
            
            <div class="header-dropdown" id="dataDropdownContainer">
                <button class="header-dropdown-btn" type="button">Dados &#9662;</button>
                <div class="header-dropdown-content">
                    <button type="button" id="menuExportJson">📥 Salvar Json</button>
                    <button type="button" id="menuImportJson">📤 Importar Json</button>
                </div>
            </div>'

$newHtmlDropdowns = $newHtmlDropdowns -replace "`r`n", "`n"


# ==================== BLOCK 4: HTML LIST CONTEXT MENU ====================
$oldHtmlListCtx = '    <div id="ctx-list" class="ctx">
        <button data-action="list-del">🗑️ Excluir lista</button>
        <button data-action="list-move-all">➡️ Mover todos para ▶</button>
        <div class="ctx-sub" id="ctx-list-move-sub"></div>
    </div>'

$oldHtmlListCtx = $oldHtmlListCtx -replace "`r`n", "`n"

$newHtmlListCtx = '    <div id="ctx-list" class="ctx">
        <button data-action="list-del">🗑️ Excluir lista</button>
        <button data-action="list-del-all">🗑️ Excluir TODOS desta Lista</button>
        <button data-action="list-move-all">➡️ Mover TODOS desta Lista ▶</button>
        <div class="ctx-sub" id="ctx-list-move-sub"></div>
        <button data-action="list-move-board">➡️ Mover LISTA para outro quadro ▶</button>
        <div class="ctx-sub" id="ctx-list-move-board-sub"></div>
    </div>'

$newHtmlListCtx = $newHtmlListCtx -replace "`r`n", "`n"


# ==================== BLOCK 5: JS SETBOARDTHEME ====================
$oldJsTheme = '            function setBoardTheme(color) {
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

$oldJsTheme = $oldJsTheme -replace "`r`n", "`n"

$newJsTheme = '            function getContrastYIQ(hexcolor){
                if (!hexcolor || hexcolor.length < 3) return ''dark'';
                var hex = hexcolor.replace(''#'', '''');
                if (hex.length === 3) {
                    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
                }
                var r = parseInt(hex.substr(0,2),16);
                var g = parseInt(hex.substr(2,2),16);
                var b = parseInt(hex.substr(4,2),16);
                var yiq = ((r*299)+(g*587)+(b*114))/1000;
                return (yiq >= 170) ? ''light'' : ''dark'';
            }

            function setBoardTheme(color) {
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

$newJsTheme = $newJsTheme -replace "`r`n", "`n"


# ==================== BLOCK 6: JS SUBSCRIBETOCURRENTBOARD ====================
$oldJsSync = '            function subscribeToCurrentBoard(uid, boardId) {
                if (!isFirebaseReady || !uid || !boardId) return;

                if (currentBoardRef) currentBoardRef.off();

                console.log(`Sync: Escutando alterações no quadro ${boardId}...`);
                currentBoardRef = db.ref(''users/'' + uid + ''/boards/'' + boardId);

                currentBoardRef.on(''value'', (snapshot) => {
                    let val = snapshot.val();
                    
                    if (!snapshot.exists()) {
                        const localBoardStr = localStorage.getItem(LS_BOARD_PREFIX + boardId);
                        if (localBoardStr && localBoardStr !== ''[]'' && localBoardStr !== '''') {
                            console.log(`Sync: Firebase board ${boardId} não existe, enviando local...`);
                            try {
                                currentBoardRef.set(JSON.parse(localBoardStr));
                                return;
                            } catch (e) {
                                console.error("Erro ao fazer parse do quadro local para enviar:", e);
                            }
                        }
                    }

                    if (!val) val = [];

                    const currentLocalData = localStorage.getItem(LS_BOARD_PREFIX + boardId);
                    const valStr = JSON.stringify(val);

                    if (valStr === currentLocalData) return;

                    console.log("Sync: Conteúdo do quadro atualizado remotamente.");
                    isRemoteUpdate = true;
                    localStorage.setItem(LS_BOARD_PREFIX + boardId, valStr);

                    if (currentBoardId === boardId) {
                        loadAndRenderAll();
                    }
                    isRemoteUpdate = false;
                });
            }'

$oldJsSync = $oldJsSync -replace "`r`n", "`n"

$newJsSync = '            function subscribeToCurrentBoard(uid, boardId) {
                if (!isFirebaseReady || !uid || !boardId) return;

                if (currentBoardRef) currentBoardRef.off();

                if (boardId === ''board-todos'') {
                    console.log(''Sync: Escutando alterações em TODOS os quadros...'');
                    currentBoardRef = db.ref(''users/'' + uid + ''/boards'');
                    currentBoardRef.on(''value'', (snapshot) => {
                        let val = snapshot.val();
                        if (!val) val = {};

                        let changed = false;
                        Object.keys(val).forEach(bId => {
                            if (bId === ''board-todos'') return;
                            const boardDataStr = JSON.stringify(val[bId]);
                            const localData = localStorage.getItem(LS_BOARD_PREFIX + bId);
                            if (boardDataStr !== localData) {
                                localStorage.setItem(LS_BOARD_PREFIX + bId, boardDataStr);
                                changed = true;
                            }
                        });

                        // Sempre carrega se houver alteração ou se for o primeiro render do board-todos
                        if (changed || boardEl.children.length === 0) {
                            isRemoteUpdate = true;
                            loadAndRenderAll();
                            isRemoteUpdate = false;
                        }
                    });
                    return;
                }

                console.log(`Sync: Escutando alterações no quadro ${boardId}...`);
                currentBoardRef = db.ref(''users/'' + uid + ''/boards/'' + boardId);

                currentBoardRef.on(''value'', (snapshot) => {
                    let val = snapshot.val();
                    
                    if (!snapshot.exists()) {
                        const localBoardStr = localStorage.getItem(LS_BOARD_PREFIX + boardId);
                        if (localBoardStr && localBoardStr !== ''[]'' && localBoardStr !== '''') {
                            console.log(`Sync: Firebase board ${boardId} não existe, enviando local...`);
                            try {
                                currentBoardRef.set(JSON.parse(localBoardStr));
                                return;
                            } catch (e) {
                                console.error(''Erro ao fazer parse do quadro local para enviar:'', e);
                            }
                        }
                    }

                    if (!val) val = [];

                    const currentLocalData = localStorage.getItem(LS_BOARD_PREFIX + boardId);
                    const valStr = JSON.stringify(val);

                    if (valStr === currentLocalData) return;

                    console.log(''Sync: Conteúdo do quadro atualizado remotamente.'');
                    isRemoteUpdate = true;
                    localStorage.setItem(LS_BOARD_PREFIX + boardId, valStr);

                    if (currentBoardId === boardId) {
                        loadAndRenderAll();
                    }
                    isRemoteUpdate = false;
                });
            }'

$newJsSync = $newJsSync -replace "`r`n", "`n"


# ==================== PROCESS REPLACEMENTS ====================
$replacedCount = 0

if ($content.Contains($oldCssDropdown)) {
    $content = $content.Replace($oldCssDropdown, $newCssDropdown)
    $replacedCount++
} else {
    Write-Host "Warning: Block 1 (CSS Dropdown) not found."
}

if ($content.Contains($oldCssHeader)) {
    $content = $content.Replace($oldCssHeader, $newCssHeader)
    $replacedCount++
} else {
    Write-Host "Warning: Block 2 (CSS Header) not found."
}

if ($content.Contains($oldHtmlDropdowns)) {
    $content = $content.Replace($oldHtmlDropdowns, $newHtmlDropdowns)
    $replacedCount++
} else {
    Write-Host "Warning: Block 3 (HTML Dropdowns) not found."
}

if ($content.Contains($oldHtmlListCtx)) {
    $content = $content.Replace($oldHtmlListCtx, $newHtmlListCtx)
    $replacedCount++
} else {
    Write-Host "Warning: Block 4 (HTML List Ctx) not found."
}

if ($content.Contains($oldJsTheme)) {
    $content = $content.Replace($oldJsTheme, $newJsTheme)
    $replacedCount++
} else {
    Write-Host "Warning: Block 5 (JS Theme) not found."
}

if ($content.Contains($oldJsSync)) {
    $content = $content.Replace($oldJsSync, $newJsSync)
    $replacedCount++
} else {
    Write-Host "Warning: Block 6 (JS Sync) not found."
}

# Restore CRLF
$content = $content -replace "`n", "`r`n"

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)

Write-Host "Replacements completed successfully: $replacedCount/6 blocks replaced."
