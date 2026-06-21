import os

html_path = r'c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Dropdown and Header button CSS styles
# Let's locate the CSS block for .header-dropdown and replace it with the premium design.
old_dropdown_css = """        /* Styling for Header Dropdowns */
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

        .header-dropdown.active .header-dropdown-content {
            display: block;
        }"""

new_dropdown_css = """        /* Styling for Header Dropdowns - Premium Glassmorphism */
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
        }"""

# Apply dropdown CSS changes
if old_dropdown_css in content:
    content = content.replace(old_dropdown_css, new_dropdown_css)
else:
    # Try with a simpler replace or notify
    print("Warning: old_dropdown_css block not found exactly as expected.")

# 2. Modify header button CSS to use adaptive header variables
old_header_styles = """        header.app {
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
        }"""

new_header_styles = """        header.app {
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
        }"""

if old_header_styles in content:
    content = content.replace(old_header_styles, new_header_styles)
else:
    print("Warning: old_header_styles block not found exactly as expected.")

# 3. Replace the garbled HTML dropdown containers
old_board_dropdown = """                        <div class="header-dropdown" id="boardDropdownContainer">
                <button class="header-dropdown-btn" type="button">Quadros â–¾</button>
                <div class="header-dropdown-content">
                    <button type="button" id="menuNewBoard">âž• Adicionar Quadro</button>
                    <button type="button" id="menuRenameBoard">âœ ï¸  Renomear Quadro</button>
                    <button type="button" id="menuCloneBoard">ðŸ’¾ Salvar Quadro como...</button>
                    <button type="button" id="menuBoardTheme">ðŸŽ¨ Cor do Quadro</button>
                    <button type="button" id="menuDeleteBoard" style="color: #ff6b6b;">ðŸ—‘ï¸  Excluir Quadro</button>
                </div>
            </div>
            
            <div class="header-dropdown" id="dataDropdownContainer">
                <button class="header-dropdown-btn" type="button">Dados â–¾</button>
                <div class="header-dropdown-content">
                    <button type="button" id="menuExportJson">ðŸ“¥ Salvar Json</button>
                    <button type="button" id="menuImportJson">ðŸ“¤ Importar Json</button>
                </div>
            </div>"""

new_board_dropdown = """                        <div class="header-dropdown" id="boardDropdownContainer">
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
            </div>"""

if old_board_dropdown in content:
    content = content.replace(old_board_dropdown, new_board_dropdown)
else:
    print("Warning: old_board_dropdown block not found exactly as expected. Trying fallback replace...")
    # fallback replacements for specific garbled strings
    content = content.replace("Quadros â–¾", "Quadros &#9662;")
    content = content.replace("Dados â–¾", "Dados &#9662;")
    content = content.replace("âž• Adicionar Quadro", "➕ Adicionar Quadro")
    content = content.replace("âœ ï¸  Renomear Quadro", "✏️ Renomear Quadro")
    content = content.replace("ðŸ’¾ Salvar Quadro como...", "💾 Salvar Quadro como...")
    content = content.replace("ðŸŽ¨ Cor do Quadro", "🎨 Cor do Quadro")
    content = content.replace("ðŸ—‘ Excluir Quadro", "🗑️ Excluir Quadro")
    content = content.replace("ðŸ—‘ï¸  Excluir Quadro", "🗑️ Excluir Quadro")
    content = content.replace("ðŸ“¥ Salvar Json", "📥 Salvar Json")
    content = content.replace("ðŸ“¤ Importar Json", "📤 Importar Json")

# 4. Replace the garbled list context menu buttons
old_list_ctx = """        <div id="ctx-list" class="ctx">
        <button data-action="list-del">ðŸ—‘ï¸  Excluir lista</button>
        <button data-action="list-del-all">ðŸ—‘ï¸  Excluir TODOS desta Lista</button>
        <button data-action="list-move-all">âž¡ï¸  Mover TODOS desta Lista</button>
        <div class="ctx-sub" id="ctx-list-move-sub"></div>
        <button data-action="list-move-board">âž¡ï¸  Mover LISTA para outro quadro</button>
        <div class="ctx-sub" id="ctx-list-move-board-sub"></div>
    </div>"""

new_list_ctx = """        <div id="ctx-list" class="ctx">
        <button data-action="list-del">🗑️ Excluir lista</button>
        <button data-action="list-del-all">🗑️ Excluir TODOS desta Lista</button>
        <button data-action="list-move-all">➡️ Mover TODOS desta Lista</button>
        <div class="ctx-sub" id="ctx-list-move-sub"></div>
        <button data-action="list-move-board">➡️ Mover LISTA para outro quadro</button>
        <div class="ctx-sub" id="ctx-list-move-board-sub"></div>
    </div>"""

if old_list_ctx in content:
    content = content.replace(old_list_ctx, new_list_ctx)
else:
    print("Warning: old_list_ctx block not found exactly as expected. Trying fallback replace...")
    content = content.replace("ðŸ—‘ï¸  Excluir lista", "🗑️ Excluir lista")
    content = content.replace("ðŸ—‘ï¸  Excluir TODOS desta Lista", "🗑️ Excluir TODOS desta Lista")
    content = content.replace("âž¡ï¸  Mover TODOS desta Lista", "➡️ Mover TODOS desta Lista")
    content = content.replace("âž¡ï¸  Mover LISTA para outro quadro", "➡️ Mover LISTA para outro quadro")

# 5. Inject YIQ contrast logic and update setBoardTheme
old_theme_function = """            function setBoardTheme(color) {
                const r = document.querySelector(':root');
                const safeColor = color || DEFAULT_THEME_COLOR;
                const theme = THEMES[safeColor] || THEMES[DEFAULT_THEME_COLOR];

                if (theme) {
                    r.style.setProperty('--brand', theme.brand);
                    r.style.setProperty('--bg', theme.bg);
                    r.style.setProperty('--panel', theme.panel);
                    r.style.setProperty('--card', theme.card);
                    r.style.setProperty('--ink', theme.text);
                } else {
                    r.style.setProperty('--brand', safeColor);
                    r.style.setProperty('--bg', '#0f1a2a');
                    r.style.setProperty('--panel', '#0f223d');
                    r.style.setProperty('--card', '#112b4a');
                    r.style.setProperty('--ink', '#e9f1ff');
                }
            }"""

new_theme_function = """            function getContrastYIQ(hexcolor){
                if (!hexcolor || hexcolor.length < 3) return 'dark';
                var hex = hexcolor.replace('#', '');
                if (hex.length === 3) {
                    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
                }
                var r = parseInt(hex.substr(0,2),16);
                var g = parseInt(hex.substr(2,2),16);
                var b = parseInt(hex.substr(4,2),16);
                var yiq = ((r*299)+(g*587)+(b*114))/1000;
                return (yiq >= 170) ? 'light' : 'dark';
            }

            function setBoardTheme(color) {
                const r = document.querySelector(':root');
                const safeColor = color || DEFAULT_THEME_COLOR;
                const theme = THEMES[safeColor] || THEMES[DEFAULT_THEME_COLOR];

                if (theme) {
                    r.style.setProperty('--brand', theme.brand);
                    r.style.setProperty('--bg', theme.bg);
                    r.style.setProperty('--panel', theme.panel);
                    r.style.setProperty('--card', theme.card);
                    r.style.setProperty('--ink', theme.text);
                } else {
                    r.style.setProperty('--brand', safeColor);
                    r.style.setProperty('--bg', '#0f1a2a');
                    r.style.setProperty('--panel', '#0f223d');
                    r.style.setProperty('--card', '#112b4a');
                    r.style.setProperty('--ink', '#e9f1ff');
                }

                // Dynamic Header Adaptation based on contrast/brightness of the brand color
                const brightness = getContrastYIQ(safeColor);
                if (brightness === 'light') {
                    r.style.setProperty('--header-text', '#0f172a');
                    r.style.setProperty('--header-btn-bg', 'rgba(15, 23, 42, 0.08)');
                    r.style.setProperty('--header-btn-border', 'rgba(15, 23, 42, 0.15)');
                    r.style.setProperty('--header-btn-hover', 'rgba(15, 23, 42, 0.15)');
                    r.style.setProperty('--header-btn-hover-border', 'rgba(15, 23, 42, 0.3)');
                } else {
                    r.style.setProperty('--header-text', '#ffffff');
                    r.style.setProperty('--header-btn-bg', 'rgba(255, 255, 255, 0.12)');
                    r.style.setProperty('--header-btn-border', 'rgba(255, 255, 255, 0.2)');
                    r.style.setProperty('--header-btn-hover', 'rgba(255, 255, 255, 0.22)');
                    r.style.setProperty('--header-btn-hover-border', 'rgba(255, 255, 255, 0.35)');
                }
            }"""

if old_theme_function in content:
    content = content.replace(old_theme_function, new_theme_function)
else:
    print("Warning: old_theme_function block not found exactly as expected.")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML successfully updated with premium styles, adaptiveness, and fixed emojis.")
