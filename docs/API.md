# Dokumentasi API & Modul Kode — PT Permata Valas Utama

Dokumen ini menyediakan spesifikasi lengkap untuk seluruh rute API, modul logika tresuri, utilitas pembantu, dan klien CMS yang diimplementasikan pada proyek website company profile Permata Valas Utama.

---

## Tabel Referensi Cepat

### 1. Rute API (API Endpoints)
| HTTP Method | Endpoint | Fungsi / Kegunaan | Tipe Akses | Cache (ISR) |
|---|---|---|---|---|
| **GET** | [`/api/kurs`](#1-get-apikurs) | Mengambil daftar nilai tukar kurs valuta asing terkini. | Publik | 5 Menit (300s) |
| **POST** | [`/api/contact`](#2-post-apicontact) | Mengirimkan pesan formulir kontak umum dan memicu email via Resend. | Publik | No Cache |
| **POST** | [`/api/booking`](#3-post-apibooking) | Mengajukan reservasi/booking nominal kurs valas tertentu untuk gerai. | Publik | No Cache |

### 2. Modul Logika & Utilitas (Code Modules)
| Modul | Fungsi | Kegunaan | Tipe Return |
|---|---|---|---|
| [`src/lib/kurs.ts`](#4-modul-logika-kurs-srclibkursts) | `fetchLatestRates()` | Menarik data dari API luar, membalik rate, memotong spread, & mock fallback. | `Promise<KursResponse>` |
| [`src/lib/kurs.ts`](#4-modul-logika-kurs-srclibkursts) | `getMockRates()` | Menghasilkan data simulasi kurs dengan fluktuasi acak untuk offline mode. | `KursData[]` |
| [`src/lib/utils.ts`](#5-modul-utilitas-srclibutilsts) | `cn(...inputs)` | Helper penggabungan kelas Tailwind dengan resolusi konflik `tailwind-merge`. | `string` |
| [`src/lib/utils.ts`](#5-modul-utilitas-srclibutilsts) | `formatRupiah(val)` | Memformat nilai angka numerik menjadi format mata uang Rupiah Indonesia (IDR). | `string` |
| [`src/lib/utils.ts`](#5-modul-utilitas-srclibutilsts) | `formatNumber(val)` | Memformat nilai numerik dengan pembulatan 2 desimal standar Indonesia. | `string` |
| [`src/lib/sanity/client.ts`](#6-sanity-cms-client-srclibsanityclientts) | `urlFor(source)` | Memetakan objek gambar Sanity menjadi URL CDN teroptimasi. | `ImageUrlBuilder` |

---

## Detail Rute API (API Endpoints)

### 1. GET `/api/kurs`
Mengembalikan daftar nilai tukar valuta asing terkini terhadap Rupiah (IDR) untuk 15 mata uang utama.

*   **Header Caching:**
    *   `Cache-Control: public, s-maxage=300, stale-while-revalidate=59`
*   **Format Response Sukses (Status 200):**
    ```json
    {
      "success": true,
      "data": {
        "rates": [
          {
            "kode": "USD",
            "beli": 16250,
            "jual": 16350,
            "perubahan": 0.15,
            "tren": "up"
          },
          {
            "kode": "JPY",
            "beli": 103.5,
            "jual": 104.8,
            "perubahan": 0.22,
            "tren": "up"
          }
        ],
        "timestamp": "2026-06-17T08:35:00.000Z"
      }
    }
    ```
*   **Format Response Gagal (Status 500):**
    ```json
    {
      "success": false,
      "error": {
        "code": "KURS_FETCH_FAILED",
        "message": "Gagal menarik data kurs terupdate"
      }
    }
    ```

---

### 2. POST `/api/contact`
Menampung pengiriman formulir kontak umum ("Hubungi Kami"), memverifikasi spam bot via reCAPTCHA v3, dan mengirim surel (email) detail pesan ke email korporat perusahaan.

*   **Parameter Request Body (JSON):**
    *   `nama` (string, wajib): Nama lengkap pengirim.
    *   `email` (string, wajib): Alamat email aktif pengirim.
    *   `telepon` (string, wajib): Nomor kontak aktif pengirim.
    *   `pesan` (string, wajib): Detail pesan/pertanyaan.
    *   `recaptchaToken` (string, opsional): Token validasi bot dari Google reCAPTCHA v3.
*   **Format Response Sukses (Status 200):**
    ```json
    {
      "success": true,
      "message": "Pesan Anda berhasil dikirim.",
      "timestamp": "2026-06-17T08:35:00.000Z"
    }
    ```
*   **Format Response Gagal (Status 400 / 500):**
    *   *Validation Error (400):*
        ```json
        {
          "success": false,
          "error": {
            "code": "VALIDATION_ERROR",
            "message": "Semua kolom wajib diisi (Nama, Email, Telepon, Pesan)"
          }
        }
        ```
    *   *Bot Detected (400):*
        ```json
        {
          "success": false,
          "error": {
            "code": "BOT_DETECTED",
            "message": "Aktivitas bot terdeteksi. Silakan coba kembali."
          }
        }
        ```

---

### 3. POST `/api/booking`
Mengajukan formulir booking/reservasi kurs valas untuk mengamankan ketersediaan stok fisik bank notes dan mengunci kurs di gerai utama.

*   **Parameter Request Body (JSON):**
    *   `nama` (string, wajib): Nama lengkap nasabah (sesuai identitas KTP/Paspor).
    *   `telepon` (string, wajib): Nomor WhatsApp aktif untuk follow up.
    *   `valas` (string, wajib): Kode mata uang asing yang direservasi (contoh: "USD", "SGD", "JPY").
    *   `nominal` (string/number, wajib): Jumlah nominal valas yang dipesan.
    *   `tipe` (string, wajib): Arah transaksi, harus bernilai `"beli"` (nasabah menyerahkan valas ke gerai) atau `"jual"` (nasabah membeli valas dari gerai).
    *   `recaptchaToken` (string, opsional): Token validasi bot dari Google reCAPTCHA v3.
*   **Format Response Sukses (Status 200):**
    ```json
    {
      "success": true,
      "data": {
        "bookingCode": "PV-659321",
        "timestamp": "2026-06-17T08:35:00.000Z"
      },
      "message": "Pengajuan booking berhasil dikirim."
    }
    ```
*   **Format Response Gagal (Status 400 / 500):**
    *   *Process Error (500):*
        ```json
        {
          "success": false,
          "error": {
            "code": "BOOKING_PROCESS_FAILED",
            "message": "Gagal memproses pengajuan booking Anda"
          }
        }
        ```

---

## Detail Modul Logika & Utilitas (Code Modules)

### 4. Modul Logika Kurs (`src/lib/kurs.ts`)
Mengatur integrasi dengan ExchangeRate API luar dan memotong rate tengah dengan spread beli/jual money changer.

#### `fetchLatestRates()`
*   **Signature:** `export async function fetchLatestRates(): Promise<KursResponse>`
*   **Deskripsi:** Mengambil rates valas terhadap Rupiah (IDR), membalik kurs (`1 / rate`), menerapkan scaling khusus Yen (x100) dan Won (x1000), mengalikan spread beli/jual, membulatkannya ke puluhan terdekat, dan memberikan response data lengkap. Mengaktifkan *mock fallback logic* secara otomatis jika API down atau key tidak terdeteksi.
*   **Contoh Penggunaan:**
    ```typescript
    import { fetchLatestRates } from "@/lib/kurs";
    
    const response = await fetchLatestRates();
    console.log(`USD Beli: Rp ${response.rates.find(r => r.kode === "USD")?.beli}`);
    ```

#### `getMockRates()`
*   **Signature:** `export function getMockRates(): KursData[]`
*   **Deskripsi:** Menghasilkan array static 15 mata uang utama dengan nilai jual/beli ter-spread dan fluktuasi persen acak kecil (tren naik/turun/flat) untuk mode offline.
*   **Contoh Penggunaan:**
    ```typescript
    import { getMockRates } from "@/lib/kurs";
    const mockRates = getMockRates();
    ```

---

### 5. Modul Utilitas (`src/lib/utils.ts`)
Kumpulan fungsi utilitas ringan untuk formatting layout & data.

#### `cn(...inputs)`
*   **Signature:** `export function cn(...inputs: ClassValue[]): string`
*   **Deskripsi:** Menggabungkan nama kelas CSS Tailwind dan secara cerdas menyelesaikan konflik utilitas (misal `px-2` vs `px-4`) menggunakan library `tailwind-merge` dan `clsx`.
*   **Contoh Penggunaan:**
    ```typescript
    import { cn } from "@/lib/utils";
    const cssClass = cn("px-2 py-1", isHovered && "bg-pv-gold-light", "px-4");
    // Output: "py-1 bg-pv-gold-light px-4"
    ```

#### `formatRupiah(value)`
*   **Signature:** `export function formatRupiah(value: number): string`
*   **Deskripsi:** Memformat angka menjadi format mata uang Rupiah Indonesia (`Rp 15.000`) menggunakan API `Intl.NumberFormat` lokal.
*   **Contoh Penggunaan:**
    ```typescript
    import { formatRupiah } from "@/lib/utils";
    const formatted = formatRupiah(15000); // Output: "Rp 15.000"
    ```

#### `formatNumber(value)`
*   **Signature:** `export function formatNumber(value: number): string`
*   **Deskripsi:** Memformat angka finansial dengan pembulatan 2 desimal di belakang koma berstandar Indonesia (`15.000,00`).
*   **Contoh Penggunaan:**
    ```typescript
    import { formatNumber } from "@/lib/utils";
    const formatted = formatNumber(15000.75); // Output: "15.000,75"
    ```

---

### 6. Sanity CMS Client (`src/lib/sanity/client.ts`)
Modul inisialisasi klien headless CMS Sanity untuk penarikan konten dinamis.

#### `urlFor(source)`
*   **Signature:** `export function urlFor(source: any): ImageUrlBuilder`
*   **Deskripsi:** Menerima objek metadata gambar dari Sanity database dan mengembalikan builder URL CDN optimal untuk di-render di browser.
*   **Contoh Penggunaan:**
    ```typescript
    import { urlFor } from "@/lib/sanity/client";
    
    const imageUrl = urlFor(post.mainImage).width(800).url();
    ```
