$path = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# replacements map for double-encoded or corrupted latin-1 bytes
$replacements = @{
    "cartÃµes" = "cartões"
    "cartes" = "cartões"
    "cartão(s)" = "cartão(s)"
    "carto" = "cartão"
    "cartÃ£o" = "cartão"
    "nÃ£o" = "não"
    "no" = "não"
    "alteraÃ§Ãµes" = "alterações"
    "alteraes" = "alterações"
    "confirmaÃ§Ã£o" = "confirmação"
    "confirmao" = "confirmação"
    "gravaÃ§Ã£o" = "gravação"
    "gravao" = "gravação"
    "lgica" = "lógica"
    "lógica" = "lógica"
    "aps" = "após"
    "conexo" = "conexão"
    "conexão" = "conexão"
    "Seleo" = "Seleção"
    "gesto" = "gestão"
    "proporao" = "proporção"
    "proporção" = "proporção"
    "resoluo" = "resolução"
    "api estruturado. Por favor tente reescrever." = "api estruturado. Por favor tente reescrever."
    "ambguo" = "ambíguo"
    "mltiplos" = "múltiplos"
    "usurio" = "usuário"
    "faa" = "faça"
    "ao" = "ação"
    "aes" = "ações"
    "horrio" = "horário"
    "manh" = "manhã"
    "perodo" = "período"
    "api " = "api é"
    "api no" = "api não"
}

foreach ($key in $replacements.Keys) {
    $val = $replacements[$key]
    $content = $content.Replace($key, $val)
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "SUCCESS: Cleaned up corrupted encoding strings in index.html!"
