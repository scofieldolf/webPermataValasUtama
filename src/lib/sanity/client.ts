import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_CONFIG } from "./config";

export const client = createClient({
  ...SANITY_CONFIG,
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Data Fallback Artikel Blog/Insight untuk lingkungan offline / testing
export const MOCK_POSTS = [
  {
    _id: "mock-1",
    title: "Tips Aman Menukarkan Uang Kertas Asing di Jakarta",
    slug: { _type: "slug", current: "tips-aman-tukar-valas" },
    excerpt: "Berikut ini adalah panduan praktis dan tips penting bagi nasabah perorangan sebelum menukarkan mata uang asing di gerai money changer resmi.",
    publishedAt: "2026-06-18T10:00:00Z",
    categories: ["tips-valas" as const],
    author: { name: "Diana Ningsih" },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Menukarkan uang asing di money changer resmi berizin Bank Indonesia adalah langkah utama untuk menghindari peredaran uang palsu dan mendapatkan kurs terbaik. Sebelum bertransaksi, pastikan Anda membawa kartu identitas asli (KTP untuk WNI atau Paspor untuk WNA) sesuai aturan KYC/AML."
          }
        ]
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Selain itu, periksa kondisi fisik uang kertas asing Anda. Hindari membawa uang kertas yang lecek, robek, atau memiliki coretan, karena gerai money changer biasanya akan mengenakan potongan harga atau bahkan menolak uang kertas asing yang tidak dalam kondisi prima."
          }
        ]
      }
    ]
  },
  {
    _id: "mock-2",
    title: "Memahami Regulasi Pembawaan Uang Tunai Asing (KUPU)",
    slug: { _type: "slug", current: "regulasi-pembawaan-uang-asing" },
    excerpt: "Panduan mengenai aturan Bank Indonesia tentang batas pembawaan uang tunai lintas pabean dan kewajiban pelaporan underlying document.",
    publishedAt: "2026-06-19T08:30:00Z",
    categories: ["regulasi-bi" as const],
    author: { name: "Rian Samudra" },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Bank Indonesia menetapkan regulasi yang ketat mengenai pembawaan uang tunai lintas pabean. Untuk transaksi bernilai ekuivalen USD 25.000 atau lebih per bulan, nasabah wajib menyertakan dokumen pendukung (underlying document) yang sah."
          }
        ]
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Tujuan dari aturan ini adalah untuk mencegah pencucian uang dan pendanaan terorisme. PT Permata Valas Utama berkomitmen penuh untuk mematuhi regulasi ini dengan menerapkan prinsip kehati-hatian dalam setiap verifikasi dokumen nasabah."
          }
        ]
      }
    ]
  },
  {
    _id: "mock-3",
    title: "Analisis Pasar: Faktor yang Mempengaruhi Fluktuasi Kurs Valas",
    slug: { _type: "slug", current: "analisis-pasar-fluktuasi-kurs" },
    excerpt: "Pelajari faktor ekonomi makro seperti inflasi, suku bunga, dan stabilitas geopolitik yang secara langsung mempengaruhi nilai tukar rupiah.",
    publishedAt: "2026-06-20T09:00:00Z",
    categories: ["analisis-pasar" as const],
    author: { name: "Budi Santoso" },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Nilai tukar mata uang asing bersifat fluktuatif dan dipengaruhi oleh berbagai faktor ekonomi makro global. Di antaranya adalah kebijakan suku bunga bank sentral seperti Federal Reserve (AS), tingkat inflasi dalam negeri, serta stabilitas geopolitik internasional."
          }
        ]
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Sebagai pelaku bisnis atau perorangan yang sering bertransaksi valas, memantau tren pergerakan kurs secara harian sangat penting untuk menentukan waktu terbaik melakukan transaksi penukaran."
          }
        ]
      }
    ]
  }
];
