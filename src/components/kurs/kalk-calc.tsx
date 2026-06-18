"use client";

import React, { useState, useEffect } from "react";
import { Calculator, ArrowLeftRight, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { cn, formatRupiah, formatNumber } from "@/lib/utils";
import type { KodeMataUang } from "@/types/kurs";

// Mock data kurs untuk kalkulator
const rateCalculatorMap: Record<KodeMataUang, { beli: number; jual: number; nama: string; bendera: string }> = {
  USD: { beli: 16250, jual: 16350, nama: "US Dollar", bendera: "🇺🇸" },
  SGD: { beli: 12050, jual: 12150, nama: "Singapore Dollar", bendera: "🇸🇬" },
  JPY: { beli: 103.5, jual: 104.8, nama: "Japanese 100 Yen", bendera: "🇯🇵" },
  EUR: { beli: 17450, jual: 17600, nama: "Euro", bendera: "🇪🇺" },
  AUD: { beli: 10780, jual: 10890, nama: "Australian Dollar", bendera: "🇦🇺" },
  HKD: { beli: 2080, jual: 2110, nama: "Hong Kong Dollar", bendera: "🇭🇰" },
  GBP: { beli: 20650, jual: 20850, nama: "British Pound", bendera: "🇬🇧" },
  CNY: { beli: 2240, jual: 2270, nama: "Chinese Yuan", bendera: "🇨🇳" },
  MYR: { beli: 3430, jual: 3480, nama: "Malaysian Ringgit", bendera: "🇲🇾" },
  THB: { beli: 440, jual: 450, nama: "Thai Baht", bendera: "🇹🇭" },
  SAR: { beli: 4320, jual: 4410, nama: "Saudi Riyal", bendera: "🇸🇦" },
  KRW: { beli: 11.8, jual: 12.3, nama: "Korean 1000 Won", bendera: "🇰🇷" },
  CAD: { beli: 11850, jual: 11990, nama: "Canadian Dollar", bendera: "🇨🇦" },
  CHF: { beli: 17890, jual: 18050, nama: "Swiss Franc", bendera: "🇨🇭" },
  NZD: { beli: 9880, jual: 9990, nama: "New Zealand Dollar", bendera: "🇳🇿" },
};

export function KalkCalc() {
  const [currency, setCurrency] = useState<KodeMataUang>("USD");
  const [type, setType] = useState<"beli" | "jual">("beli"); // beli = nasabah jual valas ke PV; jual = nasabah beli valas dari PV
  const [amount, setAmount] = useState<string>("1000");
  const [result, setResult] = useState<number>(0);

  const activeRateInfo = rateCalculatorMap[currency];
  const activeRate = type === "beli" ? activeRateInfo.beli : activeRateInfo.jual;

  // Lakukan perhitungan konversi setiap kali amount, currency, atau type berubah
  useEffect(() => {
    const numericAmount = parseFloat(amount.replace(/,/g, "")) || 0;

    if (currency === "JPY") {
      // JPY biasanya dikutip per 100 Yen
      if (type === "beli") {
        setResult((numericAmount * activeRate) / 100);
      } else {
        setResult((numericAmount * activeRate) / 100);
      }
    } else if (currency === "KRW") {
      // KRW biasanya dikutip per 1000 Won
      if (type === "beli") {
        setResult((numericAmount * activeRate) / 1000);
      } else {
        setResult((numericAmount * activeRate) / 1000);
      }
    } else {
      setResult(numericAmount * activeRate);
    }
  }, [amount, currency, type, activeRate]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(rawValue);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl p-6 lg:p-8">
      {/* Card Header */}
      <div className="flex items-center space-x-3 border-b border-gray-100 pb-4 mb-6">
        <div className="w-10 h-10 rounded-lg bg-pv-gold-light/40 flex items-center justify-center text-pv-gold-dark">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-pv-navy-deep">Kalkulator Valas</h3>
          <p className="text-xs text-gray-500">Simulasi transaksi penukaran mata uang asing</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Arah Transaksi Selector */}
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setType("beli")}
            className={cn(
              "py-2.5 text-xs font-bold rounded-md transition-all",
              type === "beli"
                ? "bg-white text-pv-navy-deep shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-pv-navy-deep"
            )}
          >
            Saya Mau Jual Valas
          </button>
          <button
            type="button"
            onClick={() => setType("jual")}
            className={cn(
              "py-2.5 text-xs font-bold rounded-md transition-all",
              type === "jual"
                ? "bg-white text-pv-navy-deep shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-pv-navy-deep"
            )}
          >
            Saya Mau Beli Valas
          </button>
        </div>

        {/* Currency & Amount Input Row */}
        <div className="space-y-2">
          <label htmlFor="valas-amount" className="text-xs font-bold text-gray-600 block">
            Nominal Valas
          </label>
          <div className="flex rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-pv-gold-primary focus-within:border-transparent overflow-hidden">
            {/* Dropdown Valas */}
            <select
              id="valas-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as KodeMataUang)}
              className="bg-gray-50 px-3 py-3 border-r border-gray-200 text-sm font-bold text-pv-navy-deep focus:outline-none cursor-pointer"
            >
              {Object.keys(rateCalculatorMap).map((code) => (
                <option key={code} value={code}>
                  {rateCalculatorMap[code as KodeMataUang].bendera} {code}
                </option>
              ))}
            </select>
            {/* Input Nominal */}
            <input
              id="valas-amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="w-full px-4 py-3 text-sm font-mono focus:outline-none text-pv-navy-deep"
            />
          </div>
          <span className="text-[11px] text-gray-400 block italic leading-none pt-0.5">
            Nama Mata Uang: {activeRateInfo.nama}
          </span>
        </div>

        {/* Info Rate saat ini */}
        <div className="flex items-center justify-between bg-pv-ivory-surface/60 border border-pv-gold-light/20 rounded-xl px-4 py-3.5 my-2">
          <div className="text-xs text-gray-500 flex items-center">
            <span>Kurs Referensi ({type === "beli" ? "Beli" : "Jual"})</span>
            <span className="ml-1 cursor-help group relative">
              <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-pv-navy-deep text-white text-[10px] rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity leading-normal z-50">
                Kurs referensi ini digunakan untuk estimasi penukaran valas di gerai kami.
              </span>
            </span>
          </div>
          <div className="text-sm font-mono font-bold text-pv-navy-deep">
            1 {currency} = Rp {formatNumber(activeRate)}
            {(currency === "JPY" || currency === "KRW") && (
              <span className="text-[10px] text-gray-400 block text-right font-sans font-normal leading-none pt-0.5">
                *dikutip per {currency === "JPY" ? "100" : "1000"} unit
              </span>
            )}
          </div>
        </div>

        {/* Arrow Exchange Icon */}
        <div className="flex justify-center -my-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shadow-inner">
            <ArrowLeftRight className="w-4 h-4 rotate-90" />
          </div>
        </div>

        {/* Hasil Konversi */}
        <div className="space-y-1 bg-gray-50 border border-gray-100 rounded-xl p-4">
          <label className="text-xs font-bold text-gray-500 block">
            Estimasi Rupiah yang {type === "beli" ? "Diterima" : "Dibayarkan"}
          </label>
          <div className="text-xl lg:text-2xl font-mono font-extrabold text-pv-navy-deep">
            {formatRupiah(result)}
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-2">
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Halo%20Permata%20Valas%2C%20saya%20ingin%20reservasi%20tukar%20${amount}%20${currency}%20dengan%20estimasi%20kurs%20Rp%20${formatNumber(activeRate)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-pv-gold-primary hover:bg-pv-gold-dark text-white text-xs font-bold shadow hover:shadow-md transition-all duration-200"
          >
            Kunci Kurs via WhatsApp
          </a>
          <span className="text-[10px] text-gray-400 block text-center mt-2 leading-relaxed">
            *Nilai di atas merupakan simulasi. Kurs final mengacu pada rate saat transaksi di gerai.
          </span>
        </div>
      </div>
    </div>
  );
}
