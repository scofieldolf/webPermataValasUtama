import type { MataUang } from "@/types/kurs";

export const SITE_CONFIG = {
  name: "PT Permata Valas Utama",
  shortName: "Permata Valas",
  description:
    "Pusat penukaran valuta asing berizin resmi Bank Indonesia. Kurs kompetitif, aman, tepercaya, dan berorientasi pada kepuasan nasabah.",
  url: "https://permatavalas.co.id", // Placeholder production URL
  licenseNumber: "KP: 12/345/KEP/DIR/2026", // Mock izin resmi Bank Indonesia
  contact: {
    whatsapp: "6281234567890", // Format internasional tanpa '+'
    whatsappDisplay: "+62 812-3456-7890",
    phone: "+62 21 555 1234",
    email: "info@permatavalas.co.id",
    address:
      "Sudirman Central Business District (SCBD), Gedung Permata Tower Lt. Dasar, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, 12190",
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.254714652259!2d106.80879687498045!3d-6.223482593764655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14cf4c76a59%3A0x89ee1722e0329ff0!2sSudirman%20Central%20Business%20District!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  },
  socials: {
    instagram: "https://instagram.com/permatavalas",
    facebook: "https://facebook.com/permatavalas",
  },
  navLinks: [
    { label: "Beranda", href: "/" },
    { label: "Kurs Hari Ini", href: "/kurs" },
    { label: "Layanan", href: "/layanan" },
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Lokasi Cabang", href: "/lokasi" },
    { label: "Hubungi Kami", href: "/kontak" },
  ],
  currencies: [
    { kode: "USD", nama: "US Dollar", bendera: "🇺🇸", negara: "Amerika Serikat" },
    { kode: "SGD", nama: "Singapore Dollar", bendera: "🇸🇬", negara: "Singapura" },
    { kode: "JPY", nama: "Japanese Yen", bendera: "🇯🇵", negara: "Jepang" },
    { kode: "EUR", nama: "Euro", bendera: "🇪🇺", negara: "Uni Eropa" },
    { kode: "AUD", nama: "Australian Dollar", bendera: "🇦🇺", negara: "Australia" },
    { kode: "HKD", nama: "Hong Kong Dollar", bendera: "🇭🇰", negara: "Hong Kong" },
    { kode: "GBP", nama: "British Pound", bendera: "🇬🇧", negara: "Inggris" },
    { kode: "CNY", nama: "Chinese Yuan", bendera: "🇨🇳", negara: "Tiongkok" },
    { kode: "MYR", nama: "Malaysian Ringgit", bendera: "🇲🇾", negara: "Malaysia" },
    { kode: "THB", nama: "Thai Baht", bendera: "🇹🇭", negara: "Thailand" },
    { kode: "SAR", nama: "Saudi Riyal", bendera: "🇸🇦", negara: "Arab Saudi" },
    { kode: "KRW", nama: "Korean Won", bendera: "🇰🇷", negara: "Korea Selatan" },
  ] as MataUang[],
  faqs: [
    {
      question: "Apakah PT Permata Valas Utama merupakan money changer resmi?",
      answer:
        "Ya, kami adalah Penyelenggara Kegiatan Usaha Penukaran Valuta Asing Bukan Bank (KUPU BB) resmi berizin dan diawasi oleh Bank Indonesia dengan nomor izin resmi KP: 12/345/KEP/DIR/2026.",
    },
    {
      question: "Apa saja dokumen yang harus dibawa untuk bertransaksi?",
      answer:
        "Berdasarkan peraturan Bank Indonesia (KYC/AML), nasabah wajib membawa kartu identitas diri yang sah dan masih berlaku: KTP (untuk WNI) atau Paspor (untuk WNA). Untuk transaksi korporat, diperlukan fotokopi NIB, NPWP, dan identitas direksi.",
    },
    {
      question: "Dapatkah saya memesan atau mengunci kurs terlebih dahulu?",
      answer:
        "Ya. Anda dapat melakukan pemesanan (booking/reservasi) kurs melalui website ini pada halaman Kontak & Booking, atau menghubungi kami langsung via WhatsApp untuk transaksi dengan volume tertentu agar kurs Anda terkunci selama waktu yang disepakati.",
    },
    {
      question: "Apakah ada batas nominal transaksi penukaran?",
      answer:
        "Secara hukum tidak ada batas nominal maksimal, namun untuk penukaran rupiah dengan nilai ekuivalen USD 25,000 atau lebih per bulan, nasabah wajib menyerahkan dokumen pendukung (underlying document) transaksi sesuai ketentuan Bank Indonesia.",
    },
  ],
};
