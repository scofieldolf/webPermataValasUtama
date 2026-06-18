#!/bin/bash
# PostToolUse hook — jalan otomatis setelah Claude menulis file

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // ""')

# Hanya proses file TypeScript/TSX
if [[ "$FILE_PATH" =~ \.(ts|tsx)$ ]]; then
  # Jalankan ESLint pada file yang baru ditulis
  if command -v pnpm &> /dev/null; then
    pnpm eslint "$FILE_PATH" --fix --quiet 2>/dev/null
    EXIT_CODE=$?
    if [ $EXIT_CODE -ne 0 ]; then
      echo "{\"decision\": \"warn\", \"message\": \"ESLint menemukan issue di $FILE_PATH — jalankan 'pnpm lint' untuk detail\"}" >&2
    fi
  fi
fi

# Selalu return sukses (jangan blokir workflow Claude)
exit 0
