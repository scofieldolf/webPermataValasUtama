import React from "react";
import type { Metadata } from "next";
import { Landmark, ShieldAlert, FileText } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan Ketentuan layanan transaksi penukaran valuta asing di PT Permata Valas Utama. Informasi mengenai dokumen persyaratan KYC/AML dan batas nominal transaksi.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/syarat-ketentuan`,
  },
};

export default function SyaratKetentuanPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 mb-12 text-center lg:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-pv-navy-deep">
          Syarat & Ketentuan
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-3xl">
          Ketentuan penggunaan layanan dan panduan resmi transaksi valuta asing di konter gerai PT Permata Valas Utama.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-8 space-y-8 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              1. Ketentuan Umum
            </h2>
            <p>
              Dengan mengakses website ini dan menggunakan jasa layanan penukaran uang asing yang ditawarkan oleh PT Permata Valas Utama, Anda setuju untuk terikat oleh Syarat & Ketentuan ini.
            </p>
            <p>
              Layanan kami tunduk pada hukum Negara Kesatuan Republik Indonesia, khususnya Peraturan Bank Indonesia mengenai Kegiatan Usaha Penukaran Valuta Asing Bukan Bank (KUPU BB).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              2. Persyaratan Identitas Diri (KYC)
            </h2>
            <p>
              Sesuai dengan ketentuan Bank Indonesia mengenai penerapan Program Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme (APU-PPT), nasabah wajib menunjukkan dokumen identitas fisik asli yang sah dan masih berlaku untuk setiap transaksi di gerai kami:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Warga Negara Indonesia (WNI):</strong> Kartu Tanda Penduduk (KTP) asli.
              </li>
              <li>
                <strong>Warga Negara Asing (WNA):</strong> Paspor asli yang sah serta izin tinggal yang valid jika diperlukan (KITAS/KITAP).
              </li>
            </ul>
            <p className="font-semibold text-pv-gold-primary">
              *Kami tidak menerima salinan dokumen identitas berupa fotokopi atau foto digital di ponsel pintar. Staf teller kami wajib melihat dokumen fisik asli guna mencegah pemalsuan identitas.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              3. Batasan Nominal & Dokumen Pendukung (Underlying Documents)
            </h2>
            <p>
              Berdasarkan peraturan Bank Indonesia yang berlaku, transaksi penukaran rupiah ke valuta asing (atau sebaliknya) dengan nominal bernilai ekuivalen <strong>USD 25.000 (Dua Puluh Lima Ribu Dollar Amerika Serikat)</strong> atau lebih per nasabah dalam jangka waktu 1 (satu) bulan wajib menyertakan dokumen pendukung transaksi (underlying documents) yang sah.
            </p>
            <p>Contoh underlying documents yang dapat diterima meliputi:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tiket penerbangan dan reservasi hotel untuk perjalanan luar negeri.</li>
              <li>Surat perjanjian pembayaran biaya pendidikan atau pengobatan di luar negeri.</li>
              <li>Dokumen impor/ekspor (Letter of Credit, Bill of Lading, Invoice Komersial) untuk kebutuhan korporasi.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              4. Sistem Pemesanan & Reservasi Kurs (Rate Booking)
            </h2>
            <p>
              Nasabah dapat mengajukan reservasi kurs melalui formulir online di website kami. Harap diperhatikan ketentuan berikut:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Nilai kurs yang tertera di website bersifat indikatif (estimasi) dan dapat berubah sewaktu-waktu mengikuti fluktuasi pasar global sebelum disepakati secara resmi.
              </li>
              <li>
                Reservasi kurs melalui website <strong>belum</strong> berstatus sebagai kontrak final. Staf gerai kami akan menghubungi Anda untuk konfirmasi persetujuan kurs dan ketersediaan stok fisik mata uang asing.
              </li>
              <li>
                Uang yang dipesan wajib diambil di konter gerai fisik pada hari yang sama dengan waktu kesepakatan konfirmasi. Jika tidak diambil sesuai tenggat waktu operasional, reservasi kurs dinyatakan batal secara otomatis.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              5. Kondisi Fisik Uang Kertas Asing (Bank Notes)
            </h2>
            <p>
              PT Permata Valas Utama hanya menerima penukaran uang asing kertas yang berada dalam kondisi fisik prima. Kami berhak menolak atau mengenakan potongan harga khusus (diskon rate) untuk uang kertas asing dengan kondisi sebagai berikut:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Terdapat noda tinta, stempel, coretan pulpen, atau kotoran yang signifikan.</li>
              <li>Kondisi fisik robek, berlubang, kusut/lecek parah, atau lembap/berjamur.</li>
              <li>Edisi cetakan seri lama yang telah ditarik dari peredaran oleh bank sentral negara asal.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              6. Batasan Tanggung Jawab
            </h2>
            <p>
              Meskipun kami berupaya menyajikan data kurs seakurat mungkin, nilai valuta asing berubah secara real-time. PT Permata Valas Utama tidak bertanggung jawab atas kerugian finansial langsung maupun tidak langsung yang timbul dari keputusan keuangan nasabah yang didasarkan semata-mata pada data indikatif di website ini sebelum dilakukan transaksi resmi di konter kami.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              7. Perubahan Ketentuan
            </h2>
            <p>
              Kami berhak untuk mengubah atau memperbarui Syarat & Ketentuan ini kapan saja tanpa pemberitahuan tertulis sebelumnya, guna menyesuaikan dengan kebijakan kepatuhan regulasi terbaru dari Bank Indonesia. Ketentuan terbaru akan selalu dipublikasikan di halaman ini.
            </p>
            <p className="text-[11px] text-gray-400 mt-6 italic">
              Terakhir diperbarui: 20 Juni 2026
            </p>
          </section>
        </div>

        {/* Right Column: Information Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-pv-ivory-surface/40 border border-pv-gold-light/20 rounded-2xl p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-pv-navy-deep text-pv-gold-light flex items-center justify-center flex-shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-pv-navy-deep">
                Informasi Regulasi
              </h3>
            </div>

            <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
              <p>
                Sebagai money changer berizin resmi Bank Indonesia:
              </p>
              <div className="bg-white/60 p-4 rounded-xl border border-gray-100 font-mono text-[11px] text-pv-navy-deep space-y-1">
                <div>No. Keputusan Izin BI:</div>
                <div className="font-bold text-pv-gold-primary">{SITE_CONFIG.licenseNumber}</div>
              </div>
              <div className="flex items-start space-x-2 bg-white/60 p-3 rounded-xl border border-gray-100">
                <FileText className="w-4 h-4 text-pv-gold-primary flex-shrink-0 mt-0.5" />
                <span className="text-[11px]">
                  Penyelenggaraan transaksi wajib mematuhi standar hukum anti-pencucian uang nasional.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
