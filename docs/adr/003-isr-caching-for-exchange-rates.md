# 3. Incremental Static Regeneration (ISR) 5 Menit untuk Data Kurs

* **Tanggal:** 2026-06-17
* **Status:** Accepted

## Konteks (Context)
Website money changer harus menyajikan informasi kurs jual dan beli valuta asing yang tepercaya. Kurs valuta asing bergerak dinamis sepanjang hari. Jika kita melakukan fetch data real-time langsung ke API luar di setiap request nasabah, kuota API key (seperti ExchangeRate API) akan cepat habis dan loading halaman akan lambat. Sebaliknya, jika data di-cache terlalu lama (misal 1 jam), harga kurs akan basi (stale) dan dapat memicu kerugian selisih kurs saat transaksi fisik.

## Keputusan (Decision)
Kami memutuskan untuk menggunakan Next.js Incremental Static Regeneration (ISR) dengan parameter `revalidate = 300` (5 menit) di halaman `/kurs` dan API Route `/api/kurs`.

## Konsekuensi (Consequences)
* **Dampak Positif:**
  * Pengunjung menerima halaman instan karena data diambil dari cache CDN terdekat.
  * Hemat kuota API luar secara signifikan (maksimal hanya 12 panggilan API per jam per mata uang, terlepas dari berapa ribu pengunjung yang mengakses).
  * Data tetap segar (stale-while-revalidate) dengan toleransi selisih waktu maksimal hanya 5 menit, yang sangat aman untuk skala bisnis money changer gerai.
* **Dampak Negatif:**
  * Pergerakan harga dalam rentang detik tidak tercermin langsung di web. Untuk penukaran skala raksasa, nasabah tetap diarahkan untuk mengonfirmasi rate langsung via WhatsApp/Telepon.
