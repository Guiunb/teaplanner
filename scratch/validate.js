const fs = require('fs');
const vm = require('vm');

try {
    const html = fs.readFileSync('index.html', 'utf8');
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let index = 1;
    let hasScripts = false;
    while ((match = scriptRegex.exec(html)) !== null) {
        const js = match[1];
        if (js.trim().length > 0) {
            hasScripts = true;
            console.log(`Compiling Script Tag #${index}...`);
            try {
                new vm.Script(js);
                console.log(`Script Tag #${index} compiled successfully!`);
            } catch (err) {
                console.error(`Error in Script Tag #${index}:`);
                console.error(err.stack || err);
                process.exit(1);
            }
        }
        index++;
    }
    if (!hasScripts) {
        console.warn("No scripts found to validate!");
    } else {
        console.log("SUCCESS: All scripts compiled successfully!");
    }
} catch (err) {
    console.error("FAILED to read or parse file:");
    console.error(err);
    process.exit(1);
}
