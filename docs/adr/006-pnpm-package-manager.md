# 6. pnpm sebagai Package Manager Resmi

* **Tanggal:** 2026-06-17
* **Status:** Accepted

## Konteks (Context)
Proyek Next.js modern melibatkan ratusan subdependencies yang dapat membengkak di folder `node_modules`, memakan ruang penyimpanan lokal yang masif, dan memperlambat CI/CD pipeline selama proses deployment. Kita membutuhkan package manager yang cepat, efisien, dan mencegah instalasi dependensi siluman (phantom dependencies).

## Keputusan (Decision)
Kami memutuskan untuk menggunakan **pnpm** (performant npm) secara eksklusif untuk seluruh pengelolaan dependensi proyek, dan melarang penggunaan `npm` atau `yarn` secara bersamaan.

## Konsekuensi (Consequences)
* **Dampak Positif:**
  * Waktu instalasi hingga 3x lebih cepat dibanding npm/yarn karena sistem content-addressable store.
  * Efisiensi disk space lokal yang tinggi karena pnpm menggunakan hard-links untuk berbagi paket yang sama antar-proyek di komputer pengembang.
  * Resolusi dependensi yang ketat, memaksa pengembang mendaftarkan setiap modul yang diimpor di `package.json` secara transparan.
* **Dampak Negatif:**
  * Kadang terjadi kendala izin atau peringatan di lingkungan non-interaktif/non-TTY (seperti CI pipeline) jika memerlukan penghapusan direktori `node_modules` lama, namun ini dapat diatasi secara aman dengan flag `CI=true`.
