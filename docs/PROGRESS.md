# PROGRESS.md — Permata Valas Website

> File ini diupdate setiap sesi Claude Code. Selalu baca ini di awal sesi untuk tahu status terkini.

## Status Keseluruhan

| Fase | Status | Progress |
|------|--------|----------|
| Fase 1 — Foundation | ✅ Selesai | 100% |
| Fase 2 — Core Pages | ✅ Selesai | 100% |
| Fase 3 — Enhancement | 🚧 Sedang dikerjakan | 60% |
| Fase 4 — Launch | 🔲 Belum Mulai | 15% |

## Halaman

| Halaman | Route | Status | Notes |
|---------|-------|--------|-------|
| Beranda | `/` | ✅ | Premium layout, Ticker, Kalkulator, Keunggulan, Testimoni. |
| Kurs Hari Ini | `/kurs` | ✅ | Tabel kurs lengkap, search filter, timestamp, info limit BI. |
| Layanan | `/layanan` | ✅ | Tukar tunai, Outward Remittance, Bank notes, tabel limit KYC/AML. |
| Tentang | `/tentang` | ✅ | Sejarah, Visi Misi, Tim Manajemen, Komitmen APU-PPT. |
| Lokasi | `/lokasi` | ✅ | Daftar kontak cabang, jam operasional, Iframe Google Maps. |
| Kontak | `/kontak` | ✅ | FAQ Accordion, Form Hubungi Kami, Form Booking Kurs interaktif. |
| Insight | `/insight` | 🚧 | Schema Query GROQ Sanity siap, layout halaman blog menyusul. |

## Komponen Kritis

| Komponen | Status | Notes |
|----------|--------|-------|
| KursTicker | ✅ | Animasi Marquee CSS murni (sangat ringan, bebas SSR/Hydration error). |
| KursTable | ✅ | Native `<table>` dengan header sticky & horizontal scroll di mobile. |
| KalkCalc | ✅ | Client component, akurat JPY (per 100 unit) dan KRW (per 1000 unit). |
| WhatsAppButton | ✅ | Floating button di kanan bawah dengan SVG logo resmi. |
| Header / Nav | ✅ | Navigasi responsif (Hamburger menu untuk mobile) & sticky. |
| Footer | ✅ | Kepatuhan BI (Teks Nomor Izin Resmi) & Tautan Kebijakan Privasi. |
| BadgeLegalitas | ✅ | Izin resmi Bank Indonesia (KUPU BB) terpasang di Footer. |

## Integrasi

| Layanan | Status | Notes |
|---------|--------|-------|
| ExchangeRate API | ✅ | Penarikan data Idr -> Valas, spread jual/beli, mock fallback saat offline. |
| Google Maps | ✅ | Iframe embed interaktif peta gerai cabang utama. |
| Sanity CMS | 🚧 | Client & Queries (GROQ) artikel, FAQ, cabang, testimoni siap di `src/lib/sanity`. |
| Resend Email | ✅ | API Route `/api/contact` & `/api/booking` terintegrasi dengan library `resend`. |
| reCAPTCHA v3 | ✅ | Server-side token verification di API routes. |
| Vercel Analytics | 🔲 | Menunggu deployment produksi. |
| Google Analytics 4 | 🔲 | Menunggu GA Measurement ID di .env.local. |

## Log Sesi

### Sesi 1 — 2026-06-17
*   **Inisialisasi Project:** Next.js 14 + React 18 + TypeScript strict mode + Tailwind CSS v3 + pnpm (sesuai CLAUDE.md).
*   **Konfigurasi Tailwind & CSS:** Menambahkan design tokens warna (Gold, Navy, Emerald, dll.) dan `@keyframes marquee` untuk Ticker.
*   **Struktur Global:** Membuat file `layout.tsx` (menyematkan font Inter, Playfair Display, JetBrains Mono) serta komponen `Header`, `Footer`, `WhatsAppButton`, `KursTicker`.
*   **Halaman Halaman Frontend:** Menyelesaikan implementasi frontend interaktif untuk Beranda, Kurs Hari Ini (dengan `KursTable`), Layanan, Tentang, Lokasi, dan Kontak (FAQ Accordion, form interaktif).
*   **API & Backend:**
    *   Membuat `src/lib/kurs.ts` untuk fetching data ExchangeRate API dengan perhitungan *Spread Buy/Sell* dan fallback data mock jika offline/tanpa API Key.
    *   Membuat API route `/api/kurs` dengan Next.js ISR (Incremental Static Regeneration) cache 5 menit.
    *   Membuat API route `/api/contact` (menyaring spam bot reCAPTCHA v3 + pengiriman email notifikasi via Resend).
    *   Membuat API route `/api/booking` (reservasi kurs dengan kode booking acak + notifikasi panduan teller via Resend).
    *   Menghubungkan klien Sanity CMS dan query GROQ di `src/lib/sanity/`.
*   **Verifikasi:** Menormalkan `NODE_ENV=production` saat kompilasi build produksi Next.js. Seluruh halaman berhasil di-compile secara statis murni tanpa ada satupun error.

---

## Legend Status
- 🔲 Belum mulai
- 🚧 Sedang dikerjakan
- ✅ Selesai
- ⚠️ Ada issue
- ❌ Blocked
