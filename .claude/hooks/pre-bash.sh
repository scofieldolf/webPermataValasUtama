#!/bin/bash
# PreToolUse hook — safety guard sebelum Claude menjalankan command bash

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# Blokir command berbahaya
DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "curl.*|.*bash"
  "wget.*|.*bash"
  "> .env$"
  "> .env.local"
  "> .env.production"
  "DROP TABLE"
  "DROP DATABASE"
)

for PATTERN in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$PATTERN"; then
    echo "{\"decision\": \"block\", \"message\": \"Command diblokir oleh safety hook: '$PATTERN' terdeteksi. Konfirmasi manual jika memang diperlukan.\"}"
    exit 2  # exit 2 = blokir action
  fi
done

# Warn jika menulis ke file .env
if echo "$COMMAND" | grep -qE "\.env"; then
  echo "PERINGATAN: Command menyentuh file .env — pastikan ini bukan credential yang akan di-commit" >&2
fi

exit 0  # Allow
