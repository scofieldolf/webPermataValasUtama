import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Sparkles, MapPin, BadgeCheck, CheckCircle2, TrendingUp, Users, ArrowRight } from "lucide-react";
import { KalkCalc } from "@/components/kurs/kalk-calc";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

// Mock data mata uang populer untuk beranda
const popularCurrencies = [
  { kode: "USD", nama: "US Dollar", bendera: "🇺🇸", beli: 16250, jual: 16350, perubahan: "+0.15%" },
  { kode: "SGD", nama: "Singapore Dollar", bendera: "🇸🇬", beli: 12050, jual: 12150, perubahan: "-0.05%" },
  { kode: "JPY", nama: "Japanese Yen", bendera: "🇯🇵", beli: 103.5, jual: 104.8, perubahan: "+0.22%" },
  { kode: "EUR", nama: "Euro", bendera: "🇪🇺", beli: 17450, jual: 17600, perubahan: "0.00%" },
  { kode: "AUD", nama: "Australian Dollar", bendera: "🇦🇺", beli: 10780, jual: 10890, perubahan: "-0.12%" },
  { kode: "GBP", nama: "British Pound", bendera: "🇬🇧", beli: 20650, jual: 20850, perubahan: "+0.45%" },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "LocalBusiness"],
    "name": "PT Permata Valas Utama",
    "image": `${SITE_CONFIG.url}/images/og-image.jpg`,
    "telephon": SITE_CONFIG.contact.phone, // fallback typo check
    "telephone": SITE_CONFIG.contact.phone,
    "url": SITE_CONFIG.url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.contact.address.street,
      "addressLocality": SITE_CONFIG.contact.address.locality,
      "addressRegion": SITE_CONFIG.contact.address.region,
      "postalCode": SITE_CONFIG.contact.address.postalCode,
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.221063,
      "longitude": 106.783688
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": SITE_CONFIG.contact.operatingHours.weekdays.opens,
        "closes": SITE_CONFIG.contact.operatingHours.weekdays.closes
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "PublicHolidays"],
        "opens": SITE_CONFIG.contact.operatingHours.weekends.opens,
        "closes": SITE_CONFIG.contact.operatingHours.weekends.closes
      }
    ],
    "priceRange": "$$",
    "award": `KP: ${SITE_CONFIG.licenseNumber} (Izin KUPU BB Bank Indonesia)`
  };

  return (
    <div className="w-full">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <section className="relative bg-[#042C53] text-white pt-12 pb-20 lg:pt-16 lg:pb-32 overflow-hidden">
        {/* Background Decorative Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0A3D6E] via-[#042C53] to-[#011427] opacity-90 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading & Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-pv-gold-light/10 border border-pv-gold-light/20 px-3 py-1.5 rounded-full text-xs text-pv-gold-light font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-pv-gold-primary" />
                <span>Money Changer Berizin Resmi Bank Indonesia</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-white">
                Tukar Valuta Asing Aman & <span className="text-pv-gold-light">Kurs Kompetitif</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                PT Permata Valas Utama melayani penukaran valas perorangan dan korporat secara resmi. Kami menawarkan transaksi yang aman, transparan, dan tepercaya dengan dukungan tim profesional.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/kurs"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-pv-gold-primary hover:bg-pv-gold-dark text-white text-sm font-bold shadow-lg transition-colors duration-200"
                >
                  Lihat Kurs Hari Ini
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/layanan"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors duration-200"
                >
                  Pelajari Layanan
                </Link>
              </div>
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-6">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-pv-gold-light">100%</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Resmi & Berizin</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-pv-gold-light">15+</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Mata Uang Utama</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-pv-gold-light">10rb+</div>
                  <div className="text-[10px] sm:text-xs text-gray-400">Nasabah Puas</div>
                </div>
              </div>
            </div>

            {/* Right Column: Calculator */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
              <KalkCalc />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Exchange Rates Table Section */}
      <section className="py-16 bg-white relative -mt-8 z-20 rounded-t-[32px] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-serif text-2xl lg:text-3xl font-extrabold text-pv-navy-deep">
              Kurs Populer Hari Ini
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Daftar nilai tukar mata uang asing terpopuler yang diupdate secara berkala.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCurrencies.map((c) => (
              <div
                key={c.kode}
                className="bg-gray-50 border border-gray-100 hover:border-pv-gold-light/40 rounded-xl p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between border-b border-gray-200/50 pb-3 mb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl" role="img" aria-label={`Bendera ${c.nama}`}>
                      {c.bendera}
                    </span>
                    <div>
                      <div className="font-bold text-pv-navy-deep text-sm">{c.kode}</div>
                      <div className="text-[10px] text-gray-500">{c.nama}</div>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded",
                      c.perubahan.startsWith("+") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                    )}
                  >
                    {c.perubahan}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-white border border-gray-100 rounded-lg py-2">
                    <div className="text-gray-400 text-[9px] uppercase font-semibold">Beli (We Buy)</div>
                    <div className="font-mono font-bold text-pv-navy-deep mt-0.5">
                      Rp {new Intl.NumberFormat("id-ID").format(c.beli)}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-lg py-2">
                    <div className="text-gray-400 text-[9px] uppercase font-semibold">Jual (We Sell)</div>
                    <div className="font-mono font-bold text-pv-navy-deep mt-0.5">
                      Rp {new Intl.NumberFormat("id-ID").format(c.jual)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/kurs"
              className="inline-flex items-center text-xs font-bold text-pv-gold-primary hover:text-pv-gold-dark hover:underline"
            >
              Lihat Seluruh Nilai Tukar Mata Uang
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-16 bg-pv-ivory-surface/40 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl font-extrabold text-pv-navy-deep">
              Keunggulan Permata Valas Utama
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Komitmen kami adalah menghadirkan rasa aman dan kepuasan maksimal di setiap penukaran uang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-lg bg-pv-navy-deep text-pv-gold-light flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-pv-navy-deep">
                Resmi & Diawasi Bank Indonesia
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Kami beroperasi di bawah izin resmi Kegiatan Usaha Penukaran Valuta Asing Bukan Bank (KUPU) dari Bank Indonesia. Kepatuhan hukum dan KYC/AML adalah prioritas kami.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-lg bg-pv-navy-deep text-pv-gold-light flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-pv-navy-deep">
                Kurs Terbaik & Kompetitif
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Kami senantiasa memantau fluktuasi pasar global untuk memberikan nilai tukar terbaik dan bersaing bagi nasabah ritel maupun korporasi.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-lg bg-pv-navy-deep text-pv-gold-light flex items-center justify-center">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-pv-navy-deep">
                Layanan Antar Jemput Korporasi
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Bagi nasabah korporat dengan transaksi reguler dalam jumlah besar, kami menyediakan layanan reservasi khusus dan pengantaran terproteksi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Steps to Transact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image or Visual */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl lg:text-3xl font-extrabold text-pv-navy-deep">
                Prosedur Penukaran Valuta Asing Yang Aman
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Untuk memenuhi kepatuhan regulasi Bank Indonesia mengenai pencegahan pencucian uang, berikut tata cara penukaran uang di gerai kami:
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-pv-gold-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-pv-navy-deep">Bawa Identitas Asli yang Sah</h4>
                    <p className="text-[11px] text-gray-500">Wajib membawa KTP (WNI) atau Paspor (WNA) asli yang masih aktif.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-pv-gold-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-pv-navy-deep">Pemeriksaan Uang Bersama</h4>
                    <p className="text-[11px] text-gray-500">Seluruh uang fisik diverifikasi bersama menggunakan detektor valuta ultraviolet profesional.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-pv-gold-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-pv-navy-deep">Dapatkan Nota Resmi Penukaran</h4>
                    <p className="text-[11px] text-gray-500">Setiap transaksi dicatat resmi dan nasabah menerima nota berizin Bank Indonesia.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: CTA Banner */}
            <div className="bg-pv-navy-deep rounded-2xl p-8 text-white relative overflow-hidden shadow-lg border border-pv-gold-dark/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pv-gold-primary/10 rounded-full blur-2xl"></div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">Butuh Transaksi Nominal Besar?</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Untuk penukaran dengan nominal setara USD 5,000 ke atas, kami sarankan melakukan reservasi (booking) kurs terlebih dahulu untuk mengunci rate terbaik dan mengamankan ketersediaan stok fisik mata uang asing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-pv-gold-primary hover:bg-pv-gold-dark text-white text-xs font-bold transition-all shadow"
                >
                  Reservasi Kurs Sekarang
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all"
                >
                  Telepon Cabang
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Google Review / Testimonial Section */}
      <section className="py-16 bg-pv-ivory-surface/30 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl font-extrabold text-pv-navy-deep">
              Apa Kata Nasabah Kami
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Kepercayaan nasabah adalah aset terbesar bagi PT Permata Valas Utama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-1 text-yellow-500 text-sm">★★★★★</div>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                &quot;Tempat tukar uang paling aman di Jakarta. Kurs dollar dan yen sangat bersaing dibanding money changer lain. Pelayanan cepat dan ada ruang tunggu ber-AC.&quot;
              </p>
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-[11px]">
                <span className="font-bold text-pv-navy-deep">Budi Santoso</span>
                <span className="text-gray-400">Nasabah Perorangan</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-1 text-yellow-500 text-sm">★★★★★</div>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                &quot;Kami mempercayakan transaksi valas korporat bulanan kantor kami di Permata Valas. Layanan antar terproteksi sangat membantu meminimalkan risiko pengantaran uang fisik.&quot;
              </p>
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-[11px]">
                <span className="font-bold text-pv-navy-deep">PT Samudra Logistik</span>
                <span className="text-gray-400">Nasabah Korporat</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-1 text-yellow-500 text-sm">★★★★★</div>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                &quot;Lokasinya sangat strategis di pusat SCBD. Kurs selalu di-update transparan di web sebelum kita datang, jadi tidak ada manipulasi rate tersembunyi. Highly recommended!&quot;
              </p>
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-[11px]">
                <span className="font-bold text-pv-navy-deep">Amanda Clarissa</span>
                <span className="text-gray-400">Traveler / Eksekutif Muda</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
