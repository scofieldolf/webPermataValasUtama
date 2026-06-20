import React from "react";
import type { Metadata } from "next";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi PT Permata Valas Utama. Informasi mengenai pengumpulan, penggunaan, dan pelindungan data pribadi nasabah sesuai regulasi Bank Indonesia.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/kebijakan-privasi`,
  },
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 mb-12 text-center lg:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-pv-navy-deep">
          Kebijakan Privasi
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-3xl">
          Komitmen kami dalam melindungi data pribadi Anda dan memastikan keamanan informasi di setiap transaksi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-8 space-y-8 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              1. Pendahuluan
            </h2>
            <p>
              PT Permata Valas Utama berkomitmen penuh untuk melindungi kerahasiaan dan privasi data pribadi nasabah. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat menggunakan website kami dan melakukan reservasi kurs valuta asing.
            </p>
            <p>
              Dengan mengakses website kami dan mengirimkan data Anda melalui formulir yang tersedia, Anda menyetujui praktik pengumpulan dan penggunaan informasi sebagaimana dijelaskan dalam Kebijakan Privasi ini.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              2. Informasi yang Kami Kumpulkan
            </h2>
            <p>
              Kami hanya mengumpulkan informasi dasar non-sensitif yang diperlukan untuk memproses permintaan reservasi kurs atau menjawab pertanyaan Anda. Informasi tersebut meliputi:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Identitas Dasar:</strong> Nama Lengkap Anda sesuai dengan kartu identitas resmi (KTP atau Paspor).
              </li>
              <li>
                <strong>Informasi Kontak:</strong> Alamat email aktif dan nomor telepon/WhatsApp untuk kebutuhan konfirmasi.
              </li>
              <li>
                <strong>Detail Transaksi:</strong> Jenis valuta asing yang ingin dipesan (beli/jual), nominal penukaran, serta catatan khusus terkait transaksi Anda.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              3. Kepatuhan Hukum KYC & AML
            </h2>
            <p>
              Sebagai penyelenggara Kegiatan Usaha Penukaran Valuta Asing Bukan Bank (KUPU BB) berizin resmi Bank Indonesia, kami wajib menerapkan prinsip mengenali nasabah atau <strong>Know Your Customer (KYC)</strong> serta program anti-pencucian uang <strong>(Anti-Money Laundering/AML)</strong>.
            </p>
            <p>
              Saat Anda mendatangi gerai fisik kami untuk menindaklanjuti reservasi, staf kami wajib meminta dan memverifikasi dokumen identitas fisik yang sah (KTP asli untuk Warga Negara Indonesia atau Paspor asli untuk Warga Negara Asing). Data dari dokumen identitas fisik ini diproses langsung di lokasi gerai fisik dan <strong>TIDAK</strong> diunggah atau disimpan melalui website ini.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              4. Penggunaan Informasi Anda
            </h2>
            <p>Kami menggunakan data pribadi yang Anda kirimkan untuk tujuan berikut:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Memverifikasi reservasi nominal valas yang Anda lakukan.</li>
              <li>Menghubungi Anda via WhatsApp atau telepon untuk konfirmasi ketersediaan stok mata uang dan waktu pengambilan.</li>
              <li>Menjawab pertanyaan, masukan, maupun aduan yang Anda kirimkan melalui formulir kontak.</li>
              <li>Memenuhi kewajiban hukum pelaporan transaksi valas sesuai peraturan yang ditetapkan oleh Bank Indonesia dan PPATK.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              5. Keamanan Data
            </h2>
            <p>
              Kami menerapkan standar keamanan teknis dan organisasional yang memadai untuk melindungi data Anda dari akses tanpa izin, kehilangan, atau penyalahgunaan. Seluruh transmisi data di website ini dilindungi oleh protokol enkripsi HTTPS/TLS.
            </p>
            <p>
              Website kami tidak menyimpan berkas identitas pribadi sensitif nasabah secara permanen di database server web. Semua data reservasi diteruskan langsung ke sistem pengelolaan internal kami secara aman.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              6. Pengungkapan Kepada Pihak Ketiga
            </h2>
            <p>
              Kami tidak akan menjual, menyewakan, atau menyebarluaskan data pribadi Anda kepada pihak ketiga untuk kepentingan komersial. Kami hanya akan membagikan informasi pribadi Anda jika diwajibkan oleh hukum, proses peradilan, atau permintaan resmi dari otoritas regulator pemerintah yang berwenang (seperti Bank Indonesia, OJK, PPATK, atau Kepolisian Negara Republik Indonesia).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep">
              7. Hubungi Kami
            </h2>
            <p>
              Apabila Anda memiliki pertanyaan, kekhawatiran, atau ingin meminta pembaruan data terkait kebijakan privasi kami, silakan hubungi kami melalui alamat email resmi di <strong>{SITE_CONFIG.contact.email}</strong> atau telepon gerai kami di <strong>{SITE_CONFIG.contact.phone}</strong>.
            </p>
            <p className="text-[11px] text-gray-400 mt-6 italic">
              Terakhir diperbarui: 20 Juni 2026
            </p>
          </section>
        </div>

        {/* Right Column: Security Information Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-pv-ivory-surface/40 border border-pv-gold-light/20 rounded-2xl p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-pv-navy-deep text-pv-gold-light flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-pv-navy-deep">
                Jaminan Pelindungan
              </h3>
            </div>

            <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
              <p>
                PT Permata Valas Utama menjamin bahwa semua data transaksi dan reservasi dikelola dengan kerahasiaan tinggi berdasarkan standar operasional perbankan yang ketat.
              </p>
              <div className="flex items-start space-x-2 bg-white/60 p-3 rounded-xl border border-gray-100">
                <ShieldAlert className="w-4 h-4 text-pv-gold-primary flex-shrink-0 mt-0.5" />
                <span className="text-[11px]">
                  <strong>Penting:</strong> Kami tidak pernah menanyakan PIN ATM, kata sandi perbankan, atau kode OTP melalui telepon, SMS, atau WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
