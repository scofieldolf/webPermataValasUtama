# Product Requirements Document (PRD) — Company Profile Website
## PT Permata Valas Utama · Money Changer & Layanan Valuta Asing

---

## 1. Metadata Proyek
* **Versi Dokumen:** v1.0.0
* **Status Dokumen:** Approved / Active PRD
* **Target Launch:** Q3 2026
* **Nama Perusahaan:** PT Permata Valas Utama
* **Izin Bank Indonesia:** Terintegrasi di footer (Wajib menampilkan nomor izin resmi BI)
* **Default Bahasa:** Indonesia (UI utama, tidak ada mixed language)

---

## 2. Latar Belakang & Tujuan Produk

### Latar Belakang
Industri money changer di Indonesia sangat bergantung pada tingkat kepercayaan (trust). Website company profile PT Permata Valas Utama bukan sekadar brosur digital biasa, melainkan titik pertama interaksi calon nasabah dengan brand. Website ini harus memancarkan aspek keamanan, transparansi, kredibilitas, dan kompetensi profesional.

### Tujuan Utama
Membangun company profile digital yang memperkuat kredibilitas perusahaan, menampilkan kurs mata uang secara real-time yang kompetitif, serta mengonversi pengunjung online menjadi nasabah aktif (baik walk-in maupun korporat).

---

## 3. Target Pengguna (User Persona)

1. **Nasabah Perorangan (Retail Customers)**
   * *Profil:* Traveler, ekspatriat, orang tua dengan anak belajar di luar negeri, atau pelajar.
   * *Kebutuhan:* Tukar valas dengan kurs kompetitif, informasi stok mata uang, lokasi cabang terdekat, dan layanan yang cepat serta tepercaya.
2. **Nasabah Korporat (Corporate Customers)**
   * *Profil:* Perusahaan importir/eksportir, agen perjalanan (travel agents), dan bisnis logistik.
   * *Kebutuhan:* Pengelolaan valuta asing reguler, transaksi volume besar dengan rate khusus, kepatuhan hukum, dan dokumentasi transaksi yang lengkap.
3. **Prospek Online (Online Prospects)**
   * *Profil:* Pengguna internet aktif yang mencari informasi money changer di Google.
   * *Kebutuhan:* Membandingkan rate/kurs secara cepat sebelum mendatangi gerai fisik.
4. **Mitra & Regulator (Partners & Regulators)**
   * *Profil:* Bank koresponden, auditor keuangan, pengawas Bank Indonesia (BI), dan PPATK.
   * *Kebutuhan:* Verifikasi legalitas perusahaan, kejelasan perizinan, dan komitmen kepatuhan AML/KYC.

---

## 4. Key Performance Indicators (KPI) Keberhasilan

Untuk mengukur kesuksesan implementasi website ini, target berikut harus dipenuhi:
* **Largest Contentful Paint (LCP):** < 2.5 detik (Performa prima)
* **Google PageSpeed Score:** 90+ (Lampu hijau untuk mobile & desktop)
* **Bounce Rate Target:** < 3%
* **SEO Rankings:** Masuk Top 3 SERP Google untuk keyword *"money changer Jakarta"*
* **Walk-in Conversion:** Kenaikan estimasi +40% konversi nasabah walk-in dari rujukan website
* **Aksesibilitas:** Memenuhi kriteria WCAG 2.1 Level AA

---

## 5. Struktur Halaman & Fitur (Site Map)

Website ini terdiri dari 7 halaman utama dengan prioritas rilis sebagai berikut:

### 1. Beranda (Homepage) — `/` `[Must Have]`
Halaman utama sebagai representasi visual pertama brand.
* **Komponen Kritis:**
  * **Hero Section + Kurs Live:** Tampilan visual premium dengan ticker/tabel ringkas kurs terkini.
  * **Keunggulan Kami:** Nilai tambah perusahaan (izin BI resmi, kurs bersaing, lokasi aman).
  * **Mata Uang Populer:** Grid ringkas nilai tukar terpopuler (USD, SGD, JPY, EUR, AUD).
  * **Kalkulator Valas:** Alat kalkulasi instan untuk konversi rupiah ke valas atau sebaliknya.
  * **Lokasi Gerai Ringkas:** Peta gerai utama di Jakarta.
  * **Testimoni Nasabah:** Review autentik dari nasabah perorangan/korporat.
  * **Mitra & Sertifikasi:** Logo izin Bank Indonesia dan lembaga keuangan pendukung.
  * **CTA WhatsApp:** Floating button mengambang di kanan bawah.

### 2. Kurs Hari Ini — `/kurs` `[Must Have]`
Halaman tabel kurs lengkap yang menjadi halaman dengan traffic SEO potensial tertinggi.
* **Komponen Kritis:**
  * **Tabel Kurs Beli/Jual Lengkap:** Menampilkan seluruh daftar mata uang aktif yang dilayani.
  * **Timestamp Update:** Keterangan waktu update terakhir (wajib ditampilkan).
  * **Filter/Search Mata Uang:** Memudahkan pencarian kode valas tertentu.
  * **Kalkulator Inline:** Konversi cepat langsung di samping/atas tabel.
  * **Grafik Tren 7 Hari:** Grafik visual fluktuasi nilai kurs seminggu terakhir.
  * **Notifikasi Kurs:** Fitur pengingat kurs (opsional/langganan update).

### 3. Layanan — `/layanan` `[Must Have]`
Penjelasan mendetail mengenai semua opsi layanan keuangan yang disediakan.
* **Komponen Kritis:**
  * **Tukar Tunai (Cash Exchange):** Prosedur dan panduan transaksi tunai di gerai.
  * **Transfer Valas (Outward Remittance):** Prosedur pengiriman uang ke luar negeri.
  * **Bank Notes:** Transaksi fisik bank notes dalam berbagai kondisi.
  * **Layanan Korporat:** Rate khusus dan fasilitas antar-jemput untuk nasabah korporasi.
  * **Persyaratan KYC (Know Your Customer):** Dokumen wajib bawa (KTP/Passport) berdasarkan limit transaksi.

### 4. Tentang Kami — `/tentang` `[Must Have]`
Halaman pembangun kepercayaan publik dan compliance regulator.
* **Komponen Kritis:**
  * **Sejarah & Visi Misi:** Latar belakang pendirian PT Permata Valas Utama.
  * **Izin BI & Legalitas:** Informasi nomor izin resmi Bank Indonesia (KUPU - Kegiatan Usaha Penukaran Valuta Asing Bukan Bank).
  * **Tim Manajemen:** Profil singkat jajaran direksi/manajemen profesional.
  * **Penghargaan:** Apresiasi yang pernah diraih (jika ada).
  * **Komitmen AML & CFT:** Pernyataan kepatuhan anti pencucian uang dan pencegahan pendanaan terorisme (PPATK).

### 5. Lokasi Cabang — `/lokasi` `[Should Have]`
Halaman panduan cabang fisik bagi nasabah walk-in.
* **Komponen Kritis:**
  * **Google Maps API Integration:** Peta interaktif penanda lokasi gerai.
  * **Daftar Cabang:** Alamat lengkap, nomor telepon, dan WhatsApp per cabang.
  * **Jam Operasional:** Detail waktu buka/tutup gerai (termasuk akhir pekan jika ada).
  * **Petunjuk Arah & Panduan Parkir:** Panduan akses transportasi umum atau parkir kendaraan.

### 6. Kontak & Booking — `/kontak` `[Should Have]`
Halaman interaksi langsung untuk konversi penjualan dan support.
* **Komponen Kritis:**
  * **Form Booking/Reservasi Kurs:** Form khusus untuk memesan nominal valas sebelum datang ke cabang (mencegah kehabisan stok).
  * **WhatsApp Business Integration:** Link langsung ke tim sales.
  * **Form Kontak Umum:** Form pesan umum (Nama, Email, Telepon, Pesan).
  * **FAQ Accordion:** Pertanyaan umum seputar limit tukar, jenis mata uang, dan regulasi.

### 7. Blog / Insight Valas — `/insight` `[Nice to Have]`
Halaman penunjang SEO edukatif.
* **Komponen Kritis:**
  * **Artikel Edukasi:** Tips penukaran uang, info liburan, dll.
  * **Analisis Pasar:** Update mingguan kondisi mata uang global.
  * **Info Regulasi BI:** Perubahan aturan keuangan yang berdampak pada nasabah.
  * **RSS Feed / Berita Finansial:** Integrasi feed eksternal.

---

## 6. Rekomendasi Tech Stack & Arsitektur

Website dibangun menggunakan teknologi modern yang menjamin kecepatan dan kemudahan pemeliharaan:

| Kategori | Teknologi | Detail Implementasi |
|---|---|---|
| **Framework** | Next.js 14 | App Router, TypeScript (Strict Mode) |
| **Styling & UI** | Tailwind CSS v3, shadcn/ui, Framer Motion | Komponen berbasis utility classes dengan transisi animasi yang halus |
| **Data Kurs API** | ExchangeRate API, Fixer.io | Integrasi data kurs eksternal, dikombinasikan dengan Next.js ISR |
| **CMS** | Sanity.io v3 | Pengelolaan konten blog, daftar cabang, FAQ, dan testimoni via GROQ |
| **Maps** | Google Maps API | Peta lokasi interaktif gerai fisik |
| **Charts** | Recharts | Visualisasi grafik tren nilai tukar mata uang 7 hari |
| **Analytics** | Vercel Analytics, GA4, Hotjar | Monitoring performa web dan perilaku user |
| **Deployment** | Vercel | Production auto-deploy terhubung dengan CI/CD GitHub |
| **Notification** | Resend | Pengiriman email formulir kontak & booking |
| **SEO** | Schema.org JSON-LD | Integrasi `LocalBusiness`, `FinancialService`, & `ExchangeRateSpecification` |

### Strategi Pembaruan Data Kurs
* **Next.js ISR (Incremental Static Regeneration):** Halaman `/kurs` di-revalidate setiap **5 menit (300 detik)** (ADR-003). Hal ini menjamin halaman tetap dimuat instan bagi nasabah (served dari cache CDN) namun datanya tidak pernah lebih lama dari 5 menit.
* **Manual Webhook:** Integrasi webhook dari CMS Sanity untuk melakukan pembersihan cache manual (on-demand revalidation) jika admin memperbarui data kurs secara khusus.

---

## 7. Kepatuhan (Compliance) & Keamanan (Security)

Sebagai institusi keuangan berizin Bank Indonesia, website wajib mematuhi standar berikut:
1. **Keamanan Transaksi & Data (KYC/AML):**
   * Website **TIDAK** menyimpan data sensitif nasabah secara permanen (seperti foto KTP, NIK, dll).
   * Formulir kontak dan booking hanya boleh mengumpulkan informasi non-sensitif dasar: *Nama lengkap, Alamat email, Nomor telepon, dan Detail mata uang/nominal transaksi*.
2. **Perlindungan Form:**
   * Setiap formulir di website wajib dilindungi oleh **Google reCAPTCHA v3** untuk mencegah spam bot.
   * Implementasi **Rate Limiting** di API Routes `/api/contact` dan `/api/booking` untuk mencegah serangan Denial of Service (DoS) dan brute force.
3. **API Protection:**
   * Token API eksternal (ExchangeRate API, Resend, Sanity) harus disimpan di server-side environment variables dan **TIDAK BOLEH** bocor ke client-side Javascript bundle.
4. **Hukum & Regulasi:**
   * Wajib mencantumkan nomor izin resmi Bank Indonesia (KUPU) secara permanen di footer setiap halaman.
   * Wajib menyediakan tautan halaman **Kebijakan Privasi (Privacy Policy)** dan **Syarat & Ketentuan (Terms & Conditions)** sebelum website resmi dirilis.

---

## 8. Arahan Visual, Brand, & Design Tokens

### Karakter Visual (Tone)
* **Keyword:** *Professional, Premium, Trusted, Secure, Modern.*
* Estetika visual terinspirasi dari gaya *premium banking* Asia Tenggara dengan layout bersih, kontras tinggi, dan elemen emas/emas gelap yang melambangkan kemakmuran dan valuta.

### Design Tokens (Warna & Font)
* **Warna Utama (Brand Colors):**
  * **Gold Primary:** `#B8860B` (`--pv-color-gold-primary`) - Digunakan untuk tombol utama (CTA), aksen, dan highlight.
  * **Gold Light:** `#F5E6A3` (`--pv-color-gold-light`) - Untuk hover state, background badge, dan panel dekoratif.
  * **Navy Deep:** `#042C53` (`--pv-color-navy-deep`) - Background header, teks judul utama (Heading), memberikan impresi aman/korporat.
  * **Emerald Trust:** `#0F6E56` - Warna indikator kurs naik / tren positif.
  * **Red Signal:** `#A32D2D` - Warna indikator kurs turun / tren negatif.
  * **Ivory Surface:** `#F8F6F0` - Warna latar belakang alternatif untuk membedakan section.
* **Tipografi:**
  * **Heading Font:** `Playfair Display` (Kesan prestisius, kokoh, dan berkelas)
  * **Body & UI Font:** `Inter` (Keterbacaan yang sangat baik di layar digital mobile & desktop)
  * **Monospace Font (Angka/Kurs):** `JetBrains Mono` (Menghindari pergeseran visual angka saat nilai kurs berubah)

---

## 9. Aturan Non-Fungsional (Non-Functional Requirements)

1. **Desain Mobile-First:**
   * Fokus utama dioptimalkan untuk perangkat seluler (viewport 320px - 375px), mengingat >80% calon nasabah mencari informasi lewat HP saat di jalan.
   * Tabel kurs di layar mobile harus responsif, menggunakan horizontal scroll dengan kolom pertama (Kode Mata Uang) tetap berstatus *sticky* (membeku di kiri).
2. **Aksesibilitas (A11y):**
   * Semua gambar wajib memiliki atribut `alt` yang deskriptif dan dioptimalkan untuk SEO.
   * Rasio kontras teks minimal 4.5:1 untuk menjamin keterbacaan oleh pengguna dengan gangguan visual.
   * Elemen interaktif (kalkulator, menu) wajib bisa dinavigasi menggunakan keyboard (tab index).

---

## 10. Rencana Rilis (Roadmap)

* **Fase 1 — Foundation (Minggu 1–3):**
  * Inisialisasi Next.js 14, konfigurasi Tailwind, TypeScript strict mode, dan setup komponen dasar shadcn/ui.
  * Integrasi mock API kurs lokal dan penyusunan halaman `/` (Beranda) & `/kurs` (Kurs Hari Ini).
* **Fase 2 — Core Pages (Minggu 4–6):**
  * Pembangunan halaman `/layanan`, `/tentang`, dan `/lokasi`.
  * Integrasi Google Maps API, kalkulator interaktif, dan formulir hubungi kami.
  * Inisialisasi CMS Sanity untuk pengelolaan data cabang dan konten FAQ.
* **Fase 3 — Enhancement (Minggu 7–9):**
  * Integrasi Recharts untuk grafik tren kurs.
  * Pembuatan formulir pemesanan/booking kurs beserta integrasi Resend Email.
  * Audit performa (Lighthouse), SEO, dan audit aksesibilitas untuk mencapai target KPI.
* **Fase 4 — Launch & Growth (Minggu 10–12):**
  * User Acceptance Testing (UAT) internal.
  * Penulisan konten blog di `/insight` untuk meluncurkan optimasi SEO.
  * Go-live produksi di Vercel dan menghubungkannya dengan Google Search Console.

---

## 11. Kriteria Penerimaan Minimum (Acceptance Criteria - AC) untuk Launch

| Kode AC | Nama Kriteria | Keterangan Uji | Prioritas |
|---|---|---|---|
| **AC-01** | Live Rate Update | Kurs di halaman web ter-update otomatis dari API eksternal setiap ≤15 menit sekali dengan stempel waktu terverifikasi. | **MUST HAVE** |
| **AC-02** | Kalkulator Akurat | Hasil kalkulator konversi valas harus akurat sesuai rate beli/jual terkini dengan toleransi pembulatan maksimal dua desimal (±0.01%). | **MUST HAVE** |
| **AC-03** | Load Speed 4G | Kecepatan pemuatan halaman pertama di jaringan 4G seluler tidak boleh melebihi 3 detik. | **MUST HAVE** |
| **AC-04** | BI License Footer | Footer di setiap halaman wajib menampilkan teks nomor izin resmi KUPU PT Permata Valas Utama dari Bank Indonesia. | **MUST HAVE** |
| **AC-05** | Mobile Responsiveness | Seluruh fungsionalitas tombol, navigasi, dan tabel harus berjalan sempurna tanpa overflow visual pada layar iPhone 12 dan Galaxy S21. | **MUST HAVE** |
| **AC-06** | WhatsApp Target | Tombol WhatsApp CTA mengarah ke nomor admin resmi dengan format tautan `https://wa.me/62...` yang benar. | **MUST HAVE** |
| **AC-07** | Lighthouse Score | Rata-rata skor performa, SEO, dan a11y di Google Lighthouse di atas 85 untuk seluruh halaman utama. | **SHOULD HAVE** |
| **AC-08** | Contact Delivery | Pesan dari formulir kontak berhasil terkirim ke inbox email operasional perusahaan via Resend. | **SHOULD HAVE** |
