const fs = require('fs');

const logPath = 'c:/Users/Guilherme/Dropbox/- TEA PLANNER 2.0/scratch/extracted_edits.txt';
const content = fs.readFileSync(logPath, 'utf8');

// Find the section that replaces the openAgendaDialog function
// We look for a line starting with "ReplacementContent" and containing "function openAgendaDialog"
const lines = content.split('\n');
let found = false;
let block = [];
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('ReplacementContent : "            function openAgendaDialog(card)')) {
        console.log(`Found matching ReplacementContent at line ${i + 1}`);
        found = true;
        // Start collecting
        let text = line.substring(line.indexOf('ReplacementContent : "') + 'ReplacementContent : "'.length);
        block.push(text);
        // We continue collecting until the next property starts (e.g. "StepIndex", "TargetContent", etc.)
        for (let j = i + 1; j < lines.length; j++) {
            const nextLine = lines[j];
            if (nextLine.startsWith('StepIndex') || nextLine.startsWith('Type') || nextLine.startsWith('StartLine') || nextLine.startsWith('TargetContent')) {
                break;
            }
            block.push(nextLine);
        }
        break;
    }
}

if (found) {
    let rawStr = block.join('\n');
    // The string ends with a quote, let's trim it
    rawStr = rawStr.trim();
    if (rawStr.endsWith('"')) {
        rawStr = rawStr.substring(0, rawStr.length - 1);
    }
    
    // Unescape JSON string
    // A quick way is to wrap it in quotes and parse it
    try {
        // Fix any unescaped double quotes inside
        // Since it's a JSON value from a log, let's wrap it in an object and parse
        const parsedObj = JSON.parse('{"code": "' + rawStr.replace(/"/g, '\\"').replace(/\\"/g, '"') + '"}');
        fs.writeFileSync('scratch/extracted_agenda_code.txt', parsedObj.code, 'utf8');
        console.log("Successfully extracted code to scratch/extracted_agenda_code.txt");
    } catch (e) {
        console.warn("Could not parse as strict JSON, writing raw text representation instead:", e);
        // Fallback: manually replace escaped characters
        let clean = rawStr
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'")
            .replace(/\\\\/g, '\\')
            .replace(/\\t/g, '\t');
        fs.writeFileSync('scratch/extracted_agenda_code.txt', clean, 'utf8');
        console.log("Successfully wrote raw unescaped code to scratch/extracted_agenda_code.txt");
    }
} else {
    console.error("Could not find openAgendaDialog block in logs.");
}
