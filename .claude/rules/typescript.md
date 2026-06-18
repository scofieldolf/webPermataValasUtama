---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# TypeScript Rules — Permata Valas Website

## Strict Mode

- Tidak ada `any`. Jika terpaksa, gunakan `unknown` dan type-guard
- Tidak ada non-null assertion (`!`) kecuali ada komentar alasan yang jelas
- Semua fungsi harus punya return type eksplisit
- Gunakan `readonly` untuk array dan object yang tidak boleh diubah

## Kurs Data Types

Selalu gunakan types dari `@/types/kurs.ts`:

```typescript
// BENAR
import type { KursData, MataUang } from '@/types/kurs'

// SALAH — jangan define inline
const kurs: { kode: string; beli: number } = ...
```

## Error Handling

```typescript
// BENAR — typed error handling
try {
  const data = await fetchKurs()
} catch (error) {
  if (error instanceof KursApiError) {
    // handle specific error
  }
  throw error // re-throw jika tidak bisa handle
}

// SALAH
} catch (e: any) { console.log(e) }
```

## Async / Await

- Selalu `await` Promise — tidak ada floating promise
- Gunakan `Promise.allSettled` jika fetch multiple API sekaligus
- API routes harus return Response dengan status code yang tepat
