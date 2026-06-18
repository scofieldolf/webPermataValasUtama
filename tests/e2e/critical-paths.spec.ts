import { test, expect } from "@playwright/test";

test.describe("PT Permata Valas Utama - Critical User Paths E2E Tests", () => {

  // 1. Uji Muat Halaman Utama (Homepage Load)
  test("should load homepage successfully and show header ticker", async ({ page }) => {
    await page.goto("/");

    // Verifikasi Title Tag Ramah SEO
    await expect(page).toHaveTitle(/PT Permata Valas Utama | Money Changer Berizin Resmi Jakarta/);

    // Verifikasi Keberadaan Elemen Navigasi Utama (menggunakan .first() untuk menghindari duplikasi logo di header/footer)
    const logoText = page.locator("header").locator("text=PERMATA VALAS").first();
    await expect(logoText).toBeVisible();

    // Verifikasi Ticker Kurs di Atas Header
    const ticker = page.locator(".animate-marquee");
    await expect(ticker).toBeVisible();
  });

  // 2. Uji Kalkulator Konversi Valas
  test("should perform currency conversion simulation accurately in KalkCalc", async ({ page }) => {
    await page.goto("/");

    const amountInput = page.locator("#valas-amount");
    await expect(amountInput).toBeVisible();

    // Ketik nominal 2000
    await amountInput.fill("");
    await amountInput.type("2000");

    // Secara default arah transaksi "Saya Mau Jual Valas" (Beli), mata uang USD (16.250).
    // Estimasi Rupiah = 2000 * 16.250 = Rp 32.500.000
    const resultBox = page.locator("text=Rp 32.500.000");
    await expect(resultBox).toBeVisible();

    // Ubah arah transaksi ke "Saya Mau Beli Valas" (Jual) (16.350).
    // Estimasi Rupiah = 2000 * 16.350 = Rp 32.700.000
    const sellButton = page.locator("text=Saya Mau Beli Valas");
    await sellButton.click();
    await expect(page.locator("text=Rp 32.700.000")).toBeVisible();
  });

  // 3. Uji Filter Tabel Kurs Lengkap
  test("should filter exchange rates in KursTable", async ({ page }) => {
    await page.goto("/kurs");

    // Cek judul halaman
    await expect(page.locator("h1")).toContainText("Kurs Valuta Asing Hari Ini");

    const searchInput = page.locator('input[placeholder*="Cari mata uang"]');
    await expect(searchInput).toBeVisible();

    // Cari SGD
    await searchInput.fill("SGD");

    // Memastikan SGD terlihat (menggunakan selector spesifik untuk tabel)
    const sgdInTable = page.locator("table").locator("text=SGD").first();
    await expect(sgdInTable).toBeVisible();

    // Memastikan USD ter-filter/sembunyi
    await expect(page.locator("table").locator("text=USD")).not.toBeVisible();
  });

  // 4. Uji Formulir Hubungi Kami
  test("should submit Contact Form successfully", async ({ page }) => {
    await page.goto("/kontak");

    // Isi formulir hubungi kami
    await page.locator("#contact-name").fill("John Doe Test");
    await page.locator("#contact-phone").fill("081234567890");
    await page.locator("#contact-email").fill("johndoe@test.com");
    await page.locator("#contact-message").fill("Ini adalah pesan uji otomatis menggunakan Playwright.");

    // Klik submit
    await page.locator('button:has-text("Kirim Pesan")').click();

    // Tunggu durasi pengiriman 1.5 detik
    await page.waitForTimeout(2000);

    // Verifikasi success dialog
    const successMsg = page.locator("text=Pesan Berhasil Terkirim");
    await expect(successMsg).toBeVisible();
  });

  // 5. Uji Formulir Booking / Reservasi Kurs
  test("should submit Rate Reservation / Booking Form successfully", async ({ page }) => {
    await page.goto("/kontak");

    // Isi formulir booking
    await page.locator("#booking-name").fill("Jane Doe Test");
    await page.locator("#booking-phone").fill("089876543210");
    await page.locator("#booking-currency").selectOption("EUR");
    await page.locator("#booking-amount").fill("5000");

    // Klik submit
    await page.locator('button:has-text("Kirim Pengajuan Booking")').click();

    // Tunggu durasi pengiriman 1.5 detik
    await page.waitForTimeout(2000);

    // Verifikasi kemunculan Kode Booking
    const successTitle = page.locator("text=Reservasi Anda Terdaftar");
    await expect(successTitle).toBeVisible();

    const bookingCode = page.locator("text=PV-");
    await expect(bookingCode).toBeVisible();
  });

  // 6. Uji Halaman Lokasi Cabang & Maps
  test("should render branch location address and google maps embed", async ({ page }) => {
    await page.goto("/lokasi");

    // Memastikan alamat cabang utama tampil di bagian main content
    const addressText = page.locator("main").locator("text=Sudirman Central Business District").first();
    await expect(addressText).toBeVisible();

    // Memastikan Google Maps iframe ter-render
    const mapsIframe = page.locator('iframe[title*="Peta Lokasi Kantor Utama"]');
    await expect(mapsIframe).toBeVisible();
  });

});
