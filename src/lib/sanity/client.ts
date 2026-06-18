import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-17", // Gunakan tanggal hari ini sebagai apiVersion
  useCdn: process.env.NODE_ENV === "production", // Gunakan CDN di production, bypass CDN saat development untuk data real-time
});

const builder = imageUrlBuilder(client);

// Helper untuk menghasilkan URL gambar optimal dari Sanity CDN
export function urlFor(source: any) {
  return builder.image(source);
}
