export type KodeMataUang =
  | "USD"
  | "SGD"
  | "JPY"
  | "EUR"
  | "AUD"
  | "HKD"
  | "GBP"
  | "CNY"
  | "MYR"
  | "THB"
  | "SAR"
  | "KRW"
  | "CAD"
  | "CHF"
  | "NZD";

export interface MataUang {
  kode: KodeMataUang;
  nama: string;
  bendera: string; // Emoji bendera atau path file gambar
  negara: string;
}

export interface KursData {
  kode: KodeMataUang;
  beli: number;
  jual: number;
  perubahan?: number; // Perubahan persen dari hari sebelumnya, misal +0.15 atau -0.05
  tren?: "up" | "down" | "flat";
}

export interface KursResponse {
  rates: KursData[];
  timestamp: string;
}
