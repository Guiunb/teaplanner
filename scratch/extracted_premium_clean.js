

/* AI ASSISTANT IN HEADER */

.ai-assistant-container {

position: relative;

z-index: 995;

display: flex;

flex-direction: column;

flex-grow: 1;

min-width: 280px;

max-width: 450px;

margin: 2px 0;

}



.ai-prompt-bar {

background: rgba(0, 0, 0, 0.25);

border: 1px solid rgba(25, 118, 210, 0.3);

border-radius: 20px;

padding: 2px 8px;

display: flex;

align-items: center;

gap: 6px;

height: 34px;

box-sizing: border-box;

transition: border-color 0.3s, box-shadow 0.3s;

}



.ai-prompt-bar:focus-within {

border-color: rgba(25, 118, 210, 0.8);

box-shadow: 0 0 10px rgba(25, 118, 210, 0.25);

}



.ai-input {

flex: 1;

background: transparent;

border: none;

color: #fff;

padding: 4px 0;

font-size: 14px;

outline: none;

min-width: 0;

.ai-input::placeholder {

color: rgba(255, 255, 255, 0.55);

}

.ai-btn {

background: transparent;

border: none;

color: #9fb3d2;

cursor: pointer;

padding: 0;

display: flex;

align-items: center;

justify-content: center;

transition: background 0.2s, color 0.2s;

outline: none;

width: 26px;

height: 26px;

border-radius: 50%;

font-size: 13px;

}



.ai-btn:hover {

background: rgba(255, 255, 255, 0.1);

color: #fff;

.ai-btn.active {

color: #ffd54f;

}



.ai-mic-btn.recording {

background: rgba(239, 83, 80, 0.3);

color: #ef5350;

animation: pulseMic 1.5s infinite;

}



.ai-send-btn {

background: rgba(255, 255, 255, 0.15);

border: 1px solid rgba(255, 255, 255, 0.15);

color: #fff;

transition: background-color 0.2s, border-color 0.2s;

.ai-send-btn:hover {

background: rgba(255, 255, 255, 0.25);

border-color: rgba(255, 255, 255, 0.3);

}



.ai-response-bubble {

right: 0;

margin-top: 6px;

background: var(--panel);

border: 1px solid rgba(255, 255, 255, 0.08);

padding: 10px 12px;

color: var(--ink);

font-size: 13px;

box-shadow: 0 10px 30px rgba(0, 0, 0, .4);

display: none;

max-height: 200px;

overflow-y: auto;

z-index: 1001;

animation: fadeInAI 0.2s ease-out;

}



.ai-response-bubble.active {

display: block;

}



.ai-response-bubble .ai-explanation {

font-weight: 500;

color: #64b5f6;

margin-bottom: 4px;

}



.ai-response-bubble .ai-question {

font-weight: 600;

color: #ffd54f;

margin-top: 4px;

}



.ai-response-bubble .ai-error {

color: #ff8a80;

font-weight: 500;

}



/* Soundwave animation for mic recording */

.ai-soundwave {

display: none;

align-items: center;

gap: 2px;

height: 14px;

padding: 0 4px;

}



.ai-soundwave.active {

display: flex;

}



.ai-soundwave span {

display: block;

width: 2px;

height: 6px;

background: #ef5350;

border-radius: 2px;

animation: waveBounce 1.2s infinite ease-in-out;

}



.ai-soundwave span:nth-child(2) { animation-delay: 0.2s; height: 10px; }

.ai-soundwave span:nth-child(3) { animation-delay: 0.4s; height: 8px; }

.ai-soundwave span:nth-child(4) { animation-delay: 0.6s; height: 4px; }



@keyframes fadeInAI {

from { opacity: 0; transform: translateY(5px); }

to { opacity: 1; transform: translateY(0); }

}



@keyframes pulseMic {

0% { box-shadow: 0 0 0 0 rgba(239, 83, 80, 0.5); }

70% { box-shadow: 0 0 0 10px rgba(239, 83, 80, 0); }

100% { box-shadow: 0 0 0 0 rgba(239, 83, 80, 0); }

}

@keyframes waveBounce {

0%, 100% { transform: scaleY(1); }

50% { transform: scaleY(2); }

}



/* Styling for Header Dropdowns */

.header-dropdown {

position: relative;

display: inline-block;

}



.header-dropdown-btn {

background: rgba(255, 255, 255, 0.15);

color: #fff;

border: 1px solid rgba(255, 255, 255, 0.15);

border-radius: 8px;

padding: 6px 12px;

font-weight: bold;

cursor: pointer;

display: flex;

align-items: center;

gap: 6px;

font-size: 13px;

transition: background-color 0.2s, border-color 0.2s;

height: 28px;

line-height: 1;

}



.header-dropdown-btn:hover {

background: rgba(255, 255, 255, 0.25);

border-color: rgba(255, 255, 255, 0.3);

}



.header-dropdown-content {

display: none;

position: absolute;

top: 100%;

left: 0;

background: color-mix(in srgb, var(--panel) 92%, #000);

backdrop-filter: blur(12px);

-webkit-backdrop-filter: blur(12px);

min-width: 185px;

box-shadow: 0px 10px 30px rgba(0,0,0,0.6);

z-index: 1000;

border-radius: 10px;

overflow: hidden;

border: 1px solid rgba(255, 255, 255, 0.1);

margin-top: 6px;

animation: dropdownSlideIn 0.2s ease-out;

}



@keyframes dropdownSlideIn {

from {

opacity: 0;

transform: translateY(-8px);

}

to {

opacity: 1;

transform: translateY(0);

}

}



/* High specificity overrides to completely strip default header button styles */

header.app .header-dropdown-content button {

color: var(--ink) !important;

padding: 10px 14px !important;

text-decoration: none !important;

display: flex !important;

align-items: center !important;

width: 100% !important;

text-align: left !important;

background: transparent !important;

border: none !important;

border-radius: 0 !important;

font-size: 13px !important;

font-weight: 500 !important;

line-height: inherit !important;

height: auto !important;

transition: background-color 0.2s, padding-left 0.2s, color 0.2s !important;

cursor: pointer !important;

}



header.app .header-dropdown-content button:hover {

background-color: rgba(255, 255, 255, 0.08) !important;

border-color: transparent !important;

padding-left: 20px !important;

color: #fff !important;

}



header.app .header-dropdown-content button#menuDeleteBoard {

color: #ff6b6b !important;

}



header.app .header-dropdown-content button#menuDeleteBoard:hover {

background-color: rgba(255, 107, 107, 0.15) !important;

color: #ff8e8e !important;

}



.header-dropdown.active .header-dropdown-content {

display: block;

}



.weekly-add-btn {

background: transparent;

border: none;

color: var(--brand);

font-size: 18px;

font-weight: bold;

cursor: pointer;

padding: 0 6px;

border-radius: 4px;

line-height: 1;

transition: background-color 0.2s, color 0.2s;

display: flex;

align-items: center;

justify-content: center;

}



.weekly-add-btn:hover {

background-color: rgba(255, 255, 255, 0.1);

color: #fff;

}



/* Premium Switch / Toggle Switch Style */

.premium-switch-container {

display: flex;

align-items: center;

justify-content: space-between;

padding: 10px 12px;

background: var(--bg);

border: 1px solid rgba(255, 255, 255, 0.15);

border-radius: 8px;

margin-bottom: 12px;

}

.premium-switch-label {

font-size: 14px;

font-weight: 500;

color: #fff;

}

.premium-switch {

position: relative;

display: inline-block;

width: 46px;

height: 26px;

}

.premium-switch input {

opacity: 0;

width: 0;

height: 0;

}

.premium-slider {

position: absolute;

cursor: pointer;

top: 0; left: 0; right: 0; bottom: 0;

background-color: rgba(255, 255, 255, 0.15);

transition: .3s;

border-radius: 26px;

border: 1px solid #37474f;

}

.premium-slider:before {

position: absolute;

content: "";

height: 18px;

width: 18px;

left: 3px;

bottom: 3px;

background-color: #fff;

transition: .3s;

border-radius: 50%;

box-shadow: 0 2px 4px rgba(0,0,0,0.3);

}

input:checked + .premium-slider {

background-color: var(--brand);

border-color: var(--brand);

}

input:checked + .premium-slider:before {

transform: translateX(20px);

}

/* Alert dialog option items */

.alert-option-item {

display: flex;

align-items: center;

justify-content: space-between;

padding: 12px 14px;

background: var(--bg);

border: 1px solid rgba(255, 255, 255, 0.15);

border-radius: 8px;

margin-bottom: 8px;

cursor: pointer;

transition: background 0.2s, border-color 0.2s;

user-select: none;

font-size: 14px;

}

.alert-option-item:hover {

background: #16243f;

border-color: #2e3f5d;

}

.alert-option-item.selected {

background: color-mix(in srgb, var(--brand) 15%, var(--panel));

border-color: var(--brand);

}

.alert-option-item .check-mark {

color: var(--brand);

font-weight: bold;

font-size: 15px;

display: none;

}

.alert-option-item.selected .check-mark {

display: block;

}



/* Weekday circles */

.weekday-btn {

width: 32px;

height: 32px;

border-radius: 50%;

border: 1px solid rgba(255, 255, 255, 0.15);

background: transparent;

color: #fff;

cursor: pointer;

font-size: 13px;

font-weight: bold;

display: flex;

align-items: center;

justify-content: center;

transition: background 0.2s, border-color 0.2s, transform 0.1s;

outline: none;

}

.weekday-btn:hover {

background: rgba(255,255,255,0.05);

}

.weekday-btn.selected {

background: var(--brand);

border-color: var(--brand);

}

.weekday-btn:active {

transform: scale(0.9);

}



/* ANALOG TIME PICKER STYLES */

.analog-time-picker-backdrop {

position: fixed;

top: 0; left: 0; right: 0; bottom: 0;

background: rgba(0, 0, 0, 0.7);

display: flex;

align-items: center;

justify-content: center;

z-index: 15000;

font-family: system-ui, -apple-system, sans-serif;

}

.analog-time-picker-modal {

background: #192638;

border: 1px solid #283e5a;

border-radius: 16px;

width: 310px;

padding: 16px;

display: flex;

flex-direction: column;

align-items: center;

box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);

user-select: none;

}

.analog-time-picker-title {

color: #9fb3d2;

font-size: 13px;

margin-bottom: 12px;

align-self: flex-start;

font-weight: 500;

}

.analog-time-picker-display {

display: flex;

align-items: center;

justify-content: center;

gap: 6px;

margin-bottom: 16px;

}

.analog-time-picker-display input {

width: 68px;

height: 58px;

background: #0f1c2c;

border: 1px solid #243c5b;

border-radius: 8px;

color: #9fb3d2;

font-size: 36px;

font-weight: bold;

text-align: center;

outline: none;

padding: 0;

transition: all 0.2s;

cursor: pointer;

}

.analog-time-picker-display input.active {

background: var(--brand);

color: #fff;

border-color: var(--brand);

}

.analog-time-picker-display span {

color: #fff;

font-size: 28px;

font-weight: bold;

}

.analog-time-picker-face-container {

position: relative;

width: 230px;

height: 230px;

background: #0b1726;

border-radius: 50%;

margin-bottom: 16px;

touch-action: none;

}

.analog-time-picker-number {

position: absolute;

width: 28px;

height: 28px;

line-height: 28px;

text-align: center;

font-size: 13px;

font-weight: bold;

color: #9fb3d2;

border-radius: 50%;

pointer-events: none;

z-index: 2;

transition: color 0.1s;

}

.analog-time-picker-number.selected {

color: #fff;

}

.analog-time-picker-svg {

position: absolute;

top: 0; left: 0;

width: 230px;

height: 230px;

pointer-events: none;

z-index: 1;

}

.analog-time-picker-keyboard-input-msg {

color: #9fb3d2;

font-size: 13px;

margin: 40px 0;

text-align: center;

}

.analog-time-picker-footer {

display: flex;

width: 100%;

justify-content: space-between;

align-items: center;

margin-top: 10px;

}

.analog-time-picker-keyboard-btn {

background: transparent;

border: none;

color: #9fb3d2;

font-size: 20px;

cursor: pointer;

padding: 8px;

border-radius: 50%;

display: flex;

align-items: center;

justify-content: center;

transition: background 0.2s;

}

.analog-time-picker-keyboard-btn:hover {

background: rgba(255, 255, 255, 0.05);

}

.analog-time-picker-buttons {

display: flex;

gap: 10px;

}

.analog-time-picker-buttons button {

background: transparent;

border: none;

color: #ffd54f;

font-weight: bold;

font-size: 14px;

cursor: pointer;

padding: 8px 12px;

border-radius: 6px;

text-transform: uppercase;

transition: background 0.2s;

}

.analog-time-picker-buttons button:hover {

background: rgba(255, 213, 79, 0.1);

}



/* CHECKLIST FILTERS STYLES */

.filter-checkbox-list {

display: flex;

flex-direction: column;

gap: 8px;

max-height: 250px;

overflow-y: auto;

padding: 6px 2px;

}

</style>

</head>



<body>

<header class="app" id="appHeader">

<h1>

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"

stroke-linejoin="round" class="header-icon">

<path

d="M17.32 10c.88.88 1.39 2.07 1.39 3.32 0 2.65-2.15 4.8-4.8 
       4.8s-4.8-2.15-4.8-4.8c0-1.25.51-2.44 1.39-3.32">

</path>

<path d="M12 18.12V22"></path>

<path

d="M12 2a9.99 9.99 0 0 1 8.61 14.61A9.99 9.99 0 0 1 12 22a9.99 9.99 0 0 1-8.61-5.39A9.99 
       9.99 0 0 1 12 2z">

</path>

</svg>

TEA PLANNER

</h1>

<button id="loginBtn" style="background:#4285F4; color:white;">Login Google</button>

<span id="userInfo" style="font-size:12px; font-weight:bold;"></span>



<!-- BOARD CONTROLS -->

<div class="board-controls"

style="display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,0.2); padding: 4px 8px; 
       border-radius: 8px; margin-right: auto; flex-wrap: wrap;">

<select id="boardSelect"

style="background: rgba(255, 255, 255, 0.12); color: white; border: 1px solid rgba(255, 255, 
       255, 0.15); padding: 4px 8px; border-radius: 8px; max-width: 200px; cursor: pointer; font-weight: bold;">

<!-- Options populated by JS -->

</select>



<div class="header-dropdown" id="boardDropdownContainer">

<button class="header-dropdown-btn" type="button">Quadros ?</button>

<div class="header-dropdown-content">

<button type="button" id="menuNewBoard">Adicionar Quadro</button>

<button type="button" id="menuRenameBoard">Renomear Quadro</button>

<button type="button" id="menuCloneBoard">Salvar Quadro como...</button>

<button type="button" id="menuBoardTheme">Cor do Quadro</button>

<button type="button" id="menuDeleteBoard" style="color: #ff6b6b;">excluir Quadro</button>

</div>

</div>



<div class="header-dropdown" id="dataDropdownContainer">

<button class="header-dropdown-btn" type="button">Dados ?</button>

<div class="header-dropdown-content">

<button type="button" id="menuExportJson">Salvar Json</button>

<button type="button" id="menuImportJson">Importar Json</button>

</div>

</div>

<div style="width: 1px; height: 20px; background: rgba(255,255,255,0.2); margin: 0 4px; display: 
       none;"></div>

<!-- Ocultos para manter compatibilidade de IDs legados -->

<button id="newBoardBtn" style="display:none"></button>

<button id="editBoardBtn" style="display:none"></button>

<button id="cloneBoardBtn" style="display:none"></button>

<button id="boardThemeBtn" style="display:none"></button>

<button id="deleteBoardBtn" style="display:none"></button>

</div>



<button id="undo" title="Desfazer (Ctrl+Z)">?</button>

<button id="redo" title="Refazer (Ctrl+Shift+Z)">?</button>

<button id="toggleSelectionModeBtn" title="Ativar/Desativar modo de sele��o m�ltipla">??? 
       Multi-sele��o</button>

<button id="filterColorsBtn" title="Filtrar por cor">Filtro de cor</button>

<button id="clearFilters">Limpar filtros</button>

<button id="filterBoardsBtn" title="Filtrar quadros exibidos no TODOS" style="display: none;">Filtrar 
       Quadros</button>

<span id="filtersOn" class="badge" hidden>Filtros ativos</span>

<input id="fTime" name="fTime" type="text" placeholder="Tempo (ex: 45m)" style="width:120px"

title="Filtra cart�es com tempo definido menor ou igual ao valor. Use 'm' para minutos, 'h' para 
       horas. Ex: 90m or 1h 30m">

<strong id="sumTimersDisplay" title="Selecionado: 0:00 / Filtrado: 0:00 / Total: 0:00">0:00 min</strong>

<label>De <input id="fFrom" name="fFrom" type="date"></label>

<label>At� <input id="fTo" name="fTo" type="date"></label>



<button id="toggleBoardBtn" title="Mostrar/Ocultar Kanban">?</button>

<button id="toggleMatrixBtn" title="Mostrar/Ocultar Matriz">?</button>

<button id="toggleAgendaBtn" title="Mostrar/Ocultar Agenda">???</button>

<button id="toggleWeeklyBtn" title="Vis�o Semanal">?? Semana</button>

<button id="manualFocusBtn" title="Minimizar para Timer" style="background: rgba(102, 187, 106, 0.2); 
       border-color: rgba(102, 187, 106, 0.4);">?? Foco</button>



<button id="quickSaveBtn" style="display:none"></button>

<label class="toggle-switch" title="Configura��o R�pida: Ao criar um cart�o, abrir pop-ups de timer e 
       cor.">

<input type="checkbox" id="quickConfigToggle" name="quickConfigToggle" class="toggle-switch-input">

<span class="toggle-switch-label">??</span>

<span class="toggle-switch-button">OFF</span>

</label>

<button id="addList">+ Lista</button>

<!-- AI Assistant Header Bar -->

<div class="ai-assistant-container" id="aiAssistantContainer">

<div class="ai-prompt-bar">

<button class="ai-btn" id="aiConfigBtn" title="Configurar IA (Gemini, ChatGPT, 
       Claude...)">??</button>

<div class="ai-soundwave" id="aiSoundwave">

<span></span><span></span><span></span><span></span>

</div>

<input type="text" class="ai-input" id="aiInput" name="aiInput" placeholder="Fale ou digite um 
       comando..." autocomplete="off">

<button class="ai-btn ai-mic-btn" id="aiMicBtn" title="Falar comando 
       (Android/Chrome)">???</button>

<button class="ai-btn ai-send-btn" id="aiSendBtn" title="Enviar comando">?</button>

</div>

<div class="ai-response-bubble" id="aiResponseBubble"></div>

</div>

<!-- Ocultos para manter compatibilidade de IDs legados -->

<button id="exportJson" style="display:none"></button>

<button id="importJsonBtn" style="display:none"></button>

<input id="importFile" name="importFile" type="file" style="display:none" />

<button id="reset" style="display:none"></button>

</header>

<section class="workspace">

<div id="main-content">

<div class="weekly-container collapsed" id="weekly-container">

<div class="weekly-controls">

<button id="prevWeekBtn" title="Semana Anterior">?</button>

<button id="todayWeekBtn" style="padding: 2px 8px; border-radius: 6px; font-size: 12px; 
       height: 26px; cursor: pointer; background: rgba(255,255,255,0.15); color: #fff; border: 1px solid 
       rgba(255,255,255,0.15);">Hoje</button>

<span id="weekRangeDisplay">Semana Atual</span>

<button id="nextWeekBtn" title="Pr�xima Semana">?</button>

</div>

<div class="weekly-grid" id="weeklyGrid">

<!-- Colunas geradas via JS -->

</div>

</div>

<div class="resizer resizer-h" id="resizer-weekly"></div>

<div class="board-container" id="board-container">

<main class="board" id="board"></main>

</div>

<div class="resizer resizer-h" id="resizer-matrix"></div>

<div class="matrix-container" id="matrix-container">

<section class="matrix" id="matrix"></section>

</div>

</div>

<div class="resizer resizer-v" id="resizer-sidebar"></div>

<aside id="agenda-sidebar">

<div class="schedule" id="schedule">

<header>

<div class="header-row">

<strong>AGENDA</strong>

<div class="copy-paste-buttons">

<button id="addUnscheduledBtn" title="Novo Evento (A definir)">+</button>

<button id="copyDayBtn" title="Copiar dia atual">??</button>

<button id="pasteDayBtn" title="Colar dia copiado">??</button>

</div>

</div>

<div class="header-row">

<div class="date-nav">

<button id="prevDayBtn" title="Dia Anterior">&lt;</button>

<button id="todayDayBtn" style="font-size: 12px; padding: 4px 8px; cursor: pointer; 
       background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; 
       margin-right: 4px;">Hoje</button>

<input id="agendaDate" name="agendaDate" type="date" />

<button id="nextDayBtn" title="Pr�ximo Dia">&gt;</button>

</div>

</div>

</header>

<div id="slots"></div>

</div>

</aside>

</section>



<div id="ctx" class="ctx">

<button data-action="edit">?? Editar Cart�o <span class="shortcut">F2</span></button>

<button data-action="select-mode">??? Selecionar Cart�o</button>

<div class="sep"></div>

<button data-action="timer">?? Timer <span class="shortcut">Alt+T</span></button>

<button data-action="color">?? Editar cor <span class="shortcut">Alt+C</span></button>

<button data-action="date">?? Editar Data <span class="shortcut">Alt+D</span></button>

<button data-action="agenda">?? Agendar / Recorr�ncia...</button>

<button data-action="alert">?? Configurar Alerta...</button>

<div class="sep"></div>

<div id="ctx-move-board" style="position:relative">

<button data-action="move-board">?? Mover para Quadro ?</button>

<div class="ctx-sub" id="ctx-move-board-sub"></div>

</div>

<div class="sep"></div>

<button data-action="prop">?? Propriedades do Cart�o</button>

<button data-action="gemini-subtasks">? Gerar subtarefas</button>

<button data-action="gemini-organize">? Organizar na Matriz</button>

<div class="sep"></div>

<button data-action="dup">? Duplicar <span class="shortcut">Ctrl+D</span></button>

<button data-action="del">??? excluir <span class="shortcut">Del</span></button>

<div id="ctx-move" style="position:relative">

<button data-action="move">?? Mover para ?</button>

<div class="ctx-sub" id="ctx-move-sub"></div>

</div>

<div id="ctx-move-all" style="position:relative; display:none;">

<button data-action="move-all">?? Mover TODOS desta Lista ?</button>

<div class="ctx-sub" id="ctx-moveall-sub"></div>

</div>

<button data-action="del-all" style="display:none;">??? excluir TODOS desta Lista</button>

</div>



<div id="ctx-list" class="ctx">

<button data-action="list-del">??? excluir lista</button>

<button data-action="list-del-all">??? excluir TODOS desta Lista</button>

<button data-action="list-move-all">?? Mover TODOS desta Lista ?</button>

<div class="ctx-sub" id="ctx-list-move-sub"></div>

<button data-action="list-move-board">?? Mover LISTA para outro quadro ?</button>

<div class="ctx-sub" id="ctx-list-move-board-sub"></div>

</div>



<div id="focus-overlay">

<div class="focus-card-clone">

<div id="focusTargetText">Carregando tarefa...</div>

<div class="focus-time" id="focusTargetTime">00:00</div>

<div class="focus-controls">

<button id="focusMinusBtn" title="-1 minuto">?</button>

<button id="focusToggleBtn" title="Pausar/Retomar">??</button>

<button id="focusPlusBtn" title="+1 minuto">?</button>

<button id="focusCloseBtn" title="Sair do Modo Foco">?</button>

</div>

</div>

</div>



<!-- Marquee Selection Box -->

<div id="marquee"></div>







<script>

// Aguarda a janela carregar completamente antes de rodar o script

window.addEventListener('load', function () {



// ===== Firebase Configuration =====

const firebaseConfig = {

apiKey: "AIzaSyCk2BJMJPgLCWcjkcGs2n-MU8-2b44nnOs",

authDomain: "tea-planner-2.firebaseapp.com",

databaseURL: "https://tea-planner-2-default-rtdb.firebaseio.com",

projectId: "tea-planner-2",

storageBucket: "tea-planner-2.firebasestorage.app",

messagingSenderId: "933112271146",

appId: "1:933112271146:web:1fee83c401b14f2b774e53"

};



let app, auth, db;

let isFirebaseReady = false;

let currentUser = null;

let isRemoteUpdate = false;

let currentBoardRef = null;

let globalAgendaRef = null; // Nova refer�ncia para agenda global



// Inicializa Firebase

try {

if (typeof firebase !== 'undefined' && firebaseConfig.apiKey) {

app = firebase.initializeApp(firebaseConfig);

auth = firebase.auth();

db = firebase.database();

isFirebaseReady = true;

console.log("Firebase initialized successfully.");



auth.onAuthStateChanged(user => {

currentUser = user;

const loginBtn = document.getElementById('loginBtn');

const userInfo = document.getElementById('userInfo');



if (user) {

loginBtn.textContent = 'Sair';

loginBtn.removeAttribute('style');

userInfo.textContent = `Ol�, ${user.displayName || user.email}`;

setupFirebaseSync(user);

} else {

loginBtn.textContent = 'Login Google';

loginBtn.style.background = '#4285F4';

loginBtn.style.color = 'white';

loginBtn.style.borderColor = 'transparent';

userInfo.textContent = '';

if (currentBoardRef) currentBoardRef.off();

if (globalAgendaRef) globalAgendaRef.off();

}

});



const loginBtnEl = document.getElementById('loginBtn');

if (loginBtnEl) {

loginBtnEl.addEventListener('click', () => {

if (currentUser) {

auth.signOut();

window.location.reload();

} else {

const provider = new firebase.auth.GoogleAuthProvider();

auth.signInWithPopup(provider).catch(error => {

console.error("Erro no popup, tentando redirect...", error);

auth.signInWithRedirect(provider);

});

}

});

}



} else {

console.warn("Offline mode or Firebase script not loaded.");

}

} catch (e) {

console.error("Error initializing Firebase:", e);

}

function registerFirebaseListeners(user) {

// 1. Sincronizar METADADOS (Lista de Quadros)

const metaRef = db.ref('users/' + user.uid + '/meta');

metaRef.on('value', (snapshot) => {

let val = snapshot.val();

if (val && !Array.isArray(val)) {

val = Object.keys(val).map(k => val[k]);

}



if (!snapshot.exists() || !val || val.length === 0) {

const localMetaStr = localStorage.getItem(LS_BOARDS_META);

if (localMetaStr) {

try {

const localMeta = JSON.parse(localMetaStr);

if (localMeta && localMeta.length > 0) {

console.log("Sync: Firebase meta n�o existe, enviando metadados locais...");

metaRef.set(localMeta);

return;

}

} catch (e) {

console.error("Erro ao ler metadados locais na sincroniza��o:", e);

}

}



if (val && Array.isArray(val)) {

let updated = false;

if (!val.some(b => b.id === 'board-todos')) {

val.unshift({ id: 'board-todos', name: 'TODOS ??', lastModified: Date.now(), color: 
       '#1976d2' });

updated = true;

}

if (!val.some(b => b.id === 'board-trash')) {

val.push({ id: 'board-trash', name: 'Lixeira ???', lastModified: Date.now(), color: 
       '#5a1419' });

updated = true;



// Reconcile board IDs by matching board names

reconcileBoardIds(val);



if (JSON.stringify(val) !== JSON.stringify(boardsMeta)) {

console.log("Sync: Nova lista de quadros recebida.");

boardsMeta = val;

localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta));

visibleBoardsInTodos = null;

updateBoardSelectUI();

if (updated) {

saveBoardsMetadata(true);

}

if (!boardsMeta.find(b => b.id === currentBoardId)) {

if (boardsMeta.length > 0) switchBoard(boardsMeta[0].id);

else createNewBoard('Meu Quadro');

}

}

}

});



// 2. Sincronizar AGENDA GLOBAL (Sempre ativa)

subscribeToGlobalAgenda(user.uid);



// 3. Sincronizar o QUADRO ATUAL

subscribeToCurrentBoard(user.uid, currentBoardId);

}



function setupFirebaseSync(user) {

// For�ar upload do backup para o Firebase se foi restaurado localmente

const forceSync = localStorage.getItem('tea-planner-force-cloud-sync') === 'true';

if (forceSync) {

console.log("Sync: For�ando upload do backup local para o Firebase...");

localStorage.removeItem('tea-planner-force-cloud-sync');

try {

const localMetaStr = localStorage.getItem(LS_BOARDS_META);

const localAgendaStr = localStorage.getItem(LS_GLOBAL_AGENDA);



const promises = [];

if (localMetaStr) promises.push(db.ref('users/' + user.uid + 
       '/meta').set(JSON.parse(localMetaStr)));

if (localAgendaStr) promises.push(db.ref('users/' + user.uid + 
       '/global/agenda').set(JSON.parse(localAgendaStr)));



// Envia cada quadro

const localMeta = localMetaStr ? JSON.parse(localMetaStr) : [];

localMeta.forEach(b => {

const bStr = localStorage.getItem(LS_BOARD_PREFIX + b.id);

if (bStr) {

promises.push(db.ref('users/' + user.uid + '/boards/' + 
       b.id).set(JSON.parse(bStr)));

}

});



Promise.all(promises)

.then(() => {

console.log("Sync: Upload do backup conclu�do com sucesso. Ativando escutas do 
       Firebase...");

registerFirebaseListeners(user);

loadAndRenderAll();

})

.catch(err => {

console.error("Erro ao sincronizar backup com o Firebase:", err);

registerFirebaseListeners(user);

loadAndRenderAll();

});

} catch (e) {

console.error("Erro no upload do backup para o Firebase:", e);

registerFirebaseListeners(user);

}

} else {

registerFirebaseListeners(user);

}

}



function subscribeToGlobalAgenda(uid) {

if (!isFirebaseReady || !uid) return;

if (globalAgendaRef) globalAgendaRef.off();



console.log("Sync: Escutando Agenda Global...");

globalAgendaRef = db.ref('users/' + uid + '/global/agenda');



globalAgendaRef.on('value', (snapshot) => {

let val = snapshot.val();

if (val && !Array.isArray(val)) {

val = Object.keys(val).map(k => val[k]);

}



if (!snapshot.exists()) {

const localAgendaStr = localStorage.getItem(LS_GLOBAL_AGENDA);

if (localAgendaStr && localAgendaStr !== '[]' && localAgendaStr !== '') {

console.log("Sync: Firebase agenda global n�o existe, enviando local...");

try {

globalAgendaRef.set(JSON.parse(localAgendaStr));

return;

} catch (e) {

console.error("Erro ao fazer parse da agenda local para enviar:", e);

}

}

}



if (!val) val = []; // Agenda vazia



const currentLocal = localStorage.getItem(LS_GLOBAL_AGENDA);

const remoteIsEmpty = !val || (Array.isArray(val) && val.length === 0) || (typeof val === 
       'object' && Object.keys(val).length === 0);



if (remoteIsEmpty && currentLocal && currentLocal !== '[]' && currentLocal !== '') {

try {

const localAgendaData = JSON.parse(currentLocal);

if (Array.isArray(localAgendaData) && localAgendaData.length > 0) {

console.warn("Sync: Agenda global remota vazia, mas local populada. Protegendo 
       dados locais e enviando para o Firebase.");

globalAgendaRef.set(localAgendaData);

return;

}

} catch (e) {

console.error("Erro ao fazer parse da agenda global local para prote��o de dados:", 
       e);

}

}



const valStr = JSON.stringify(val);



if (valStr === currentLocal) return;



console.log("Sync: Agenda Global atualizada remotamente.");

isRemoteUpdate = true;

localStorage.setItem(LS_GLOBAL_AGENDA, valStr);



// Recarrega a tela mesclando (Board + Agenda Nova)

loadAndRenderAll();

isRemoteUpdate = false;

});

}



function subscribeToCurrentBoard(uid, boardId) {

if (!isFirebaseReady || !uid || !boardId) return;



if (currentBoardRef) currentBoardRef.off();



console.log(`Sync: Escutando alTerÃ§a��es no quadro ${boardId}...`);

currentBoardRef = db.ref('users/' + uid + '/boards/' + boardId);

currentBoardRef.on('value', (snapshot) => {

let val = snapshot.val();

if (val && !Array.isArray(val)) {

val = Object.keys(val).map(k => val[k]);

}



if (!snapshot.exists()) {

const localBoardStr = localStorage.getItem(LS_BOARD_PREFIX + boardId);

if (localBoardStr && localBoardStr !== '[]' && localBoardStr !== '') {

console.log(`Sync: Firebase board ${boardId} n�o existe, enviando local...`);

try {

currentBoardRef.set(JSON.parse(localBoardStr));

return;

} catch (e) {

console.error("Erro ao fazer parse do quadro local para enviar:", e);

}

}



if (!val) val = [];

const currentLocalData = localStorage.getItem(LS_BOARD_PREFIX + boardId);

const remoteIsEmpty = !val || (Array.isArray(val) && val.length === 0) || (typeof val === 
       'object' && Object.keys(val).length === 0);



if (remoteIsEmpty && currentLocalData && currentLocalData !== '[]' && currentLocalData !== 
       '') {

try {

const localBoardData = JSON.parse(currentLocalData);

if (Array.isArray(localBoardData) && localBoardData.length > 0) {

console.warn(`Sync: Quadro remoto ${boardId} vazio, mas local populado. 
       Protegendo dados locais e enviando para o Firebase.`);

currentBoardRef.set(localBoardData);

return;

}

} catch (e) {

console.error("Erro ao fazer parse do quadro local para prote��o de dados:", e);

}

}



const valStr = JSON.stringify(val);



if (valStr === currentLocalData) return;



console.log("Sync: Conte�do do quadro atualizado remotamente.");

isRemoteUpdate = true;

localStorage.setItem(LS_BOARD_PREFIX + boardId, valStr);



if (currentBoardId === boardId) {

loadAndRenderAll();

}

isRemoteUpdate = false;

});

}





// ===== Helpers =====

function normalizeBoardName(name) {

if (!name) return '';

return name.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]
       |[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '')

.replace(/[^a-zA-Z0-9\s]/g, '')

.toLowerCase()

.trim();

}



function reconcileBoardIds(remoteMeta) {

if (!Array.isArray(remoteMeta)) return;

let reconciledAny = false;



remoteMeta.forEach(remoteBoard => {

if (remoteBoard.id === 'board-todos' || remoteBoard.id === 'board-trash') return;



const remoteNorm = normalizeBoardName(remoteBoard.name);

if (!remoteNorm) return;



// Procura nos metadados locais (boardsMeta) se existe algum quadro com o mesmo nome mas ID 
       diferente

const localMatch = boardsMeta.find(b => 

b.id !== 'board-todos' && 

b.id !== 'board-trash' && 

b.id !== remoteBoard.id && 

normalizeBoardName(b.name) === remoteNorm

);



if (localMatch) {

const oldId = localMatch.id;

const newId = remoteBoard.id;



console.log(`Reconciliation: Mapeando quadro local "${localMatch.name}" (ID antigo: 
       ${oldId}) para ID remoto: ${newId}`);



// 1. Move os dados do quadro no localStorage e Firebase

const oldBoardKey = LS_BOARD_PREFIX + oldId;

const newBoardKey = LS_BOARD_PREFIX + newId;

let oldBoardDataStr = localStorage.getItem(oldBoardKey);



if (oldBoardDataStr) {

try {

let oldBoardData = JSON.parse(oldBoardDataStr);

if (Array.isArray(oldBoardData) && oldBoardData.length > 0) {

oldBoardData.forEach(list => {

if (list.cards) {

list.cards.forEach(c => {

c.boardId = newId;

});

}

list.boardId = newId;

});

localStorage.setItem(newBoardKey, JSON.stringify(oldBoardData));

localStorage.removeItem(oldBoardKey);



if (isFirebaseReady && auth && auth.currentUser) {

db.ref('users/' + auth.currentUser.uid + '/boards/' + 
       newId).set(oldBoardData)

.then(() => console.log(`Reconciliation: Re-uploaded board ${newId} 
       data to Firebase`))

.catch(e => console.error("Reconciliation upload error:", e));

}

console.log(`Reconciliation: Dados do quadro migrados com sucesso de 
       ${oldId} para ${newId}`);

}

} catch (e) {

console.error(`Erro ao migrar dados do quadro de ${oldId} para ${newId}:`, e);

}

}



// 2. Atualiza os boardId correspondentes na Agenda Global no localStorage e Firebase

let globalAgendaStr = localStorage.getItem(LS_GLOBAL_AGENDA);

if (globalAgendaStr) {

try {

let agendaData = JSON.parse(globalAgendaStr);

if (Array.isArray(agendaData)) {

let agendaUpdated = false;

agendaData.forEach(list => {

if (list.cards) {

list.cards.forEach(c => {

if (c.boardId === oldId) {

c.boardId = newId;

agendaUpdated = true;

}

});

}

});

if (agendaUpdated) {

localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(agendaData));

if (isFirebaseReady && auth && auth.currentUser) {

db.ref('users/' + auth.currentUser.uid + 
       '/global/agenda').set(agendaData)

.then(() => console.log("Reconciliation: Re-uploaded reconciled 
       global agenda to Firebase"))

.catch(e => console.error("Reconciliation agenda upload 
       error:", e));

}

console.log(`Reconciliation: boardId dos cart�es da agenda global 
       atualizados de ${oldId} para ${newId}`);

}

}

} catch (e) {

console.error("Erro ao atualizar agenda global na reconcilia��o:", e);

}

}



// 3. Se o ID que mudou era o ID ativo, atualiza o currentBoardId

if (currentBoardId === oldId) {

currentBoardId = newId;

localStorage.setItem(LS_CURRENT_BOARD, newId);

console.log(`Reconciliation: Quadro ativo alTerÃ§ado para ${newId}`);

if (isFirebaseReady && auth && auth.currentUser) {

subscribeToCurrentBoard(auth.currentUser.uid, newId);

}

}



reconciledAny = true;

}

});



if (reconciledAny) {

boardsMeta = remoteMeta;

localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta));

visibleBoardsInTodos = null;

updateBoardSelectUI();

}

}



function el(t, c) { var n = document.createElement(t); if (c) n.className = c; return n; }

function $$(s, r) { if (!r) r = document; return Array.prototype.slice.call(r.querySelectorAll(s)); 
       }

function to2(n) { return (n < 10 ? '0' + n : '' + n); }

function formatSecondsToTime(totalSeconds) {

if (totalSeconds <= 0) return '0:00 min';

const hours = Math.floor(totalSeconds / 3600);

const minutes = Math.floor((totalSeconds % 3600) / 60);

return `${hours > 0 ? hours + ':' : ''}${to2(minutes)} min`;

}



// ===== CONFIG & STATE =====

var LS_KEY = 'mini-trello-restore';

var LS_LABELS_KEY = 'tea-planner-labels';

var LS_QUICK_CONFIG_KEY = 'tea-planner-quick-config';



// New Multi-Board Keys

var LS_BOARDS_META = 'tea-planner-boards-meta';

var LS_CURRENT_BOARD = 'tea-planner-current-board-id';

var LS_BOARD_PREFIX = 'tea-planner-board-';

var LS_GLOBAL_AGENDA = 'tea-planner-global-agenda'; // NOVA CHAVE PARA AGENDA UNIFICADA



var currentBoardId = null;

var boardsMeta = [];

var DEFAULT_THEME_COLOR = '#1976d2';



var __persistTick = null, __muteHistory = 0;

function withMute(fn) { __muteHistory++; try { return fn(); } finally { __muteHistory--; } }



// FUN��O DE �UDIO (Beep) para o Timer

function playBeep() {

try {

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const oscillator = audioCtx.createOscillator();

const gainNode = audioCtx.createGain();

oscillator.connect(gainNode);

gainNode.connect(audioCtx.destination);

oscillator.type = 'sine';

oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);

gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);

gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

oscillator.start(audioCtx.currentTime);

oscillator.stop(audioCtx.currentTime + 0.5);

} catch (e) { console.warn("�udio bloqueado", e); }

}



var boardEl = document.getElementById('board');

var schedule = document.getElementById('schedule');

var slotsRoot = document.getElementById('slots');

var matrixEl = document.getElementById('matrix');

var sumTimersDisplay = document.getElementById('sumTimersDisplay');

var allCards = [];

var globalTimerInterval = null;

var selected = new Set();

var isSelectionMode = false;

var lastMouseX = 0, lastMouseY = 0;

var agendaClipboard = [];

var appClipboard = []; // Para Copiar/Colar cart�es



// ===== Gemini API Integration =====

// DEFINIDAS AQUI EM CIMA PARA EVITAR ERRO DE REFERENCE ERROR

function showLoader(message) {

var existing = document.getElementById('loader-wrap');

if (existing) existing.remove();

var wrap = el('div', 'modal-wrap');

wrap.id = 'loader-wrap';

wrap.style.display = 'flex'; wrap.style.justifyContent = 'center'; wrap.style.alignItems = 
       'center';

var box = el('div', 'modal');

box.style.padding = '20px'; box.style.textAlign = 'center';

var spinner = el('div');

spinner.innerHTML = `<svg width="24" height="24" viewBox="0 0 24" 
       xmlns="http://www.w3.org/2000/svg"><g class="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" 
       stroke="#fff" stroke-width="3"></circle></g></svg>`;

spinner.style.marginBottom = '12px';

var msgEl = el('div');

msgEl.textContent = message || 'Processando...';

box.appendChild(spinner); box.appendChild(msgEl);

wrap.appendChild(box);

document.body.appendChild(wrap);

}



function hideLoader() {

var wrap = document.getElementById('loader-wrap');

if (wrap) wrap.remove();

}



async function callAI(contentsOrPrompt, retries = 3, delay = 1000) {

const provider = localStorage.getItem('ai-provider') || 'gemini';



if (provider === 'gemini') {

const hardcodedKey = ""; // <--- INSIRA SUA API KEY AQUI

const apiKey = localStorage.getItem('gemini-api-key') || hardcodedKey;

if (!apiKey) {

alert("Chave API do Gemini n�o configurada. Por favor, clique na chave ?? na barra de 
       prompt para configur�-la.");

throw new Error("No API Key");

}



const modelSetting = localStorage.getItem('gemini-model') || 'auto';

const models = modelSetting === 'auto' ? ['gemini-1.5-flash', 'gemini-2.0-flash', 
       'gemini-2.5-flash', 'gemini-1.5-pro'] : [modelSetting];

let lastError = null;



for (const model of models) {

const apiUrl = 
       `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;



let contents;

if (typeof contentsOrPrompt === 'string') {

contents = [{ parts: [{ text: contentsOrPrompt }] }];

} else {

contents = contentsOrPrompt;

}

const payload = { contents };



let currentDelay = delay;

let is404 = false;



for (let i = 0; i < retries; i++) {

try {

const response = await fetch(apiUrl, {

method: 'POST',

headers: { 'Content-Type': 'application/json' },

body: JSON.stringify(payload)

});



if (response.status === 404) {

console.warn(`Modelo ${model} indispon�vel (404). Tentando pr�ximo modelo 
       da lista...`);

is404 = true;

break;

}



if (!response.ok) {

let errorMsg = `HTTP error! status: ${response.status}`;

try {

const errJson = await response.json();

if (errJson.error && errJson.error.message) {

errorMsg = errJson.error.message;

}

} catch (_) {}

throw new Error(errorMsg);

}

const result = await response.json();

const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

if (text) return text;

else throw new Error('Resposta da API inv�lida ou vazia.');

} catch (error) {

lastError = error;

if (i === retries - 1) {

console.error(`Erro final ao chamar o modelo ${model}:`, error);

} else {

await new Promise(res => setTimeout(res, currentDelay));

currentDelay *= 2;

}

}

}



if (!is404 && lastError) {

throw lastError;

}

}



throw lastError || new Error("Nenhum modelo da lista est� dispon�vel para esta chave API.");

} else if (provider === 'openai') {

const apiKey = localStorage.getItem('openai-api-key') || '';

if (!apiKey) {

alert("Chave API da OpenAI n�o configurada. Por favor, clique na chave ?? na barra de 
       prompt para configur�-la.");

throw new Error("No API Key");

}



const model = localStorage.getItem('openai-model') || 'gpt-4o-mini';

const customUrl = localStorage.getItem('openai-custom-url') || '';



let apiUrl = 'https://api.openai.com/v1/chat/completions';

if (customUrl) {

if (customUrl.includes('chat/completions')) {

apiUrl = customUrl;

} else {

apiUrl = customUrl.endsWith('/') ? customUrl + 'chat/completions' : customUrl + 
       '/chat/completions';

}

}



let messages = [];

if (typeof contentsOrPrompt === 'string') {

messages = [{ role: 'user', content: contentsOrPrompt }];

} else if (Array.isArray(contentsOrPrompt)) {

if (contentsOrPrompt.length > 0) {

const sysText = contentsOrPrompt[0].parts?.[0]?.text || "";

messages.push({ role: 'system', content: sysText });

for (let i = 1; i < contentsOrPrompt.length; i++) {

const turn = contentsOrPrompt[i];

const role = turn.role === 'model' ? 'assistant' : 'user';

const text = turn.parts?.[0]?.text || "";

messages.push({ role: role, content: text });

}

}

}



const payload = {

model: model,

messages: messages

};



let lastError = null;

let currentDelay = delay;



for (let i = 0; i < retries; i++) {

try {

const response = await fetch(apiUrl, {

method: 'POST',

headers: {

'Content-Type': 'application/json',

'Authorization': `Bearer ${apiKey}`

},

body: JSON.stringify(payload)

});



if (!response.ok) {

let errorMsg = `HTTP error! status: ${response.status}`;

try {

const errJson = await response.json();

if (errJson.error && errJson.error.message) {

errorMsg = errJson.error.message;

}

} catch (_) {}

throw new Error(errorMsg);

}

const result = await response.json();

const text = result.choices?.[0]?.message?.content;

if (text) return text;

else throw new Error('Resposta da API inv�lida ou vazia.');

} catch (error) {

lastError = error;

if (i === retries - 1) {

console.error(`Erro final ao chamar OpenAI (${model}):`, error);

} else {

await new Promise(res => setTimeout(res, currentDelay));

currentDelay *= 2;

}

}

}

throw lastError || new Error("Erro ao chamar a API da OpenAI.");

} else if (provider === 'anthropic') {

const apiKey = localStorage.getItem('anthropic-api-key') || '';

if (!apiKey) {

alert("Chave API da Anthropic n�o configurada. Por favor, clique na chave ?? na barra 
       de prompt para configur�-la.");

throw new Error("No API Key");

}



const model = localStorage.getItem('anthropic-model') || 'claude-3-5-sonnet-latest';

const customUrl = localStorage.getItem('anthropic-custom-url') || '';



let apiUrl = 'https://api.anthropic.com/v1/messages';

if (customUrl) {

if (customUrl.includes('v1/messages')) {

apiUrl = customUrl;

} else {

apiUrl = customUrl.endsWith('/') ? customUrl + 'v1/messages' : customUrl + 
       '/v1/messages';

}

}



let systemPrompt = "";

let messages = [];

if (typeof contentsOrPrompt === 'string') {

messages = [{ role: 'user', content: contentsOrPrompt }];

} else if (Array.isArray(contentsOrPrompt)) {

if (contentsOrPrompt.length > 0) {

systemPrompt = contentsOrPrompt[0].parts?.[0]?.text || "";

for (let i = 1; i < contentsOrPrompt.length; i++) {

const turn = contentsOrPrompt[i];

const role = turn.role === 'model' ? 'assistant' : 'user';

const text = turn.parts?.[0]?.text || "";

messages.push({ role: role, content: text });

}

}

}



const payload = {

model: model,

max_tokens: 4096,

messages: messages

};

if (systemPrompt) {

payload.system = systemPrompt;

}

let lastError = null;

let currentDelay = delay;



for (let i = 0; i < retries; i++) {

try {

const response = await fetch(apiUrl, {

method: 'POST',

headers: {

'Content-Type': 'application/json',

'x-api-key': apiKey,

'anthropic-version': '2023-06-01'

},

body: JSON.stringify(payload)

});



if (!response.ok) {

let errorMsg = `HTTP error! status: ${response.status}`;

try {

const errJson = await response.json();

if (errJson.error && errJson.error.message) {

errorMsg = errJson.error.message;

}

} catch (_) {}

throw new Error(errorMsg);

}

const result = await response.json();

const text = result.content?.[0]?.text;

if (text) return text;

else throw new Error('Resposta da API inv�lida ou vazia.');

} catch (error) {

lastError = error;

if (i === retries - 1) {

console.error(`Erro final ao chamar Anthropic (${model}):`, error);

} else {

await new Promise(res => setTimeout(res, currentDelay));

currentDelay *= 2;

}

}

}

throw lastError || new Error("Erro ao chamar a API da Anthropic.");

}

}



const callGemini = callAI;

async function generateSubtasks(block) {

if (!block || !block.length) return;

showLoader('? Gerando subtarefas com a IA...');

try {

for (const card of block) {

const originalText = card.querySelector('.text').textContent;

const prompt = `Aja como um assistente de produtividade. Quebre a seguinte tarefa em 3 
       a 5 subtarefas menores e acion�veis. Responda com uma lista de subtarefas, uma por linha. N�o adicione nenhum 
       outro texto, cabe�alhos, marcadores ou formata��o. Tarefa: "${originalText}"`;

const resultText = await callGemini(prompt);

const subtasks = resultText.split('\n').map(s => s.trim()).filter(Boolean);

if (subtasks.length > 0) {

let lastCard = card;

subtasks.forEach(taskText => {

const newCard = createCard({ text: "? " + taskText, color: card.dataset.color, 
       labelColor: card.dataset.labelColor || '', due: card.dataset.due, boardId: card.dataset.boardId });

if (!card.closest('#agenda-sidebar')) {

lastCard.parentElement.insertBefore(newCard, lastCard.nextSibling);

lastCard = newCard;

}

});

} else { throw new Error('Nenhuma subtarefa foi gerada.'); }

}

updateSlotsHasItems();

persist();

updateTotalTimerDisplay();

} catch (error) {

// Erro j� tratado no catch do callGemini se for falta de key

} finally {

hideLoader();

}

}



async function organizeCardWithGemini(block) {

if (!block || !block.length || !matrixEl) return;

showLoader('? Analisando tarefa com IA...');

const EISENHOWER_COLORS = { Q1: '#2e7d32', Q2: '#1976d2', Q3: '#ffb300', Q4: '#c62828' };

try {

for (const card of block) {

const originalText = card.querySelector('.text').textContent;

const prompt = `Aja como um especialista em produtividade usando a Matriz de 
       Eisenhower. Analise a seguinte tarefa e decida em qual quadrante ela se encaixa: Q1 (Urgente e Importante), Q2 
       (N�o Urgente e Importante), Q3 (Urgente e N�o Importante), ou Q4 (N�o Urgente e N�o Importante). Responda 
       APENAS com "Q1", "Q2", "Q3", ou "Q4". Tarefa: "${originalText}"`;

const resultQuad = (await callGemini(prompt)).trim().toUpperCase();

if (EISENHOWER_COLORS[resultQuad]) {

const dest = matrixEl.querySelector('.list[data-quad="' + resultQuad + '"] .cards');

if (dest) {

const cardInCache = allCards.find(c => c === card);

if (cardInCache) cardInCache.dataset.when = '';

card.dataset.when = '';



dest.appendChild(card);

card.dataset.labelColor = EISENHOWER_COLORS[resultQuad];

paintCard(card);

}

} else { console.warn('Resposta inesperada da IA:', resultQuad); }

}

updateSlotsHasItems();

persist();

updateTotalTimerDisplay();

} catch (error) {

// Erro j� tratado

} finally {

hideLoader();

}

}



// EVENTO DE SINCRONIZA��O ENTRE ABAS (LOCAL)

window.addEventListener('storage', function (e) {

if (e.key === LS_BOARD_PREFIX + currentBoardId || e.key === LS_GLOBAL_AGENDA) {

// Se mudou o quadro atual OU a agenda global

console.log("Sync: Aba local atualizada via localStorage");

isRemoteUpdate = true;

loadAndRenderAll();

isRemoteUpdate = false;

else if (e.key === LS_BOARDS_META) {

loadBoardsMetadata();

updateBoardSelectUI();

}

else if (e.key === LS_CURRENT_BOARD) {

const newId = e.newValue;

if (newId && newId !== currentBoardId) {

switchBoard(newId);

}

}

});



document.addEventListener('mousemove', (e) => {

lastMouseX = e.clientX;

lastMouseY = e.clientY;

updateMarquee(e);

});



// ===== MARQUEE SELECTION LOGIC =====

let marqueeStart = null;

const marqueeEl = document.getElementById('marquee');



document.addEventListener('mousedown', (e) => {

// S� inicia marquee se clicar no fundo (n�o em bot�es, inputs ou cards)

if (e.target.closest('.card') || e.target.closest('button') || e.target.closest('input') || 
       e.target.closest('.ctx') || e.target.closest('.modal')) return;

if (e.button !== 0) return; // S� bot�o esquerdo



// Se n�o segurar Ctrl/Shift, limpa sele��o anterior

if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {

clearSelection();

}



marqueeStart = { x: e.clientX, y: e.clientY };

});



function updateMarquee(e) {

if (!marqueeStart) return;



const x1 = marqueeStart.x;

const y1 = marqueeStart.y;

const x2 = e.clientX;

const y2 = e.clientY;



const left = Math.min(x1, x2);

const top = Math.min(y1, y2);

const width = Math.abs(x1 - x2);

const height = Math.abs(y1 - y2);



if (width > 5 || height > 5) { // Evita micro-movimentos

marqueeEl.style.display = 'block';

marqueeEl.style.left = left + 'px';

marqueeEl.style.top = top + 'px';

marqueeEl.style.width = width + 'px';

marqueeEl.style.height = height + 'px';



selectCardsInBox(left, top, width, height);

}

}

document.addEventListener('mouseup', () => {

marqueeStart = null;

marqueeEl.style.display = 'none';

});



function selectCardsInBox(l, t, w, h) {

allCards.forEach(card => {

const r = card.getBoundingClientRect();

// Verifica intersec��o

const inBox = !(r.left > l + w || r.right < l || r.top > t + h || r.bottom < t);



if (inBox) {

if (!selected.has(card)) addSelection(card);

} else if (!window._tempSelection?.has(card)) {

// Se n�o estava selecionado antes do in�cio do marquee, remove

// Mas aqui simplificamos: o marquee ADICIONA � sele��o se segurar Ctrl, 

// ou redefine se n�o segurar.

}

});

function updateTotalTimerDisplay() {

let selectedSeconds = 0;

let visibleSeconds = 0;

let totalSecondsAll = 0;

if (selected.size > 0) {

selected.forEach(card => {

selectedSeconds += parseInt(card.dataset.timerTotal || '0', 10);

});

}

allCards.forEach(card => {

const cardTime = parseInt(card.dataset.timerTotal || '0', 10);

totalSecondsAll += cardTime;

const style = window.getComputedStyle(card);

if (style.display !== 'none' && style.visibility !== 'hidden') {

if (card.offsetParent !== null) {

visibleSeconds += cardTime;

}

}

});

const displayText = selected.size > 0 ? formatSecondsToTime(selectedSeconds) : 
       formatSecondsToTime(visibleSeconds);

if (sumTimersDisplay) {

sumTimersDisplay.textContent = displayText;

sumTimersDisplay.title = `Selecionado: ${formatSecondsToTime(selectedSeconds)} / Filtrado: 
       ${formatSecondsToTime(visibleSeconds)} / Total: ${formatSecondsToTime(totalSecondsAll)}`;

}

}

function cardToData(c) {

var t = c.querySelector('.text');

return {

text: (t ? t.textContent : '').trim(),

color: c.dataset.color || '',

labelColor: c.dataset.labelColor || '',

due: c.dataset.due || '',

when: c.dataset.when || '',

timerTotal: c.dataset.timerTotal || '',

timerLeft: c.dataset.timerLeft || '',

timerState: c.dataset.timerState || '',

timerEnd: c.dataset.timerEnd || '',

completed: c.dataset.completed || 'false',

history: c.dataset.history || '[]',

boardId: c.dataset.boardId || '',

description: c.dataset.description || '',

duration: c.dataset.duration || '',

recurrence: c.dataset.recurrence || 'none',

cardId: c.dataset.cardId || '',

recurrenceParent: c.dataset.recurrenceParent || '',

alertEnabled: c.dataset.alertEnabled || 'false',

alertValue: c.dataset.alertValue || '15',

alertUnit: c.dataset.alertUnit || 'minutos',

alertFired: c.dataset.alertFired || 'false'

};

}



function addCardHistory(card, actionText) {

let hist = [];

try { hist = JSON.parse(card.dataset.history || '[]'); } catch(e) {}

hist.push({ action: actionText, time: Date.now() });

card.dataset.history = JSON.stringify(hist);

}



// FUN��O IMPORTANTE: Separa o que � do Quadro do que � da Agenda Global

function serializeAndSeparate() {

var boardData = [];

var agendaData = [];



// 1. Kanban Lists (Sempre do Quadro)

$$('.list[data-type="kanban"]', boardEl).forEach(function (l) {

const title = l.querySelector('.title').value;

const cardsInList = $$('.card', l).map(c => allCards.find(cacheCard => cacheCard === 
       c)).filter(Boolean).map(cardToData);

boardData.push({ type: 'kanban', title: title, cards: cardsInList, boardId: 
       l.dataset.boardId || '' });

});



// 2. Matrix Lists (Sempre do Quadro)

if (matrixEl) {

$$('.list[data-type="quad"]', matrixEl).forEach(function (l) {

const quad = l.dataset.quad;

const cardsInList = $$('.card', l).map(c => allCards.find(cacheCard => cacheCard === 
       c)).filter(Boolean).map(cardToData);

boardData.push({ type: 'quad', quad: quad, cards: cardsInList });

});

}



// 3. Agenda & Objetivos & Unscheduled (Sempre Global)

// Vamos procurar em allCards tudo que tem 'when' definido

// Isso pega tanto o que est� nos slots visuais quanto o que pode ter se perdido

const globalCards = allCards.filter(c => c.dataset.when && c.dataset.when.length > 0);



// Agrupar para salvar bonito, mas na real salvamos uma lista flat de "scheduled items" seria 
       melhor.

// Mas para manter compatibilidade com a estrutura antiga:



// Goal

const goalCards = globalCards.filter(c => c.dataset.when.endsWith('TGOAL')).map(cardToData);

if (goalCards.length > 0) agendaData.push({ type: 'goal', goal: true, cards: goalCards });



// Time Slots

const timeCardsMap = {};

globalCards.filter(c => /T\d{2}:\d{2}$/.test(c.dataset.when)).forEach(c => {

const time = c.dataset.when.substring(11); // Pega HH:MM

if (!timeCardsMap[time]) timeCardsMap[time] = [];

timeCardsMap[time].push(cardToData(c));

});

for (const t in timeCardsMap) {

agendaData.push({ type: 'time', time: t, cards: timeCardsMap[t] });

}



// Unscheduled (A definir)

const unscheduledCards = globalCards.filter(c => c.dataset.when.endsWith('T')).map(cardToData);

if (unscheduledCards.length > 0) {

agendaData.push({ type: 'unscheduled', cards: unscheduledCards });

}



return { boardData, agendaData };

}



function exportBackup() {

const backupData = {

version: '2.0',

boardsMeta: boardsMeta,

globalAgenda: JSON.parse(localStorage.getItem(LS_GLOBAL_AGENDA) || '[]'),

boards: {}

};

boardsMeta.forEach(b => {

backupData.boards[b.id] = JSON.parse(localStorage.getItem(LS_BOARD_PREFIX + b.id) || '[]');

});



let username = 'Usuario';

if (window.auth && window.auth.currentUser) {

username = window.auth.currentUser.displayName || window.auth.currentUser.email || 
       'Usuario';

} else if (typeof auth !== 'undefined' && auth && auth.currentUser) {

username = auth.currentUser.displayName || auth.currentUser.email || 'Usuario';

}

username = username.replace(/[\/\\?%*:|"<>\s]+/g, ' ').trim();

if (!username) username = 'Usuario';



const now = new Date();

const yyyy = now.getFullYear();

const mm = String(now.getMonth() + 1).padStart(2, '0');

const dd = String(now.getDate()).padStart(2, '0');

const hh = String(now.getHours()).padStart(2, '0');

const min = String(now.getMinutes()).padStart(2, '0');

const timestamp = `${yyyy}${mm}${dd}-${hh}${min}`;

const filename = `${username} ${timestamp}.json`;

const a = document.createElement('a');

a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, 
       null, 2));

a.download = filename;

a.click();

}



function importBackup(file) {

const reader = new FileReader();

reader.onload = function (e) {

try {

const data = JSON.parse(e.target.result);



if (data.version === '2.0' && data.boardsMeta && data.boards) {

showConfirm('Isso substituir� todos os seus quadros e agenda atuais. Deseja 
       continuar?', function() {

localStorage.setItem(LS_BOARDS_META, JSON.stringify(data.boardsMeta));

localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(data.globalAgenda || []));

Object.keys(data.boards).forEach(boardId => {

localStorage.setItem(LS_BOARD_PREFIX + boardId, 
       JSON.stringify(data.boards[boardId]));

});



let newCurrentId = localStorage.getItem(LS_CURRENT_BOARD);

if (!data.boardsMeta.find(b => b.id === newCurrentId)) {

if (data.boardsMeta.length > 0) newCurrentId = data.boardsMeta[0].id;

}

localStorage.setItem(LS_CURRENT_BOARD, newCurrentId);



// Se o Firebase estiver pronto e o usu�rio logado, salva na nuvem antes de 
       recarregar

if (isFirebaseReady && auth && auth.currentUser) {

const uid = auth.currentUser.uid;

const promises = [];



promises.push(db.ref('users/' + uid + '/meta').set(data.boardsMeta));

promises.push(db.ref('users/' + uid + 
       '/global/agenda').set(data.globalAgenda || []));

Object.keys(data.boards).forEach(boardId => {

promises.push(db.ref('users/' + uid + '/boards/' + 
       boardId).set(data.boards[boardId]));

});



// Adiciona um overlay visual de loading

const overlay = document.createElement('div');

overlay.style.position = 'fixed';

overlay.style.top = '0';

overlay.style.left = '0';

overlay.style.width = '100vw';

overlay.style.height = '100vh';

overlay.style.background = 'rgba(0,0,0,0.7)';

overlay.style.color = '#fff';

overlay.style.display = 'flex';

overlay.style.alignItems = 'center';

overlay.style.justifyContent = 'center';

overlay.style.fontSize = '24px';

overlay.style.zIndex = '99999';

overlay.innerText = 'Sincronizando com a nuvem... Por favor aguarde.';

document.body.appendChild(overlay);



Promise.all(promises)

.then(() => {

document.body.removeChild(overlay);

alert('Backup restaurado com sucesso e sincronizado na nuvem!');

window.location.reload();

})

.catch(err => {

document.body.removeChild(overlay);

console.error("Erro ao sincronizar backup com o Firebase:", err);

alert('O backup foi restaurado localmente, mas falhou ao enviar 
       para a nuvem: ' + err.message);

window.location.reload();

});

} else {

alert('Backup restaurado com sucesso!');

window.location.reload();

}

});

} else {

showConfirm('Detectado formato de backup de quadro �nico. Deseja mesclar com o 
       quadro ativo?', function() {

const dataToRestore = Array.isArray(data.data) ? data.data : data;

if (!Array.isArray(dataToRestore)) {

throw new Error("Formato inv�lido.");

}



const boardData = dataToRestore.filter(d => d.type === 'kanban' || d.type === 
       'quad');

const agendaData = dataToRestore.filter(d => d.type === 'time' || d.type === 
       'goal' || d.type === 'unscheduled');



localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, 
       JSON.stringify(boardData));

let mergedAgenda = [];

if (agendaData.length > 0) {

const currentAgenda = JSON.parse(localStorage.getItem(LS_GLOBAL_AGENDA) || 
       '[]');

mergedAgenda = currentAgenda.concat(agendaData);

localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(mergedAgenda));

}



// Se o Firebase estiver pronto e o usu�rio logado, salva na nuvem antes de 
       recarregar

if (isFirebaseReady && auth && auth.currentUser) {

const uid = auth.currentUser.uid;

const promises = [];



promises.push(db.ref('users/' + uid + '/boards/' + 
       currentBoardId).set(boardData));

if (agendaData.length > 0) {

promises.push(db.ref('users/' + uid + 
       '/global/agenda').set(mergedAgenda));

}



Promise.all(promises)

.then(() => {

alert('Quadro importado com sucesso e sincronizado na nuvem!');

window.location.reload();

})

.catch(err => {

console.error("Erro ao sincronizar quadro �nico:", err);

alert('Quadro importado localmente, mas falhou ao enviar para a 
       nuvem: ' + err.message);

window.location.reload();

});

} else {

alert('Quadro importado com sucesso!');

window.location.reload();

}

});

}

} catch (err) {

alert('Erro ao importar backup: ' + err.message);

}

};

reader.readAsText(file);

}



var HIST_LIMIT = 120; var hist = [], cursor = -1;

function pushHistory(snap) {

// Snap agora � um objeto { boardData, agendaData }

hist = hist.slice(0, cursor + 1); hist.push(snap);

if (hist.length > HIST_LIMIT) { hist.shift(); } cursor = hist.length - 1; updateUndoUi();

}

function capture() {

if (__muteHistory > 0) return;

try { pushHistory(serializeAndSeparate()); } catch (e) { }

}

function canUndo() { return cursor > 0; }

function canRedo() { return cursor >= 0 && cursor < hist.length - 1; }

function updateUndoUi() {

const undoBtn = document.getElementById('undo');

const redoBtn = document.getElementById('redo');

if (undoBtn) undoBtn.disabled = !canUndo();

if (redoBtn) redoBtn.disabled = !canRedo();

}

function doUndo() { if (!canUndo()) return; withMute(function () { cursor--; restore(hist[cursor]); 
       }); updateUndoUi(); }

function doRedo() { if (!canRedo()) return; withMute(function () { cursor++; restore(hist[cursor]); 
       }); updateUndoUi(); }

function loadAndRenderAll() {

let boardData = [];

let agendaData = [];



if (currentBoardId === 'board-todos') {

// Aggregate all boards except trash and board-todos itself

let mergedKanbanLists = [];

let mergedQuadLists = { Q1: [], Q2: [], Q3: [], Q4: [] };

const vBoards = getVisibleBoardsInTodos();



boardsMeta.forEach(b => {

if (b.id === 'board-trash' || b.id === 'board-todos') return;

if (!vBoards.has(b.id)) return;

let bData = [];

try {

const bStr = localStorage.getItem(LS_BOARD_PREFIX + b.id);

if (bStr) bData = JSON.parse(bStr);

} catch (e) { console.error("Error load board", b.id, e); }



bData.forEach(list => {

if (list.type === 'kanban') {

let targetList = mergedKanbanLists.find(l => l.title.toLowerCase().trim() === 
       list.title.toLowerCase().trim());

if (!targetList) {

targetList = { type: 'kanban', title: list.title, cards: [], boardId: b.id 
       };

mergedKanbanLists.push(targetList);

}

const cardsWithBoardId = (list.cards || []).map(c => {

return { ...c, boardId: c.boardId || b.id };

});

targetList.cards = targetList.cards.concat(cardsWithBoardId);

} else if (list.type === 'quad' && mergedQuadLists[list.quad]) {

const cardsWithBoardId = (list.cards || []).map(c => {

return { ...c, boardId: c.boardId || b.id };

});

mergedQuadLists[list.quad] = 
       mergedQuadLists[list.quad].concat(cardsWithBoardId);

}

});

});



// Add TODOS's own cards if they exist

let todosOwnData = [];

try {

const todosOwnStr = localStorage.getItem(LS_BOARD_PREFIX + 'board-todos');

if (todosOwnStr) todosOwnData = JSON.parse(todosOwnStr);

} catch(e) {}

todosOwnData.forEach(list => {

if (list.type === 'kanban') {

let targetList = mergedKanbanLists.find(l => l.title.toLowerCase().trim() === 
       list.title.toLowerCase().trim());

if (!targetList) {

targetList = { type: 'kanban', title: list.title, cards: [], boardId: 
       'board-todos' };

mergedKanbanLists.push(targetList);

}

const cardsWithBoardId = (list.cards || []).map(c => {

return { ...c, boardId: c.boardId || 'board-todos' };

});

targetList.cards = targetList.cards.concat(cardsWithBoardId);

} else if (list.type === 'quad' && mergedQuadLists[list.quad]) {

const cardsWithBoardId = (list.cards || []).map(c => {

return { ...c, boardId: c.boardId || 'board-todos' };

});

mergedQuadLists[list.quad] = mergedQuadLists[list.quad].concat(cardsWithBoardId);

}

});

boardData = mergedKanbanLists;

Object.keys(mergedQuadLists).forEach(q => {

boardData.push({ type: 'quad', quad: q, cards: mergedQuadLists[q] });

});

} else {

try {

const bStr = localStorage.getItem(LS_BOARD_PREFIX + currentBoardId);

if (bStr) boardData = JSON.parse(bStr);

} catch (e) { console.error("Erro load board", e); }

}

try {

const aStr = localStorage.getItem(LS_GLOBAL_AGENDA);

if (aStr) agendaData = JSON.parse(aStr);

} catch (e) { console.error("Erro load agenda", e); }



// Filter global agenda data if on board-todos

if (currentBoardId === 'board-todos') {

const vBoards = getVisibleBoardsInTodos();

agendaData = agendaData.map(list => {

return {

...list,

cards: (list.cards || []).filter(c => vBoards.has(c.boardId || 'board-todos'))

};

});

}



// Se for a primeira vez e n�o tiver agenda global, tenta migrar dados da agenda que estavam no board

// (Isso previne perda de dados ao atualizar o c�digo)

if (agendaData.length === 0 && boardData.some(d => d.type === 'time' || d.type === 'goal' || 
       d.type === 'unscheduled')) {

console.log("Migrando agenda do quadro para global...");

agendaData = boardData.filter(d => d.type === 'time' || d.type === 'goal' || d.type === 
       'unscheduled');

boardData = boardData.filter(d => d.type === 'kanban' || d.type === 'quad');

// Salva a migra��o

localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, JSON.stringify(boardData));

localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(agendaData));

}



// Sincronizar boardId nos cart�es se n�o tiver

if (currentBoardId !== 'board-todos') {

boardData.forEach(list => {

if (list.cards) {

list.cards.forEach(c => {

if (!c.boardId) c.boardId = currentBoardId;

});

}

});

}

agendaData.forEach(list => {

if (list.cards) {

list.cards.forEach(c => {

if (!c.boardId) c.boardId = currentBoardId || 'board-todos';

});

}

});



renderFromData(boardData, agendaData);

}



function renderFromData(boardData, agendaData) {

// === PRESERVAR SELE��O ===

window._selectedIdsToRestore = new Set();

if (typeof selected !== 'undefined' && selected.forEach) {

selected.forEach(card => {

if (card && card.dataset && card.dataset.cardId) {

window._selectedIdsToRestore.add(card.dataset.cardId);

}

});

selected.clear();

}



// Junta os dois para renderizar, mas a l�gica interna sabe que vieram de lugares diferentes

// Na verdade, a fun��o original renderFromData aceitava um array �nico.

// Vamos concatenar para reusar a l�gica de renderiza��o, pois visualmente � tudo card.

const allData = (boardData || []).concat(agendaData || []);



// === PRESERVAR SCROLL ===

const scrollMap = new Map();

scrollMap.set(boardEl, { left: boardEl.scrollLeft, top: boardEl.scrollTop });

const mainContent = document.getElementById('main-content');

if (mainContent) scrollMap.set(mainContent, { left: mainContent.scrollLeft, top: 
       mainContent.scrollTop });

const slots = document.getElementById('slots');

if (slots) scrollMap.set(slots, { left: slots.scrollLeft, top: slots.scrollTop });

if (matrixEl) scrollMap.set(matrixEl, { left: matrixEl.scrollLeft, top: matrixEl.scrollTop });



allCards = [];

boardEl.innerHTML = '';

matrixEl.innerHTML = '';

slotsRoot.innerHTML = '';



ensureMatrix();

ensureSchedule(false);



var quadMap = {

Q1: matrixEl.querySelector('.list[data-quad="Q1"] .cards'),

Q2: matrixEl.querySelector('.list[data-quad="Q2"] .cards'),

Q3: matrixEl.querySelector('.list[data-quad="Q3"] .cards'),

Q4: matrixEl.querySelector('.list[data-quad="Q4"] .cards')

};

function appendCardsToDOM(container, cardsData) {

if (!container || !cardsData || !cardsData.length) return;

var fragment = document.createDocumentFragment();

cardsData.forEach(function (cd) {

const cardEl = createCard(cd);

fragment.appendChild(cardEl);

});

container.appendChild(fragment);

}



allData.forEach(function (entry) {

if (entry.type === 'kanban') {

var l = createList(entry.title || 'Lista');

l.dataset.boardId = entry.boardId || currentBoardId;

appendCardsToDOM(l.querySelector('.cards'), entry.cards);

} else if (entry.type === 'quad' && quadMap[entry.quad]) {

appendCardsToDOM(quadMap[entry.quad], entry.cards);

} else if (entry.type === 'time' || entry.type === 'goal') {

(entry.cards || []).forEach(cardData => {

if (entry.goal && cardData.when && !cardData.when.endsWith('TGOAL')) {

cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'TGOAL';

} else if (entry.time && cardData.when && !cardData.when.includes('T' + 
       entry.time)) {

cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'T' + 
       entry.time;

}

createCard(cardData);

});

} else if (entry.type === 'unscheduled') {

(entry.cards || []).forEach(cardData => {

createCard(cardData);

});

}

});



applyFilters();

updateSlotsHasItems();

updateTotalTimerDisplay();



if (globalTimerInterval) {

clearInterval(globalTimerInterval);

globalTimerInterval = null;

}

startGlobalTimer();



scrollMap.forEach((pos, element) => {

if (element) {

element.scrollLeft = pos.left;

element.scrollTop = pos.top;

}

});

window._selectedIdsToRestore = null;

}



function restore(histObj) {

// histObj tem { boardData, agendaData }

if (histObj && histObj.boardData) {

renderFromData(histObj.boardData, histObj.agendaData);

persist(); // Salva o estado restaurado

} else {

// Fallback para formato antigo de historico se existir

renderFromData(histObj, []);

}

}



// ===== BOARD MANAGEMENT CORE =====

function generateId() {

return Date.now().toString(36) + Math.random().toString(36).substr(2);

}



function loadBoardsMetadata() {

try {

const raw = localStorage.getItem(LS_BOARDS_META);

boardsMeta = raw ? JSON.parse(raw) : [];

} catch (e) { boardsMeta = []; }

}

function saveBoardsMetadata(syncToCloud = true) {

localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta));

updateBoardSelectUI();



// Sync metadata to Firebase

if (syncToCloud && isFirebaseReady && auth && auth.currentUser) {

db.ref('users/' + auth.currentUser.uid + '/meta').set(boardsMeta)

.catch(e => console.error("Erro ao salvar metadata na nuvem", e));

}

}



function ensureTodosBoard() {

if (!boardsMeta.find(b => b.id === 'board-todos')) {

boardsMeta.unshift({ id: 'board-todos', name: 'TODOS ??', lastModified: Date.now(), color: 
       '#1976d2' });

saveBoardsMetadata(true);

}

}



function ensureTrashBoard() {

if (!boardsMeta.find(b => b.id === 'board-trash')) {

boardsMeta.push({ id: 'board-trash', name: 'Lixeira ???', lastModified: Date.now(), color: 
       '#5a1419' });

localStorage.setItem(LS_BOARD_PREFIX + 'board-trash', JSON.stringify([{ type: 'kanban', 
       title: 'Apagados', cards: [] }]));

saveBoardsMetadata(true);

}

}



function migrateToMultiBoard() {

const legacyData = localStorage.getItem(LS_KEY);

const hasMetadata = localStorage.getItem(LS_BOARDS_META);

if (legacyData && !hasMetadata) {

console.log("Migrando para multi-board...");

const newId = generateId();

const mainBoard = { id: newId, name: 'Quadro Principal', lastModified: Date.now(), color: 
       DEFAULT_THEME_COLOR };

boardsMeta = [mainBoard];

ensureTodosBoard();

ensureTrashBoard();



// Tenta separar o que � agenda do que � quadro na migra��o inicial

// (Simplificado: joga tudo no quadro primeiro, o loadAndRenderAll separa depois)

localStorage.setItem(LS_BOARD_PREFIX + newId, legacyData);



currentBoardId = newId;

localStorage.setItem(LS_CURRENT_BOARD, currentBoardId);

saveBoardsMetadata();

} else if (!hasMetadata) {

createNewBoard('Meu Quadro');

ensureTodosBoard();

ensureTrashBoard();

} else {

loadBoardsMetadata();

ensureTodosBoard();

ensureTrashBoard();

currentBoardId = localStorage.getItem(LS_CURRENT_BOARD);

if (!boardsMeta.find(b => b.id === currentBoardId)) {

if (boardsMeta.length > 0) currentBoardId = boardsMeta[0].id;

else createNewBoard('Meu Quadro');

}

}

}



function createNewBoard(name) {

const id = generateId();

const newBoard = { id: id, name: name || 'Novo Quadro', lastModified: Date.now(), color: 
       DEFAULT_THEME_COLOR };

boardsMeta.push(newBoard);

saveBoardsMetadata();

localStorage.setItem(LS_BOARD_PREFIX + id, JSON.stringify([]));

switchBoard(id);

}



function renameBoard() {

if (currentBoardId === 'board-todos' || currentBoardId === 'board-trash') {

alert("Voc� n�o pode alTerÃ§ar ou renomear este quadro especial.");

return;

}

const board = boardsMeta.find(b => b.id === currentBoardId);

if (!board) return;

const newName = prompt("Novo nome para o quadro:", board.name);

if (newName && newName.trim()) {

board.name = newName.trim();

saveBoardsMetadata();

}

}



function deleteBoard() {

if (currentBoardId === 'board-todos' || currentBoardId === 'board-trash') {

alert("Voc� n�o pode excluir este quadro especial.");

return;

}

if (boardsMeta.length <= 2) { // 2 because TODOS and Lixeira are permanent

alert("Voc� n�o tem outros quadros para excluir.");

return;

}

const board = boardsMeta.find(b => b.id === currentBoardId);

if (!board) return;



if (confirm(`Tem certeza que deseja excluir o quadro "${board.name}"? Isso n�o pode ser 
       desfeito.`)) {

localStorage.removeItem(LS_BOARD_PREFIX + currentBoardId);

if (isFirebaseReady && auth && auth.currentUser) {

db.ref('users/' + auth.currentUser.uid + '/boards/' + currentBoardId).remove();

}

boardsMeta = boardsMeta.filter(b => b.id !== currentBoardId);

// Switch to first non-todos board if possible

const nextBoard = boardsMeta.find(b => b.id !== 'board-trash') || boardsMeta[0];

currentBoardId = nextBoard.id;

saveBoardsMetadata();

localStorage.setItem(LS_CURRENT_BOARD, currentBoardId);

window.location.reload();

}

}



function cloneBoard() {

const board = boardsMeta.find(b => b.id === currentBoardId);

if (!board) return;

const newName = prompt("Nome para a c�pia:", board.name + " (C�pia)");

if (!newName) return;



// Na c�pia, pegamos APENAS os dados do quadro, n�o a agenda (que � global)

const { boardData } = serializeAndSeparate();

const newId = generateId();



const newBoard = { id: newId, name: newName, lastModified: Date.now(), color: board.color || 
       DEFAULT_THEME_COLOR };

boardsMeta.push(newBoard);

saveBoardsMetadata();



localStorage.setItem(LS_BOARD_PREFIX + newId, JSON.stringify(boardData));

switchBoard(newId);

}



function switchBoard(id) {

if (id === currentBoardId && boardEl.children.length > 0) return;



saveImmediately();



console.log("Switching to board: " + id);

currentBoardId = id;

localStorage.setItem(LS_CURRENT_BOARD, id);



const filterBoardsBtn = document.getElementById('filterBoardsBtn');

if (filterBoardsBtn) {

filterBoardsBtn.style.display = (id === 'board-todos') ? 'inline-block' : 'none';

}



const board = boardsMeta.find(b => b.id === id);

if (board) setBoardTheme(board.color);



loadAndRenderAll();



// Reinicia historico de undo

hist = []; cursor = -1;

const { boardData, agendaData } = serializeAndSeparate();

pushHistory({ boardData, agendaData });



updateBoardSelectUI();



if (isFirebaseReady && auth && auth.currentUser) {

subscribeToCurrentBoard(auth.currentUser.uid, id);

}

}



// ===== THEMES & CROSS-BOARD =====

// ... (THEMES code remains same) ...

const THEMES = {

'#1976d2': { name: 'Azul (Padr�o)', brand: '#1976d2', bg: '#0f1a2a', panel: '#0f223d', card: 
       '#112b4a', text: '#e9f1ff' },

'#2e7d32': { name: 'Verde Floresta', brand: '#2e7d32', bg: '#0b160b', panel: '#142517', card: 
       '#1a321e', text: '#e8f5e9' },

'#7b1fa2': { name: 'Roxo Profundo', brand: '#7b1fa2', bg: '#100614', panel: '#210e29', card: 
       '#2c1236', text: '#f3e5f5' },

'#e65100': { name: 'Laranja Queimado', brand: '#e65100', bg: '#180d00', panel: '#2e1900', card: 
       '#3d2200', text: '#fff3e0' },

'#c62828': { name: 'Vermelho Tijolo', brand: '#c62828', bg: '#140505', panel: '#2a0a0a', card: 
       '#380d0d', text: '#ffebee' },

'#37474f': { name: 'Cinza Escuro', brand: '#37474f', bg: '#101416', panel: '#1c2327', card: 
       '#263238', text: '#eceff1' },

'#00838f': { name: 'Ciano', brand: '#00838f', bg: '#001416', panel: '#00262b', card: '#003339', 
       text: '#e0f7fa' },

'#ad1457': { name: 'Rosa Choque', brand: '#ad1457', bg: '#160209', panel: '#2b0512', card: 
       '#380617', text: '#fce4ec' },

'#00796b': { name: 'Verde �gua', brand: '#00796b', bg: '#001210', panel: '#00211f', card: 
       '#002e2b', text: '#e0f2f1' },

'#8d6e63': { name: 'Marrom Slate', brand: '#8d6e63', bg: '#18110f', panel: '#281e1b', card: 
       '#352924', text: '#efebe9' },

'#3f51b5': { name: '�ndigo', brand: '#3f51b5', bg: '#0a0b16', panel: '#13152c', card: 
       '#1c1f40', text: '#e8eaf6' },

'#ffb300': { name: 'Amarelo �mbar', brand: '#ffb300', bg: '#1c1400', panel: '#332500', card: 
       '#463300', text: '#fff8e1' },

'#827717': { name: 'Verde Lim�o', brand: '#827717', bg: '#121200', panel: '#222204', card: 
       '#313107', text: '#f9fbe7' },

'#d81b60': { name: 'Rosa Magenta', brand: '#d81b60', bg: '#1a000a', panel: '#320015', card: 
       '#44001d', text: '#fce4ec' },

'#673ab7': { name: 'Roxo Lavanda', brand: '#673ab7', bg: '#0e0618', panel: '#1d0e32', card: 
       '#281446', text: '#ede7f6' },

'#00c853': { name: 'Esmeralda', brand: '#00c853', bg: '#001a0a', panel: '#003314', card: 
       '#00481c', text: '#e8f5e9' },

'#ff007f': { name: 'Cyberpunk Neon', brand: '#ff007f', bg: '#0a000d', panel: '#1b0022', card: 
       '#270031', text: '#ffe5f2' },

'#00e676': { name: 'Menta Neon', brand: '#00e676', bg: '#001209', panel: '#002412', card: 
       '#00361b', text: '#e8fdf5' },

'#00b0ff': { name: 'Oceano Profundo', brand: '#00b0ff', bg: '#000a12', panel: '#001524', card: 
       '#00223b', text: '#e0f7ff' },

'#ec407a': { name: 'Rose Gold', brand: '#ec407a', bg: '#1a0a0f', panel: '#2e141c', card: 
       '#3f1b26', text: '#fce4ec' },

'#f43f5e': { name: 'P�r do Sol Violeta', brand: '#f43f5e', bg: '#18040d', panel: '#2d0a1b', 
       card: '#3e0f26', text: '#ffeef2' },

'#607d8b': { name: 'Grafite', brand: '#607d8b', bg: '#111618', panel: '#1e262a', card: 
       '#2a353c', text: '#eceff1' },

'#ff8f00': { name: '�mbar Dourado', brand: '#ff8f00', bg: '#1a0e00', panel: '#301a00', card: 
       '#442400', text: '#fff8e1' },

'#880e4f': { name: 'Ameixa Escura', brand: '#880e4f', bg: '#12020a', panel: '#240414', card: 
       '#33061d', text: '#fce4ec' }

};



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

function getBoardColor(boardId) {

if (boardId === 'board-todos') {

const board = boardsMeta.find(b => b.id === 'board-todos');

return board ? board.color : DEFAULT_THEME_COLOR;

}

const board = boardsMeta.find(b => b.id === boardId);

return board ? board.color : DEFAULT_THEME_COLOR;

}



function openBoardThemePicker() {

const board = boardsMeta.find(b => b.id === currentBoardId);

if (!board) return;



showModal('Cor do Quadro', function () {

const grid = el('div');

grid.style.display = 'grid';

grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr))';

grid.style.gap = '10px';



Object.values(THEMES).forEach(theme => {

const btn = el('button');

btn.textContent = theme.name;

btn.style.background = theme.brand;

btn.style.color = 'white';

btn.style.border = 'none';

btn.style.padding = '15px';

btn.style.borderRadius = '8px';

btn.style.cursor = 'pointer';

btn.style.fontWeight = 'bold';



btn.style.background = `linear-gradient(135deg, ${theme.bg} 0%, ${theme.brand} 100%)`;

btn.style.border = `1px solid ${theme.panel}`;



if (theme.brand.toLowerCase() === (board.color || DEFAULT_THEME_COLOR).toLowerCase()) {

btn.style.boxShadow = '0 0 0 2px #fff, 0 0 0 4px ' + theme.brand;

}



btn.onclick = function () {

board.color = theme.brand;

setBoardTheme(theme.brand);

saveBoardsMetadata();

document.querySelector('.modal-wrap').remove();

};

grid.appendChild(btn);

});

return grid;

}, function () { });

}



// (getBoardData removido pois n�o � mais usado da mesma forma, substituido por loadAndRenderAll)

function getBoardData(boardId) {

// Mantido para suporte legacy se precisar

try {

const str = localStorage.getItem(LS_BOARD_PREFIX + boardId);

return str ? JSON.parse(str) : [];

} catch (e) { return []; }

}



function moveCardToBoard(cardElement, targetBoardId, targetListTitle) {

if (!cardElement) return;



const targetBoardMeta = boardsMeta.find(b => b.id === targetBoardId);

const boardName = targetBoardMeta ? targetBoardMeta.name : 'Outro Quadro';

addCardHistory(cardElement, 'Movido para o quadro "' + boardName + '"');

const cardData = cardToData(cardElement);

// IMPORTANTE: Ao mover para outro quadro, remove a data (sai da agenda global)

// A menos que a gente quisesse manter, mas conceitualmente se vai pro kanban de l�, vira 
       backlog.

cardData.when = '';

cardData.boardId = targetBoardId;

cardData.color = getBoardColor(targetBoardId) || '';



const targetData = getBoardData(targetBoardId);

let moved = false;



let targetList = targetData.find(l => l.type === 'kanban' && l.title === targetListTitle);

if (!targetList && targetBoardId === 'board-trash') {

targetList = { type: 'kanban', title: 'Apagados', cards: [] };

targetData.push(targetList);

}



if (targetList) {

if (!targetList.cards) targetList.cards = [];

targetList.cards.push(cardData);

moved = true;

} else {

if (targetData.length > 0 && targetData[0].type === 'kanban') {

targetData[0].cards.push(cardData);

moved = true;

if (targetBoardId !== 'board-trash') {

alert(`Lista "${targetListTitle}" n�o encontrada. Movido para 
       "${targetData[0].title}".`);

}

} else {

targetData.unshift({ type: 'kanban', title: 'Inbox', cards: [cardData] });

moved = true;

}

}



if (moved) {

localStorage.setItem(LS_BOARD_PREFIX + targetBoardId, JSON.stringify(targetData));



const targetBoard = boardsMeta.find(b => b.id === targetBoardId);

if (targetBoard) { targetBoard.lastModified = Date.now(); saveBoardsMetadata(); }



if (isFirebaseReady && auth && auth.currentUser) {

db.ref('users/' + auth.currentUser.uid + '/boards/' + targetBoardId).set(targetData);

}



removeCard(cardElement, true);

// Persist cuida de salvar a remo��o no quadro atual E atualizar a agenda global se 
       necessario

persist();



const btn = document.createElement('div');

btn.textContent = `Card movido para quadro "${targetBoard ? targetBoard.name : 'Outro'}"`;

btn.style.position = 'fixed'; btn.style.bottom = '20px'; btn.style.left = '50%'; 
       btn.style.transform = 'translateX(-50%)';

btn.style.background = '#28a745'; btn.style.color = 'white'; btn.style.padding = '10px 
       20px'; btn.style.borderRadius = '5px'; btn.style.zIndex = '9999';

document.body.appendChild(btn);

setTimeout(() => btn.remove(), 3000);

}

}

function updateBoardSelectUI() {

const select = document.getElementById('boardSelect');

if (!select) return;



select.innerHTML = '';

const sortedBoards = [...boardsMeta].sort((a, b) => {

if (a.id === 'board-todos') return -1;

if (b.id === 'board-todos') return 1;

if (a.id === 'board-trash') return 1;

if (b.id === 'board-trash') return -1;

return a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' });

});



sortedBoards.forEach(b => {

const opt = document.createElement('option');

opt.value = b.id;

opt.textContent = b.name;

if (b.id === currentBoardId) opt.selected = true;

select.appendChild(opt);

});

}

function distributeAndSaveTodos(mergedBoardData, agendaData) {

const vBoards = getVisibleBoardsInTodos();

let boardsDataMap = {};

boardsMeta.forEach(b => {

if (b.id === 'board-trash') return;

if (vBoards.has(b.id)) {

boardsDataMap[b.id] = [];

}

});

if (vBoards.has('board-todos') || boardsMeta.some(b => b.id === 'board-todos')) {

boardsDataMap['board-todos'] = [];

}



// First, initialize empty lists for boards associated with lists in DOM

mergedBoardData.forEach(list => {

if (list.type === 'kanban') {

const title = list.title;

const associatedBoards = new Set();

if (list.boardId && list.boardId !== 'board-todos') {

associatedBoards.add(list.boardId);

}

(list.cards || []).forEach(card => {

if (card.boardId && card.boardId !== 'board-trash') {

associatedBoards.add(card.boardId);

}

});

if (associatedBoards.size === 0) {

associatedBoards.add('board-todos');

}



associatedBoards.forEach(bId => {

if (boardsDataMap[bId]) {

boardsDataMap[bId].push({ type: 'kanban', title: title, cards: [] });

}

});

} else if (list.type === 'quad') {

const quad = list.quad;

Object.keys(boardsDataMap).forEach(bId => {

boardsDataMap[bId].push({ type: 'quad', quad: quad, cards: [] });

});

}

});



// Then, populate the cards in the corresponding lists

mergedBoardData.forEach(list => {

if (list.type === 'kanban') {

const title = list.title;

(list.cards || []).forEach(card => {

const bId = card.boardId || 'board-todos';

if (bId === 'board-trash') return;

if (boardsDataMap[bId]) {

let targetList = boardsDataMap[bId].find(l => l.type === 'kanban' && 
       l.title.toLowerCase().trim() === title.toLowerCase().trim());

if (!targetList) {

targetList = { type: 'kanban', title: title, cards: [] };

boardsDataMap[bId].push(targetList);

}

targetList.cards.push(card);

}

});

} else if (list.type === 'quad') {

const quad = list.quad;

(list.cards || []).forEach(card => {

const bId = card.boardId || 'board-todos';

if (bId === 'board-trash') return;

if (boardsDataMap[bId]) {

let targetList = boardsDataMap[bId].find(l => l.type === 'quad' && l.quad === 
       quad);

if (!targetList) {

targetList = { type: 'quad', quad: quad, cards: [] };

boardsDataMap[bId].push(targetList);

}

targetList.cards.push(card);

}

});

}

});



// Save only the boards that were in vBoards

Object.keys(boardsDataMap).forEach(bId => {

const boardJson = JSON.stringify(boardsDataMap[bId]);

localStorage.setItem(LS_BOARD_PREFIX + bId, boardJson);

if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {

db.ref('users/' + auth.currentUser.uid + '/boards/' + bId).set(boardsDataMap[bId])

.catch(e => console.error("Firebase board save error for " + bId, e));

}

});



// Merge agenda cards of visible boards with hidden ones in global agenda

let finalAgendaData = agendaData;

try {

let existingAgenda = [];

const raw = localStorage.getItem(LS_GLOBAL_AGENDA);

if (raw) existingAgenda = JSON.parse(raw);



function getListKey(list) {

if (list.type === 'goal') return 'goal';

if (list.type === 'unscheduled') return 'unscheduled';

if (list.type === 'time') return 'time_' + list.time;

return 'unknown';

}



const serializedMap = {};

agendaData.forEach(list => {

serializedMap[getListKey(list)] = list;

});



const mergedAgenda = [];

existingAgenda.forEach(list => {

const key = getListKey(list);

const serializedList = serializedMap[key];



const hiddenCards = (list.cards || []).filter(c => !vBoards.has(c.boardId || 
       'board-todos'));

const visibleCards = serializedList ? (serializedList.cards || []) : [];

const mergedCards = hiddenCards.concat(visibleCards);



if (mergedCards.length > 0) {

mergedAgenda.push({

...list,

cards: mergedCards

});

}

delete serializedMap[key];

});

Object.keys(serializedMap).forEach(key => {

const list = serializedMap[key];

if (list.cards && list.cards.length > 0) {

mergedAgenda.push(list);

}

});



finalAgendaData = mergedAgenda;

} catch (e) {

console.error("Error merging global agenda in distributeAndSaveTodos:", e);

}



const agendaJson = JSON.stringify(finalAgendaData);

localStorage.setItem(LS_GLOBAL_AGENDA, agendaJson);

if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {

db.ref('users/' + auth.currentUser.uid + '/global/agenda').set(finalAgendaData)

.catch(e => console.error("Firebase agenda save error:", e));

}

}



function saveImmediately() {

if (__persistTick) {

clearTimeout(__persistTick);

__persistTick = null;

}

if (__muteHistory > 0) return;

try {

const { boardData, agendaData } = serializeAndSeparate();

if (currentBoardId === 'board-todos') {

distributeAndSaveTodos(boardData, agendaData);

} else {

const boardJson = JSON.stringify(boardData);

const agendaJson = JSON.stringify(agendaData);

if (currentBoardId) {

localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, boardJson);

const board = boardsMeta.find(b => b.id === currentBoardId);

if (board) {

board.lastModified = Date.now();

saveBoardsMetadata();

}

}

localStorage.setItem(LS_GLOBAL_AGENDA, agendaJson);

if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {

db.ref('users/' + auth.currentUser.uid + '/boards/' + currentBoardId).set(boardData)

.catch(e => console.error("Firebase board save error:", e));

db.ref('users/' + auth.currentUser.uid + '/global/agenda').set(agendaData)

.catch(e => console.error("Firebase agenda save error:", e));

}

}

} catch (e) { }

capture();

}



function persist() {

if (__muteHistory > 0) return;

clearTimeout(__persistTick);

__persistTick = setTimeout(saveImmediately, 250);

}



function duplicateCards(cards) {

if (!cards || !cards.length) return;



// Group selected cards by their parent list (.cards container)

const groupedByParent = new Map();

cards.forEach(c => {

const parent = c.parentElement;

if (!groupedByParent.has(parent)) groupedByParent.set(parent, []);

groupedByParent.get(parent).push(c);

});



groupedByParent.forEach((cardList, parent) => {

if (!parent) {

cardList.forEach(c => {

var newData = cardToData(c);

createCard(newData);

});

return;

}

// Find the last selected card in this parent to insert after

const lastOriginalCard = cardList[cardList.length - 1];

let insertReference = lastOriginalCard.nextSibling;



cardList.forEach(c => {

var newData = cardToData(c);

if (!c.closest('#agenda-sidebar')) {

newData.when = '';

}

var newCard = createCard(newData);

// Insert after the current reference, then update reference to the newly inserted card

// so they are grouped together.

parent.insertBefore(newCard, insertReference);

insertReference = newCard.nextSibling;

});

});

persist();

updateSlotsHasItems();

updateTotalTimerDisplay();

}



function updateTimerDisplay(card) {

var disp = card.querySelector('.timer-display');

if (!disp) return;

var progressBar = card.querySelector('.timer-progress-bar');

var totalSeconds = parseInt(card.dataset.timerTotal || '0', 10);



card.classList.remove('timer-running', 'timer-finished', 'timer-paused');



if (totalSeconds > 0) {

var state = card.dataset.timerState || 'stopped';

var seconds = parseInt(card.dataset.timerLeft, 10);

if (isNaN(seconds)) seconds = totalSeconds;



var mins = Math.floor(seconds / 60);

var secs = seconds % 60;

disp.textContent = `?? ${to2(mins)}:${to2(secs)}`;



// Atualiza Barra de Progresso

if (progressBar) {

var perc = (seconds / totalSeconds) * 100;

progressBar.style.width = perc + '%';

}



if (state === 'running') {

disp.textContent = `?? ${to2(mins)}:${to2(secs)}`;

disp.style.color = '#66bb6a';

disp.style.background = 'rgba(102, 187, 106, 0.2)';

card.classList.add('timer-running');

}

else if (state === 'paused') { 

disp.textContent = `?? ${to2(mins)}:${to2(secs)}`;

disp.style.color = '#ffa726'; 

disp.style.background = 'rgba(255, 167, 38, 0.2)'; 

card.classList.add('timer-paused');

}

else if (state === 'finished') {

disp.textContent = `?? 00:00`;

disp.style.color = '#ef5350';

disp.style.background = 'rgba(239, 83, 80, 0.2)';

card.classList.add('timer-finished');

if (progressBar) progressBar.style.width = '100%';

}

else {

var totalMins = Math.round(totalSeconds / 60);

disp.textContent = `? ${totalMins} min`;

disp.style.color = ''; disp.style.background = 'rgba(0,0,0,.2)';

if (progressBar) progressBar.style.width = '0%';

}

} else {

disp.textContent = '';

}

// --- REINSERIDO C�DIGO FALTANTE DA FUN��O TOGGLE ---

function toggleCardCompletion(e) {

e.stopPropagation();

const card = e.target.closest('.card');

if (!card) return;

const isCompleted = card.dataset.completed === 'true';

card.dataset.completed = isCompleted ? 'false' : 'true';



if (card.dataset.completed === 'true') {

card.classList.remove('timer-finished');

if (card.dataset.timerState === 'finished') {

card.dataset.timerState = 'stopped';

}

}



persist();

updateTimerDisplay(card);

}



function paintCard(c) {

var boardColor = getBoardColor(c.dataset.boardId) || c.dataset.color;

c.style.borderColor = '';

c.style.borderLeftColor = '';

if (boardColor) {

c.style.setProperty('--board-color', boardColor);

} else {

c.style.setProperty('--board-color', '#20486f');

}



var labelColor = c.dataset.labelColor || '';

var header = c.querySelector('.card-header');

if (header) {

if (labelColor) {

header.style.backgroundColor = labelColor;

header.style.setProperty('--label-color', labelColor);

header.style.borderBottom = 'none';

} else {

header.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';

header.style.setProperty('--label-color', 'transparent');

header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';

}

}



var dot = c.querySelector('.dot');

if (dot) {

dot.style.borderColor = boardColor || '#375b86';

if (c.dataset.completed === 'true') {

dot.style.background = '#66bb6a';

dot.style.borderColor = '#66bb6a';

} else {

dot.style.background = 'rgba(0, 0, 0, 0.2)';



var dateEl = c.querySelector('.due-date');

if (c.dataset.due) {

if (!dateEl) {

dateEl = el('span', 'due-date');

if (header) {

header.insertBefore(dateEl, header.querySelector('.kebab'));

} else {

c.appendChild(dateEl);

}

}

try {

const [y, m, d] = c.dataset.due.split('-');

dateEl.textContent = '?? ' + d + '/' + m;

} catch (e) {

dateEl.textContent = '?? ' + c.dataset.due;

}

dateEl.style.display = '';

} else if (dateEl) {

dateEl.style.display = 'none';

}

if (currentBoardId === 'board-todos') {

const cardBoardId = c.dataset.boardId;

const board = boardsMeta.find(b => b.id === cardBoardId);

if (board) {

c.setAttribute('title', 'Quadro: ' + board.name);

} else {

c.removeAttribute('title');

}

} else {

c.removeAttribute('title');

}

updateTimerDisplay(c);

}



function createCard(data) {

var _d = (typeof data === 'string') ? { text: data } : (data || { text: '' });

if (!_d.history) {

_d.history = JSON.stringify([{ action: 'Criado', time: Date.now() }]);

}

var c = el('div', 'card'); c.draggable = true;



const cardBoardId = _d.boardId || currentBoardId || 'board-todos';

c.dataset.boardId = cardBoardId;

c.dataset.color = _d.color || getBoardColor(cardBoardId) || '';

c.dataset.labelColor = _d.labelColor || '';

c.dataset.due = _d.due || ''; c.dataset.when = _d.when || '';

c.dataset.timerTotal = _d.timerTotal || ''; c.dataset.timerLeft = _d.timerLeft || ''; 
       c.dataset.timerState = _d.timerState || 'stopped';

c.dataset.timerEnd = _d.timerEnd || '';

c.dataset.completed = _d.completed || 'false';

c.dataset.history = _d.history || '[]';

c.dataset.description = _d.description || '';

c.dataset.duration = _d.duration || '';

c.dataset.recurrence = _d.recurrence || 'none';

const cardId = _d.cardId || 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);

c.dataset.cardId = cardId;

if (window._selectedIdsToRestore && window._selectedIdsToRestore.has(cardId)) {

selected.add(c);

c.classList.add('selected');

}

c.dataset.recurrenceParent = _d.recurrenceParent || '';

c.dataset.alertEnabled = _d.alertEnabled || 'false';

c.dataset.alertValue = _d.alertValue || '15';

c.dataset.alertUnit = _d.alertUnit || 'minutos';

c.dataset.alertFired = _d.alertFired || 'false';



// Create Card Header

var header = el('div', 'card-header');



var chkWrap = el('span', 'card-checkbox-wrapper');

var dot = el('span', 'dot');

var dotCheck = el('span', 'dot-check'); dotCheck.textContent = '?';

dot.appendChild(dotCheck);

chkWrap.appendChild(dot);



var timerDisp = el('span', 'timer-display');



header.appendChild(chkWrap);

header.appendChild(timerDisp);



var kb = el('button', 'kebab'); kb.type = 'button'; kb.textContent = '?';

kb.addEventListener('click', function (ev) {

ev.stopPropagation();

clearSelection();

addSelection(c);

var r = kb.getBoundingClientRect();

showCtx(r.right, r.bottom, c);

});

header.appendChild(kb);



// Create Card Body

var body = el('div', 'card-body');

var t = el('span', 'text'); t.textContent = _d.text || '';

body.appendChild(t);



// Container da barra de progresso

var progCont = el('div', 'timer-progress-container');

var progBar = el('div', 'timer-progress-bar');

progCont.appendChild(progBar);



c.appendChild(header);

c.appendChild(body);

c.appendChild(progCont);



paintCard(c);



dot.addEventListener('click', toggleCardCompletion);

dot.addEventListener('dblclick', (e) => e.stopPropagation());



c.addEventListener('mousedown', function (e) {

if (e.button !== 0) return;

if (isSelectionMode) {

e.preventDefault();

toggleSelection(c);

return;

}

if (e.shiftKey) { rangeSelect(c); } else if (e.ctrlKey || e.metaKey) { toggleSelection(c); 
       } else if (!selected.has(c)) { clearSelection(); addSelection(c); }

updateTotalTimerDisplay();

});



c.addEventListener('dragstart', function (e) {

e.stopPropagation();

var block = selected.has(c) ? Array.from(selected) : [c];

dragState = { leader: c, block: block };

block.forEach(function (n) { n.classList.add('dragging'); });

pushPH();

try { e.dataTransfer.setData('text/plain', 'drag'); e.dataTransfer.effectAllowed = 'move'; 
       } catch (_) { }

});



c.addEventListener('dragend', function () {

if (dragState && dragState.block) {

dragState.block.forEach(function (n) { n.classList.remove('dragging'); });

}

cleanupPH();

dragState = null;

persist();

updateSlotsHasItems();

updateTotalTimerDisplay();

});



c.addEventListener('dblclick', function (e) {

if (e.target.closest('.dot') || e.target.closest('.kebab')) {

e.stopPropagation();

return;

}

handleCardDblClick(c);

});



c.addEventListener('contextmenu', function (e) {

e.preventDefault();

e.stopPropagation();

clearSelection();

addSelection(c);

showCtx(e.clientX, e.clientY, c);

});



if (!allCards.includes(c)) {

allCards.push(c);

}

updateTotalTimerDisplay();

return c;

}



function removeCard(c, bypassTrash = false) {

if (currentBoardId !== 'board-trash' && !bypassTrash) {

addCardHistory(c, 'Enviado para a lixeira');

moveCardToBoard(c, 'board-trash', 'Apagados');

return;

}

const parentId = c.dataset.cardId;

if (parentId) {

allCards = allCards.filter(card => {

if (card.dataset.recurrenceParent === parentId) {

card.remove();

return false;

}

return true;

});

}

var index = allCards.indexOf(c);

if (index > -1) allCards.splice(index, 1);

c.remove();

persist();

updateSlotsHasItems();

updateTotalTimerDisplay();

}



function startInlineEdit(card, isNewCard = false) {

var tEl = card.querySelector('.text'); if (!tEl) return; if 
       (card.classList.contains('editing')) return;

card.classList.add('editing'); var original = tEl.textContent; 
       tEl.setAttribute('contenteditable', 'true'); tEl.focus();

var sel = window.getSelection();

var range = document.creaTerÃ§ange();

range.selectNodeContents(tEl);

range.collapse(false);

sel.removeAllRanges();

sel.addRange(range);



function finish(save) {

tEl.removeEventListener('keydown', onKey);

tEl.removeEventListener('blur', onBlur);

tEl.removeAttribute('contenteditable');

card.classList.remove('editing');



const quickConfigToggle = document.getElementById('quickConfigToggle');

const textWasEmpty = original.trim() === '';

const textIsNowEmpty = tEl.textContent.trim() === '';



const targetCard = card._originalReference || card;



if (!save) {

tEl.textContent = original;

if (textWasEmpty && textIsNowEmpty) {

removeCard(targetCard, true);

if (card._originalReference) renderWeeklyView();

}

} else if (textIsNowEmpty) {

if (!textWasEmpty) {

showConfirm('excluir cart�o vazio?', function () {

removeCard(targetCard, true);

if (card._originalReference) renderWeeklyView();

});

} else {

removeCard(targetCard, true);

if (card._originalReference) renderWeeklyView();

}

} else {

if (card._originalReference) {

const origText = card._originalReference.querySelector('.text');

if (origText) origText.textContent = tEl.textContent;

}

persist();

if (isNewCard && quickConfigToggle && quickConfigToggle.checked) {

openTimerDialog([targetCard], function () {

setTimeout(function () {

openColorDialog([targetCard]);

if (card._originalReference) renderWeeklyView();

}, 1);

});

} else {

if (card._originalReference) renderWeeklyView();

}

}

}

function onKey(ev) {

if (ev.key === 'Escape') {

ev.preventDefault();

finish(false);

}

if (ev.key === 'Enter' && !ev.shiftKey) {

ev.preventDefault();

finish(true);

}

}

function onBlur() { finish(true); }

tEl.addEventListener('keydown', onKey);

tEl.addEventListener('blur', onBlur);

}





function startGlobalTimer() {

if (globalTimerInterval) return;

globalTimerInterval = setInterval(function () {

var activeTimers = false;

allCards.forEach(function (c) {

if (c.dataset.timerState === 'running') {

activeTimers = true;

var now = Date.now();

var end = parseInt(c.dataset.timerEnd, 10);

if (isNaN(end)) {

c.dataset.timerState = 'paused';

return;

}

var left = Math.round((end - now) / 1000);

if (left <= 0) {

c.dataset.timerState = 'finished';

c.dataset.timerLeft = 0;

c.style.animation = '';

playBeep(); // <--- ALERTA SONORO

} else {

c.dataset.timerLeft = left;

}

updateTimerDisplay(c);

updateFocusMode();

}

});

if (!activeTimers) {

clearInterval(globalTimerInterval);

globalTimerInterval = null;

}

}, 1000);

}



let alertCheckInterval = null;

function startAlertCheck() {

if (alertCheckInterval) return;



// Set up styles for toast if not exists

if (!document.getElementById('toast-styles')) {

const style = document.createElement('style');

style.id = 'toast-styles';

style.textContent = `

@keyframes slideInRight {

from { transform: translateX(120%); opacity: 0; }

to { transform: translateX(0); opacity: 1; }

}

`;

document.head.appendChild(style);

}



alertCheckInterval = setInterval(function () {

const now = Date.now();

let anyFired = false;

allCards.forEach(c => {

if (c.dataset.alertEnabled === 'true' && c.dataset.alertFired !== 'true') {

const whenVal = c.dataset.when || '';

if (whenVal.includes('T')) {

const parts = whenVal.split('T');

const cardDate = parts[0];

const cardTime = parts[1] || '';

if (cardTime && cardTime !== 'GOAL' && /^\d{2}:\d{2}$/.test(cardTime)) {

const eventDate = new Date(cardDate + 'T' + cardTime + ':00');

if (!isNaN(eventDate.getTime())) {

const val = parseInt(c.dataset.alertValue || '15', 10);

const unit = c.dataset.alertUnit || 'minutos';

let factor = 60 * 1000;

if (unit === 'horas') factor = 60 * 60 * 1000;

else if (unit === 'dias') factor = 24 * 60 * 60 * 1000;

else if (unit === 'semanas') factor = 7 * 24 * 60 * 60 * 1000;



const alertTime = eventDate.getTime() - (val * factor);

if (now >= alertTime && now < eventDate.getTime() + 10 * 60 * 1000) {

c.dataset.alertFired = 'true';

anyFired = true;

playBeep();

setTimeout(playBeep, 200);



showNotificationToast((c.querySelector('.text') ? 
       c.querySelector('.text').textContent : '').trim(), cardTime);

}

}

}

}

}

});

if (anyFired) {

persist();

}

}, 10000); // Check every 10 seconds for responsive alerting

}



function showNotificationToast(taskTitle, taskTime) {

const toast = document.createElement('div');

toast.style.position = 'fixed';

toast.style.top = '20px';

toast.style.right = '20px';

toast.style.background = 'var(--panel)';

toast.style.color = '#fff';

toast.style.borderLeft = '4px solid var(--brand)';

toast.style.padding = '12px 18px';

toast.style.borderRadius = '8px';

toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';

toast.style.zIndex = '10000';

toast.style.display = 'flex';

toast.style.flexDirection = 'column';

toast.style.gap = '4px';

toast.style.minWidth = '280px';

toast.style.fontFamily = 'system-ui, -apple-system, sans-serif';

toast.style.animation = 'slideInRight 0.3s ease-out';



toast.innerHTML = `

<div style="display:flex; justify-content:space-between; align-items:center;">

<strong style="color:#ffb300; font-size:12px; letter-spacing: 0.5px;">? ALERTA DE 
       COMPROMISSO</strong>

<button style="background:transparent; border:none; color:#9fb3d2; font-size:16px; 
       cursor:pointer;" onclick="this.closest('.toast-container').remove()">�</button>

</div>

<div style="font-size:14px; font-weight:500; margin-top:2px;">${taskTitle || 'Tarefa sem 
       t�tulo'}</div>

<div style="font-size:12px; color:#9fb3d2; margin-top:2px;">�s ${taskTime}</div>

`;

toast.className = 'toast-container';

document.body.appendChild(toast);

setTimeout(() => {

toast.style.transition = 'opacity 0.5s, transform 0.5s';

toast.style.opacity = '0';

toast.style.transform = 'translateY(-20px)';

setTimeout(() => toast.remove(), 500);

}, 8000);

}

function handleCardDblClick(c) {

var state = c.dataset.timerState || 'stopped';

var total = parseInt(c.dataset.timerTotal || '0', 10);

if (total === 0) {

startInlineEdit(c);

return;

}



if (state === 'running') { // Pause

c.dataset.timerState = 'paused';

var now = Date.now();

var end = parseInt(c.dataset.timerEnd, 10);

c.dataset.timerLeft = Math.round((end - now) / 1000);

} else { // Start or resume

c.dataset.timerState = 'running';

var left = parseInt(c.dataset.timerLeft, 10);

if (state === 'finished' || left <= 0) left = total;

c.dataset.timerEnd = Date.now() + left * 1000;

c.style.animation = '';

startGlobalTimer();

}

updateTimerDisplay(c);

persist();

}



// ===== DnD =====

var dragState = null; var draggingList = null; var lastAnchor = null;

function syncMirrors() {

$$('.mirror-card').forEach(m => {

if (m._originalReference) {

m.classList.toggle('selected', selected.has(m._originalReference));

}

});

}

function clearSelection() { 

selected.forEach(function (c) { c.classList.remove('selected'); }); 

selected.clear(); 

syncMirrors();

updateTotalTimerDisplay(); 

}

function addSelection(c) { 

if (!c) return;

if (!selected.has(c)) { 

selected.add(c); 

c.classList.add('selected'); 

lastAnchor = c; 

syncMirrors();

} 

updateTotalTimerDisplay(); 

}

function toggleSelection(c) { 

if (!c) return;

if (selected.has(c)) { 

selected.delete(c); 

c.classList.remove('selected'); 

} else { 

addSelection(c); 

} 

syncMirrors();

updateTotalTimerDisplay(); 

}

function rangeSelect(to) {

if (!lastAnchor) { addSelection(to); return; }

var cards = Array.from(document.querySelectorAll('.card'));

var visibleCards = cards.filter(c => c.style.display !== 'none' && c.offsetHeight > 0);

var a = visibleCards.indexOf(lastAnchor);

var b = visibleCards.indexOf(to);

if (a === -1 || b === -1) {

addSelection(to);

return;

}

var start = Math.min(a, b);

var end = Math.max(a, b);

clearSelection();

for (var k = start; k <= end; k++) {

addSelection(visibleCards[k]);

}

syncMirrors();

updateTotalTimerDisplay();

}



function toggleSelectionMode() {

isSelectionMode = !isSelectionMode;

const btn = document.getElementById('toggleSelectionModeBtn');

if (btn) btn.classList.toggle('active', isSelectionMode);

if (!isSelectionMode) clearSelection();

}

function getSelectionOr(target) { return selected.size ? Array.from(selected) : (target ? [target] 
       : []); }

function pushPH() { if (!dragState) dragState = {}; var ph = el('div', 'placeholder'); 
       dragState.placeholder = ph; return ph; }

function cleanupPH() { if (dragState && dragState.placeholder) dragState.placeholder.remove(); }

function nearestAfter(container, y) { var els = 
       [].slice.call(container.querySelectorAll('.card:not(.dragging)')); var best = { offset: -Infinity, element: 
       null }; els.forEach(function (child) { var r = child.getBoundingClientRect(); var o = y - (r.top + r.height / 
       2); if (o < 0 && o > best.offset) best = { offset: o, element: child }; }); return best.element; }



function wireDropZone(container) {

var isSlot = container.classList.contains('slot') || container.classList.contains('goal-slot');

var cardsContainer = isSlot ? container.querySelector('.cards') : container;



function handleDrop(e) {

if (!dragState) return;

e.preventDefault(); e.stopPropagation();



var parent = dragState.placeholder.parentElement || cardsContainer;

var ref = dragState.placeholder;

var block = (dragState.block && dragState.block.length) ? dragState.block : 
       [dragState.leader];



applyWhen(container, block);



let targetListTitle = 'Agenda/Outro';

const listEl = container.closest('.list');

if (listEl) {

const titleInp = listEl.querySelector('.title');

targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || 
       listEl.dataset.time || 'Agenda');

}

block.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + targetListTitle + 
       '"'); });



if (!isSlot) {

block.forEach(function (n) { parent.insertBefore(n, ref); });

}



if (dragState.block) { dragState.block.forEach(function (n) { 
       n.classList.remove('dragging'); }); }

cleanupPH();

if (isSlot) container.classList.remove('hover');

dragState = null;



updateSlotsHasItems();

persist();

updateTotalTimerDisplay();

}



function handleDragOver(e) {

if (!dragState) return;

e.preventDefault();

var after = nearestAfter(cardsContainer, e.clientY);

var ph = dragState.placeholder;

if (!after) cardsContainer.appendChild(ph);

else cardsContainer.insertBefore(ph, after);

if (isSlot) container.classList.add('hover');

}

container.addEventListener('dragover', handleDragOver);

container.addEventListener('drop', handleDrop);

if (isSlot) {

container.addEventListener('dragleave', function () { container.classList.remove('hover'); 
       });

}

}



function applyWhen(listElement, nodes) {

const day = getActiveDay();

let targetWhen = '';



const EISENHOWER_COLORS = {

Q1: '#2e7d32', // Green (Fa�a)

Q2: '#1976d2', // Blue (Agende)

Q3: '#ffb300', // Yellow (Delegue)

Q4: '#c62828'  // Red (Elimine)

};



const listEl = listElement ? (listElement.closest('.list') || listElement) : null;



let isMatrix = listEl && listEl.dataset.type === 'quad';

let quad = isMatrix ? listEl.dataset.quad : '';



if (listEl && listEl.dataset.date) {

targetWhen = listEl.dataset.date + 'T';

} else if (listEl && listEl.dataset.type === 'time') {

targetWhen = day + 'T' + listEl.dataset.time;

} else if (listEl && listEl.dataset.type === 'goal') {

targetWhen = day + 'TGOAL';

} else if (listEl && listEl.closest('.unscheduled-slot')) {

targetWhen = day + 'T';

} else {

targetWhen = '';

}



nodes.forEach(function (n) {

if (n._originalReference) {

n = n._originalReference;

}

const oldBadge = n.querySelector('.info-badge');

if (oldBadge) oldBadge.remove();



if (isMatrix && quad) {

n.dataset.labelColor = EISENHOWER_COLORS[quad];

}



const cardInCache = allCards.find(card => card === n);

if (cardInCache) {

cardInCache.dataset.when = targetWhen;

if (isMatrix && quad) {

cardInCache.dataset.labelColor = EISENHOWER_COLORS[quad];

}

} else {

n.dataset.when = targetWhen;

}

paintCard(n);

});

}



boardEl.addEventListener('dragover', function (e) { if (!draggingList) return; e.preventDefault(); 
       var after = listAfter(boardEl, e.clientX); if (after == null) boardEl.appendChild(draggingList); else 
       boardEl.insertBefore(draggingList, after); });

function listAfter(container, x) { var els = 
       [].slice.call(container.querySelectorAll('.list:not(.dragging)')); var best = { offset: -Infinity, element: 
       null }; els.forEach(function (ch) { var r = ch.getBoundingClientRect(); var o = x - (r.left + r.width / 2); if 
       (o < 0 && o > best.offset) best = { offset: o, element: ch }; }); return best.element; }



// ===== Listas =====

function createList(title) {

var list = el('section', 'list');

list.dataset.type = 'kanban';

list.dataset.boardId = currentBoardId;

var h = el('header');

var t = el('input', 'title');

t.value = title || 'Nova lista';

var addBtn = el('button', 'add-btn-minimal');

addBtn.textContent = '+';

addBtn.title = 'Novo Cart�o';

addBtn.onclick = function (e) {

e.stopPropagation();

var card = createCard({ text: '' });

var cardsContainer = list.querySelector('.cards');

cardsContainer.prepend(card);

startInlineEdit(card, true);

};

var more = el('button', 'more');

more.type = 'button'; more.textContent = '?';

more.addEventListener('click', function (ev) { ev.stopPropagation(); var r = 
       more.getBoundingClientRect(); showListCtx(r.right, r.bottom, list); });

h.appendChild(t); h.appendChild(addBtn); h.appendChild(more);

list.appendChild(h);

var cards = el('div', 'cards');

list.appendChild(cards);

wireDropZone(cards);

var add = el('div', 'add'); list.appendChild(add);

boardEl.appendChild(list);

h.draggable = true;

h.addEventListener('dragstart', function (ev) { draggingList = list; 
       list.classList.add('dragging'); if (ev.dataTransfer) ev.dataTransfer.setData('text/plain', 'list'); });

h.addEventListener('dragend', function () { draggingList = null; 
       list.classList.remove('dragging'); persist(); });

h.addEventListener('contextmenu', function (e) { e.preventDefault(); showListCtx(e.clientX, 
       e.clientY, list); });

return list;

}



function ensureMatrix() {

matrixEl.innerHTML = '';

var corner = el('div', 'axis corner'); corner.style.gridArea = '1 / 1'; 
       matrixEl.appendChild(corner);

var axX1 = el('div', 'axis'); axX1.textContent = 'URGENTE'; axX1.style.gridArea = '1 / 2'; 
       matrixEl.appendChild(axX1);

var axX2 = el('div', 'axis'); axX2.textContent = 'N�O URGENTE'; axX2.style.gridArea = '1 / 3'; 
       matrixEl.appendChild(axX2);

var axY1 = el('div', 'axis axis-y'); axY1.textContent = 'IMPORTANTE'; axY1.style.gridArea = '2 
       / 1'; matrixEl.appendChild(axY1);

var axY2 = el('div', 'axis axis-y'); axY2.textContent = 'N�O IMPORTANTE'; axY2.style.gridArea = 
       '3 / 1'; matrixEl.appendChild(axY2);



var specs = [

{ quad: 'Q1', label: 'FA�A AGORA', area: '2 / 2' },

{ quad: 'Q2', label: 'AGENDE', area: '2 / 3' },

{ quad: 'Q3', label: 'DELEGUE', area: '3 / 2' },

{ quad: 'Q4', label: 'ELIMINE', area: '3 / 3' }

];

specs.forEach(function (sp) {

var l = el('section', 'list');

l.dataset.type = 'quad'; l.dataset.quad = sp.quad; l.style.gridArea = sp.area;

var h = el('header');

var t = el('div', 'quad-label'); t.textContent = sp.label;

var addBtn = el('button', 'add-btn-minimal');

addBtn.textContent = '+';

addBtn.title = 'Novo Cart�o';

addBtn.onclick = function (e) {

e.stopPropagation();

var card = createCard({ text: '' });

const EISENHOWER_COLORS = { Q1: '#2e7d32', Q2: '#1976d2', Q3: '#ffb300', Q4: '#c62828' 
       };

card.dataset.labelColor = EISENHOWER_COLORS[sp.quad] || '';

paintCard(card);

var cardsContainer = l.querySelector('.cards');

cardsContainer.prepend(card);

startInlineEdit(card, true);

};

h.appendChild(t); h.appendChild(addBtn);

var cs = el('div', 'cards');

wireDropZone(cs);

l.appendChild(h); l.appendChild(cs);

matrixEl.appendChild(l);

});

}



function ensureSchedule() {

if (slotsRoot.querySelector('.goal-slot')) return;

var goalSlot = el('section', 'list goal-slot');

goalSlot.dataset.type = 'goal';

var goalHead = el('div', 'head');

var goalLabel = el('span', 'goal-label'); goalLabel.textContent = '?? OBJETIVO DO DIA';

var goalAdd = el('button', 'add-btn-minimal');

goalAdd.textContent = '+';

goalAdd.onclick = function (e) {

e.stopPropagation();

var card = createCard({ text: '', when: getActiveDay() + 'TGOAL' });

goalSlot.querySelector('.cards').prepend(card);

startInlineEdit(card, true);

};

goalHead.appendChild(goalLabel); goalHead.appendChild(goalAdd);

goalSlot.appendChild(goalHead);

var goalCards = el('div', 'cards');

goalSlot.appendChild(goalCards);

wireDropZone(goalSlot);

slotsRoot.appendChild(goalSlot);



var unscheduledSlot = el('section', 'list unscheduled-slot');

unscheduledSlot.dataset.type = 'unscheduled';

unscheduledSlot.id = 'unscheduled-bucket';

var uHead = el('div', 'head');

var uLabel = el('span', 'unscheduled-label'); uLabel.textContent = '?? HOR�RIO A DEFINIR';

var uAdd = el('button', 'add-btn-minimal');

uAdd.textContent = '+';

uAdd.onclick = function (e) {

e.stopPropagation();

var card = createCard({ text: '', when: getActiveDay() + 'T' });

unscheduledSlot.querySelector('.cards').prepend(card);

startInlineEdit(card, true);

updateSlotsHasItems();

};

uHead.appendChild(uLabel); uHead.appendChild(uAdd);

unscheduledSlot.appendChild(uHead);

var uCards = el('div', 'cards');

unscheduledSlot.appendChild(uCards);

wireDropZone(unscheduledSlot);

slotsRoot.appendChild(unscheduledSlot);

for (var h = 6; h <= 23; h++) {

for (var m = 0; m <= 30; m += 30) {

if (h === 23 && m === 30) break;

var t = to2(h) + ':' + to2(m);

var slot = el('section', 'list slot');

slot.dataset.type = 'time'; slot.dataset.time = t;

var head = el('div', 'head');

var label = el('span', 'time'); label.textContent = t;

head.appendChild(label);

slot.appendChild(head);

var cards = el('div', 'cards');

slot.appendChild(cards);

wireDropZone(slot);

slotsRoot.appendChild(slot);

}

}

var date = document.getElementById('agendaDate');

if (date && !date.value) { date.value = new Date().toISOString().slice(0, 10); }

}



const addUnscheduledBtn = document.getElementById('addUnscheduledBtn');

if (addUnscheduledBtn) {

addUnscheduledBtn.onclick = function () {

const unscheduledSlot = document.getElementById('unscheduled-bucket');

if (unscheduledSlot) {

var card = createCard({ text: '', when: getActiveDay() + 'T' });

unscheduledSlot.querySelector('.cards').prepend(card);

startInlineEdit(card, true);

updateSlotsHasItems();

}

};

}



function getActiveDay() { var i = document.getElementById('agendaDate'); return (i && i.value) ? 
       i.value : new Date().toISOString().slice(0, 10); }

function updateSlotsHasItems() {

const day = getActiveDay();

const dayPrefixGoal = day + 'TGOAL';

const dayPrefixTime = day + 'T';

const visibleCardsInSlots = new Set();



const goalSlot = slotsRoot.querySelector('.goal-slot');

const goalCardsContainer = goalSlot.querySelector('.cards');

goalCardsContainer.innerHTML = '';

let goalHasVisible = false;

allCards.forEach(card => {

if (card.dataset.when === dayPrefixGoal && cardPassesFilters(card)) {

goalCardsContainer.appendChild(card);

goalHasVisible = true;

visibleCardsInSlots.add(card);

}

});

goalSlot.classList.toggle('has-items', goalHasVisible);



const unscheduledSlot = document.getElementById('unscheduled-bucket');

const unscheduledContainer = unscheduledSlot.querySelector('.cards');

unscheduledContainer.innerHTML = '';

let unscheduledHasVisible = false;

const exactUnscheduledMatch = day + 'T';

allCards.forEach(card => {

if (card.dataset.when === exactUnscheduledMatch && cardPassesFilters(card)) {

unscheduledContainer.appendChild(card);

unscheduledHasVisible = true;

visibleCardsInSlots.add(card);

}

});

if (unscheduledHasVisible) {

unscheduledSlot.classList.add('has-items');

unscheduledSlot.style.display = 'flex';

} else {

unscheduledSlot.classList.remove('has-items');

unscheduledSlot.style.display = 'none';

}



$$('.list.slot', schedule).forEach(function (slot) {

if (slot.id === 'unscheduled-bucket') return;

const time = slot.dataset.time;

const cardsContainer = slot.querySelector('.cards');

cardsContainer.innerHTML = '';

let slotHasVisible = false;

const targetWhen = dayPrefixTime + time;

allCards.forEach(card => {

if (card.dataset.when === targetWhen && cardPassesFilters(card)) {

cardsContainer.appendChild(card);

slotHasVisible = true;

visibleCardsInSlots.add(card);

}

});

slot.classList.toggle('has-items', slotHasVisible);

});



$$('.board .card, .matrix .card').forEach(card => {

if (visibleCardsInSlots.has(card)) {

card.style.display = 'none';

} else if (cardPassesFilters(card)) {

card.style.display = '';

} else {

card.style.display = 'none';

}

});

updateTotalTimerDisplay();

renderWeeklyView();

}

// ===== Filtros & MENUS (ENCHUGADOS) =====

var selectedColors = new Set();

var LS_VISIBLE_BOARDS = 'tea-planner-visible-boards-in-todos';

var visibleBoardsInTodos = null;



function getVisibleBoardsInTodos() {

try {

const stored = localStorage.getItem(LS_VISIBLE_BOARDS);

if (stored) {

const parsed = JSON.parse(stored);

if (Array.isArray(parsed)) {

const validIds = parsed.filter(id => boardsMeta.some(b => b.id === id));

if (validIds.length > 0) {

visibleBoardsInTodos = new Set(validIds);

return visibleBoardsInTodos;

}

}

}

} catch (e) {}

visibleBoardsInTodos = new Set(boardsMeta.map(b => b.id).filter(id => id !== 'board-trash' && 
       id !== 'board-todos'));

return visibleBoardsInTodos;

}

function parseTime(timeStr) {

if (!timeStr) return 0;

var totalMinutes = 0;

var hoursMatch = timeStr.match(/(\d+)\s*h/);

var minutesMatch = timeStr.match(/(\d+)\s*m/);

if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60;

if (minutesMatch) totalMinutes += parseInt(minutesMatch[1], 10);

if (!hoursMatch && !minutesMatch && /^\d+$/.test(timeStr)) totalMinutes = parseInt(timeStr, 10);

return totalMinutes;

}

function cardPassesFilters(c) {

var fFrom = (document.getElementById('fFrom').value) || '';

var fTo = (document.getElementById('fTo').value) || '';

var fTime = document.getElementById('fTime').value;

var ok = true;

if (selectedColors.size > 0) { ok = ok && selectedColors.has((c.dataset.labelColor || 
       '').toLowerCase()); }

if (fFrom) { ok = ok && (!!c.dataset.due && c.dataset.due >= fFrom); }

if (fTo) { ok = ok && (!!c.dataset.due && c.dataset.due <= fTo); }

if (fTime) {

var maxMins = parseTime(fTime);

var cardMins = Math.round(parseInt(c.dataset.timerTotal || '0', 10) / 60);

ok = ok && (cardMins > 0 && cardMins <= maxMins);

}

return ok;

}



function applyFilters() {

let visibleCount = 0;

allCards.forEach(function (c) {

const passesGeneralFilters = cardPassesFilters(c);

if (!c.dataset.when || !c.dataset.when.includes('T')) {

c.style.display = passesGeneralFilters ? '' : 'none';

}

if (passesGeneralFilters) visibleCount++;

});

updateSlotsHasItems();

updateFiltersUi(allCards.length, $$('.card[style*="display: none"]').length);

updateTotalTimerDisplay();

}



// ... MENUS DE CONTEXTO (move, move-all, etc) MANTIDOS IGUAIS ...

var ctxTarget = null;

var ctx = document.getElementById('ctx');

var ctxMoveSub = document.getElementById('ctx-move-sub');

var ctxMoveAllSub = document.getElementById('ctx-moveall-sub');

var ctxMoveBoardSub = document.getElementById('ctx-move-board-sub');

var listCtxTarget = null; var listCtx = document.getElementById('ctx-list'); var listMoveSub = 
       document.getElementById('ctx-list-move-sub'); var listMoveBoardSub = 
       document.getElementById('ctx-list-move-board-sub');



function hideCtx() {

ctx.style.display = 'none'; ctxTarget = null;

ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none'; 
       ctxMoveBoardSub.style.display = 'none';

$$('.board-nested-sub', ctx).forEach(el => el.style.display = 'none');

}

function showCtx(x, y, card) {

ctxTarget = card;

buildMoveSubmenu(); buildMoveBoardSubmenu();

ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none'; 
       ctxMoveBoardSub.style.display = 'none';

$$('.board-nested-sub', ctx).forEach(el => el.style.display = 'none');

ctx.style.display = 'block';

var r = ctx.getBoundingClientRect();

ctx.style.left = Math.min(x, innerWidth - r.width - 8) + 'px';

ctx.style.top = Math.min(y, innerHeight - r.height - 8) + 'px';

}



// Fechar menus ao clicar fora ou desistir

document.addEventListener('mousedown', function (e) {

// Se clicar fora do menu de contexto do cart�o e n�o for no bot�o de acionamento (kebab)

if (ctx && ctx.style.display === 'block') {

if (!ctx.contains(e.target) && !e.target.closest('.kebab')) {

hideCtx();

}

}

// Se clicar fora do menu de contexto da lista e n�o for no bot�o de acionamento (more)

if (listCtx && listCtx.style.display === 'block') {

if (!listCtx.contains(e.target) && !e.target.closest('.more')) {

listCtx.style.display = 'none';

listCtxTarget = null;

}

}

});





function updateFiltersUi(totalCards, hiddenCardsCount) {

var badge = document.getElementById('filtersOn');

var header = document.getElementById('appHeader');

const anyActive = selectedColors.size > 0 || !!document.getElementById('fFrom').value || 
       !!document.getElementById('fTo').value || !!document.getElementById('fTime').value;

if (anyActive) {

badge.textContent = hiddenCardsCount > 0 ? ('Filtros: ' + hiddenCardsCount + ' oculto' + 
       (hiddenCardsCount > 1 ? 's' : '')) : 'Filtros ativos';

badge.hidden = false;

header.classList.add('filters-active');

} else {

badge.hidden = true;

header.classList.remove('filters-active');

}

}



function buildMoveBoardSubmenu() {

ctxMoveBoardSub.innerHTML = '';

// Remove any previously appended board submenus from #ctx

$$('.board-nested-sub', ctx).forEach(el => el.remove());



boardsMeta.forEach(b => {

if (b.id === currentBoardId) return;



const btn = document.createElement('button');

btn.type = 'button';

btn.style.width = '100%';

btn.style.display = 'flex';

btn.style.alignItems = 'center';

btn.style.justifyContent = 'space-between';

btn.innerHTML = `${b.name} <span style="font-size:10px">?</span>`;



// Create the sub-submenu, but we will append it to #ctx

const nestedSub = document.createElement('div');

nestedSub.className = 'ctx-sub board-nested-sub';

nestedSub.style.display = 'none';

ctx.appendChild(nestedSub);



btn.onclick = function (e) {

e.stopPropagation();

const wasVisible = nestedSub.style.display === 'block';



// Close all nested board submenus

$$('.board-nested-sub', ctx).forEach(d => d.style.display = 'none');

if (!wasVisible) {

if (nestedSub.children.length === 0) {

const bData = getBoardData(b.id);

const kanbanLists = bData.filter(d => d.type === 'kanban');

if (kanbanLists.length === 0) {

const emptyMsg = document.createElement('div'); 

emptyMsg.textContent = '(Vazio)'; 

emptyMsg.style.padding = '8px'; 

emptyMsg.style.color = '#777'; 

nestedSub.appendChild(emptyMsg);

} else {

kanbanLists.forEach(l => {

const lBtn = document.createElement('button'); 

lBtn.type = 'button';

lBtn.textContent = l.title || 'Sem t�tulo';

lBtn.onclick = function (ev) { 

ev.stopPropagation(); 

moveCardToBoard(ctxTarget, b.id, l.title); 

hideCtx(); 

};

nestedSub.appendChild(lBtn);

});

}

}



// Position the nested submenu relative to the button

const btnRect = btn.getBoundingClientRect();

const ctxRect = ctx.getBoundingClientRect();



nestedSub.style.display = 'block';



// Calculate positioning

let leftPos = btnRect.right - ctxRect.left;

let topPos = btnRect.top - ctxRect.top;



nestedSub.style.left = leftPos + 'px';

nestedSub.style.top = topPos + 'px';



// Smart flip left if offscreen

const subRect = nestedSub.getBoundingClientRect();

if (subRect.right > window.innerWidth) {

// flip left

nestedSub.style.left = (btnRect.left - ctxRect.left - subRect.width) + 'px';

}

// Smart vertical adjustment if offscreen

if (subRect.bottom > window.innerHeight) {

nestedSub.style.top = (btnRect.bottom - ctxRect.top - subRect.height) + 'px';

}

}

};

ctxMoveBoardSub.appendChild(btn);

});

if (ctxMoveBoardSub.children.length === 0) {

const msg = document.createElement('div'); msg.textContent = 'Nenhum outro quadro.'; 
       msg.style.padding = '10px'; msg.style.color = '#777'; ctxMoveBoardSub.appendChild(msg);

}

}



function addMoveButton(targetListElement, name, submenuContainer) {

var b = el('button'); b.textContent = name;

b.addEventListener('click', function (ev) {

ev.stopPropagation();

var block = getSelectionOr(ctxTarget);

if (!block.length) return;

var destContainer = targetListElement.querySelector('.cards') || targetListElement;

var isAgendaDrop = targetListElement.closest('#agenda-sidebar');

applyWhen(targetListElement, block);



let targetListTitle = 'Agenda/Outro';

const listEl = targetListElement.closest('.list');

if (listEl) {

const titleInp = listEl.querySelector('.title');

targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || 
       listEl.dataset.time || 'Agenda');

}

block.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + targetListTitle + 
       '" via Menu'); });



if (!isAgendaDrop) { block.forEach(function (cardElement) { 
       destContainer.appendChild(cardElement); }); }

updateSlotsHasItems(); persist(); applyFilters(); hideCtx();

});

submenuContainer.appendChild(b);

}



function buildMoveAllSubmenu(fromList) {

ctxMoveAllSub.innerHTML = '';

$$('.list').forEach(function (l, i) {

if (l === fromList) return;

addMoveAllButton(l, (l.querySelector('.title') ? l.querySelector('.title').value : null) || 
       l.dataset.quad || l.dataset.time || ('Lista ' + (i + 1)), ctxMoveAllSub, fromList);

});

const goalSlot = slotsRoot.querySelector('.goal-slot');

if (goalSlot && goalSlot !== fromList) addMoveAllButton(goalSlot, '?? OBJETIVO DO DIA', 
       ctxMoveAllSub, fromList);

}



function addMoveAllButton(targetListElement, name, submenuContainer, sourceListElement) {

var b = el('button'); b.textContent = name;

b.addEventListener('click', function (ev) {

ev.stopPropagation();

const sourceCardsContainer = sourceListElement.querySelector('.cards');

if (!sourceCardsContainer) return;

const cardsToMove = Array.from(sourceCardsContainer.querySelectorAll('.card'));

if (!cardsToMove.length) return;

var destContainer = targetListElement.querySelector('.cards') || targetListElement;

var isAgendaDrop = targetListElement.closest('#agenda-sidebar');

applyWhen(targetListElement, cardsToMove);



let targetListTitle = 'Agenda/Outro';

const listEl = targetListElement.closest('.list');

if (listEl) {

const titleInp = listEl.querySelector('.title');

targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || 
       listEl.dataset.time || 'Agenda');

}

cardsToMove.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + 
       targetListTitle + '" via Menu'); });



if (!isAgendaDrop) { cardsToMove.forEach(function (cardElement) { 
       destContainer.appendChild(cardElement); }); }

else { cardsToMove.forEach(c => c.remove()); }

updateSlotsHasItems(); persist(); applyFilters(); hideCtx();

});

submenuContainer.appendChild(b);

}



function smartPositionSubmenu(btnElement, submenuElement) {

const ctxMenu = submenuElement.closest('.ctx');

if (ctxMenu) {

ctxMenu.querySelectorAll('div[style*="position:relative"]').forEach(div => {

div.style.zIndex = '';

});

}

const parentDiv = submenuElement.parentElement;

if (parentDiv && parentDiv.style.position === 'relative') {

parentDiv.style.zIndex = '100';

}



submenuElement.classList.remove('flip-left');

submenuElement.style.display = 'block';

submenuElement.style.top = '0';

const rect = submenuElement.getBoundingClientRect();

if (rect.right > window.innerWidth) submenuElement.classList.add('flip-left');

if (rect.bottom > window.innerHeight) submenuElement.style.top = `-${rect.bottom - 
       window.innerHeight + 10}px`;

}



ctx.addEventListener('click', function (e) {

var btn = e.target.closest('button');

if (!btn) return;

var action = btn.dataset.action;

var block = getSelectionOr(ctxTarget);

if (action === 'move') {

const isClosed = ctxMoveSub.style.display === 'none';

ctxMoveAllSub.style.display = 'none'; ctxMoveBoardSub.style.display = 'none';

if (isClosed) smartPositionSubmenu(btn, ctxMoveSub); else ctxMoveSub.style.display = 'none';

return;

}

if (action === 'move-all') {

var list = (ctxTarget || block[0]) ? (ctxTarget || block[0]).closest('.list') : null;

if (!list) return;

buildMoveAllSubmenu(list);

const isClosed = ctxMoveAllSub.style.display === 'none';

ctxMoveSub.style.display = 'none'; ctxMoveBoardSub.style.display = 'none';

if (isClosed) smartPositionSubmenu(btn, ctxMoveAllSub); else ctxMoveAllSub.style.display = 
       'none';

return;

}

if (action === 'move-board') {

const isClosed = ctxMoveBoardSub.style.display === 'none';

ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none';

if (isClosed) smartPositionSubmenu(btn, ctxMoveBoardSub); else 
       ctxMoveBoardSub.style.display = 'none';

return;

}

hideCtx();

if (action === 'edit') { if (block.length) startInlineEdit(block[0]); }

else if (action === 'prop') { showPropertiesDialog(block[0]); }

else if (action === 'dup') { duplicateCards(block); }

else if (action === 'del') { block.forEach(function (n) { removeCard(n); }); }

else if (action === 'color') { openColorDialog(block); }

else if (action === 'date') { openDateDialog(block); }

else if (action === 'agenda') { if (block.length) openAgendaDialog(block[0]); }

else if (action === 'alert') { if (block.length) openAlertDialog(block[0], function(res) { 
       block[0].dataset.alertEnabled = res.alertEnabled ? 'true' : 'false'; block[0].dataset.alertValue = 
       res.alertValue; block[0].dataset.alertUnit = res.alertUnit; block[0].dataset.alertFired = 'false'; 
       paintCard(block[0]); persist(); }); }

else if (action === 'timer') { openTimerDialog(block); }

else if (action === 'gemini-subtasks') { generateSubtasks(block); }

else if (action === 'gemini-organize') { organizeCardWithGemini(block); }

else if (action === 'select-mode') { if (!isSelectionMode) toggleSelectionMode(); 
       addSelection(block[0]); }

else if (action === 'del-all') { var list2 = (ctxTarget || block[0]) ? (ctxTarget || 
       block[0]).closest('.list') : null; if (!list2) return; showConfirm('excluir TODOS os cart�es desta lista?', 
       function () { $$('.card', list2).forEach(function (c) { removeCard(c); }); }); }

});



function showPropertiesDialog(card) {

if (!card) return;

showModal('Propriedades do Cart�o', function() {

const wrap = el('div');

wrap.style.textAlign = 'left';

wrap.style.fontSize = '14px';

wrap.style.lineHeight = '1.5';



let hist = [];

try { hist = JSON.parse(card.dataset.history || '[]'); } catch(e) {}



if (hist.length === 0) {

const fallBackStr = el('div');

fallBackStr.style.color = '#ccc';

fallBackStr.textContent = 'Sem registros de hist�rico. (Cart�o legado)';

wrap.appendChild(fallBackStr);

} else {

const ul = el('ul');

ul.style.paddingLeft = '20px';

ul.style.color = '#cfe0ff';

ul.style.margin = '0';



hist.forEach(h => {

const li = el('li');

const dateStr = new Date(h.time).toLocaleString();

li.innerHTML = `<strong>${h.action}</strong> <br><span 
       style="font-size:12px;color:#9fb3d2">?? ${dateStr}</span>`;

li.style.marginBottom = '8px';

ul.appendChild(li);

});

wrap.appendChild(ul);

}



return wrap;

}, function() {});

}



function showListCtx(x, y, list) {

listCtxTarget = list;

buildListMoveSub();

listMoveSub.style.display = 'none';

if (listMoveBoardSub) listMoveBoardSub.style.display = 'none';

listCtx.style.display = 'block';

var r = listCtx.getBoundingClientRect();

listCtx.style.left = Math.min(x, innerWidth - r.width - 8) + 'px';

listCtx.style.top = Math.min(y, innerHeight - r.height - 8) + 'px';

}

function buildListMoveSub() {

listMoveSub.innerHTML = '';

if (!listCtxTarget) return;

$$('.list').forEach(function (l, i) {

if (l === listCtxTarget) return;

addMoveAllButton(l, (l.querySelector('.title') ? l.querySelector('.title').value : null) || 
       l.dataset.quad || l.dataset.time || ('Lista ' + (i + 1)), listMoveSub, listCtxTarget);

});

const goalSlot = slotsRoot.querySelector('.goal-slot');

if (goalSlot && goalSlot !== listCtxTarget) addMoveAllButton(goalSlot, '?? OBJETIVO DO DIA', 
       listMoveSub, listCtxTarget);

}

function buildListMoveBoardSub() {

if (!listMoveBoardSub || !listCtxTarget) return;

listMoveBoardSub.innerHTML = '';

boardsMeta.forEach(b => {

if (b.id === currentBoardId || b.id === 'board-todos' || b.id === 'board-trash') return;

const btn = el('button');

btn.textContent = b.name;

btn.addEventListener('click', function(ev) {

ev.stopPropagation();

moveListToBoard(listCtxTarget, b.id);

listCtx.style.display = 'none';

});

listMoveBoardSub.appendChild(btn);

});

}

function moveListToBoard(listElement, targetBoardId) {

if (!listElement || !targetBoardId) return;

const targetColor = getBoardColor(targetBoardId);

const currentIsTodos = (currentBoardId === 'board-todos');

const listTitle = (listElement.querySelector('.title') ? 
       listElement.querySelector('.title').value : 'Lista');

const cards = Array.from(listElement.querySelectorAll('.card'));

const targetBoardMeta = boardsMeta.find(b => b.id === targetBoardId);

const targetBoardName = targetBoardMeta ? targetBoardMeta.name : 'Outro Quadro';



const cardsData = cards.map(c => {

const cData = cardToData(c);

cData.boardId = targetBoardId;

if (targetColor) cData.color = targetColor;

return cData;

});



if (!currentIsTodos) {

const targetBoardData = getBoardData(targetBoardId);

targetBoardData.push({

type: 'kanban',

title: listTitle,

boardId: targetBoardId,

cards: cardsData

});

localStorage.setItem(LS_BOARD_PREFIX + targetBoardId, JSON.stringify(targetBoardData));

if (isFirebaseReady && auth && auth.currentUser) {

db.ref('users/' + auth.currentUser.uid + '/boards/' + 
       targetBoardId).set(targetBoardData)

.catch(e => console.error("Firebase board save error:", e));

}

listElement.remove();

} else {

listElement.dataset.boardId = targetBoardId;

cards.forEach(c => {

c.dataset.boardId = targetBoardId;

if (targetColor) c.dataset.color = targetColor;

addCardHistory(c, 'Lista movida para o quadro "' + targetBoardName + '"');

paintCard(c);

});

}

persist();

updateSlotsHasItems();

showToast(`Lista "${listTitle}" movida para o quadro "${targetBoardName}"`);

}

function buildMoveSubmenu() {

ctxMoveSub.innerHTML = '';

$$('.list[data-type="kanban"]', boardEl).forEach(function (l, i) { addMoveButton(l, 
       (l.querySelector('.title') ? l.querySelector('.title').value : null) || ('Lista ' + (i + 1)), ctxMoveSub); });

const matrixLabels = { 'Q1': 'Q1 - FA�A AGORA', 'Q2': 'Q2 - AGENDE', 'Q3': 'Q3 - DELEGUE', 
       'Q4': 'Q4 - ELIMINE' };

$$('.list[data-type="quad"]', matrixEl).forEach(function (l) { addMoveButton(l, 
       matrixLabels[l.dataset.quad] || l.dataset.quad, ctxMoveSub); });

const goalSlot = slotsRoot.querySelector('.goal-slot');

if (goalSlot) addMoveButton(goalSlot, '?? OBJETIVO DO DIA', ctxMoveSub);

$$('.list[data-type="time"]', schedule).forEach(function (l) { addMoveButton(l, l.dataset.time, 
       ctxMoveSub); });

}

listCtx.addEventListener('click', function (e) {

var b = e.target.closest('button');

if (!b) return;

var action = b.dataset.action;

if (action === 'list-move-all') {

listMoveSub.style.display = (listMoveSub.style.display === 'block' ? 'none' : 'block');

if (listMoveBoardSub) listMoveBoardSub.style.display = 'none';

return;

}

if (action === 'list-move-board') {

buildListMoveBoardSub();

if (listMoveBoardSub) {

listMoveBoardSub.style.display = (listMoveBoardSub.style.display === 'block' ? 'none' : 
       'block');

}

listMoveSub.style.display = 'none';

return;

}

if (action === 'list-del' && listCtxTarget) {

showConfirm('excluir a lista inteira?', function () {

listCtxTarget.remove();

persist();

});

}

if (action === 'list-del-all' && listCtxTarget) {

showConfirm('excluir TODOS os cart�es desta lista?', function () {

$$('.card', listCtxTarget).forEach(function (c) { removeCard(c); });

persist();

updateSlotsHasItems();

});

}

listCtx.style.display = 'none';

});



// ===== Modal helpers + Paleta =====

var MATRIX_COLORS = { Q1: '#104239', Q2: '#0e3155', Q3: '#5a4014', Q4: '#5a1419' };

var customColorLabels = JSON.parse(localStorage.getItem(LS_LABELS_KEY)) || {

'#5dade2': 'Azul claro (Krav Maga)', '#f9e79f': 'Amarelo claro (GDF)', '#f5b041': 'Laranja 
       (Pessoal)',

'#1abc9c': 'Verde-�gua', '#8e44ad': 'Lil�s', '#1f3a93': 'Azul escuro', '#2c3e50': 'Grafite', 
       '#48c9b0': 'Turquesa'

};

function saveCustomLabels() { localStorage.setItem(LS_LABELS_KEY, 
       JSON.stringify(customColorLabels)); }

var EXTRA_COLORS = [];

function buildFullPalette() {

EXTRA_COLORS = [

{ id: 'krav', name: customColorLabels['#5dade2'] || 'Azul claro (Krav Maga)', hex: 
       '#5dade2' },

{ id: 'gdf', name: customColorLabels['#f9e79f'] || 'Amarelo claro (GDF)', hex: '#f9e79f' },

{ id: 'pessoal', name: customColorLabels['#f5b041'] || 'Laranja (Pessoal)', hex: '#f5b041' 
       },

{ id: 'teal', name: customColorLabels['#1abc9c'] || 'Verde-�gua', hex: '#1abc9c' },

{ id: 'lilas', name: customColorLabels['#8e44ad'] || 'Lil�s', hex: '#8e44ad' },

{ id: 'navy', name: customColorLabels['#1f3a93'] || 'Azul escuro', hex: '#1f3a93' },

{ id: 'grafite', name: customColorLabels['#2c3e50'] || 'Grafite', hex: '#2c3e50' },

{ id: 'turquesa', name: customColorLabels['#48c9b0'] || 'Turquesa', hex: '#48c9b0' }

];

return [

{ id: 'q1', name: 'Verde (Fa�a agora)', hex: '#2e7d32', noEdit: true },

{ id: 'q2', name: 'Azul (Agende)', hex: '#1976d2', noEdit: true },

{ id: 'q3', name: '�mbar (Delegue)', hex: '#ffb300', noEdit: true },

{ id: 'q4', name: 'Vermelho (Elimine)', hex: '#c62828', noEdit: true }

].concat(EXTRA_COLORS);

}

function routeByColor(card, hex) { if (!hex || !matrixEl) return; var map = {}; 
       map[MATRIX_COLORS.Q1] = 'Q1'; map[MATRIX_COLORS.Q2] = 'Q2'; map[MATRIX_COLORS.Q3] = 'Q3'; map[MATRIX_COLORS.Q4] 
       = 'Q4'; var quad = map[(hex || '').toLowerCase()]; if (!quad) return; var dest = 
       matrixEl.querySelector('.list[data-quad="' + quad + '"] .cards'); if (dest) { dest.appendChild(card); 
       card.dataset.when = ''; updateSlotsHasItems(); } }



function showModal(title, builder, onOk) {

var wrap = el('div', 'modal-wrap'); var box = el('div', 'modal');

var h = el('h3'); h.textContent = title; box.appendChild(h);

var body = builder(); box.appendChild(body);

var row = el('div', 'row');

var cancel = el('button', 'cancel'); cancel.textContent = 'Cancelar';

var ok = el('button', 'ok'); ok.textContent = 'OK';

row.appendChild(cancel); row.appendChild(ok); box.appendChild(row);

wrap.appendChild(box); document.body.appendChild(wrap);

const modalKeyListener = function (e) {

if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON' && 
       !document.activeElement.closest('.import-options')) { e.preventDefault(); ok.click(); }

else if (e.key === 'Escape') { e.preventDefault(); cancel.click(); }

};

wrap.setAttribute('tabindex', '-1'); wrap.focus(); wrap.addEventListener('keydown', 
       modalKeyListener);

cancel.onclick = function () { wrap.removeEventListener('keydown', modalKeyListener); 
       document.body.removeChild(wrap); };

ok.onclick = function () { wrap.removeEventListener('keydown', modalKeyListener); onOk(body, 
       wrap); if (wrap.parentNode === document.body) document.body.removeChild(wrap); persist(); };

var firstInput = body.querySelector('input'); if (firstInput) firstInput.focus();

return { wrap: wrap, okButton: ok, cancelButton: cancel, body: body };

}



function showConfirm(message, onYes) { showModal('Confirma��o', function () { var d = el('div'); 
       d.textContent = message; return d; }, function (body, wrap) { if (typeof onYes === 'function') onYes(); }); }



function openColorDialog(cards) {

if (!cards.length) return;

var modalElements = showModal('Cor da Etiqueta', function () {

var wrap = el('div');

wrap.style.display = 'flex';

wrap.style.flexDirection = 'column';

wrap.style.gap = '12px';

wrap.style.minWidth = '320px';



// 1. Grid de Etiquetas Predefinidas (Eisenhower)

var sectionPre = el('div');

var headerPre = el('strong');

headerPre.style.fontSize = '12px';

headerPre.style.color = '#9fb3d2';

headerPre.style.display = 'block';

headerPre.style.marginBottom = '6px';

headerPre.textContent = 'Matriz de Eisenhower';

sectionPre.appendChild(headerPre);



var gridPre = el('div');

gridPre.style.display = 'grid';

gridPre.style.gridTemplateColumns = 'repeat(2, 1fr)';

gridPre.style.gap = '8px';



const eisenhowerList = [

{ name: 'Fa�a (Verde)', hex: '#2e7d32' },

{ name: 'Agende (Azul)', hex: '#1976d2' },

{ name: 'Delegue (Amarelo)', hex: '#ffb300' },

{ name: 'Elimine (Vermelho)', hex: '#c62828' }

];



eisenhowerList.forEach(p => {

var b = el('button');

b.type = 'button';

b.style.border = '1px solid rgba(255, 255, 255, 0.15)';

b.style.borderRadius = '8px';

b.style.padding = '10px';

b.style.cursor = 'pointer';

b.style.background = p.hex;

b.style.color = '#fff';

b.style.fontWeight = 'bold';

b.textContent = p.name;

b.onclick = function () {

wrap._chosen = p.hex;

modalElements.okButton.click();

};

if (cards[0].dataset.labelColor === p.hex) {

b.style.outline = '2px solid #fff';

}

gridPre.appendChild(b);

});

sectionPre.appendChild(gridPre);

wrap.appendChild(sectionPre);



// 2. Outras Etiquetas

var sectionCustom = el('div');

var headerCustom = el('strong');

headerCustom.style.fontSize = '12px';

headerCustom.style.color = '#9fb3d2';

headerCustom.style.display = 'block';

headerCustom.style.marginBottom = '6px';

headerCustom.textContent = 'Outras Etiquetas';

sectionCustom.appendChild(headerCustom);



var gridCustom = el('div');

gridCustom.className = 'custom-labels-grid';

gridCustom.style.display = 'grid';

gridCustom.style.gridTemplateColumns = 'repeat(2, 1fr)';

gridCustom.style.gap = '8px';



function renderCustomLabels() {

gridCustom.innerHTML = '';

// Sem etiqueta option

var bNone = el('button');

bNone.type = 'button';

bNone.style.border = '1px solid rgba(255, 255, 255, 0.15)';

bNone.style.borderRadius = '8px';

bNone.style.padding = '10px';

bNone.style.cursor = 'pointer';

bNone.style.background = 'var(--bg)';

bNone.style.color = '#fff';

bNone.textContent = 'Sem Etiqueta';

bNone.onclick = function () {

wrap._chosen = '';

modalElements.okButton.click();

};

if (!cards[0].dataset.labelColor) {

bNone.style.outline = '2px solid #fff';

}

gridCustom.appendChild(bNone);



Object.keys(customColorLabels).forEach(hex => {

var b = el('button');

b.type = 'button';

b.style.border = '1px solid rgba(255, 255, 255, 0.15)';

b.style.borderRadius = '8px';

b.style.padding = '10px';

b.style.cursor = 'pointer';

b.style.background = hex;

b.style.color = '#fff';

b.style.fontWeight = 'bold';

b.textContent = customColorLabels[hex] || hex;

b.onclick = function () {

wrap._chosen = hex;

modalElements.okButton.click();

};

if (cards[0].dataset.labelColor === hex) {

b.style.outline = '2px solid #fff';

}

gridCustom.appendChild(b);

});

}

renderCustomLabels();

sectionCustom.appendChild(gridCustom);

wrap.appendChild(sectionCustom);



// 3. Adicionar/Gerir Nova Etiqueta (com Seletor de Cores RGB)

var addArea = el('div');

addArea.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';

addArea.style.paddingTop = '10px';

addArea.style.display = 'flex';

addArea.style.flexDirection = 'column';

addArea.style.gap = '8px';



var headerNew = el('strong');

headerNew.style.fontSize = '12px';

headerNew.style.color = '#9fb3d2';

headerNew.style.display = 'block';

headerNew.textContent = 'Criar Nova Etiqueta';

addArea.appendChild(headerNew);



var row = el('div');

row.style.display = 'flex';

row.style.gap = '8px';

row.style.alignItems = 'center';



var colorPicker = el('input');

colorPicker.type = 'color';

colorPicker.id = 'newLabelColorPicker';

colorPicker.name = 'newLabelColorPicker';

colorPicker.value = '#9f9f9f';

colorPicker.style.border = 'none';

colorPicker.style.background = 'transparent';

colorPicker.style.width = '38px';

colorPicker.style.height = '38px';

colorPicker.style.cursor = 'pointer';

var labelInput = el('input');

labelInput.type = 'text';

labelInput.id = 'newLabelInput';

labelInput.name = 'newLabelInput';

labelInput.placeholder = 'Nome da Etiqueta';

labelInput.style.flex = '1';

labelInput.style.padding = '8px';

labelInput.style.background = 'var(--bg)';

labelInput.style.border = '1px solid rgba(255, 255, 255, 0.15)';

labelInput.style.borderRadius = '8px';

labelInput.style.color = '#fff';



var addBtn = el('button');

addBtn.type = 'button';

addBtn.textContent = 'Adicionar';

addBtn.style.padding = '8px 12px';

addBtn.style.background = 'var(--brand)';

addBtn.style.border = 'none';

addBtn.style.borderRadius = '8px';

addBtn.style.color = '#fff';

addBtn.style.cursor = 'pointer';



addBtn.onclick = function() {

const name = labelInput.value.trim();

const hex = colorPicker.value;

if (name) {

customColorLabels[hex] = name;

saveCustomLabels();

labelInput.value = '';

renderCustomLabels();

} else {

alert('Por favor, introduza um nome para a etiqueta.');

}

};



row.appendChild(colorPicker);

row.appendChild(labelInput);

row.appendChild(addBtn);

addArea.appendChild(row);

wrap.appendChild(addArea);

// Area de gest�o (excluir etiquetas)

var manageArea = el('div');

manageArea.style.display = 'none';

manageArea.style.flexDirection = 'column';

manageArea.style.gap = '6px';

manageArea.style.maxHeight = '150px';

manageArea.style.overflowY = 'auto';



function renderManageArea() {

manageArea.innerHTML = '';

Object.keys(customColorLabels).forEach(hex => {

var mRow = el('div');

mRow.style.display = 'flex';

mRow.style.justifyContent = 'space-between';

mRow.style.alignItems = 'center';

mRow.style.padding = '4px';

mRow.style.borderBottom = '1px solid #1c273a';



var labelSpan = el('span');

labelSpan.textContent = customColorLabels[hex] + ` (${hex})`;

labelSpan.style.color = hex;

labelSpan.style.fontWeight = 'bold';



var delBtn = el('button');

delBtn.type = 'button';

delBtn.textContent = '???';

delBtn.style.background = 'transparent';

delBtn.style.border = 'none';

delBtn.style.cursor = 'pointer';

delBtn.onclick = function() {

delete customColorLabels[hex];

saveCustomLabels();

renderCustomLabels();

renderManageArea();

};



mRow.appendChild(labelSpan);

mRow.appendChild(delBtn);

manageArea.appendChild(mRow);

});

}

renderManageArea();

wrap.appendChild(manageArea);



wrap._toggleManage = function(isManaging) {

if (isManaging) {

sectionPre.style.display = 'none';

sectionCustom.style.display = 'none';

addArea.style.display = 'none';

manageArea.style.display = 'flex';

renderManageArea();

} else {

sectionPre.style.display = 'block';

sectionCustom.style.display = 'block';

addArea.style.display = 'flex';

manageArea.style.display = 'none';

}

};

return wrap;

}, function (body, wrap) {

if (body._isManaging) {

return; // Se estiver no modo gest�o, o OK apenas fecha o modal ap�s salvar

}

var v = (body._chosen === undefined) ? (cards[0].dataset.labelColor || '') : body._chosen;

cards.forEach(function (c) { 

c.dataset.labelColor = v || ''; 

paintCard(c); 

});

persist();

});



const manageBtn = el('button'); 

manageBtn.textContent = 'Gerir Etiquetas ???'; 

manageBtn.className = 'manage-labels-btn';



let isManaging = false;

manageBtn.onclick = function (e) {

e.preventDefault(); 

isManaging = !isManaging;

modalElements.body._isManaging = isManaging;

modalElements.body._toggleManage(isManaging);

manageBtn.textContent = isManaging ? 'Voltar � Sele��o' : 'Gerir Etiquetas ???';

modalElements.okButton.textContent = isManaging ? 'Conclu�do' : 'OK';

};

modalElements.wrap.querySelector('.row').prepend(manageBtn);

}



function openDateDialog(cards) { if (!cards.length) return; showModal('Editar data', function () { 
       var r = el('div'); var i = el('input'); i.type = 'date'; i.id = 'editDateInput'; i.name = 'editDateInput'; if 
       (cards[0].dataset.due) i.value = cards[0].dataset.due; r.appendChild(i); return r; }, function (r, wrap) { var 
       v = r.querySelector('input').value; cards.forEach(function (c) { c.dataset.due = v || ''; paintCard(c); }); 
       applyFilters(); }); }



function generateRecurrences(parentCard) {

const parentId = parentCard.dataset.cardId;

if (!parentId) return;



const parentDateStr = parentCard.dataset.when.split('T')[0];

const parentTimeSuffix = parentCard.dataset.when.includes('T') ? 
       parentCard.dataset.when.split('T')[1] : '';

// Delete all future child cards belonging to this parent

allCards = allCards.filter(c => {

if (c.dataset.recurrenceParent === parentId) {

c.remove();

return false;

}

return true;

});



const recurrenceVal = parentCard.dataset.recurrence;

if (!recurrenceVal || recurrenceVal === 'none') {

return;

}



let rule = null;

if (recurrenceVal.startsWith('{')) {

try {

rule = JSON.parse(recurrenceVal);

} catch (e) {

console.error("Error parsing recurrence JSON", e);

}

} else {

// Fallback to simple predefined recurrence configurations

if (recurrenceVal === 'daily') {

rule = { freq: 'daily', interval: 1, endType: 'never' };

} else if (recurrenceVal === 'weekdays') {

rule = { freq: 'weekly', interval: 1, days: [1, 2, 3, 4, 5], endType: 'never' };

} else if (recurrenceVal === 'weekly') {

const sDate = new Date(parentDateStr + 'T12:00:00');

rule = { freq: 'weekly', interval: 1, days: [sDate.getDay()], endType: 'never' };

} else if (recurrenceVal === 'monthly') {

rule = { freq: 'monthly', interval: 1, endType: 'never' };

}

}



if (!rule) return;



const startDate = new Date(parentDateStr + 'T12:00:00');

let currentDate = new Date(startDate);

let count = 0;



let maxInstances = 365; // safety limit

let instancesToGenerate = 30; // default for daily/weekdays

if (rule.freq === 'weekly') instancesToGenerate = 12;

if (rule.freq === 'monthly') instancesToGenerate = 12;

if (rule.freq === 'yearly') instancesToGenerate = 5;



if (rule.endType === 'count') {

instancesToGenerate = Math.min(rule.endCount || 1, maxInstances);

}

const endLimitDate = (rule.endType === 'date' && rule.endDate) ? new Date(rule.endDate + 
       'T23:59:59') : null;

while (count < instancesToGenerate) {

if (rule.freq === 'daily') {

currentDate.setDate(currentDate.getDate() + rule.interval);

} else if (rule.freq === 'weekly') {

let found = false;

for (let attempt = 0; attempt < 365; attempt++) {

currentDate.setDate(currentDate.getDate() + 1);



const startTemp = new Date(startDate.getFullYear(), startDate.getMonth(), 
       startDate.getDate(), 12, 0, 0);

const currentTemp = new Date(currentDate.getFullYear(), currentDate.getMonth(), 
       currentDate.getDate(), 12, 0, 0);



const startSun = new Date(startTemp);

startSun.setDate(startSun.getDate() - startSun.getDay());



const currentSun = new Date(currentTemp);

currentSun.setDate(currentSun.getDate() - currentSun.getDay());



const msDiff = currentSun.getTime() - startSun.getTime();

const weeksDiff = Math.round(msDiff / (7 * 24 * 60 * 60 * 1000));



if (weeksDiff % rule.interval === 0) {

const dayOfWeek = currentDate.getDay();

if (!rule.days || rule.days.length === 0 || rule.days.includes(dayOfWeek)) {

found = true;

break;

}

}

}

if (!found) break;

} else if (rule.freq === 'monthly') {

currentDate.setMonth(currentDate.getMonth() + rule.interval);

} else if (rule.freq === 'yearly') {

currentDate.setFullYear(currentDate.getFullYear() + rule.interval);

} else {

break;

}



if (endLimitDate && currentDate > endLimitDate) {

break;

}



const dateStr = currentDate.toISOString().slice(0, 10);

const whenVal = dateStr + 'T' + parentTimeSuffix;



const childData = {

text: (parentCard.querySelector('.text') ? 
       parentCard.querySelector('.text').textContent : '').trim(),

color: parentCard.dataset.color || '',

labelColor: parentCard.dataset.labelColor || '',

due: parentCard.dataset.due || '',

when: whenVal,

timerTotal: parentCard.dataset.timerTotal || '',

timerLeft: parentCard.dataset.timerLeft || '',

timerState: 'stopped',

timerEnd: '',

completed: 'false',

history: JSON.stringify([{ action: 'Criado por recorr�ncia personalizada', time: 
       Date.now() }]),

boardId: parentCard.dataset.boardId || '',

description: parentCard.dataset.description || '',

duration: parentCard.dataset.duration || '',

recurrence: 'none',

cardId: 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),

recurrenceParent: parentId,

alertEnabled: parentCard.dataset.alertEnabled || 'false',

alertValue: parentCard.dataset.alertValue || '15',

alertUnit: parentCard.dataset.alertUnit || 'minutos',

alertFired: 'false'

};



createCard(childData);

count++;

}

}

function openCustomRecurrenceDialog(currentRule, onSave, onCancel) {

let recRule = { freq: 'weekly', interval: 1, days: [], endType: 'never', endDate: '', endCount: 
       1 };

if (currentRule) {

if (typeof currentRule === 'string' && currentRule.startsWith('{')) {

try { recRule = JSON.parse(currentRule); } catch (e) {}

} else if (typeof currentRule === 'object') {

recRule = { ...recRule, ...currentRule };

}

}



const modalElements = showModal('Recorr�ncia', function () {

const r = el('div');

r.style.display = 'flex';

r.style.flexDirection = 'column';

r.style.gap = '14px';

r.style.minWidth = '320px';

r.style.maxWidth = '400px';

r.style.color = '#fff';



// 1. Repete a cada Row

const intervalRow = el('div');

intervalRow.style.display = 'flex';

intervalRow.style.alignItems = 'center';

intervalRow.style.gap = '8px';

intervalRow.style.fontSize = '14px';

intervalRow.innerHTML = `

<span>Repete a cada</span>

<input type="number" id="recInterval" name="recInterval" value="${recRule.interval || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 6px 8px; border-radius: 6px; font-size: 14px;" />

<select id="recFreq" name="recFreq" style="border: 1px solid rgba(255, 255, 255, 0.15); 
       background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 14px; cursor: pointer;">

<option value="daily" ${recRule.freq === 'daily' ? 'selected' : ''}>dia(s)</option>

<option value="weekly" ${recRule.freq === 'weekly' ? 'selected' : 
       ''}>semana(s)</option>

<option value="monthly" ${recRule.freq === 'monthly' ? 'selected' : 
       ''}>m�s(es)</option>

<option value="yearly" ${recRule.freq === 'yearly' ? 'selected' : 
       ''}>ano(s)</option>

</select>

`;

const recIntervalInp = intervalRow.querySelector('#recInterval');

const recFreqSelect = intervalRow.querySelector('#recFreq');

r.appendChild(intervalRow);



// 2. Repetir �Ã s/aos Row (Weekdays selector)

const weekdaysRow = el('div');

weekdaysRow.style.display = recRule.freq === 'weekly' ? 'flex' : 'none';

weekdaysRow.style.flexDirection = 'column';

weekdaysRow.style.gap = '8px';

weekdaysRow.innerHTML = `<span style="font-size: 13px; color: #9fb3d2;">Repetir 
       �Ã s/aos</span>`;



const daysGrid = el('div');

daysGrid.style.display = 'flex';

daysGrid.style.gap = '8px';

daysGrid.style.justifyContent = 'space-between';



const weekdayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const weekdayTitles = ['Domingo', 'Segunda', 'Ter�a', 'Quarta', 'Quinta', 'Sexta', 
       'S�bado'];

const chosenDays = new Set(recRule.days || []);



weekdayNames.forEach((name, idx) => {

const dayBtn = el('button');

dayBtn.type = 'button';

dayBtn.className = 'weekday-btn';

if (chosenDays.has(idx)) {

dayBtn.classList.add('selected');

}

dayBtn.title = weekdayTitles[idx];

dayBtn.textContent = name;



dayBtn.onclick = function() {

if (chosenDays.has(idx)) {

chosenDays.delete(idx);

dayBtn.classList.remove('selected');

} else {

chosenDays.add(idx);

dayBtn.classList.add('selected');

}

};

daysGrid.appendChild(dayBtn);

});

weekdaysRow.appendChild(daysGrid);

r.appendChild(weekdaysRow);



recFreqSelect.addEventListener('change', function() {

if (recFreqSelect.value === 'weekly') {

weekdaysRow.style.display = 'flex';

} else {

weekdaysRow.style.display = 'none';

}

});



// 3. Termina Section

const endSection = el('div');

endSection.style.display = 'flex';

endSection.style.flexDirection = 'column';

endSection.style.gap = '8px';

endSection.style.marginTop = '6px';

endSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';

endSection.style.paddingTop = '10px';



const endTitle = el('span');

endTitle.style.fontSize = '13px';

endTitle.style.color = '#9fb3d2';

endTitle.style.fontWeight = '500';

endTitle.textContent = 'Termina';

endSection.appendChild(endTitle);



// Radio 1: Nunca

const neverLabel = el('label');

neverLabel.style.display = 'flex';

neverLabel.style.alignItems = 'center';

neverLabel.style.gap = '6px';

neverLabel.style.fontSize = '14px';

neverLabel.style.cursor = 'pointer';

neverLabel.innerHTML = `<input type="radio" id="recEndNever" name="recEndType" 
       value="never" ${recRule.endType === 'never' ? 'checked' : ''} /> Nunca`;

endSection.appendChild(neverLabel);

// Radio 2: Em

const dateLabel = el('label');

dateLabel.style.display = 'flex';

dateLabel.style.alignItems = 'center';

dateLabel.style.gap = '6px';

dateLabel.style.fontSize = '14px';

dateLabel.style.cursor = 'pointer';

dateLabel.innerHTML = `

<input type="radio" id="recEndOnDate" name="recEndType" value="date" ${recRule.endType 
       === 'date' ? 'checked' : ''} /> Em

<input type="date" id="recEndDate" name="recEndDate" value="${recRule.endDate || new 
       Date().toISOString().slice(0, 10)}" style="border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); 
       color: #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />

`;

endSection.appendChild(dateLabel);



// Radio 3: Ap�s

const countLabel = el('label');

countLabel.style.display = 'flex';

countLabel.style.alignItems = 'center';

countLabel.style.gap = '6px';

countLabel.style.fontSize = '14px';

countLabel.style.cursor = 'pointer';

countLabel.innerHTML = `

<input type="radio" id="recEndAfterCount" name="recEndType" value="count" 
       ${recRule.endType === 'count' ? 'checked' : ''} /> Ap�s

<input type="number" id="recEndCount" name="recEndCount" value="${recRule.endCount || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />

<span>ocorr�ncias</span>

`;

endSection.appendChild(countLabel);



r.appendChild(endSection);



return r;

}, function (body, wrap) {

const freq = body.querySelector('#recFreq').value;

const interval = parseInt(body.querySelector('#recInterval').value, 10) || 1;

const days = freq === 'weekly' ? 
       Array.from(body.querySelectorAll('.weekday-btn.selected')).map(btn => {

const idx = ['Domingo', 'Segunda', 'Ter�a', 'Quarta', 'Quinta', 'Sexta', 
       'S�bado'].indexOf(btn.title);

return idx !== -1 ? idx : 0;

}) : [];



const endTypeRadio = body.querySelector('input[name="recEndType"]:checked');

const endType = endTypeRadio ? endTypeRadio.value : 'never';

const endDate = body.querySelector('#recEndDate').value;

const endCount = parseInt(body.querySelector('#recEndCount').value, 10) || 1;



const newRule = {

freq: freq,

interval: interval,

days: days,

endType: endType,

endDate: endDate,

endCount: endCount

};

onSave(newRule);

});



modalElements.okButton.textContent = 'Conclu�do';

modalElements.cancelButton.onclick = function () {

document.body.removeChild(modalElements.wrap);

if (onCancel) onCancel();

};

}



function openAlertDialog(cardOrData, onSave, onCancel) {

const predefinedOptions = [

{ text: 'No hor�rio do evento', val: 0, unit: 'minutos' },

{ text: '5 minutos antes', val: 5, unit: 'minutos' },

{ text: '15 minutos antes', val: 15, unit: 'minutos' },

{ text: '30 minutos antes', val: 30, unit: 'minutos' },

{ text: '1 hora antes', val: 1, unit: 'horas' },

{ text: '2 horas antes', val: 2, unit: 'horas' },

{ text: '1 dia antes', val: 1, unit: 'dias' },

{ text: 'Personalizado...', val: -1, unit: 'custom' }

];

const dataset = cardOrData.dataset ? cardOrData.dataset : cardOrData;

const isEnabled = dataset.alertEnabled === 'true';

const currentVal = parseInt(dataset.alertValue || '15', 10);

const currentUnit = dataset.alertUnit || 'minutos';



const modalElements = showModal('Alerta', function () {

const r = el('div');

r.style.display = 'flex';

r.style.flexDirection = 'column';

r.style.gap = '12px';

r.style.minWidth = '320px';

r.style.maxWidth = '400px';

r.style.color = '#fff';



// 1. Toggle switch row

const toggleRow = el('div', 'premium-switch-container');

toggleRow.innerHTML = `

<span class="premium-switch-label">Ativado</span>

<label class="premium-switch">

<input type="checkbox" id="alertSubEnabled" name="alertSubEnabled" ${isEnabled ? 
       'checked' : ''}>

<span class="premium-slider"></span>

</label>

`;

const enabledCheckbox = toggleRow.querySelector('#alertSubEnabled');

r.appendChild(toggleRow);



// Options Container

const optionsContainer = el('div');

optionsContainer.style.display = isEnabled ? 'flex' : 'none';

optionsContainer.style.flexDirection = 'column';

optionsContainer.style.gap = '6px';

r.appendChild(optionsContainer);



// Toggling options container display

enabledCheckbox.addEventListener('change', function() {

if (enabledCheckbox.checked) {

optionsContainer.style.display = 'flex';

} else {

optionsContainer.style.display = 'none';

}

});



// Predefined options list

const predefinedOptions = [

{ text: 'No hor�rio do evento', val: 0, unit: 'minutos' },

{ text: '5 minutos antes', val: 5, unit: 'minutos' },

{ text: '15 minutos antes', val: 15, unit: 'minutos' },

{ text: '30 minutos antes', val: 30, unit: 'minutos' },

{ text: '1 hora antes', val: 1, unit: 'horas' },

{ text: '2 horas antes', val: 2, unit: 'horas' },

{ text: '1 dia antes', val: 1, unit: 'dias' },

{ text: 'Personalizado...', val: -1, unit: 'custom' }

];



let matchedIdx = -1;

predefinedOptions.forEach((opt, idx) => {

if (opt.val !== -1 && currentVal === opt.val && currentUnit === opt.unit) {

matchedIdx = idx;

}

});

if (matchedIdx === -1 && isEnabled) {

matchedIdx = predefinedOptions.length - 1; 

} else if (!isEnabled) {

matchedIdx = 2; // Default to 15m

}

// Custom fields row

const customFields = el('div');

customFields.id = 'alertCustomFieldsSub';

customFields.style.display = matchedIdx === predefinedOptions.length - 1 ? 'flex' : 'none';

customFields.style.flexDirection = 'column';

customFields.style.gap = '6px';

customFields.style.padding = '10px';

customFields.style.background = '#0a1424';

customFields.style.border = '1px solid rgba(255, 255, 255, 0.15)';

customFields.style.borderRadius = '8px';

customFields.style.marginTop = '4px';

customFields.innerHTML = `

<span style="font-size: 12px; color: #9fb3d2;">Tempo personalizado:</span>

<div style="display: flex; gap: 8px; align-items: center;">

<input type="number" id="alertCustomValSub" name="alertCustomValSub" min="1" 
       value="${matchedIdx === predefinedOptions.length - 1 ? currentVal : 15}" style="width: 70px; border: 1px solid 
       rgba(255, 255, 255, 0.15); background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 
       14px;" />

<select id="alertCustomUnitSub" name="alertCustomUnitSub" style="flex:1; border: 
       1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; 
       font-size: 14px; cursor: pointer;">

<option value="minutos" ${currentUnit === 'minutos' ? 'selected' : ''}>minutos 
       antes</option>

<option value="horas" ${currentUnit === 'horas' ? 'selected' : ''}>horas 
       antes</option>

<option value="dias" ${currentUnit === 'dias' ? 'selected' : ''}>dias 
       antes</option>

<option value="semanas" ${currentUnit === 'semanas' ? 'selected' : ''}>semanas 
       antes</option>

</select>

</div>

`;



// Render list of choices

predefinedOptions.forEach((opt, idx) => {

const optDiv = el('div', 'alert-option-item');

if (idx === matchedIdx) {

optDiv.classList.add('selected');

}

optDiv.innerHTML = `

<span>${opt.text}</span>

<span class="check-mark">?</span>

`;

optDiv.onclick = function () {

r.querySelectorAll('.alert-option-item').forEach(item => 
       item.classList.remove('selected'));

optDiv.classList.add('selected');

if (opt.unit === 'custom') {

customFields.style.display = 'flex';

} else {

customFields.style.display = 'none';

}

};

optionsContainer.appendChild(optDiv);

});



optionsContainer.appendChild(customFields);



// 2. Tipo de alerta section

const alertTypeSection = el('div');

alertTypeSection.style.marginTop = '10px';

alertTypeSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';

alertTypeSection.style.paddingTop = '10px';

alertTypeSection.innerHTML = `

<span style="font-size: 13px; color: #9fb3d2; font-weight: 500; display: block; 
       margin-bottom: 6px;">Tipo de alerta</span>

<div style="display: flex; align-items: center; justify-content: space-between; 
       padding: 10px 12px; background: var(--bg); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px;">

<span style="font-size: 14px;">Notifica��o (Pop-up e Som)</span>

<span style="color: #1976d2; font-weight: bold;">?</span>

</div>

`;

optionsContainer.appendChild(alertTypeSection);



return r;

}, function (body, wrap) {

const enabledCheckboxSub = body.querySelector('#alertSubEnabled');

const enabled = enabledCheckboxSub ? enabledCheckboxSub.checked : false;

let val = 15;

let unit = 'minutos';



if (enabled) {

const selectedOpt = body.querySelector('.alert-option-item.selected');

const selectedIdx = 
       Array.from(body.querySelectorAll('.alert-option-item')).indexOf(selectedOpt);

const opt = predefinedOptions[selectedIdx];



if (opt && opt.unit !== 'custom') {

val = opt.val;

unit = opt.unit;

} else {

val = parseInt(body.querySelector('#alertCustomValSub').value, 10) || 15;

unit = body.querySelector('#alertCustomUnitSub').value;

}

}



onSave({

alertEnabled: enabled,

alertValue: val,

alertUnit: unit

});

});



modalElements.okButton.textContent = 'Conclu�do';

modalElements.cancelButton.onclick = function () {

document.body.removeChild(modalElements.wrap);

if (onCancel) onCancel();

};

}



function openAgendaDialog(card) {

if (!card) return;



if (!card.dataset.cardId) {

card.dataset.cardId = 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

}



const whenVal = card.dataset.when || '';

let cardDate = '';

let cardTime = '09:00';

let isGoal = false;

let isAllDay = false;



if (whenVal.includes('T')) {

const parts = whenVal.split('T');

cardDate = parts[0];

const timePart = parts[1] || '';

if (timePart === 'GOAL') {

isGoal = true;

isAllDay = true;

} else if (timePart === '') {

isAllDay = true;

} else {

cardTime = timePart;

}

}

if (!cardDate) {

cardDate = new Date().toISOString().slice(0, 10);

}



const currentRecurrence = card.dataset.recurrence || 'none';

const currentDuration = card.dataset.duration || '60';

const currentDescription = card.dataset.description || '';



const currentAlertEnabled = card.dataset.alertEnabled === 'true';

const currentAlertValue = card.dataset.alertValue || '15';

const currentAlertUnit = card.dataset.alertUnit || 'minutos';



let isCustomRecurrence = currentRecurrence.startsWith('{');



let tempAlertEnabled = currentAlertEnabled;

let tempAlertValue = parseInt(currentAlertValue, 10);

if (isNaN(tempAlertValue)) tempAlertValue = 15;

let tempAlertUnit = currentAlertUnit;

let tempRecurrenceValue = currentRecurrence;



var modalElements = showModal('Agendar / Recorr�ncia', function () {

var r = el('div');

r.style.display = 'flex';

r.style.flexDirection = 'column';

r.style.gap = '14px';

r.style.minWidth = '360px';

r.style.maxWidth = '460px';

r.style.color = '#fff';

r.style.fontFamily = 'inherit';



// 1. Title Input

const titleRow = el('div');

titleRow.innerHTML = `<input type="text" id="agendaTitle" name="agendaTitle" 
       placeholder="Adicionar t�tulo" value="${(card.querySelector('.text') ? card.querySelector('.text').textContent 
       : '').replace(/^\?\?\s*/, '').trim()}" style="width: 100%; border: none; border-bottom: 2px solid rgba(255, 
       255, 255, 0.15); background: transparent; color: #fff; font-size: 18px; font-weight: 500; padding: 6px 0; 
       outline: none; transition: border-color 0.2s;" />`;

const titleInput = titleRow.querySelector('#agendaTitle');

titleInput.addEventListener('focus', () => titleInput.style.borderBottomColor = 
       'var(--brand)');

titleInput.addEventListener('blur', () => titleInput.style.borderBottomColor = 'rgba(255, 
       255, 255, 0.15)');

r.appendChild(titleRow);



// 2. Date & Time Row

const dateTimeRow = el('div');

dateTimeRow.style.display = 'flex';

dateTimeRow.style.gap = '10px';

dateTimeRow.style.alignItems = 'center';

dateTimeRow.style.flexWrap = 'wrap';



const datePicker = el('input');

datePicker.type = 'date';

datePicker.id = 'agendaDateVal';

datePicker.name = 'agendaDateVal';

datePicker.value = cardDate;

datePicker.style.border = '1px solid rgba(255, 255, 255, 0.15)';

datePicker.style.background = 'var(--bg)';

datePicker.style.color = '#fff';

datePicker.style.padding = '6px 8px';

datePicker.style.borderRadius = '6px';

datePicker.style.fontSize = '14px';

datePicker.style.cursor = 'pointer';



const timePicker = el('input');

timePicker.type = 'text';

timePicker.id = 'agendaTimeVal';

timePicker.name = 'agendaTimeVal';

timePicker.value = cardTime;

timePicker.readOnly = true;

timePicker.style.border = '1px solid rgba(255, 255, 255, 0.15)';

timePicker.style.background = 'var(--bg)';

timePicker.style.color = '#fff';

timePicker.style.padding = '6px 8px';

timePicker.style.borderRadius = '6px';

timePicker.style.fontSize = '14px';

timePicker.style.cursor = 'pointer';

timePicker.style.textAlign = 'center';

timePicker.onclick = function () {

openAnalogTimePicker(timePicker.value, function (selectedTime) {

timePicker.value = selectedTime;

});

};

if (isAllDay) {

timePicker.style.display = 'none';

}



const allDayLabel = el('label');

allDayLabel.style.display = 'flex';

allDayLabel.style.alignItems = 'center';

allDayLabel.style.gap = '4px';

allDayLabel.style.fontSize = '13px';

allDayLabel.style.color = '#9fb3d2';

allDayLabel.style.cursor = 'pointer';

allDayLabel.innerHTML = `<input type="checkbox" id="agendaAllDay" name="agendaAllDay" 
       ${isAllDay ? 'checked' : ''} /> Dia inteiro`;

const allDayCheckbox = allDayLabel.querySelector('#agendaAllDay');



const goalLabel = el('label');

goalLabel.style.display = 'flex';

goalLabel.style.alignItems = 'center';

goalLabel.style.gap = '4px';

goalLabel.style.fontSize = '13px';

goalLabel.style.color = '#9fb3d2';

goalLabel.style.cursor = 'pointer';

goalLabel.innerHTML = `<input type="checkbox" id="agendaGoal" name="agendaGoal" ${isGoal ? 
       'checked' : ''} /> Meta do dia`;

const goalCheckbox = goalLabel.querySelector('#agendaGoal');



allDayCheckbox.addEventListener('change', function () {

if (allDayCheckbox.checked) {

timePicker.style.display = 'none';

durationSelect.style.display = 'none';

durationLabel.style.display = 'none';

} else {

timePicker.style.display = '';

durationSelect.style.display = '';

durationLabel.style.display = '';

goalCheckbox.checked = false;

}

});



goalCheckbox.addEventListener('change', function () {

if (goalCheckbox.checked) {

allDayCheckbox.checked = true;

timePicker.style.display = 'none';

durationSelect.style.display = 'none';

durationLabel.style.display = 'none';

}

});



dateTimeRow.appendChild(datePicker);

dateTimeRow.appendChild(timePicker);

dateTimeRow.appendChild(allDayLabel);

dateTimeRow.appendChild(goalLabel);

r.appendChild(dateTimeRow);



// 3. Duration & Recurrence Row

const durRecRow = el('div');

durRecRow.style.display = 'flex';

durRecRow.style.gap = '10px';

durRecRow.style.alignItems = 'center';

durRecRow.style.flexWrap = 'wrap';



const durationLabel = el('span');

durationLabel.textContent = 'Dura��o:';

durationLabel.style.fontSize = '13px';

durationLabel.style.color = '#9fb3d2';

if (isAllDay) durationLabel.style.display = 'none';



const durationSelect = el('select');

durationSelect.id = 'agendaDuration';

durationSelect.name = 'agendaDuration';

durationSelect.style.border = '1px solid rgba(255, 255, 255, 0.15)';

durationSelect.style.background = 'var(--bg)';

durationSelect.style.color = '#fff';

durationSelect.style.padding = '6px 8px';

durationSelect.style.borderRadius = '6px';

durationSelect.style.fontSize = '14px';

durationSelect.style.cursor = 'pointer';

if (isAllDay) durationSelect.style.display = 'none';



const durations = [

{ val: '15', text: '15 min' },

{ val: '30', text: '30 min' },

{ val: '60', text: '1 hora' },

{ val: '120', text: '2 horas' },

{ val: '180', text: '3 horas' },

{ val: 'custom', text: 'Personalizado...' }

];

durations.forEach(d => {

const opt = el('option');

opt.value = d.val;

opt.textContent = d.text;

durationSelect.appendChild(opt);

});



const customDurationInput = el('input');

customDurationInput.type = 'number';

customDurationInput.id = 'agendaCustomDuration';

customDurationInput.name = 'agendaCustomDuration';

customDurationInput.placeholder = 'Minutos';

customDurationInput.style.border = '1px solid rgba(255, 255, 255, 0.15)';

customDurationInput.style.background = 'var(--bg)';

customDurationInput.style.color = '#fff';

customDurationInput.style.padding = '6px 8px';

customDurationInput.style.borderRadius = '6px';

customDurationInput.style.fontSize = '14px';

customDurationInput.style.width = '80px';

customDurationInput.style.display = 'none';



if (['15', '30', '60', '120', '180'].includes(currentDuration)) {

durationSelect.value = currentDuration;

} else if (currentDuration) {

durationSelect.value = 'custom';

customDurationInput.value = currentDuration;

customDurationInput.style.display = '';

} else {

durationSelect.value = '60';

}



durationSelect.addEventListener('change', function () {

if (durationSelect.value === 'custom') {

customDurationInput.style.display = '';

} else {

customDurationInput.style.display = 'none';

}

});



const recLabel = el('span');

recLabel.textContent = 'Repetir:';

recLabel.style.fontSize = '13px';

recLabel.style.color = '#9fb3d2';



const recurrenceSelect = el('select');

recurrenceSelect.id = 'agendaRecurrence';

recurrenceSelect.name = 'agendaRecurrence';

recurrenceSelect.style.border = '1px solid rgba(255, 255, 255, 0.15)';

recurrenceSelect.style.background = 'var(--bg)';

recurrenceSelect.style.color = '#fff';

recurrenceSelect.style.padding = '6px 8px';

recurrenceSelect.style.borderRadius = '6px';

recurrenceSelect.style.fontSize = '14px';

recurrenceSelect.style.cursor = 'pointer';



const recOptions = [

{ val: 'none', text: 'N�o se repete' },

{ val: 'daily', text: 'Todos os dias' },

{ val: 'weekdays', text: 'Dias da semana (segunda a sexta)' },

{ val: 'weekly', text: 'Semanalmente' },

{ val: 'monthly', text: 'Mensalmente' },

{ val: 'custom', text: 'Personalizado...' }

];

recOptions.forEach(o => {

const opt = el('option');

opt.value = o.val;

opt.textContent = o.text;

recurrenceSelect.appendChild(opt);

});



if (isCustomRecurrence) {

recurrenceSelect.value = 'custom';

} else {

recurrenceSelect.value = currentRecurrence;

}



const recEditBtn = el('button');

recEditBtn.type = 'button';

recEditBtn.textContent = '?? Editar';

recEditBtn.style.border = '1px solid rgba(255, 255, 255, 0.15)';

recEditBtn.style.background = 'var(--bg)';

recEditBtn.style.color = '#fff';

recEditBtn.style.padding = '6px 8px';

recEditBtn.style.borderRadius = '6px';

recEditBtn.style.fontSize = '14px';

recEditBtn.style.cursor = 'pointer';

recEditBtn.style.display = isCustomRecurrence ? 'inline-block' : 'none';



recurrenceSelect.addEventListener('change', function () {

if (recurrenceSelect.value === 'custom') {

openCustomRecurrenceDialog(tempRecurrenceValue.startsWith('{') ? 
       tempRecurrenceValue : null, function(savedRule) {

tempRecurrenceValue = JSON.stringify(savedRule);

recEditBtn.style.display = 'inline-block';

}, function() {

if (tempRecurrenceValue.startsWith('{')) {

recurrenceSelect.value = 'custom';

recEditBtn.style.display = 'inline-block';

} else {

recurrenceSelect.value = tempRecurrenceValue;

recEditBtn.style.display = 'none';

}

});

} else {

tempRecurrenceValue = recurrenceSelect.value;

recEditBtn.style.display = 'none';

}

});



recEditBtn.onclick = function(e) {

e.preventDefault();

openCustomRecurrenceDialog(tempRecurrenceValue.startsWith('{') ? tempRecurrenceValue : 
       null, function(savedRule) {

tempRecurrenceValue = JSON.stringify(savedRule);

});

};



durRecRow.appendChild(durationLabel);

durRecRow.appendChild(durationSelect);

durRecRow.appendChild(customDurationInput);

durRecRow.appendChild(recLabel);

durRecRow.appendChild(recurrenceSelect);

durRecRow.appendChild(recEditBtn);

r.appendChild(durRecRow);



// 4. Alert Row (Modern UX)

const alertRow = el('div');

alertRow.id = 'agendaAlertRow';

alertRow.style.display = 'flex';

alertRow.style.alignItems = 'center';

alertRow.style.justifyContent = 'space-between';

alertRow.style.padding = '10px 12px';

alertRow.style.background = 'var(--bg)';

alertRow.style.border = '1px solid rgba(255, 255, 255, 0.15)';

alertRow.style.borderRadius = '8px';

alertRow.style.cursor = 'pointer';

alertRow.style.marginTop = '6px';

alertRow.style.transition = 'background 0.2s';

alertRow.onmouseover = () => alertRow.style.background = 'color-mix(in srgb, var(--brand) 
       10%, var(--panel))';

alertRow.onmouseout = () => alertRow.style.background = 'var(--bg)';



function updateAlertRowSummary() {

const summaryEl = alertRow.querySelector('#agendaAlertSummary');

if (summaryEl) {

if (tempAlertEnabled) {

if (tempAlertValue === 0) {

summaryEl.textContent = 'No hor�rio do evento';

} else {

summaryEl.textContent = `${tempAlertValue} ${tempAlertUnit} antes`;

}

} else {

summaryEl.textContent = 'Desativado';

}

}

}



alertRow.innerHTML = `

<div style="display: flex; align-items: center; gap: 10px;">

<span style="font-size: 18px;">??</span>

<div style="display: flex; flex-direction: column; text-align: left;">

<span style="font-size: 13px; font-weight: bold; color: #fff;">Alerta / 
       Notifica��o</span>

<span id="agendaAlertSummary" style="font-size: 12px; color: 
       #9fb3d2;">Desativado</span>

</div>

</div>

<span style="font-size: 14px; color: #9fb3d2;">?</span>

`;



alertRow.onclick = function() {

openAlertDialog({

alertEnabled: tempAlertEnabled ? 'true' : 'false',

alertValue: tempAlertValue,

alertUnit: tempAlertUnit

}, function(saved) {

tempAlertEnabled = saved.alertEnabled;

tempAlertValue = saved.alertValue;

tempAlertUnit = saved.alertUnit;

updateAlertRowSummary();

});

};



r.appendChild(alertRow);

setTimeout(updateAlertRowSummary, 0);



// 5. Description Textarea

const descRow = el('div');

descRow.innerHTML = `<textarea id="agendaDescription" name="agendaDescription" 
       placeholder="Adicionar descri��o..." style="width: 100%; min-height: 80px; border: 1px solid rgba(255, 255, 
       255, 0.15); background: var(--bg); color: #fff; border-radius: 6px; padding: 8px; font-size: 14px; resize: 
       vertical; outline: none; font-family: inherit;"></textarea>`;

const descTextarea = descRow.querySelector('#agendaDescription');

descTextarea.value = currentDescription;

descTextarea.addEventListener('focus', () => descTextarea.style.borderColor = 
       'var(--brand)');

descTextarea.addEventListener('blur', () => descTextarea.style.borderColor = 'rgba(255, 
       255, 255, 0.15)');

r.appendChild(descRow);



return r;

}, function (body, wrap) {

const titleVal = body.querySelector('#agendaTitle').value.trim();

const dateVal = body.querySelector('#agendaDateVal').value;

const timeVal = body.querySelector('#agendaTimeVal').value;

const isAllDayChecked = body.querySelector('#agendaAllDay').checked;

const isGoalChecked = body.querySelector('#agendaGoal').checked;

const recVal = body.querySelector('#agendaRecurrence').value;

const descVal = body.querySelector('#agendaDescription').value.trim();



const durSelVal = body.querySelector('#agendaDuration').value;

let durVal = durSelVal;

if (durSelVal === 'custom') {

durVal = body.querySelector('#agendaCustomDuration').value.trim();

}



// Recurrence save string

let recurrenceSaveValue = recVal;

if (recVal === 'custom') {

recurrenceSaveValue = tempRecurrenceValue;

}



const targetCard = card._originalReference || card;

const txtSpan = targetCard.querySelector('.text');

if (txtSpan) {

txtSpan.textContent = (isGoalChecked ? '?? ' : '') + titleVal;

}



targetCard.dataset.description = descVal;

targetCard.dataset.duration = isAllDayChecked ? '' : durVal;

targetCard.dataset.recurrence = recurrenceSaveValue;



targetCard.dataset.alertEnabled = tempAlertEnabled ? 'true' : 'false';

targetCard.dataset.alertValue = tempAlertValue;

targetCard.dataset.alertUnit = tempAlertUnit;

targetCard.dataset.alertFired = 'false'; // Reset fired status on change



if (isGoalChecked) {

targetCard.dataset.when = dateVal + 'TGOAL';

} else if (isAllDayChecked) {

targetCard.dataset.when = dateVal + 'T';

} else {

targetCard.dataset.when = dateVal + 'T' + timeVal;

}



targetCard.dataset.recurrenceParent = '';



paintCard(targetCard);

generateRecurrences(targetCard);

applyFilters();

updateSlotsHasItems();

});

}

function openTimerDialog(cards, onOkCallback) {

if (!cards.length) return;

var modalElements = showModal('Definir Timer (minutos)', function () {

var r = el('div');

var timerVal = Math.round(parseInt(cards[0].dataset.timerTotal || '0', 10) / 60) || '';

r.innerHTML = `<label style="display: block;">Tempo para o timer (em minutos):<input 
       type="number" id="timerInputValue" name="timerInputValue" class="timer-input" placeholder="Ex: 25" 
       value="${timerVal}" style="width:100%; padding:8px; background:var(--bg); border:1px solid rgba(255, 255, 255, 
       0.15); border-radius:8px; color:#fff; margin-top: 4px;"></label>`;

const input = r.querySelector('.timer-input'); if (input) { 
       input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); 
       modalElements.okButton.click(); } }); }

return r;

}, function (r, wrap) {

var timerMins = r.querySelector('.timer-input').value;

cards.forEach(function (c) {

var newTotal = (parseInt(timerMins, 10) || 0) * 60;

c.dataset.timerTotal = newTotal; c.dataset.timerLeft = newTotal; c.dataset.timerState = 
       'stopped';

c.style.animation = ''; c.classList.remove('timer-running', 'timer-finished'); 
       paintCard(c);

});

applyFilters(); updateTotalTimerDisplay(); if (onOkCallback) onOkCallback();

});

modalElements.cancelButton.onclick = function () { 
       modalElements.wrap.removeEventListener('keydown', modalElements.modalKeyListener); 
       document.body.removeChild(modalElements.wrap); persist(); }

}

function openAnalogTimePicker(initialTime, onSelect) {

// Parse initialTime (format "HH:MM")

let parts = (initialTime || "09:00").split(":");

let currentHour = parseInt(parts[0], 10);

let currentMinute = parseInt(parts[1], 10);

if (isNaN(currentHour) || currentHour < 0 || currentHour > 23) currentHour = 9;

if (isNaN(currentMinute) || currentMinute < 0 || currentMinute > 59) currentMinute = 0;



// State

let activeMode = 'hour'; // 'hour' or 'minute'

let inputMode = 'analog'; // 'analog' or 'keyboard'



// Create backdrop

const backdrop = el('div', 'analog-time-picker-backdrop');

const modal = el('div', 'analog-time-picker-modal');



const title = el('div', 'analog-time-picker-title');

title.textContent = 'Selecionar hor�rio';

modal.appendChild(title);



// Digital display

const displayRow = el('div', 'analog-time-picker-display');



const hourInput = el('input');

hourInput.type = 'text';

hourInput.id = 'analog-hour-input';

hourInput.value = to2(currentHour);

hourInput.readOnly = true;

hourInput.maxLength = 2;

hourInput.pattern = '[0-9]*';

hourInput.inputMode = 'numeric';

hourInput.classList.add('active');



const colon = el('span');

colon.textContent = ':';



const minuteInput = el('input');

minuteInput.type = 'text';

minuteInput.id = 'analog-minute-input';

minuteInput.value = to2(currentMinute);

minuteInput.readOnly = true;

minuteInput.maxLength = 2;

minuteInput.pattern = '[0-9]*';

minuteInput.inputMode = 'numeric';



displayRow.appendChild(hourInput);

displayRow.appendChild(colon);

displayRow.appendChild(minuteInput);

modal.appendChild(displayRow);



// Face Container

const faceContainer = el('div', 'analog-time-picker-face-container');

modal.appendChild(faceContainer);



// Keyboard input help message (hidden by default)

const keyboardMsg = el('div', 'analog-time-picker-keyboard-input-msg');

keyboardMsg.textContent = 'Digite o hor�rio desejado nos campos acima.';

keyboardMsg.style.display = 'none';

modal.appendChild(keyboardMsg);



// SVG for needle drawing

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

svg.setAttribute("class", "analog-time-picker-svg");

faceContainer.appendChild(svg);



// Helper to update SVGNeedle

function updateNeedle(value) {

// Clear existing elements in SVG

svg.innerHTML = '';



let R = 92; // Default outer radius

let angleStep = 30; // 360 / 12



if (activeMode === 'hour') {

R = value < 12 ? 92 : 62;

angleStep = 30;

} else {

R = 92;

angleStep = 6; // 360 / 60

}



const angleDeg = (value * angleStep) - 90;

const angleRad = angleDeg * Math.PI / 180;

const centerX = 115;

const centerY = 115;

const targetX = centerX + R * Math.cos(angleRad);

const targetY = centerY + R * Math.sin(angleRad);



// Create line

const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

line.setAttribute("x1", centerX);

line.setAttribute("y1", centerY);

line.setAttribute("x2", targetX);

line.setAttribute("y2", targetY);

line.setAttribute("stroke", "var(--brand)");

line.setAttribute("stroke-width", "2");

svg.appendChild(line);



// Center pivot circle

const pivot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

pivot.setAttribute("cx", centerX);

pivot.setAttribute("cy", centerY);

pivot.setAttribute("r", "4");

pivot.setAttribute("fill", "var(--brand)");

svg.appendChild(pivot);



// End selection circle

const targetCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

targetCircle.setAttribute("cx", targetX);

targetCircle.setAttribute("cy", targetY);

targetCircle.setAttribute("r", "16");

targetCircle.setAttribute("fill", "var(--brand)");

targetCircle.setAttribute("opacity", "0.85");

svg.appendChild(targetCircle);



// Small center dot in target circle

const targetCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");

targetCenter.setAttribute("cx", targetX);

targetCenter.setAttribute("cy", targetY);

targetCenter.setAttribute("r", "3");

targetCenter.setAttribute("fill", "#fff");

svg.appendChild(targetCenter);



// Highlight selected number HTML element

faceContainer.querySelectorAll('.analog-time-picker-number').forEach(numEl => {

const val = parseInt(numEl.dataset.value, 10);

if (val === value) {

numEl.classList.add('selected');

} else {

numEl.classList.remove('selected');

}

});

}



// Render Clock Face Numbers

function renderFace() {

// Remove existing HTML numbers (keep SVG)

faceContainer.querySelectorAll('.analog-time-picker-number').forEach(el => el.remove());



const centerX = 115;

const centerY = 115;



if (activeMode === 'hour') {

// Outer circle (0-11)

for (let h = 0; h < 12; h++) {

const numEl = el('div', 'analog-time-picker-number');

numEl.textContent = h === 0 ? '0' : h.toString();

numEl.dataset.value = h;

const angle = (h * 30 - 90) * Math.PI / 180;

const x = centerX + 92 * Math.cos(angle) - 14;

const y = centerY + 92 * Math.sin(angle) - 14;

numEl.style.left = x + 'px';

numEl.style.top = y + 'px';

faceContainer.appendChild(numEl);

}

// Inner circle (12-23)

for (let h = 12; h < 24; h++) {

const numEl = el('div', 'analog-time-picker-number');

numEl.textContent = h.toString();

numEl.dataset.value = h;

const angle = ((h - 12) * 30 - 90) * Math.PI / 180;

const x = centerX + 62 * Math.cos(angle) - 14;

const y = centerY + 62 * Math.sin(angle) - 14;

numEl.style.left = x + 'px';

numEl.style.top = y + 'px';

faceContainer.appendChild(numEl);

}

updateNeedle(currentHour);

} else {

// Minutes (0-55, step 5)

for (let m = 0; m < 60; m += 5) {

const numEl = el('div', 'analog-time-picker-number');

numEl.textContent = m === 0 ? '0' : to2(m);

numEl.dataset.value = m;

const angle = ((m / 5) * 30 - 90) * Math.PI / 180;

const x = centerX + 92 * Math.cos(angle) - 14;

const y = centerY + 92 * Math.sin(angle) - 14;

numEl.style.left = x + 'px';

numEl.style.top = y + 'px';

faceContainer.appendChild(numEl);

}

updateNeedle(currentMinute);

}

}



// InTerÃ§active selection handler from click/touch coordinates

function handlePointer(clientX, clientY, isEnd = false) {

const rect = faceContainer.getBoundingClientRect();

const x = clientX - rect.left - 115;

const y = clientY - rect.top - 115;



let angleRad = Math.atan2(y, x);

let angleDeg = angleRad * 180 / Math.PI + 90;

if (angleDeg < 0) angleDeg += 360;



if (activeMode === 'hour') {

// Determine outer vs inner ring

const dist = Math.sqrt(x*x + y*y);

const isInner = dist < 77; // threshold between 62px and 92px radius (midpoint is 77px)



let hourBase = Math.round(angleDeg / 30) % 12;

let val = isInner ? hourBase + 12 : hourBase;



currentHour = val;

hourInput.value = to2(currentHour);

updateNeedle(currentHour);



if (isEnd) {

// Switch to minutes mode on release

activeMode = 'minute';

hourInput.classList.remove('active');

minuteInput.classList.add('active');

renderFace();

}

} else {

let minVal = Math.round(angleDeg / 6) % 60;

currentMinute = minVal;

minuteInput.value = to2(currentMinute);

updateNeedle(currentMinute);

}

}



// Pointer Events on Face

let isDragging = false;

faceContainer.onpointerdown = (e) => {

e.preventDefault();

isDragging = true;

faceContainer.setPointerCapture(e.pointerId);

handlePointer(e.clientX, e.clientY);

};

faceContainer.onpointermove = (e) => {

if (isDragging) {

e.preventDefault();

handlePointer(e.clientX, e.clientY);

}

};

faceContainer.onpointerup = (e) => {

if (isDragging) {

isDragging = false;

faceContainer.releasePointerCapture(e.pointerId);

handlePointer(e.clientX, e.clientY, true);

}

};



// Click digital displays to toggle modes

hourInput.onclick = () => {

if (inputMode === 'analog') {

activeMode = 'hour';

hourInput.classList.add('active');

minuteInput.classList.remove('active');

renderFace();

}

};

minuteInput.onclick = () => {

if (inputMode === 'analog') {

activeMode = 'minute';

hourInput.classList.remove('active');

minuteInput.classList.add('active');

renderFace();

}

};



// Footer section with Keyboard and OK/Cancel buttons

const footer = el('div', 'analog-time-picker-footer');



const keyboardBtn = el('button', 'analog-time-picker-keyboard-btn');

keyboardBtn.type = 'button';

keyboardBtn.innerHTML = '??'; // Keyboard icon

keyboardBtn.title = 'Digitar hor�rio';

footer.appendChild(keyboardBtn);



const buttonsDiv = el('div', 'analog-time-picker-buttons');



const cancelBtn = el('button');

cancelBtn.type = 'button';

cancelBtn.textContent = 'Cancelar';



const okBtn = el('button');

okBtn.type = 'button';

okBtn.textContent = 'OK';



buttonsDiv.appendChild(cancelBtn);

buttonsDiv.appendChild(okBtn);

footer.appendChild(buttonsDiv);

modal.appendChild(footer);

backdrop.appendChild(modal);

document.body.appendChild(backdrop);



// Initial face render

renderFace();



// Keyboard Toggle Handler

keyboardBtn.onclick = () => {

if (inputMode === 'analog') {

// Switch to keyboard mode

inputMode = 'keyboard';

keyboardBtn.innerHTML = '??'; // Clock icon

keyboardBtn.title = 'Usar rel�gio';

faceContainer.style.display = 'none';

keyboardMsg.style.display = 'block';



hourInput.readOnly = false;

minuteInput.readOnly = false;

hourInput.classList.add('active');

minuteInput.classList.add('active');

hourInput.focus();

hourInput.select();

} else {

// Switch to analog mode

inputMode = 'analog';

keyboardBtn.innerHTML = '??';

keyboardBtn.title = 'Digitar hor�rio';

faceContainer.style.display = 'block';

keyboardMsg.style.display = 'none';



// Parse values currently in inputs, clamp if invalid

let h = parseInt(hourInput.value, 10);

let m = parseInt(minuteInput.value, 10);

if (isNaN(h) || h < 0 || h > 23) h = 9;

if (isNaN(m) || m < 0 || m > 59) m = 0;

currentHour = h;

currentMinute = m;



hourInput.value = to2(currentHour);

minuteInput.value = to2(currentMinute);



hourInput.readOnly = true;

minuteInput.readOnly = true;



activeMode = 'hour';

hourInput.classList.add('active');

minuteInput.classList.remove('active');

renderFace();

}

};



// Limit keyboard entry logic

hourInput.oninput = () => {

hourInput.value = hourInput.value.replace(/[^0-9]/g, '');

let v = parseInt(hourInput.value, 10);

if (hourInput.value.length >= 2) {

if (!isNaN(v)) {

if (v > 23) hourInput.value = '23';

currentHour = parseInt(hourInput.value, 10);

}

minuteInput.focus();

minuteInput.select();

}

};

minuteInput.oninput = () => {

minuteInput.value = minuteInput.value.replace(/[^0-9]/g, '');

let v = parseInt(minuteInput.value, 10);

if (minuteInput.value.length >= 2) {

if (!isNaN(v) && v > 59) {

minuteInput.value = '59';

}

if (!isNaN(v)) {

currentMinute = parseInt(minuteInput.value, 10);

}

}

};

hourInput.onblur = () => {

let v = parseInt(hourInput.value, 10);

if (isNaN(v) || v < 0 || v > 23) v = 9;

currentHour = v;

hourInput.value = to2(currentHour);

};

minuteInput.onblur = () => {

let v = parseInt(minuteInput.value, 10);

if (isNaN(v) || v < 0 || v > 59) v = 0;

currentMinute = v;

minuteInput.value = to2(currentMinute);

};



// OK / Cancel Action Handlers

cancelBtn.onclick = () => {

backdrop.remove();

};



okBtn.onclick = () => {

let h = parseInt(hourInput.value, 10);

let m = parseInt(minuteInput.value, 10);

if (isNaN(h) || h < 0 || h > 23) h = currentHour;

if (isNaN(m) || m < 0 || m > 59) m = currentMinute;



h = Math.min(23, Math.max(0, h));

m = Math.min(59, Math.max(0, m));



const formattedTime = to2(h) + ':' + to2(m);

onSelect(formattedTime);

backdrop.remove();

};



// Close on pressing Escape inside picker

backdrop.addEventListener('keydown', (e) => {

if (e.key === 'Escape') {

e.preventDefault();

cancelBtn.click();

} else if (e.key === 'Enter') {

e.preventDefault();

okBtn.click();

}

});

}



function openBoardFilters() {

const vBoards = getVisibleBoardsInTodos();

showModal('Filtrar Quadros', function () {

const wrap = el('div');

wrap.style.display = 'flex';

wrap.style.flexDirection = 'column';

wrap.style.gap = '10px';

wrap.style.minWidth = '280px';

wrap.style.color = '#fff';



// Select All / Deselect All buttons

const btnRow = el('div');

btnRow.style.display = 'flex';

btnRow.style.gap = '8px';

btnRow.style.marginBottom = '6px';



const selectAll = el('button');

selectAll.type = 'button';

selectAll.textContent = 'Selecionar Todos';

selectAll.style.flex = '1';

selectAll.style.background = 'var(--brand)';

selectAll.style.border = 'none';

selectAll.style.borderRadius = '6px';

selectAll.style.padding = '6px';

selectAll.style.color = '#fff';

selectAll.style.cursor = 'pointer';

selectAll.onclick = () => {

wrap.querySelectorAll('.board-filter-chk').forEach(chk => chk.checked = true);

};



const deselectAll = el('button');

deselectAll.type = 'button';

deselectAll.textContent = 'Desmarcar Todos';

deselectAll.style.flex = '1';

deselectAll.style.background = '#3a3f4b';

deselectAll.style.border = 'none';

deselectAll.style.borderRadius = '6px';

deselectAll.style.padding = '6px';

deselectAll.style.color = '#fff';

deselectAll.style.cursor = 'pointer';

deselectAll.onclick = () => {

wrap.querySelectorAll('.board-filter-chk').forEach(chk => chk.checked = false);

};



btnRow.appendChild(selectAll);

btnRow.appendChild(deselectAll);

wrap.appendChild(btnRow);



const listWrap = el('div', 'filter-checkbox-list');



// Add a checkbox for each board (except trash and board-todos)

boardsMeta.forEach(b => {

if (b.id === 'board-trash' || b.id === 'board-todos') return;



const label = el('label');

label.style.display = 'flex';

label.style.alignItems = 'center';

label.style.gap = '10px';

label.style.fontSize = '14px';

label.style.cursor = 'pointer';

label.style.padding = '4px 0';



const checked = vBoards.has(b.id) ? 'checked' : '';

label.innerHTML = `

<input type="checkbox" class="board-filter-chk" data-id="${b.id}" ${checked} 
       style="cursor: pointer; width: 16px; height: 16px;">

<span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; 
       background: ${b.color || '#1976d2'};"></span>

<span>${b.name}</span>

`;

listWrap.appendChild(label);

});

wrap.appendChild(listWrap);



return wrap;

}, function (body, wrap) {

const newVisible = new Set();

body.querySelectorAll('.board-filter-chk').forEach(chk => {

if (chk.checked) {

newVisible.add(chk.dataset.id);

}

});

visibleBoardsInTodos = newVisible;

localStorage.setItem(LS_VISIBLE_BOARDS, JSON.stringify(Array.from(newVisible)));

loadAndRenderAll();

});

}



function openColorFilters() {

const PALETTE = buildFullPalette();

showModal('Filtrar por Etiquetas', function () {

const wrap = el('div');

wrap.style.display = 'flex';

wrap.style.flexDirection = 'column';

wrap.style.gap = '10px';

wrap.style.minWidth = '300px';

wrap.style.color = '#fff';



// Help/Instruction

const info = el('div');

info.textContent = 'Selecione quais etiquetas deseja exibir. Cart�es com cores desmarcadas 
       ser�o ocultados.';

info.style.fontSize = '12px';

info.style.color = '#9fb3d2';

info.style.marginBottom = '6px';

wrap.appendChild(info);



// Select All / Deselect All buttons

const btnRow = el('div');

btnRow.style.display = 'flex';

btnRow.style.gap = '8px';

btnRow.style.marginBottom = '6px';



const selectAll = el('button');

selectAll.type = 'button';

selectAll.textContent = 'Selecionar Todas';

selectAll.style.flex = '1';

selectAll.style.background = 'var(--brand)';

selectAll.style.border = 'none';

selectAll.style.borderRadius = '6px';

selectAll.style.padding = '6px';

selectAll.style.color = '#fff';

selectAll.style.cursor = 'pointer';

selectAll.onclick = () => {

wrap.querySelectorAll('.color-filter-chk').forEach(chk => chk.checked = true);

};



const deselectAll = el('button');

deselectAll.type = 'button';

deselectAll.textContent = 'Desmarcar Todas';

deselectAll.style.flex = '1';

deselectAll.style.background = '#3a3f4b';

deselectAll.style.border = 'none';

deselectAll.style.borderRadius = '6px';

deselectAll.style.padding = '6px';

deselectAll.style.color = '#fff';

deselectAll.style.cursor = 'pointer';

deselectAll.onclick = () => {

wrap.querySelectorAll('.color-filter-chk').forEach(chk => chk.checked = false);

};



btnRow.appendChild(selectAll);

btnRow.appendChild(deselectAll);

wrap.appendChild(btnRow);



const listWrap = el('div', 'filter-checkbox-list');



// 1. Sem cor (No color) item

const noColorLabel = el('label');

noColorLabel.style.display = 'flex';

noColorLabel.style.alignItems = 'center';

noColorLabel.style.gap = '10px';

noColorLabel.style.fontSize = '14px';

noColorLabel.style.cursor = 'pointer';

noColorLabel.style.padding = '4px 0';



const noColorChecked = (selectedColors.size === 0 || selectedColors.has('')) ? 'checked' : 
       '';

noColorLabel.innerHTML = `

<input type="checkbox" class="color-filter-chk" data-hex="" ${noColorChecked} 
       style="cursor: pointer; width: 16px; height: 16px;">

<span style="display: inline-block; width: 12px; height: 12px; border-radius: 4px; 
       border: 1px dashed #9fb3d2; background: transparent;"></span>

<span>Sem etiqueta</span>

`;

listWrap.appendChild(noColorLabel);



// 2. Palette colors

PALETTE.forEach(p => {

const label = el('label');

label.style.display = 'flex';

label.style.alignItems = 'center';

label.style.gap = '10px';

label.style.fontSize = '14px';

label.style.cursor = 'pointer';

label.style.padding = '4px 0';



const checked = (selectedColors.size === 0 || selectedColors.has(p.hex.toLowerCase())) 
       ? 'checked' : '';

label.innerHTML = `

<input type="checkbox" class="color-filter-chk" data-hex="${p.hex.toLowerCase()}" 
       ${checked} style="cursor: pointer; width: 16px; height: 16px;">

<span style="display: inline-block; width: 12px; height: 12px; border-radius: 4px; 
       background: ${p.hex};"></span>

<span>${p.name}</span>

`;

listWrap.appendChild(label);

});

wrap.appendChild(listWrap);



return wrap;

}, function (body, wrap) {

const checkedCheckboxes = body.querySelectorAll('.color-filter-chk:checked');

const allCheckboxes = body.querySelectorAll('.color-filter-chk');



selectedColors.clear();



if (checkedCheckboxes.length < allCheckboxes.length) {

checkedCheckboxes.forEach(chk => {

selectedColors.add(chk.dataset.hex);

});

}



applyFilters();

});

}



// ===== WEEKLY VIEW =====

function getWeekRange(dateStr) {

const curr = new Date(dateStr + 'T12:00:00');

const first = curr.getDate() - curr.getDay();

const week = [];

for (let i = 0; i < 7; i++) {

const next = new Date(curr); next.setDate(first + i); week.push(next.toISOString().slice(0, 
       10));

}

return week;

}



let weeklyActiveDate = new Date().toISOString().slice(0, 10);



function renderWeeklyView() {

if (!weeklyGrid || weeklyContainer.classList.contains('collapsed')) return;

weeklyGrid.innerHTML = '';

const currentDay = weeklyActiveDate;

const weekDates = getWeekRange(currentDay);

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S�b'];

const startW = weekDates[0].split('-').reverse().slice(0, 2).join('/');

const endW = weekDates[6].split('-').reverse().slice(0, 2).join('/');

document.getElementById('weekRangeDisplay').textContent = `${startW} - ${endW}`;



weekDates.forEach((date, index) => {

const col = el('div', 'day-column');

if (date === currentDay) col.classList.add('today');

const header = el('header');



const textWrap = el('div');

textWrap.style.textAlign = 'left';

textWrap.innerHTML = `${daysOfWeek[index]} <span 
       class="date-label">${date.split('-').reverse().slice(0, 2).join('/')}</span>`;

header.appendChild(textWrap);



const addBtn = el('button', 'weekly-add-btn');

addBtn.type = 'button';

addBtn.title = 'Adicionar cart�o';

addBtn.textContent = '+';

addBtn.addEventListener('click', function(e) {

e.stopPropagation();

const newCard = createCard({ text: '', when: date + 'T' });

renderWeeklyView();

const clone = Array.from(weeklyGrid.querySelectorAll('.mirror-card')).find(c => 
       c._originalReference === newCard);

if (clone) {

startInlineEdit(clone, true);

}

});

header.appendChild(addBtn);



col.appendChild(header);

const cardsContainer = el('div', 'cards');

cardsContainer.dataset.date = date;

wireDropZone(cardsContainer);



const dayPrefix = date + 'T';

const floatingCards = allCards.filter(c => { const w = c.dataset.when || ''; return w === 
       dayPrefix || w === dayPrefix + 'GOAL'; });

const scheduledCards = allCards.filter(c => { const w = c.dataset.when || ''; return 
       w.startsWith(dayPrefix) && w.length > 11 && w !== dayPrefix + 'GOAL'; });

scheduledCards.sort((a, b) => (a.dataset.when || '').localeCompare(b.dataset.when || ''));



function createInTerÃ§activeMirror(originalCard, isScheduled) {

const clone = originalCard.cloneNode(true);

clone.classList.add('mirror-card');

if (isScheduled) clone.classList.add('is-scheduled');

clone.classList.remove('selected', 'dragging', 'timer-running', 'timer-finished');

clone.style.animation = '';

clone._originalReference = originalCard;



const kb = clone.querySelector('.kebab');

if (kb) {

kb.addEventListener('click', function(ev) {

ev.stopPropagation();

clearSelection();

addSelection(originalCard);

var r = kb.getBoundingClientRect();

showCtx(r.right, r.bottom, originalCard);

});

}



const dot = clone.querySelector('.dot');

if (dot) {

dot.addEventListener('click', function(e) {

e.stopPropagation();

const ev = new PointerEvent('click', { bubbles: true, cancelable: true, view: 
       window });

originalCard.querySelector('.dot').dispatchEvent(ev); 

});

dot.addEventListener('dblclick', (e) => e.stopPropagation());

}



clone.addEventListener('mousedown', function (e) {

if (e.button !== 0) return;

const ev = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: 
       window, button: 0, shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });

originalCard.dispatchEvent(ev);

});



clone.addEventListener('dblclick', function (e) {

if (e.target.closest('.dot')) {

e.stopPropagation(); return;

}

handleCardDblClick(originalCard);

});



clone.addEventListener('contextmenu', function (e) {

e.preventDefault();

e.stopPropagation();

clearSelection();

addSelection(originalCard);

showCtx(e.clientX, e.clientY, originalCard);

});



clone.addEventListener('dragstart', function (e) {

e.stopPropagation();

const block = selected.has(originalCard) ? Array.from(selected) : [originalCard];

dragState = { leader: originalCard, block: block };

block.forEach(n => n.classList.add('dragging'));

clone.classList.add('dragging');

pushPH();

try { e.dataTransfer.setData('text/plain', 'drag'); e.dataTransfer.effectAllowed = 
       'move'; } catch (_) { }

});

clone.addEventListener('dragend', function () {

clone.classList.remove('dragging');

if (dragState && dragState.block) {

dragState.block.forEach(n => n.classList.remove('dragging'));

}

cleanupPH();

dragState = null;

persist();

updateSlotsHasItems();

updateTotalTimerDisplay();

});

return clone;

}



scheduledCards.forEach(originalCard => {

const clone = createInTerÃ§activeMirror(originalCard, true);

const timeStr = (originalCard.dataset.when || '').split('T')[1];

if (timeStr) {

let timeBadge = clone.querySelector('.due-date.time-badge');

if (!timeBadge) {

timeBadge = el('span', 'due-date time-badge');

timeBadge.style.backgroundColor = 'var(--brand)';

timeBadge.style.color = 'white';

timeBadge.style.marginRight = '5px';

const cardHeader = clone.querySelector('.card-header');

if (cardHeader) {

const kbBtn = cardHeader.querySelector('.kebab');

if (kbBtn) cardHeader.insertBefore(timeBadge, kbBtn);

else cardHeader.appendChild(timeBadge);

}

}

timeBadge.textContent = timeStr;

}

cardsContainer.appendChild(clone);

});



floatingCards.forEach(originalCard => {

const clone = createInTerÃ§activeMirror(originalCard, false);

let info = clone.querySelector('.due-date.info-badge');

if (!info) {

info = el('span', 'due-date info-badge');

info.textContent = 'A definir';

info.style.opacity = '0.5';

const cardHeader = clone.querySelector('.card-header');

if (cardHeader) {

const kbBtn = cardHeader.querySelector('.kebab');

if (kbBtn) cardHeader.insertBefore(info, kbBtn);

else cardHeader.appendChild(info);

}

}

cardsContainer.appendChild(clone);

});



col.appendChild(cardsContainer);

weeklyGrid.appendChild(col);

});

syncMirrors();

}



function changeWeek(offset) {

const currentDate = new Date(weeklyActiveDate + 'T12:00:00');

currentDate.setDate(currentDate.getDate() + (offset * 7));

weeklyActiveDate = currentDate.toISOString().slice(0, 10);

applyFilters();

}

document.getElementById('prevWeekBtn').addEventListener('click', () => changeWeek(-1));

document.getElementById('nextWeekBtn').addEventListener('click', () => changeWeek(1));

document.getElementById('todayWeekBtn').addEventListener('click', () => {

weeklyActiveDate = new Date().toISOString().slice(0, 10);

applyFilters();

});



// ===== INITIALIZATION =====

const toggleAgendaBtn = document.getElementById('toggleAgendaBtn');

const workspaceEl = document.querySelector('.workspace');

const AGENDA_STATE_KEY = 'mini-trello-agenda-state';

const toggleBoardBtn = document.getElementById('toggleBoardBtn');

const toggleMatrixBtn = document.getElementById('toggleMatrixBtn');

const boardContainer = document.querySelector('.board-container');

const matrixContainer = document.querySelector('.matrix-container');

const agendaSidebar = document.getElementById('agenda-sidebar');

const mainContent = document.getElementById('main-content');

const weeklyContainer = document.querySelector('.weekly-container');

const weeklyGrid = document.getElementById('weeklyGrid');

const toggleWeeklyBtn = document.getElementById('toggleWeeklyBtn');

const BOARD_STATE_KEY = 'mini-trello-board-state';

const MATRIX_STATE_KEY = 'mini-trello-matrix-state';

const WEEKLY_STATE_KEY = 'mini-trello-weekly-state';

const quickConfigToggle = document.getElementById('quickConfigToggle');

const quickConfigToggleBtn = quickConfigToggle.nextElementSibling;



function saveState() {

localStorage.setItem(AGENDA_STATE_KEY, agendaSidebar.classList.contains('collapsed') ? 
       'collapsed' : 'open');

localStorage.setItem(BOARD_STATE_KEY, boardContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

localStorage.setItem(MATRIX_STATE_KEY, matrixContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

localStorage.setItem(WEEKLY_STATE_KEY, weeklyContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

}



function loadState() {

const agendaState = localStorage.getItem(AGENDA_STATE_KEY);

const boardState = localStorage.getItem(BOARD_STATE_KEY);

const matrixState = localStorage.getItem(MATRIX_STATE_KEY);

const quickConfigState = localStorage.getItem(LS_QUICK_CONFIG_KEY);



if (agendaState === 'collapsed') { agendaSidebar.classList.add('collapsed'); 
       workspaceEl.classList.add('agenda-collapsed'); toggleAgendaBtn.classList.remove('active'); }

else { agendaSidebar.classList.remove('collapsed'); 
       workspaceEl.classList.remove('agenda-collapsed'); toggleAgendaBtn.classList.add('active'); }



if (boardState === 'collapsed') { boardContainer.classList.add('collapsed'); 
       mainContent.classList.add('board-collapsed'); toggleBoardBtn.classList.remove('active'); }

else { boardContainer.classList.remove('collapsed'); 
       mainContent.classList.remove('board-collapsed'); toggleBoardBtn.classList.add('active'); }



if (matrixState === 'collapsed') { matrixContainer.classList.add('collapsed'); 
       mainContent.classList.add('matrix-collapsed'); toggleMatrixBtn.classList.remove('active'); }

else { matrixContainer.classList.remove('collapsed'); 
       mainContent.classList.remove('matrix-collapsed'); toggleMatrixBtn.classList.add('active'); }



if (quickConfigState === 'true') { quickConfigToggle.checked = true; 
       quickConfigToggleBtn.textContent = 'ON'; }

else { quickConfigToggle.checked = false; quickConfigToggleBtn.textContent = 'OFF'; }

}



const weeklyState = localStorage.getItem(WEEKLY_STATE_KEY);

if (weeklyState === 'open') { weeklyContainer.classList.remove('collapsed'); 
       toggleWeeklyBtn.classList.add('active'); renderWeeklyView(); }

else { weeklyContainer.classList.add('collapsed'); toggleWeeklyBtn.classList.remove('active'); }



toggleBoardBtn.addEventListener('click', () => { boardContainer.classList.toggle('collapsed'); 
       mainContent.classList.toggle('board-collapsed'); toggleBoardBtn.classList.toggle('active'); saveState(); });

toggleMatrixBtn.addEventListener('click', () => { matrixContainer.classList.toggle('collapsed'); 
       mainContent.classList.toggle('matrix-collapsed'); toggleMatrixBtn.classList.toggle('active'); saveState(); });

toggleAgendaBtn.addEventListener('click', () => { agendaSidebar.classList.toggle('collapsed'); 
       workspaceEl.classList.toggle('agenda-collapsed'); toggleAgendaBtn.classList.toggle('active'); saveState(); });

toggleWeeklyBtn.addEventListener('click', () => { weeklyContainer.classList.toggle('collapsed'); 
       toggleWeeklyBtn.classList.toggle('active'); if (!weeklyContainer.classList.contains('collapsed')) { 
       renderWeeklyView(); } saveState(); });

document.getElementById('toggleSelectionModeBtn').onclick = toggleSelectionMode;

quickConfigToggle.addEventListener('change', () => { const isChecked = quickConfigToggle.checked; 
       quickConfigToggleBtn.textContent = isChecked ? 'ON' : 'OFF'; localStorage.setItem(LS_QUICK_CONFIG_KEY, 
       isChecked); });



document.getElementById('addList').onclick = function () { createList('Nova lista'); persist(); };

document.getElementById('filterColorsBtn').addEventListener('click', openColorFilters);

document.getElementById('filterBoardsBtn').addEventListener('click', openBoardFilters);

document.getElementById('undo').onclick = doUndo; document.getElementById('redo').onclick = doRedo;

document.getElementById('clearFilters').onclick = function () { selectedColors.clear(); 
       document.getElementById('fFrom').value = ''; document.getElementById('fTo').value = ''; 
       document.getElementById('fTime').value = ''; applyFilters(); };



// Eventos dos submenus e dropdowns

document.getElementById('menuNewBoard').onclick = () => { const name = prompt('Nome do novo 
       quadro:'); if (name) createNewBoard(name); };

document.getElementById('menuRenameBoard').onclick = renameBoard;

document.getElementById('menuCloneBoard').onclick = cloneBoard;

document.getElementById('menuDeleteBoard').onclick = deleteBoard;

document.getElementById('menuBoardTheme').onclick = openBoardThemePicker;

document.getElementById('menuExportJson').onclick = exportBackup;

document.getElementById('menuImportJson').onclick = () => 
       document.getElementById('importFile').click();



document.getElementById('importFile').addEventListener('change', function(e) {

const file = e.target.files[0];

if (file) importBackup(file);

e.target.value = '';

});



document.getElementById('boardSelect').onchange = (e) => switchBoard(e.target.value);



// Controle de Dropdowns (mobile friendly & click outside)

document.querySelectorAll('.header-dropdown-btn').forEach(btn => {

btn.addEventListener('click', function(e) {

e.stopPropagation();

const parent = this.parentElement;

document.querySelectorAll('.header-dropdown').forEach(d => {

if (d !== parent) d.classList.remove('active');

});

parent.classList.toggle('active');

});

});

document.addEventListener('click', function() {

document.querySelectorAll('.header-dropdown').forEach(d => {

d.classList.remove('active');

});

});





const agendaDateInput = document.getElementById('agendaDate');

function changeDay(days) { let currentDate = new Date(agendaDateInput.value + 'T12:00:00'); 
       currentDate.setDate(currentDate.getDate() + days); agendaDateInput.value = currentDate.toISOString().slice(0, 
       10); applyFilters(); }

document.getElementById('prevDayBtn').addEventListener('click', () => changeDay(-1));

document.getElementById('nextDayBtn').addEventListener('click', () => changeDay(1));

document.getElementById('todayDayBtn').addEventListener('click', () => {

agendaDateInput.value = new Date().toISOString().slice(0, 10);

applyFilters();

});

agendaDateInput.addEventListener('change', applyFilters);



boardEl.addEventListener('wheel', (e) => { if (e.altKey) { e.preventDefault(); boardEl.scrollLeft 
       += e.deltaY; } });



// Scroll Drag logic

const mainScrollContainer = document.getElementById('main-content');

let scrollSpeed = { x: 0, y: 0 };

let scrollFrame = null;

function performAutoScroll() {

if (scrollSpeed.x === 0 && scrollSpeed.y === 0) { scrollFrame = null; return; }

mainScrollContainer.scrollBy(scrollSpeed.x, scrollSpeed.y);

scrollFrame = requestAnimationFrame(performAutoScroll);

}

function applyDragScroll() {

const containers = [document.getElementById('board'), document.getElementById('main-content'), 
       document.getElementById('slots')];

containers.forEach(container => {

if (!container) return;

let isDown = false; let startX, startY, scrollLeft, scrollTop;

container.addEventListener('mousedown', (e) => {

if (e.target.closest('.card') || e.target.tagName === 'BUTTON' || e.target.tagName === 
       'INPUT' || e.target.closest('.header-icon')) return;

isDown = true; container.style.cursor = 'grabbing'; startX = e.pageX; startY = e.pageY; 
       scrollLeft = container.scrollLeft; scrollTop = container.scrollTop;

});

const stopDrag = () => { if (isDown) { isDown = false; container.style.cursor = 'grab'; } };

container.addEventListener('mouseleave', stopDrag); container.addEventListener('mouseup', 
       stopDrag);

container.addEventListener('mousemove', (e) => {

if (!isDown) return; e.preventDefault();

const x = e.pageX; const y = e.pageY; const walkX = (x - startX) * 1; const walkY = (y 
       - startY) * 1;

container.scrollLeft = scrollLeft - walkX; container.scrollTop = scrollTop - walkY;

});

});

}



document.getElementById('copyDayBtn').addEventListener('click', function () {

const day = getActiveDay();

agendaClipboard = allCards.filter(c => (c.dataset.when || '').startsWith(day + 'T')).map(c => 
       ({ ...cardToData(c), timeOrGoal: (c.dataset.when || '').substring(11) }));

const btn = document.getElementById('copyDayBtn'); btn.textContent = 'Copiado!'; setTimeout(() 
       => { btn.textContent = '??'; }, 1000);

});

document.getElementById('pasteDayBtn').addEventListener('click', function () {

if (agendaClipboard.length === 0) { const btn = document.getElementById('pasteDayBtn'); 
       btn.textContent = 'Vazio!'; setTimeout(() => { btn.textContent = '??'; }, 1000); return; }

const day = getActiveDay();

agendaClipboard.forEach(cardData => {

const newData = { ...cardData }; newData.when = day + 'T' + newData.timeOrGoal;

const existsInCache = allCards.some(c => c.dataset.when === newData.when && 
       c.querySelector('.text').textContent.trim() === newData.text.trim());

if (!existsInCache) createCard(newData);

});

updateSlotsHasItems(); persist();

});



$$('#fFrom, #fTo, #fTime').forEach(function (el) { el.addEventListener('input', applyFilters); });



document.addEventListener('keydown', function (e) {

if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? 
       doRedo() : doUndo(); return; }



// AJUSTE: Copiar / Colar / Recortar

if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {

if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

e.preventDefault();

appClipboard = Array.from(selected).map(cardToData);

return;

}

if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {

if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

e.preventDefault();

appClipboard = Array.from(selected).map(cardToData);

selected.forEach(card => removeCard(card));

clearSelection();

return;

}

if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {

if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

if (appClipboard.length === 0) return;

e.preventDefault();



// Tenta achar lista sob o mouse

const hoveredList = $$('.list').find(l => {

const r = l.getBoundingClientRect();

return lastMouseX >= r.left && lastMouseX <= r.right && lastMouseY >= r.top && 
       lastMouseY <= r.bottom;

});



const targetContainer = hoveredList ? (hoveredList.querySelector('.cards') || hoveredList) 
       : boardEl.querySelector('.list .cards');

if (targetContainer) {

appClipboard.forEach(data => {

const newCard = createCard(data);

targetContainer.appendChild(newCard);

if (hoveredList) applyWhen(hoveredList, [newCard]);

});

persist(); updateSlotsHasItems();

}

return;

}



if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {

if (document.activeElement.tagName === 'INPUT' && document.activeElement.closest('.add')) 
       return;

e.preventDefault();

let targetList = null; let insertAfterCard = null;

if (selected.size > 0) { insertAfterCard = Array.from(selected).pop(); targetList = 
       insertAfterCard.closest('.list'); }

else {

const lists = $$('.list');

targetList = lists.find(l => { if (l.offsetParent === null) return false; const rect = 
       l.getBoundingClientRect(); return lastMouseX >= rect.left && lastMouseX <= rect.right && lastMouseY >= rect.top 
       && lastMouseY <= rect.bottom; });

if (!targetList || targetList.offsetParent === null) targetList = 
       boardEl.querySelector('.list[data-type="kanban"]');

}

if (targetList) {

const cardsContainer = targetList.querySelector('.cards');

if (cardsContainer) {

const newCard = createCard({ text: '' });

if (insertAfterCard && insertAfterCard.parentElement === cardsContainer) 
       cardsContainer.insertBefore(newCard, insertAfterCard.nextSibling); else cardsContainer.appendChild(newCard);

applyWhen(targetList, [newCard]); persist(); updateTotalTimerDisplay(); 
       startInlineEdit(newCard, true);

}

}

return;

}

var currentSelection = getSelectionOr(ctxTarget);

const activeEl = document.activeElement;

const isEditingCard = activeEl.isContentEditable && activeEl.classList.contains('text') && 
       activeEl.closest('.card');

if (e.key === 'F2') {

e.preventDefault();

if (isEditingCard) activeEl.blur(); else if (currentSelection.length > 0) 
       startInlineEdit(currentSelection[0]);

return;

}

if ((activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || 
       activeEl.closest('.modal')) || (isEditingCard)) {

if (isEditingCard && (e.key === 'Delete' || e.key === 'Backspace') && 
       activeEl.textContent.trim() === '') { e.preventDefault(); const cardToDelete = [activeEl.closest('.card')]; 
       showConfirm('excluir cart�o vazio?', function () { cardToDelete.forEach(n => removeCard(n)); clearSelection(); 
       }); }

return;

}

if (!currentSelection.length && !ctxTarget && (e.key === 'Delete' || e.key === 'Backspace')) 
       return;

if (currentSelection.length > 0 && e.altKey) {

if (e.key.toLowerCase() === 't') { e.preventDefault(); openTimerDialog(currentSelection); }

else if (e.key.toLowerCase() === 'c') { e.preventDefault(); 
       openColorDialog(currentSelection); }

else if (e.key.toLowerCase() === 'd') { e.preventDefault(); 
       openDateDialog(currentSelection); }

else if (e.key.toLowerCase() === 'p') { 

e.preventDefault();

const activeProps = document.querySelector('.modal-wrap');

if (activeProps && activeProps.querySelector('h3') && 
       activeProps.querySelector('h3').textContent === 'Propriedades do Cart�o') {

activeProps.remove();

} else {

showPropertiesDialog(currentSelection[0]);

}

}

return;

}



// Shift + Setas (Cima / Baixo) para mover cart�o pela agenda

if (currentSelection.length > 0 && e.shiftKey) {

if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {

let targetCard = currentSelection[0];

let mirrorCard = Array.from(slotsRoot.querySelectorAll('.card')).find(clone => 
       clone._originalReference === targetCard);

let currentSlot = (mirrorCard ? mirrorCard.closest('#slots > .list') : null) || 
       targetCard.closest('#slots > .list');



if (currentSlot) {

e.preventDefault();

const slots = Array.from(slotsRoot.children);

const currentIndex = slots.indexOf(currentSlot);

let targetIndex = e.key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;



if (targetIndex >= 0 && targetIndex < slots.length) {

const targetSlot = slots[targetIndex];

if (targetSlot.dataset.type === 'goal') {

targetCard.dataset.when = getActiveDay() + 'TGOAL';

} else if (targetSlot.dataset.type === 'unscheduled') {

targetCard.dataset.when = getActiveDay() + 'T';

} else if (targetSlot.dataset.type === 'time') {

targetCard.dataset.when = getActiveDay() + 'T' + targetSlot.dataset.time;

}

persist(); loadAndRenderAll();

updateSlotsHasItems();



// Focar e rolar para o novo espelho gerado na agenda

setTimeout(() => {

let newMirror = Array.from(slotsRoot.querySelectorAll('.card')).find(clone 
       => clone._originalReference === targetCard);

if (newMirror) {

newMirror.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

}

}, 50);

}

return;

}

}

}



if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { 
       e.preventDefault(); duplicateCards(currentSelection); return; }

if (currentSelection.length > 0 && (e.key === 'Delete' || e.key === 'Backspace')) { 
       e.preventDefault(); showConfirm('excluir ' + currentSelection.length + ' cart�o(s)?', function () { 
       currentSelection.forEach(function (n) { removeCard(n); }); clearSelection(); }); return; }

if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey)) {

let moved = false;

let targetCard = currentSelection[0];

let parentCards = targetCard.parentElement;

let parentList = targetCard.closest('.list');

if (!parentCards || !parentList) return;



if (e.key === 'ArrowUp') {

e.preventDefault();

let previousCard = targetCard.previousElementSibling;

while (previousCard && previousCard.style.display === 'none') {

previousCard = previousCard.previousElementSibling;

}

if (previousCard) {

currentSelection.forEach(card => parentCards.insertBefore(card, previousCard));

moved = true;

}

} else if (e.key === 'ArrowDown') {

e.preventDefault();

let lastCardInSelection = currentSelection[currentSelection.length - 1];

let nextCard = lastCardInSelection.nextElementSibling;

while (nextCard && nextCard.style.display === 'none') {

nextCard = nextCard.nextElementSibling;

}

if (nextCard) {

currentSelection.forEach(card => parentCards.insertBefore(card, nextCard));

moved = true;

} else {

currentSelection.forEach(card => parentCards.appendChild(card));

moved = true;

}

} else if (e.key === 'ArrowLeft' && parentList.dataset.type === 'kanban') {

e.preventDefault();

let prevList = parentList.previousElementSibling;

while (prevList && !prevList.matches('.list[data-type="kanban"]')) {

prevList = prevList.previousElementSibling;

}

if (prevList) {

let destCards = prevList.querySelector('.cards');

applyWhen(prevList, currentSelection);

currentSelection.forEach(card => destCards.appendChild(card));

moved = true;

}

} else if (e.key === 'ArrowRight' && parentList.dataset.type === 'kanban') {

e.preventDefault();

let nextList = parentList.nextElementSibling;

while (nextList && !nextList.matches('.list[data-type="kanban"]')) {

nextList = nextList.nextElementSibling;

}

if (nextList) {

let destCards = nextList.querySelector('.cards');

applyWhen(nextList, currentSelection);

currentSelection.forEach(card => destCards.appendChild(card));

moved = true;

}

}



if (moved) {

persist();

applyFilters();

}

}

});



document.addEventListener('dragover', (e) => {

if (!dragState) return;

const threshold = 100; const speed = 12; const rect = 
       mainScrollContainer.getBoundingClientRect();

scrollSpeed = { x: 0, y: 0 };

if (e.clientY < rect.top + threshold) scrollSpeed.y = -speed; else if (e.clientY > rect.bottom 
       - threshold) scrollSpeed.y = speed;

if (e.clientX < rect.left + threshold) scrollSpeed.x = -speed; else if (e.clientX > rect.right 
       - threshold) scrollSpeed.x = speed;

if ((scrollSpeed.x !== 0 || scrollSpeed.y !== 0) && !scrollFrame) scrollFrame = 
       requestAnimationFrame(performAutoScroll);

});



function stopScrollParams() { scrollSpeed = { x: 0, y: 0 }; if (scrollFrame) { 
       cancelAnimationFrame(scrollFrame); scrollFrame = null; } }

document.addEventListener('dragend', stopScrollParams); document.addEventListener('drop', 
       stopScrollParams); document.addEventListener('mouseleave', stopScrollParams);



function initDemo() {

withMute(function () {

var toDo = createList('Para Fazer');

toDo.querySelector('.cards').appendChild(createCard({ text: 'Tarefa importante e urgente', 
       color: '#104239', timerTotal: '1800' }));

createList('Em Andamento'); createList('Feito');

if (matrixEl) { var q1 = matrixEl.querySelector('.list[data-quad="Q1"] .cards'); 
       q1.appendChild(createCard({ text: 'Crise: Resolver problema no servidor!', color: '#104239', timerTotal: '7200' 
       })); }

createCard({ text: "Definir meta principal do dia", when: `${getActiveDay()}TGOAL`, 
       timerTotal: '900' });

});

applyFilters(); updateSlotsHasItems(); updateTotalTimerDisplay();

}



function updateFocusMode() {

// Se estiver no modo manual ou tela pequena

const isManual = document.body.classList.contains('manual-focus-mode');

if (window.innerWidth < 700 || isManual) {

const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

if (runningCard) {

document.body.classList.add('focus-mode');

const text = runningCard.querySelector('.text').textContent;

const state = runningCard.dataset.timerState;

const disp = runningCard.querySelector('.timer-display');



document.getElementById('focusTargetText').textContent = text;

document.getElementById('focusTargetTime').textContent = disp ? 
       disp.textContent.replace('?? ', '').replace(' min', '').replace('? ', '') : '...';



const toggleBtn = document.getElementById('focusToggleBtn');

toggleBtn.textContent = state === 'running' ? '??' : '??';

return;

}

}

document.body.classList.remove('focus-mode');

}



// L�gica dos bot�es do foco

document.getElementById('focusToggleBtn').onclick = () => {

const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

if (runningCard) {

handleCardDblClick(runningCard);

updateFocusMode();

}

};



document.getElementById('focusPlusBtn').onclick = () => {

const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

if (runningCard) {

let left = parseInt(runningCard.dataset.timerLeft, 10) || 0;

let total = parseInt(runningCard.dataset.timerTotal, 10) || 0;

runningCard.dataset.timerLeft = left + 60;

runningCard.dataset.timerTotal = total + 60;

if (runningCard.dataset.timerState === 'running') {

let end = parseInt(runningCard.dataset.timerEnd, 10);

if (!isNaN(end)) runningCard.dataset.timerEnd = end + 60000;

else runningCard.dataset.timerEnd = Date.now() + (left + 60) * 1000;

}

updateTimerDisplay(runningCard);

updateFocusMode();

persist();

}

};



document.getElementById('focusMinusBtn').onclick = () => {

const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

if (runningCard) {

let left = parseInt(runningCard.dataset.timerLeft, 10) || 0;

let total = parseInt(runningCard.dataset.timerTotal, 10) || 0;

if (left > 60) {

runningCard.dataset.timerLeft = left - 60;

runningCard.dataset.timerTotal = Math.max(0, total - 60);

if (runningCard.dataset.timerState === 'running') {

let end = parseInt(runningCard.dataset.timerEnd, 10);

if (!isNaN(end)) runningCard.dataset.timerEnd = end - 60000;

}

updateTimerDisplay(runningCard);

updateFocusMode();

persist();

}

}

};



document.getElementById('focusCloseBtn').onclick = () => {

document.body.classList.remove('manual-focus-mode', 'focus-mode');

};



document.getElementById('manualFocusBtn').onclick = () => {

const isRunning = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

if (!isRunning) {

alert("Inicie um timer primeiro para entrar no modo foco!");

return;

}

document.body.classList.toggle('manual-focus-mode');

updateFocusMode();

};

// ===== RESIZERS LOGIC =====

function initResizers() {

const resizerSidebar = document.getElementById('resizer-sidebar');

const sidebar = document.getElementById('agenda-sidebar');

const resizerMatrix = document.getElementById('resizer-matrix');

const matrixContainer = document.getElementById('matrix-container');

const boardContainer = document.getElementById('board-container');

const resizerWeekly = document.getElementById('resizer-weekly');

const weeklyContainer = document.getElementById('weekly-container');



// Load saved sizes

try {

const saved = JSON.parse(localStorage.getItem('TEA_RESIZERS') || '{}');

if (saved.sidebarWidth && window.innerWidth > 700) sidebar.style.flexBasis = 
       saved.sidebarWidth + 'px';

if (saved.boardHeight) {

const h = parseInt(saved.boardHeight);

boardContainer.style.height = (isNaN(h) || h < 100) ? '300px' : h + 'px';

}

if (saved.weeklyHeight) {

const h = parseInt(saved.weeklyHeight);

weeklyContainer.style.height = (isNaN(h) || h < 50) ? '250px' : h + 'px';

}

} catch(e) {}



function saveResizerState() {

const state = {

sidebarWidth: sidebar.getBoundingClientRect().width,

boardHeight: boardContainer.getBoundingClientRect().height,

weeklyHeight: weeklyContainer.getBoundingClientRect().height

};

localStorage.setItem('TEA_RESIZERS', JSON.stringify(state));

}



function setupResizer(resizer, type) {

if (!resizer) return;

let isResizing = false;

let startX, startY, startWidth, startHeight;



function onStart(e) {

isResizing = true;

resizer.classList.add('resizing');

const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

startX = clientX;

startY = clientY;



if (type === 'sidebar') {

startWidth = sidebar.getBoundingClientRect().width;

} else if (type === 'matrix') {

startHeight = boardContainer.getBoundingClientRect().height;

} else if (type === 'weekly') {

startHeight = weeklyContainer.getBoundingClientRect().height;

}



// Disable transitions during resize for smooth dragging

if (type === 'sidebar') sidebar.style.transition = 'none';

if (type === 'matrix') {

boardContainer.style.transition = 'none';

matrixContainer.style.transition = 'none';

}

if (type === 'weekly') {

weeklyContainer.style.transition = 'none';

boardContainer.style.transition = 'none';

}

}



function onMove(e) {

if (!isResizing) return;

const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;



if (type === 'sidebar') {

// Calcula a nova largura (sidebar est� na direita, ent�o mouse pra esquerda = 
       aumenta width)

let newWidth = startWidth - (clientX - startX);

// Limites de tamanho

if (newWidth < 200) newWidth = 200;



// Limita o crescimento para manter a propor��o dos cart�es

let maxWidth = Math.min(400, window.innerWidth * 0.8);

if (newWidth > maxWidth) newWidth = maxWidth;



sidebar.style.flexBasis = newWidth + 'px';

} else if (type === 'matrix') {

// Calcula a nova altura para o board (resizer entre board e matrix)

let newHeight = startHeight + (clientY - startY);

if (newHeight < 100) newHeight = 100; // Altura m�nima do board

if (newHeight > window.innerHeight * 0.7) newHeight = window.innerHeight * 0.7; // 
       Altura m�xima

boardContainer.style.height = newHeight + 'px';

boardContainer.style.flex = 'none'; // Ensure flex-grow doesn't override height

} else if (type === 'weekly') {

let newHeight = startHeight + (clientY - startY);

if (newHeight < 150) newHeight = 150; // Altura m�nima do weekly view

if (newHeight > window.innerHeight * 0.8) newHeight = window.innerHeight * 0.8;

weeklyContainer.style.height = newHeight + 'px';

weeklyContainer.style.flex = 'none';

}

}



function onEnd(e) {

if (!isResizing) return;

isResizing = false;

resizer.classList.remove('resizing');



// Restore transitions

if (type === 'sidebar') sidebar.style.transition = '';

if (type === 'matrix') {

boardContainer.style.transition = '';

matrixContainer.style.transition = '';

}

if (type === 'weekly') {

weeklyContainer.style.transition = '';

boardContainer.style.transition = '';

}



saveResizerState();

}



resizer.addEventListener('mousedown', onStart);

resizer.addEventListener('touchstart', onStart, { passive: true });

document.addEventListener('mousemove', onMove);

document.addEventListener('touchmove', onMove, { passive: true });

document.addEventListener('mouseup', onEnd);

document.addEventListener('touchend', onEnd);

}



setupResizer(resizerSidebar, 'sidebar');

setupResizer(resizerMatrix, 'matrix');

setupResizer(resizerWeekly, 'weekly');

}



// ===== AI ASSISTANT MOTOR / CONTROLLER =====

let aiConversationHistory = [];

let recognition = null;

let isRecording = false;



function configureApiKeyDialog() {

showModal('Configurar Intelig�ncia Artificial', function() {

const div = el('div');

div.style.padding = '8px 0';

div.style.minWidth = '320px';

div.style.maxWidth = '450px';

div.style.fontFamily = 'sans-serif';

div.style.color = '#fff';

div.innerHTML = `

<div style="margin-bottom: 15px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Provedor de IA</label>

<select id="dialogAiProvider" name="dialogAiProvider" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

<option value="gemini">Google Gemini</option>

<option value="openai">OpenAI (ChatGPT / Compat�vel)</option>

<option value="anthropic">Anthropic (Claude)</option>

</select>

</div>



<!-- Painel Gemini -->

<div id="settings-gemini" class="provider-settings-panel" style="display: none;">

<div style="margin-bottom: 12px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API do Gemini</label>

<input type="password" id="dialogGeminiApiKeyInput" 
       name="dialogGeminiApiKeyInput" placeholder="Cole sua API Key do Gemini (ex: AIzaSy...)" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

</div>

<div style="margin-bottom: 12px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo do Gemini</label>

<select id="dialogGeminiModelSelect" name="dialogGeminiModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

<option value="auto">Auto (Flash/Pro Sequencial)</option>

<option value="gemini-1.5-flash">Gemini 1.5 Flash</option>

<option value="gemini-2.0-flash">Gemini 2.0 Flash</option>

<option value="gemini-2.5-flash">Gemini 2.5 Flash</option>

<option value="gemini-1.5-pro">Gemini 1.5 Pro</option>

<option value="gemini-2.0-pro-exp">Gemini 2.0 Pro Exp</option>

<option value="custom">Outro Modelo Personalizado...</option>

</select>

</div>

<div id="geminiCustomModelRow" style="margin-bottom: 12px; display: none;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

<input type="text" id="dialogGeminiCustomModelInput" 
       name="dialogGeminiCustomModelInput" placeholder="ex: gemini-2.0-pro-exp-02-05" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

</div>

</div>



<!-- Painel OpenAI -->

<div id="settings-openai" class="provider-settings-panel" style="display: none;">

<div style="margin-bottom: 12px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API da OpenAI (sk-...)</label>

<input type="password" id="dialogOpenaiApiKeyInput" 
       name="dialogOpenaiApiKeyInput" placeholder="Cole sua API Key (sk-...)" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

</div>

<div style="margin-bottom: 12px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo da OpenAI</label>

<select id="dialogOpenaiModelSelect" name="dialogOpenaiModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

<option value="gpt-4o-mini">GPT-4o Mini (Recomendado)</option>

<option value="gpt-4o">GPT-4o</option>

<option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>

<option value="custom">Outro Modelo Personalizado...</option>

</select>

</div>

<div id="openaiCustomModelRow" style="margin-bottom: 12px; display: none;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

<input type="text" id="dialogOpenaiCustomModelInput" 
       name="dialogOpenaiCustomModelInput" placeholder="ex: gpt-4-turbo" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

</div>

<div style="margin-bottom: 12px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">URL Base da API (Opcional)</label>

<input type="text" id="dialogOpenaiCustomUrlInput" 
       name="dialogOpenaiCustomUrlInput" placeholder="Padr�o: https://api.openai.com/v1" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

<span style="font-size: 11px; color: #88a3c7; display: block; margin-top: 4px; 
       line-height: 1.3;">Para usar OpenRouter, LM Studio, Ollama ou proxies de CORS.</span>

</div>

</div>



<!-- Painel Anthropic -->

<div id="settings-anthropic" class="provider-settings-panel" style="display: none;">

<div style="margin-bottom: 12px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API da Anthropic (sk-ant-...)</label>

<input type="password" id="dialogAnthropicApiKeyInput" 
       name="dialogAnthropicApiKeyInput" placeholder="Cole sua API Key (sk-ant-...)" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

</div>

<div style="margin-bottom: 12px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo da Anthropic</label>

<select id="dialogAnthropicModelSelect" name="dialogAnthropicModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

<option value="claude-3-5-sonnet-latest">Claude 3.5 Sonnet</option>

<option value="claude-3-5-haiku-latest">Claude 3.5 Haiku</option>

<option value="claude-3-opus-latest">Claude 3 Opus</option>

<option value="custom">Outro Modelo Personalizado...</option>

</select>

</div>

<div id="anthropicCustomModelRow" style="margin-bottom: 12px; display: none;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

<input type="text" id="dialogAnthropicCustomModelInput" 
       name="dialogAnthropicCustomModelInput" placeholder="ex: claude-3-haiku-20240307" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

</div>

<div style="margin-bottom: 12px;">

<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">URL Base da API (Opcional)</label>

<input type="text" id="dialogAnthropicCustomUrlInput" 
       name="dialogAnthropicCustomUrlInput" placeholder="Padr�o: https://api.anthropic.com/v1" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

<span style="font-size: 11px; color: #88a3c7; display: block; margin-top: 4px; 
       line-height: 1.3;">Requer um proxy de CORS para uso direto do navegador.</span>

</div>

</div>



<div style="margin-top: 15px; font-size: 11px; color: #ffa726; line-height: 1.4; 
       border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 10px;">

<span>?? Suas credenciais s�o salvas <strong>localmente</strong> no seu navegador 
       (localStorage) com seguran�a.</span>

</div>

`;



// Setup events and load values

const providerSelect = div.querySelector('#dialogAiProvider');

const geminiModelSelect = div.querySelector('#dialogGeminiModelSelect');

const openaiModelSelect = div.querySelector('#dialogOpenaiModelSelect');

const anthropicModelSelect = div.querySelector('#dialogAnthropicModelSelect');



function updatePanelVisibility() {

const provider = providerSelect.value;

div.querySelectorAll('.provider-settings-panel').forEach(p => p.style.display = 'none');

div.querySelector('#settings-' + provider).style.display = 'block';

}



geminiModelSelect.addEventListener('change', () => {

div.querySelector('#geminiCustomModelRow').style.display = geminiModelSelect.value === 
       'custom' ? 'block' : 'none';

});

openaiModelSelect.addEventListener('change', () => {

div.querySelector('#openaiCustomModelRow').style.display = openaiModelSelect.value === 
       'custom' ? 'block' : 'none';

});

anthropicModelSelect.addEventListener('change', () => {

div.querySelector('#anthropicCustomModelRow').style.display = 
       anthropicModelSelect.value === 'custom' ? 'block' : 'none';

});



providerSelect.addEventListener('change', updatePanelVisibility);



// Load saved values

const savedProvider = localStorage.getItem('ai-provider') || 'gemini';

providerSelect.value = savedProvider;



// Load Gemini

div.querySelector('#dialogGeminiApiKeyInput').value = 
       localStorage.getItem('gemini-api-key') || '';

const savedGeminiModel = localStorage.getItem('gemini-model') || 'auto';

if (['auto', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro', 
       'gemini-2.0-pro-exp'].includes(savedGeminiModel)) {

geminiModelSelect.value = savedGeminiModel;

} else {

geminiModelSelect.value = 'custom';

div.querySelector('#dialogGeminiCustomModelInput').value = savedGeminiModel;

div.querySelector('#geminiCustomModelRow').style.display = 'block';

}



// Load OpenAI

div.querySelector('#dialogOpenaiApiKeyInput').value = 
       localStorage.getItem('openai-api-key') || '';

const savedOpenaiModel = localStorage.getItem('openai-model') || 'gpt-4o-mini';

if (['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'].includes(savedOpenaiModel)) {

openaiModelSelect.value = savedOpenaiModel;

} else {

openaiModelSelect.value = 'custom';

div.querySelector('#dialogOpenaiCustomModelInput').value = savedOpenaiModel;

div.querySelector('#openaiCustomModelRow').style.display = 'block';

}

div.querySelector('#dialogOpenaiCustomUrlInput').value = 
       localStorage.getItem('openai-custom-url') || '';



// Load Anthropic

div.querySelector('#dialogAnthropicApiKeyInput').value = 
       localStorage.getItem('anthropic-api-key') || '';

const savedAnthropicModel = localStorage.getItem('anthropic-model') || 
       'claude-3-5-sonnet-latest';

if (['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 
       'claude-3-opus-latest'].includes(savedAnthropicModel)) {

anthropicModelSelect.value = savedAnthropicModel;

} else {

anthropicModelSelect.value = 'custom';

div.querySelector('#dialogAnthropicCustomModelInput').value = savedAnthropicModel;

div.querySelector('#anthropicCustomModelRow').style.display = 'block';

}

div.querySelector('#dialogAnthropicCustomUrlInput').value = 
       localStorage.getItem('anthropic-custom-url') || '';



updatePanelVisibility();

return div;

}, function(body) {

const provider = body.querySelector('#dialogAiProvider').value;

localStorage.setItem('ai-provider', provider);



// Save Gemini

const geminiKey = body.querySelector('#dialogGeminiApiKeyInput').value.trim();

if (geminiKey) localStorage.setItem('gemini-api-key', geminiKey);

else localStorage.removeItem('gemini-api-key');



const geminiSel = body.querySelector('#dialogGeminiModelSelect').value;

const geminiModel = geminiSel === 'custom' ? 
       body.querySelector('#dialogGeminiCustomModelInput').value.trim() : geminiSel;

localStorage.setItem('gemini-model', geminiModel || 'auto');



// Save OpenAI

const openaiKey = body.querySelector('#dialogOpenaiApiKeyInput').value.trim();

if (openaiKey) localStorage.setItem('openai-api-key', openaiKey);

else localStorage.removeItem('openai-api-key');



const openaiSel = body.querySelector('#dialogOpenaiModelSelect').value;

const openaiModel = openaiSel === 'custom' ? 
       body.querySelector('#dialogOpenaiCustomModelInput').value.trim() : openaiSel;

localStorage.setItem('openai-model', openaiModel || 'gpt-4o-mini');



const openaiUrl = body.querySelector('#dialogOpenaiCustomUrlInput').value.trim();

if (openaiUrl) localStorage.setItem('openai-custom-url', openaiUrl);

else localStorage.removeItem('openai-custom-url');



// Save Anthropic

const anthropicKey = body.querySelector('#dialogAnthropicApiKeyInput').value.trim();

if (anthropicKey) localStorage.setItem('anthropic-api-key', anthropicKey);

else localStorage.removeItem('anthropic-api-key');



const anthropicSel = body.querySelector('#dialogAnthropicModelSelect').value;

const anthropicModel = anthropicSel === 'custom' ? 
       body.querySelector('#dialogAnthropicCustomModelInput').value.trim() : anthropicSel;

localStorage.setItem('anthropic-model', anthropicModel || 'claude-3-5-sonnet-latest');



const anthropicUrl = body.querySelector('#dialogAnthropicCustomUrlInput').value.trim();

if (anthropicUrl) localStorage.setItem('anthropic-custom-url', anthropicUrl);

else localStorage.removeItem('anthropic-custom-url');



alert("Configura��es de IA salvas com sucesso!");

});

}



function initSpeechRecognition() {

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {

console.log("Speech recognition not supported in this browser.");

const micBtn = document.getElementById('aiMicBtn');

if (micBtn) micBtn.style.display = 'none';

return;

}



recognition = new SpeechRecognition();

recognition.lang = 'pt-BR';

recognition.interimResults = false;

recognition.maxAlternatives = 1;



recognition.onstart = function() {

isRecording = true;

const micBtn = document.getElementById('aiMicBtn');

if (micBtn) {

micBtn.classList.add('recording');

micBtn.textContent = '??';

}

const sw = document.getElementById('aiSoundwave');

if (sw) sw.classList.add('active');

showAiResponseBubble("Ouvindo... Fale agora.", false, false);

};



recognition.onend = function() {

isRecording = false;

const micBtn = document.getElementById('aiMicBtn');

if (micBtn) {

micBtn.classList.remove('recording');

micBtn.textContent = '???';

}

const sw = document.getElementById('aiSoundwave');

if (sw) sw.classList.remove('active');

};



recognition.onerror = function(event) {

console.error("Speech recognition error", event.error);

showAiResponseBubble("Erro na grava��o de voz: " + event.error, false, true);

};



recognition.onresult = function(event) {

const transcript = event.results[0][0].transcript;

const inputEl = document.getElementById('aiInput');

if (inputEl) {

inputEl.value = transcript;

submitAiCommand();

}

};

}



function toggleVoiceRecord() {

if (!recognition) {

alert("O reconhecimento de voz n�o � suportado pelo seu navegador.");

return;

}

if (isRecording) {

recognition.stop();

} else {

recognition.start();

}

}



function showAiResponseBubble(message, isQuestion = false, isError = false) {

const bubble = document.getElementById('aiResponseBubble');

if (!bubble) return;



bubble.innerHTML = '';

if (isError) {

const errDiv = el('div', 'ai-error');

errDiv.textContent = message;

bubble.appendChild(errDiv);

} else if (isQuestion) {

const qDiv = el('div', 'ai-question');

qDiv.textContent = message;

bubble.appendChild(qDiv);

} else {

const expDiv = el('div', 'ai-explanation');

expDiv.textContent = message;

bubble.appendChild(expDiv);

}



bubble.classList.add('active');



if (!isQuestion && !isError && message !== 'Processando...') {

setTimeout(() => {

if (bubble.textContent === message) {

bubble.classList.remove('active');

}

}, 8000);

}

}



async function submitAiCommand() {

const inputEl = document.getElementById('aiInput');

if (!inputEl) return;

const text = inputEl.value.trim();

if (!text) return;



inputEl.value = '';

showAiResponseBubble('Processando...', false, false);



aiConversationHistory.push({ role: 'user', parts: [{ text: text }] });



const activeBoardMeta = boardsMeta.find(b => b.id === currentBoardId);

const activeBoardName = activeBoardMeta ? activeBoardMeta.name : 'Principal';

const existingBoards = boardsMeta.map(b => b.name);

const activeBoardLists = $$('.list[data-type="kanban"]', boardEl).map(l => 
       l.querySelector('.title').value);



const sysPrompt = `Voc� � a intelig�ncia artificial de controle do TEA Planner, um aplicativo 
       de produtividade que mistura Kanban, Matriz de Eisenhower (Q1, Q2, Q3, Q4) e Agenda com compromissos di�rios.



Seu objetivo � analisar o comando em linguagem natural do usu�rio (em portugu�s) e retornar um JSON contendo 
       uma lista de a��es estruturadas para o aplicativo executar.



A data de hoje no sistema �: ${getActiveDay()}.

O quadro ativo atualmente �: "${activeBoardName}".

Os quadros existentes no sistema s�o: ${JSON.stringify(existingBoards)}.

As listas no quadro ativo atualmente s�o: ${JSON.stringify(activeBoardLists)}.



Voc� deve analisar o comando e responder estritamente com um JSON no seguinte formato, sem formata��o markdown 
       (como blocos de c�digo \`\`\`json), sem textos adicionais antes ou depois.



Formato de Resposta Esperado:

{

"explanation": "Uma frase amig�vel explicando o que voc� entendeu e vai fazer.",

"question": "Se o comando for amb�guo ou necessitar de esclarecimento (por exemplo, criar uma lista mas 
       existem m�ltiplos quadros e o usu�rio n�o especificou qual, ou criar uma lista de compras mas n�o disse o nome 
       da lista), fa�a a pergunta aqui. Se 'question' estiver preenchido, o array 'actions' DEVE estar vazio.",

"actions": [

// Array de a��es a serem executadas em ordem. Pode ser vazio.

{

"type": "SWITCH_BOARD",

"boardName": "Nome exato do quadro para o qual mudar"

},

{

"type": "CREATE_LIST",

"boardName": "Nome do quadro", // Opcional (assume o atual se omitido)

"listTitle": "Nome da Lista"

},

{

"type": "CREATE_CARDS",

"boardName": "Nome do quadro", // Opcional (assume o atual se omitido)

"listTitle": "Nome da Lista",  // Opcional se for para Matriz ou Agenda

"quadrant": "Q1" | "Q2" | "Q3" | "Q4", // Opcional (s� preencha se for para a Matriz de Eisenhower)

"time": "HH:MM", // Opcional (s� preencha se for para a Agenda, ex: "10:00")

"goal": true | false, // Opcional (se for o Objetivo do Dia na agenda)

"cards": [

{

"text": "Texto do cart�o",

"color": "#hex_opcional",

"due": "YYYY-MM-DD" // Opcional (prazo final, formato YYYY-MM-DD)

}

]

},

{

"type": "COMPLETE_CARDS",

"timeRange": "morning" | "afternoon" | "evening" | "night" | "all", // Opcional (para completar 
       compromissos do per�odo da manh�/tarde/noite/tudo)

"time": "HH:MM", // Opcional (completar compromisso de um hor�rio espec�fico)

"listTitle": "Nome da Lista", // Opcional (completar todos os cart�es desta lista no kanban)

"quadrant": "Q1" | "Q2" | "Q3" | "Q4", // Opcional (completar todos os cart�es deste quadrante)

"all": true | false // Opcional

},

{

"type": "COPY_PASTE_AGENDA",

"fromDay": "YYYY-MM-DD",

"toDay": "YYYY-MM-DD"

},

{

"type": "DELETE_LIST",

"listTitle": "Nome da Lista"

},

{

"type": "DELETE_CARD",

"cardText": "Texto ou trecho do cartão a ser deletado"

},

{

"type": "DUPLICATE_CARD",

"cardText": "Texto ou trecho do cartão a ser duplicado"

},

{

"type": "MOVE_CARD",

"cardText": "Texto ou trecho do cartão a ser movido",

"targetListTitle": "Nome da lista destino, ou quadrante como Q1/Q2/Q3/Q4, ou horário como HH:MM",

"targetBoardName": "Nome do quadro de destino"

},

{

"type": "MOVE_LIST",

"listTitle": "Nome da lista a ser movida",

"targetBoardName": "Nome do quadro de destino"

},

{

"type": "CHANGE_THEME",

"color": "Cor desejada (pode ser o nome em português como verde, azul, rosa ou o hex da cor)"

},

{

"type": "START_TIMER",

"cardText": "Texto do cartão para o qual iniciar o timer"

},

{

"type": "PAUSE_TIMER",

"cardText": "Texto do cartão para o qual pausar o timer"

},

{

"type": "TOGGLE_PANEL",

"panel": "kanban" | "matrix" | "agenda" | "weekly"

}

]

}



Regras Importantes:

1. Sempre responda em formato JSON v�lido e parse�vel pelo JSON.parse(). N�o retorne explica��es fora do JSON.

2. Identifique datas relativas baseadas no dia de hoje: "hoje" � ${getActiveDay()}, "amanh�" � o dia seguinte, 
       "ontem" � o dia anterior, etc.

3. Se o usu�rio quiser criar cart�es na agenda, use "time" ou "goal". Exemplo: "Consulta m�dica 10h" -> type: 
       CREATE_CARDS com time: "10:00".

4. Se o usu�rio quiser criar uma lista e cart�es (ex: "lista de feira com batata e brocolis"), e houver 
       m�ltiplos quadros no sistema, mas ele n�o disser em qual quadro: pergunte em qual quadro ele deseja criar 
       preenchendo o campo "question".

5. Se houver apenas 1 quadro cadastrado no sistema al�m da Lixeira, crie a lista diretamente nele sem perguntar.

6. Se o usu�rio disser para copiar a agenda de ontem para hoje, retorne uma a��o do tipo COPY_PASTE_AGENDA com 
       fromDay = ontem e toDay = hoje.

7. Se o usu�rio disser "marcar como feito as atividades da manh�", retorne complete_cards com timeRange = 
       "morning". A manh� corresponde a qualquer hor�rio de 06:00 a 11:30.

8. Mantenha os nomes de quadros e listas consistentes com os j� existentes, se houver similaridade sem�ntica 
       (ex: "pessoal" e "Pessoal").

9. Se o usu�rio pedir para deletar/excluir/apagar uma lista, use DELETE_LIST.

10. Se o usu�rio pedir para deletar/excluir/apagar um cart�o, use DELETE_CARD.

11. Se o usu�rio pedir para duplicar um cart�o, use DUPLICATE_CARD.

12. Se o usu�rio pedir para mover um cart�o para outra lista, quadrante, hor�rio ou outro quadro, use MOVE_CARD.

13. Se o usu�rio pedir para mover uma lista inteira para outro quadro, use MOVE_LIST.

14. Se o usu�rio pedir para mudar o tema, a cor ou o fundo do quadro para uma cor espec�fica, use CHANGE_THEME.

15. Se o usu�rio pedir para iniciar o timer/cron�metro de um cart�o, use START_TIMER.

16. Se o usu�rio pedir para pausar o timer/cron�metro de um cart�o, use PAUSE_TIMER.

17. Se o usu�rio pedir para abrir/fechar/esconder/mostrar a matriz, agenda, semana/vis�o semanal ou o 
       quadro/kanban, use TOGGLE_PANEL.

`;



const contents = [

{ role: 'user', parts: [{ text: sysPrompt + "\n\nAgora processe o seguinte di�logo com o 
       usu�rio:\n" }] }

];



aiConversationHistory.forEach(turn => {

contents.push(turn);

});



try {

const responseText = await callGemini(contents);



let responseJson;

try {

let cleanedText = responseText.trim();

if (cleanedText.startsWith('```')) {

cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```$/, '').trim();

}

responseJson = JSON.parse(cleanedText);

} catch (parseErr) {

console.error("Gemini did not return valid JSON. Raw response: ", responseText);

showAiResponseBubble("Desculpe, n�o consegui entender o comando estruturado. Por favor 
       tente reescrever.", false, true);

aiConversationHistory.pop();

return;

}



aiConversationHistory.push({ role: 'model', parts: [{ text: JSON.stringify(responseJson) }] 
       });



if (responseJson.question) {

showAiResponseBubble(responseJson.question, true, false);

} else {

if (responseJson.actions && responseJson.actions.length > 0) {

executeAiActions(responseJson.actions);

}

showAiResponseBubble(responseJson.explanation || 'Comando executado com sucesso!', 
       false, false);

aiConversationHistory = [];

}

} catch (apiErr) {

console.error("Gemini API call failed: ", apiErr);

const errorMsg = apiErr.message || "Erro desconhecido. Verifique sua chave API e conex�o.";

showAiResponseBubble(`Erro da API: ${errorMsg}`, false, true);

aiConversationHistory.pop();

}

}



function executeAiActions(actions) {

actions.forEach(action => {

try {

switch (action.type) {

case 'SWITCH_BOARD':

if (action.boardName) {

const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

if (board) {

switchBoard(board.id);

}

}

break;



case 'CREATE_LIST':

{

let boardId = currentBoardId;

if (action.boardName) {

const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

if (board) {

boardId = board.id;

if (boardId !== currentBoardId) {

switchBoard(boardId);

}

}

}

let listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());

if (!listEl) {

createList(action.listTitle);

persist();

}

}

break;



case 'CREATE_CARDS':

{

let boardId = currentBoardId;

if (action.boardName) {

const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

if (board) {

boardId = board.id;

if (boardId !== currentBoardId) {

switchBoard(boardId);

}

}

}



let container = null;

let whenVal = "";



if (action.time) {

whenVal = getActiveDay() + 'T' + action.time;

const slot = 
       slotsRoot.querySelector(`.list.slot[data-time="${action.time}"]`);

if (slot) container = slot.querySelector('.cards');

} else if (action.goal) {

whenVal = getActiveDay() + 'TGOAL';

const goalSlot = slotsRoot.querySelector('.list.goal-slot');

if (goalSlot) container = goalSlot.querySelector('.cards');

} else if (action.quadrant) {

const quadList = 
       matrixEl.querySelector(`.list[data-quad="${action.quadrant}"]`);

if (quadList) container = quadList.querySelector('.cards');

} else {

let listTitle = action.listTitle || "Para Fazer";

let listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === listTitle.toLowerCase().trim());

if (!listEl) {

listEl = createList(listTitle);

}

container = listEl.querySelector('.cards');

}



if (container && action.cards) {

action.cards.forEach(cData => {

const cardData = {

text: cData.text,

color: cData.color || (action.quadrant ? 
       MATRIX_COLORS[action.quadrant] : ""),

due: cData.due || "",

when: whenVal,

timerTotal: cData.timerTotal ? String(cData.timerTotal) : ""

};

const newCard = createCard(cardData);

container.appendChild(newCard);

});

persist();

updateSlotsHasItems();

updateTotalTimerDisplay();

}

}

break;



case 'COMPLETE_CARDS':

{

let targetCards = [];

if (action.timeRange) {

allCards.forEach(c => {

if (c.dataset.when && /T\d{2}:\d{2}$/.test(c.dataset.when)) {

const timeStr = c.dataset.when.split('T')[1];

const hour = parseInt(timeStr.split(':')[0], 10);

let match = false;

if (action.timeRange === 'morning' && hour >= 6 && hour < 12) 
       match = true;

else if (action.timeRange === 'afternoon' && hour >= 12 && hour 
       < 18) match = true;

else if ((action.timeRange === 'evening' || action.timeRange 
       === 'night') && hour >= 18 && hour <= 23) match = true;

else if (action.timeRange === 'all') match = true;



if (match && c.dataset.completed !== 'true') {

targetCards.push(c);

}

}

});

} else if (action.time) {

const whenVal = getActiveDay() + 'T' + action.time;

allCards.forEach(c => {

if (c.dataset.when === whenVal && c.dataset.completed !== 'true') {

targetCards.push(c);

}

});

} else if (action.quadrant) {

const quadList = 
       matrixEl.querySelector(`.list[data-quad="${action.quadrant}"]`);

if (quadList) {

$$( '.card', quadList).forEach(c => {

const cardInCache = allCards.find(cacheCard => cacheCard === c);

if (cardInCache && cardInCache.dataset.completed !== 'true') {

targetCards.push(cardInCache);

}

});

}

} else if (action.listTitle) {

const listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());

if (listEl) {

$$( '.card', listEl).forEach(c => {

const cardInCache = allCards.find(cacheCard => cacheCard === c);

if (cardInCache && cardInCache.dataset.completed !== 'true') {

targetCards.push(cardInCache);

}

});

}

} else if (action.all) {

allCards.forEach(c => {

if (c.dataset.completed !== 'true') {

targetCards.push(c);

}

});

}



if (targetCards.length > 0) {

targetCards.forEach(card => {

card.dataset.completed = 'true';

card.classList.remove('timer-finished');

if (card.dataset.timerState === 'finished') {

card.dataset.timerState = 'stopped';

}

updateTimerDisplay(card);

});

persist();

updateSlotsHasItems();

}

}

break;



case 'COPY_PASTE_AGENDA':

if (action.fromDay && action.toDay) {

copyAgendaFromTo(action.fromDay, action.toDay);

}

break;



case 'DELETE_LIST':

if (action.listTitle) {

const listEl = Array.from(document.querySelectorAll('.list')).find(l => {

const titleInput = l.querySelector('.title');

return titleInput && titleInput.value.toLowerCase().trim() === 
       action.listTitle.toLowerCase().trim();

});

if (listEl) {

listEl.remove();

persist();

}

}

break;



case 'DELETE_CARD':

if (action.cardText) {

const targetCard = allCards.find(c => {

const textEl = c.querySelector('.text');

return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

});

if (targetCard) {

removeCard(targetCard);

}

}

break;



case 'DUPLICATE_CARD':

if (action.cardText) {

const targetCard = allCards.find(c => {

const textEl = c.querySelector('.text');

return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

});

if (targetCard) {

duplicateCards([targetCard]);

}

}

break;



case 'MOVE_CARD':

if (action.cardText) {

const targetCard = allCards.find(c => {

const textEl = c.querySelector('.text');

return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

});

if (targetCard) {

if (action.targetBoardName) {

const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.targetBoardName.toLowerCase().trim());

if (board) {

moveCardToBoard(targetCard, board.id, action.targetListTitle || 
       'Inbox');

}

} else if (action.targetListTitle) {

const qUpper = action.targetListTitle.toUpperCase().trim();

if (['Q1', 'Q2', 'Q3', 'Q4'].includes(qUpper)) {

const quadList = 
       matrixEl.querySelector(`.list[data-quad="${qUpper}"]`);

if (quadList) {

quadList.querySelector('.cards').appendChild(targetCard);

targetCard.dataset.when = '';

targetCard.dataset.color = MATRIX_COLORS[qUpper];

paintCard(targetCard);

persist();

updateSlotsHasItems();

}

} else if (/^\d{2}:\d{2}$/.test(action.targetListTitle.trim())) {

const timeVal = action.targetListTitle.trim();

const slot = 
       slotsRoot.querySelector(`.list.slot[data-time="${timeVal}"]`);

if (slot) {

slot.querySelector('.cards').appendChild(targetCard);

targetCard.dataset.when = getActiveDay() + 'T' + timeVal;

paintCard(targetCard);

persist();

updateSlotsHasItems();

}

} else {

const listEl = $$('.list[data-type="kanban"]', boardEl).find(l 
       => {

const titleInput = l.querySelector('.title');

return titleInput && titleInput.value.toLowerCase().trim() 
       === action.targetListTitle.toLowerCase().trim();

});

if (listEl) {

listEl.querySelector('.cards').appendChild(targetCard);

targetCard.dataset.when = '';

paintCard(targetCard);

persist();

updateSlotsHasItems();

}

}

}

}

}

break;



case 'MOVE_LIST':

if (action.listTitle && action.targetBoardName) {

const listEl = Array.from(document.querySelectorAll('.list')).find(l => {

const titleInput = l.querySelector('.title');

return titleInput && titleInput.value.toLowerCase().trim() === 
       action.listTitle.toLowerCase().trim();

});

const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.targetBoardName.toLowerCase().trim());

if (listEl && board) {

moveListToBoard(listEl, board.id);

}

}

break;



case 'CHANGE_THEME':

if (action.color) {

const board = boardsMeta.find(b => b.id === currentBoardId);

if (board) {

let selectedColor = null;

const inputColor = action.color.toLowerCase().trim();

if (THEMES[inputColor]) {

selectedColor = inputColor;

} else {

const foundTheme = Object.values(THEMES).find(t => 
       t.name.toLowerCase().includes(inputColor) || inputColor.includes(t.name.toLowerCase()));

if (foundTheme) {

selectedColor = foundTheme.brand;

} else {

const colorMap = {

'azul': '#1976d2',

'verde': '#2e7d32',

'roxo': '#7b1fa2',

'laranja': '#e65100',

'vermelho': '#c62828',

'cinza': '#37474f',

'ciano': '#00838f',

'rosa': '#ad1457',

'marrom': '#8d6e63',

'indigo': '#3f51b5',

'amarelo': '#ffb300',

'esmeralda': '#00c853',

'cyberpunk': '#ff007f',

'menta': '#00e676',

'oceano': '#00b0ff',

'rose': '#ec407a',

'grafite': '#607d8b'

};

for (const [key, val] of Object.entries(colorMap)) {

if (inputColor.includes(key)) {

selectedColor = val;

break;

}

}

}

}

if (selectedColor) {

board.color = selectedColor;

setBoardTheme(selectedColor);

saveBoardsMetadata();

}

}

}

break;



case 'START_TIMER':

if (action.cardText) {

const targetCard = allCards.find(c => {

const textEl = c.querySelector('.text');

return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

});

if (targetCard) {

var state = targetCard.dataset.timerState || 'stopped';

var total = parseInt(targetCard.dataset.timerTotal || '0', 10);

if (total === 0) {

total = 25 * 60;

targetCard.dataset.timerTotal = total;

targetCard.dataset.timerLeft = total;

}

targetCard.dataset.timerState = 'running';

var left = parseInt(targetCard.dataset.timerLeft, 10);

if (state === 'finished' || left <= 0) left = total;

targetCard.dataset.timerEnd = Date.now() + left * 1000;

targetCard.style.animation = '';

startGlobalTimer();

updateTimerDisplay(targetCard);

persist();

}

}

break;



case 'PAUSE_TIMER':

if (action.cardText) {

const targetCard = allCards.find(c => {

const textEl = c.querySelector('.text');

return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

});

if (targetCard) {

var state = targetCard.dataset.timerState || 'stopped';

if (state === 'running') {

targetCard.dataset.timerState = 'paused';

var now = Date.now();

var end = parseInt(targetCard.dataset.timerEnd, 10);

targetCard.dataset.timerLeft = Math.round((end - now) / 1000);

updateTimerDisplay(targetCard);

persist();

}

}

}

break;



case 'TOGGLE_PANEL':

if (action.panel) {

const panelLower = action.panel.toLowerCase().trim();

if (panelLower === 'kanban' || panelLower === 'quadro') {

document.getElementById('toggleBoardBtn').click();

} else if (panelLower === 'matrix' || panelLower === 'matriz') {

document.getElementById('toggleMatrixBtn').click();

} else if (panelLower === 'agenda') {

document.getElementById('toggleAgendaBtn').click();

} else if (panelLower === 'weekly' || panelLower === 'semana' || panelLower 
       === 'semanal') {

document.getElementById('toggleWeeklyBtn').click();

}

}

break;

}

} catch (err) {

console.error("Erro executando a��o da IA:", action, err);

}

});

}



function copyAgendaFromTo(fromDay, toDay) {

if (fromDay === toDay) return;

const cardsToCopy = allCards.filter(c => (c.dataset.when || '').startsWith(fromDay + 
       'T')).map(c => ({

...cardToData(c),

timeOrGoal: (c.dataset.when || '').substring(11)

}));

cardsToCopy.forEach(cardData => {

const newData = { ...cardData };

newData.when = toDay + 'T' + newData.timeOrGoal;

const existsInCache = allCards.some(c => c.dataset.when === newData.when && 
       c.querySelector('.text').textContent.trim() === newData.text.trim());

if (!existsInCache) {

createCard(newData);

}

});

updateSlotsHasItems();

persist();

}



function initAiControls() {

const sendBtn = document.getElementById('aiSendBtn');

if (sendBtn) sendBtn.addEventListener('click', submitAiCommand);



const inputEl = document.getElementById('aiInput');

if (inputEl) {

inputEl.addEventListener('keydown', function(e) {

if (e.key === 'Enter') {

e.preventDefault();

submitAiCommand();

}

});

}



const configBtn = document.getElementById('aiConfigBtn');

if (configBtn) configBtn.addEventListener('click', configureApiKeyDialog);



const micBtn = document.getElementById('aiMicBtn');

if (micBtn) micBtn.addEventListener('click', toggleVoiceRecord);



initSpeechRecognition();

}



function initApp() {

// Auto-generated backup fallback



