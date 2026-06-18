import React from "react";
import type { Metadata } from "next";
import { ShieldAlert, Landmark, CircleDollarSign, ArrowRightLeft, FileSpreadsheet, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Layanan Penukaran Valas",
  description:
    "Detail layanan penukaran uang kertas asing (bank notes), pengiriman uang ke luar negeri (remittance), dan layanan antar-jemput korporasi berizin resmi Bank Indonesia.",
};

export default function LayananPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 mb-12 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-pv-navy-deep">
          Layanan Valuta Asing
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
          PT Permata Valas Utama menyediakan berbagai solusi transaksi valuta asing terintegrasi untuk kebutuhan finansial perorangan maupun korporasi.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Service 1 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-pv-gold-light/40 text-pv-gold-dark flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-pv-navy-deep">Penukaran Uang Kertas Asing (Bank Notes)</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Kami melayani pembelian dan penjualan mata uang kertas asing (bank notes) dari berbagai negara utama di dunia dengan kondisi fisik terbaik. Kami menjamin keaslian setiap lembar uang yang ditukarkan melalui verifikasi detektor UV profesional.
            </p>
            <ul className="text-xs text-gray-500 space-y-2 pt-2">
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Menyediakan pecahan kecil hingga besar</li>
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Kurs referensi harian yang transparan</li>
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Ruang transaksi aman dan nyaman</li>
            </ul>
          </div>
        </div>

        {/* Service 2 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-pv-gold-light/40 text-pv-gold-dark flex items-center justify-center">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-pv-navy-deep">Pengiriman Uang Luar Negeri (Outward Remittance)</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Kirim dana ke mitra bisnis, keluarga, atau biaya pendidikan di luar negeri secara aman dan cepat. Kami memproses transfer valuta asing ke bank koresponden di seluruh belahan dunia dengan jaringan tepercaya.
            </p>
            <ul className="text-xs text-gray-500 space-y-2 pt-2">
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Transfer ke lebih dari 100 negara</li>
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Biaya telegrafik transfer (telex) kompetitif</li>
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Proses pencatatan legal dan tepercaya</li>
            </ul>
          </div>
        </div>

        {/* Service 3 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-pv-gold-light/40 text-pv-gold-dark flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-pv-navy-deep">Layanan Korporasi & Bisnis</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Solusi khusus untuk importir, eksportir, agen travel, dan korporasi. Kami menawarkan nilai tukar spesial (special rate) untuk volume penukaran tertentu dan kemudahan administrasi keuangan perusahaan Anda.
            </p>
            <ul className="text-xs text-gray-500 space-y-2 pt-2">
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Penawaran kurs khusus (negosiasi rate)</li>
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Fasilitas antar-jemput valas terproteksi</li>
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Dukungan faktur resmi untuk pembukuan</li>
            </ul>
          </div>
        </div>

        {/* Service 4 */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-pv-gold-light/40 text-pv-gold-dark flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-pv-navy-deep">Reservasi / Booking Kurs</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Hindari risiko kehabisan stok fisik mata uang asing atau pergeseran kurs yang drastis. Anda dapat memesan nominal valas yang diinginkan terlebih dahulu secara online dan mengambilnya di cabang SCBD kami sesuai jadwal.
            </p>
            <ul className="text-xs text-gray-500 space-y-2 pt-2">
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Penguncian nilai kurs selama 2 jam</li>
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Menjamin stok bank notes khusus (seperti USD nominal kecil)</li>
              <li className="flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-2 text-pv-gold-primary" /> Bebas antrean saat pengambilan di cabang</li>
            </ul>
          </div>
        </div>
      </div>

      {/* KYC / AML Policy Requirements Section */}
      <section className="bg-gray-50 border border-gray-100 rounded-3xl p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Text Info */}
          <div className="lg:w-1/2 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full text-xs text-red-700 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              <span>Regulasi Bank Indonesia & PPATK</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-pv-navy-deep">Persyaratan Kepatuhan Penukaran (KYC / AML)</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Berdasarkan Undang-Undang Republik Indonesia mengenai Pencegahan Pencucian Uang dan Pendanaan Terorisme, PT Permata Valas Utama menerapkan prinsip Mengenal Nasabah (Know Your Customer/KYC). Setiap transaksi wajib melampirkan identitas diri yang valid.
            </p>
            <div className="text-xs text-gray-400 italic">
              *Catatan: Dokumen identitas yang diserahkan harus dalam bentuk fisik asli yang sah untuk dilakukan pemindaian (scan) di konter kami. Kami menjamin kerahasiaan data nasabah sesuai kebijakan privasi kami.
            </div>
          </div>

          {/* Requirements Table */}
          <div className="lg:w-1/2 w-full overflow-hidden border border-gray-200/60 rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <caption className="sr-only">Tabel regulasi dokumen wajib untuk penukaran mata uang asing di gerai</caption>
              <thead>
                <tr className="bg-pv-navy-deep text-white border-b border-gray-200">
                  <th scope="col" className="px-4 py-3 font-bold">Volume Transaksi</th>
                  <th scope="col" className="px-4 py-3 font-bold">Dokumen Wajib (WNI)</th>
                  <th scope="col" className="px-4 py-3 font-bold">Dokumen Wajib (WNA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="px-4 py-4.5 font-semibold font-mono text-pv-navy-deep">&lt; Rp 100.000.000</td>
                  <td className="px-4 py-4.5">KTP Asli</td>
                  <td className="px-4 py-4.5">Paspor Asli</td>
                </tr>
                <tr>
                  <td className="px-4 py-4.5 font-semibold font-mono text-pv-navy-deep">&ge; Rp 100.000.000</td>
                  <td className="px-4 py-4.5">
                    <ul className="list-disc pl-3 space-y-1">
                      <li>KTP Asli</li>
                      <li>NPWP Asli</li>
                      <li>Formulir deklarasi sumber dana</li>
                    </ul>
                  </td>
                  <td className="px-4 py-4.5">
                    <ul className="list-disc pl-3 space-y-1">
                      <li>Paspor Asli</li>
                      <li>KITAS / KITAP</li>
                      <li>Deklarasi sumber dana</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4.5 font-semibold font-mono text-pv-navy-deep">Ekuivalen &ge; USD 25.000 / bulan</td>
                  <td colSpan={2} className="px-4 py-4.5 bg-pv-ivory-surface/40 text-pv-navy-deep">
                    <span className="font-semibold block mb-1 text-red-800">Wajib Dokumen Pendukung (Underlying):</span>
                    Faktur dagang, kontrak kerja, invoice impor/ekspor, atau bukti tagihan biaya luar negeri resmi yang sah.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
