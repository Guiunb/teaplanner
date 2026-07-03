def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(r"\'function\'", "'function'")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('src/js/ai.js')
fix_file('src/js/agenda.js')
