import React from "react";
import { render, screen } from "@testing-library/react";
import { client } from "@/lib/sanity/client";

// Mock next-sanity dan client
jest.mock("next-sanity", () => ({
  createClient: jest.fn(),
  groq: (strings: TemplateStringsArray, ...values: any[]) => String.raw({ raw: strings }, ...values),
}));

jest.mock("@/lib/sanity/client", () => ({
  client: {
    fetch: jest.fn(),
  },
  urlFor: () => ({
    url: () => "http://mock-image-url.com",
  }),
}));

// Mock next/image agar tidak melempar warning non-boolean fill
jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: ({ src, alt, fill, sizes, ...props }: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} {...props} />;
    },
  };
});

// Import halaman InsightPage
import InsightPage from "./page";

describe("Insight Page (/insight)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render header and metadata information correctly", async () => {
    (client.fetch as jest.Mock).mockResolvedValue([]);

    const ResolvedPage = await InsightPage();
    render(ResolvedPage);

    expect(screen.getByText("Insight & Analisis Valas")).toBeInTheDocument();
    expect(
      screen.getByText(/Temukan analisis pasar valuta asing terbaru/i)
    ).toBeInTheDocument();
  });

  it("should display a list of blog posts when data exists", async () => {
    const mockPosts = [
      {
        _id: "post-1",
        title: "Tips Aman Menukarkan Uang Kertas Asing",
        slug: { current: "tips-aman-tukar-valas" },
        excerpt: "Berikut ini adalah rangkuman tips penting bagi nasabah retail...",
        publishedAt: "2026-06-18T10:00:00Z",
        categories: ["tips-valas"],
        mainImage: {
          asset: { _ref: "image-1" },
          alt: "Tips valas",
        },
        author: {
          name: "Diana Ningsih",
        },
      },
    ];

    (client.fetch as jest.Mock).mockResolvedValue(mockPosts);

    const ResolvedPage = await InsightPage();
    render(ResolvedPage);

    expect(screen.getByText("Tips Aman Menukarkan Uang Kertas Asing")).toBeInTheDocument();
    expect(screen.getByText("Diana Ningsih")).toBeInTheDocument();
    expect(screen.getByText("Tips Valas")).toBeInTheDocument();
    expect(
      screen.getByText("Berikut ini adalah rangkuman tips penting bagi nasabah retail...")
    ).toBeInTheDocument();
  });

  it("should handle custom/unknown categories gracefully", async () => {
    const mockPosts = [
      {
        _id: "post-2",
        title: "Kategori Kustom",
        slug: { current: "kategori-kustom" },
        publishedAt: "2026-06-18T10:00:00Z",
        categories: ["kategori-tidak-dikenal"],
        author: { name: "Penulis" },
      },
    ];

    (client.fetch as jest.Mock).mockResolvedValue(mockPosts);

    const ResolvedPage = await InsightPage();
    render(ResolvedPage);

    expect(screen.getByText("Kategori Kustom")).toBeInTheDocument();
    expect(screen.getByText("kategori-tidak-dikenal")).toBeInTheDocument();
  });

  it("should handle posts with missing optional fields gracefully", async () => {
    const mockPosts = [
      {
        _id: "post-3",
        title: "Artikel Minimalis",
        slug: { current: "artikel-minimalis" },
        // Tiada publishedAt (tanggal)
        // Tiada categories (kategori)
        // Tiada author (penulis)
        mainImage: {
          asset: { _ref: "image-minimal" },
          // Tiada alt text (menguji fallback || post.title)
        },
      },
    ];

    (client.fetch as jest.Mock).mockResolvedValue(mockPosts);

    const ResolvedPage = await InsightPage();
    render(ResolvedPage);

    expect(screen.getByText("Artikel Minimalis")).toBeInTheDocument();
    // Tanggal publikasi harusnya merender "-"
    expect(screen.getByText("-")).toBeInTheDocument();
    // Alt text pada image harusnya menggunakan judul artikel
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute("alt", "Artikel Minimalis");
  });

  it("should render fallback placeholder when mainImage is missing", async () => {
    const mockPosts = [
      {
        _id: "post-4",
        title: "Artikel Tanpa Gambar",
        slug: { current: "artikel-tanpa-gambar" },
        publishedAt: "2026-06-18T10:00:00Z",
      },
    ];

    (client.fetch as jest.Mock).mockResolvedValue(mockPosts);

    const ResolvedPage = await InsightPage();
    render(ResolvedPage);

    expect(screen.getByText("Artikel Tanpa Gambar")).toBeInTheDocument();
    expect(screen.getByText("Permata Valas Utama")).toBeInTheDocument(); // placeholder text
  });

  it("should handle error in client fetch gracefully", async () => {
    // Simulasikan kegagalan API Sanity client.fetch
    (client.fetch as jest.Mock).mockRejectedValue(new Error("Database connection error"));

    const ResolvedPage = await InsightPage();
    render(ResolvedPage);

    expect(screen.getByText("Belum ada artikel yang diterbitkan.")).toBeInTheDocument();
  });

  it("should render fallback text when there are no articles", async () => {
    (client.fetch as jest.Mock).mockResolvedValue([]);

    const ResolvedPage = await InsightPage();
    render(ResolvedPage);

    expect(screen.getByText("Belum ada artikel yang diterbitkan.")).toBeInTheDocument();
  });
});
