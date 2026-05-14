#!/bin/bash
# Auto-push to GitHub after any Claude Code session that touches files
# Called via post-session hook in settings.json

cd "C:\Users\me-la\OneDrive\Escritorio\CRISTHIAN DE MOYA LAB" 2>/dev/null || exit 0

# Check if there are changes
if git diff --quiet && git diff --staged --quiet; then
  exit 0
fi

# Stage and push
git add -A
git commit -m "auto: sync changes from Claude Code session $(date +%Y-%m-%d)"
git push origin master
