// Ambil nilai dari environment variable
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

// 1. Sanitasi projectId: hapus tanda kutip tunggal, tanda kutip ganda, dan spasi
const cleanProjectId = rawProjectId.replace(/['"\s]/g, "");

// Validasi format: Hanya huruf kecil/besar, angka, dan tanda hubung (a-z, 0-9, -)
// Ini adalah aturan strict dari Sanity Client untuk mencegah inisialisasi crash
const isValidProjectId = /^[a-zA-Z0-9-]+$/.test(cleanProjectId);

// 2. Sanitasi dataset: hapus tanda kutip dan spasi
const cleanDataset = rawDataset.replace(/['"\s]/g, "");
const isValidDataset = /^[a-zA-Z0-9-]+$/.test(cleanDataset);

export const SANITY_CONFIG = {
  projectId: isValidProjectId ? cleanProjectId : "mock-project-id",
  dataset: isValidDataset ? cleanDataset : "production",
  apiVersion: "2026-06-17" as const,
};
