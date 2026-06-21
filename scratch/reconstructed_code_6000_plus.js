// --- Line 6000 ---
return false;

// --- Line 6001 ---
}

// --- Line 6002 ---
return true;

// --- Line 6003 ---
});

// --- Line 6004 ---


// --- Line 6005 ---
const recurrenceVal = parentCard.dataset.recurrence;

// --- Line 6006 ---
if (!recurrenceVal || recurrenceVal === 'none') {

// --- Line 6007 ---
return;

// --- Line 6008 ---
}

// --- Line 6009 ---


// --- Line 6010 ---
let rule = null;

// --- Line 6011 ---
if (recurrenceVal.startsWith('{')) {

// --- Line 6012 ---
try {

// --- Line 6013 ---
rule = JSON.parse(recurrenceVal);

// --- Line 6014 ---
} catch (e) {

// --- Line 6015 ---
console.error("Error parsing recurrence JSON", e);

// --- Line 6016 ---
}

// --- Line 6017 ---
} else {

// --- Line 6018 ---
// Fallback to simple predefined recurrence configurations

// --- Line 6019 ---
if (recurrenceVal === 'daily') {

// --- Line 6020 ---
rule = { freq: 'daily', interval: 1, endType: 'never' };

// --- Line 6021 ---
} else if (recurrenceVal === 'weekdays') {

// --- Line 6022 ---
rule = { freq: 'weekly', interval: 1, days: [1, 2, 3, 4, 5], endType: 'never' };

// --- Line 6023 ---
} else if (recurrenceVal === 'weekly') {

// --- Line 6024 ---
const sDate = new Date(parentDateStr + 'T12:00:00');

// --- Line 6025 ---
rule = { freq: 'weekly', interval: 1, days: [sDate.getDay()], endType: 'never' };

// --- Line 6026 ---
} else if (recurrenceVal === 'monthly') {

// --- Line 6027 ---
rule = { freq: 'monthly', interval: 1, endType: 'never' };

// --- Line 6028 ---
}

// --- Line 6029 ---
}

// --- Line 6030 ---


// --- Line 6031 ---
if (!rule) return;

// --- Line 6032 ---


// --- Line 6033 ---
const startDate = new Date(parentDateStr + 'T12:00:00');

// --- Line 6034 ---
let currentDate = new Date(startDate);

// --- Line 6035 ---
let count = 0;

// --- Line 6036 ---


// --- Line 6037 ---
let maxInstances = 365; // safety limit

// --- Line 6038 ---
let instancesToGenerate = 30; // default for daily/weekdays

// --- Line 6039 ---
if (rule.freq === 'weekly') instancesToGenerate = 12;

// --- Line 6040 ---
if (rule.freq === 'monthly') instancesToGenerate = 12;

// --- Line 6041 ---
if (rule.freq === 'yearly') instancesToGenerate = 5;

// --- Line 6042 ---


// --- Line 6043 ---
if (rule.endType === 'count') {

// --- Line 6044 ---
instancesToGenerate = Math.min(rule.endCount || 1, maxInstances);

// --- Line 6045 ---
}

// --- Line 6047 ---
const endLimitDate = (rule.endType === 'date' && rule.endDate) ? new Date(rule.endDate + 
       'T23:59:59') : null;

// --- Line 6049 ---
while (count < instancesToGenerate) {

// --- Line 6050 ---
if (rule.freq === 'daily') {

// --- Line 6051 ---
currentDate.setDate(currentDate.getDate() + rule.interval);

// --- Line 6052 ---
} else if (rule.freq === 'weekly') {

// --- Line 6053 ---
let found = false;

// --- Line 6054 ---
for (let attempt = 0; attempt < 365; attempt++) {

// --- Line 6055 ---
currentDate.setDate(currentDate.getDate() + 1);

// --- Line 6056 ---


// --- Line 6057 ---
const startTemp = new Date(startDate.getFullYear(), startDate.getMonth(), 
       startDate.getDate(), 12, 0, 0);

// --- Line 6058 ---
const currentTemp = new Date(currentDate.getFullYear(), currentDate.getMonth(), 
       currentDate.getDate(), 12, 0, 0);

// --- Line 6059 ---


// --- Line 6060 ---
const startSun = new Date(startTemp);

// --- Line 6061 ---
startSun.setDate(startSun.getDate() - startSun.getDay());

// --- Line 6062 ---


// --- Line 6063 ---
const currentSun = new Date(currentTemp);

// --- Line 6064 ---
currentSun.setDate(currentSun.getDate() - currentSun.getDay());

// --- Line 6065 ---


// --- Line 6066 ---
const msDiff = currentSun.getTime() - startSun.getTime();

// --- Line 6067 ---
const weeksDiff = Math.round(msDiff / (7 * 24 * 60 * 60 * 1000));

// --- Line 6068 ---


// --- Line 6069 ---
if (weeksDiff % rule.interval === 0) {

// --- Line 6070 ---
const dayOfWeek = currentDate.getDay();

// --- Line 6071 ---
if (!rule.days || rule.days.length === 0 || rule.days.includes(dayOfWeek)) {

// --- Line 6072 ---
found = true;

// --- Line 6073 ---
break;

// --- Line 6074 ---
}

// --- Line 6075 ---
}

// --- Line 6076 ---
}

// --- Line 6077 ---
if (!found) break;

// --- Line 6078 ---
} else if (rule.freq === 'monthly') {

// --- Line 6079 ---
currentDate.setMonth(currentDate.getMonth() + rule.interval);

// --- Line 6080 ---
} else if (rule.freq === 'yearly') {

// --- Line 6081 ---
currentDate.setFullYear(currentDate.getFullYear() + rule.interval);

// --- Line 6082 ---
} else {

// --- Line 6083 ---
break;

// --- Line 6084 ---
}

// --- Line 6085 ---


// --- Line 6086 ---
if (endLimitDate && currentDate > endLimitDate) {

// --- Line 6087 ---
break;

// --- Line 6088 ---
}

// --- Line 6089 ---


// --- Line 6090 ---
const dateStr = currentDate.toISOString().slice(0, 10);

// --- Line 6091 ---
const whenVal = dateStr + 'T' + parentTimeSuffix;

// --- Line 6092 ---


// --- Line 6093 ---
const childData = {

// --- Line 6094 ---
text: (parentCard.querySelector('.text') ? 
       parentCard.querySelector('.text').textContent : '').trim(),

// --- Line 6095 ---
color: parentCard.dataset.color || '',

// --- Line 6096 ---
labelColor: parentCard.dataset.labelColor || '',

// --- Line 6097 ---
due: parentCard.dataset.due || '',

// --- Line 6098 ---
when: whenVal,

// --- Line 6099 ---
timerTotal: parentCard.dataset.timerTotal || '',

// --- Line 6100 ---
timerLeft: parentCard.dataset.timerLeft || '',

// --- Line 6101 ---
timerState: 'stopped',

// --- Line 6102 ---
timerEnd: '',

// --- Line 6103 ---
completed: 'false',

// --- Line 6104 ---
history: JSON.stringify([{ action: 'Criado por recorr�ncia personalizada', time: 
       Date.now() }]),

// --- Line 6105 ---
boardId: parentCard.dataset.boardId || '',

// --- Line 6106 ---
description: parentCard.dataset.description || '',

// --- Line 6107 ---
duration: parentCard.dataset.duration || '',

// --- Line 6108 ---
recurrence: 'none',

// --- Line 6109 ---
cardId: 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),

// --- Line 6110 ---
recurrenceParent: parentId,

// --- Line 6111 ---
alertEnabled: parentCard.dataset.alertEnabled || 'false',

// --- Line 6112 ---
alertValue: parentCard.dataset.alertValue || '15',

// --- Line 6113 ---
alertUnit: parentCard.dataset.alertUnit || 'minutos',

// --- Line 6114 ---
alertFired: 'false'

// --- Line 6115 ---
};

// --- Line 6116 ---


// --- Line 6117 ---
createCard(childData);

// --- Line 6118 ---
count++;

// --- Line 6119 ---
}

// --- Line 6120 ---
}

// --- Line 6122 ---
function openCustomRecurrenceDialog(currentRule, onSave, onCancel) {

// --- Line 6123 ---
let recRule = { freq: 'weekly', interval: 1, days: [], endType: 'never', endDate: '', endCount: 
       1 };

// --- Line 6124 ---
if (currentRule) {

// --- Line 6125 ---
if (typeof currentRule === 'string' && currentRule.startsWith('{')) {

// --- Line 6126 ---
try { recRule = JSON.parse(currentRule); } catch (e) {}

// --- Line 6127 ---
} else if (typeof currentRule === 'object') {

// --- Line 6128 ---
recRule = { ...recRule, ...currentRule };

// --- Line 6129 ---
}

// --- Line 6130 ---
}

// --- Line 6131 ---


// --- Line 6132 ---
const modalElements = showModal('Recorr�ncia', function () {

// --- Line 6133 ---
const r = el('div');

// --- Line 6134 ---
r.style.display = 'flex';

// --- Line 6135 ---
r.style.flexDirection = 'column';

// --- Line 6136 ---
r.style.gap = '14px';

// --- Line 6137 ---
r.style.minWidth = '320px';

// --- Line 6138 ---
r.style.maxWidth = '400px';

// --- Line 6139 ---
r.style.color = '#fff';

// --- Line 6140 ---


// --- Line 6141 ---
// 1. Repete a cada Row

// --- Line 6142 ---
const intervalRow = el('div');

// --- Line 6143 ---
intervalRow.style.display = 'flex';

// --- Line 6144 ---
intervalRow.style.alignItems = 'center';

// --- Line 6145 ---
intervalRow.style.gap = '8px';

// --- Line 6146 ---
intervalRow.style.fontSize = '14px';

// --- Line 6147 ---
intervalRow.innerHTML = `

// --- Line 6148 ---
<span>Repete a cada</span>

// --- Line 6149 ---
<input type="number" id="recInterval" name="recInterval" value="${recRule.interval || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 6px 8px; border-radius: 6px; font-size: 14px;" />

// --- Line 6150 ---
<select id="recFreq" name="recFreq" style="border: 1px solid rgba(255, 255, 255, 0.15); 
       background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 14px; cursor: pointer;">

// --- Line 6151 ---
<option value="daily" ${recRule.freq === 'daily' ? 'selected' : ''}>dia(s)</option>

// --- Line 6152 ---
<option value="weekly" ${recRule.freq === 'weekly' ? 'selected' : 
       ''}>semana(s)</option>

// --- Line 6153 ---
<option value="monthly" ${recRule.freq === 'monthly' ? 'selected' : 
       ''}>m�s(es)</option>

// --- Line 6154 ---
<option value="yearly" ${recRule.freq === 'yearly' ? 'selected' : 
       ''}>ano(s)</option>

// --- Line 6155 ---
</select>

// --- Line 6156 ---
`;

// --- Line 6157 ---
const recIntervalInp = intervalRow.querySelector('#recInterval');

// --- Line 6158 ---
const recFreqSelect = intervalRow.querySelector('#recFreq');

// --- Line 6159 ---
r.appendChild(intervalRow);

// --- Line 6160 ---


// --- Line 6161 ---
// 2. Repetir �s/aos Row (Weekdays selector)

// --- Line 6162 ---
const weekdaysRow = el('div');

// --- Line 6163 ---
weekdaysRow.style.display = recRule.freq === 'weekly' ? 'flex' : 'none';

// --- Line 6164 ---
weekdaysRow.style.flexDirection = 'column';

// --- Line 6165 ---
weekdaysRow.style.gap = '8px';

// --- Line 6166 ---
weekdaysRow.innerHTML = `<span style="font-size: 13px; color: #9fb3d2;">Repetir 
       �s/aos</span>`;

// --- Line 6167 ---


// --- Line 6168 ---
const daysGrid = el('div');

// --- Line 6169 ---
daysGrid.style.display = 'flex';

// --- Line 6170 ---
daysGrid.style.gap = '8px';

// --- Line 6171 ---
daysGrid.style.justifyContent = 'space-between';

// --- Line 6172 ---


// --- Line 6173 ---
const weekdayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// --- Line 6174 ---
const weekdayTitles = ['Domingo', 'Segunda', 'Ter�a', 'Quarta', 'Quinta', 'Sexta', 
       'S�bado'];

// --- Line 6175 ---
const chosenDays = new Set(recRule.days || []);

// --- Line 6176 ---


// --- Line 6177 ---
weekdayNames.forEach((name, idx) => {

// --- Line 6178 ---
const dayBtn = el('button');

// --- Line 6179 ---
dayBtn.type = 'button';

// --- Line 6180 ---
dayBtn.className = 'weekday-btn';

// --- Line 6181 ---
if (chosenDays.has(idx)) {

// --- Line 6182 ---
dayBtn.classList.add('selected');

// --- Line 6183 ---
}

// --- Line 6184 ---
dayBtn.title = weekdayTitles[idx];

// --- Line 6185 ---
dayBtn.textContent = name;

// --- Line 6186 ---


// --- Line 6187 ---
dayBtn.onclick = function() {

// --- Line 6188 ---
if (chosenDays.has(idx)) {

// --- Line 6189 ---
chosenDays.delete(idx);

// --- Line 6190 ---
dayBtn.classList.remove('selected');

// --- Line 6191 ---
} else {

// --- Line 6192 ---
chosenDays.add(idx);

// --- Line 6193 ---
dayBtn.classList.add('selected');

// --- Line 6194 ---
}

// --- Line 6195 ---
};

// --- Line 6196 ---
daysGrid.appendChild(dayBtn);

// --- Line 6197 ---
});

// --- Line 6198 ---
weekdaysRow.appendChild(daysGrid);

// --- Line 6199 ---
r.appendChild(weekdaysRow);

// --- Line 6200 ---


// --- Line 6201 ---
recFreqSelect.addEventListener('change', function() {

// --- Line 6202 ---
if (recFreqSelect.value === 'weekly') {

// --- Line 6203 ---
weekdaysRow.style.display = 'flex';

// --- Line 6204 ---
} else {

// --- Line 6205 ---
weekdaysRow.style.display = 'none';

// --- Line 6206 ---
}

// --- Line 6207 ---
});

// --- Line 6208 ---


// --- Line 6209 ---
// 3. Termina Section

// --- Line 6210 ---
const endSection = el('div');

// --- Line 6211 ---
endSection.style.display = 'flex';

// --- Line 6212 ---
endSection.style.flexDirection = 'column';

// --- Line 6213 ---
endSection.style.gap = '8px';

// --- Line 6214 ---
endSection.style.marginTop = '6px';

// --- Line 6215 ---
endSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6216 ---
endSection.style.paddingTop = '10px';

// --- Line 6217 ---


// --- Line 6218 ---
const endTitle = el('span');

// --- Line 6219 ---
endTitle.style.fontSize = '13px';

// --- Line 6220 ---
endTitle.style.color = '#9fb3d2';

// --- Line 6221 ---
endTitle.style.fontWeight = '500';

// --- Line 6222 ---
endTitle.textContent = 'Termina';

// --- Line 6223 ---
endSection.appendChild(endTitle);

// --- Line 6224 ---


// --- Line 6225 ---
// Radio 1: Nunca

// --- Line 6226 ---
const neverLabel = el('label');

// --- Line 6227 ---
neverLabel.style.display = 'flex';

// --- Line 6228 ---
neverLabel.style.alignItems = 'center';

// --- Line 6229 ---
neverLabel.style.gap = '6px';

// --- Line 6230 ---
neverLabel.style.fontSize = '14px';

// --- Line 6231 ---
neverLabel.style.cursor = 'pointer';

// --- Line 6232 ---
neverLabel.innerHTML = `<input type="radio" id="recEndNever" name="recEndType" 
       value="never" ${recRule.endType === 'never' ? 'checked' : ''} /> Nunca`;

// --- Line 6233 ---
endSection.appendChild(neverLabel);

// --- Line 6235 ---
// Radio 2: Em

// --- Line 6236 ---
const dateLabel = el('label');

// --- Line 6237 ---
dateLabel.style.display = 'flex';

// --- Line 6238 ---
dateLabel.style.alignItems = 'center';

// --- Line 6239 ---
dateLabel.style.gap = '6px';

// --- Line 6240 ---
dateLabel.style.fontSize = '14px';

// --- Line 6241 ---
dateLabel.style.cursor = 'pointer';

// --- Line 6242 ---
dateLabel.innerHTML = `

// --- Line 6243 ---
<input type="radio" id="recEndOnDate" name="recEndType" value="date" ${recRule.endType 
       === 'date' ? 'checked' : ''} /> Em

// --- Line 6244 ---
<input type="date" id="recEndDate" name="recEndDate" value="${recRule.endDate || new 
       Date().toISOString().slice(0, 10)}" style="border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); 
       color: #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />

// --- Line 6245 ---
`;

// --- Line 6246 ---
endSection.appendChild(dateLabel);

// --- Line 6247 ---


// --- Line 6248 ---
// Radio 3: Ap�s

// --- Line 6249 ---
const countLabel = el('label');

// --- Line 6250 ---
countLabel.style.display = 'flex';

// --- Line 6251 ---
countLabel.style.alignItems = 'center';

// --- Line 6252 ---
countLabel.style.gap = '6px';

// --- Line 6253 ---
countLabel.style.fontSize = '14px';

// --- Line 6254 ---
countLabel.style.cursor = 'pointer';

// --- Line 6255 ---
countLabel.innerHTML = `

// --- Line 6256 ---
<input type="radio" id="recEndAfterCount" name="recEndType" value="count" 
       ${recRule.endType === 'count' ? 'checked' : ''} /> Ap�s

// --- Line 6257 ---
<input type="number" id="recEndCount" name="recEndCount" value="${recRule.endCount || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />

// --- Line 6258 ---
<span>ocorr�ncias</span>

// --- Line 6259 ---
`;

// --- Line 6260 ---
endSection.appendChild(countLabel);

// --- Line 6261 ---


// --- Line 6262 ---
r.appendChild(endSection);

// --- Line 6263 ---


// --- Line 6264 ---
return r;

// --- Line 6265 ---
}, function (body, wrap) {

// --- Line 6266 ---
const freq = body.querySelector('#recFreq').value;

// --- Line 6267 ---
const interval = parseInt(body.querySelector('#recInterval').value, 10) || 1;

// --- Line 6268 ---
const days = freq === 'weekly' ? 
       Array.from(body.querySelectorAll('.weekday-btn.selected')).map(btn => {

// --- Line 6269 ---
const idx = ['Domingo', 'Segunda', 'Ter�a', 'Quarta', 'Quinta', 'Sexta', 
       'S�bado'].indexOf(btn.title);

// --- Line 6270 ---
return idx !== -1 ? idx : 0;

// --- Line 6271 ---
}) : [];

// --- Line 6272 ---


// --- Line 6273 ---
const endTypeRadio = body.querySelector('input[name="recEndType"]:checked');

// --- Line 6274 ---
const endType = endTypeRadio ? endTypeRadio.value : 'never';

// --- Line 6275 ---
const endDate = body.querySelector('#recEndDate').value;

// --- Line 6276 ---
const endCount = parseInt(body.querySelector('#recEndCount').value, 10) || 1;

// --- Line 6277 ---


// --- Line 6278 ---
const newRule = {

// --- Line 6279 ---
freq: freq,

// --- Line 6280 ---
interval: interval,

// --- Line 6281 ---
days: days,

// --- Line 6282 ---
endType: endType,

// --- Line 6283 ---
endDate: endDate,

// --- Line 6284 ---
endCount: endCount

// --- Line 6285 ---
};

// --- Line 6286 ---
onSave(newRule);

// --- Line 6287 ---
});

// --- Line 6288 ---


// --- Line 6289 ---
modalElements.okButton.textContent = 'Conclu�do';

// --- Line 6290 ---
modalElements.cancelButton.onclick = function () {

// --- Line 6291 ---
document.body.removeChild(modalElements.wrap);

// --- Line 6292 ---
if (onCancel) onCancel();

// --- Line 6293 ---
};

// --- Line 6294 ---
}

// --- Line 6295 ---


// --- Line 6296 ---
function openAlertDialog(cardOrData, onSave, onCancel) {

// --- Line 6297 ---
const predefinedOptions = [

// --- Line 6298 ---
{ text: 'No hor�rio do evento', val: 0, unit: 'minutos' },

// --- Line 6299 ---
{ text: '5 minutos antes', val: 5, unit: 'minutos' },

// --- Line 6300 ---
{ text: '15 minutos antes', val: 15, unit: 'minutos' },

// --- Line 6301 ---
{ text: '30 minutos antes', val: 30, unit: 'minutos' },

// --- Line 6302 ---
{ text: '1 hora antes', val: 1, unit: 'horas' },

// --- Line 6303 ---
{ text: '2 horas antes', val: 2, unit: 'horas' },

// --- Line 6304 ---
{ text: '1 dia antes', val: 1, unit: 'dias' },

// --- Line 6305 ---
{ text: 'Personalizado...', val: -1, unit: 'custom' }

// --- Line 6306 ---
];

// --- Line 6307 ---
const dataset = cardOrData.dataset ? cardOrData.dataset : cardOrData;

// --- Line 6308 ---
const isEnabled = dataset.alertEnabled === 'true';

// --- Line 6309 ---
const currentVal = parseInt(dataset.alertValue || '15', 10);

// --- Line 6310 ---
const currentUnit = dataset.alertUnit || 'minutos';

// --- Line 6311 ---


// --- Line 6312 ---
const modalElements = showModal('Alerta', function () {

// --- Line 6313 ---
const r = el('div');

// --- Line 6314 ---
r.style.display = 'flex';

// --- Line 6315 ---
r.style.flexDirection = 'column';

// --- Line 6316 ---
r.style.gap = '12px';

// --- Line 6317 ---
r.style.minWidth = '320px';

// --- Line 6318 ---
r.style.maxWidth = '400px';

// --- Line 6319 ---
r.style.color = '#fff';

// --- Line 6320 ---


// --- Line 6321 ---
// 1. Toggle switch row

// --- Line 6322 ---
const toggleRow = el('div', 'premium-switch-container');

// --- Line 6323 ---
toggleRow.innerHTML = `

// --- Line 6324 ---
<span class="premium-switch-label">Ativado</span>

// --- Line 6325 ---
<label class="premium-switch">

// --- Line 6326 ---
<input type="checkbox" id="alertSubEnabled" name="alertSubEnabled" ${isEnabled ? 
       'checked' : ''}>

// --- Line 6327 ---
<span class="premium-slider"></span>

// --- Line 6328 ---
</label>

// --- Line 6329 ---
`;

// --- Line 6330 ---
const enabledCheckbox = toggleRow.querySelector('#alertSubEnabled');

// --- Line 6331 ---
r.appendChild(toggleRow);

// --- Line 6332 ---


// --- Line 6333 ---
// Options Container

// --- Line 6334 ---
const optionsContainer = el('div');

// --- Line 6335 ---
optionsContainer.style.display = isEnabled ? 'flex' : 'none';

// --- Line 6336 ---
optionsContainer.style.flexDirection = 'column';

// --- Line 6337 ---
optionsContainer.style.gap = '6px';

// --- Line 6338 ---
r.appendChild(optionsContainer);

// --- Line 6339 ---


// --- Line 6340 ---
// Toggling options container display

// --- Line 6341 ---
enabledCheckbox.addEventListener('change', function() {

// --- Line 6342 ---
if (enabledCheckbox.checked) {

// --- Line 6343 ---
optionsContainer.style.display = 'flex';

// --- Line 6344 ---
} else {

// --- Line 6345 ---
optionsContainer.style.display = 'none';

// --- Line 6346 ---
}

// --- Line 6347 ---
});

// --- Line 6348 ---


// --- Line 6349 ---
// Predefined options list

// --- Line 6350 ---
const predefinedOptions = [

// --- Line 6351 ---
{ text: 'No hor�rio do evento', val: 0, unit: 'minutos' },

// --- Line 6352 ---
{ text: '5 minutos antes', val: 5, unit: 'minutos' },

// --- Line 6353 ---
{ text: '15 minutos antes', val: 15, unit: 'minutos' },

// --- Line 6354 ---
{ text: '30 minutos antes', val: 30, unit: 'minutos' },

// --- Line 6355 ---
{ text: '1 hora antes', val: 1, unit: 'horas' },

// --- Line 6356 ---
{ text: '2 horas antes', val: 2, unit: 'horas' },

// --- Line 6357 ---
{ text: '1 dia antes', val: 1, unit: 'dias' },

// --- Line 6358 ---
{ text: 'Personalizado...', val: -1, unit: 'custom' }

// --- Line 6359 ---
];

// --- Line 6360 ---


// --- Line 6361 ---
let matchedIdx = -1;

// --- Line 6362 ---
predefinedOptions.forEach((opt, idx) => {

// --- Line 6363 ---
if (opt.val !== -1 && currentVal === opt.val && currentUnit === opt.unit) {

// --- Line 6364 ---
matchedIdx = idx;

// --- Line 6365 ---
}

// --- Line 6366 ---
});

// --- Line 6367 ---
if (matchedIdx === -1 && isEnabled) {

// --- Line 6368 ---
matchedIdx = predefinedOptions.length - 1; 

// --- Line 6369 ---
} else if (!isEnabled) {

// --- Line 6370 ---
matchedIdx = 2; // Default to 15m

// --- Line 6371 ---
}

// --- Line 6373 ---
// Custom fields row

// --- Line 6374 ---
const customFields = el('div');

// --- Line 6375 ---
customFields.id = 'alertCustomFieldsSub';

// --- Line 6376 ---
customFields.style.display = matchedIdx === predefinedOptions.length - 1 ? 'flex' : 'none';

// --- Line 6377 ---
customFields.style.flexDirection = 'column';

// --- Line 6378 ---
customFields.style.gap = '6px';

// --- Line 6379 ---
customFields.style.padding = '10px';

// --- Line 6380 ---
customFields.style.background = '#0a1424';

// --- Line 6381 ---
customFields.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6382 ---
customFields.style.borderRadius = '8px';

// --- Line 6383 ---
customFields.style.marginTop = '4px';

// --- Line 6384 ---
customFields.innerHTML = `

// --- Line 6385 ---
<span style="font-size: 12px; color: #9fb3d2;">Tempo personalizado:</span>

// --- Line 6386 ---
<div style="display: flex; gap: 8px; align-items: center;">

// --- Line 6387 ---
<input type="number" id="alertCustomValSub" name="alertCustomValSub" min="1" 
       value="${matchedIdx === predefinedOptions.length - 1 ? currentVal : 15}" style="width: 70px; border: 1px solid 
       rgba(255, 255, 255, 0.15); background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 
       14px;" />

// --- Line 6388 ---
<select id="alertCustomUnitSub" name="alertCustomUnitSub" style="flex:1; border: 
       1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; 
       font-size: 14px; cursor: pointer;">

// --- Line 6389 ---
<option value="minutos" ${currentUnit === 'minutos' ? 'selected' : ''}>minutos 
       antes</option>

// --- Line 6390 ---
<option value="horas" ${currentUnit === 'horas' ? 'selected' : ''}>horas 
       antes</option>

// --- Line 6391 ---
<option value="dias" ${currentUnit === 'dias' ? 'selected' : ''}>dias 
       antes</option>

// --- Line 6392 ---
<option value="semanas" ${currentUnit === 'semanas' ? 'selected' : ''}>semanas 
       antes</option>

// --- Line 6393 ---
</select>

// --- Line 6394 ---
</div>

// --- Line 6395 ---
`;

// --- Line 6396 ---


// --- Line 6397 ---
// Render list of choices

// --- Line 6398 ---
predefinedOptions.forEach((opt, idx) => {

// --- Line 6399 ---
const optDiv = el('div', 'alert-option-item');

// --- Line 6400 ---
if (idx === matchedIdx) {

// --- Line 6401 ---
optDiv.classList.add('selected');

// --- Line 6402 ---
}

// --- Line 6403 ---
optDiv.innerHTML = `

// --- Line 6404 ---
<span>${opt.text}</span>

// --- Line 6405 ---
<span class="check-mark">?</span>

// --- Line 6406 ---
`;

// --- Line 6407 ---
optDiv.onclick = function () {

// --- Line 6408 ---
r.querySelectorAll('.alert-option-item').forEach(item => 
       item.classList.remove('selected'));

// --- Line 6409 ---
optDiv.classList.add('selected');

// --- Line 6410 ---
if (opt.unit === 'custom') {

// --- Line 6411 ---
customFields.style.display = 'flex';

// --- Line 6412 ---
} else {

// --- Line 6413 ---
customFields.style.display = 'none';

// --- Line 6414 ---
}

// --- Line 6415 ---
};

// --- Line 6416 ---
optionsContainer.appendChild(optDiv);

// --- Line 6417 ---
});

// --- Line 6418 ---


// --- Line 6419 ---
optionsContainer.appendChild(customFields);

// --- Line 6420 ---


// --- Line 6421 ---
// 2. Tipo de alerta section

// --- Line 6422 ---
const alertTypeSection = el('div');

// --- Line 6423 ---
alertTypeSection.style.marginTop = '10px';

// --- Line 6424 ---
alertTypeSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6425 ---
alertTypeSection.style.paddingTop = '10px';

// --- Line 6426 ---
alertTypeSection.innerHTML = `

// --- Line 6427 ---
<span style="font-size: 13px; color: #9fb3d2; font-weight: 500; display: block; 
       margin-bottom: 6px;">Tipo de alerta</span>

// --- Line 6428 ---
<div style="display: flex; align-items: center; justify-content: space-between; 
       padding: 10px 12px; background: var(--bg); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px;">

// --- Line 6429 ---
<span style="font-size: 14px;">Notifica��o (Pop-up e Som)</span>

// --- Line 6430 ---
<span style="color: #1976d2; font-weight: bold;">?</span>

// --- Line 6431 ---
</div>

// --- Line 6432 ---
`;

// --- Line 6433 ---
optionsContainer.appendChild(alertTypeSection);

// --- Line 6434 ---


// --- Line 6435 ---
return r;

// --- Line 6436 ---
}, function (body, wrap) {

// --- Line 6437 ---
const enabledCheckboxSub = body.querySelector('#alertSubEnabled');

// --- Line 6438 ---
const enabled = enabledCheckboxSub ? enabledCheckboxSub.checked : false;

// --- Line 6439 ---
let val = 15;

// --- Line 6440 ---
let unit = 'minutos';

// --- Line 6441 ---


// --- Line 6442 ---
if (enabled) {

// --- Line 6443 ---
const selectedOpt = body.querySelector('.alert-option-item.selected');

// --- Line 6444 ---
const selectedIdx = 
       Array.from(body.querySelectorAll('.alert-option-item')).indexOf(selectedOpt);

// --- Line 6445 ---
const opt = predefinedOptions[selectedIdx];

// --- Line 6446 ---


// --- Line 6447 ---
if (opt && opt.unit !== 'custom') {

// --- Line 6448 ---
val = opt.val;

// --- Line 6449 ---
unit = opt.unit;

// --- Line 6450 ---
} else {

// --- Line 6451 ---
val = parseInt(body.querySelector('#alertCustomValSub').value, 10) || 15;

// --- Line 6452 ---
unit = body.querySelector('#alertCustomUnitSub').value;

// --- Line 6453 ---
}

// --- Line 6454 ---
}

// --- Line 6455 ---


// --- Line 6456 ---
onSave({

// --- Line 6457 ---
alertEnabled: enabled,

// --- Line 6458 ---
alertValue: val,

// --- Line 6459 ---
alertUnit: unit

// --- Line 6460 ---
});

// --- Line 6461 ---
});

// --- Line 6462 ---


// --- Line 6463 ---
modalElements.okButton.textContent = 'Conclu�do';

// --- Line 6464 ---
modalElements.cancelButton.onclick = function () {

// --- Line 6465 ---
document.body.removeChild(modalElements.wrap);

// --- Line 6466 ---
if (onCancel) onCancel();

// --- Line 6467 ---
};

// --- Line 6468 ---
}

// --- Line 6469 ---


// --- Line 6470 ---
function openAgendaDialog(card) {

// --- Line 6471 ---
if (!card) return;

// --- Line 6472 ---


// --- Line 6473 ---
if (!card.dataset.cardId) {

// --- Line 6474 ---
card.dataset.cardId = 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

// --- Line 6475 ---
}

// --- Line 6476 ---


// --- Line 6477 ---
const whenVal = card.dataset.when || '';

// --- Line 6478 ---
let cardDate = '';

// --- Line 6479 ---
let cardTime = '09:00';

// --- Line 6480 ---
let isGoal = false;

// --- Line 6481 ---
let isAllDay = false;

// --- Line 6482 ---


// --- Line 6483 ---
if (whenVal.includes('T')) {

// --- Line 6484 ---
const parts = whenVal.split('T');

// --- Line 6485 ---
cardDate = parts[0];

// --- Line 6486 ---
const timePart = parts[1] || '';

// --- Line 6487 ---
if (timePart === 'GOAL') {

// --- Line 6488 ---
isGoal = true;

// --- Line 6489 ---
isAllDay = true;

// --- Line 6490 ---
} else if (timePart === '') {

// --- Line 6491 ---
isAllDay = true;

// --- Line 6492 ---
} else {

// --- Line 6493 ---
cardTime = timePart;

// --- Line 6494 ---
}

// --- Line 6495 ---
}

// --- Line 6496 ---
if (!cardDate) {

// --- Line 6497 ---
cardDate = new Date().toISOString().slice(0, 10);

// --- Line 6498 ---
}

// --- Line 6499 ---


// --- Line 6500 ---
const currentRecurrence = card.dataset.recurrence || 'none';

// --- Line 6501 ---
const currentDuration = card.dataset.duration || '60';

// --- Line 6502 ---
const currentDescription = card.dataset.description || '';

// --- Line 6503 ---


// --- Line 6504 ---
const currentAlertEnabled = card.dataset.alertEnabled === 'true';

// --- Line 6505 ---
const currentAlertValue = card.dataset.alertValue || '15';

// --- Line 6506 ---
const currentAlertUnit = card.dataset.alertUnit || 'minutos';

// --- Line 6507 ---


// --- Line 6508 ---
let isCustomRecurrence = currentRecurrence.startsWith('{');

// --- Line 6509 ---


// --- Line 6510 ---
let tempAlertEnabled = currentAlertEnabled;

// --- Line 6511 ---
let tempAlertValue = parseInt(currentAlertValue, 10);

// --- Line 6512 ---
if (isNaN(tempAlertValue)) tempAlertValue = 15;

// --- Line 6513 ---
let tempAlertUnit = currentAlertUnit;

// --- Line 6514 ---
let tempRecurrenceValue = currentRecurrence;

// --- Line 6515 ---


// --- Line 6516 ---
var modalElements = showModal('Agendar / Recorr�ncia', function () {

// --- Line 6517 ---
var r = el('div');

// --- Line 6518 ---
r.style.display = 'flex';

// --- Line 6519 ---
r.style.flexDirection = 'column';

// --- Line 6520 ---
r.style.gap = '14px';

// --- Line 6521 ---
r.style.minWidth = '360px';

// --- Line 6522 ---
r.style.maxWidth = '460px';

// --- Line 6523 ---
r.style.color = '#fff';

// --- Line 6524 ---
r.style.fontFamily = 'inherit';

// --- Line 6525 ---


// --- Line 6526 ---
// 1. Title Input

// --- Line 6527 ---
const titleRow = el('div');

// --- Line 6528 ---
titleRow.innerHTML = `<input type="text" id="agendaTitle" name="agendaTitle" 
       placeholder="Adicionar t�tulo" value="${(card.querySelector('.text') ? card.querySelector('.text').textContent 
       : '').replace(/^\?\?\s*/, '').trim()}" style="width: 100%; border: none; border-bottom: 2px solid rgba(255, 
       255, 255, 0.15); background: transparent; color: #fff; font-size: 18px; font-weight: 500; padding: 6px 0; 
       outline: none; transition: border-color 0.2s;" />`;

// --- Line 6529 ---
const titleInput = titleRow.querySelector('#agendaTitle');

// --- Line 6530 ---
titleInput.addEventListener('focus', () => titleInput.style.borderBottomColor = 
       'var(--brand)');

// --- Line 6531 ---
titleInput.addEventListener('blur', () => titleInput.style.borderBottomColor = 'rgba(255, 
       255, 255, 0.15)');

// --- Line 6532 ---
r.appendChild(titleRow);

// --- Line 6533 ---


// --- Line 6534 ---
// 2. Date & Time Row

// --- Line 6535 ---
const dateTimeRow = el('div');

// --- Line 6536 ---
dateTimeRow.style.display = 'flex';

// --- Line 6537 ---
dateTimeRow.style.gap = '10px';

// --- Line 6538 ---
dateTimeRow.style.alignItems = 'center';

// --- Line 6539 ---
dateTimeRow.style.flexWrap = 'wrap';

// --- Line 6540 ---


// --- Line 6541 ---
const datePicker = el('input');

// --- Line 6542 ---
datePicker.type = 'date';

// --- Line 6543 ---
datePicker.id = 'agendaDateVal';

// --- Line 6544 ---
datePicker.name = 'agendaDateVal';

// --- Line 6545 ---
datePicker.value = cardDate;

// --- Line 6546 ---
datePicker.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6547 ---
datePicker.style.background = 'var(--bg)';

// --- Line 6548 ---
datePicker.style.color = '#fff';

// --- Line 6549 ---
datePicker.style.padding = '6px 8px';

// --- Line 6550 ---
datePicker.style.borderRadius = '6px';

// --- Line 6551 ---
datePicker.style.fontSize = '14px';

// --- Line 6552 ---
datePicker.style.cursor = 'pointer';

// --- Line 6553 ---


// --- Line 6554 ---
const timePicker = el('input');

// --- Line 6555 ---
timePicker.type = 'text';

// --- Line 6556 ---
timePicker.id = 'agendaTimeVal';

// --- Line 6557 ---
timePicker.name = 'agendaTimeVal';

// --- Line 6558 ---
timePicker.value = cardTime;

// --- Line 6559 ---
timePicker.readOnly = true;

// --- Line 6560 ---
timePicker.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6561 ---
timePicker.style.background = 'var(--bg)';

// --- Line 6562 ---
timePicker.style.color = '#fff';

// --- Line 6563 ---
timePicker.style.padding = '6px 8px';

// --- Line 6564 ---
timePicker.style.borderRadius = '6px';

// --- Line 6565 ---
timePicker.style.fontSize = '14px';

// --- Line 6566 ---
timePicker.style.cursor = 'pointer';

// --- Line 6567 ---
timePicker.style.textAlign = 'center';

// --- Line 6568 ---
timePicker.onclick = function () {

// --- Line 6569 ---
openAnalogTimePicker(timePicker.value, function (selectedTime) {

// --- Line 6570 ---
timePicker.value = selectedTime;

// --- Line 6571 ---
});

// --- Line 6572 ---
};

// --- Line 6573 ---
if (isAllDay) {

// --- Line 6574 ---
timePicker.style.display = 'none';

// --- Line 6575 ---
}

// --- Line 6576 ---


// --- Line 6577 ---
const allDayLabel = el('label');

// --- Line 6578 ---
allDayLabel.style.display = 'flex';

// --- Line 6579 ---
allDayLabel.style.alignItems = 'center';

// --- Line 6580 ---
allDayLabel.style.gap = '4px';

// --- Line 6581 ---
allDayLabel.style.fontSize = '13px';

// --- Line 6582 ---
allDayLabel.style.color = '#9fb3d2';

// --- Line 6583 ---
allDayLabel.style.cursor = 'pointer';

// --- Line 6584 ---
allDayLabel.innerHTML = `<input type="checkbox" id="agendaAllDay" name="agendaAllDay" 
       ${isAllDay ? 'checked' : ''} /> Dia inteiro`;

// --- Line 6585 ---
const allDayCheckbox = allDayLabel.querySelector('#agendaAllDay');

// --- Line 6586 ---


// --- Line 6587 ---
const goalLabel = el('label');

// --- Line 6588 ---
goalLabel.style.display = 'flex';

// --- Line 6589 ---
goalLabel.style.alignItems = 'center';

// --- Line 6590 ---
goalLabel.style.gap = '4px';

// --- Line 6591 ---
goalLabel.style.fontSize = '13px';

// --- Line 6592 ---
goalLabel.style.color = '#9fb3d2';

// --- Line 6593 ---
goalLabel.style.cursor = 'pointer';

// --- Line 6594 ---
goalLabel.innerHTML = `<input type="checkbox" id="agendaGoal" name="agendaGoal" ${isGoal ? 
       'checked' : ''} /> Meta do dia`;

// --- Line 6595 ---
const goalCheckbox = goalLabel.querySelector('#agendaGoal');

// --- Line 6596 ---


// --- Line 6597 ---
allDayCheckbox.addEventListener('change', function () {

// --- Line 6598 ---
if (allDayCheckbox.checked) {

// --- Line 6599 ---
timePicker.style.display = 'none';

// --- Line 6600 ---
durationSelect.style.display = 'none';

// --- Line 6601 ---
durationLabel.style.display = 'none';

// --- Line 6602 ---
} else {

// --- Line 6603 ---
timePicker.style.display = '';

// --- Line 6604 ---
durationSelect.style.display = '';

// --- Line 6605 ---
durationLabel.style.display = '';

// --- Line 6606 ---
goalCheckbox.checked = false;

// --- Line 6607 ---
}

// --- Line 6608 ---
});

// --- Line 6609 ---


// --- Line 6610 ---
goalCheckbox.addEventListener('change', function () {

// --- Line 6611 ---
if (goalCheckbox.checked) {

// --- Line 6612 ---
allDayCheckbox.checked = true;

// --- Line 6613 ---
timePicker.style.display = 'none';

// --- Line 6614 ---
durationSelect.style.display = 'none';

// --- Line 6615 ---
durationLabel.style.display = 'none';

// --- Line 6616 ---
}

// --- Line 6617 ---
});

// --- Line 6618 ---


// --- Line 6619 ---
dateTimeRow.appendChild(datePicker);

// --- Line 6620 ---
dateTimeRow.appendChild(timePicker);

// --- Line 6621 ---
dateTimeRow.appendChild(allDayLabel);

// --- Line 6622 ---
dateTimeRow.appendChild(goalLabel);

// --- Line 6623 ---
r.appendChild(dateTimeRow);

// --- Line 6624 ---


// --- Line 6625 ---
// 3. Duration & Recurrence Row

// --- Line 6626 ---
const durRecRow = el('div');

// --- Line 6627 ---
durRecRow.style.display = 'flex';

// --- Line 6628 ---
durRecRow.style.gap = '10px';

// --- Line 6629 ---
durRecRow.style.alignItems = 'center';

// --- Line 6630 ---
durRecRow.style.flexWrap = 'wrap';

// --- Line 6631 ---


// --- Line 6632 ---
const durationLabel = el('span');

// --- Line 6633 ---
durationLabel.textContent = 'Dura��o:';

// --- Line 6634 ---
durationLabel.style.fontSize = '13px';

// --- Line 6635 ---
durationLabel.style.color = '#9fb3d2';

// --- Line 6636 ---
if (isAllDay) durationLabel.style.display = 'none';

// --- Line 6637 ---


// --- Line 6638 ---
const durationSelect = el('select');

// --- Line 6639 ---
durationSelect.id = 'agendaDuration';

// --- Line 6640 ---
durationSelect.name = 'agendaDuration';

// --- Line 6641 ---
durationSelect.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6642 ---
durationSelect.style.background = 'var(--bg)';

// --- Line 6643 ---
durationSelect.style.color = '#fff';

// --- Line 6644 ---
durationSelect.style.padding = '6px 8px';

// --- Line 6645 ---
durationSelect.style.borderRadius = '6px';

// --- Line 6646 ---
durationSelect.style.fontSize = '14px';

// --- Line 6647 ---
durationSelect.style.cursor = 'pointer';

// --- Line 6648 ---
if (isAllDay) durationSelect.style.display = 'none';

// --- Line 6649 ---


// --- Line 6650 ---
const durations = [

// --- Line 6651 ---
{ val: '15', text: '15 min' },

// --- Line 6652 ---
{ val: '30', text: '30 min' },

// --- Line 6653 ---
{ val: '60', text: '1 hora' },

// --- Line 6654 ---
{ val: '120', text: '2 horas' },

// --- Line 6655 ---
{ val: '180', text: '3 horas' },

// --- Line 6656 ---
{ val: 'custom', text: 'Personalizado...' }

// --- Line 6657 ---
];

// --- Line 6658 ---
durations.forEach(d => {

// --- Line 6659 ---
const opt = el('option');

// --- Line 6660 ---
opt.value = d.val;

// --- Line 6661 ---
opt.textContent = d.text;

// --- Line 6662 ---
durationSelect.appendChild(opt);

// --- Line 6663 ---
});

// --- Line 6664 ---


// --- Line 6665 ---
const customDurationInput = el('input');

// --- Line 6666 ---
customDurationInput.type = 'number';

// --- Line 6667 ---
customDurationInput.id = 'agendaCustomDuration';

// --- Line 6668 ---
customDurationInput.name = 'agendaCustomDuration';

// --- Line 6669 ---
customDurationInput.placeholder = 'Minutos';

// --- Line 6670 ---
customDurationInput.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6671 ---
customDurationInput.style.background = 'var(--bg)';

// --- Line 6672 ---
customDurationInput.style.color = '#fff';

// --- Line 6673 ---
customDurationInput.style.padding = '6px 8px';

// --- Line 6674 ---
customDurationInput.style.borderRadius = '6px';

// --- Line 6675 ---
customDurationInput.style.fontSize = '14px';

// --- Line 6676 ---
customDurationInput.style.width = '80px';

// --- Line 6677 ---
customDurationInput.style.display = 'none';

// --- Line 6678 ---


// --- Line 6679 ---
if (['15', '30', '60', '120', '180'].includes(currentDuration)) {

// --- Line 6680 ---
durationSelect.value = currentDuration;

// --- Line 6681 ---
} else if (currentDuration) {

// --- Line 6682 ---
durationSelect.value = 'custom';

// --- Line 6683 ---
customDurationInput.value = currentDuration;

// --- Line 6684 ---
customDurationInput.style.display = '';

// --- Line 6685 ---
} else {

// --- Line 6686 ---
durationSelect.value = '60';

// --- Line 6687 ---
}

// --- Line 6688 ---


// --- Line 6689 ---
durationSelect.addEventListener('change', function () {

// --- Line 6690 ---
if (durationSelect.value === 'custom') {

// --- Line 6691 ---
customDurationInput.style.display = '';

// --- Line 6692 ---
} else {

// --- Line 6693 ---
customDurationInput.style.display = 'none';

// --- Line 6694 ---
}

// --- Line 6695 ---
});

// --- Line 6696 ---


// --- Line 6697 ---
const recLabel = el('span');

// --- Line 6698 ---
recLabel.textContent = 'Repetir:';

// --- Line 6699 ---
recLabel.style.fontSize = '13px';

// --- Line 6700 ---
recLabel.style.color = '#9fb3d2';

// --- Line 6701 ---


// --- Line 6702 ---
const recurrenceSelect = el('select');

// --- Line 6703 ---
recurrenceSelect.id = 'agendaRecurrence';

// --- Line 6704 ---
recurrenceSelect.name = 'agendaRecurrence';

// --- Line 6705 ---
recurrenceSelect.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6706 ---
recurrenceSelect.style.background = 'var(--bg)';

// --- Line 6707 ---
recurrenceSelect.style.color = '#fff';

// --- Line 6708 ---
recurrenceSelect.style.padding = '6px 8px';

// --- Line 6709 ---
recurrenceSelect.style.borderRadius = '6px';

// --- Line 6710 ---
recurrenceSelect.style.fontSize = '14px';

// --- Line 6711 ---
recurrenceSelect.style.cursor = 'pointer';

// --- Line 6712 ---


// --- Line 6713 ---
const recOptions = [

// --- Line 6714 ---
{ val: 'none', text: 'N�o se repete' },

// --- Line 6715 ---
{ val: 'daily', text: 'Todos os dias' },

// --- Line 6716 ---
{ val: 'weekdays', text: 'Dias da semana (segunda a sexta)' },

// --- Line 6717 ---
{ val: 'weekly', text: 'Semanalmente' },

// --- Line 6718 ---
{ val: 'monthly', text: 'Mensalmente' },

// --- Line 6719 ---
{ val: 'custom', text: 'Personalizado...' }

// --- Line 6720 ---
];

// --- Line 6721 ---
recOptions.forEach(o => {

// --- Line 6722 ---
const opt = el('option');

// --- Line 6723 ---
opt.value = o.val;

// --- Line 6724 ---
opt.textContent = o.text;

// --- Line 6725 ---
recurrenceSelect.appendChild(opt);

// --- Line 6726 ---
});

// --- Line 6727 ---


// --- Line 6728 ---
if (isCustomRecurrence) {

// --- Line 6729 ---
recurrenceSelect.value = 'custom';

// --- Line 6730 ---
} else {

// --- Line 6731 ---
recurrenceSelect.value = currentRecurrence;

// --- Line 6732 ---
}

// --- Line 6733 ---


// --- Line 6734 ---
const recEditBtn = el('button');

// --- Line 6735 ---
recEditBtn.type = 'button';

// --- Line 6736 ---
recEditBtn.textContent = '?? Editar';

// --- Line 6737 ---
recEditBtn.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6738 ---
recEditBtn.style.background = 'var(--bg)';

// --- Line 6739 ---
recEditBtn.style.color = '#fff';

// --- Line 6740 ---
recEditBtn.style.padding = '6px 8px';

// --- Line 6741 ---
recEditBtn.style.borderRadius = '6px';

// --- Line 6742 ---
recEditBtn.style.fontSize = '14px';

// --- Line 6743 ---
recEditBtn.style.cursor = 'pointer';

// --- Line 6744 ---
recEditBtn.style.display = isCustomRecurrence ? 'inline-block' : 'none';

// --- Line 6745 ---


// --- Line 6746 ---
recurrenceSelect.addEventListener('change', function () {

// --- Line 6747 ---
if (recurrenceSelect.value === 'custom') {

// --- Line 6748 ---
openCustomRecurrenceDialog(tempRecurrenceValue.startsWith('{') ? 
       tempRecurrenceValue : null, function(savedRule) {

// --- Line 6749 ---
tempRecurrenceValue = JSON.stringify(savedRule);

// --- Line 6750 ---
recEditBtn.style.display = 'inline-block';

// --- Line 6751 ---
}, function() {

// --- Line 6752 ---
if (tempRecurrenceValue.startsWith('{')) {

// --- Line 6753 ---
recurrenceSelect.value = 'custom';

// --- Line 6754 ---
recEditBtn.style.display = 'inline-block';

// --- Line 6755 ---
} else {

// --- Line 6756 ---
recurrenceSelect.value = tempRecurrenceValue;

// --- Line 6757 ---
recEditBtn.style.display = 'none';

// --- Line 6758 ---
}

// --- Line 6759 ---
});

// --- Line 6760 ---
} else {

// --- Line 6761 ---
tempRecurrenceValue = recurrenceSelect.value;

// --- Line 6762 ---
recEditBtn.style.display = 'none';

// --- Line 6763 ---
}

// --- Line 6764 ---
});

// --- Line 6765 ---


// --- Line 6766 ---
recEditBtn.onclick = function(e) {

// --- Line 6767 ---
e.preventDefault();

// --- Line 6768 ---
openCustomRecurrenceDialog(tempRecurrenceValue.startsWith('{') ? tempRecurrenceValue : 
       null, function(savedRule) {

// --- Line 6769 ---
tempRecurrenceValue = JSON.stringify(savedRule);

// --- Line 6770 ---
});

// --- Line 6771 ---
};

// --- Line 6772 ---


// --- Line 6773 ---
durRecRow.appendChild(durationLabel);

// --- Line 6774 ---
durRecRow.appendChild(durationSelect);

// --- Line 6775 ---
durRecRow.appendChild(customDurationInput);

// --- Line 6776 ---
durRecRow.appendChild(recLabel);

// --- Line 6777 ---
durRecRow.appendChild(recurrenceSelect);

// --- Line 6778 ---
durRecRow.appendChild(recEditBtn);

// --- Line 6779 ---
r.appendChild(durRecRow);

// --- Line 6780 ---


// --- Line 6781 ---
// 4. Alert Row (Modern UX)

// --- Line 6782 ---
const alertRow = el('div');

// --- Line 6783 ---
alertRow.id = 'agendaAlertRow';

// --- Line 6784 ---
alertRow.style.display = 'flex';

// --- Line 6785 ---
alertRow.style.alignItems = 'center';

// --- Line 6786 ---
alertRow.style.justifyContent = 'space-between';

// --- Line 6787 ---
alertRow.style.padding = '10px 12px';

// --- Line 6788 ---
alertRow.style.background = 'var(--bg)';

// --- Line 6789 ---
alertRow.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6790 ---
alertRow.style.borderRadius = '8px';

// --- Line 6791 ---
alertRow.style.cursor = 'pointer';

// --- Line 6792 ---
alertRow.style.marginTop = '6px';

// --- Line 6793 ---
alertRow.style.transition = 'background 0.2s';

// --- Line 6794 ---
alertRow.onmouseover = () => alertRow.style.background = 'color-mix(in srgb, var(--brand) 
       10%, var(--panel))';

// --- Line 6795 ---
alertRow.onmouseout = () => alertRow.style.background = 'var(--bg)';

// --- Line 6796 ---


// --- Line 6797 ---
function updateAlertRowSummary() {

// --- Line 6798 ---
const summaryEl = alertRow.querySelector('#agendaAlertSummary');

// --- Line 6799 ---
if (summaryEl) {

// --- Line 6800 ---
if (tempAlertEnabled) {

// --- Line 6801 ---
if (tempAlertValue === 0) {

// --- Line 6802 ---
summaryEl.textContent = 'No hor�rio do evento';

// --- Line 6803 ---
} else {

// --- Line 6804 ---
summaryEl.textContent = `${tempAlertValue} ${tempAlertUnit} antes`;

// --- Line 6805 ---
}

// --- Line 6806 ---
} else {

// --- Line 6807 ---
summaryEl.textContent = 'Desativado';

// --- Line 6808 ---
}

// --- Line 6809 ---
}

// --- Line 6810 ---
}

// --- Line 6811 ---


// --- Line 6812 ---
alertRow.innerHTML = `

// --- Line 6813 ---
<div style="display: flex; align-items: center; gap: 10px;">

// --- Line 6814 ---
<span style="font-size: 18px;">??</span>

// --- Line 6815 ---
<div style="display: flex; flex-direction: column; text-align: left;">

// --- Line 6816 ---
<span style="font-size: 13px; font-weight: bold; color: #fff;">Alerta / 
       Notifica��o</span>

// --- Line 6817 ---
<span id="agendaAlertSummary" style="font-size: 12px; color: 
       #9fb3d2;">Desativado</span>

// --- Line 6818 ---
</div>

// --- Line 6819 ---
</div>

// --- Line 6820 ---
<span style="font-size: 14px; color: #9fb3d2;">?</span>

// --- Line 6821 ---
`;

// --- Line 6822 ---


// --- Line 6823 ---
alertRow.onclick = function() {

// --- Line 6824 ---
openAlertDialog({

// --- Line 6825 ---
alertEnabled: tempAlertEnabled ? 'true' : 'false',

// --- Line 6826 ---
alertValue: tempAlertValue,

// --- Line 6827 ---
alertUnit: tempAlertUnit

// --- Line 6828 ---
}, function(saved) {

// --- Line 6829 ---
tempAlertEnabled = saved.alertEnabled;

// --- Line 6830 ---
tempAlertValue = saved.alertValue;

// --- Line 6831 ---
tempAlertUnit = saved.alertUnit;

// --- Line 6832 ---
updateAlertRowSummary();

// --- Line 6833 ---
});

// --- Line 6834 ---
};

// --- Line 6835 ---


// --- Line 6836 ---
r.appendChild(alertRow);

// --- Line 6837 ---
setTimeout(updateAlertRowSummary, 0);

// --- Line 6838 ---


// --- Line 6839 ---
// 5. Description Textarea

// --- Line 6840 ---
const descRow = el('div');

// --- Line 6841 ---
descRow.innerHTML = `<textarea id="agendaDescription" name="agendaDescription" 
       placeholder="Adicionar descri��o..." style="width: 100%; min-height: 80px; border: 1px solid rgba(255, 255, 
       255, 0.15); background: var(--bg); color: #fff; border-radius: 6px; padding: 8px; font-size: 14px; resize: 
       vertical; outline: none; font-family: inherit;"></textarea>`;

// --- Line 6842 ---
const descTextarea = descRow.querySelector('#agendaDescription');

// --- Line 6843 ---
descTextarea.value = currentDescription;

// --- Line 6844 ---
descTextarea.addEventListener('focus', () => descTextarea.style.borderColor = 
       'var(--brand)');

// --- Line 6845 ---
descTextarea.addEventListener('blur', () => descTextarea.style.borderColor = 'rgba(255, 
       255, 255, 0.15)');

// --- Line 6846 ---
r.appendChild(descRow);

// --- Line 6847 ---


// --- Line 6848 ---
return r;

// --- Line 6849 ---
}, function (body, wrap) {

// --- Line 6850 ---
const titleVal = body.querySelector('#agendaTitle').value.trim();

// --- Line 6851 ---
const dateVal = body.querySelector('#agendaDateVal').value;

// --- Line 6852 ---
const timeVal = body.querySelector('#agendaTimeVal').value;

// --- Line 6853 ---
const isAllDayChecked = body.querySelector('#agendaAllDay').checked;

// --- Line 6854 ---
const isGoalChecked = body.querySelector('#agendaGoal').checked;

// --- Line 6855 ---
const recVal = body.querySelector('#agendaRecurrence').value;

// --- Line 6856 ---
const descVal = body.querySelector('#agendaDescription').value.trim();

// --- Line 6857 ---


// --- Line 6858 ---
const durSelVal = body.querySelector('#agendaDuration').value;

// --- Line 6859 ---
let durVal = durSelVal;

// --- Line 6860 ---
if (durSelVal === 'custom') {

// --- Line 6861 ---
durVal = body.querySelector('#agendaCustomDuration').value.trim();

// --- Line 6862 ---
}

// --- Line 6863 ---


// --- Line 6864 ---
// Recurrence save string

// --- Line 6865 ---
let recurrenceSaveValue = recVal;

// --- Line 6866 ---
if (recVal === 'custom') {

// --- Line 6867 ---
recurrenceSaveValue = tempRecurrenceValue;

// --- Line 6868 ---
}

// --- Line 6869 ---


// --- Line 6870 ---
const targetCard = card._originalReference || card;

// --- Line 6871 ---
const txtSpan = targetCard.querySelector('.text');

// --- Line 6872 ---
if (txtSpan) {

// --- Line 6873 ---
txtSpan.textContent = (isGoalChecked ? '?? ' : '') + titleVal;

// --- Line 6874 ---
}

// --- Line 6875 ---


// --- Line 6876 ---
targetCard.dataset.description = descVal;

// --- Line 6877 ---
targetCard.dataset.duration = isAllDayChecked ? '' : durVal;

// --- Line 6878 ---
targetCard.dataset.recurrence = recurrenceSaveValue;

// --- Line 6879 ---


// --- Line 6880 ---
targetCard.dataset.alertEnabled = tempAlertEnabled ? 'true' : 'false';

// --- Line 6881 ---
targetCard.dataset.alertValue = tempAlertValue;

// --- Line 6882 ---
targetCard.dataset.alertUnit = tempAlertUnit;

// --- Line 6883 ---
targetCard.dataset.alertFired = 'false'; // Reset fired status on change

// --- Line 6884 ---


// --- Line 6885 ---
if (isGoalChecked) {

// --- Line 6886 ---
targetCard.dataset.when = dateVal + 'TGOAL';

// --- Line 6887 ---
} else if (isAllDayChecked) {

// --- Line 6888 ---
targetCard.dataset.when = dateVal + 'T';

// --- Line 6889 ---
} else {

// --- Line 6890 ---
targetCard.dataset.when = dateVal + 'T' + timeVal;

// --- Line 6891 ---
}

// --- Line 6892 ---


// --- Line 6893 ---
targetCard.dataset.recurrenceParent = '';

// --- Line 6894 ---


// --- Line 6895 ---
paintCard(targetCard);

// --- Line 6896 ---
generateRecurrences(targetCard);

// --- Line 6897 ---
applyFilters();

// --- Line 6898 ---
updateSlotsHasItems();

// --- Line 6899 ---
});

// --- Line 6900 ---
}

// --- Line 6901 ---
function openTimerDialog(cards, onOkCallback) {

// --- Line 6902 ---
if (!cards.length) return;

// --- Line 6903 ---
var modalElements = showModal('Definir Timer (minutos)', function () {

// --- Line 6904 ---
var r = el('div');

// --- Line 6905 ---
var timerVal = Math.round(parseInt(cards[0].dataset.timerTotal || '0', 10) / 60) || '';

// --- Line 6906 ---
r.innerHTML = `<label style="display: block;">Tempo para o timer (em minutos):<input 
       type="number" id="timerInputValue" name="timerInputValue" class="timer-input" placeholder="Ex: 25" 
       value="${timerVal}" style="width:100%; padding:8px; background:var(--bg); border:1px solid rgba(255, 255, 255, 
       0.15); border-radius:8px; color:#fff; margin-top: 4px;"></label>`;

// --- Line 6907 ---
const input = r.querySelector('.timer-input'); if (input) { 
       input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); 
       modalElements.okButton.click(); } }); }

// --- Line 6908 ---
return r;

// --- Line 6909 ---
}, function (r, wrap) {

// --- Line 6910 ---
var timerMins = r.querySelector('.timer-input').value;

// --- Line 6911 ---
cards.forEach(function (c) {

// --- Line 6912 ---
var newTotal = (parseInt(timerMins, 10) || 0) * 60;

// --- Line 6913 ---
c.dataset.timerTotal = newTotal; c.dataset.timerLeft = newTotal; c.dataset.timerState = 
       'stopped';

// --- Line 6914 ---
c.style.animation = ''; c.classList.remove('timer-running', 'timer-finished'); 
       paintCard(c);

// --- Line 6915 ---
});

// --- Line 6916 ---
applyFilters(); updateTotalTimerDisplay(); if (onOkCallback) onOkCallback();

// --- Line 6917 ---
});

// --- Line 6918 ---
modalElements.cancelButton.onclick = function () { 
       modalElements.wrap.removeEventListener('keydown', modalElements.modalKeyListener); 
       document.body.removeChild(modalElements.wrap); persist(); }

// --- Line 6919 ---
}

// --- Line 6920 ---
function openAnalogTimePicker(initialTime, onSelect) {

// --- Line 6921 ---
// Parse initialTime (format "HH:MM")

// --- Line 6922 ---
let parts = (initialTime || "09:00").split(":");

// --- Line 6923 ---
let currentHour = parseInt(parts[0], 10);

// --- Line 6924 ---
let currentMinute = parseInt(parts[1], 10);

// --- Line 6925 ---
if (isNaN(currentHour) || currentHour < 0 || currentHour > 23) currentHour = 9;

// --- Line 6926 ---
if (isNaN(currentMinute) || currentMinute < 0 || currentMinute > 59) currentMinute = 0;

// --- Line 6927 ---


// --- Line 6928 ---
// State

// --- Line 6929 ---
let activeMode = 'hour'; // 'hour' or 'minute'

// --- Line 6930 ---
let inputMode = 'analog'; // 'analog' or 'keyboard'

// --- Line 6931 ---


// --- Line 6932 ---
// Create backdrop

// --- Line 6933 ---
const backdrop = el('div', 'analog-time-picker-backdrop');

// --- Line 6934 ---
const modal = el('div', 'analog-time-picker-modal');

// --- Line 6935 ---


// --- Line 6936 ---
const title = el('div', 'analog-time-picker-title');

// --- Line 6937 ---
title.textContent = 'Selecionar hor�rio';

// --- Line 6938 ---
modal.appendChild(title);

// --- Line 6939 ---


// --- Line 6940 ---
// Digital display

// --- Line 6941 ---
const displayRow = el('div', 'analog-time-picker-display');

// --- Line 6942 ---


// --- Line 6943 ---
const hourInput = el('input');

// --- Line 6944 ---
hourInput.type = 'text';

// --- Line 6945 ---
hourInput.id = 'analog-hour-input';

// --- Line 6946 ---
hourInput.value = to2(currentHour);

// --- Line 6947 ---
hourInput.readOnly = true;

// --- Line 6948 ---
hourInput.maxLength = 2;

// --- Line 6949 ---
hourInput.pattern = '[0-9]*';

// --- Line 6950 ---
hourInput.inputMode = 'numeric';

// --- Line 6951 ---
hourInput.classList.add('active');

// --- Line 6952 ---


// --- Line 6953 ---
const colon = el('span');

// --- Line 6954 ---
colon.textContent = ':';

// --- Line 6955 ---


// --- Line 6956 ---
const minuteInput = el('input');

// --- Line 6957 ---
minuteInput.type = 'text';

// --- Line 6958 ---
minuteInput.id = 'analog-minute-input';

// --- Line 6959 ---
minuteInput.value = to2(currentMinute);

// --- Line 6960 ---
minuteInput.readOnly = true;

// --- Line 6961 ---
minuteInput.maxLength = 2;

// --- Line 6962 ---
minuteInput.pattern = '[0-9]*';

// --- Line 6963 ---
minuteInput.inputMode = 'numeric';

// --- Line 6964 ---


// --- Line 6965 ---
displayRow.appendChild(hourInput);

// --- Line 6966 ---
displayRow.appendChild(colon);

// --- Line 6967 ---
displayRow.appendChild(minuteInput);

// --- Line 6968 ---
modal.appendChild(displayRow);

// --- Line 6969 ---


// --- Line 6970 ---
// Face Container

// --- Line 6971 ---
const faceContainer = el('div', 'analog-time-picker-face-container');

// --- Line 6972 ---
modal.appendChild(faceContainer);

// --- Line 6973 ---


// --- Line 6974 ---
// Keyboard input help message (hidden by default)

// --- Line 6975 ---
const keyboardMsg = el('div', 'analog-time-picker-keyboard-input-msg');

// --- Line 6976 ---
keyboardMsg.textContent = 'Digite o hor�rio desejado nos campos acima.';

// --- Line 6977 ---
keyboardMsg.style.display = 'none';

// --- Line 6978 ---
modal.appendChild(keyboardMsg);

// --- Line 6979 ---


// --- Line 6980 ---
// SVG for needle drawing

// --- Line 6981 ---
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// --- Line 6982 ---
svg.setAttribute("class", "analog-time-picker-svg");

// --- Line 6983 ---
faceContainer.appendChild(svg);

// --- Line 6984 ---


// --- Line 6985 ---
// Helper to update SVGNeedle

// --- Line 6986 ---
function updateNeedle(value) {

// --- Line 6987 ---
// Clear existing elements in SVG

// --- Line 6988 ---
svg.innerHTML = '';

// --- Line 6989 ---


// --- Line 6990 ---
let R = 92; // Default outer radius

// --- Line 6991 ---
let angleStep = 30; // 360 / 12

// --- Line 6992 ---


// --- Line 6993 ---
if (activeMode === 'hour') {

// --- Line 6994 ---
R = value < 12 ? 92 : 62;

// --- Line 6995 ---
angleStep = 30;

// --- Line 6996 ---
} else {

// --- Line 6997 ---
R = 92;

// --- Line 6998 ---
angleStep = 6; // 360 / 60

// --- Line 6999 ---
}

// --- Line 7000 ---


// --- Line 7001 ---
const angleDeg = (value * angleStep) - 90;

// --- Line 7002 ---
const angleRad = angleDeg * Math.PI / 180;

// --- Line 7003 ---
const centerX = 115;

// --- Line 7004 ---
const centerY = 115;

// --- Line 7005 ---
const targetX = centerX + R * Math.cos(angleRad);

// --- Line 7006 ---
const targetY = centerY + R * Math.sin(angleRad);

// --- Line 7007 ---


// --- Line 7008 ---
// Create line

// --- Line 7009 ---
const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

// --- Line 7010 ---
line.setAttribute("x1", centerX);

// --- Line 7011 ---
line.setAttribute("y1", centerY);

// --- Line 7012 ---
line.setAttribute("x2", targetX);

// --- Line 7013 ---
line.setAttribute("y2", targetY);

// --- Line 7014 ---
line.setAttribute("stroke", "var(--brand)");

// --- Line 7015 ---
line.setAttribute("stroke-width", "2");

// --- Line 7016 ---
svg.appendChild(line);

// --- Line 7017 ---


// --- Line 7018 ---
// Center pivot circle

// --- Line 7019 ---
const pivot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

// --- Line 7020 ---
pivot.setAttribute("cx", centerX);

// --- Line 7021 ---
pivot.setAttribute("cy", centerY);

// --- Line 7022 ---
pivot.setAttribute("r", "4");

// --- Line 7023 ---
pivot.setAttribute("fill", "var(--brand)");

// --- Line 7024 ---
svg.appendChild(pivot);

// --- Line 7025 ---


// --- Line 7026 ---
// End selection circle

// --- Line 7027 ---
const targetCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

// --- Line 7028 ---
targetCircle.setAttribute("cx", targetX);

// --- Line 7029 ---
targetCircle.setAttribute("cy", targetY);

// --- Line 7030 ---
targetCircle.setAttribute("r", "16");

// --- Line 7031 ---
targetCircle.setAttribute("fill", "var(--brand)");

// --- Line 7032 ---
targetCircle.setAttribute("opacity", "0.85");

// --- Line 7033 ---
svg.appendChild(targetCircle);

// --- Line 7034 ---


// --- Line 7035 ---
// Small center dot in target circle

// --- Line 7036 ---
const targetCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");

// --- Line 7037 ---
targetCenter.setAttribute("cx", targetX);

// --- Line 7038 ---
targetCenter.setAttribute("cy", targetY);

// --- Line 7039 ---
targetCenter.setAttribute("r", "3");

// --- Line 7040 ---
targetCenter.setAttribute("fill", "#fff");

// --- Line 7041 ---
svg.appendChild(targetCenter);

// --- Line 7042 ---


// --- Line 7043 ---
// Highlight selected number HTML element

// --- Line 7044 ---
faceContainer.querySelectorAll('.analog-time-picker-number').forEach(numEl => {

// --- Line 7045 ---
const val = parseInt(numEl.dataset.value, 10);

// --- Line 7046 ---
if (val === value) {

// --- Line 7047 ---
numEl.classList.add('selected');

// --- Line 7048 ---
} else {

// --- Line 7049 ---
numEl.classList.remove('selected');

// --- Line 7050 ---
}

// --- Line 7051 ---
});

// --- Line 7052 ---
}

// --- Line 7053 ---


// --- Line 7054 ---
// Render Clock Face Numbers

// --- Line 7055 ---
function renderFace() {

// --- Line 7056 ---
// Remove existing HTML numbers (keep SVG)

// --- Line 7057 ---
faceContainer.querySelectorAll('.analog-time-picker-number').forEach(el => el.remove());

// --- Line 7058 ---


// --- Line 7059 ---
const centerX = 115;

// --- Line 7060 ---
const centerY = 115;

// --- Line 7061 ---


// --- Line 7062 ---
if (activeMode === 'hour') {

// --- Line 7063 ---
// Outer circle (0-11)

// --- Line 7064 ---
for (let h = 0; h < 12; h++) {

// --- Line 7065 ---
const numEl = el('div', 'analog-time-picker-number');

// --- Line 7066 ---
numEl.textContent = h === 0 ? '0' : h.toString();

// --- Line 7067 ---
numEl.dataset.value = h;

// --- Line 7068 ---
const angle = (h * 30 - 90) * Math.PI / 180;

// --- Line 7069 ---
const x = centerX + 92 * Math.cos(angle) - 14;

// --- Line 7070 ---
const y = centerY + 92 * Math.sin(angle) - 14;

// --- Line 7071 ---
numEl.style.left = x + 'px';

// --- Line 7072 ---
numEl.style.top = y + 'px';

// --- Line 7073 ---
faceContainer.appendChild(numEl);

// --- Line 7074 ---
}

// --- Line 7075 ---
// Inner circle (12-23)

// --- Line 7076 ---
for (let h = 12; h < 24; h++) {

// --- Line 7077 ---
const numEl = el('div', 'analog-time-picker-number');

// --- Line 7078 ---
numEl.textContent = h.toString();

// --- Line 7079 ---
numEl.dataset.value = h;

// --- Line 7080 ---
const angle = ((h - 12) * 30 - 90) * Math.PI / 180;

// --- Line 7081 ---
const x = centerX + 62 * Math.cos(angle) - 14;

// --- Line 7082 ---
const y = centerY + 62 * Math.sin(angle) - 14;

// --- Line 7083 ---
numEl.style.left = x + 'px';

// --- Line 7084 ---
numEl.style.top = y + 'px';

// --- Line 7085 ---
faceContainer.appendChild(numEl);

// --- Line 7086 ---
}

// --- Line 7087 ---
updateNeedle(currentHour);

// --- Line 7088 ---
} else {

// --- Line 7089 ---
// Minutes (0-55, step 5)

// --- Line 7090 ---
for (let m = 0; m < 60; m += 5) {

// --- Line 7091 ---
const numEl = el('div', 'analog-time-picker-number');

// --- Line 7092 ---
numEl.textContent = m === 0 ? '0' : to2(m);

// --- Line 7093 ---
numEl.dataset.value = m;

// --- Line 7094 ---
const angle = ((m / 5) * 30 - 90) * Math.PI / 180;

// --- Line 7095 ---
const x = centerX + 92 * Math.cos(angle) - 14;

// --- Line 7096 ---
const y = centerY + 92 * Math.sin(angle) - 14;

// --- Line 7097 ---
numEl.style.left = x + 'px';

// --- Line 7098 ---
numEl.style.top = y + 'px';

// --- Line 7099 ---
faceContainer.appendChild(numEl);

// --- Line 7100 ---
}

// --- Line 7101 ---
updateNeedle(currentMinute);

// --- Line 7102 ---
}

// --- Line 7103 ---
}

// --- Line 7104 ---


// --- Line 7105 ---
// Interactive selection handler from click/touch coordinates

// --- Line 7106 ---
function handlePointer(clientX, clientY, isEnd = false) {

// --- Line 7107 ---
const rect = faceContainer.getBoundingClientRect();

// --- Line 7108 ---
const x = clientX - rect.left - 115;

// --- Line 7109 ---
const y = clientY - rect.top - 115;

// --- Line 7110 ---


// --- Line 7111 ---
let angleRad = Math.atan2(y, x);

// --- Line 7112 ---
let angleDeg = angleRad * 180 / Math.PI + 90;

// --- Line 7113 ---
if (angleDeg < 0) angleDeg += 360;

// --- Line 7114 ---


// --- Line 7115 ---
if (activeMode === 'hour') {

// --- Line 7116 ---
// Determine outer vs inner ring

// --- Line 7117 ---
const dist = Math.sqrt(x*x + y*y);

// --- Line 7118 ---
const isInner = dist < 77; // threshold between 62px and 92px radius (midpoint is 77px)

// --- Line 7119 ---


// --- Line 7120 ---
let hourBase = Math.round(angleDeg / 30) % 12;

// --- Line 7121 ---
let val = isInner ? hourBase + 12 : hourBase;

// --- Line 7122 ---


// --- Line 7123 ---
currentHour = val;

// --- Line 7124 ---
hourInput.value = to2(currentHour);

// --- Line 7125 ---
updateNeedle(currentHour);

// --- Line 7126 ---


// --- Line 7127 ---
if (isEnd) {

// --- Line 7128 ---
// Switch to minutes mode on release

// --- Line 7129 ---
activeMode = 'minute';

// --- Line 7130 ---
hourInput.classList.remove('active');

// --- Line 7131 ---
minuteInput.classList.add('active');

// --- Line 7132 ---
renderFace();

// --- Line 7133 ---
}

// --- Line 7134 ---
} else {

// --- Line 7135 ---
let minVal = Math.round(angleDeg / 6) % 60;

// --- Line 7136 ---
currentMinute = minVal;

// --- Line 7137 ---
minuteInput.value = to2(currentMinute);

// --- Line 7138 ---
updateNeedle(currentMinute);

// --- Line 7139 ---
}

// --- Line 7140 ---
}

// --- Line 7141 ---


// --- Line 7142 ---
// Pointer Events on Face

// --- Line 7143 ---
let isDragging = false;

// --- Line 7144 ---
faceContainer.onpointerdown = (e) => {

// --- Line 7145 ---
e.preventDefault();

// --- Line 7146 ---
isDragging = true;

// --- Line 7147 ---
faceContainer.setPointerCapture(e.pointerId);

// --- Line 7148 ---
handlePointer(e.clientX, e.clientY);

// --- Line 7149 ---
};

// --- Line 7150 ---
faceContainer.onpointermove = (e) => {

// --- Line 7151 ---
if (isDragging) {

// --- Line 7152 ---
e.preventDefault();

// --- Line 7153 ---
handlePointer(e.clientX, e.clientY);

// --- Line 7154 ---
}

// --- Line 7155 ---
};

// --- Line 7156 ---
faceContainer.onpointerup = (e) => {

// --- Line 7157 ---
if (isDragging) {

// --- Line 7158 ---
isDragging = false;

// --- Line 7159 ---
faceContainer.releasePointerCapture(e.pointerId);

// --- Line 7160 ---
handlePointer(e.clientX, e.clientY, true);

// --- Line 7161 ---
}

// --- Line 7162 ---
};

// --- Line 7163 ---


// --- Line 7164 ---
// Click digital displays to toggle modes

// --- Line 7165 ---
hourInput.onclick = () => {

// --- Line 7166 ---
if (inputMode === 'analog') {

// --- Line 7167 ---
activeMode = 'hour';

// --- Line 7168 ---
hourInput.classList.add('active');

// --- Line 7169 ---
minuteInput.classList.remove('active');

// --- Line 7170 ---
renderFace();

// --- Line 7171 ---
}

// --- Line 7172 ---
};

// --- Line 7173 ---
minuteInput.onclick = () => {

// --- Line 7174 ---
if (inputMode === 'analog') {

// --- Line 7175 ---
activeMode = 'minute';

// --- Line 7176 ---
hourInput.classList.remove('active');

// --- Line 7177 ---
minuteInput.classList.add('active');

// --- Line 7178 ---
renderFace();

// --- Line 7179 ---
}

// --- Line 7180 ---
};

// --- Line 7181 ---


// --- Line 7182 ---
// Footer section with Keyboard and OK/Cancel buttons

// --- Line 7183 ---
const footer = el('div', 'analog-time-picker-footer');

// --- Line 7184 ---


// --- Line 7185 ---
const keyboardBtn = el('button', 'analog-time-picker-keyboard-btn');

// --- Line 7186 ---
keyboardBtn.type = 'button';

// --- Line 7187 ---
keyboardBtn.innerHTML = '??'; // Keyboard icon

// --- Line 7188 ---
keyboardBtn.title = 'Digitar hor�rio';

// --- Line 7189 ---
footer.appendChild(keyboardBtn);

// --- Line 7190 ---


// --- Line 7191 ---
const buttonsDiv = el('div', 'analog-time-picker-buttons');

// --- Line 7192 ---


// --- Line 7193 ---
const cancelBtn = el('button');

// --- Line 7194 ---
cancelBtn.type = 'button';

// --- Line 7195 ---
cancelBtn.textContent = 'Cancelar';

// --- Line 7196 ---


// --- Line 7197 ---
const okBtn = el('button');

// --- Line 7198 ---
okBtn.type = 'button';

// --- Line 7199 ---
okBtn.textContent = 'OK';

// --- Line 7200 ---


// --- Line 7201 ---
buttonsDiv.appendChild(cancelBtn);

// --- Line 7202 ---
buttonsDiv.appendChild(okBtn);

// --- Line 7203 ---
footer.appendChild(buttonsDiv);

// --- Line 7204 ---
modal.appendChild(footer);

// --- Line 7205 ---
backdrop.appendChild(modal);

// --- Line 7206 ---
document.body.appendChild(backdrop);

// --- Line 7207 ---


// --- Line 7208 ---
// Initial face render

// --- Line 7209 ---
renderFace();

// --- Line 7210 ---


// --- Line 7211 ---
// Keyboard Toggle Handler

// --- Line 7212 ---
keyboardBtn.onclick = () => {

// --- Line 7213 ---
if (inputMode === 'analog') {

// --- Line 7214 ---
// Switch to keyboard mode

// --- Line 7215 ---
inputMode = 'keyboard';

// --- Line 7216 ---
keyboardBtn.innerHTML = '??'; // Clock icon

// --- Line 7217 ---
keyboardBtn.title = 'Usar rel�gio';

// --- Line 7218 ---
faceContainer.style.display = 'none';

// --- Line 7219 ---
keyboardMsg.style.display = 'block';

// --- Line 7220 ---


// --- Line 7221 ---
hourInput.readOnly = false;

// --- Line 7222 ---
minuteInput.readOnly = false;

// --- Line 7223 ---
hourInput.classList.add('active');

// --- Line 7224 ---
minuteInput.classList.add('active');

// --- Line 7225 ---
hourInput.focus();

// --- Line 7226 ---
hourInput.select();

// --- Line 7227 ---
} else {

// --- Line 7228 ---
// Switch to analog mode

// --- Line 7229 ---
inputMode = 'analog';

// --- Line 7230 ---
keyboardBtn.innerHTML = '??';

// --- Line 7231 ---
keyboardBtn.title = 'Digitar hor�rio';

// --- Line 7232 ---
faceContainer.style.display = 'block';

// --- Line 7233 ---
keyboardMsg.style.display = 'none';

// --- Line 7234 ---


// --- Line 7235 ---
// Parse values currently in inputs, clamp if invalid

// --- Line 7236 ---
let h = parseInt(hourInput.value, 10);

// --- Line 7237 ---
let m = parseInt(minuteInput.value, 10);

// --- Line 7238 ---
if (isNaN(h) || h < 0 || h > 23) h = 9;

// --- Line 7239 ---
if (isNaN(m) || m < 0 || m > 59) m = 0;

// --- Line 7240 ---
currentHour = h;

// --- Line 7241 ---
currentMinute = m;

// --- Line 7242 ---


// --- Line 7243 ---
hourInput.value = to2(currentHour);

// --- Line 7244 ---
minuteInput.value = to2(currentMinute);

// --- Line 7245 ---


// --- Line 7246 ---
hourInput.readOnly = true;

// --- Line 7247 ---
minuteInput.readOnly = true;

// --- Line 7248 ---


// --- Line 7249 ---
activeMode = 'hour';

// --- Line 7250 ---
hourInput.classList.add('active');

// --- Line 7251 ---
minuteInput.classList.remove('active');

// --- Line 7252 ---
renderFace();

// --- Line 7253 ---
}

// --- Line 7254 ---
};

// --- Line 7255 ---


// --- Line 7256 ---
// Limit keyboard entry logic

// --- Line 7257 ---
hourInput.oninput = () => {

// --- Line 7258 ---
hourInput.value = hourInput.value.replace(/[^0-9]/g, '');

// --- Line 7259 ---
let v = parseInt(hourInput.value, 10);

// --- Line 7260 ---
if (hourInput.value.length >= 2) {

// --- Line 7261 ---
if (!isNaN(v)) {

// --- Line 7262 ---
if (v > 23) hourInput.value = '23';

// --- Line 7263 ---
currentHour = parseInt(hourInput.value, 10);

// --- Line 7264 ---
}

// --- Line 7265 ---
minuteInput.focus();

// --- Line 7266 ---
minuteInput.select();

// --- Line 7267 ---
}

// --- Line 7268 ---
};

// --- Line 7269 ---
minuteInput.oninput = () => {

// --- Line 7270 ---
minuteInput.value = minuteInput.value.replace(/[^0-9]/g, '');

// --- Line 7271 ---
let v = parseInt(minuteInput.value, 10);

// --- Line 7272 ---
if (minuteInput.value.length >= 2) {

// --- Line 7273 ---
if (!isNaN(v) && v > 59) {

// --- Line 7274 ---
minuteInput.value = '59';

// --- Line 7275 ---
}

// --- Line 7276 ---
if (!isNaN(v)) {

// --- Line 7277 ---
currentMinute = parseInt(minuteInput.value, 10);

// --- Line 7278 ---
}

// --- Line 7279 ---
}

// --- Line 7280 ---
};

// --- Line 7281 ---
hourInput.onblur = () => {

// --- Line 7282 ---
let v = parseInt(hourInput.value, 10);

// --- Line 7283 ---
if (isNaN(v) || v < 0 || v > 23) v = 9;

// --- Line 7284 ---
currentHour = v;

// --- Line 7285 ---
hourInput.value = to2(currentHour);

// --- Line 7286 ---
};

// --- Line 7287 ---
minuteInput.onblur = () => {

// --- Line 7288 ---
let v = parseInt(minuteInput.value, 10);

// --- Line 7289 ---
if (isNaN(v) || v < 0 || v > 59) v = 0;

// --- Line 7290 ---
currentMinute = v;

// --- Line 7291 ---
minuteInput.value = to2(currentMinute);

// --- Line 7292 ---
};

// --- Line 7293 ---


// --- Line 7294 ---
// OK / Cancel Action Handlers

// --- Line 7295 ---
cancelBtn.onclick = () => {

// --- Line 7296 ---
backdrop.remove();

// --- Line 7297 ---
};

// --- Line 7298 ---


// --- Line 7299 ---
okBtn.onclick = () => {

// --- Line 7300 ---
let h = parseInt(hourInput.value, 10);

// --- Line 7301 ---
let m = parseInt(minuteInput.value, 10);

// --- Line 7302 ---
if (isNaN(h) || h < 0 || h > 23) h = currentHour;

// --- Line 7303 ---
if (isNaN(m) || m < 0 || m > 59) m = currentMinute;

// --- Line 7304 ---


// --- Line 7305 ---
h = Math.min(23, Math.max(0, h));

// --- Line 7306 ---
m = Math.min(59, Math.max(0, m));

// --- Line 7307 ---


// --- Line 7308 ---
const formattedTime = to2(h) + ':' + to2(m);

// --- Line 7309 ---
onSelect(formattedTime);

// --- Line 7310 ---
backdrop.remove();

// --- Line 7311 ---
};

// --- Line 7312 ---


// --- Line 7313 ---
// Close on pressing Escape inside picker

// --- Line 7314 ---
backdrop.addEventListener('keydown', (e) => {

// --- Line 7315 ---
if (e.key === 'Escape') {

// --- Line 7316 ---
e.preventDefault();

// --- Line 7317 ---
cancelBtn.click();

// --- Line 7318 ---
} else if (e.key === 'Enter') {

// --- Line 7319 ---
e.preventDefault();

// --- Line 7320 ---
okBtn.click();

// --- Line 7321 ---
}

// --- Line 7322 ---
});

// --- Line 7323 ---
}

// --- Line 7324 ---


// --- Line 7325 ---
function openBoardFilters() {

// --- Line 7326 ---
const vBoards = getVisibleBoardsInTodos();

// --- Line 7327 ---
showModal('Filtrar Quadros', function () {

// --- Line 7328 ---
const wrap = el('div');

// --- Line 7329 ---
wrap.style.display = 'flex';

// --- Line 7330 ---
wrap.style.flexDirection = 'column';

// --- Line 7331 ---
wrap.style.gap = '10px';

// --- Line 7332 ---
wrap.style.minWidth = '280px';

// --- Line 7333 ---
wrap.style.color = '#fff';

// --- Line 7334 ---


// --- Line 7335 ---
// Select All / Deselect All buttons

// --- Line 7336 ---
const btnRow = el('div');

// --- Line 7337 ---
btnRow.style.display = 'flex';

// --- Line 7338 ---
btnRow.style.gap = '8px';

// --- Line 7339 ---
btnRow.style.marginBottom = '6px';

// --- Line 7340 ---


// --- Line 7341 ---
const selectAll = el('button');

// --- Line 7342 ---
selectAll.type = 'button';

// --- Line 7343 ---
selectAll.textContent = 'Selecionar Todos';

// --- Line 7344 ---
selectAll.style.flex = '1';

// --- Line 7345 ---
selectAll.style.background = 'var(--brand)';

// --- Line 7346 ---
selectAll.style.border = 'none';

// --- Line 7347 ---
selectAll.style.borderRadius = '6px';

// --- Line 7348 ---
selectAll.style.padding = '6px';

// --- Line 7349 ---
selectAll.style.color = '#fff';

// --- Line 7350 ---
selectAll.style.cursor = 'pointer';

// --- Line 7351 ---
selectAll.onclick = () => {

// --- Line 7352 ---
wrap.querySelectorAll('.board-filter-chk').forEach(chk => chk.checked = true);

// --- Line 7353 ---
};

// --- Line 7354 ---


// --- Line 7355 ---
const deselectAll = el('button');

// --- Line 7356 ---
deselectAll.type = 'button';

// --- Line 7357 ---
deselectAll.textContent = 'Desmarcar Todos';

// --- Line 7358 ---
deselectAll.style.flex = '1';

// --- Line 7359 ---
deselectAll.style.background = '#3a3f4b';

// --- Line 7360 ---
deselectAll.style.border = 'none';

// --- Line 7361 ---
deselectAll.style.borderRadius = '6px';

// --- Line 7362 ---
deselectAll.style.padding = '6px';

// --- Line 7363 ---
deselectAll.style.color = '#fff';

// --- Line 7364 ---
deselectAll.style.cursor = 'pointer';

// --- Line 7365 ---
deselectAll.onclick = () => {

// --- Line 7366 ---
wrap.querySelectorAll('.board-filter-chk').forEach(chk => chk.checked = false);

// --- Line 7367 ---
};

// --- Line 7368 ---


// --- Line 7369 ---
btnRow.appendChild(selectAll);

// --- Line 7370 ---
btnRow.appendChild(deselectAll);

// --- Line 7371 ---
wrap.appendChild(btnRow);

// --- Line 7372 ---


// --- Line 7373 ---
const listWrap = el('div', 'filter-checkbox-list');

// --- Line 7374 ---


// --- Line 7375 ---
// Add a checkbox for each board (except trash and board-todos)

// --- Line 7376 ---
boardsMeta.forEach(b => {

// --- Line 7377 ---
if (b.id === 'board-trash' || b.id === 'board-todos') return;

// --- Line 7378 ---


// --- Line 7379 ---
const label = el('label');

// --- Line 7380 ---
label.style.display = 'flex';

// --- Line 7381 ---
label.style.alignItems = 'center';

// --- Line 7382 ---
label.style.gap = '10px';

// --- Line 7383 ---
label.style.fontSize = '14px';

// --- Line 7384 ---
label.style.cursor = 'pointer';

// --- Line 7385 ---
label.style.padding = '4px 0';

// --- Line 7386 ---


// --- Line 7387 ---
const checked = vBoards.has(b.id) ? 'checked' : '';

// --- Line 7388 ---
label.innerHTML = `

// --- Line 7389 ---
<input type="checkbox" class="board-filter-chk" data-id="${b.id}" ${checked} 
       style="cursor: pointer; width: 16px; height: 16px;">

// --- Line 7390 ---
<span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; 
       background: ${b.color || '#1976d2'};"></span>

// --- Line 7391 ---
<span>${b.name}</span>

// --- Line 7392 ---
`;

// --- Line 7393 ---
listWrap.appendChild(label);

// --- Line 7394 ---
});

// --- Line 7395 ---
wrap.appendChild(listWrap);

// --- Line 7396 ---


// --- Line 7397 ---
return wrap;

// --- Line 7398 ---
}, function (body, wrap) {

// --- Line 7399 ---
const newVisible = new Set();

// --- Line 7400 ---
body.querySelectorAll('.board-filter-chk').forEach(chk => {

// --- Line 7401 ---
if (chk.checked) {

// --- Line 7402 ---
newVisible.add(chk.dataset.id);

// --- Line 7403 ---
}

// --- Line 7404 ---
});

// --- Line 7405 ---
visibleBoardsInTodos = newVisible;

// --- Line 7406 ---
localStorage.setItem(LS_VISIBLE_BOARDS, JSON.stringify(Array.from(newVisible)));

// --- Line 7407 ---
loadAndRenderAll();

// --- Line 7408 ---
});

// --- Line 7409 ---
}

// --- Line 7410 ---


// --- Line 7411 ---
function openColorFilters() {

// --- Line 7412 ---
const PALETTE = buildFullPalette();

// --- Line 7413 ---
showModal('Filtrar por Etiquetas', function () {

// --- Line 7414 ---
const wrap = el('div');

// --- Line 7415 ---
wrap.style.display = 'flex';

// --- Line 7416 ---
wrap.style.flexDirection = 'column';

// --- Line 7417 ---
wrap.style.gap = '10px';

// --- Line 7418 ---
wrap.style.minWidth = '300px';

// --- Line 7419 ---
wrap.style.color = '#fff';

// --- Line 7420 ---


// --- Line 7421 ---
// Help/Instruction

// --- Line 7422 ---
const info = el('div');

// --- Line 7423 ---
info.textContent = 'Selecione quais etiquetas deseja exibir. Cart�es com cores desmarcadas 
       ser�o ocultados.';

// --- Line 7424 ---
info.style.fontSize = '12px';

// --- Line 7425 ---
info.style.color = '#9fb3d2';

// --- Line 7426 ---
info.style.marginBottom = '6px';

// --- Line 7427 ---
wrap.appendChild(info);

// --- Line 7428 ---


// --- Line 7429 ---
// Select All / Deselect All buttons

// --- Line 7430 ---
const btnRow = el('div');

// --- Line 7431 ---
btnRow.style.display = 'flex';

// --- Line 7432 ---
btnRow.style.gap = '8px';

// --- Line 7433 ---
btnRow.style.marginBottom = '6px';

// --- Line 7434 ---


// --- Line 7435 ---
const selectAll = el('button');

// --- Line 7436 ---
selectAll.type = 'button';

// --- Line 7437 ---
selectAll.textContent = 'Selecionar Todas';

// --- Line 7438 ---
selectAll.style.flex = '1';

// --- Line 7439 ---
selectAll.style.background = 'var(--brand)';

// --- Line 7440 ---
selectAll.style.border = 'none';

// --- Line 7441 ---
selectAll.style.borderRadius = '6px';

// --- Line 7442 ---
selectAll.style.padding = '6px';

// --- Line 7443 ---
selectAll.style.color = '#fff';

// --- Line 7444 ---
selectAll.style.cursor = 'pointer';

// --- Line 7445 ---
selectAll.onclick = () => {

// --- Line 7446 ---
wrap.querySelectorAll('.color-filter-chk').forEach(chk => chk.checked = true);

// --- Line 7447 ---
};

// --- Line 7448 ---


// --- Line 7449 ---
const deselectAll = el('button');

// --- Line 7450 ---
deselectAll.type = 'button';

// --- Line 7451 ---
deselectAll.textContent = 'Desmarcar Todas';

// --- Line 7452 ---
deselectAll.style.flex = '1';

// --- Line 7453 ---
deselectAll.style.background = '#3a3f4b';

// --- Line 7454 ---
deselectAll.style.border = 'none';

// --- Line 7455 ---
deselectAll.style.borderRadius = '6px';

// --- Line 7456 ---
deselectAll.style.padding = '6px';

// --- Line 7457 ---
deselectAll.style.color = '#fff';

// --- Line 7458 ---
deselectAll.style.cursor = 'pointer';

// --- Line 7459 ---
deselectAll.onclick = () => {

// --- Line 7460 ---
wrap.querySelectorAll('.color-filter-chk').forEach(chk => chk.checked = false);

// --- Line 7461 ---
};

// --- Line 7462 ---


// --- Line 7463 ---
btnRow.appendChild(selectAll);

// --- Line 7464 ---
btnRow.appendChild(deselectAll);

// --- Line 7465 ---
wrap.appendChild(btnRow);

// --- Line 7466 ---


// --- Line 7467 ---
const listWrap = el('div', 'filter-checkbox-list');

// --- Line 7468 ---


// --- Line 7469 ---
// 1. Sem cor (No color) item

// --- Line 7470 ---
const noColorLabel = el('label');

// --- Line 7471 ---
noColorLabel.style.display = 'flex';

// --- Line 7472 ---
noColorLabel.style.alignItems = 'center';

// --- Line 7473 ---
noColorLabel.style.gap = '10px';

// --- Line 7474 ---
noColorLabel.style.fontSize = '14px';

// --- Line 7475 ---
noColorLabel.style.cursor = 'pointer';

// --- Line 7476 ---
noColorLabel.style.padding = '4px 0';

// --- Line 7477 ---


// --- Line 7478 ---
const noColorChecked = (selectedColors.size === 0 || selectedColors.has('')) ? 'checked' : 
       '';

// --- Line 7479 ---
noColorLabel.innerHTML = `

// --- Line 7480 ---
<input type="checkbox" class="color-filter-chk" data-hex="" ${noColorChecked} 
       style="cursor: pointer; width: 16px; height: 16px;">

// --- Line 7481 ---
<span style="display: inline-block; width: 12px; height: 12px; border-radius: 4px; 
       border: 1px dashed #9fb3d2; background: transparent;"></span>

// --- Line 7482 ---
<span>Sem etiqueta</span>

// --- Line 7483 ---
`;

// --- Line 7484 ---
listWrap.appendChild(noColorLabel);

// --- Line 7485 ---


// --- Line 7486 ---
// 2. Palette colors

// --- Line 7487 ---
PALETTE.forEach(p => {

// --- Line 7488 ---
const label = el('label');

// --- Line 7489 ---
label.style.display = 'flex';

// --- Line 7490 ---
label.style.alignItems = 'center';

// --- Line 7491 ---
label.style.gap = '10px';

// --- Line 7492 ---
label.style.fontSize = '14px';

// --- Line 7493 ---
label.style.cursor = 'pointer';

// --- Line 7494 ---
label.style.padding = '4px 0';

// --- Line 7495 ---


// --- Line 7496 ---
const checked = (selectedColors.size === 0 || selectedColors.has(p.hex.toLowerCase())) 
       ? 'checked' : '';

// --- Line 7497 ---
label.innerHTML = `

// --- Line 7498 ---
<input type="checkbox" class="color-filter-chk" data-hex="${p.hex.toLowerCase()}" 
       ${checked} style="cursor: pointer; width: 16px; height: 16px;">

// --- Line 7499 ---
<span style="display: inline-block; width: 12px; height: 12px; border-radius: 4px; 
       background: ${p.hex};"></span>

// --- Line 7500 ---
<span>${p.name}</span>

// --- Line 7501 ---
`;

// --- Line 7502 ---
listWrap.appendChild(label);

// --- Line 7503 ---
});

// --- Line 7504 ---
wrap.appendChild(listWrap);

// --- Line 7505 ---


// --- Line 7506 ---
return wrap;

// --- Line 7507 ---
}, function (body, wrap) {

// --- Line 7508 ---
const checkedCheckboxes = body.querySelectorAll('.color-filter-chk:checked');

// --- Line 7509 ---
const allCheckboxes = body.querySelectorAll('.color-filter-chk');

// --- Line 7510 ---


// --- Line 7511 ---
selectedColors.clear();

// --- Line 7512 ---


// --- Line 7513 ---
if (checkedCheckboxes.length < allCheckboxes.length) {

// --- Line 7514 ---
checkedCheckboxes.forEach(chk => {

// --- Line 7515 ---
selectedColors.add(chk.dataset.hex);

// --- Line 7516 ---
});

// --- Line 7517 ---
}

// --- Line 7518 ---


// --- Line 7519 ---
applyFilters();

// --- Line 7520 ---
});

// --- Line 7521 ---
}

// --- Line 7522 ---


// --- Line 7523 ---
// ===== WEEKLY VIEW =====

// --- Line 7524 ---
function getWeekRange(dateStr) {

// --- Line 7525 ---
const curr = new Date(dateStr + 'T12:00:00');

// --- Line 7526 ---
const first = curr.getDate() - curr.getDay();

// --- Line 7527 ---
const week = [];

// --- Line 7528 ---
for (let i = 0; i < 7; i++) {

// --- Line 7529 ---
const next = new Date(curr); next.setDate(first + i); week.push(next.toISOString().slice(0, 
       10));

// --- Line 7530 ---
}

// --- Line 7531 ---
return week;

// --- Line 7532 ---
}

// --- Line 7533 ---


// --- Line 7534 ---
let weeklyActiveDate = new Date().toISOString().slice(0, 10);

// --- Line 7535 ---


// --- Line 7536 ---
function renderWeeklyView() {

// --- Line 7537 ---
if (!weeklyGrid || weeklyContainer.classList.contains('collapsed')) return;

// --- Line 7538 ---
weeklyGrid.innerHTML = '';

// --- Line 7539 ---
const currentDay = weeklyActiveDate;

// --- Line 7540 ---
const weekDates = getWeekRange(currentDay);

// --- Line 7541 ---
const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S�b'];

// --- Line 7542 ---
const startW = weekDates[0].split('-').reverse().slice(0, 2).join('/');

// --- Line 7543 ---
const endW = weekDates[6].split('-').reverse().slice(0, 2).join('/');

// --- Line 7544 ---
document.getElementById('weekRangeDisplay').textContent = `${startW} - ${endW}`;

// --- Line 7545 ---


// --- Line 7546 ---
weekDates.forEach((date, index) => {

// --- Line 7547 ---
const col = el('div', 'day-column');

// --- Line 7548 ---
if (date === currentDay) col.classList.add('today');

// --- Line 7549 ---
const header = el('header');

// --- Line 7550 ---


// --- Line 7551 ---
const textWrap = el('div');

// --- Line 7552 ---
textWrap.style.textAlign = 'left';

// --- Line 7553 ---
textWrap.innerHTML = `${daysOfWeek[index]} <span 
       class="date-label">${date.split('-').reverse().slice(0, 2).join('/')}</span>`;

// --- Line 7554 ---
header.appendChild(textWrap);

// --- Line 7555 ---


// --- Line 7556 ---
const addBtn = el('button', 'weekly-add-btn');

// --- Line 7557 ---
addBtn.type = 'button';

// --- Line 7558 ---
addBtn.title = 'Adicionar cart�o';

// --- Line 7559 ---
addBtn.textContent = '+';

// --- Line 7560 ---
addBtn.addEventListener('click', function(e) {

// --- Line 7561 ---
e.stopPropagation();

// --- Line 7562 ---
const newCard = createCard({ text: '', when: date + 'T' });

// --- Line 7563 ---
renderWeeklyView();

// --- Line 7564 ---
const clone = Array.from(weeklyGrid.querySelectorAll('.mirror-card')).find(c => 
       c._originalReference === newCard);

// --- Line 7565 ---
if (clone) {

// --- Line 7566 ---
startInlineEdit(clone, true);

// --- Line 7567 ---
}

// --- Line 7568 ---
});

// --- Line 7569 ---
header.appendChild(addBtn);

// --- Line 7570 ---


// --- Line 7571 ---
col.appendChild(header);

// --- Line 7572 ---
const cardsContainer = el('div', 'cards');

// --- Line 7573 ---
cardsContainer.dataset.date = date;

// --- Line 7574 ---
wireDropZone(cardsContainer);

// --- Line 7575 ---


// --- Line 7576 ---
const dayPrefix = date + 'T';

// --- Line 7577 ---
const floatingCards = allCards.filter(c => { const w = c.dataset.when || ''; return w === 
       dayPrefix || w === dayPrefix + 'GOAL'; });

// --- Line 7578 ---
const scheduledCards = allCards.filter(c => { const w = c.dataset.when || ''; return 
       w.startsWith(dayPrefix) && w.length > 11 && w !== dayPrefix + 'GOAL'; });

// --- Line 7579 ---
scheduledCards.sort((a, b) => (a.dataset.when || '').localeCompare(b.dataset.when || ''));

// --- Line 7580 ---


// --- Line 7581 ---
function createInteractiveMirror(originalCard, isScheduled) {

// --- Line 7582 ---
const clone = originalCard.cloneNode(true);

// --- Line 7583 ---
clone.classList.add('mirror-card');

// --- Line 7584 ---
if (isScheduled) clone.classList.add('is-scheduled');

// --- Line 7585 ---
clone.classList.remove('selected', 'dragging', 'timer-running', 'timer-finished');

// --- Line 7586 ---
clone.style.animation = '';

// --- Line 7587 ---
clone._originalReference = originalCard;

// --- Line 7588 ---


// --- Line 7589 ---
const kb = clone.querySelector('.kebab');

// --- Line 7590 ---
if (kb) {

// --- Line 7591 ---
kb.addEventListener('click', function(ev) {

// --- Line 7592 ---
ev.stopPropagation();

// --- Line 7593 ---
clearSelection();

// --- Line 7594 ---
addSelection(originalCard);

// --- Line 7595 ---
var r = kb.getBoundingClientRect();

// --- Line 7596 ---
showCtx(r.right, r.bottom, originalCard);

// --- Line 7597 ---
});

// --- Line 7598 ---
}

// --- Line 7599 ---


// --- Line 7600 ---
const dot = clone.querySelector('.dot');

// --- Line 7601 ---
if (dot) {

// --- Line 7602 ---
dot.addEventListener('click', function(e) {

// --- Line 7603 ---
e.stopPropagation();

// --- Line 7604 ---
const ev = new PointerEvent('click', { bubbles: true, cancelable: true, view: 
       window });

// --- Line 7605 ---
originalCard.querySelector('.dot').dispatchEvent(ev); 

// --- Line 7606 ---
});

// --- Line 7607 ---
dot.addEventListener('dblclick', (e) => e.stopPropagation());

// --- Line 7608 ---
}

// --- Line 7609 ---


// --- Line 7610 ---
clone.addEventListener('mousedown', function (e) {

// --- Line 7611 ---
if (e.button !== 0) return;

// --- Line 7612 ---
const ev = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: 
       window, button: 0, shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });

// --- Line 7613 ---
originalCard.dispatchEvent(ev);

// --- Line 7614 ---
});

// --- Line 7615 ---


// --- Line 7616 ---
clone.addEventListener('dblclick', function (e) {

// --- Line 7617 ---
if (e.target.closest('.dot')) {

// --- Line 7618 ---
e.stopPropagation(); return;

// --- Line 7619 ---
}

// --- Line 7620 ---
handleCardDblClick(originalCard);

// --- Line 7621 ---
});

// --- Line 7622 ---


// --- Line 7623 ---
clone.addEventListener('contextmenu', function (e) {

// --- Line 7624 ---
e.preventDefault();

// --- Line 7625 ---
e.stopPropagation();

// --- Line 7626 ---
clearSelection();

// --- Line 7627 ---
addSelection(originalCard);

// --- Line 7628 ---
showCtx(e.clientX, e.clientY, originalCard);

// --- Line 7629 ---
});

// --- Line 7630 ---


// --- Line 7631 ---
clone.addEventListener('dragstart', function (e) {

// --- Line 7632 ---
e.stopPropagation();

// --- Line 7633 ---
const block = selected.has(originalCard) ? Array.from(selected) : [originalCard];

// --- Line 7634 ---
dragState = { leader: originalCard, block: block };

// --- Line 7635 ---
block.forEach(n => n.classList.add('dragging'));

// --- Line 7636 ---
clone.classList.add('dragging');

// --- Line 7637 ---
pushPH();

// --- Line 7638 ---
try { e.dataTransfer.setData('text/plain', 'drag'); e.dataTransfer.effectAllowed = 
       'move'; } catch (_) { }

// --- Line 7639 ---
});

// --- Line 7640 ---
clone.addEventListener('dragend', function () {

// --- Line 7641 ---
clone.classList.remove('dragging');

// --- Line 7642 ---
if (dragState && dragState.block) {

// --- Line 7643 ---
dragState.block.forEach(n => n.classList.remove('dragging'));

// --- Line 7644 ---
}

// --- Line 7645 ---
cleanupPH();

// --- Line 7646 ---
dragState = null;

// --- Line 7647 ---
persist();

// --- Line 7648 ---
updateSlotsHasItems();

// --- Line 7649 ---
updateTotalTimerDisplay();

// --- Line 7650 ---
});

// --- Line 7651 ---
return clone;

// --- Line 7652 ---
}

// --- Line 7653 ---


// --- Line 7654 ---
scheduledCards.forEach(originalCard => {

// --- Line 7655 ---
const clone = createInteractiveMirror(originalCard, true);

// --- Line 7656 ---
const timeStr = (originalCard.dataset.when || '').split('T')[1];

// --- Line 7657 ---
if (timeStr) {

// --- Line 7658 ---
let timeBadge = clone.querySelector('.due-date.time-badge');

// --- Line 7659 ---
if (!timeBadge) {

// --- Line 7660 ---
timeBadge = el('span', 'due-date time-badge');

// --- Line 7661 ---
timeBadge.style.backgroundColor = 'var(--brand)';

// --- Line 7662 ---
timeBadge.style.color = 'white';

// --- Line 7663 ---
timeBadge.style.marginRight = '5px';

// --- Line 7664 ---
const cardHeader = clone.querySelector('.card-header');

// --- Line 7665 ---
if (cardHeader) {

// --- Line 7666 ---
const kbBtn = cardHeader.querySelector('.kebab');

// --- Line 7667 ---
if (kbBtn) cardHeader.insertBefore(timeBadge, kbBtn);

// --- Line 7668 ---
else cardHeader.appendChild(timeBadge);

// --- Line 7669 ---
}

// --- Line 7670 ---
}

// --- Line 7671 ---
timeBadge.textContent = timeStr;

// --- Line 7672 ---
}

// --- Line 7673 ---
cardsContainer.appendChild(clone);

// --- Line 7674 ---
});

// --- Line 7675 ---


// --- Line 7676 ---
floatingCards.forEach(originalCard => {

// --- Line 7677 ---
const clone = createInteractiveMirror(originalCard, false);

// --- Line 7678 ---
let info = clone.querySelector('.due-date.info-badge');

// --- Line 7679 ---
if (!info) {

// --- Line 7680 ---
info = el('span', 'due-date info-badge');

// --- Line 7681 ---
info.textContent = 'A definir';

// --- Line 7682 ---
info.style.opacity = '0.5';

// --- Line 7683 ---
const cardHeader = clone.querySelector('.card-header');

// --- Line 7684 ---
if (cardHeader) {

// --- Line 7685 ---
const kbBtn = cardHeader.querySelector('.kebab');

// --- Line 7686 ---
if (kbBtn) cardHeader.insertBefore(info, kbBtn);

// --- Line 7687 ---
else cardHeader.appendChild(info);

// --- Line 7688 ---
}

// --- Line 7689 ---
}

// --- Line 7690 ---
cardsContainer.appendChild(clone);

// --- Line 7691 ---
});

// --- Line 7692 ---


// --- Line 7693 ---
col.appendChild(cardsContainer);

// --- Line 7694 ---
weeklyGrid.appendChild(col);

// --- Line 7695 ---
});

// --- Line 7696 ---
syncMirrors();

// --- Line 7697 ---
}

// --- Line 7698 ---


// --- Line 7699 ---
function changeWeek(offset) {

// --- Line 7700 ---
const currentDate = new Date(weeklyActiveDate + 'T12:00:00');

// --- Line 7701 ---
currentDate.setDate(currentDate.getDate() + (offset * 7));

// --- Line 7702 ---
weeklyActiveDate = currentDate.toISOString().slice(0, 10);

// --- Line 7703 ---
applyFilters();

// --- Line 7704 ---
}

// --- Line 7705 ---
document.getElementById('prevWeekBtn').addEventListener('click', () => changeWeek(-1));

// --- Line 7706 ---
document.getElementById('nextWeekBtn').addEventListener('click', () => changeWeek(1));

// --- Line 7707 ---
document.getElementById('todayWeekBtn').addEventListener('click', () => {

// --- Line 7708 ---
weeklyActiveDate = new Date().toISOString().slice(0, 10);

// --- Line 7709 ---
applyFilters();

// --- Line 7710 ---
});

// --- Line 7711 ---


// --- Line 7712 ---
// ===== INITIALIZATION =====

// --- Line 7713 ---
const toggleAgendaBtn = document.getElementById('toggleAgendaBtn');

// --- Line 7714 ---
const workspaceEl = document.querySelector('.workspace');

// --- Line 7715 ---
const AGENDA_STATE_KEY = 'mini-trello-agenda-state';

// --- Line 7716 ---
const toggleBoardBtn = document.getElementById('toggleBoardBtn');

// --- Line 7717 ---
const toggleMatrixBtn = document.getElementById('toggleMatrixBtn');

// --- Line 7718 ---
const boardContainer = document.querySelector('.board-container');

// --- Line 7719 ---
const matrixContainer = document.querySelector('.matrix-container');

// --- Line 7720 ---
const agendaSidebar = document.getElementById('agenda-sidebar');

// --- Line 7721 ---
const mainContent = document.getElementById('main-content');

// --- Line 7722 ---
const weeklyContainer = document.querySelector('.weekly-container');

// --- Line 7723 ---
const weeklyGrid = document.getElementById('weeklyGrid');

// --- Line 7724 ---
const toggleWeeklyBtn = document.getElementById('toggleWeeklyBtn');

// --- Line 7725 ---
const BOARD_STATE_KEY = 'mini-trello-board-state';

// --- Line 7726 ---
const MATRIX_STATE_KEY = 'mini-trello-matrix-state';

// --- Line 7727 ---
const WEEKLY_STATE_KEY = 'mini-trello-weekly-state';

// --- Line 7728 ---
const quickConfigToggle = document.getElementById('quickConfigToggle');

// --- Line 7729 ---
const quickConfigToggleBtn = quickConfigToggle.nextElementSibling;

// --- Line 7730 ---


// --- Line 7731 ---
function saveState() {

// --- Line 7732 ---
localStorage.setItem(AGENDA_STATE_KEY, agendaSidebar.classList.contains('collapsed') ? 
       'collapsed' : 'open');

// --- Line 7733 ---
localStorage.setItem(BOARD_STATE_KEY, boardContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

// --- Line 7734 ---
localStorage.setItem(MATRIX_STATE_KEY, matrixContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

// --- Line 7735 ---
localStorage.setItem(WEEKLY_STATE_KEY, weeklyContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

// --- Line 7736 ---
}

// --- Line 7737 ---


// --- Line 7738 ---
function loadState() {

// --- Line 7739 ---
const agendaState = localStorage.getItem(AGENDA_STATE_KEY);

// --- Line 7740 ---
const boardState = localStorage.getItem(BOARD_STATE_KEY);

// --- Line 7741 ---
const matrixState = localStorage.getItem(MATRIX_STATE_KEY);

// --- Line 7742 ---
const quickConfigState = localStorage.getItem(LS_QUICK_CONFIG_KEY);

// --- Line 7743 ---


// --- Line 7744 ---
if (agendaState === 'collapsed') { agendaSidebar.classList.add('collapsed'); 
       workspaceEl.classList.add('agenda-collapsed'); toggleAgendaBtn.classList.remove('active'); }

// --- Line 7745 ---
else { agendaSidebar.classList.remove('collapsed'); 
       workspaceEl.classList.remove('agenda-collapsed'); toggleAgendaBtn.classList.add('active'); }

// --- Line 7746 ---


// --- Line 7747 ---
if (boardState === 'collapsed') { boardContainer.classList.add('collapsed'); 
       mainContent.classList.add('board-collapsed'); toggleBoardBtn.classList.remove('active'); }

// --- Line 7748 ---
else { boardContainer.classList.remove('collapsed'); 
       mainContent.classList.remove('board-collapsed'); toggleBoardBtn.classList.add('active'); }

// --- Line 7749 ---


// --- Line 7750 ---
if (matrixState === 'collapsed') { matrixContainer.classList.add('collapsed'); 
       mainContent.classList.add('matrix-collapsed'); toggleMatrixBtn.classList.remove('active'); }

// --- Line 7751 ---
else { matrixContainer.classList.remove('collapsed'); 
       mainContent.classList.remove('matrix-collapsed'); toggleMatrixBtn.classList.add('active'); }

// --- Line 7752 ---


// --- Line 7753 ---
if (quickConfigState === 'true') { quickConfigToggle.checked = true; 
       quickConfigToggleBtn.textContent = 'ON'; }

// --- Line 7754 ---
else { quickConfigToggle.checked = false; quickConfigToggleBtn.textContent = 'OFF'; }

// --- Line 7755 ---
}

// --- Line 7756 ---


// --- Line 7757 ---
const weeklyState = localStorage.getItem(WEEKLY_STATE_KEY);

// --- Line 7758 ---
if (weeklyState === 'open') { weeklyContainer.classList.remove('collapsed'); 
       toggleWeeklyBtn.classList.add('active'); renderWeeklyView(); }

// --- Line 7759 ---
else { weeklyContainer.classList.add('collapsed'); toggleWeeklyBtn.classList.remove('active'); }

// --- Line 7760 ---


// --- Line 7761 ---
toggleBoardBtn.addEventListener('click', () => { boardContainer.classList.toggle('collapsed'); 
       mainContent.classList.toggle('board-collapsed'); toggleBoardBtn.classList.toggle('active'); saveState(); });

// --- Line 7762 ---
toggleMatrixBtn.addEventListener('click', () => { matrixContainer.classList.toggle('collapsed'); 
       mainContent.classList.toggle('matrix-collapsed'); toggleMatrixBtn.classList.toggle('active'); saveState(); });

// --- Line 7763 ---
toggleAgendaBtn.addEventListener('click', () => { agendaSidebar.classList.toggle('collapsed'); 
       workspaceEl.classList.toggle('agenda-collapsed'); toggleAgendaBtn.classList.toggle('active'); saveState(); });

// --- Line 7764 ---
toggleWeeklyBtn.addEventListener('click', () => { weeklyContainer.classList.toggle('collapsed'); 
       toggleWeeklyBtn.classList.toggle('active'); if (!weeklyContainer.classList.contains('collapsed')) { 
       renderWeeklyView(); } saveState(); });

// --- Line 7765 ---
document.getElementById('toggleSelectionModeBtn').onclick = toggleSelectionMode;

// --- Line 7766 ---
quickConfigToggle.addEventListener('change', () => { const isChecked = quickConfigToggle.checked; 
       quickConfigToggleBtn.textContent = isChecked ? 'ON' : 'OFF'; localStorage.setItem(LS_QUICK_CONFIG_KEY, 
       isChecked); });

// --- Line 7767 ---


// --- Line 7768 ---
document.getElementById('addList').onclick = function () { createList('Nova lista'); persist(); };

// --- Line 7769 ---
document.getElementById('filterColorsBtn').addEventListener('click', openColorFilters);

// --- Line 7770 ---
document.getElementById('filterBoardsBtn').addEventListener('click', openBoardFilters);

// --- Line 7771 ---
document.getElementById('undo').onclick = doUndo; document.getElementById('redo').onclick = doRedo;

// --- Line 7772 ---
document.getElementById('clearFilters').onclick = function () { selectedColors.clear(); 
       document.getElementById('fFrom').value = ''; document.getElementById('fTo').value = ''; 
       document.getElementById('fTime').value = ''; applyFilters(); };

// --- Line 7773 ---


// --- Line 7774 ---
// Eventos dos submenus e dropdowns

// --- Line 7775 ---
document.getElementById('menuNewBoard').onclick = () => { const name = prompt('Nome do novo 
       quadro:'); if (name) createNewBoard(name); };

// --- Line 7776 ---
document.getElementById('menuRenameBoard').onclick = renameBoard;

// --- Line 7777 ---
document.getElementById('menuCloneBoard').onclick = cloneBoard;

// --- Line 7778 ---
document.getElementById('menuDeleteBoard').onclick = deleteBoard;

// --- Line 7779 ---
document.getElementById('menuBoardTheme').onclick = openBoardThemePicker;

// --- Line 7780 ---
document.getElementById('menuExportJson').onclick = exportBackup;

// --- Line 7781 ---
document.getElementById('menuImportJson').onclick = () => 
       document.getElementById('importFile').click();

// --- Line 7782 ---


// --- Line 7783 ---
document.getElementById('importFile').addEventListener('change', function(e) {

// --- Line 7784 ---
const file = e.target.files[0];

// --- Line 7785 ---
if (file) importBackup(file);

// --- Line 7786 ---
e.target.value = '';

// --- Line 7787 ---
});

// --- Line 7788 ---


// --- Line 7789 ---
document.getElementById('boardSelect').onchange = (e) => switchBoard(e.target.value);

// --- Line 7790 ---


// --- Line 7791 ---
// Controle de Dropdowns (mobile friendly & click outside)

// --- Line 7792 ---
document.querySelectorAll('.header-dropdown-btn').forEach(btn => {

// --- Line 7793 ---
btn.addEventListener('click', function(e) {

// --- Line 7794 ---
e.stopPropagation();

// --- Line 7795 ---
const parent = this.parentElement;

// --- Line 7796 ---
document.querySelectorAll('.header-dropdown').forEach(d => {

// --- Line 7797 ---
if (d !== parent) d.classList.remove('active');

// --- Line 7798 ---
});

// --- Line 7799 ---
parent.classList.toggle('active');

// --- Line 7800 ---
});

// --- Line 7801 ---
});

// --- Line 7802 ---
document.addEventListener('click', function() {

// --- Line 7803 ---
document.querySelectorAll('.header-dropdown').forEach(d => {

// --- Line 7804 ---
d.classList.remove('active');

// --- Line 7805 ---
});

// --- Line 7806 ---
});

// --- Line 7807 ---


// --- Line 7808 ---


// --- Line 7809 ---
const agendaDateInput = document.getElementById('agendaDate');

// --- Line 7810 ---
function changeDay(days) { let currentDate = new Date(agendaDateInput.value + 'T12:00:00'); 
       currentDate.setDate(currentDate.getDate() + days); agendaDateInput.value = currentDate.toISOString().slice(0, 
       10); applyFilters(); }

// --- Line 7811 ---
document.getElementById('prevDayBtn').addEventListener('click', () => changeDay(-1));

// --- Line 7812 ---
document.getElementById('nextDayBtn').addEventListener('click', () => changeDay(1));

// --- Line 7813 ---
document.getElementById('todayDayBtn').addEventListener('click', () => {

// --- Line 7814 ---
agendaDateInput.value = new Date().toISOString().slice(0, 10);

// --- Line 7815 ---
applyFilters();

// --- Line 7816 ---
});

// --- Line 7817 ---
agendaDateInput.addEventListener('change', applyFilters);

// --- Line 7818 ---


// --- Line 7819 ---
boardEl.addEventListener('wheel', (e) => { if (e.altKey) { e.preventDefault(); boardEl.scrollLeft 
       += e.deltaY; } });

// --- Line 7820 ---


// --- Line 7821 ---
// Scroll Drag logic

// --- Line 7822 ---
const mainScrollContainer = document.getElementById('main-content');

// --- Line 7823 ---
let scrollSpeed = { x: 0, y: 0 };

// --- Line 7824 ---
let scrollFrame = null;

// --- Line 7825 ---
function performAutoScroll() {

// --- Line 7826 ---
if (scrollSpeed.x === 0 && scrollSpeed.y === 0) { scrollFrame = null; return; }

// --- Line 7827 ---
mainScrollContainer.scrollBy(scrollSpeed.x, scrollSpeed.y);

// --- Line 7828 ---
scrollFrame = requestAnimationFrame(performAutoScroll);

// --- Line 7829 ---
}

// --- Line 7830 ---
function applyDragScroll() {

// --- Line 7831 ---
const containers = [document.getElementById('board'), document.getElementById('main-content'), 
       document.getElementById('slots')];

// --- Line 7832 ---
containers.forEach(container => {

// --- Line 7833 ---
if (!container) return;

// --- Line 7834 ---
let isDown = false; let startX, startY, scrollLeft, scrollTop;

// --- Line 7835 ---
container.addEventListener('mousedown', (e) => {

// --- Line 7836 ---
if (e.target.closest('.card') || e.target.tagName === 'BUTTON' || e.target.tagName === 
       'INPUT' || e.target.closest('.header-icon')) return;

// --- Line 7837 ---
isDown = true; container.style.cursor = 'grabbing'; startX = e.pageX; startY = e.pageY; 
       scrollLeft = container.scrollLeft; scrollTop = container.scrollTop;

// --- Line 7838 ---
});

// --- Line 7839 ---
const stopDrag = () => { if (isDown) { isDown = false; container.style.cursor = 'grab'; } };

// --- Line 7840 ---
container.addEventListener('mouseleave', stopDrag); container.addEventListener('mouseup', 
       stopDrag);

// --- Line 7841 ---
container.addEventListener('mousemove', (e) => {

// --- Line 7842 ---
if (!isDown) return; e.preventDefault();

// --- Line 7843 ---
const x = e.pageX; const y = e.pageY; const walkX = (x - startX) * 1; const walkY = (y 
       - startY) * 1;

// --- Line 7844 ---
container.scrollLeft = scrollLeft - walkX; container.scrollTop = scrollTop - walkY;

// --- Line 7845 ---
});

// --- Line 7846 ---
});

// --- Line 7847 ---
}

// --- Line 7848 ---


// --- Line 7849 ---
document.getElementById('copyDayBtn').addEventListener('click', function () {

// --- Line 7850 ---
const day = getActiveDay();

// --- Line 7851 ---
agendaClipboard = allCards.filter(c => (c.dataset.when || '').startsWith(day + 'T')).map(c => 
       ({ ...cardToData(c), timeOrGoal: (c.dataset.when || '').substring(11) }));

// --- Line 7852 ---
const btn = document.getElementById('copyDayBtn'); btn.textContent = 'Copiado!'; setTimeout(() 
       => { btn.textContent = '??'; }, 1000);

// --- Line 7853 ---
});

// --- Line 7854 ---
document.getElementById('pasteDayBtn').addEventListener('click', function () {

// --- Line 7855 ---
if (agendaClipboard.length === 0) { const btn = document.getElementById('pasteDayBtn'); 
       btn.textContent = 'Vazio!'; setTimeout(() => { btn.textContent = '??'; }, 1000); return; }

// --- Line 7856 ---
const day = getActiveDay();

// --- Line 7857 ---
agendaClipboard.forEach(cardData => {

// --- Line 7858 ---
const newData = { ...cardData }; newData.when = day + 'T' + newData.timeOrGoal;

// --- Line 7859 ---
const existsInCache = allCards.some(c => c.dataset.when === newData.when && 
       c.querySelector('.text').textContent.trim() === newData.text.trim());

// --- Line 7860 ---
if (!existsInCache) createCard(newData);

// --- Line 7861 ---
});

// --- Line 7862 ---
updateSlotsHasItems(); persist();

// --- Line 7863 ---
});

// --- Line 7864 ---


// --- Line 7865 ---
$$('#fFrom, #fTo, #fTime').forEach(function (el) { el.addEventListener('input', applyFilters); });

// --- Line 7866 ---


// --- Line 7867 ---
document.addEventListener('keydown', function (e) {

// --- Line 7868 ---
if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? 
       doRedo() : doUndo(); return; }

// --- Line 7869 ---


// --- Line 7870 ---
// AJUSTE: Copiar / Colar / Recortar

// --- Line 7871 ---
if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {

// --- Line 7872 ---
if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

// --- Line 7873 ---
e.preventDefault();

// --- Line 7874 ---
appClipboard = Array.from(selected).map(cardToData);

// --- Line 7875 ---
return;

// --- Line 7876 ---
}

// --- Line 7877 ---
if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {

// --- Line 7878 ---
if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

// --- Line 7879 ---
e.preventDefault();

// --- Line 7880 ---
appClipboard = Array.from(selected).map(cardToData);

// --- Line 7881 ---
selected.forEach(card => removeCard(card));

// --- Line 7882 ---
clearSelection();

// --- Line 7883 ---
return;

// --- Line 7884 ---
}

// --- Line 7885 ---
if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {

// --- Line 7886 ---
if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

// --- Line 7887 ---
if (appClipboard.length === 0) return;

// --- Line 7888 ---
e.preventDefault();

// --- Line 7889 ---


// --- Line 7890 ---
// Tenta achar lista sob o mouse

// --- Line 7891 ---
const hoveredList = $$('.list').find(l => {

// --- Line 7892 ---
const r = l.getBoundingClientRect();

// --- Line 7893 ---
return lastMouseX >= r.left && lastMouseX <= r.right && lastMouseY >= r.top && 
       lastMouseY <= r.bottom;

// --- Line 7894 ---
});

// --- Line 7895 ---


// --- Line 7896 ---
const targetContainer = hoveredList ? (hoveredList.querySelector('.cards') || hoveredList) 
       : boardEl.querySelector('.list .cards');

// --- Line 7897 ---
if (targetContainer) {

// --- Line 7898 ---
appClipboard.forEach(data => {

// --- Line 7899 ---
const newCard = createCard(data);

// --- Line 7900 ---
targetContainer.appendChild(newCard);

// --- Line 7901 ---
if (hoveredList) applyWhen(hoveredList, [newCard]);

// --- Line 7902 ---
});

// --- Line 7903 ---
persist(); updateSlotsHasItems();

// --- Line 7904 ---
}

// --- Line 7905 ---
return;

// --- Line 7906 ---
}

// --- Line 7907 ---


// --- Line 7908 ---
if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {

// --- Line 7909 ---
if (document.activeElement.tagName === 'INPUT' && document.activeElement.closest('.add')) 
       return;

// --- Line 7910 ---
e.preventDefault();

// --- Line 7911 ---
let targetList = null; let insertAfterCard = null;

// --- Line 7912 ---
if (selected.size > 0) { insertAfterCard = Array.from(selected).pop(); targetList = 
       insertAfterCard.closest('.list'); }

// --- Line 7913 ---
else {

// --- Line 7914 ---
const lists = $$('.list');

// --- Line 7915 ---
targetList = lists.find(l => { if (l.offsetParent === null) return false; const rect = 
       l.getBoundingClientRect(); return lastMouseX >= rect.left && lastMouseX <= rect.right && lastMouseY >= rect.top 
       && lastMouseY <= rect.bottom; });

// --- Line 7916 ---
if (!targetList || targetList.offsetParent === null) targetList = 
       boardEl.querySelector('.list[data-type="kanban"]');

// --- Line 7917 ---
}

// --- Line 7918 ---
if (targetList) {

// --- Line 7919 ---
const cardsContainer = targetList.querySelector('.cards');

// --- Line 7920 ---
if (cardsContainer) {

// --- Line 7921 ---
const newCard = createCard({ text: '' });

// --- Line 7922 ---
if (insertAfterCard && insertAfterCard.parentElement === cardsContainer) 
       cardsContainer.insertBefore(newCard, insertAfterCard.nextSibling); else cardsContainer.appendChild(newCard);

// --- Line 7923 ---
applyWhen(targetList, [newCard]); persist(); updateTotalTimerDisplay(); 
       startInlineEdit(newCard, true);

// --- Line 7924 ---
}

// --- Line 7925 ---
}

// --- Line 7926 ---
return;

// --- Line 7927 ---
}

// --- Line 7928 ---
var currentSelection = getSelectionOr(ctxTarget);

// --- Line 7929 ---
const activeEl = document.activeElement;

// --- Line 7930 ---
const isEditingCard = activeEl.isContentEditable && activeEl.classList.contains('text') && 
       activeEl.closest('.card');

// --- Line 7931 ---
if (e.key === 'F2') {

// --- Line 7932 ---
e.preventDefault();

// --- Line 7933 ---
if (isEditingCard) activeEl.blur(); else if (currentSelection.length > 0) 
       startInlineEdit(currentSelection[0]);

// --- Line 7934 ---
return;

// --- Line 7935 ---
}

// --- Line 7936 ---
if ((activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || 
       activeEl.closest('.modal')) || (isEditingCard)) {

// --- Line 7937 ---
if (isEditingCard && (e.key === 'Delete' || e.key === 'Backspace') && 
       activeEl.textContent.trim() === '') { e.preventDefault(); const cardToDelete = [activeEl.closest('.card')]; 
       showConfirm('Excluir cart�o vazio?', function () { cardToDelete.forEach(n => removeCard(n)); clearSelection(); 
       }); }

// --- Line 7938 ---
return;

// --- Line 7939 ---
}

// --- Line 7940 ---
if (!currentSelection.length && !ctxTarget && (e.key === 'Delete' || e.key === 'Backspace')) 
       return;

// --- Line 7941 ---
if (currentSelection.length > 0 && e.altKey) {

// --- Line 7942 ---
if (e.key.toLowerCase() === 't') { e.preventDefault(); openTimerDialog(currentSelection); }

// --- Line 7943 ---
else if (e.key.toLowerCase() === 'c') { e.preventDefault(); 
       openColorDialog(currentSelection); }

// --- Line 7944 ---
else if (e.key.toLowerCase() === 'd') { e.preventDefault(); 
       openDateDialog(currentSelection); }

// --- Line 7945 ---
else if (e.key.toLowerCase() === 'p') { 

// --- Line 7946 ---
e.preventDefault();

// --- Line 7947 ---
const activeProps = document.querySelector('.modal-wrap');

// --- Line 7948 ---
if (activeProps && activeProps.querySelector('h3') && 
       activeProps.querySelector('h3').textContent === 'Propriedades do Cart�o') {

// --- Line 7949 ---
activeProps.remove();

// --- Line 7950 ---
} else {

// --- Line 7951 ---
showPropertiesDialog(currentSelection[0]);

// --- Line 7952 ---
}

// --- Line 7953 ---
}

// --- Line 7954 ---
return;

// --- Line 7955 ---
}

// --- Line 7956 ---


// --- Line 7957 ---
// Shift + Setas (Cima / Baixo) para mover cart�o pela agenda

// --- Line 7958 ---
if (currentSelection.length > 0 && e.shiftKey) {

// --- Line 7959 ---
if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {

// --- Line 7960 ---
let targetCard = currentSelection[0];

// --- Line 7961 ---
let mirrorCard = Array.from(slotsRoot.querySelectorAll('.card')).find(clone => 
       clone._originalReference === targetCard);

// --- Line 7962 ---
let currentSlot = (mirrorCard ? mirrorCard.closest('#slots > .list') : null) || 
       targetCard.closest('#slots > .list');

// --- Line 7963 ---


// --- Line 7964 ---
if (currentSlot) {

// --- Line 7965 ---
e.preventDefault();

// --- Line 7966 ---
const slots = Array.from(slotsRoot.children);

// --- Line 7967 ---
const currentIndex = slots.indexOf(currentSlot);

// --- Line 7968 ---
let targetIndex = e.key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;

// --- Line 7969 ---


// --- Line 7970 ---
if (targetIndex >= 0 && targetIndex < slots.length) {

// --- Line 7971 ---
const targetSlot = slots[targetIndex];

// --- Line 7972 ---
if (targetSlot.dataset.type === 'goal') {

// --- Line 7973 ---
targetCard.dataset.when = getActiveDay() + 'TGOAL';

// --- Line 7974 ---
} else if (targetSlot.dataset.type === 'unscheduled') {

// --- Line 7975 ---
targetCard.dataset.when = getActiveDay() + 'T';

// --- Line 7976 ---
} else if (targetSlot.dataset.type === 'time') {

// --- Line 7977 ---
targetCard.dataset.when = getActiveDay() + 'T' + targetSlot.dataset.time;

// --- Line 7978 ---
}

// --- Line 7979 ---
persist(); loadAndRenderAll();

// --- Line 7980 ---
updateSlotsHasItems();

// --- Line 7981 ---


// --- Line 7982 ---
// Focar e rolar para o novo espelho gerado na agenda

// --- Line 7983 ---
setTimeout(() => {

// --- Line 7984 ---
let newMirror = Array.from(slotsRoot.querySelectorAll('.card')).find(clone 
       => clone._originalReference === targetCard);

// --- Line 7985 ---
if (newMirror) {

// --- Line 7986 ---
newMirror.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

// --- Line 7987 ---
}

// --- Line 7988 ---
}, 50);

// --- Line 7989 ---
}

// --- Line 7990 ---
return;

// --- Line 7991 ---
}

// --- Line 7992 ---
}

// --- Line 7993 ---
}

// --- Line 7994 ---


// --- Line 7995 ---
if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { 
       e.preventDefault(); duplicateCards(currentSelection); return; }

// --- Line 7996 ---
if (currentSelection.length > 0 && (e.key === 'Delete' || e.key === 'Backspace')) { 
       e.preventDefault(); showConfirm('Excluir ' + currentSelection.length + ' cart�o(s)?', function () { 
       currentSelection.forEach(function (n) { removeCard(n); }); clearSelection(); }); return; }

// --- Line 7997 ---
if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey)) {

// --- Line 7998 ---
let moved = false;

// --- Line 7999 ---
let targetCard = currentSelection[0];

// --- Line 8000 ---
let parentCards = targetCard.parentElement;

// --- Line 8001 ---
let parentList = targetCard.closest('.list');

// --- Line 8002 ---
if (!parentCards || !parentList) return;

// --- Line 8003 ---


// --- Line 8004 ---
if (e.key === 'ArrowUp') {

// --- Line 8005 ---
e.preventDefault();

// --- Line 8006 ---
let previousCard = targetCard.previousElementSibling;

// --- Line 8007 ---
while (previousCard && previousCard.style.display === 'none') {

// --- Line 8008 ---
previousCard = previousCard.previousElementSibling;

// --- Line 8009 ---
}

// --- Line 8010 ---
if (previousCard) {

// --- Line 8011 ---
currentSelection.forEach(card => parentCards.insertBefore(card, previousCard));

// --- Line 8012 ---
moved = true;

// --- Line 8013 ---
}

// --- Line 8014 ---
} else if (e.key === 'ArrowDown') {

// --- Line 8015 ---
e.preventDefault();

// --- Line 8016 ---
let lastCardInSelection = currentSelection[currentSelection.length - 1];

// --- Line 8017 ---
let nextCard = lastCardInSelection.nextElementSibling;

// --- Line 8018 ---
while (nextCard && nextCard.style.display === 'none') {

// --- Line 8019 ---
nextCard = nextCard.nextElementSibling;

// --- Line 8020 ---
}

// --- Line 8021 ---
if (nextCard) {

// --- Line 8022 ---
currentSelection.forEach(card => parentCards.insertBefore(card, nextCard));

// --- Line 8023 ---
moved = true;

// --- Line 8024 ---
} else {

// --- Line 8025 ---
currentSelection.forEach(card => parentCards.appendChild(card));

// --- Line 8026 ---
moved = true;

// --- Line 8027 ---
}

// --- Line 8028 ---
} else if (e.key === 'ArrowLeft' && parentList.dataset.type === 'kanban') {

// --- Line 8029 ---
e.preventDefault();

// --- Line 8030 ---
let prevList = parentList.previousElementSibling;

// --- Line 8031 ---
while (prevList && !prevList.matches('.list[data-type="kanban"]')) {

// --- Line 8032 ---
prevList = prevList.previousElementSibling;

// --- Line 8033 ---
}

// --- Line 8034 ---
if (prevList) {

// --- Line 8035 ---
let destCards = prevList.querySelector('.cards');

// --- Line 8036 ---
applyWhen(prevList, currentSelection);

// --- Line 8037 ---
currentSelection.forEach(card => destCards.appendChild(card));

// --- Line 8038 ---
moved = true;

// --- Line 8039 ---
}

// --- Line 8040 ---
} else if (e.key === 'ArrowRight' && parentList.dataset.type === 'kanban') {

// --- Line 8041 ---
e.preventDefault();

// --- Line 8042 ---
let nextList = parentList.nextElementSibling;

// --- Line 8043 ---
while (nextList && !nextList.matches('.list[data-type="kanban"]')) {

// --- Line 8044 ---
nextList = nextList.nextElementSibling;

// --- Line 8045 ---
}

// --- Line 8046 ---
if (nextList) {

// --- Line 8047 ---
let destCards = nextList.querySelector('.cards');

// --- Line 8048 ---
applyWhen(nextList, currentSelection);

// --- Line 8049 ---
currentSelection.forEach(card => destCards.appendChild(card));

// --- Line 8050 ---
moved = true;

// --- Line 8051 ---
}

// --- Line 8052 ---
}

// --- Line 8053 ---


// --- Line 8054 ---
if (moved) {

// --- Line 8055 ---
persist();

// --- Line 8056 ---
applyFilters();

// --- Line 8057 ---
}

// --- Line 8058 ---
}

// --- Line 8059 ---
});

// --- Line 8060 ---


// --- Line 8061 ---
document.addEventListener('dragover', (e) => {

// --- Line 8062 ---
if (!dragState) return;

// --- Line 8063 ---
const threshold = 100; const speed = 12; const rect = 
       mainScrollContainer.getBoundingClientRect();

// --- Line 8064 ---
scrollSpeed = { x: 0, y: 0 };

// --- Line 8065 ---
if (e.clientY < rect.top + threshold) scrollSpeed.y = -speed; else if (e.clientY > rect.bottom 
       - threshold) scrollSpeed.y = speed;

// --- Line 8066 ---
if (e.clientX < rect.left + threshold) scrollSpeed.x = -speed; else if (e.clientX > rect.right 
       - threshold) scrollSpeed.x = speed;

// --- Line 8067 ---
if ((scrollSpeed.x !== 0 || scrollSpeed.y !== 0) && !scrollFrame) scrollFrame = 
       requestAnimationFrame(performAutoScroll);

// --- Line 8068 ---
});

// --- Line 8069 ---


// --- Line 8070 ---
function stopScrollParams() { scrollSpeed = { x: 0, y: 0 }; if (scrollFrame) { 
       cancelAnimationFrame(scrollFrame); scrollFrame = null; } }

// --- Line 8071 ---
document.addEventListener('dragend', stopScrollParams); document.addEventListener('drop', 
       stopScrollParams); document.addEventListener('mouseleave', stopScrollParams);

// --- Line 8072 ---


// --- Line 8073 ---
function initDemo() {

// --- Line 8074 ---
withMute(function () {

// --- Line 8075 ---
var toDo = createList('Para Fazer');

// --- Line 8076 ---
toDo.querySelector('.cards').appendChild(createCard({ text: 'Tarefa importante e urgente', 
       color: '#104239', timerTotal: '1800' }));

// --- Line 8077 ---
createList('Em Andamento'); createList('Feito');

// --- Line 8078 ---
if (matrixEl) { var q1 = matrixEl.querySelector('.list[data-quad="Q1"] .cards'); 
       q1.appendChild(createCard({ text: 'Crise: Resolver problema no servidor!', color: '#104239', timerTotal: '7200' 
       })); }

// --- Line 8079 ---
createCard({ text: "Definir meta principal do dia", when: `${getActiveDay()}TGOAL`, 
       timerTotal: '900' });

// --- Line 8080 ---
});

// --- Line 8081 ---
applyFilters(); updateSlotsHasItems(); updateTotalTimerDisplay();

// --- Line 8082 ---
}

// --- Line 8083 ---


// --- Line 8084 ---
function updateFocusMode() {

// --- Line 8085 ---
// Se estiver no modo manual ou tela pequena

// --- Line 8086 ---
const isManual = document.body.classList.contains('manual-focus-mode');

// --- Line 8087 ---
if (window.innerWidth < 700 || isManual) {

// --- Line 8088 ---
const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8089 ---
if (runningCard) {

// --- Line 8090 ---
document.body.classList.add('focus-mode');

// --- Line 8091 ---
const text = runningCard.querySelector('.text').textContent;

// --- Line 8092 ---
const state = runningCard.dataset.timerState;

// --- Line 8093 ---
const disp = runningCard.querySelector('.timer-display');

// --- Line 8094 ---


// --- Line 8095 ---
document.getElementById('focusTargetText').textContent = text;

// --- Line 8096 ---
document.getElementById('focusTargetTime').textContent = disp ? 
       disp.textContent.replace('?? ', '').replace(' min', '').replace('? ', '') : '...';

// --- Line 8097 ---


// --- Line 8098 ---
const toggleBtn = document.getElementById('focusToggleBtn');

// --- Line 8099 ---
toggleBtn.textContent = state === 'running' ? '??' : '??';

// --- Line 8100 ---
return;

// --- Line 8101 ---
}

// --- Line 8102 ---
}

// --- Line 8103 ---
document.body.classList.remove('focus-mode');

// --- Line 8104 ---
}

// --- Line 8105 ---


// --- Line 8106 ---
// L�gica dos bot�es do foco

// --- Line 8107 ---
document.getElementById('focusToggleBtn').onclick = () => {

// --- Line 8108 ---
const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8109 ---
if (runningCard) {

// --- Line 8110 ---
handleCardDblClick(runningCard);

// --- Line 8111 ---
updateFocusMode();

// --- Line 8112 ---
}

// --- Line 8113 ---
};

// --- Line 8114 ---


// --- Line 8115 ---
document.getElementById('focusPlusBtn').onclick = () => {

// --- Line 8116 ---
const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8117 ---
if (runningCard) {

// --- Line 8118 ---
let left = parseInt(runningCard.dataset.timerLeft, 10) || 0;

// --- Line 8119 ---
let total = parseInt(runningCard.dataset.timerTotal, 10) || 0;

// --- Line 8120 ---
runningCard.dataset.timerLeft = left + 60;

// --- Line 8121 ---
runningCard.dataset.timerTotal = total + 60;

// --- Line 8122 ---
if (runningCard.dataset.timerState === 'running') {

// --- Line 8123 ---
let end = parseInt(runningCard.dataset.timerEnd, 10);

// --- Line 8124 ---
if (!isNaN(end)) runningCard.dataset.timerEnd = end + 60000;

// --- Line 8125 ---
else runningCard.dataset.timerEnd = Date.now() + (left + 60) * 1000;

// --- Line 8126 ---
}

// --- Line 8127 ---
updateTimerDisplay(runningCard);

// --- Line 8128 ---
updateFocusMode();

// --- Line 8129 ---
persist();

// --- Line 8130 ---
}

// --- Line 8131 ---
};

// --- Line 8132 ---


// --- Line 8133 ---
document.getElementById('focusMinusBtn').onclick = () => {

// --- Line 8134 ---
const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8135 ---
if (runningCard) {

// --- Line 8136 ---
let left = parseInt(runningCard.dataset.timerLeft, 10) || 0;

// --- Line 8137 ---
let total = parseInt(runningCard.dataset.timerTotal, 10) || 0;

// --- Line 8138 ---
if (left > 60) {

// --- Line 8139 ---
runningCard.dataset.timerLeft = left - 60;

// --- Line 8140 ---
runningCard.dataset.timerTotal = Math.max(0, total - 60);

// --- Line 8141 ---
if (runningCard.dataset.timerState === 'running') {

// --- Line 8142 ---
let end = parseInt(runningCard.dataset.timerEnd, 10);

// --- Line 8143 ---
if (!isNaN(end)) runningCard.dataset.timerEnd = end - 60000;

// --- Line 8144 ---
}

// --- Line 8145 ---
updateTimerDisplay(runningCard);

// --- Line 8146 ---
updateFocusMode();

// --- Line 8147 ---
persist();

// --- Line 8148 ---
}

// --- Line 8149 ---
}

// --- Line 8150 ---
};

// --- Line 8151 ---


// --- Line 8152 ---
document.getElementById('focusCloseBtn').onclick = () => {

// --- Line 8153 ---
document.body.classList.remove('manual-focus-mode', 'focus-mode');

// --- Line 8154 ---
};

// --- Line 8155 ---


// --- Line 8156 ---
document.getElementById('manualFocusBtn').onclick = () => {

// --- Line 8157 ---
const isRunning = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8158 ---
if (!isRunning) {

// --- Line 8159 ---
alert("Inicie um timer primeiro para entrar no modo foco!");

// --- Line 8160 ---
return;

// --- Line 8161 ---
}

// --- Line 8162 ---
document.body.classList.toggle('manual-focus-mode');

// --- Line 8163 ---
updateFocusMode();

// --- Line 8164 ---
};

// --- Line 8165 ---
// ===== RESIZERS LOGIC =====

// --- Line 8166 ---
function initResizers() {

// --- Line 8167 ---
const resizerSidebar = document.getElementById('resizer-sidebar');

// --- Line 8168 ---
const sidebar = document.getElementById('agenda-sidebar');

// --- Line 8169 ---
const resizerMatrix = document.getElementById('resizer-matrix');

// --- Line 8170 ---
const matrixContainer = document.getElementById('matrix-container');

// --- Line 8171 ---
const boardContainer = document.getElementById('board-container');

// --- Line 8172 ---
const resizerWeekly = document.getElementById('resizer-weekly');

// --- Line 8173 ---
const weeklyContainer = document.getElementById('weekly-container');

// --- Line 8174 ---


// --- Line 8175 ---
// Load saved sizes

// --- Line 8176 ---
try {

// --- Line 8177 ---
const saved = JSON.parse(localStorage.getItem('TEA_RESIZERS') || '{}');

// --- Line 8178 ---
if (saved.sidebarWidth && window.innerWidth > 700) sidebar.style.flexBasis = 
       saved.sidebarWidth + 'px';

// --- Line 8179 ---
if (saved.boardHeight) {

// --- Line 8180 ---
const h = parseInt(saved.boardHeight);

// --- Line 8181 ---
boardContainer.style.height = (isNaN(h) || h < 100) ? '300px' : h + 'px';

// --- Line 8182 ---
}

// --- Line 8183 ---
if (saved.weeklyHeight) {

// --- Line 8184 ---
const h = parseInt(saved.weeklyHeight);

// --- Line 8185 ---
weeklyContainer.style.height = (isNaN(h) || h < 50) ? '250px' : h + 'px';

// --- Line 8186 ---
}

// --- Line 8187 ---
} catch(e) {}

// --- Line 8188 ---


// --- Line 8189 ---
function saveResizerState() {

// --- Line 8190 ---
const state = {

// --- Line 8191 ---
sidebarWidth: sidebar.getBoundingClientRect().width,

// --- Line 8192 ---
boardHeight: boardContainer.getBoundingClientRect().height,

// --- Line 8193 ---
weeklyHeight: weeklyContainer.getBoundingClientRect().height

// --- Line 8194 ---
};

// --- Line 8195 ---
localStorage.setItem('TEA_RESIZERS', JSON.stringify(state));

// --- Line 8196 ---
}

// --- Line 8197 ---


// --- Line 8198 ---
function setupResizer(resizer, type) {

// --- Line 8199 ---
if (!resizer) return;

// --- Line 8200 ---
let isResizing = false;

// --- Line 8201 ---
let startX, startY, startWidth, startHeight;

// --- Line 8202 ---


// --- Line 8203 ---
function onStart(e) {

// --- Line 8204 ---
isResizing = true;

// --- Line 8205 ---
resizer.classList.add('resizing');

// --- Line 8206 ---
const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

// --- Line 8207 ---
const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

// --- Line 8208 ---
startX = clientX;

// --- Line 8209 ---
startY = clientY;

// --- Line 8210 ---


// --- Line 8211 ---
if (type === 'sidebar') {

// --- Line 8212 ---
startWidth = sidebar.getBoundingClientRect().width;

// --- Line 8213 ---
} else if (type === 'matrix') {

// --- Line 8214 ---
startHeight = boardContainer.getBoundingClientRect().height;

// --- Line 8215 ---
} else if (type === 'weekly') {

// --- Line 8216 ---
startHeight = weeklyContainer.getBoundingClientRect().height;

// --- Line 8217 ---
}

// --- Line 8218 ---


// --- Line 8219 ---
// Disable transitions during resize for smooth dragging

// --- Line 8220 ---
if (type === 'sidebar') sidebar.style.transition = 'none';

// --- Line 8221 ---
if (type === 'matrix') {

// --- Line 8222 ---
boardContainer.style.transition = 'none';

// --- Line 8223 ---
matrixContainer.style.transition = 'none';

// --- Line 8224 ---
}

// --- Line 8225 ---
if (type === 'weekly') {

// --- Line 8226 ---
weeklyContainer.style.transition = 'none';

// --- Line 8227 ---
boardContainer.style.transition = 'none';

// --- Line 8228 ---
}

// --- Line 8229 ---
}

// --- Line 8230 ---


// --- Line 8231 ---
function onMove(e) {

// --- Line 8232 ---
if (!isResizing) return;

// --- Line 8233 ---
const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

// --- Line 8234 ---
const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

// --- Line 8235 ---


// --- Line 8236 ---
if (type === 'sidebar') {

// --- Line 8237 ---
// Calcula a nova largura (sidebar est� na direita, ent�o mouse pra esquerda = 
       aumenta width)

// --- Line 8238 ---
let newWidth = startWidth - (clientX - startX);

// --- Line 8239 ---
// Limites de tamanho

// --- Line 8240 ---
if (newWidth < 200) newWidth = 200;

// --- Line 8241 ---


// --- Line 8242 ---
// Limita o crescimento para manter a propor��o dos cart�es

// --- Line 8243 ---
let maxWidth = Math.min(400, window.innerWidth * 0.8);

// --- Line 8244 ---
if (newWidth > maxWidth) newWidth = maxWidth;

// --- Line 8245 ---


// --- Line 8246 ---
sidebar.style.flexBasis = newWidth + 'px';

// --- Line 8247 ---
} else if (type === 'matrix') {

// --- Line 8248 ---
// Calcula a nova altura para o board (resizer entre board e matrix)

// --- Line 8249 ---
let newHeight = startHeight + (clientY - startY);

// --- Line 8250 ---
if (newHeight < 100) newHeight = 100; // Altura m�nima do board

// --- Line 8251 ---
if (newHeight > window.innerHeight * 0.7) newHeight = window.innerHeight * 0.7; // 
       Altura m�xima

// --- Line 8252 ---
boardContainer.style.height = newHeight + 'px';

// --- Line 8253 ---
boardContainer.style.flex = 'none'; // Ensure flex-grow doesn't override height

// --- Line 8254 ---
} else if (type === 'weekly') {

// --- Line 8255 ---
let newHeight = startHeight + (clientY - startY);

// --- Line 8256 ---
if (newHeight < 150) newHeight = 150; // Altura m�nima do weekly view

// --- Line 8257 ---
if (newHeight > window.innerHeight * 0.8) newHeight = window.innerHeight * 0.8;

// --- Line 8258 ---
weeklyContainer.style.height = newHeight + 'px';

// --- Line 8259 ---
weeklyContainer.style.flex = 'none';

// --- Line 8260 ---
}

// --- Line 8261 ---
}

// --- Line 8262 ---


// --- Line 8263 ---
function onEnd(e) {

// --- Line 8264 ---
if (!isResizing) return;

// --- Line 8265 ---
isResizing = false;

// --- Line 8266 ---
resizer.classList.remove('resizing');

// --- Line 8267 ---


// --- Line 8268 ---
// Restore transitions

// --- Line 8269 ---
if (type === 'sidebar') sidebar.style.transition = '';

// --- Line 8270 ---
if (type === 'matrix') {

// --- Line 8271 ---
boardContainer.style.transition = '';

// --- Line 8272 ---
matrixContainer.style.transition = '';

// --- Line 8273 ---
}

// --- Line 8274 ---
if (type === 'weekly') {

// --- Line 8275 ---
weeklyContainer.style.transition = '';

// --- Line 8276 ---
boardContainer.style.transition = '';

// --- Line 8277 ---
}

// --- Line 8278 ---


// --- Line 8279 ---
saveResizerState();

// --- Line 8280 ---
}

// --- Line 8281 ---


// --- Line 8282 ---
resizer.addEventListener('mousedown', onStart);

// --- Line 8283 ---
resizer.addEventListener('touchstart', onStart, { passive: true });

// --- Line 8284 ---
document.addEventListener('mousemove', onMove);

// --- Line 8285 ---
document.addEventListener('touchmove', onMove, { passive: true });

// --- Line 8286 ---
document.addEventListener('mouseup', onEnd);

// --- Line 8287 ---
document.addEventListener('touchend', onEnd);

// --- Line 8288 ---
}

// --- Line 8289 ---


// --- Line 8290 ---
setupResizer(resizerSidebar, 'sidebar');

// --- Line 8291 ---
setupResizer(resizerMatrix, 'matrix');

// --- Line 8292 ---
setupResizer(resizerWeekly, 'weekly');

// --- Line 8293 ---
}

// --- Line 8294 ---


// --- Line 8295 ---
// ===== AI ASSISTANT MOTOR / CONTROLLER =====

// --- Line 8296 ---
let aiConversationHistory = [];

// --- Line 8297 ---
let recognition = null;

// --- Line 8298 ---
let isRecording = false;

// --- Line 8299 ---


// --- Line 8300 ---
function configureApiKeyDialog() {

// --- Line 8301 ---
showModal('Configurar Intelig�ncia Artificial', function() {

// --- Line 8302 ---
const div = el('div');

// --- Line 8303 ---
div.style.padding = '8px 0';

// --- Line 8304 ---
div.style.minWidth = '320px';

// --- Line 8305 ---
div.style.maxWidth = '450px';

// --- Line 8306 ---
div.style.fontFamily = 'sans-serif';

// --- Line 8307 ---
div.style.color = '#fff';

// --- Line 8308 ---
div.innerHTML = `

// --- Line 8309 ---
<div style="margin-bottom: 15px;">

// --- Line 8310 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Provedor de IA</label>

// --- Line 8311 ---
<select id="dialogAiProvider" name="dialogAiProvider" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

// --- Line 8312 ---
<option value="gemini">Google Gemini</option>

// --- Line 8313 ---
<option value="openai">OpenAI (ChatGPT / Compat�vel)</option>

// --- Line 8314 ---
<option value="anthropic">Anthropic (Claude)</option>

// --- Line 8315 ---
</select>

// --- Line 8316 ---
</div>

// --- Line 8317 ---


// --- Line 8318 ---
<!-- Painel Gemini -->

// --- Line 8319 ---
<div id="settings-gemini" class="provider-settings-panel" style="display: none;">

// --- Line 8320 ---
<div style="margin-bottom: 12px;">

// --- Line 8321 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API do Gemini</label>

// --- Line 8322 ---
<input type="password" id="dialogGeminiApiKeyInput" 
       name="dialogGeminiApiKeyInput" placeholder="Cole sua API Key do Gemini (ex: AIzaSy...)" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8323 ---
</div>

// --- Line 8324 ---
<div style="margin-bottom: 12px;">

// --- Line 8325 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo do Gemini</label>

// --- Line 8326 ---
<select id="dialogGeminiModelSelect" name="dialogGeminiModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

// --- Line 8327 ---
<option value="auto">Auto (Flash/Pro Sequencial)</option>

// --- Line 8328 ---
<option value="gemini-1.5-flash">Gemini 1.5 Flash</option>

// --- Line 8329 ---
<option value="gemini-2.0-flash">Gemini 2.0 Flash</option>

// --- Line 8330 ---
<option value="gemini-2.5-flash">Gemini 2.5 Flash</option>

// --- Line 8331 ---
<option value="gemini-1.5-pro">Gemini 1.5 Pro</option>

// --- Line 8332 ---
<option value="gemini-2.0-pro-exp">Gemini 2.0 Pro Exp</option>

// --- Line 8333 ---
<option value="custom">Outro Modelo Personalizado...</option>

// --- Line 8334 ---
</select>

// --- Line 8335 ---
</div>

// --- Line 8336 ---
<div id="geminiCustomModelRow" style="margin-bottom: 12px; display: none;">

// --- Line 8337 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

// --- Line 8338 ---
<input type="text" id="dialogGeminiCustomModelInput" 
       name="dialogGeminiCustomModelInput" placeholder="ex: gemini-2.0-pro-exp-02-05" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8339 ---
</div>

// --- Line 8340 ---
</div>

// --- Line 8341 ---


// --- Line 8342 ---
<!-- Painel OpenAI -->

// --- Line 8343 ---
<div id="settings-openai" class="provider-settings-panel" style="display: none;">

// --- Line 8344 ---
<div style="margin-bottom: 12px;">

// --- Line 8345 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API da OpenAI (sk-...)</label>

// --- Line 8346 ---
<input type="password" id="dialogOpenaiApiKeyInput" 
       name="dialogOpenaiApiKeyInput" placeholder="Cole sua API Key (sk-...)" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8347 ---
</div>

// --- Line 8348 ---
<div style="margin-bottom: 12px;">

// --- Line 8349 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo da OpenAI</label>

// --- Line 8350 ---
<select id="dialogOpenaiModelSelect" name="dialogOpenaiModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

// --- Line 8351 ---
<option value="gpt-4o-mini">GPT-4o Mini (Recomendado)</option>

// --- Line 8352 ---
<option value="gpt-4o">GPT-4o</option>

// --- Line 8353 ---
<option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>

// --- Line 8354 ---
<option value="custom">Outro Modelo Personalizado...</option>

// --- Line 8355 ---
</select>

// --- Line 8356 ---
</div>

// --- Line 8357 ---
<div id="openaiCustomModelRow" style="margin-bottom: 12px; display: none;">

// --- Line 8358 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

// --- Line 8359 ---
<input type="text" id="dialogOpenaiCustomModelInput" 
       name="dialogOpenaiCustomModelInput" placeholder="ex: gpt-4-turbo" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8360 ---
</div>

// --- Line 8361 ---
<div style="margin-bottom: 12px;">

// --- Line 8362 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">URL Base da API (Opcional)</label>

// --- Line 8363 ---
<input type="text" id="dialogOpenaiCustomUrlInput" 
       name="dialogOpenaiCustomUrlInput" placeholder="Padr�o: https://api.openai.com/v1" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8364 ---
<span style="font-size: 11px; color: #88a3c7; display: block; margin-top: 4px; 
       line-height: 1.3;">Para usar OpenRouter, LM Studio, Ollama ou proxies de CORS.</span>

// --- Line 8365 ---
</div>

// --- Line 8366 ---
</div>

// --- Line 8367 ---


// --- Line 8368 ---
<!-- Painel Anthropic -->

// --- Line 8369 ---
<div id="settings-anthropic" class="provider-settings-panel" style="display: none;">

// --- Line 8370 ---
<div style="margin-bottom: 12px;">

// --- Line 8371 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API da Anthropic (sk-ant-...)</label>

// --- Line 8372 ---
<input type="password" id="dialogAnthropicApiKeyInput" 
       name="dialogAnthropicApiKeyInput" placeholder="Cole sua API Key (sk-ant-...)" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8373 ---
</div>

// --- Line 8374 ---
<div style="margin-bottom: 12px;">

// --- Line 8375 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo da Anthropic</label>

// --- Line 8376 ---
<select id="dialogAnthropicModelSelect" name="dialogAnthropicModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

// --- Line 8377 ---
<option value="claude-3-5-sonnet-latest">Claude 3.5 Sonnet</option>

// --- Line 8378 ---
<option value="claude-3-5-haiku-latest">Claude 3.5 Haiku</option>

// --- Line 8379 ---
<option value="claude-3-opus-latest">Claude 3 Opus</option>

// --- Line 8380 ---
<option value="custom">Outro Modelo Personalizado...</option>

// --- Line 8381 ---
</select>

// --- Line 8382 ---
</div>

// --- Line 8383 ---
<div id="anthropicCustomModelRow" style="margin-bottom: 12px; display: none;">

// --- Line 8384 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

// --- Line 8385 ---
<input type="text" id="dialogAnthropicCustomModelInput" 
       name="dialogAnthropicCustomModelInput" placeholder="ex: claude-3-haiku-20240307" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8386 ---
</div>

// --- Line 8387 ---
<div style="margin-bottom: 12px;">

// --- Line 8388 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">URL Base da API (Opcional)</label>

// --- Line 8389 ---
<input type="text" id="dialogAnthropicCustomUrlInput" 
       name="dialogAnthropicCustomUrlInput" placeholder="Padr�o: https://api.anthropic.com/v1" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8390 ---
<span style="font-size: 11px; color: #88a3c7; display: block; margin-top: 4px; 
       line-height: 1.3;">Requer um proxy de CORS para uso direto do navegador.</span>

// --- Line 8391 ---
</div>

// --- Line 8392 ---
</div>

// --- Line 8393 ---


// --- Line 8394 ---
<div style="margin-top: 15px; font-size: 11px; color: #ffa726; line-height: 1.4; 
       border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 10px;">

// --- Line 8395 ---
<span>?? Suas credenciais s�o salvas <strong>localmente</strong> no seu navegador 
       (localStorage) com seguran�a.</span>

// --- Line 8396 ---
</div>

// --- Line 8397 ---
`;

// --- Line 8398 ---


// --- Line 8399 ---
// Setup events and load values

// --- Line 8400 ---
const providerSelect = div.querySelector('#dialogAiProvider');

// --- Line 8401 ---
const geminiModelSelect = div.querySelector('#dialogGeminiModelSelect');

// --- Line 8402 ---
const openaiModelSelect = div.querySelector('#dialogOpenaiModelSelect');

// --- Line 8403 ---
const anthropicModelSelect = div.querySelector('#dialogAnthropicModelSelect');

// --- Line 8404 ---


// --- Line 8405 ---
function updatePanelVisibility() {

// --- Line 8406 ---
const provider = providerSelect.value;

// --- Line 8407 ---
div.querySelectorAll('.provider-settings-panel').forEach(p => p.style.display = 'none');

// --- Line 8408 ---
div.querySelector('#settings-' + provider).style.display = 'block';

// --- Line 8409 ---
}

// --- Line 8410 ---


// --- Line 8411 ---
geminiModelSelect.addEventListener('change', () => {

// --- Line 8412 ---
div.querySelector('#geminiCustomModelRow').style.display = geminiModelSelect.value === 
       'custom' ? 'block' : 'none';

// --- Line 8413 ---
});

// --- Line 8414 ---
openaiModelSelect.addEventListener('change', () => {

// --- Line 8415 ---
div.querySelector('#openaiCustomModelRow').style.display = openaiModelSelect.value === 
       'custom' ? 'block' : 'none';

// --- Line 8416 ---
});

// --- Line 8417 ---
anthropicModelSelect.addEventListener('change', () => {

// --- Line 8418 ---
div.querySelector('#anthropicCustomModelRow').style.display = 
       anthropicModelSelect.value === 'custom' ? 'block' : 'none';

// --- Line 8419 ---
});

// --- Line 8420 ---


// --- Line 8421 ---
providerSelect.addEventListener('change', updatePanelVisibility);

// --- Line 8422 ---


// --- Line 8423 ---
// Load saved values

// --- Line 8424 ---
const savedProvider = localStorage.getItem('ai-provider') || 'gemini';

// --- Line 8425 ---
providerSelect.value = savedProvider;

// --- Line 8426 ---


// --- Line 8427 ---
// Load Gemini

// --- Line 8428 ---
div.querySelector('#dialogGeminiApiKeyInput').value = 
       localStorage.getItem('gemini-api-key') || '';

// --- Line 8429 ---
const savedGeminiModel = localStorage.getItem('gemini-model') || 'auto';

// --- Line 8430 ---
if (['auto', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro', 
       'gemini-2.0-pro-exp'].includes(savedGeminiModel)) {

// --- Line 8431 ---
geminiModelSelect.value = savedGeminiModel;

// --- Line 8432 ---
} else {

// --- Line 8433 ---
geminiModelSelect.value = 'custom';

// --- Line 8434 ---
div.querySelector('#dialogGeminiCustomModelInput').value = savedGeminiModel;

// --- Line 8435 ---
div.querySelector('#geminiCustomModelRow').style.display = 'block';

// --- Line 8436 ---
}

// --- Line 8437 ---


// --- Line 8438 ---
// Load OpenAI

// --- Line 8439 ---
div.querySelector('#dialogOpenaiApiKeyInput').value = 
       localStorage.getItem('openai-api-key') || '';

// --- Line 8440 ---
const savedOpenaiModel = localStorage.getItem('openai-model') || 'gpt-4o-mini';

// --- Line 8441 ---
if (['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'].includes(savedOpenaiModel)) {

// --- Line 8442 ---
openaiModelSelect.value = savedOpenaiModel;

// --- Line 8443 ---
} else {

// --- Line 8444 ---
openaiModelSelect.value = 'custom';

// --- Line 8445 ---
div.querySelector('#dialogOpenaiCustomModelInput').value = savedOpenaiModel;

// --- Line 8446 ---
div.querySelector('#openaiCustomModelRow').style.display = 'block';

// --- Line 8447 ---
}

// --- Line 8448 ---
div.querySelector('#dialogOpenaiCustomUrlInput').value = 
       localStorage.getItem('openai-custom-url') || '';

// --- Line 8449 ---


// --- Line 8450 ---
// Load Anthropic

// --- Line 8451 ---
div.querySelector('#dialogAnthropicApiKeyInput').value = 
       localStorage.getItem('anthropic-api-key') || '';

// --- Line 8452 ---
const savedAnthropicModel = localStorage.getItem('anthropic-model') || 
       'claude-3-5-sonnet-latest';

// --- Line 8453 ---
if (['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 
       'claude-3-opus-latest'].includes(savedAnthropicModel)) {

// --- Line 8454 ---
anthropicModelSelect.value = savedAnthropicModel;

// --- Line 8455 ---
} else {

// --- Line 8456 ---
anthropicModelSelect.value = 'custom';

// --- Line 8457 ---
div.querySelector('#dialogAnthropicCustomModelInput').value = savedAnthropicModel;

// --- Line 8458 ---
div.querySelector('#anthropicCustomModelRow').style.display = 'block';

// --- Line 8459 ---
}

// --- Line 8460 ---
div.querySelector('#dialogAnthropicCustomUrlInput').value = 
       localStorage.getItem('anthropic-custom-url') || '';

// --- Line 8461 ---


// --- Line 8462 ---
updatePanelVisibility();

// --- Line 8463 ---
return div;

// --- Line 8464 ---
}, function(body) {

// --- Line 8465 ---
const provider = body.querySelector('#dialogAiProvider').value;

// --- Line 8466 ---
localStorage.setItem('ai-provider', provider);

// --- Line 8467 ---


// --- Line 8468 ---
// Save Gemini

// --- Line 8469 ---
const geminiKey = body.querySelector('#dialogGeminiApiKeyInput').value.trim();

// --- Line 8470 ---
if (geminiKey) localStorage.setItem('gemini-api-key', geminiKey);

// --- Line 8471 ---
else localStorage.removeItem('gemini-api-key');

// --- Line 8472 ---


// --- Line 8473 ---
const geminiSel = body.querySelector('#dialogGeminiModelSelect').value;

// --- Line 8474 ---
const geminiModel = geminiSel === 'custom' ? 
       body.querySelector('#dialogGeminiCustomModelInput').value.trim() : geminiSel;

// --- Line 8475 ---
localStorage.setItem('gemini-model', geminiModel || 'auto');

// --- Line 8476 ---


// --- Line 8477 ---
// Save OpenAI

// --- Line 8478 ---
const openaiKey = body.querySelector('#dialogOpenaiApiKeyInput').value.trim();

// --- Line 8479 ---
if (openaiKey) localStorage.setItem('openai-api-key', openaiKey);

// --- Line 8480 ---
else localStorage.removeItem('openai-api-key');

// --- Line 8481 ---


// --- Line 8482 ---
const openaiSel = body.querySelector('#dialogOpenaiModelSelect').value;

// --- Line 8483 ---
const openaiModel = openaiSel === 'custom' ? 
       body.querySelector('#dialogOpenaiCustomModelInput').value.trim() : openaiSel;

// --- Line 8484 ---
localStorage.setItem('openai-model', openaiModel || 'gpt-4o-mini');

// --- Line 8485 ---


// --- Line 8486 ---
const openaiUrl = body.querySelector('#dialogOpenaiCustomUrlInput').value.trim();

// --- Line 8487 ---
if (openaiUrl) localStorage.setItem('openai-custom-url', openaiUrl);

// --- Line 8488 ---
else localStorage.removeItem('openai-custom-url');

// --- Line 8489 ---


// --- Line 8490 ---
// Save Anthropic

// --- Line 8491 ---
const anthropicKey = body.querySelector('#dialogAnthropicApiKeyInput').value.trim();

// --- Line 8492 ---
if (anthropicKey) localStorage.setItem('anthropic-api-key', anthropicKey);

// --- Line 8493 ---
else localStorage.removeItem('anthropic-api-key');

// --- Line 8494 ---


// --- Line 8495 ---
const anthropicSel = body.querySelector('#dialogAnthropicModelSelect').value;

// --- Line 8496 ---
const anthropicModel = anthropicSel === 'custom' ? 
       body.querySelector('#dialogAnthropicCustomModelInput').value.trim() : anthropicSel;

// --- Line 8497 ---
localStorage.setItem('anthropic-model', anthropicModel || 'claude-3-5-sonnet-latest');

// --- Line 8498 ---


// --- Line 8499 ---
const anthropicUrl = body.querySelector('#dialogAnthropicCustomUrlInput').value.trim();

// --- Line 8500 ---
if (anthropicUrl) localStorage.setItem('anthropic-custom-url', anthropicUrl);

// --- Line 8501 ---
else localStorage.removeItem('anthropic-custom-url');

// --- Line 8502 ---


// --- Line 8503 ---
alert("Configura��es de IA salvas com sucesso!");

// --- Line 8504 ---
});

// --- Line 8505 ---
}

// --- Line 8506 ---


// --- Line 8507 ---
function initSpeechRecognition() {

// --- Line 8508 ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// --- Line 8509 ---
if (!SpeechRecognition) {

// --- Line 8510 ---
console.log("Speech recognition not supported in this browser.");

// --- Line 8511 ---
const micBtn = document.getElementById('aiMicBtn');

// --- Line 8512 ---
if (micBtn) micBtn.style.display = 'none';

// --- Line 8513 ---
return;

// --- Line 8514 ---
}

// --- Line 8515 ---


// --- Line 8516 ---
recognition = new SpeechRecognition();

// --- Line 8517 ---
recognition.lang = 'pt-BR';

// --- Line 8518 ---
recognition.interimResults = false;

// --- Line 8519 ---
recognition.maxAlternatives = 1;

// --- Line 8520 ---


// --- Line 8521 ---
recognition.onstart = function() {

// --- Line 8522 ---
isRecording = true;

// --- Line 8523 ---
const micBtn = document.getElementById('aiMicBtn');

// --- Line 8524 ---
if (micBtn) {

// --- Line 8525 ---
micBtn.classList.add('recording');

// --- Line 8526 ---
micBtn.textContent = '??';

// --- Line 8527 ---
}

// --- Line 8528 ---
const sw = document.getElementById('aiSoundwave');

// --- Line 8529 ---
if (sw) sw.classList.add('active');

// --- Line 8530 ---
showAiResponseBubble("Ouvindo... Fale agora.", false, false);

// --- Line 8531 ---
};

// --- Line 8532 ---


// --- Line 8533 ---
recognition.onend = function() {

// --- Line 8534 ---
isRecording = false;

// --- Line 8535 ---
const micBtn = document.getElementById('aiMicBtn');

// --- Line 8536 ---
if (micBtn) {

// --- Line 8537 ---
micBtn.classList.remove('recording');

// --- Line 8538 ---
micBtn.textContent = '???';

// --- Line 8539 ---
}

// --- Line 8540 ---
const sw = document.getElementById('aiSoundwave');

// --- Line 8541 ---
if (sw) sw.classList.remove('active');

// --- Line 8542 ---
};

// --- Line 8543 ---


// --- Line 8544 ---
recognition.onerror = function(event) {

// --- Line 8545 ---
console.error("Speech recognition error", event.error);

// --- Line 8546 ---
showAiResponseBubble("Erro na grava��o de voz: " + event.error, false, true);

// --- Line 8547 ---
};

// --- Line 8548 ---


// --- Line 8549 ---
recognition.onresult = function(event) {

// --- Line 8550 ---
const transcript = event.results[0][0].transcript;

// --- Line 8551 ---
const inputEl = document.getElementById('aiInput');

// --- Line 8552 ---
if (inputEl) {

// --- Line 8553 ---
inputEl.value = transcript;

// --- Line 8554 ---
submitAiCommand();

// --- Line 8555 ---
}

// --- Line 8556 ---
};

// --- Line 8557 ---
}

// --- Line 8558 ---


// --- Line 8559 ---
function toggleVoiceRecord() {

// --- Line 8560 ---
if (!recognition) {

// --- Line 8561 ---
alert("O reconhecimento de voz n�o � suportado pelo seu navegador.");

// --- Line 8562 ---
return;

// --- Line 8563 ---
}

// --- Line 8564 ---
if (isRecording) {

// --- Line 8565 ---
recognition.stop();

// --- Line 8566 ---
} else {

// --- Line 8567 ---
recognition.start();

// --- Line 8568 ---
}

// --- Line 8569 ---
}

// --- Line 8570 ---


// --- Line 8571 ---
function showAiResponseBubble(message, isQuestion = false, isError = false) {

// --- Line 8572 ---
const bubble = document.getElementById('aiResponseBubble');

// --- Line 8573 ---
if (!bubble) return;

// --- Line 8574 ---


// --- Line 8575 ---
bubble.innerHTML = '';

// --- Line 8576 ---
if (isError) {

// --- Line 8577 ---
const errDiv = el('div', 'ai-error');

// --- Line 8578 ---
errDiv.textContent = message;

// --- Line 8579 ---
bubble.appendChild(errDiv);

// --- Line 8580 ---
} else if (isQuestion) {

// --- Line 8581 ---
const qDiv = el('div', 'ai-question');

// --- Line 8582 ---
qDiv.textContent = message;

// --- Line 8583 ---
bubble.appendChild(qDiv);

// --- Line 8584 ---
} else {

// --- Line 8585 ---
const expDiv = el('div', 'ai-explanation');

// --- Line 8586 ---
expDiv.textContent = message;

// --- Line 8587 ---
bubble.appendChild(expDiv);

// --- Line 8588 ---
}

// --- Line 8589 ---


// --- Line 8590 ---
bubble.classList.add('active');

// --- Line 8591 ---


// --- Line 8592 ---
if (!isQuestion && !isError && message !== 'Processando...') {

// --- Line 8593 ---
setTimeout(() => {

// --- Line 8594 ---
if (bubble.textContent === message) {

// --- Line 8595 ---
bubble.classList.remove('active');

// --- Line 8596 ---
}

// --- Line 8597 ---
}, 8000);

// --- Line 8598 ---
}

// --- Line 8599 ---
}

// --- Line 8600 ---


// --- Line 8601 ---
async function submitAiCommand() {

// --- Line 8602 ---
const inputEl = document.getElementById('aiInput');

// --- Line 8603 ---
if (!inputEl) return;

// --- Line 8604 ---
const text = inputEl.value.trim();

// --- Line 8605 ---
if (!text) return;

// --- Line 8606 ---


// --- Line 8607 ---
inputEl.value = '';

// --- Line 8608 ---
showAiResponseBubble('Processando...', false, false);

// --- Line 8609 ---


// --- Line 8610 ---
aiConversationHistory.push({ role: 'user', parts: [{ text: text }] });

// --- Line 8611 ---


// --- Line 8612 ---
const activeBoardMeta = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 8613 ---
const activeBoardName = activeBoardMeta ? activeBoardMeta.name : 'Principal';

// --- Line 8614 ---
const existingBoards = boardsMeta.map(b => b.name);

// --- Line 8615 ---
const activeBoardLists = $$('.list[data-type="kanban"]', boardEl).map(l => 
       l.querySelector('.title').value);

// --- Line 8616 ---


// --- Line 8617 ---
const sysPrompt = `Voc� � a intelig�ncia artificial de controle do TEA Planner, um aplicativo 
       de produtividade que mistura Kanban, Matriz de Eisenhower (Q1, Q2, Q3, Q4) e Agenda com compromissos di�rios.

// --- Line 8618 ---


// --- Line 8619 ---
Seu objetivo � analisar o comando em linguagem natural do usu�rio (em portugu�s) e retornar um JSON contendo 
       uma lista de a��es estruturadas para o aplicativo executar.

// --- Line 8620 ---


// --- Line 8621 ---
A data de hoje no sistema �: ${getActiveDay()}.

// --- Line 8622 ---
O quadro ativo atualmente �: "${activeBoardName}".

// --- Line 8623 ---
Os quadros existentes no sistema s�o: ${JSON.stringify(existingBoards)}.

// --- Line 8624 ---
As listas no quadro ativo atualmente s�o: ${JSON.stringify(activeBoardLists)}.

// --- Line 8625 ---


// --- Line 8626 ---
Voc� deve analisar o comando e responder estritamente com um JSON no seguinte formato, sem formata��o markdown 
       (como blocos de c�digo \`\`\`json), sem textos adicionais antes ou depois.

// --- Line 8627 ---


// --- Line 8628 ---
Formato de Resposta Esperado:

// --- Line 8629 ---
{

// --- Line 8630 ---
"explanation": "Uma frase amig�vel explicando o que voc� entendeu e vai fazer.",

// --- Line 8631 ---
"question": "Se o comando for amb�guo ou necessitar de esclarecimento (por exemplo, criar uma lista mas 
       existem m�ltiplos quadros e o usu�rio n�o especificou qual, ou criar uma lista de compras mas n�o disse o nome 
       da lista), fa�a a pergunta aqui. Se 'question' estiver preenchido, o array 'actions' DEVE estar vazio.",

// --- Line 8632 ---
"actions": [

// --- Line 8633 ---
// Array de a��es a serem executadas em ordem. Pode ser vazio.

// --- Line 8634 ---
{

// --- Line 8635 ---
"type": "SWITCH_BOARD",

// --- Line 8636 ---
"boardName": "Nome exato do quadro para o qual mudar"

// --- Line 8637 ---
},

// --- Line 8638 ---
{

// --- Line 8639 ---
"type": "CREATE_LIST",

// --- Line 8640 ---
"boardName": "Nome do quadro", // Opcional (assume o atual se omitido)

// --- Line 8641 ---
"listTitle": "Nome da Lista"

// --- Line 8642 ---
},

// --- Line 8643 ---
{

// --- Line 8644 ---
"type": "CREATE_CARDS",

// --- Line 8645 ---
"boardName": "Nome do quadro", // Opcional (assume o atual se omitido)

// --- Line 8646 ---
"listTitle": "Nome da Lista",  // Opcional se for para Matriz ou Agenda

// --- Line 8647 ---
"quadrant": "Q1" | "Q2" | "Q3" | "Q4", // Opcional (s� preencha se for para a Matriz de Eisenhower)

// --- Line 8648 ---
"time": "HH:MM", // Opcional (s� preencha se for para a Agenda, ex: "10:00")

// --- Line 8649 ---
"goal": true | false, // Opcional (se for o Objetivo do Dia na agenda)

// --- Line 8650 ---
"cards": [

// --- Line 8651 ---
{

// --- Line 8652 ---
"text": "Texto do cart�o",

// --- Line 8653 ---
"color": "#hex_opcional",

// --- Line 8654 ---
"due": "YYYY-MM-DD" // Opcional (prazo final, formato YYYY-MM-DD)

// --- Line 8655 ---
}

// --- Line 8656 ---
]

// --- Line 8657 ---
},

// --- Line 8658 ---
{

// --- Line 8659 ---
"type": "COMPLETE_CARDS",

// --- Line 8660 ---
"timeRange": "morning" | "afternoon" | "evening" | "night" | "all", // Opcional (para completar 
       compromissos do per�odo da manh�/tarde/noite/tudo)

// --- Line 8661 ---
"time": "HH:MM", // Opcional (completar compromisso de um hor�rio espec�fico)

// --- Line 8662 ---
"listTitle": "Nome da Lista", // Opcional (completar todos os cart�es desta lista no kanban)

// --- Line 8663 ---
"quadrant": "Q1" | "Q2" | "Q3" | "Q4", // Opcional (completar todos os cart�es deste quadrante)

// --- Line 8664 ---
"all": true | false // Opcional

// --- Line 8665 ---
},

// --- Line 8666 ---
{

// --- Line 8667 ---
"type": "COPY_PASTE_AGENDA",

// --- Line 8668 ---
"fromDay": "YYYY-MM-DD",

// --- Line 8669 ---
"toDay": "YYYY-MM-DD"

// --- Line 8670 ---
},

// --- Line 8671 ---
{

// --- Line 8672 ---
"type": "DELETE_LIST",

// --- Line 8673 ---
"listTitle": "Nome da Lista"

// --- Line 8674 ---
},

// --- Line 8675 ---
{

// --- Line 8676 ---
"type": "DELETE_CARD",

// --- Line 8677 ---
"cardText": "Texto ou trecho do cartão a ser deletado"

// --- Line 8678 ---
},

// --- Line 8679 ---
{

// --- Line 8680 ---
"type": "DUPLICATE_CARD",

// --- Line 8681 ---
"cardText": "Texto ou trecho do cartão a ser duplicado"

// --- Line 8682 ---
},

// --- Line 8683 ---
{

// --- Line 8684 ---
"type": "MOVE_CARD",

// --- Line 8685 ---
"cardText": "Texto ou trecho do cartão a ser movido",

// --- Line 8686 ---
"targetListTitle": "Nome da lista destino, ou quadrante como Q1/Q2/Q3/Q4, ou horário como HH:MM",

// --- Line 8687 ---
"targetBoardName": "Nome do quadro de destino"

// --- Line 8688 ---
},

// --- Line 8689 ---
{

// --- Line 8690 ---
"type": "MOVE_LIST",

// --- Line 8691 ---
"listTitle": "Nome da lista a ser movida",

// --- Line 8692 ---
"targetBoardName": "Nome do quadro de destino"

// --- Line 8693 ---
},

// --- Line 8694 ---
{

// --- Line 8695 ---
"type": "CHANGE_THEME",

// --- Line 8696 ---
"color": "Cor desejada (pode ser o nome em português como verde, azul, rosa ou o hex da cor)"

// --- Line 8697 ---
},

// --- Line 8698 ---
{

// --- Line 8699 ---
"type": "START_TIMER",

// --- Line 8700 ---
"cardText": "Texto do cartão para o qual iniciar o timer"

// --- Line 8701 ---
},

// --- Line 8702 ---
{

// --- Line 8703 ---
"type": "PAUSE_TIMER",

// --- Line 8704 ---
"cardText": "Texto do cartão para o qual pausar o timer"

// --- Line 8705 ---
},

// --- Line 8706 ---
{

// --- Line 8707 ---
"type": "TOGGLE_PANEL",

// --- Line 8708 ---
"panel": "kanban" | "matrix" | "agenda" | "weekly"

// --- Line 8709 ---
}

// --- Line 8710 ---
]

// --- Line 8711 ---
}

// --- Line 8712 ---


// --- Line 8713 ---
Regras Importantes:

// --- Line 8714 ---
1. Sempre responda em formato JSON v�lido e parse�vel pelo JSON.parse(). N�o retorne explica��es fora do JSON.

// --- Line 8715 ---
2. Identifique datas relativas baseadas no dia de hoje: "hoje" � ${getActiveDay()}, "amanh�" � o dia seguinte, 
       "ontem" � o dia anterior, etc.

// --- Line 8716 ---
3. Se o usu�rio quiser criar cart�es na agenda, use "time" ou "goal". Exemplo: "Consulta m�dica 10h" -> type: 
       CREATE_CARDS com time: "10:00".

// --- Line 8717 ---
4. Se o usu�rio quiser criar uma lista e cart�es (ex: "lista de feira com batata e brocolis"), e houver 
       m�ltiplos quadros no sistema, mas ele n�o disser em qual quadro: pergunte em qual quadro ele deseja criar 
       preenchendo o campo "question".

// --- Line 8718 ---
5. Se houver apenas 1 quadro cadastrado no sistema al�m da Lixeira, crie a lista diretamente nele sem perguntar.

// --- Line 8719 ---
6. Se o usu�rio disser para copiar a agenda de ontem para hoje, retorne uma a��o do tipo COPY_PASTE_AGENDA com 
       fromDay = ontem e toDay = hoje.

// --- Line 8720 ---
7. Se o usu�rio disser "marcar como feito as atividades da manh�", retorne complete_cards com timeRange = 
       "morning". A manh� corresponde a qualquer hor�rio de 06:00 a 11:30.

// --- Line 8721 ---
8. Mantenha os nomes de quadros e listas consistentes com os j� existentes, se houver similaridade sem�ntica 
       (ex: "pessoal" e "Pessoal").

// --- Line 8722 ---
9. Se o usu�rio pedir para deletar/excluir/apagar uma lista, use DELETE_LIST.

// --- Line 8723 ---
10. Se o usu�rio pedir para deletar/excluir/apagar um cart�o, use DELETE_CARD.

// --- Line 8724 ---
11. Se o usu�rio pedir para duplicar um cart�o, use DUPLICATE_CARD.

// --- Line 8725 ---
12. Se o usu�rio pedir para mover um cart�o para outra lista, quadrante, hor�rio ou outro quadro, use MOVE_CARD.

// --- Line 8726 ---
13. Se o usu�rio pedir para mover uma lista inteira para outro quadro, use MOVE_LIST.

// --- Line 8727 ---
14. Se o usu�rio pedir para mudar o tema, a cor ou o fundo do quadro para uma cor espec�fica, use CHANGE_THEME.

// --- Line 8728 ---
15. Se o usu�rio pedir para iniciar o timer/cron�metro de um cart�o, use START_TIMER.

// --- Line 8729 ---
16. Se o usu�rio pedir para pausar o timer/cron�metro de um cart�o, use PAUSE_TIMER.

// --- Line 8730 ---
17. Se o usu�rio pedir para abrir/fechar/esconder/mostrar a matriz, agenda, semana/vis�o semanal ou o 
       quadro/kanban, use TOGGLE_PANEL.

// --- Line 8731 ---
`;

// --- Line 8732 ---


// --- Line 8733 ---
const contents = [

// --- Line 8734 ---
{ role: 'user', parts: [{ text: sysPrompt + "\n\nAgora processe o seguinte di�logo com o 
       usu�rio:\n" }] }

// --- Line 8735 ---
];

// --- Line 8736 ---


// --- Line 8737 ---
aiConversationHistory.forEach(turn => {

// --- Line 8738 ---
contents.push(turn);

// --- Line 8739 ---
});

// --- Line 8740 ---


// --- Line 8741 ---
try {

// --- Line 8742 ---
const responseText = await callGemini(contents);

// --- Line 8743 ---


// --- Line 8744 ---
let responseJson;

// --- Line 8745 ---
try {

// --- Line 8746 ---
let cleanedText = responseText.trim();

// --- Line 8747 ---
if (cleanedText.startsWith('```')) {

// --- Line 8748 ---
cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```$/, '').trim();

// --- Line 8749 ---
}

// --- Line 8750 ---
responseJson = JSON.parse(cleanedText);

// --- Line 8751 ---
} catch (parseErr) {

// --- Line 8752 ---
console.error("Gemini did not return valid JSON. Raw response: ", responseText);

// --- Line 8753 ---
showAiResponseBubble("Desculpe, n�o consegui entender o comando estruturado. Por favor 
       tente reescrever.", false, true);

// --- Line 8754 ---
aiConversationHistory.pop();

// --- Line 8755 ---
return;

// --- Line 8756 ---
}

// --- Line 8757 ---


// --- Line 8758 ---
aiConversationHistory.push({ role: 'model', parts: [{ text: JSON.stringify(responseJson) }] 
       });

// --- Line 8759 ---


// --- Line 8760 ---
if (responseJson.question) {

// --- Line 8761 ---
showAiResponseBubble(responseJson.question, true, false);

// --- Line 8762 ---
} else {

// --- Line 8763 ---
if (responseJson.actions && responseJson.actions.length > 0) {

// --- Line 8764 ---
executeAiActions(responseJson.actions);

// --- Line 8765 ---
}

// --- Line 8766 ---
showAiResponseBubble(responseJson.explanation || 'Comando executado com sucesso!', 
       false, false);

// --- Line 8767 ---
aiConversationHistory = [];

// --- Line 8768 ---
}

// --- Line 8769 ---
} catch (apiErr) {

// --- Line 8770 ---
console.error("Gemini API call failed: ", apiErr);

// --- Line 8771 ---
const errorMsg = apiErr.message || "Erro desconhecido. Verifique sua chave API e conex�o.";

// --- Line 8772 ---
showAiResponseBubble(`Erro da API: ${errorMsg}`, false, true);

// --- Line 8773 ---
aiConversationHistory.pop();

// --- Line 8774 ---
}

// --- Line 8775 ---
}

// --- Line 8776 ---


// --- Line 8777 ---
function executeAiActions(actions) {

// --- Line 8778 ---
actions.forEach(action => {

// --- Line 8779 ---
try {

// --- Line 8780 ---
switch (action.type) {

// --- Line 8781 ---
case 'SWITCH_BOARD':

// --- Line 8782 ---
if (action.boardName) {

// --- Line 8783 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

// --- Line 8784 ---
if (board) {

// --- Line 8785 ---
switchBoard(board.id);

// --- Line 8786 ---
}

// --- Line 8787 ---
}

// --- Line 8788 ---
break;

// --- Line 8789 ---


// --- Line 8790 ---
case 'CREATE_LIST':

// --- Line 8791 ---
{

// --- Line 8792 ---
let boardId = currentBoardId;

// --- Line 8793 ---
if (action.boardName) {

// --- Line 8794 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

// --- Line 8795 ---
if (board) {

// --- Line 8796 ---
boardId = board.id;

// --- Line 8797 ---
if (boardId !== currentBoardId) {

// --- Line 8798 ---
switchBoard(boardId);

// --- Line 8799 ---
}

// --- Line 8800 ---
}

// --- Line 8801 ---
}

// --- Line 8802 ---
let listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());

// --- Line 8803 ---
if (!listEl) {

// --- Line 8804 ---
createList(action.listTitle);

// --- Line 8805 ---
persist();

// --- Line 8806 ---
}

// --- Line 8807 ---
}

// --- Line 8808 ---
break;

// --- Line 8809 ---


// --- Line 8810 ---
case 'CREATE_CARDS':

// --- Line 8811 ---
{

// --- Line 8812 ---
let boardId = currentBoardId;

// --- Line 8813 ---
if (action.boardName) {

// --- Line 8814 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

// --- Line 8815 ---
if (board) {

// --- Line 8816 ---
boardId = board.id;

// --- Line 8817 ---
if (boardId !== currentBoardId) {

// --- Line 8818 ---
switchBoard(boardId);

// --- Line 8819 ---
}

// --- Line 8820 ---
}

// --- Line 8821 ---
}

// --- Line 8822 ---


// --- Line 8823 ---
let container = null;

// --- Line 8824 ---
let whenVal = "";

// --- Line 8825 ---


// --- Line 8826 ---
if (action.time) {

// --- Line 8827 ---
whenVal = getActiveDay() + 'T' + action.time;

// --- Line 8828 ---
const slot = 
       slotsRoot.querySelector(`.list.slot[data-time="${action.time}"]`);

// --- Line 8829 ---
if (slot) container = slot.querySelector('.cards');

// --- Line 8830 ---
} else if (action.goal) {

// --- Line 8831 ---
whenVal = getActiveDay() + 'TGOAL';

// --- Line 8832 ---
const goalSlot = slotsRoot.querySelector('.list.goal-slot');

// --- Line 8833 ---
if (goalSlot) container = goalSlot.querySelector('.cards');

// --- Line 8834 ---
} else if (action.quadrant) {

// --- Line 8835 ---
const quadList = 
       matrixEl.querySelector(`.list[data-quad="${action.quadrant}"]`);

// --- Line 8836 ---
if (quadList) container = quadList.querySelector('.cards');

// --- Line 8837 ---
} else {

// --- Line 8838 ---
let listTitle = action.listTitle || "Para Fazer";

// --- Line 8839 ---
let listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === listTitle.toLowerCase().trim());

// --- Line 8840 ---
if (!listEl) {

// --- Line 8841 ---
listEl = createList(listTitle);

// --- Line 8842 ---
}

// --- Line 8843 ---
container = listEl.querySelector('.cards');

// --- Line 8844 ---
}

// --- Line 8845 ---


// --- Line 8846 ---
if (container && action.cards) {

// --- Line 8847 ---
action.cards.forEach(cData => {

// --- Line 8848 ---
const cardData = {

// --- Line 8849 ---
text: cData.text,

// --- Line 8850 ---
color: cData.color || (action.quadrant ? 
       MATRIX_COLORS[action.quadrant] : ""),

// --- Line 8851 ---
due: cData.due || "",

// --- Line 8852 ---
when: whenVal,

// --- Line 8853 ---
timerTotal: cData.timerTotal ? String(cData.timerTotal) : ""

// --- Line 8854 ---
};

// --- Line 8855 ---
const newCard = createCard(cardData);

// --- Line 8856 ---
container.appendChild(newCard);

// --- Line 8857 ---
});

// --- Line 8858 ---
persist();

// --- Line 8859 ---
updateSlotsHasItems();

// --- Line 8860 ---
updateTotalTimerDisplay();

// --- Line 8861 ---
}

// --- Line 8862 ---
}

// --- Line 8863 ---
break;

// --- Line 8864 ---


// --- Line 8865 ---
case 'COMPLETE_CARDS':

// --- Line 8866 ---
{

// --- Line 8867 ---
let targetCards = [];

// --- Line 8868 ---
if (action.timeRange) {

// --- Line 8869 ---
allCards.forEach(c => {

// --- Line 8870 ---
if (c.dataset.when && /T\d{2}:\d{2}$/.test(c.dataset.when)) {

// --- Line 8871 ---
const timeStr = c.dataset.when.split('T')[1];

// --- Line 8872 ---
const hour = parseInt(timeStr.split(':')[0], 10);

// --- Line 8873 ---
let match = false;

// --- Line 8874 ---
if (action.timeRange === 'morning' && hour >= 6 && hour < 12) 
       match = true;

// --- Line 8875 ---
else if (action.timeRange === 'afternoon' && hour >= 12 && hour 
       < 18) match = true;

// --- Line 8876 ---
else if ((action.timeRange === 'evening' || action.timeRange 
       === 'night') && hour >= 18 && hour <= 23) match = true;

// --- Line 8877 ---
else if (action.timeRange === 'all') match = true;

// --- Line 8878 ---


// --- Line 8879 ---
if (match && c.dataset.completed !== 'true') {

// --- Line 8880 ---
targetCards.push(c);

// --- Line 8881 ---
}

// --- Line 8882 ---
}

// --- Line 8883 ---
});

// --- Line 8884 ---
} else if (action.time) {

// --- Line 8885 ---
const whenVal = getActiveDay() + 'T' + action.time;

// --- Line 8886 ---
allCards.forEach(c => {

// --- Line 8887 ---
if (c.dataset.when === whenVal && c.dataset.completed !== 'true') {

// --- Line 8888 ---
targetCards.push(c);

// --- Line 8889 ---
}

// --- Line 8890 ---
});

// --- Line 8891 ---
} else if (action.quadrant) {

// --- Line 8892 ---
const quadList = 
       matrixEl.querySelector(`.list[data-quad="${action.quadrant}"]`);

// --- Line 8893 ---
if (quadList) {

// --- Line 8894 ---
$$( '.card', quadList).forEach(c => {

// --- Line 8895 ---
const cardInCache = allCards.find(cacheCard => cacheCard === c);

// --- Line 8896 ---
if (cardInCache && cardInCache.dataset.completed !== 'true') {

// --- Line 8897 ---
targetCards.push(cardInCache);

// --- Line 8898 ---
}

// --- Line 8899 ---
});

// --- Line 8900 ---
}

// --- Line 8901 ---
} else if (action.listTitle) {

// --- Line 8902 ---
const listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());

// --- Line 8903 ---
if (listEl) {

// --- Line 8904 ---
$$( '.card', listEl).forEach(c => {

// --- Line 8905 ---
const cardInCache = allCards.find(cacheCard => cacheCard === c);

// --- Line 8906 ---
if (cardInCache && cardInCache.dataset.completed !== 'true') {

// --- Line 8907 ---
targetCards.push(cardInCache);

// --- Line 8908 ---
}

// --- Line 8909 ---
});

// --- Line 8910 ---
}

// --- Line 8911 ---
} else if (action.all) {

// --- Line 8912 ---
allCards.forEach(c => {

// --- Line 8913 ---
if (c.dataset.completed !== 'true') {

// --- Line 8914 ---
targetCards.push(c);

// --- Line 8915 ---
}

// --- Line 8916 ---
});

// --- Line 8917 ---
}

// --- Line 8918 ---


// --- Line 8919 ---
if (targetCards.length > 0) {

// --- Line 8920 ---
targetCards.forEach(card => {

// --- Line 8921 ---
card.dataset.completed = 'true';

// --- Line 8922 ---
card.classList.remove('timer-finished');

// --- Line 8923 ---
if (card.dataset.timerState === 'finished') {

// --- Line 8924 ---
card.dataset.timerState = 'stopped';

// --- Line 8925 ---
}

// --- Line 8926 ---
updateTimerDisplay(card);

// --- Line 8927 ---
});

// --- Line 8928 ---
persist();

// --- Line 8929 ---
updateSlotsHasItems();

// --- Line 8930 ---
}

// --- Line 8931 ---
}

// --- Line 8932 ---
break;

// --- Line 8933 ---


// --- Line 8934 ---
case 'COPY_PASTE_AGENDA':

// --- Line 8935 ---
if (action.fromDay && action.toDay) {

// --- Line 8936 ---
copyAgendaFromTo(action.fromDay, action.toDay);

// --- Line 8937 ---
}

// --- Line 8938 ---
break;

// --- Line 8939 ---


// --- Line 8940 ---
case 'DELETE_LIST':

// --- Line 8941 ---
if (action.listTitle) {

// --- Line 8942 ---
const listEl = Array.from(document.querySelectorAll('.list')).find(l => {

// --- Line 8943 ---
const titleInput = l.querySelector('.title');

// --- Line 8944 ---
return titleInput && titleInput.value.toLowerCase().trim() === 
       action.listTitle.toLowerCase().trim();

// --- Line 8945 ---
});

// --- Line 8946 ---
if (listEl) {

// --- Line 8947 ---
listEl.remove();

// --- Line 8948 ---
persist();

// --- Line 8949 ---
}

// --- Line 8950 ---
}

// --- Line 8951 ---
break;

// --- Line 8952 ---


// --- Line 8953 ---
case 'DELETE_CARD':

// --- Line 8954 ---
if (action.cardText) {

// --- Line 8955 ---
const targetCard = allCards.find(c => {

// --- Line 8956 ---
const textEl = c.querySelector('.text');

// --- Line 8957 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 8958 ---
});

// --- Line 8959 ---
if (targetCard) {

// --- Line 8960 ---
removeCard(targetCard);

// --- Line 8961 ---
}

// --- Line 8962 ---
}

// --- Line 8963 ---
break;

// --- Line 8964 ---


// --- Line 8965 ---
case 'DUPLICATE_CARD':

// --- Line 8966 ---
if (action.cardText) {

// --- Line 8967 ---
const targetCard = allCards.find(c => {

// --- Line 8968 ---
const textEl = c.querySelector('.text');

// --- Line 8969 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 8970 ---
});

// --- Line 8971 ---
if (targetCard) {

// --- Line 8972 ---
duplicateCards([targetCard]);

// --- Line 8973 ---
}

// --- Line 8974 ---
}

// --- Line 8975 ---
break;

// --- Line 8976 ---


// --- Line 8977 ---
case 'MOVE_CARD':

// --- Line 8978 ---
if (action.cardText) {

// --- Line 8979 ---
const targetCard = allCards.find(c => {

// --- Line 8980 ---
const textEl = c.querySelector('.text');

// --- Line 8981 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 8982 ---
});

// --- Line 8983 ---
if (targetCard) {

// --- Line 8984 ---
if (action.targetBoardName) {

// --- Line 8985 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.targetBoardName.toLowerCase().trim());

// --- Line 8986 ---
if (board) {

// --- Line 8987 ---
moveCardToBoard(targetCard, board.id, action.targetListTitle || 
       'Inbox');

// --- Line 8988 ---
}

// --- Line 8989 ---
} else if (action.targetListTitle) {

// --- Line 8990 ---
const qUpper = action.targetListTitle.toUpperCase().trim();

// --- Line 8991 ---
if (['Q1', 'Q2', 'Q3', 'Q4'].includes(qUpper)) {

// --- Line 8992 ---
const quadList = 
       matrixEl.querySelector(`.list[data-quad="${qUpper}"]`);

// --- Line 8993 ---
if (quadList) {

// --- Line 8994 ---
quadList.querySelector('.cards').appendChild(targetCard);

// --- Line 8995 ---
targetCard.dataset.when = '';

// --- Line 8996 ---
targetCard.dataset.color = MATRIX_COLORS[qUpper];

// --- Line 8997 ---
paintCard(targetCard);

// --- Line 8998 ---
persist();

// --- Line 8999 ---
updateSlotsHasItems();

// --- Line 9000 ---
}

// --- Line 9001 ---
} else if (/^\d{2}:\d{2}$/.test(action.targetListTitle.trim())) {

// --- Line 9002 ---
const timeVal = action.targetListTitle.trim();

// --- Line 9003 ---
const slot = 
       slotsRoot.querySelector(`.list.slot[data-time="${timeVal}"]`);

// --- Line 9004 ---
if (slot) {

// --- Line 9005 ---
slot.querySelector('.cards').appendChild(targetCard);

// --- Line 9006 ---
targetCard.dataset.when = getActiveDay() + 'T' + timeVal;

// --- Line 9007 ---
paintCard(targetCard);

// --- Line 9008 ---
persist();

// --- Line 9009 ---
updateSlotsHasItems();

// --- Line 9010 ---
}

// --- Line 9011 ---
} else {

// --- Line 9012 ---
const listEl = $$('.list[data-type="kanban"]', boardEl).find(l 
       => {

// --- Line 9013 ---
const titleInput = l.querySelector('.title');

// --- Line 9014 ---
return titleInput && titleInput.value.toLowerCase().trim() 
       === action.targetListTitle.toLowerCase().trim();

// --- Line 9015 ---
});

// --- Line 9016 ---
if (listEl) {

// --- Line 9017 ---
listEl.querySelector('.cards').appendChild(targetCard);

// --- Line 9018 ---
targetCard.dataset.when = '';

// --- Line 9019 ---
paintCard(targetCard);

// --- Line 9020 ---
persist();

// --- Line 9021 ---
updateSlotsHasItems();

// --- Line 9022 ---
}

// --- Line 9023 ---
}

// --- Line 9024 ---
}

// --- Line 9025 ---
}

// --- Line 9026 ---
}

// --- Line 9027 ---
break;

// --- Line 9028 ---


// --- Line 9029 ---
case 'MOVE_LIST':

// --- Line 9030 ---
if (action.listTitle && action.targetBoardName) {

// --- Line 9031 ---
const listEl = Array.from(document.querySelectorAll('.list')).find(l => {

// --- Line 9032 ---
const titleInput = l.querySelector('.title');

// --- Line 9033 ---
return titleInput && titleInput.value.toLowerCase().trim() === 
       action.listTitle.toLowerCase().trim();

// --- Line 9034 ---
});

// --- Line 9035 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.targetBoardName.toLowerCase().trim());

// --- Line 9036 ---
if (listEl && board) {

// --- Line 9037 ---
moveListToBoard(listEl, board.id);

// --- Line 9038 ---
}

// --- Line 9039 ---
}

// --- Line 9040 ---
break;

// --- Line 9041 ---


// --- Line 9042 ---
case 'CHANGE_THEME':

// --- Line 9043 ---
if (action.color) {

// --- Line 9044 ---
const board = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 9045 ---
if (board) {

// --- Line 9046 ---
let selectedColor = null;

// --- Line 9047 ---
const inputColor = action.color.toLowerCase().trim();

// --- Line 9048 ---
if (THEMES[inputColor]) {

// --- Line 9049 ---
selectedColor = inputColor;

// --- Line 9050 ---
} else {

// --- Line 9051 ---
const foundTheme = Object.values(THEMES).find(t => 
       t.name.toLowerCase().includes(inputColor) || inputColor.includes(t.name.toLowerCase()));

// --- Line 9052 ---
if (foundTheme) {

// --- Line 9053 ---
selectedColor = foundTheme.brand;

// --- Line 9054 ---
} else {

// --- Line 9055 ---
const colorMap = {

// --- Line 9056 ---
'azul': '#1976d2',

// --- Line 9057 ---
'verde': '#2e7d32',

// --- Line 9058 ---
'roxo': '#7b1fa2',

// --- Line 9059 ---
'laranja': '#e65100',

// --- Line 9060 ---
'vermelho': '#c62828',

// --- Line 9061 ---
'cinza': '#37474f',

// --- Line 9062 ---
'ciano': '#00838f',

// --- Line 9063 ---
'rosa': '#ad1457',

// --- Line 9064 ---
'marrom': '#8d6e63',

// --- Line 9065 ---
'indigo': '#3f51b5',

// --- Line 9066 ---
'amarelo': '#ffb300',

// --- Line 9067 ---
'esmeralda': '#00c853',

// --- Line 9068 ---
'cyberpunk': '#ff007f',

// --- Line 9069 ---
'menta': '#00e676',

// --- Line 9070 ---
'oceano': '#00b0ff',

// --- Line 9071 ---
'rose': '#ec407a',

// --- Line 9072 ---
'grafite': '#607d8b'

// --- Line 9073 ---
};

// --- Line 9074 ---
for (const [key, val] of Object.entries(colorMap)) {

// --- Line 9075 ---
if (inputColor.includes(key)) {

// --- Line 9076 ---
selectedColor = val;

// --- Line 9077 ---
break;

// --- Line 9078 ---
}

// --- Line 9079 ---
}

// --- Line 9080 ---
}

// --- Line 9081 ---
}

// --- Line 9082 ---
if (selectedColor) {

// --- Line 9083 ---
board.color = selectedColor;

// --- Line 9084 ---
setBoardTheme(selectedColor);

// --- Line 9085 ---
saveBoardsMetadata();

// --- Line 9086 ---
}

// --- Line 9087 ---
}

// --- Line 9088 ---
}

// --- Line 9089 ---
break;

// --- Line 9090 ---


// --- Line 9091 ---
case 'START_TIMER':

// --- Line 9092 ---
if (action.cardText) {

// --- Line 9093 ---
const targetCard = allCards.find(c => {

// --- Line 9094 ---
const textEl = c.querySelector('.text');

// --- Line 9095 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 9096 ---
});

// --- Line 9097 ---
if (targetCard) {

// --- Line 9098 ---
var state = targetCard.dataset.timerState || 'stopped';

// --- Line 9099 ---
var total = parseInt(targetCard.dataset.timerTotal || '0', 10);

// --- Line 9100 ---
if (total === 0) {

// --- Line 9101 ---
total = 25 * 60;

// --- Line 9102 ---
targetCard.dataset.timerTotal = total;

// --- Line 9103 ---
targetCard.dataset.timerLeft = total;

// --- Line 9104 ---
}

// --- Line 9105 ---
targetCard.dataset.timerState = 'running';

// --- Line 9106 ---
var left = parseInt(targetCard.dataset.timerLeft, 10);

// --- Line 9107 ---
if (state === 'finished' || left <= 0) left = total;

// --- Line 9108 ---
targetCard.dataset.timerEnd = Date.now() + left * 1000;

// --- Line 9109 ---
targetCard.style.animation = '';

// --- Line 9110 ---
startGlobalTimer();

// --- Line 9111 ---
updateTimerDisplay(targetCard);

// --- Line 9112 ---
persist();

// --- Line 9113 ---
}

// --- Line 9114 ---
}

// --- Line 9115 ---
break;

// --- Line 9116 ---


// --- Line 9117 ---
case 'PAUSE_TIMER':

// --- Line 9118 ---
if (action.cardText) {

// --- Line 9119 ---
const targetCard = allCards.find(c => {

// --- Line 9120 ---
const textEl = c.querySelector('.text');

// --- Line 9121 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 9122 ---
});

// --- Line 9123 ---
if (targetCard) {

// --- Line 9124 ---
var state = targetCard.dataset.timerState || 'stopped';

// --- Line 9125 ---
if (state === 'running') {

// --- Line 9126 ---
targetCard.dataset.timerState = 'paused';

// --- Line 9127 ---
var now = Date.now();

// --- Line 9128 ---
var end = parseInt(targetCard.dataset.timerEnd, 10);

// --- Line 9129 ---
targetCard.dataset.timerLeft = Math.round((end - now) / 1000);

// --- Line 9130 ---
updateTimerDisplay(targetCard);

// --- Line 9131 ---
persist();

// --- Line 9132 ---
}

// --- Line 9133 ---
}

// --- Line 9134 ---
}

// --- Line 9135 ---
break;

// --- Line 9136 ---


// --- Line 9137 ---
case 'TOGGLE_PANEL':

// --- Line 9138 ---
if (action.panel) {

// --- Line 9139 ---
const panelLower = action.panel.toLowerCase().trim();

// --- Line 9140 ---
if (panelLower === 'kanban' || panelLower === 'quadro') {

// --- Line 9141 ---
document.getElementById('toggleBoardBtn').click();

// --- Line 9142 ---
} else if (panelLower === 'matrix' || panelLower === 'matriz') {

// --- Line 9143 ---
document.getElementById('toggleMatrixBtn').click();

// --- Line 9144 ---
} else if (panelLower === 'agenda') {

// --- Line 9145 ---
document.getElementById('toggleAgendaBtn').click();

// --- Line 9146 ---
} else if (panelLower === 'weekly' || panelLower === 'semana' || panelLower 
       === 'semanal') {

// --- Line 9147 ---
document.getElementById('toggleWeeklyBtn').click();

// --- Line 9148 ---
}

// --- Line 9149 ---
}

// --- Line 9150 ---
break;

// --- Line 9151 ---
}

// --- Line 9152 ---
} catch (err) {

// --- Line 9153 ---
console.error("Erro executando a��o da IA:", action, err);

// --- Line 9154 ---
}

// --- Line 9155 ---
});

// --- Line 9156 ---
}

// --- Line 9157 ---


// --- Line 9158 ---
function copyAgendaFromTo(fromDay, toDay) {

// --- Line 9159 ---
if (fromDay === toDay) return;

// --- Line 9160 ---
const cardsToCopy = allCards.filter(c => (c.dataset.when || '').startsWith(fromDay + 
       'T')).map(c => ({

// --- Line 9161 ---
...cardToData(c),

// --- Line 9162 ---
timeOrGoal: (c.dataset.when || '').substring(11)

// --- Line 9163 ---
}));

// --- Line 9164 ---
cardsToCopy.forEach(cardData => {

// --- Line 9165 ---
const newData = { ...cardData };

// --- Line 9166 ---
newData.when = toDay + 'T' + newData.timeOrGoal;

// --- Line 9167 ---
const existsInCache = allCards.some(c => c.dataset.when === newData.when && 
       c.querySelector('.text').textContent.trim() === newData.text.trim());

// --- Line 9168 ---
if (!existsInCache) {

// --- Line 9169 ---
createCard(newData);

// --- Line 9170 ---
}

// --- Line 9171 ---
});

// --- Line 9172 ---
updateSlotsHasItems();

// --- Line 9173 ---
persist();

// --- Line 9174 ---
}

// --- Line 9175 ---


// --- Line 9176 ---
function initAiControls() {

// --- Line 9177 ---
const sendBtn = document.getElementById('aiSendBtn');

// --- Line 9178 ---
if (sendBtn) sendBtn.addEventListener('click', submitAiCommand);

// --- Line 9179 ---


// --- Line 9180 ---
const inputEl = document.getElementById('aiInput');

// --- Line 9181 ---
if (inputEl) {

// --- Line 9182 ---
inputEl.addEventListener('keydown', function(e) {

// --- Line 9183 ---
if (e.key === 'Enter') {

// --- Line 9184 ---
e.preventDefault();

// --- Line 9185 ---
submitAiCommand();

// --- Line 9186 ---
}

// --- Line 9187 ---
});

// --- Line 9188 ---
}

// --- Line 9189 ---


// --- Line 9190 ---
const configBtn = document.getElementById('aiConfigBtn');

// --- Line 9191 ---
if (configBtn) configBtn.addEventListener('click', configureApiKeyDialog);

// --- Line 9192 ---


// --- Line 9193 ---
const micBtn = document.getElementById('aiMicBtn');

// --- Line 9194 ---
if (micBtn) micBtn.addEventListener('click', toggleVoiceRecord);

// --- Line 9195 ---


// --- Line 9196 ---
initSpeechRecognition();

// --- Line 9197 ---
}

// --- Line 9198 ---


// --- Line 9199 ---
function initApp() {

// --- Line 9200 ---
// Auto-generated backup fallback



