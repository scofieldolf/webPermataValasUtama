# Dead Code Audit & Removal Report

Dokumen ini merangkum hasil pemindaian kode mati (dead code), variabel tak terpakai, import tidak digunakan, dan optimasi pembersihan berkas pada proyek **PT Permata Valas Utama**.

## Ringkasan Temuan

Pemindaian dilakukan secara menyeluruh menggunakan `eslint` dan TypeScript Compiler. Berikut adalah ringkasan hasil audit:

| Kategori | Status | Temuan | Tindakan |
|---|---|---|---|
| **Unused Imports** | Clean (0) | Tidak ada import yang tidak terpakai. | Tidak ada |
| **Unused Variables** | Clean (0) | Tidak ada deklarasi variabel yang sia-sia. | Tidak ada |
| **Unreachable Code** | Clean (0) | Seluruh percabangan logika (logic branches) dapat dicapai. | Tidak ada |
| **Unused Functions** | Clean (0) | Seluruh helper dan modul utilitas terpanggil dengan baik. | Tidak ada |
| **JSX Entities** | 8 Errors | Terdapat penggunaan karakter tanda kutip ganda literal (`"`) di JSX. | Diganti dengan `&quot;` demi kebersihan format JSX. |

## Detail Pembersihan

### 1. Perbaikan Karakter Tidak Ter-escape di JSX (React Entities)
*   **Berkas:** `src/app/(site)/page.tsx`
    *   *Baris:* 284, 296, 308
    *   *Kode Mati/Vulnerable:* Penggunaan tanda kutip ganda literal (`"`) di dalam elemen `<p>` untuk ulasan testimoni.
    *   *Perbaikan:* Mengubah `"` menjadi `&quot;` di awal dan akhir kutipan.
*   **Berkas:** `src/components/kurs/kurs-table.tsx`
    *   *Baris:* 157
    *   *Kode Mati/Vulnerable:* Penggunaan tanda kutip ganda literal (`"`) untuk string pencarian yang tidak ditemukan (`Mata uang "{searchTerm}" tidak ditemukan`).
    *   *Perbaikan:* Mengubah `"` menjadi `&quot;` (`Mata uang &quot;{searchTerm}&quot; tidak ditemukan`).

---
*Laporan ini dihasilkan secara otomatis pada 2026-06-17 sebagai bagian dari pembersihan dan optimalisasi kualitas kode.*
