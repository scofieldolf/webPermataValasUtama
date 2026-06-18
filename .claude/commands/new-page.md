# Buat halaman baru Next.js App Router

Buat halaman baru untuk website Permata Valas Utama berdasarkan nama yang diberikan.

Langkah-langkah:

1. **Baca** `CLAUDE.md` dan `src/config/site.ts` untuk memahami struktur dan konten yang ada
2. **Cek** apakah halaman sudah ada di `src/app/(site)/`
3. **Buat** struktur folder dan files:

```
src/app/(site)/[nama-halaman]/
├── page.tsx          # Server Component utama
├── loading.tsx       # Loading UI (Suspense boundary)
└── error.tsx         # Error boundary
```

4. **Template page.tsx:**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '[Judul Halaman] | Permata Valas Utama',
  description: '[Deskripsi 150-160 karakter]',
}

export default async function [NamaHalaman]Page() {
  return (
    <main>
      <section className="container mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-semibold text-pv-navy">
          [Judul Halaman]
        </h1>
      </section>
    </main>
  )
}
```

5. **Tambahkan** entri navigasi di `src/config/site.ts` jika halaman ini perlu masuk nav
6. **Update** `docs/PROGRESS.md` dengan status halaman baru

Nama halaman yang tersedia (sesuai PRD): `kurs`, `layanan`, `tentang`, `lokasi`, `kontak`, `insight`
