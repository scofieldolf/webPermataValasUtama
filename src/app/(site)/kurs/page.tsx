import React from "react";
import type { Metadata } from "next";
import { KursTable } from "@/components/kurs/kurs-table";
import { KalkCalc } from "@/components/kurs/kalk-calc";
import { ShieldCheck, Info } from "lucide-react";
import type { KursData } from "@/types/kurs";

export const metadata: Metadata = {
  title: "Kurs Hari Ini",
  description:
    "Daftar kurs jual dan beli valuta asing real-time terupdate. Dapatkan estimasi penukaran USD, SGD, EUR, JPY, AUD dengan rate terbaik dan aman.",
};

// Mock data lengkap kurs valas terbitan hari ini
const mockFullRates: KursData[] = [
  { kode: "USD", beli: 16250, jual: 16350, perubahan: 0.15, tren: "up" },
  { kode: "SGD", beli: 12050, jual: 12150, perubahan: -0.05, tren: "down" },
  { kode: "JPY", beli: 103.5, jual: 104.8, perubahan: 0.22, tren: "up" },
  { kode: "EUR", beli: 17450, jual: 17600, perubahan: 0.0, tren: "flat" },
  { kode: "AUD", beli: 10780, jual: 10890, perubahan: -0.12, tren: "down" },
  { kode: "GBP", beli: 20650, jual: 20850, perubahan: 0.45, tren: "up" },
  { kode: "HKD", beli: 2080, jual: 2110, perubahan: 0.1, tren: "up" },
  { kode: "CNY", beli: 2240, jual: 2270, perubahan: -0.08, tren: "down" },
  { kode: "MYR", beli: 3430, jual: 3480, perubahan: 0.0, tren: "flat" },
  { kode: "THB", beli: 440, jual: 450, perubahan: 0.23, tren: "up" },
  { kode: "SAR", beli: 4320, jual: 4410, perubahan: 0.05, tren: "up" },
  { kode: "KRW", beli: 11.8, jual: 12.3, perubahan: -0.15, tren: "down" },
  { kode: "CAD", beli: 11850, jual: 11990, perubahan: 0.12, tren: "up" },
  { kode: "CHF", beli: 17890, jual: 18050, perubahan: 0.0, tren: "flat" },
  { kode: "NZD", beli: 9880, jual: 9990, perubahan: -0.2, tren: "down" },
];

export default function KursPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title Header */}
      <div className="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-pv-navy-deep">
          Kurs Valuta Asing Hari Ini
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-3xl">
          Pantau harga jual dan beli mata uang asing secara transparan. Nilai tukar di bawah ini merupakan referensi resmi dari gerai PT Permata Valas Utama.
        </p>
      </div>

      {/* Grid Layout: Table & Side Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Complete Kurs Table */}
        <div className="lg:col-span-8 w-full">
          <KursTable initialRates={mockFullRates} />
        </div>

        {/* Right: Calculator & Safe Badging */}
        <div className="lg:col-span-4 space-y-6 w-full">
          <KalkCalc />

          {/* Regulator Compliance Banner */}
          <div className="bg-[#042C53] rounded-2xl p-6 text-white border border-pv-gold-dark/30 shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-pv-gold-light/20 flex items-center justify-center text-pv-gold-light">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm text-white">Jaminan Keamanan KUPU</h4>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed mb-4">
              PT Permata Valas Utama beroperasi dengan izin Kegiatan Usaha Penukaran Valuta Asing Bukan Bank resmi yang diatur ketat oleh Bank Indonesia. Setiap transaksi Anda dijamin legalitasnya di bawah hukum Republik Indonesia.
            </p>
            <div className="flex items-center text-[10px] text-pv-gold-light font-mono bg-[#031d36] px-3 py-2 rounded-lg">
              <Info className="w-3.5 h-3.5 mr-2 text-pv-gold-primary flex-shrink-0" />
              <span>KYC Wajib: Bawa KTP / Paspor Fisik Asli Anda</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
