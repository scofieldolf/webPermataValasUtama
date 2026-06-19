# PROGRESS.md — Permata Valas Website

> File ini diupdate setiap sesi Claude Code. Selalu baca ini di awal sesi untuk tahu status terkini.

## Status Keseluruhan

| Fase | Status | Progress |
|------|--------|----------|
| Fase 1 — Foundation | ✅ Selesai | 100% |
| Fase 2 — Core Pages | ✅ Selesai | 100% |
| Fase 3 — Enhancement | ✅ Selesai | 100% |
| Fase 4 — Launch | 🚧 Sedang dikerjakan | 65% |

## Halaman

| Halaman | Route | Status | Notes |
|---------|-------|--------|-------|
| Beranda | `/` | ✅ | Premium layout, Ticker, Kalkulator, Keunggulan, Testimoni, Schema.org JSON-LD. |
| Kurs Hari Ini | `/kurs` | ✅ | Tabel kurs lengkap, search filter, timestamp, info limit BI, Grafik Tren Recharts. |
| Layanan | `/layanan` | ✅ | Tukar tunai, Outward Remittance, Bank notes, tabel limit KYC/AML. |
| Tentang | `/tentang` | ✅ | Sejarah, Visi Misi, Tim Manajemen, Komitmen APU-PPT. |
| Lokasi | `/lokasi` | ✅ | Daftar kontak cabang, jam operasional, Iframe Google Maps. |
| Kontak | `/kontak` | ✅ | FAQ Accordion, Form Hubungi Kami, Form Booking Kurs interaktif. |
| Insight | `/insight` | ✅ | Halaman list artikel blog & detail blog (`/insight/[slug]`) terintegrasi Sanity + PortableText. |

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
| PortableTextRenderer | ✅ | Custom mapping untuk render HTML semantik (H2/H3/Blockquote/Link/Image) dengan Tailwind CSS. |
| KursTrendChart | ✅ | Grafik area Recharts 7 hari terakhir, responsive & bebas hydration error. |

## Integrasi

| Layanan | Status | Notes |
|---------|--------|-------|
| ExchangeRate API | ✅ | Penarikan data Idr -> Valas, spread jual/beli, mock fallback saat offline. |
| Google Maps | ✅ | Iframe embed interaktif peta gerai cabang utama. |
| Sanity CMS | ✅ | Klien, Queries (GROQ) artikel, FAQ, cabang, testimoni aktif di halaman frontend. |
| Resend Email | ✅ | API Route `/api/contact` & `/api/booking` terintegrasi dengan library `resend`. |
| reCAPTCHA v3 | ✅ | Server-side token verification di API routes. |
| sitemap.xml | ✅ | Sitemap dinamis (`sitemap.ts`) memuat rute statis & post Sanity otomatis. |
| robots.txt | ✅ | Aturan crawl (`robots.ts`) mengizinkan bot dan menautkan sitemap. |
| Schema.org | ✅ | Structured data JSON-LD (`FinancialService` + `LocalBusiness`) terpasang di Beranda. |
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

### Sesi 2 — 2026-06-18 s/d 2026-06-19
*   **Penyelesaian Fase 3 (Enhancement):**
    *   *Sanity Queries Fix:* Memperbaiki mismatch query GROQ (`post` -> `blogPost`) untuk menyelaraskan dengan skema Sanity.
    *   *Insight Pages:* Membuat halaman list `/insight` dan detail `/insight/[slug]` menggunakan Next.js Server Components terintegrasi CMS Sanity + Next.js Dynamic Metadata untuk SEO.
    *   *PortableText Integration:* Memasang package `@portabletext/react` dan membuat komponen `PortableTextRenderer` untuk menyajikan artikel rich text secara semantik dan responsif.
    *   *Rate Trend Chart:* Menginstal package `recharts` dan membuat komponen client `<KursTrendChart />` interaktif dengan visualisasi area chart beli/jual 7 hari terakhir, dilengkapi proteksi data defensif (`rawBeli < rawJual`) dan pencegahan hydration mismatch.
*   **Memulai Fase 4 (Launch & SEO):**
    *   *Sitemap Generator:* Membuat generator `sitemap.ts` dinamis untuk memuat rute statis dan dinamis artikel Sanity secara real-time.
    *   *Robots Configuration:* Membuat berkas `robots.ts` Next.js untuk menyetel aturan crawling bot search engine.
    *   *Structured Data (JSON-LD):* Menambahkan Schema.org markup `["FinancialService", "LocalBusiness"]` pada Beranda untuk memperjelas legalitas izin BI, alamat gerai, jam operasional, dan nomor kontak.
*   **Testing & CI/CD:**
    *   Menambahkan unit test Jest lengkap untuk semua fitur baru (sitemap, robots, JSON-LD, PortableTextRenderer, KursTrendChart, dan Insight pages).
    *   Memperbaiki `jest.config.js` (`testPathIgnorePatterns`) untuk mem-bypass error kompilasi Jest dari Playwright E2E files di Windows.
    *   Mencapai koverasi test di atas 90% secara global (Statements: 96.35%, Branches: 91.48%, Lines/Functions: 98%+).
    *   Verifikasi sukses 100% untuk `tsc --noEmit` dan `next build` dengan `NODE_ENV=production`.
    *   Melakukan git commit dan git push semua perubahan Fase 3 & 4 ke branch `main` GitHub `webPermataValasUtama`.

---

## Legend Status
- 🔲 Belum mulai
- 🚧 Sedang dikerjakan
- ✅ Selesai
- ⚠️ Ada issue
- ❌ Blocked
