# PROGRESS.md — Permata Valas Website

> File ini diupdate setiap sesi Claude Code. Selalu baca ini di awal sesi untuk tahu status terkini.

## Status Keseluruhan

| Fase | Status | Progress |
|------|--------|----------|
| Fase 1 — Foundation | ✅ Selesai | 100% |
| Fase 2 — Core Pages | ✅ Selesai | 100% |
| Fase 3 — Enhancement | ✅ Selesai | 100% |
| Fase 4 — Launch | ✅ Selesai | 100% |

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
| sitemap.xml | ✅ | Sitemap dinamis (`sitemap.ts`) memuat rute statis, dinamis, dan rute legal otomatis. |
| robots.txt | ✅ | Aturan crawl (`robots.ts`) mengizinkan bot dan menautkan sitemap. |
| Schema.org | ✅ | Structured data JSON-LD (`FinancialService` + `LocalBusiness`) terpasang di Beranda. |
| Vercel Analytics | ✅ | Diimplementasikan menggunakan @vercel/analytics. |
| Google Analytics 4 | ✅ | Diimplementasikan menggunakan @next/third-parties/google. |

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
    *   *Analytics Integration:* Mengimplementasikan Vercel Analytics (`@vercel/analytics`) dan Google Analytics 4 (`@next/third-parties/google`) di root layout untuk production environment.
    *   *Company Info Update:* Memperbarui data alamat (ITC Permata Hijau), nomor WhatsApp (0822-4666-7301), dan jam operasional baru. Melakukan refaktorisasi pada `SITE_CONFIG` untuk menyajikan data alamat secara terstruktur demi kebersihan data JSON-LD dan tampilan halaman Lokasi secara dinamis. Unit test disesuaikan dan lulus 100% dengan branch coverage di atas 91%.
    *   *Logo Integration:* Menyalin file `permataValasLogo.png` dari root ke `public/images/logo.png` dan memetakan komponen Next.js `Image` pada header dan footer untuk menampilkan logo resmi secara konsisten.

### Sesi 3 — 2026-06-20 (Sesi Saat Ini)
*   **Penyelesaian Kepatuhan Legal (BI Compliance):**
    *   *Kebijakan Privasi:* Membuat halaman statis `/kebijakan-privasi` (`src/app/(site)/kebijakan-privasi/page.tsx`) berisi informasi pelindungan data pribadi nasabah, prinsip mengenali nasabah (KYC), serta anti pencucian uang (AML) sesuai regulasi BI.
    *   *Syarat & Ketentuan:* Membuat halaman statis `/syarat-ketentuan` (`src/app/(site)/syarat-ketentuan/page.tsx`) berisi pedoman transaksi, kewajiban penyertaan dokumen pendukung (underlying document) untuk nilai transaksi ekuivalen $\ge$ USD 25,000, serta disclaimer fluktuasi kurs valas.
    *   *E2E Test Fixes:* Menambahkan 2 test case E2E Playwright baru untuk memverifikasi keterbacaan halaman kebijakan-privasi dan syarat-ketentuan secara headless. Memperbaiki error strict-mode Playwright dengan merelasikan locator teks secara unik, menyelaraskan pencocokan alamat gerai (`Mall ITC Permata Hijau` menggantikan alamat dummy `SCBD` lama), serta menambahkan pengisian email `#booking-email` di dalam tes reservasi agar formulir lolos validasi HTML5.
    *   *Build Verification:* Verifikasi build Next.js produksi dan seluruh 8 pengujian Playwright E2E lulus 100% dengan sukses.
*   **Pembaruan Cabang Utama "SCBD" Menjadi "ITC Permata Hijau":**
    *   *Penyelarasan Copywriting:* Mengubah seluruh penyebutan "Cabang Utama SCBD" menjadi "Cabang Utama ITC Permata Hijau" pada deskripsi metadata, judul card info, dan petunjuk akses (kendaraan pribadi & rute TransJakarta koridor 8) di halaman `/lokasi`.
    *   *Halaman Core Lain:* Menyelaraskan teks "SCBD" menjadi "ITC Permata Hijau" pada deskripsi reservasi di halaman `/kontak`, info booking di halaman `/layanan`, serta pada testimoni nasabah di halaman Beranda (`/`).
    *   *E2E Verification:* Seluruh 8 tes Playwright E2E berhasil lolos 100% dengan sukses menggunakan data rute yang diperbarui.
*   **Pembaruan Petunjuk Akses Ke Gerai:**
    *   *Rute Detil:* Menyunting petunjuk akses kendaraan pribadi (melewati gerbang utama Jl. Letjen Supomo / Jl. Arteri Permata Hijau ke parkir basement, lalu ke Lantai Dasar Blok C 18 No. 1 dekat Kopi Dari Hati).
    *   *Transportasi Umum:* Memperbarui petunjuk Transjakarta (Halte BRT Permata Hijau Koridor 8) dan menambahkan informasi rute KRL Commuter Line (turun di Stasiun Kebayoran dilanjutkan transportasi daring 5-10 menit).
    *   *Keamanan Transaksi:* Memasukkan jaminan privasi nasabah dengan fasilitas CCTV 24 jam dan tim sekuriti gedung yang berjaga ketat.
    *   *Build & E2E Validation:* Berhasil di-build produksi dan lulus seluruh pengujian Playwright E2E.

---

## Legend Status
- 🔲 Belum mulai
- 🚧 Sedang dikerjakan
- ✅ Selesai
- ⚠️ Ada issue
- ❌ Blocked
