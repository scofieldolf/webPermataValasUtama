"use client";

import React, { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import type { KursData } from "@/types/kurs";
import { SITE_CONFIG } from "@/config/site";

interface KursTableProps {
  initialRates: KursData[];
}

export function KursTable({ initialRates }: KursTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const updateTimestamp = new Date().toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const filteredRates = initialRates.filter(
    (rate) =>
      rate.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (SITE_CONFIG.currencies.find((c) => c.kode === rate.kode)?.nama || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-serif text-lg font-bold text-pv-navy-deep">Tabel Kurs Valas</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin text-pv-gold-primary" style={{ animationDuration: "6s" }} />
            <span>Diperbarui otomatis (Referensi Bank Indonesia) · Terakhir update: </span>
            <span className="font-mono font-semibold ml-1 text-pv-navy-deep">{updateTimestamp} WIB</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari mata uang (USD, SGD...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pv-gold-primary focus:border-transparent text-pv-navy-deep"
          />
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-100 no-scrollbar">
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <caption className="sr-only">Tabel nilai tukar kurs valuta asing lengkap PT Permata Valas Utama</caption>
          <thead>
            <tr className="bg-pv-navy-deep text-white">
              <th scope="col" className="px-4 py-3.5 font-bold tracking-wider sticky left-0 bg-pv-navy-deep">
                Mata Uang (Valas)
              </th>
              <th scope="col" className="px-4 py-3.5 font-bold tracking-wider text-right">
                Kurs Beli (Kami Beli)
              </th>
              <th scope="col" className="px-4 py-3.5 font-bold tracking-wider text-right">
                Kurs Jual (Kami Jual)
              </th>
              <th scope="col" className="px-4 py-3.5 font-bold tracking-wider text-center">
                Tren
              </th>
              <th scope="col" className="px-4 py-3.5 font-bold tracking-wider hidden md:table-cell">
                Nama Negara / Mata Uang
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRates.length > 0 ? (
              filteredRates.map((rate) => {
                const currencyInfo = SITE_CONFIG.currencies.find((c) => c.kode === rate.kode);
                const isUp = rate.tren === "up";
                const isDown = rate.tren === "down";

                return (
                  <tr key={rate.kode} className="hover:bg-gray-50/50 transition-colors">
                    {/* Sticky Code Column on Mobile */}
                    <td scope="row" className="px-4 py-4 font-bold text-pv-navy-deep sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xl" role="img" aria-label={`Bendera ${rate.kode}`}>
                          {currencyInfo?.bendera || "🌐"}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-extrabold">{rate.kode}</span>
                          <span className="text-[9px] font-normal text-gray-500 md:hidden">
                            {currencyInfo?.nama || ""}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* We Buy */}
                    <td className="px-4 py-4 text-right font-mono font-bold text-pv-navy-deep">
                      Rp {formatNumber(rate.beli)}
                    </td>

                    {/* We Sell */}
                    <td className="px-4 py-4 text-right font-mono font-bold text-pv-navy-deep">
                      Rp {formatNumber(rate.jual)}
                    </td>

                    {/* Trend */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold",
                          isUp && "bg-emerald-50 text-emerald-700",
                          isDown && "bg-red-50 text-red-700",
                          !isUp && !isDown && "bg-gray-50 text-gray-500"
                        )}
                      >
                        {isUp && (
                          <>
                            <TrendingUp className="w-3.5 h-3.5 mr-0.5 text-emerald-500" />
                            {rate.perubahan ? `+${rate.perubahan}%` : "Naik"}
                          </>
                        )}
                        {isDown && (
                          <>
                            <TrendingDown className="w-3.5 h-3.5 mr-0.5 text-red-500" />
                            {rate.perubahan ? `${rate.perubahan}%` : "Turun"}
                          </>
                        )}
                        {!isUp && !isDown && (
                          <>
                            <Minus className="w-3.5 h-3.5 mr-0.5 text-gray-400" />
                            0.00%
                          </>
                        )}
                      </span>
                    </td>

                    {/* Full Name Description (Desktop only) */}
                    <td className="px-4 py-4 text-gray-500 hidden md:table-cell text-xs">
                      {currencyInfo?.nama} ({currencyInfo?.negara})
                      {(rate.kode === "JPY" || rate.kode === "KRW") && (
                        <span className="text-[10px] text-pv-gold-primary block mt-0.5 italic">
                          *harga tertera dikutip per {rate.kode === "JPY" ? "100" : "1000"} unit
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  Mata uang &quot;{searchTerm}&quot; tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-[10px] text-gray-400 leading-relaxed bg-gray-50 p-3.5 rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-500 mb-1">Syarat & Ketentuan Transaksi Valas:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Kurs referensi bersifat indikatif dan dapat berubah sewaktu-waktu tanpa pemberitahuan tertulis sebelumnya mengikuti dinamika pasar finansial global.</li>
          <li>Ketersediaan stok bank notes (uang kertas fisik) bervariasi per gerai. Transaksi bernominal besar diwajibkan melakukan konfirmasi atau booking rate terlebih dahulu.</li>
          <li>Setiap nasabah penukar diwajibkan membawa identitas asli fisik yang sah (KTP untuk WNI, Paspor untuk WNA) guna pelaporan KYC regulasi Bank Indonesia.</li>
        </ul>
      </div>
    </div>
  );
}
