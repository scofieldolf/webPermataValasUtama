import React from "react";
import type { Metadata } from "next";
import { ShieldCheck, Landmark, Users, Award, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil PT Permata Valas Utama. Money changer berizin resmi Bank Indonesia sejak 2026. Sejarah, visi misi, jajaran manajemen, dan kepatuhan hukum AML/CFT.",
};

export default function TentangPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 mb-12 text-center lg:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-pv-navy-deep">
          Tentang Permata Valas Utama
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-3xl">
          Mengetahui sejarah kami, komitmen kepatuhan hukum kami, serta nilai-nilai profesional yang kami bawa dalam setiap transaksi keuangan Anda.
        </p>
      </div>

      {/* Grid Layout: History & BI Badge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        {/* Left: Brand History & Vision */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-pv-navy-deep">
            Mitra Valuta Asing Terpercaya Anda
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Didirikan dengan komitmen untuk menjadi penyelenggara penukaran valuta asing terbaik di Jakarta, PT Permata Valas Utama hadir guna memberikan solusi keuangan yang transparan, aman, dan berorientasi penuh pada kenyamanan nasabah.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Dengan jaringan bank koresponden yang luas dan sistem pemantauan harga pasar yang canggih, kami menjamin penyediaan nilai kurs tukar yang sangat bersaing (kompetitif) untuk mata uang asing utama dunia seperti US Dollar, Singapore Dollar, Japanese Yen, Euro, dan lainnya.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <h4 className="font-serif text-sm font-bold text-pv-navy-deep mb-2">Visi Kami</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Menjadi money changer pilihan utama di Indonesia yang dikenal karena kredibilitas, kualitas layanan prima, dan kepatuhan hukum yang tanpa kompromi.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-pv-navy-deep mb-2">Misi Kami</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Menyediakan kurs yang kompetitif, memastikan setiap transaksi berjalan aman dengan verifikasi ketat, dan memfasilitasi kebutuhan korporasi dengan layanan antar-jemput profesional.
              </p>
            </div>
          </div>
        </div>

        {/* Right: BI Official License Showcase Card */}
        <div className="lg:col-span-5 bg-pv-navy-deep text-white rounded-3xl p-8 border border-pv-gold-dark/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-pv-gold-primary/10 rounded-full blur-2xl"></div>
          <div className="space-y-6 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pv-gold-light/20 flex items-center justify-center text-pv-gold-light shadow-inner">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-white">Status Regulasi Resmi</h3>
                <p className="text-[10px] text-pv-gold-light uppercase tracking-wider font-semibold">Bank Indonesia</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Penyelenggara KUPU BB</span>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Kegiatan Usaha Penukaran Valuta Asing Bukan Bank berizin resmi dan diawasi langsung oleh otoritas Bank Indonesia.
                </p>
              </div>

              <div className="bg-[#031d36] rounded-xl p-4 border border-pv-gold-dark/20 font-mono text-xs">
                <div className="text-gray-400 text-[10px] uppercase mb-1 font-sans">Nomor Keputusan / Izin BI</div>
                <div className="font-bold text-pv-gold-light text-sm tracking-wide">
                  {SITE_CONFIG.licenseNumber}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic leading-normal">
              *PT Permata Valas Utama secara ketat mematuhi Peraturan Bank Indonesia mengenai kewajiban pelaporan berkas transaksi valuta asing.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Management & Professionalism Section */}
      <section className="py-12 border-t border-gray-100">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-2xl font-bold text-pv-navy-deep">Tim Manajemen Profesional</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            PT Permata Valas Utama dikelola oleh para profesional berpengalaman di industri perbankan dan valuta asing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Executive 1 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-pv-navy-deep/10 text-pv-navy-deep flex items-center justify-center mx-auto text-xl font-bold font-serif">
              RY
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-pv-navy-deep">Ryan Kusuma</h4>
              <p className="text-[10px] text-pv-gold-primary uppercase font-bold tracking-wider mt-0.5">Direktur Utama</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Memiliki pengalaman lebih dari 15 tahun di manajemen perbankan ritel dan pengelolaan tresuri valas nasional.
            </p>
          </div>

          {/* Executive 2 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-pv-navy-deep/10 text-pv-navy-deep flex items-center justify-center mx-auto text-xl font-bold font-serif">
              IN
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-pv-navy-deep">Indra Wijaya</h4>
              <p className="text-[10px] text-pv-gold-primary uppercase font-bold tracking-wider mt-0.5">Direktur Kepatuhan (CCO)</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Spesialis audit kepatuhan hukum perbankan. Bertanggung jawab atas penerapan KYC/AML sesuai standar PPATK.
            </p>
          </div>

          {/* Executive 3 */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-pv-navy-deep/10 text-pv-navy-deep flex items-center justify-center mx-auto text-xl font-bold font-serif">
              DN
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-pv-navy-deep">Diana Ningsih</h4>
              <p className="text-[10px] text-pv-gold-primary uppercase font-bold tracking-wider mt-0.5">Kepala Operasional Gerai</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Memimpin tim teller dan pengawas ultraviolet cabang utama. Menjamin kelancaran & keamanan transaksi harian.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Anti-Money Laundering Commitment */}
      <section className="bg-pv-ivory-surface/40 border border-pv-gold-light/20 rounded-3xl p-6 lg:p-8 mt-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-12 h-12 rounded-xl bg-pv-navy-deep text-pv-gold-light flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-pv-navy-deep">Komitmen Anti Pencucian Uang & Pendanaan Terorisme (APU-PPT)</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sebagai lembaga penyedia jasa penukaran valuta asing terpercaya, kami mendukung penuh komitmen pemerintah Indonesia dan PPATK (Pusat Pelaporan dan Analisis Transaksi Keuangan) dalam mencegah tindak pidana pencucian uang dan pendanaan terorisme. Kami secara aktif melatih staf kami untuk mengidentifikasi dan melaporkan setiap transaksi mencurigakan (LTKM) demi menjaga kebersihan ekosistem keuangan Indonesia.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
