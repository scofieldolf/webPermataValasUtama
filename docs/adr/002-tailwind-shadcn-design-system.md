# 2. Tailwind CSS + shadcn/ui sebagai Design System

* **Tanggal:** 2026-06-17
* **Status:** Accepted

## Konteks (Context)
Desain visual web PT Permata Valas Utama harus merepresentasikan tone "premium banking" Asia Tenggara dengan skema warna yang elegan, tipografi yang kokoh, dan responsivitas seluler (mobile-first) yang sempurna. Kita membutuhkan komponen antarmuka (seperti tombol, dialog, tabel, FAQ accordion) yang bisa dikustomisasi secara penuh tanpa menambah beban ukuran bundle JavaScript eksternal yang besar.

## Keputusan (Decision)
Kami memutuskan untuk menggunakan **Tailwind CSS v3** sebagai mesin styling utility-first, yang dikombinasikan dengan **shadcn/ui** sebagai pustaka komponen dasar. 

## Konsekuensi (Consequences)
* **Dampak Positif:**
  * Ukuran CSS sangat kecil karena Tailwind menyeka (purge) utilitas yang tidak terpakai saat build.
  * Komponen shadcn/ui di-copy langsung ke dalam codebase (`src/components/ui`), memberikan kontrol penuh atas kode sumber komponen tanpa ketergantungan NPM (no node_modules bloat).
  * Komponen shadcn dibangun di atas Radix UI primitif yang terjamin aksesibilitasnya secara bawaan (WCAG AA compliant).
* **Dampak Negatif:**
  * Penambahan komponen shadcn harus dilakukan satu per satu menggunakan CLI.
  * Pembaruan komponen harus di-maintenance secara manual oleh tim internal jika ada pembaruan di repositori utama shadcn.
