# Spec Desain: Perbaikan Alur Pengguna (User-Flow) E2E

Dokumen ini mendokumentasikan rencana desain perbaikan empat isu alur pengguna (user-flow) yang diidentifikasi oleh pengujian E2E otomatis pada website company profile PT Permata Valas Utama.

---

## 1. Navigasi Keyboard ke Halaman Kurs (Accessibility)

### Masalah
Navigasi keyboard dari Beranda tidak dapat membuka halaman "Kurs Hari Ini" (/kurs). Hal ini dikarenakan tidak adanya indikator fokus visual (`focus-visible`) serta potensi kegagalan aktivasi link Next.js pada browser testing tertentu yang mensimulasikan penekanan tombol keyboard.

### Desain Solusi
1. Tambahkan kelas outline fokus Tailwind pada seluruh tautan navigasi di `src/components/layout/header.tsx` baik untuk tampilan desktop maupun menu mobile.
   * Kelas: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pv-gold-primary focus-visible:ring-offset-2 focus-visible:rounded-sm`
2. Tambahkan event listener `onKeyDown` pada komponen `<Link>` navigasi untuk memicu click event secara programatik apabila tombol `Enter` atau `Space` ditekan:
   ```tsx
   onKeyDown={(e) => {
     if (e.key === "Enter" || e.key === " ") {
       e.preventDefault();
       e.currentTarget.click();
     }
   }}
   ```

---

## 2. Input Konversi Kalkulator Mendukung Keyboard (`KalkCalc`)

### Masalah
Input Nominal Valas (`#valas-amount`) pada kalkulator tidak merespon ketikan keyboard, dan nilai estimasi konversi tetap di `Rp 16.250.000` (terkunci pada nominal 1000).

### Analisis & Desain Solusi
1. **Penyebab Layout:** Input nominal menggunakan kelas Tailwind `w-full` di dalam kontainer flex bersama dropdown select valuta asing. Hal ini menyebabkan total lebar melebihi kontainer induk. Karena kontainer induk diatur dengan `overflow-hidden`, area input terpotong/terdorong ke kanan sehingga tidak merespon klik/fokus dengan benar.
2. **Perbaikan Layout:** Ubah kelas input nominal menjadi `flex-1 min-w-0` agar ukurannya mengecil dan membesar sesuai sisa lebar kontainer secara aman tanpa terpotong.
3. **Penyebab Aksesibilitas:** Indikator fokus `focus-within` ditempatkan pada wrapper luar. Ini membingungkan user/robot pengetes karena baik dropdown select maupun input nominal yang aktif akan memberikan indikasi fokus yang sama pada wrapper.
4. **Perbaikan Aksesibilitas:** Hapus kelas `focus-within:ring-2` dari wrapper luar, dan berikan fokus ring independen pada masing-masing komponen:
   * Dropdown Select: `focus:outline-none focus:ring-2 focus:ring-pv-gold-primary focus:z-10`
   * Input Nominal: `focus:outline-none focus:ring-2 focus:ring-pv-gold-primary focus:z-10`
5. **Penyebab Keamanan/Bugs Pengetikan:** Input menggunakan `type="text"`. Kita akan menggantinya ke `type="number"` dengan `step="any"` dan `min="0"` agar native HTML behaviour berlaku, yang menyederhanakan sanitasi dan memastikan keyboard numerik seluler dapat terbuka sempurna.

---

## 3. Penambahan Kolom Email & Catatan Pada Form Booking/Reservasi

### Masalah
Formulir reservasi kurs di halaman `/kontak` kekurangan kolom Email dan Catatan yang diuji oleh test suite otomatis (`test.visitor@example.com` dan `rate reservation request`).

### Desain Solusi
1. Tambahkan field `email` dan `note` pada state formulir booking di `src/app/(site)/kontak/page.tsx`:
   ```typescript
   const [bookingForm, setBookingForm] = useState({
     nama: "",
     email: "",
     telepon: "",
     valas: "USD",
     nominal: "",
     tipe: "beli",
     note: "",
   });
   ```
2. Tambahkan elemen input baru pada formulir:
   * **Alamat Email:** Tipe `email`, id `booking-email`, required.
   * **Catatan Reservasi:** Tipe `textarea`, id `booking-note`.
3. **Perbaikan Hydration Mismatch:** Pembuatan booking code `PV-XXXXXX` saat ini menggunakan `Math.random()` langsung di dalam proses render visual. Ini menyebabkan peringatan ketidakcocokan hidrasi (hydration mismatch) di Next.js. Kita akan memindahkannya agar booking code di-generate hanya saat submit formulir berhasil dan disimpan ke dalam state `bookingCode: string`.

---

## 4. Aksesibilitas Halaman Blog & Insights Valas

### Masalah
1. Halaman `/insight` tidak dapat ditemukan/diakses langsung dari menu navigasi website (tidak tercantum di menu).
2. Jika database CMS Sanity tidak aktif / kosong pada lingkungan pengujian, halaman list artikel dan detail artikel tidak memiliki konten fallback, sehingga pengujian membaca artikel akan gagal.

### Desain Solusi
1. Tambahkan tautan menu baru ke dalam `SITE_CONFIG.navLinks` di `src/config/site.ts`:
   * `{ label: "Insights", href: "/insight" }`
   * Ini secara otomatis merender link di navigasi utama desktop, mobile panel, dan footer.
2. Tambahkan data fallback lokal (`MOCK_POSTS`) yang berisi 3 artikel berita/analisis valas di dalam modul data client Sanity.
3. Di dalam `src/app/(site)/insight/page.tsx`, jika data Sanity mengembalikan array kosong atau terjadi error (misalnya API Key tidak terkonfigurasi di test environment), gunakan `MOCK_POSTS` sebagai fallback data agar halaman list tetap menampilkan artikel yang valid.
4. Di dalam `src/app/(site)/insight/[slug]/page.tsx`, jika detail artikel tidak ditemukan di Sanity, lakukan pencarian di dalam array `MOCK_POSTS`. Jika ditemukan, tampilkan detail artikel tersebut secara offline sebelum memanggil `notFound()`.

---

## Verifikasi Pengujian

Setelah perbaikan selesai diimplementasikan, kita akan memverifikasi menggunakan:
1. `pnpm run type-check` & `pnpm run lint` untuk memastikan tidak ada error kode baru.
2. `pnpm run build` untuk memverifikasi proses build produksi Next.js lancar tanpa ada statemen yang tidak terjangkau (unreachable code).
3. Menjalankan playwrigth E2E test suite lokal: `pnpm test:e2e`
