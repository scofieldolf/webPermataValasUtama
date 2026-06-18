# 5. Resend sebagai Email Service Provider

* **Tanggal:** 2026-06-17
* **Status:** Accepted

## Konteks (Context)
Setiap kali nasabah mengirim pesan lewat formulir "Hubungi Kami" atau mengajukan reservasi "Booking Kurs", sistem harus segera mengirimkan email notifikasi real-time berisi salinan pesan atau instruksi tindakan teller ke email operasional kantor money changer.

## Keputusan (Decision)
Kami memutuskan untuk menggunakan **Resend** sebagai Email Service Provider utama. Layanan ini diintegrasikan melalui library resmi `resend` di API Routes Next.js.

## Konsekuensi (Consequences)
* **Dampak Positif:**
  * Developer-friendly API dengan performa pengiriman email telegrafik yang cepat (<1s).
  * Dukungan pembuatan template HTML email yang modular.
  * Kuota free-tier 3000 email/bulan memadai untuk operasional pemesanan awal.
* **Dampak Negatif:**
  * Domain kustom perusahaan (`permatavalas.co.id`) harus ditambahkan dan dikonfigurasi record DNS-nya (DKIM, SPF) secara khusus di registrar agar email pengirim tidak masuk folder spam.
