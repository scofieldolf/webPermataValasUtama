# Changelog

Semua perubahan penting pada proyek **Permata Valas Utama** akan didokumentasikan di berkas ini.

Format berkas ini mengacu pada [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), dan proyek ini mematuhi standar [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-06-17

Rilis perdana (Initial Release) kerangka kerja frontend dan integrasi API backend untuk website company profile PT Permata Valas Utama.

### Added
- **Inisialisasi Next.js 14 & React 18:** Menyiapkan struktur folder `src/app/`, `src/components/`, `src/lib/`, `src/types/`, dan berkas konfigurasi proyek (`package.json`, `tsconfig.json`, `postcss.config.mjs`, `tailwind.config.js`).
- **Desain & Tipografi:** Menyematkan design tokens warna kustom (`pv-gold-primary`, `pv-navy-deep`, `pv-emerald-trust`, dll.) dan font Google (`Inter`, `Playfair Display`, `JetBrains Mono`) di `layout.tsx` dan `globals.css`.
- **Layout Global Responsif:**
  - `Header`: Navbar responsif (Hamburger menu mobile) terintegrasi dengan running exchange rates ticker.
  - `Footer`: Menyertakan peta situs, legalitas, nomor izin resmi Bank Indonesia (KUPU BB).
  - `WhatsApp Button`: Tombol hubungi kami terapung di kanan bawah halaman dengan transisi CSS.
- **Halaman-Halaman Utama (Public Pages):**
  - **Beranda (`/`)**: Hero section premium banking, grid kurs populer harian, keunggulan money changer resmi, alur transaksi aman, testimoni nasabah.
  - **Kurs Hari Ini (`/kurs`)**: Halaman tabel kurs lengkap beli/jual dengan kolom kode mata uang sticky pada layar mobile.
  - **Layanan (`/layanan`)**: Detail produk penukaran tunai bank notes, outward remittance, layanan korporasi, serta tabel detail syarat KYC/AML.
  - **Tentang Kami (`/tentang`)**: Profil jajaran manajemen, visi misi, komitmen anti pencucian uang (APU-PPT PPATK).
  - **Lokasi (`/lokasi`)**: Detail alamat cabang utama, nomor telepon, jam operasional, petunjuk arah jalan, dan Iframe Google Maps.
  - **Kontak & Booking (`/kontak`)**: FAQ Accordion interaktif, formulir pesan hubungi kami, formulir simulasi booking/reservasi kurs valas.
- **Komponen Interaktif Kalkulator (`KalkCalc`):** Logika konversi instan valas-rupiah dengan pembulatan desimal terstruktur dan penanganan Won Korea (KRW per 1000) serta Yen Jepang (JPY per 100).
- **Integrasi API & Backend:**
  - Modul `src/lib/kurs.ts` untuk fetching data ExchangeRate API, spread beli/jual, serta mock fallback otomatis jika API key tidak tersedia / offline.
  - API Route `/api/kurs` dengan Next.js ISR (Incremental Static Regeneration) cache 5 menit (300s).
  - API Route `/api/contact` (validasi reCAPTCHA v3 + pengiriman email notifikasi via Resend).
  - API Route `/api/booking` (notifikasi email detail reservasi untuk teller gerai via Resend).
  - Integrasi Sanity.io CMS client dan database queries GROQ di `src/lib/sanity/`.
- **Rangkaian Pengujian Unit (Jest + RTL):** Konfigurasi pengujian (`jest.config.js`, `jest.setup.js`) dan 5 berkas uji unit (`utils.test.ts`, `kurs.test.ts`, `kurs-ticker.test.tsx`, `kurs-table.test.tsx`, `kalk-calc.test.tsx`) dengan cakupan kumulatif mencapai **96.55%** (melebihi target 90%).

### Changed
- **Optimasi Marquee Ticker:** Mengubah scroll marquee running exchange rates dari `framer-motion` menjadi Tailwind CSS `@keyframes` murni untuk menghindari *Hydration / SSR Context Crash* di Next.js 14.
- **Normalisasi Variabel Izin BI:** Menyeleraskan pemanggilan variabel `licenseNumber` di footer dan tentang kami secara global agar mematuhi strict typing.

### Fixed
- **Bypass NODE_ENV:** Menghentikan bentrokan error Webpack React-dom development di production build dengan memaksa `NODE_ENV=production` saat kompilasi.
