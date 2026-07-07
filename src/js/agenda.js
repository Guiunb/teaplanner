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
// [DEDUP v8] "openTimerDialog" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).

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

// [DEDUP v8] "promptDeleteRecurringCard" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).


// [DEDUP v8] "parseRecurrenceRule" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).


// [DEDUP v8] "getNextRecurrenceDate" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).


// [DEDUP v8] "generateRecurrences" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).

// [DEDUP v8] "openCustomRecurrenceDialog" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).

// [DEDUP v8] "openAlertDialog" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).

// [DEDUP v8] "openAgendaDialog" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).

// [DEDUP v8] "openTimerDialog" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).

// [DEDUP v8] "openAnalogTimePicker" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).



