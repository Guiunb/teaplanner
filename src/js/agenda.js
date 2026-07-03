            // ===== Modal helpers + Paleta =====
            var MATRIX_COLORS = { Q1: '#104239', Q2: '#0e3155', Q3: '#5a4014', Q4: '#5a1419' };
            var customColorLabels = JSON.parse(localStorage.getItem(LS_LABELS_KEY)) || {
                '#5dade2': 'Azul claro (Krav Maga)', '#f9e79f': 'Amarelo claro (GDF)', '#f5b041': 'Laranja (Pessoal)',
                '#1abc9c': 'Verde-água', '#8e44ad': 'Lilás', '#1f3a93': 'Azul escuro', '#2c3e50': 'Grafite', '#48c9b0': 'Turquesa'
            };
            function saveCustomLabels() { localStorage.setItem(LS_LABELS_KEY, JSON.stringify(customColorLabels)); }
            var EXTRA_COLORS = [];
            function buildFullPalette() {
                EXTRA_COLORS = [
                    { id: 'krav', name: customColorLabels['#5dade2'] || 'Azul claro (Krav Maga)', hex: '#5dade2' },
                    { id: 'gdf', name: customColorLabels['#f9e79f'] || 'Amarelo claro (GDF)', hex: '#f9e79f' },
                    { id: 'pessoal', name: customColorLabels['#f5b041'] || 'Laranja (Pessoal)', hex: '#f5b041' },
                    { id: 'teal', name: customColorLabels['#1abc9c'] || 'Verde-água', hex: '#1abc9c' },
                    { id: 'lilas', name: customColorLabels['#8e44ad'] || 'Lilás', hex: '#8e44ad' },
                    { id: 'navy', name: customColorLabels['#1f3a93'] || 'Azul escuro', hex: '#1f3a93' },
                    { id: 'grafite', name: customColorLabels['#2c3e50'] || 'Grafite', hex: '#2c3e50' },
                    { id: 'turquesa', name: customColorLabels['#48c9b0'] || 'Turquesa', hex: '#48c9b0' }
                ];
                return [
                    { id: 'q1', name: 'Verde (Faça agora)', hex: '#2e7d32', noEdit: true },
                    { id: 'q2', name: 'Azul (Agende)', hex: '#1976d2', noEdit: true },
                    { id: 'q3', name: 'Âmbar (Delegue)', hex: '#ffb300', noEdit: true },
                    { id: 'q4', name: 'Vermelho (Elimine)', hex: '#c62828', noEdit: true }
                ].concat(EXTRA_COLORS);
            }
            function routeByColor(card, hex) { if (!hex || !matrixEl) return; var map = {}; map[MATRIX_COLORS.Q1] = 'Q1'; map[MATRIX_COLORS.Q2] = 'Q2'; map[MATRIX_COLORS.Q3] = 'Q3'; map[MATRIX_COLORS.Q4] = 'Q4'; var quad = map[(hex || '').toLowerCase()]; if (!quad) return; var dest = matrixEl.querySelector('.list[data-quad="' + quad + '"] .cards'); if (dest) { dest.appendChild(card); card.dataset.when = ''; updateSlotsHasItems(); } }

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
                    if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON' && !document.activeElement.closest('.import-options')) { e.preventDefault(); ok.click(); }
                    else if (e.key === 'Escape') { e.preventDefault(); cancel.click(); }
                };
                wrap.setAttribute('tabindex', '-1'); wrap.focus(); wrap.addEventListener('keydown', modalKeyListener);
                cancel.onclick = function () { wrap.removeEventListener('keydown', modalKeyListener); document.body.removeChild(wrap); };
                ok.onclick = function () { wrap.removeEventListener('keydown', modalKeyListener); onOk(body, wrap); if (wrap.parentNode === document.body) document.body.removeChild(wrap); persist(); };
                var firstInput = body.querySelector('input'); if (firstInput) firstInput.focus();
                return { wrap: wrap, okButton: ok, cancelButton: cancel, body: body };
            }

            function showConfirm(message, onYes) { showModal('Confirmação', function () { var d = el('div'); d.textContent = message; return d; }, function (body, wrap) { if (typeof onYes === 'function') onYes(); }); }

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
                        { name: 'Faça (Verde)', hex: '#2e7d32' },
                        { name: 'Agende (Azul)', hex: '#1976d2' },
                        { name: 'Delegue (Amarelo)', hex: '#ffb300' },
                        { name: 'Elimine (Vermelho)', hex: '#c62828' }
                    ];

                    eisenhowerList.forEach(p => {
                        var b = el('button');
                        b.type = 'button';
                        b.style.border = '1px solid #2a4e78';
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
                        bNone.style.border = '1px solid #2a4e78';
                        bNone.style.borderRadius = '8px';
                        bNone.style.padding = '10px';
                        bNone.style.cursor = 'pointer';
                        bNone.style.background = '#0b2240';
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
                            b.style.border = '1px solid #2a4e78';
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
                    addArea.style.borderTop = '1px solid #24314a';
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
                    colorPicker.value = '#9f9f9f';
                    colorPicker.style.border = 'none';
                    colorPicker.style.background = 'transparent';
                    colorPicker.style.width = '38px';
                    colorPicker.style.height = '38px';
                    colorPicker.style.cursor = 'pointer';

                    var labelInput = el('input');
                    labelInput.type = 'text';
                    labelInput.placeholder = 'Nome da Etiqueta';
                    labelInput.style.flex = '1';
                    labelInput.style.padding = '8px';
                    labelInput.style.background = '#0b2240';
                    labelInput.style.border = '1px solid #2a4e78';
                    labelInput.style.borderRadius = '8px';
                    labelInput.style.color = '#fff';

                    var addBtn = el('button');
                    addBtn.type = 'button';
                    addBtn.textContent = 'Adicionar';
                    addBtn.style.padding = '8px 12px';
                    addBtn.style.background = '#1976d2';
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

                    // Area de gestão (excluir etiquetas)
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
                            delBtn.textContent = '🗑️';
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
                        return; // Se estiver no modo gestão, o OK apenas fecha o modal após salvar
                    }
                    var v = (body._chosen === undefined) ? (cards[0].dataset.labelColor || '') : body._chosen;
                    cards.forEach(function (c) { 
                        c.dataset.labelColor = v || ''; 
                        paintCard(c); 
                    });
                    persist();
                });

                const manageBtn = el('button'); 
                manageBtn.textContent = 'Gerir Etiquetas 🏷️'; 
                manageBtn.className = 'manage-labels-btn';
                
                let isManaging = false;
                manageBtn.onclick = function (e) {
                    e.preventDefault(); 
                    isManaging = !isManaging;
                    modalElements.body._isManaging = isManaging;
                    modalElements.body._toggleManage(isManaging);
                    manageBtn.textContent = isManaging ? 'Voltar à Seleção' : 'Gerir Etiquetas 🏷️';
                    modalElements.okButton.textContent = isManaging ? 'Concluído' : 'OK';
                };
                modalElements.wrap.querySelector('.row').prepend(manageBtn);
            }

            function openDateDialog(cards) { if (!cards.length) return; showModal('Editar data', function () { var r = el('div'); var i = el('input'); i.type = 'date'; if (cards[0].dataset.due) i.value = cards[0].dataset.due; r.appendChild(i); return r; }, function (r, wrap) { var v = r.querySelector('input').value; cards.forEach(function (c) { c.dataset.due = v || ''; paintCard(c); }); applyFilters(); }); }
            function openTimerDialog(cards, onOkCallback) {
                if (!cards.length) return;
                var modalElements = showModal('Definir Timer (minutos)', function () {
                    var r = el('div');
                    var timerVal = Math.round(parseInt(cards[0].dataset.timerTotal || '0', 10) / 60) || '';
                    r.innerHTML = `<label style="display: block;">Tempo para o timer (em minutos):<input type="number" class="timer-input" placeholder="Ex: 25" value="${timerVal}" style="width:100%; padding:8px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; margin-top: 4px;"></label>`;
                    const input = r.querySelector('.timer-input'); if (input) { input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); modalElements.okButton.click(); } }); }
                    return r;
                }, function (r, wrap) {
                    var timerMins = r.querySelector('.timer-input').value;
                    cards.forEach(function (c) {
                        var newTotal = (parseInt(timerMins, 10) || 0) * 60;
                        c.dataset.timerTotal = newTotal; c.dataset.timerLeft = newTotal; c.dataset.timerState = 'stopped';
                        c.style.animation = ''; c.classList.remove('timer-running', 'timer-finished'); paintCard(c); if(typeof updateTimerDisplay === 'function') updateTimerDisplay(c);
                    });
                    applyFilters(); updateTotalTimerDisplay(); if (typeof persist === 'function') persist(); if (onOkCallback) onOkCallback();
                });
                modalElements.cancelButton.onclick = function () { modalElements.wrap.removeEventListener('keydown', modalElements.modalKeyListener); document.body.removeChild(modalElements.wrap); persist(); }
            }
            function openColorFilters() {
                var PALETTE = [{ name: 'Todas', hex: '*' }, { name: 'Sem cor', hex: '' }].concat(buildFullPalette().map(function (p) { return { name: p.name, hex: p.hex }; }));
                showModal('Filtrar por cor', function () {
                    var wrap = el('div'); wrap.style.display = 'grid'; wrap.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))'; wrap.style.gap = '8px';
                    PALETTE.forEach(function (p) {
                        var b = el('button'); b.type = 'button'; b.textContent = p.name; b.dataset.hex = p.hex; b.style.padding = '10px'; b.style.borderRadius = '8px'; b.style.border = '1px solid #2a4e78'; b.style.background = (p.hex && p.hex !== '*' ? p.hex : '#0b2240'); b.style.color = '#fff';
                        if ((p.hex === '*' && selectedColors.size === 0) || selectedColors.has(p.hex.toLowerCase())) b.style.outline = '2px solid #fff';
                        b.onclick = function () {
                            if (p.hex === '*' && selectedColors.size > 0) { selectedColors.clear(); }
                            else if (p.hex === '*' && selectedColors.size === 0) { }
                            else if (p.hex !== '*') { if (selectedColors.has(p.hex.toLowerCase())) selectedColors.delete(p.hex.toLowerCase()); else selectedColors.add(p.hex.toLowerCase()); }
                            if (selectedColors.size > 0 && p.hex !== '*') { const allBtn = wrap.querySelector('button[data-hex="*"]'); if (allBtn) allBtn.style.outline = ''; }
                            [].slice.call(wrap.querySelectorAll('button')).forEach(function (btn) {
                                btn.style.outline = ''; const btnHex = (btn.dataset.hex || '').toLowerCase();
                                if ((btnHex === '*' && selectedColors.size === 0) || selectedColors.has(btnHex)) { btn.style.outline = '2px solid #fff'; }
                            });
                        };
                        wrap.appendChild(b);
                    });
                    return wrap;
                }, function (body, wrap) { applyFilters(); });
            }

            // ===== WEEKLY VIEW =====
            function getWeekRange(dateStr) {
                const curr = new Date(dateStr + 'T12:00:00');
                const first = curr.getDate() - curr.getDay();
                const week = [];
                for (let i = 0; i < 7; i++) {
                    const next = new Date(curr); next.setDate(first + i); week.push(next.toISOString().slice(0, 10));
                }
                return week;
            }

            function renderWeeklyView() {
                if (!weeklyGrid || weeklyContainer.classList.contains('collapsed')) return;
                weeklyGrid.innerHTML = '';
                const currentDay = getActiveDay();
                const weekDates = getWeekRange(currentDay);
                const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                const startW = weekDates[0].split('-').reverse().slice(0, 2).join('/');
                const endW = weekDates[6].split('-').reverse().slice(0, 2).join('/');
                document.getElementById('weekRangeDisplay').textContent = `${startW} - ${endW}`;

                weekDates.forEach((date, index) => {
                    const col = el('div', 'day-column');
                    if (date === currentDay) col.classList.add('today');
                    const header = el('header');
                    
                    const textWrap = el('div');
                    textWrap.style.textAlign = 'left';
                    textWrap.innerHTML = `${daysOfWeek[index]} <span class="date-label">${date.split('-').reverse().slice(0, 2).join('/')}</span>`;
                    header.appendChild(textWrap);
                    
                    const addBtn = el('button', 'weekly-add-btn');
                    addBtn.type = 'button';
                    addBtn.title = 'Adicionar cartão';
                    addBtn.textContent = '+';
                    addBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const newCard = createCard({ text: '', when: date + 'T' });
                        renderWeeklyView();
                        const clone = Array.from(weeklyGrid.querySelectorAll('.mirror-card')).find(c => c._originalReference === newCard);
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
                    const floatingCards = allCards.filter(c => { const w = c.dataset.when || ''; return w === dayPrefix || w === dayPrefix + 'GOAL'; });
                    const scheduledCards = allCards.filter(c => { const w = c.dataset.when || ''; return w.startsWith(dayPrefix) && w.length > 11 && w !== dayPrefix + 'GOAL'; });
                    scheduledCards.sort((a, b) => (a.dataset.when || '').localeCompare(b.dataset.when || ''));

                    function createInteractiveMirror(originalCard, isScheduled) {
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

                        const cloneTimerDisp = clone.querySelector('.timer-display');
                        if (cloneTimerDisp) {
                            cloneTimerDisp.addEventListener('click', function (e) {
                                var total = parseInt(originalCard.dataset.timerTotal || '0', 10);
                                if (total > 0) {
                                    e.stopPropagation();
                                    toggleCardTimer(originalCard);
                                }
                            });
                            cloneTimerDisp.addEventListener('dblclick', function (e) {
                                e.stopPropagation();
                                handleCardDblClick(clone);
                            });
                        }

                        const cloneProgCont = clone.querySelector('.timer-progress-container');
                        if (cloneProgCont) {
                            cloneProgCont.addEventListener('click', function (e) {
                                var total = parseInt(originalCard.dataset.timerTotal || '0', 10);
                                if (total > 0) {
                                    e.stopPropagation();
                                    toggleCardTimer(originalCard);
                                }
                            });
                            cloneProgCont.addEventListener('dblclick', function (e) {
                                e.stopPropagation();
                                handleCardDblClick(clone);
                            });
                        }

                        const dot = clone.querySelector('.dot');
                        if (dot) {
                            dot.addEventListener('click', function(e) {
                                e.stopPropagation();
                                const ev = new PointerEvent('click', { bubbles: true, cancelable: true, view: window });
                                originalCard.querySelector('.dot').dispatchEvent(ev); 
                            });
                            dot.addEventListener('dblclick', (e) => e.stopPropagation());
                        }

                        clone.addEventListener('mousedown', function (e) {
                            if (e.button !== 0) return;
                            const ev = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window, button: 0, shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });
                            originalCard.dispatchEvent(ev);
                        });

                        clone.addEventListener('dblclick', function (e) {
                            if (e.target.closest('.dot')) {
                                e.stopPropagation(); return;
                            }
                            handleCardDblClick(clone);
                        });

                        clone.addEventListener('contextmenu', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!selected.has(originalCard)) {
                                clearSelection();
                                addSelection(originalCard);
                            }
                            showCtx(e.clientX, e.clientY, originalCard);
                        });

                        clone.addEventListener('dragstart', function (e) {
                            e.stopPropagation();
                            const block = selected.has(originalCard) ? Array.from(selected) : [originalCard];
                            dragState = { leader: originalCard, block: block };
                            block.forEach(n => n.classList.add('dragging'));
                            clone.classList.add('dragging');
                            pushPH();
                            try { e.dataTransfer.setData('text/plain', 'drag'); e.dataTransfer.effectAllowed = 'move'; } catch (_) { }
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
                        const clone = createInteractiveMirror(originalCard, true);
                        const timeStr = (originalCard.dataset.when || '').split('T')[1];
                        if (timeStr) {
                            let timeBadge = clone.querySelector('.due-date.time-badge');
                            if (!timeBadge) {
                                timeBadge = el('span', 'due-date time-badge');
                                timeBadge.style.backgroundColor = '#4285F4';
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
                        const clone = createInteractiveMirror(originalCard, false);
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
                const currentDate = new Date(agendaDateInput.value + 'T12:00:00');
                currentDate.setDate(currentDate.getDate() + (offset * 7));
                agendaDateInput.value = currentDate.toISOString().slice(0, 10);
                applyFilters();
            }
            document.getElementById('prevWeekBtn').addEventListener('click', () => changeWeek(-1));
            document.getElementById('nextWeekBtn').addEventListener('click', () => changeWeek(1));

            // Dynamically inject Weekly View today button
            const weekControls = document.querySelector('.weekly-controls');
            if (weekControls && !document.getElementById('todayWeekBtn')) {
                const btn = document.createElement('button');
                btn.id = 'todayWeekBtn';
                btn.className = 'weekly-today-btn';
                btn.title = 'Ir para a Semana Atual';
                btn.textContent = 'Hoje';
                btn.addEventListener('click', () => {
                    const inputEl = document.getElementById('agendaDate');
                    if (inputEl) {
                        inputEl.value = new Date().toISOString().slice(0, 10);
                        applyFilters();
                    }
                });
                weekControls.appendChild(btn);
            }

            // Dynamically inject Agenda sidebar today button
            const dateNav = document.querySelector('.schedule header .date-nav');
            if (dateNav && !document.getElementById('todayDayBtn')) {
                const btn = document.createElement('button');
                btn.id = 'todayDayBtn';
                btn.title = 'Ir para Hoje';
                btn.style.fontWeight = 'bold';
                btn.style.fontSize = '13px';
                btn.style.padding = '4px 6px';
                btn.textContent = 'Hoje';
                btn.addEventListener('click', () => {
                    const inputEl = document.getElementById('agendaDate');
                    if (inputEl) {
                        inputEl.value = new Date().toISOString().slice(0, 10);
                        applyFilters();
                    }
                });
                dateNav.appendChild(btn);
            }

function promptDeleteRecurringCard(card, onDecision) {
    showModal('Excluir Recorr\u00EAncia', function () {
        var d = el('div');
        d.style.display = 'flex';
        d.style.flexDirection = 'column';
        d.style.gap = '12px';
        d.style.minWidth = '300px';
        d.style.color = '#fff';

        d.innerHTML = `
            <div style="font-size: 14px; margin-bottom: 10px; color: #9fb3d2; line-height: 1.4;">
                Este cart\u00E3o faz parte de uma recorr\u00EAncia. O que voc\u00EA gostaria de fazer?
            </div>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
                <input type="radio" name="delRecurOption" value="instance" checked />
                <span>Deletar apenas esta ocorr\u00EAncia</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
                <input type="radio" name="delRecurOption" value="all" />
                <span>Deletar toda a s\u00E9rie (todas as ocorr\u00EAncias)</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
                <input type="radio" name="delRecurOption" value="future" />
                <span>Deletar esta ocorr\u00EAncia e todas as futuras</span>
            </label>
        `;
        return d;
    }, function (body, wrap) {
        var val = body.querySelector('input[name="delRecurOption"]:checked').value;
        onDecision(val);
    });
}

function parseRecurrenceRule(recurrenceVal) {
    if (!recurrenceVal || recurrenceVal === 'none') return null;
    let rule = null;
    if (recurrenceVal.startsWith('{')) {
        try {
            rule = JSON.parse(recurrenceVal);
        } catch (e) {
            console.error("Error parsing recurrence JSON", e);
        }
    } else {
        if (recurrenceVal === 'daily') {
            rule = { freq: 'daily', interval: 1, endType: 'never' };
        } else if (recurrenceVal === 'weekdays') {
            rule = { freq: 'weekly', interval: 1, days: [1, 2, 3, 4, 5], endType: 'never' };
        } else if (recurrenceVal === 'weekly') {
            rule = { freq: 'weekly', interval: 1, endType: 'never' };
        } else if (recurrenceVal === 'monthly') {
            rule = { freq: 'monthly', interval: 1, endType: 'never' };
        }
    }
    return rule;
}

function getNextRecurrenceDate(parentDateStr, rule) {
    const startDate = new Date(parentDateStr + 'T12:00:00');
    let currentDate = new Date(startDate);
    
    if (rule.freq === 'daily') {
        currentDate.setDate(currentDate.getDate() + rule.interval);
    } else if (rule.freq === 'weekly') {
        let found = false;
        for (let attempt = 0; attempt < 365; attempt++) {
            currentDate.setDate(currentDate.getDate() + 1);
            const startTemp = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 12, 0, 0);
            const currentTemp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0);
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
        if (!found) return null;
    } else if (rule.freq === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + rule.interval);
    } else if (rule.freq === 'yearly') {
        currentDate.setFullYear(currentDate.getFullYear() + rule.interval);
    } else {
        return null;
    }
    
    return currentDate.toISOString().split('T')[0];
}

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
const exceptions = parentCard.dataset.recurrenceExceptions || '';
const exceptionList = exceptions ? exceptions.split(',') : [];
if (exceptionList.includes(dateStr)) {
    continue;
}
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
history: JSON.stringify([{ action: 'Criado por recorr\u00eancia personalizada', time: 
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
const modalElements = showModal('Recorr\u00eancia', function () {
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
       ''}>m\u00eas(es)</option>
<option value="yearly" ${recRule.freq === 'yearly' ? 'selected' : 
       ''}>ano(s)</option>
</select>
`;
const recIntervalInp = intervalRow.querySelector('#recInterval');
const recFreqSelect = intervalRow.querySelector('#recFreq');
r.appendChild(intervalRow);
// 2. Repetir \u00e0s/aos Row (Weekdays selector)
const weekdaysRow = el('div');
weekdaysRow.style.display = recRule.freq === 'weekly' ? 'flex' : 'none';
weekdaysRow.style.flexDirection = 'column';
weekdaysRow.style.gap = '8px';
weekdaysRow.innerHTML = `<span style="font-size: 13px; color: #9fb3d2;">Repetir 
       \u00e0s/aos</span>`;
const daysGrid = el('div');
daysGrid.style.display = 'flex';
daysGrid.style.gap = '8px';
daysGrid.style.justifyContent = 'space-between';
const weekdayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const weekdayTitles = ['Domingo', 'Segunda', 'Ter\u00e7a', 'Quarta', 'Quinta', 'Sexta', 
       'S\u00e1bado'];
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
// Radio 3: Ap\u00f3s
const countLabel = el('label');
countLabel.style.display = 'flex';
countLabel.style.alignItems = 'center';
countLabel.style.gap = '6px';
countLabel.style.fontSize = '14px';
countLabel.style.cursor = 'pointer';
countLabel.innerHTML = `
<input type="radio" id="recEndAfterCount" name="recEndType" value="count" 
       ${recRule.endType === 'count' ? 'checked' : ''} /> Ap\u00f3s
<input type="number" id="recEndCount" name="recEndCount" value="${recRule.endCount || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />
<span>ocorr\u00eancias</span>
`;
endSection.appendChild(countLabel);
r.appendChild(endSection);

// Button: N\u00e3o repetir (remover)
const removeBtn = el('button');
removeBtn.type = 'button';
removeBtn.textContent = 'N\u00e3o repetir (remover)';
removeBtn.style.width = '100%';
removeBtn.style.marginTop = '12px';
removeBtn.style.padding = '8px 12px';
removeBtn.style.background = '#c62828';
removeBtn.style.border = 'none';
removeBtn.style.borderRadius = '6px';
removeBtn.style.color = '#fff';
removeBtn.style.fontWeight = 'bold';
removeBtn.style.cursor = 'pointer';
removeBtn.style.transition = 'background 0.2s';
removeBtn.onmouseover = () => removeBtn.style.background = '#b71c1c';
removeBtn.onmouseout = () => removeBtn.style.background = '#c62828';
removeBtn.onclick = function() {
    const w = removeBtn.closest('.modal-wrap');
    if (w) {
        w.remove();
    }
    onSave('none');
};
r.appendChild(removeBtn);

return r;
}, function (body, wrap) {
const freq = body.querySelector('#recFreq').value;
const interval = parseInt(body.querySelector('#recInterval').value, 10) || 1;
const days = freq === 'weekly' ? 
       Array.from(body.querySelectorAll('.weekday-btn.selected')).map(btn => {
const idx = ['Domingo', 'Segunda', 'Ter\u00e7a', 'Quarta', 'Quinta', 'Sexta', 
       'S\u00e1bado'].indexOf(btn.title);
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
modalElements.okButton.textContent = 'Conclu\u00eddo';
modalElements.cancelButton.onclick = function () {
document.body.removeChild(modalElements.wrap);
if (onCancel) onCancel();
};
}
function openAlertDialog(cardOrData, onSave, onCancel) {
const predefinedOptions = [
{ text: 'No hor\u00e1rio do evento', val: 0, unit: 'minutos' },
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
{ text: 'No hor\u00e1rio do evento', val: 0, unit: 'minutos' },
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
// Use safe character mapping
let cleanText = opt.text;
optDiv.innerHTML = `
<span>${cleanText}</span>
<span class="check-mark">&#10004;</span>
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
<span style="font-size: 14px;">Notifica\u00e7\u00e3o (Pop-up e Som)</span>
<span style="color: #1976d2; font-weight: bold;">&#10004;</span>
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
modalElements.okButton.textContent = 'Conclu\u00eddo';
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
var modalElements = showModal('Agendar / Recorr\u00eancia', function () {
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
       placeholder="Adicionar t\u00edtulo" value="${(card.querySelector('.text') ? card.querySelector('.text').textContent 
       : '').replace(/^\?\?\s*/, '').trim()}" style="width: 100%; border: none; border-bottom: 2px solid rgba(255, 
       255, 255, 0.15); background: transparent; color: #fff; font-size: 18px; font-weight: 500; padding: 6px 0; 
       outline: none; transition: border-color 0.2s;" />`;
const titleInput = titleRow.querySelector('#agendaTitle');
titleInput.addEventListener('focus', () => titleInput.style.borderBottomColor = 
       'var(--brand)');
titleInput.addEventListener('blur', () => titleInput.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)');
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
durationLabel.textContent = 'Dura\u00e7\u00e3o:';
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

durRecRow.appendChild(durationLabel);
durRecRow.appendChild(durationSelect);
durRecRow.appendChild(customDurationInput);
r.appendChild(durRecRow);

// 3.1 Recurrence Row (looks like alertRow)
const recRow = el('div');
recRow.id = 'agendaRecurrenceRow';
recRow.style.display = 'flex';
recRow.style.alignItems = 'center';
recRow.style.justifyContent = 'space-between';
recRow.style.padding = '10px 12px';
recRow.style.background = 'var(--bg)';
recRow.style.border = '1px solid rgba(255, 255, 255, 0.15)';
recRow.style.borderRadius = '8px';
recRow.style.cursor = 'pointer';
recRow.style.marginTop = '6px';
recRow.style.transition = 'background 0.2s';
recRow.onmouseover = () => recRow.style.background = 'color-mix(in srgb, var(--brand) 10%, var(--panel))';
recRow.onmouseout = () => recRow.style.background = 'var(--bg)';

function updateRecurrenceRowSummary() {
    const summaryEl = recRow.querySelector('#agendaRecurrenceSummary');
    if (summaryEl) {
        if (tempRecurrenceValue && tempRecurrenceValue !== 'none') {
            if (tempRecurrenceValue.startsWith('{')) {
                try {
                    const rule = JSON.parse(tempRecurrenceValue);
                    let desc = `Repete a cada ${rule.interval} ${rule.freq === 'daily' ? 'dia(s)' : (rule.freq === 'weekly' ? 'semana(s)' : (rule.freq === 'monthly' ? 'm\u00eas(es)' : 'ano(s)'))}`;
                    if (rule.freq === 'weekly' && rule.days && rule.days.length > 0) {
                        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S\u00e1b'];
                        const daysStr = rule.days.map(d => dayNames[d]).join(', ');
                        desc += ` (as ${daysStr})`;
                    }
                    summaryEl.textContent = desc;
                } catch(e) {
                    summaryEl.textContent = 'Personalizado';
                }
            } else {
                if (tempRecurrenceValue === 'daily') summaryEl.textContent = 'Todos os dias';
                else if (tempRecurrenceValue === 'weekdays') summaryEl.textContent = 'Dias da semana (segunda a sexta)';
                else if (tempRecurrenceValue === 'weekly') summaryEl.textContent = 'Semanalmente';
                else if (tempRecurrenceValue === 'monthly') summaryEl.textContent = 'Mensalmente';
                else summaryEl.textContent = tempRecurrenceValue;
            }
        } else {
            summaryEl.textContent = 'N\u00e3o se repete';
        }
    }
}

recRow.innerHTML = `
<div style="display: flex; align-items: center; gap: 10px;">
<span style="font-size: 18px;">\ud83d\udd01</span>
<div style="display: flex; flex-direction: column; text-align: left;">
<span style="font-size: 13px; font-weight: bold; color: #fff;">Recorr\u00eancia</span>
<span id="agendaRecurrenceSummary" style="font-size: 12px; color: #9fb3d2;">N\u00e3o se repete</span>
</div>
</div>
<span style="font-size: 14px; color: #9fb3d2;">&#8250;</span>
`;

recRow.onclick = function() {
    openCustomRecurrenceDialog(tempRecurrenceValue !== 'none' ? tempRecurrenceValue : null, function(savedRule) {
        if (savedRule === 'none') {
            tempRecurrenceValue = 'none';
        } else {
            tempRecurrenceValue = JSON.stringify(savedRule);
        }
        updateRecurrenceRowSummary();
    });
};
r.appendChild(recRow);
setTimeout(updateRecurrenceRowSummary, 0);

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
alertRow.onmouseover = () => alertRow.style.background = 'color-mix(in srgb, var(--brand) 10%, var(--panel))';
alertRow.onmouseout = () => alertRow.style.background = 'var(--bg)';
function updateAlertRowSummary() {
const summaryEl = alertRow.querySelector('#agendaAlertSummary');
if (summaryEl) {
if (tempAlertEnabled) {
if (tempAlertValue === 0) {
summaryEl.textContent = 'No hor\u00e1rio do evento';
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
<span style="font-size: 18px;">\ud83d\udd14</span>
<div style="display: flex; flex-direction: column; text-align: left;">
<span style="font-size: 13px; font-weight: bold; color: #fff;">Alerta / 
       Notifica\u00e7\u00e3o</span>
<span id="agendaAlertSummary" style="font-size: 12px; color: 
       #9fb3d2;">Desativado</span>
</div>
</div>
<span style="font-size: 14px; color: #9fb3d2;">&#8250;</span>
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
       placeholder="Adicionar descri\u00e7\u00e3o..." style="width: 100%; min-height: 80px; border: 1px solid rgba(255, 255, 
       255, 0.15); background: var(--bg); color: #fff; border-radius: 6px; padding: 8px; font-size: 14px; resize: 
       vertical; outline: none; font-family: inherit;"></textarea>`;
const descTextarea = descRow.querySelector('#agendaDescription');
descTextarea.value = currentDescription;
descTextarea.addEventListener('focus', () => descTextarea.style.borderColor = 
       'var(--brand)');
descTextarea.addEventListener('blur', () => descTextarea.style.borderColor = 'rgba(255, 255, 255, 0.15)');
r.appendChild(descRow);
return r;
}, function (body, wrap) {
const titleVal = body.querySelector('#agendaTitle').value.trim();
const dateVal = body.querySelector('#agendaDateVal').value;
const timeVal = body.querySelector('#agendaTimeVal').value;
const isAllDayChecked = body.querySelector('#agendaAllDay').checked;
const isGoalChecked = body.querySelector('#agendaGoal').checked;
const recVal = tempRecurrenceValue;
const descVal = body.querySelector('#agendaDescription').value.trim();
const durSelVal = body.querySelector('#agendaDuration').value;
let durVal = durSelVal;
if (durSelVal === 'custom') {
durVal = body.querySelector('#agendaCustomDuration').value.trim();
}
// Recurrence save string
let recurrenceSaveValue = tempRecurrenceValue;
const targetCard = card._originalReference || card;
const txtSpan = targetCard.querySelector('.text');
if (txtSpan) {
txtSpan.textContent = (isGoalChecked ? '\ud83c\udfaf ' : '') + titleVal;
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
applyFilters(); updateTotalTimerDisplay(); if (typeof persist === 'function') persist(); if (onOkCallback) onOkCallback();
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
title.textContent = 'Selecionar hor\u00e1rio';
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
keyboardMsg.textContent = 'Digite o hor\u00e1rio desejado nos campos acima.';
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
// InTer\u00e7active selection handler from click/touch coordinates
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
keyboardBtn.innerHTML = '\u2328\ufe0f'; // Keyboard icon
keyboardBtn.title = 'Digitar hor\u00e1rio';
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
                keyboardBtn.innerHTML = '\ud83d\udd52'; // Clock icon
                keyboardBtn.title = 'Usar rel\u00f3gio';
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
                keyboardBtn.innerHTML = '\u2328\ufe0f'; // Keyboard icon
                keyboardBtn.title = 'Digitar hor\u00e1rio';
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


