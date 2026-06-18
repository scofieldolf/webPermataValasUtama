---
paths:
  - "src/app/api/**"
---

# API Routes Rules

## Response Format

Semua API route HARUS mengikuti format ini:

```typescript
// Sukses
return Response.json(
  { success: true, data: payload, timestamp: new Date().toISOString() },
  { status: 200 }
)

// Error
return Response.json(
  { success: false, error: { code: 'KURS_FETCH_FAILED', message: 'Gagal mengambil data kurs' } },
  { status: 500 }
)
```

## Rate Limiting

- `/api/kurs` — cache 5 menit, ISR, tidak perlu rate limit manual
- `/api/contact` — rate limit 5 requests/menit per IP
- Semua POST endpoint wajib validasi reCAPTCHA token

## Kurs API Route (`/api/kurs`)

```typescript
export const revalidate = 300 // 5 menit ISR

export async function GET() {
  // 1. Cek cache Redis/KV dulu (opsional fase 2)
  // 2. Fetch dari ExchangeRate API
  // 3. Transform ke format internal KursData[]
  // 4. Return dengan header Cache-Control
}
```

## Security Headers

Setiap API route wajib return header:
- `X-Content-Type-Options: nosniff`
- Tidak pernah expose internal error message ke client
