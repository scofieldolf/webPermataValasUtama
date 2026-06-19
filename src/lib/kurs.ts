import type { KursData, KodeMataUang, KursResponse } from "@/types/kurs";

// Mock rates dasar jika API key tidak tersedia atau kuota habis
const BASE_MOCK_MID_RATES: Record<KodeMataUang, number> = {
  USD: 16300,
  SGD: 12100,
  JPY: 104.2, // Per 100 Yen
  EUR: 17520,
  AUD: 10835,
  HKD: 2095,
  GBP: 20750,
  CNY: 2255,
  MYR: 3455,
  THB: 445,
  SAR: 4365,
  KRW: 12.05, // Per 1000 Won
  CAD: 11920,
  CHF: 17970,
  NZD: 9935,
};

// Spreads standar money changer (Beli = midRate * 0.994, Jual = midRate * 1.006)
// Spreads dibuat sedikit berbeda per mata uang agar lebih realistis
const SPREADS: Record<string, { beli: number; jual: number }> = {
  USD: { beli: 0.995, jual: 1.005 }, // USD spread tipis karena likuiditas tinggi
  SGD: { beli: 0.994, jual: 1.006 },
  JPY: { beli: 0.993, jual: 1.007 },
  EUR: { beli: 0.994, jual: 1.006 },
  AUD: { beli: 0.993, jual: 1.007 },
  GBP: { beli: 0.993, jual: 1.007 },
  DEFAULT: { beli: 0.992, jual: 1.008 }, // Mata uang eksotis spread lebih lebar
};

function getSpread(kode: string) {
  return SPREADS[kode] || SPREADS.DEFAULT;
}

// Menghasilkan mock data kurs dengan fluktuasi acak kecil agar terkesan live
export function getMockRates(): KursData[] {
  return Object.entries(BASE_MOCK_MID_RATES).map(([kode, midRate]) => {
    const spread = getSpread(kode);
    // Fluktuasi acak kecil antara -0.05% dan +0.05%
    const randomFluctuation = 1 + (Math.floor(Math.random() * 10) - 5) / 10000;
    const currentMidRate = midRate * randomFluctuation;

    const rawBeli = currentMidRate * spread.beli;
    const rawJual = currentMidRate * spread.jual;

    // Pembulatan rasional uang kertas (misal bulatkan ke puluhan terdekat atau 2 desimal)
    const beli = kode === "JPY" || kode === "KRW" ? Math.round(rawBeli * 100) / 100 : Math.round(rawBeli / 10) * 10;
    const jual = kode === "JPY" || kode === "KRW" ? Math.round(rawJual * 100) / 100 : Math.round(rawJual / 10) * 10;

    // Tentukan tren fluktuasi acak
    const rand = Math.random();
    const tren = rand > 0.6 ? "up" : rand < 0.3 ? "down" : "flat";
    const perubahan = tren === "up" ? 0.12 : tren === "down" ? -0.08 : 0;

    return {
      kode: kode as KodeMataUang,
      beli,
      jual,
      perubahan,
      tren,
    };
  });
}

export async function fetchLatestRates(): Promise<KursResponse> {
  const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY || process.env.EXCHANGE_RATE_API_SECRET;

  if (!apiKey) {
    console.warn("ExchangeRate API Key tidak ditemukan. Menggunakan data kurs mock (fallback).");
    return {
      rates: getMockRates(),
      timestamp: new Date().toISOString(),
    };
  }

  try {
    // Kita gunakan base IDR karena money changer di Indonesia berpatokan pada Rupiah
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/IDR`;
    const res = await fetch(url, {
      next: { revalidate: 300 }, // Cache fetch 5 menit di level Next.js Data Cache
    });

    if (!res.ok) {
      throw new Error(`API exchange-rate gagal merespon: Status ${res.status}`);
    }

    const json = await res.json();
    if (json.result !== "success" || !json.conversion_rates) {
      throw new Error("Struktur data API exchange-rate tidak valid");
    }

    const apiRates = json.conversion_rates;

    // ExchangeRate API mengembalikan USD=0.000062 (terhadap 1 IDR).
    // Kita perlu membalik angkanya: 1 / USD_rate = Nilai Rupiah per 1 unit USD.
    const calculatedRates: KursData[] = Object.keys(BASE_MOCK_MID_RATES).map((kodeStr) => {
      const kode = kodeStr as KodeMataUang;
      const spread = getSpread(kode);

      // Ambil rate dari API (1 Rupiah = X Valas)
      const rateVsIdr = apiRates[kode];

      if (!rateVsIdr) {
        // Fallback ke mock jika kodenya tidak ada di API response
        const mockRate = BASE_MOCK_MID_RATES[kode];
        return {
          kode,
          beli: Math.round(mockRate * spread.beli / 10) * 10,
          jual: Math.round(mockRate * spread.jual / 10) * 10,
          perubahan: 0,
          tren: "flat" as const,
        };
      }

      // Hitung rate tengah: 1 Valas = X Rupiah
      let midRate = 1 / rateVsIdr;

      // Kasus khusus Yen Jepang (JPY) dikutip per 100 Yen di Indonesia
      if (kode === "JPY") {
        midRate = midRate * 100;
      }

      // Kasus khusus Won Korea (KRW) dikutip per 1000 Won di Indonesia
      if (kode === "KRW") {
        midRate = midRate * 1000;
      }

      const rawBeli = midRate * spread.beli;
      const rawJual = midRate * spread.jual;

      // Pembulatan agar rapi
      const beli = kode === "JPY" || kode === "KRW" ? Math.round(rawBeli * 100) / 100 : Math.round(rawBeli / 10) * 10;
      const jual = kode === "JPY" || kode === "KRW" ? Math.round(rawJual * 100) / 100 : Math.round(rawJual / 10) * 10;

      // Ambil acakan tren sederhana
      const tren = Math.random() > 0.5 ? ("up" as const) : ("down" as const);

      return {
        kode,
        beli,
        jual,
        perubahan: tren === "up" ? 0.05 : -0.05,
        tren,
      };
    });

    return {
      rates: calculatedRates,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Gagal menarik data kurs dari API eksternal:", err);
    console.warn("Menggunakan data kurs mock (fallback) setelah error API.");
    return {
      rates: getMockRates(),
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Menghasilkan data tren nilai tukar 7 hari terakhir secara historis
 * untuk simulasi grafik Recharts di halaman kurs.
 */
export function getHistoricalRates(
  kode: KodeMataUang,
  currentBeli: number,
  currentJual: number
): { hari: string; beli: number; jual: number }[] {
  const points: { hari: string; beli: number; jual: number }[] = [];
  const today = new Date();

  // Perhitungan spread persentase agar deviasi realistis
  const deviasiMaksimal = 0.003; // maks 0.3% fluktuasi per hari

  // Validasi protektif awal agar beli selalu < jual
  let verifiedBeli = currentBeli;
  let verifiedJual = currentJual;
  if (verifiedBeli >= verifiedJual) {
    verifiedBeli = verifiedJual * 0.99;
  }

  // Buat 7 titik data (6 hari lalu s/d hari ini)
  for (let i = 6; i >= 0; i--) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - i);

    // Format nama hari + tanggal singkat (misal: "Kamis, 18 Jun" -> "18 Jun")
    const labelHari = targetDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });

    if (i === 0) {
      // Titik hari ini (hari ke-7) harus pas dengan harga saat ini
      points.push({
        hari: labelHari,
        beli: verifiedBeli,
        jual: verifiedJual,
      });
    } else {
      // Titik historis ke belakang dihitung dengan fluktuasi acak terkontrol
      // Kita gunakan benih pseudo-acak sederhana berbasis indeks 'i' dan kode mata uang
      // agar grafiknya tidak berubah secara liar setiap kali dirender ulang di client
      const charSum = kode.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const pseudoRandom = Math.sin(i * 10 + charSum); // nilai di antara [-1, 1]

      const faktorFluktuasi = 1 + pseudoRandom * deviasiMaksimal * (7 - i) * 0.4;

      let rawBeli = verifiedBeli * faktorFluktuasi;
      let rawJual = verifiedJual * faktorFluktuasi;

      // Pastikan harga beli < jual
      if (rawBeli >= rawJual) {
        rawBeli = rawJual * 0.99;
      }

      // Pembulatan konsisten sesuai mata uang
      const beli = kode === "JPY" || kode === "KRW" ? Math.round(rawBeli * 100) / 100 : Math.round(rawBeli / 10) * 10;
      const jual = kode === "JPY" || kode === "KRW" ? Math.round(rawJual * 100) / 100 : Math.round(rawJual / 10) * 10;

      points.push({
        hari: labelHari,
        beli,
        jual,
      });
    }
  }

  return points;
}
