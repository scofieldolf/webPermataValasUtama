# Verifikasi integrasi data kurs

Jalankan pengecekan lengkap pipeline data kurs valuta asing.

Langkah:

1. **Type check** semua file kurs:
```bash
pnpm tsc --noEmit --project tsconfig.json 2>&1 | grep -E "kurs|types"
```

2. **Test** unit kurs transformation:
```bash
pnpm test src/lib/kurs.test.ts --verbose
```

3. **Cek** endpoint API:
```bash
curl -s http://localhost:3000/api/kurs | jq '.data | length'
```

4. **Verifikasi** format output — pastikan semua field ada:
   - `kode`, `nama`, `simbol`, `beli`, `jual`, `tengah`, `perubahan`, `updatedAt`

5. **Cek** revalidate config:
```bash
grep -r "revalidate" src/app/api/kurs/
```

6. **Report** hasil: berapa mata uang aktif, timestamp terakhir update, ada error tidak

Jika ada masalah, lihat fallback chain di `.claude/agents/kurs-integration.md`.
