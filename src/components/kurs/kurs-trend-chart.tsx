"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CircleDollarSign } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { getHistoricalRates } from "@/lib/kurs";
import type { KursData, KodeMataUang } from "@/types/kurs";
import { SITE_CONFIG } from "@/config/site";

interface KursTrendChartProps {
  currentRates: KursData[];
}

// Popular currencies to display in dropdown
const POPULAR_CURRENCIES: { kode: KodeMataUang; nama: string }[] = [
  { kode: "USD", nama: "US Dollar" },
  { kode: "SGD", nama: "Singapore Dollar" },
  { kode: "JPY", nama: "Japanese Yen" },
  { kode: "EUR", nama: "Euro" },
  { kode: "AUD", nama: "Australian Dollar" },
  { kode: "GBP", nama: "British Pound" },
];

// Custom Tooltip component outside the main component to prevent recreational render & trace coverage cleanly
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#042C53] text-white p-3 rounded-xl border border-pv-gold-dark/30 shadow-lg text-xs font-sans">
        <p className="font-bold border-b border-white/10 pb-1.5 mb-1.5">{label}</p>
        <div className="space-y-1">
          <p className="flex justify-between gap-6">
            <span className="text-gray-300">Kami Beli:</span>
            <span className="font-mono font-bold text-pv-gold-light">
              Rp {formatNumber(payload[0].value)}
            </span>
          </p>
          <p className="flex justify-between gap-6">
            <span className="text-gray-300">Kami Jual:</span>
            <span className="font-mono font-bold text-white">
              Rp {formatNumber(payload[1].value)}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function KursTrendChart({ currentRates }: KursTrendChartProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<KodeMataUang>("USD");
  const [isMounted, setIsMounted] = useState(false);

  // Prevent SSR Hydration errors by waiting until component is mounted in client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Find current rate of selected currency
  const activeRate = currentRates.find((r) => r.kode === selectedCurrency) || {
    beli: 0,
    jual: 0,
  };

  // Generate 7-day historical rate data
  const data = getHistoricalRates(selectedCurrency, activeRate.beli, activeRate.jual);
  const currencyInfo = SITE_CONFIG.currencies.find((c) => c.kode === selectedCurrency);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pv-gold-light/40 text-pv-gold-dark flex items-center justify-center">
            <CircleDollarSign className="w-5.5 h-5.5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-pv-navy-deep">
              Grafik Tren Kurs 7 Hari Terakhir
            </h3>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Visualisasi historis beli/jual untuk mata uang populer
            </p>
          </div>
        </div>

        {/* Currency Selection Dropdown */}
        <div className="relative w-full sm:w-60">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value as KodeMataUang)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep pr-8 shadow-sm cursor-pointer"
          >
            {POPULAR_CURRENCIES.map((curr) => (
              <option key={curr.kode} value={curr.kode}>
                {curr.nama} ({curr.kode})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart Body */}
      <div className="w-full h-[280px] mt-4 font-sans text-xs">
        {!isMounted ? (
          // Skeleton placeholder before client-side mounting
          <div className="w-full h-full bg-gray-50/50 rounded-xl border border-gray-100 flex items-center justify-center text-xs text-gray-400 animate-pulse">
            Memuat grafik tren...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                {/* Gradient for buy rate */}
                <linearGradient id="colorBeli" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B8860B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#B8860B" stopOpacity={0.0} />
                </linearGradient>
                {/* Gradient for sell rate */}
                <linearGradient id="colorJual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#042C53" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#042C53" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="hari"
                tickLine={false}
                axisLine={false}
                dy={8}
                stroke="#9ca3af"
                style={{ fontSize: "10px", fontWeight: 500 }}
              />
              <YAxis
                type="number"
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                dx={-8}
                stroke="#9ca3af"
                style={{ fontSize: "10px", fontWeight: 500 }}
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", fontWeight: 600, top: -10 }}
              />
              <Area
                name="Kurs Beli (Kami Beli)"
                type="monotone"
                dataKey="beli"
                stroke="#B8860B"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorBeli)"
                activeDot={{ r: 5, stroke: "#B8860B", strokeWidth: 1.5, fill: "#fff" }}
              />
              <Area
                name="Kurs Jual (Kami Jual)"
                type="monotone"
                dataKey="jual"
                stroke="#042C53"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorJual)"
                activeDot={{ r: 5, stroke: "#042C53", strokeWidth: 1.5, fill: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Info Footnote */}
      {currencyInfo && (
        <div className="mt-4 text-[10px] text-gray-400 italic text-center">
          *Tren di atas menunjukkan fluktuasi historis {currencyInfo.nama} ({selectedCurrency}) terhadap IDR selama 7 hari terakhir.
        </div>
      )}
    </div>
  );
}
