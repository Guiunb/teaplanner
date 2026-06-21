# Script para encontrar instalação do Git via Registro do Windows
$keys = @(
    "HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*",
    "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*",
    "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*"
)

foreach ($key in $keys) {
    Get-ItemProperty $key -ErrorAction SilentlyContinue | Where-Object { 
        $_.DisplayName -like "*Git*" -or $_.DisplayName -like "*GitHub*" 
    } | Select-Object DisplayName, InstallLocation, UninstallString | Format-Table -AutoSize
}
