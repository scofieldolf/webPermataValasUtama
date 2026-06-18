---
paths:
  - "src/components/**"
  - "src/app/**/*.tsx"
---

# Component Rules

## Server vs Client Component

```typescript
// DEFAULT: Server Component — tidak perlu directive
export function KursTable({ data }: { data: KursData[] }) { ... }

// Client Component — tambah directive, jelaskan alasannya
'use client' // Diperlukan: menggunakan useState untuk filter mata uang
export function KursFilter() { ... }
```

## Props Interface

```typescript
// BENAR — interface eksplisit, export jika dipakai di tempat lain
interface KursTicker Props {
  currencies: MataUang[]
  intervalMs?: number // default 3000
}

// SALAH — anonymous inline type
function KursTicker({ currencies }: { currencies: string[] }) { ... }
```

## Komponen Kurs (Prioritas Tinggi)

`KursTicker` — scrolling ticker di header
- Props: `currencies: MataUang[]`, `speed?: number`
- Update setiap 5 menit via SWR atau React Query
- Animasi dengan Framer Motion `animate={{ x: [-100%, 0%] }}`
- Tunjukkan arrow ↑ (hijau) atau ↓ (merah) perubahan kurs

`KursTable` — tabel kurs lengkap di halaman /kurs
- Server Component — data dari props (fetch di page.tsx)
- Sticky header + horizontal scroll di mobile
- Gunakan `<table>` native dengan `scope` untuk aksesibilitas
- Kolom: Mata Uang | Kurs Beli | Kurs Jual | Update

`KalkCalc` — kalkulator konversi
- Client Component (interaktif)
- Debounce input 300ms sebelum calculate
- Format output: Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' })

## Aksesibilitas Wajib

- Semua gambar: `alt` wajib (bukan kosong kecuali dekoratif)
- Tombol: `aria-label` jika tidak ada teks visible
- Form: setiap `<input>` harus punya `<label>` terhubung
- Tabel: gunakan `<caption>`, `<th scope="col/row">`
- Focus visible: jangan hapus outline tanpa alternatif
