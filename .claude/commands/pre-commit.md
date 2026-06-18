# Pre-commit validation

Jalankan semua checks wajib sebelum git commit. Jangan commit jika ada yang gagal.

```bash
# 1. TypeScript strict check
echo "=== TypeScript Check ===" && pnpm type-check

# 2. ESLint
echo "=== ESLint ===" && pnpm lint

# 3. Unit tests
echo "=== Unit Tests ===" && pnpm test --passWithNoTests

# 4. Build check (dry run)
echo "=== Build Check ===" && pnpm build

# 5. Cek tidak ada console.log tersisa
echo "=== Console.log Check ===" && grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" && echo "WARNING: console.log ditemukan!" || echo "OK: Tidak ada console.log"

# 6. Cek tidak ada hardcoded nomor telepon/email
echo "=== Hardcoded Contact Check ===" && grep -r "628[0-9]\{8,\}\|@gmail\|@yahoo" src/ --include="*.tsx" --include="*.ts" && echo "WARNING: Contact hardcoded!" || echo "OK"

# 7. Cek env variables yang hilang
echo "=== Env Check ===" && node -e "
const required = ['NEXT_PUBLIC_EXCHANGE_RATE_API_KEY','NEXT_PUBLIC_GOOGLE_MAPS_API_KEY','RESEND_API_KEY'];
const missing = required.filter(k => !process.env[k]);
if (missing.length) { console.error('Missing ENV:', missing); process.exit(1); }
console.log('OK: Semua env tersedia');
"
```

Jika semua pass: `git add -A && git commit -m "[tipe]: [deskripsi singkat]"`

Format commit: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`
