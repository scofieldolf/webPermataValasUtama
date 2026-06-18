# Performance Analysis & Optimization Report

Dokumen ini mendokumentasikan analisis performa waktu muat (loading speed), ukuran bundel JavaScript, optimasi aset, dan kepatuhan waktu respon untuk website **PT Permata Valas Utama**.

## Ringkasan Performa Build Produksi

Hasil analisis kompilasi Next.js (`next build`) menunjukkan efisiensi bundel yang sangat tinggi:

| Jalur Halaman (Route) | Tipe Render | Ukuran Bundel (Size) | First Load JS | Kepatuhan Target PRD (<200 kB) |
|---|---|---|---|---|
| **Beranda (`/`)** | Static (○) | 190 B | 106 kB | ✅ Sangat Baik (53% dari limit) |
| **Kurs Hari Ini (`/kurs`)** | Static (○) | 2.75 kB | 102 kB | ✅ Sangat Baik (51% dari limit) |
| **Layanan (`/layanan`)** | Static (○) | 146 B | 87.1 kB | ✅ Sangat Baik (43% dari limit) |
| **Tentang Kami (`/tentang`)** | Static (○) | 146 B | 87.1 kB | ✅ Sangat Baik (43% dari limit) |
| **Lokasi Cabang (`/lokasi`)** | Static (○) | 146 B | 87.1 kB | ✅ Sangat Baik (43% dari limit) |
| **Hubungi & Booking (`/kontak`)** | Static (○) | 5.47 kB | 99.8 kB | ✅ Sangat Baik (50% dari limit) |
| **Bukan Halaman (`/_not-found`)** | Static (○) | 872 B | 87.8 kB | ✅ Sangat Baik (43% dari limit) |

---

## Detail Teknik Optimasi yang Diterapkan

### 1. Optimasi Font (`next/font/google`)
*   **Masalah Umum:** Penggunaan font eksternal (Google Fonts link / CDN) memicu *render-blocking* dan pergeseran layout (CLS) saat browser mengunduh font.
*   **Solusi:** Memuat font `Inter`, `Playfair_Display`, dan `JetBrains_Mono` secara terpusat di `src/app/layout.tsx` menggunakan `next/font/google`. 
*   **Dampak:** Next.js secara otomatis melakukan *self-hosting* font di server lokal saat build, menyertakan properti `display: "swap"`, dan menyaring glif dasar (`subsets: ["latin"]`). Browser tidak perlu melakukan request eksternal ke domain Google Fonts saat nasabah mengakses web.

### 2. Penghapusan Framer Motion di Header & Ticker (CSS Animations)
*   **Masalah Umum:** Penggunaan library animasi berat di tingkat tata letak root (seperti `framer-motion` di ticker header dan tombol WhatsApp) memicu *hydration delay* dan *context rendering crash* di SSR Next.js 14 jika `NODE_ENV` bercampur.
*   **Solusi:** Animasi marquee kurs live di `KursTicker` diganti menggunakan CSS Animation keyframe murni (`@keyframes marquee`) yang diintegrasikan langsung ke `tailwind.config.js`.
*   **Dampak:** Menghilangkan JS execution cost untuk animasi ticker di client, memangkas ukuran JavaScript shared bundler, dan menjamin scrolling running text berjalan lancar di GPU ponsel spesifikasi rendah.

### 3. Penangguhan Pemuatan Peta Interaktif (Iframe Lazy Loading)
*   **Masalah Umum:** Embed peta Google Maps sering kali mengunduh berkas script visual yang sangat besar (>500KB) yang memblokir rendering utama halaman.
*   **Solusi:** Menyematkan atribut `loading="lazy"` secara asli pada iframe Google Maps di halaman `/lokasi`.
*   **Dampak:** Browser hanya mengunduh data peta ketika nasabah secara aktif menggulir halaman mendekati lokasi peta tersebut. Waktu LCP muat awal halaman tetap di bawah 1 detik.

### 4. Shared Bundle Minimization
*   Seluruh halaman berbagi berkas shared chunk utama sebesar **87 kB** (terdiri dari React runtime, Next.js internal core, dan modul utility fundamental). Pemanfaatan *Route Group* `(site)` membantu Next.js mengemas dependensi halaman secara terisolasi tanpa mencemari bundel global.

---
*Laporan ini dihasilkan pada 2026-06-17 untuk pelacakan kepatuhan metrik kinerja.*
