# CDM Labs — Push rapido a GitHub
# Uso: .\push.ps1 "descripcion del cambio"
# Si no se pasa descripcion, usa mensaje automatico

param([string]$msg = "")

$repoPath = "C:\Users\me-la\OneDrive\Escritorio\CRISTHIAN DE MOYA LAB"
Set-Location $repoPath

$status = git status --short 2>&1
if (-not $status) {
    Write-Host "✓ Sin cambios que subir." -ForegroundColor Green
    exit 0
}

Write-Host "Archivos modificados:" -ForegroundColor Cyan
$status | ForEach-Object { Write-Host "  $_" }

if (-not $msg) {
    $date = Get-Date -Format "yyyy-MM-dd HH:mm"
    $msg = "update: cambios CDM Labs $date"
}

git add -A 2>&1 | Out-Null
git commit -m $msg 2>&1
git push origin master 2>&1

Write-Host ""
Write-Host "✓ Subido a GitHub: https://github.com/demoyacristhian-sketch/CDM-Labs" -ForegroundColor Green
