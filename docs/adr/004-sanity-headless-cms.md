# 4. Sanity.io sebagai Headless CMS

* **Tanggal:** 2026-06-17
* **Status:** Accepted

## Konteks (Context)
Staf non-teknis (admin pemasaran) PT Permata Valas Utama membutuhkan media untuk memperbarui konten situs seperti artikel blog/insight, Frequently Asked Questions (FAQ), ulasan testimoni, dan jadwal operasional gerai cabang tanpa harus mengubah kode sumber aplikasi atau meminta bantuan developer.

## Keputusan (Decision)
Kami memutuskan untuk menggunakan **Sanity.io v3** sebagai platform Headless CMS. Konten di-host di Sanity Cloud dan di-query menggunakan bahasa query GROQ di server-side Next.js.

## Konsekuensi (Consequences)
* **Dampak Positif:**
  * Pengalaman pengeditan visual yang luar biasa bagi admin melalui panel Sanity Studio.
  * Fleksibilitas skema konten terstruktur tinggi.
  * Skema gratisan (free tier) Sanity sangat melimpah dan memadai untuk kebutuhan situs company profile.
* **Dampak Negatif:**
  * Ketergantungan penuh pada layanan cloud pihak ketiga Sanity.io.
  * Perlu penanganan aset gambar khusus menggunakan CDN parser `@sanity/image-url`.
