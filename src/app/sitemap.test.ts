import { client } from "@/lib/sanity/client";
import sitemap from "./sitemap";

// Mock next-sanity dan client
jest.mock("next-sanity", () => ({
  createClient: jest.fn(),
  groq: (strings: TemplateStringsArray, ...values: any[]) => String.raw({ raw: strings }, ...values),
}));

jest.mock("@/lib/sanity/client", () => ({
  client: {
    fetch: jest.fn(),
  },
}));

describe("Sitemap Generator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate static and dynamic sitemap routes correctly", async () => {
    const mockPosts = [
      { slug: { current: "tips-aman-tukar-valas" }, publishedAt: "2026-06-18T10:00:00Z" },
      { slug: { current: "tren-usd-2026" } }, // tiada publishedAt untuk menguji branch fallback
    ];

    (client.fetch as jest.Mock).mockResolvedValue(mockPosts);

    const result = await sitemap();

    // Pastikan berisi rute statis dasar
    const urls = result.map((r) => r.url);
    expect(urls).toContain("https://permatavalas.co.id");
    expect(urls).toContain("https://permatavalas.co.id/kurs");
    expect(urls).toContain("https://permatavalas.co.id/layanan");
    expect(urls).toContain("https://permatavalas.co.id/tentang");
    expect(urls).toContain("https://permatavalas.co.id/lokasi");
    expect(urls).toContain("https://permatavalas.co.id/kontak");
    expect(urls).toContain("https://permatavalas.co.id/insight");

    // Pastikan berisi rute dinamis dari mock posts
    expect(urls).toContain("https://permatavalas.co.id/insight/tips-aman-tukar-valas");
    expect(urls).toContain("https://permatavalas.co.id/insight/tren-usd-2026");
  });

  it("should handle Sanity client fetch errors gracefully", async () => {
    (client.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await sitemap();

    // Rute statis tetap harus digenerasikan dengan aman
    const urls = result.map((r) => r.url);
    expect(urls).toContain("https://permatavalas.co.id");
    expect(urls).toContain("https://permatavalas.co.id/insight");
    // Tidak ada rute dinamis yang gagal
    expect(urls.length).toBe(7);
  });
});
