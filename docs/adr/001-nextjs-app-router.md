# 1. Next.js 14 App Router sebagai Framework Utama

* **Tanggal:** 2026-06-17
* **Status:** Accepted

## Konteks (Context)
Website company profile PT Permata Valas Utama menuntut performa muatan awal (LCP) yang sangat cepat di perangkat seluler seluler 4G (<2.5s) dan optimasi SEO ramah mesin pencari guna memenangkan kata kunci lokal seperti "money changer Jakarta". Selain itu, data kurs valas memerlukan pembaruan berkala tanpa harus membebani kuota batas API eksternal yang terbatas.

## Keputusan (Decision)
Kami memutuskan untuk menggunakan **Next.js 14** dengan arsitektur **App Router** sebagai framework utama. Kami memanfaatkan React Server Components (RSC) secara bawaan untuk meminimalisasi JavaScript di sisi klien dan mengadopsi teknik caching ISR (Incremental Static Regeneration).

## Konsekuensi (Consequences)
* **Dampak Positif:**
  * Kecepatan muat halaman instan karena rendering dilakukan di server (SSR).
  * Struktur metadata dinamis Next.js sangat ramah crawler Google (SEO-friendly).
  * Halaman kurs dapat di-cache secara statis di CDN edge server dan diperbarui berkala secara aman.
* **Dampak Negatif:**
  * Kurva pembelajaran (learning curve) pengembangan lebih curam dibanding Pages Router klasik.
  * Library pihak ketiga lama yang belum sepenuhnya mendukung RSC harus diatur dengan directive `'use client'` secara selektif.
