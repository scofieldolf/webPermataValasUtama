import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KursData } from "@/types/kurs";

interface KursTickerProps {
  rates: KursData[];
}

export function KursTicker({ rates }: KursTickerProps) {
  // Gandakan array agar teks bergulir tanpa terputus secara visual (infinite scroll)
  const duplicatedRates = [...rates, ...rates, ...rates];

  return (
    <div className="w-full bg-pv-navy-deep text-white border-b border-pv-gold-dark/30 py-2 overflow-hidden relative z-50 select-none">
      <div className="flex w-max">
        <div className="flex space-x-12 px-6 font-mono text-xs items-center whitespace-nowrap animate-marquee">
          {duplicatedRates.map((rate, idx) => {
            const isUp = rate.tren === "up";
            const isDown = rate.tren === "down";

            return (
              <div key={`${rate.kode}-${idx}`} className="flex items-center space-x-2">
                <span className="font-semibold text-pv-gold-light">{rate.kode}</span>
                <span className="text-gray-300">
                  Beli: <span className="font-semibold text-white">{new Intl.NumberFormat("id-ID").format(rate.beli)}</span>
                </span>
                <span className="text-gray-300">
                  Jual: <span className="font-semibold text-white">{new Intl.NumberFormat("id-ID").format(rate.jual)}</span>
                </span>
                <span
                  className={cn(
                    "flex items-center font-bold text-[10px] px-1 rounded",
                    isUp && "text-emerald-500",
                    isDown && "text-red-500",
                    !isUp && !isDown && "text-gray-400"
                  )}
                >
                  {isUp && <ArrowUpRight className="w-3 h-3 mr-0.5 inline" />}
                  {isDown && <ArrowDownRight className="w-3 h-3 mr-0.5 inline" />}
                  {!isUp && !isDown && <Minus className="w-3 h-3 mr-0.5 inline" />}
                  {rate.perubahan ? `${rate.perubahan > 0 ? "+" : ""}${rate.perubahan}%` : "0.00%"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
