import React from "react";
import { render, screen } from "@testing-library/react";
import { client } from "@/lib/sanity/client";
import { notFound } from "next/navigation";

// Mock next-sanity dan client
jest.mock("next-sanity", () => ({
  createClient: jest.fn(),
  groq: (strings: TemplateStringsArray, ...values: any[]) => String.raw({ raw: strings }, ...values),
}));

jest.mock("@/lib/sanity/client", () => {
  const mockPosts = [
    {
      _id: "mock-1",
      title: "Tips Aman Menukarkan Uang Kertas Asing di Jakarta",
      slug: { _type: "slug", current: "tips-aman-tukar-valas" },
      excerpt: "Berikut ini adalah panduan praktis...",
      publishedAt: "2026-06-18T10:00:00Z",
      categories: ["tips-valas"],
      author: { name: "Diana Ningsih" },
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Menukarkan uang asing..."
            }
          ]
        }
      ]
    }
  ];
  return {
    client: {
      fetch: jest.fn(),
    },
    urlFor: () => ({
      url: () => "http://mock-image-url.com",
    }),
    MOCK_POSTS: mockPosts,
  };
});

// Mock next/image agar tidak memicu warning React
jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: ({ src, alt, fill, sizes, ...props }: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} {...props} />;
    },
  };
});

// Mock next/navigation notFound
jest.mock("next/navigation", () => ({
  notFound: jest.fn().mockImplementation(() => null),
}));

// Mock PortableTextRenderer
jest.mock("@/components/shared/portable-text-renderer", () => ({
  PortableTextRenderer: ({ value }: any) => (
    <div data-testid="rich-text">
      {value.map((v: any, idx: number) => (
        <p key={idx}>{v.children[0].text}</p>
      ))}
    </div>
  ),
}));

// Import halaman detail dan generateMetadata
import InsightDetailPage, { generateMetadata } from "./page";

describe("Insight Detail Page (/insight/[slug])", () => {
  const params = { slug: "tips-aman-tukar-valas" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render blog post details correctly when post is found", async () => {
    const mockPost = {
      _id: "post-1",
      title: "Tips Aman Menukarkan Uang Kertas Asing",
      slug: { current: "tips-aman-tukar-valas" },
      publishedAt: "2026-06-18T10:00:00Z",
      categories: ["tips-valas"],
      mainImage: {
        asset: { _ref: "image-1" },
        alt: "Gambar Tips",
      },
      author: {
        name: "Diana Ningsih",
      },
      body: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Konten paragraf pertama artikel." }],
        },
      ],
    };

    (client.fetch as jest.Mock).mockResolvedValue(mockPost);

    const ResolvedPage = await InsightDetailPage({ params });
    render(ResolvedPage);

    expect(screen.getByText("Tips Aman Menukarkan Uang Kertas Asing")).toBeInTheDocument();
    expect(screen.getByText("Diana Ningsih")).toBeInTheDocument();
    expect(screen.getByText("Konten paragraf pertama artikel.")).toBeInTheDocument();
    expect(screen.getByText("Kembali ke Insight")).toBeInTheDocument();
  });

  it("should trigger notFound() when post is not found and not in mock fallback", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(null);

    const ResolvedPage = await InsightDetailPage({ params: { slug: "non-existent-slug" } });
    expect(ResolvedPage).toBeNull();
    expect(notFound).toHaveBeenCalled();
  });

  it("should trigger notFound() when post fetch throws an error and not in mock fallback", async () => {
    (client.fetch as jest.Mock).mockRejectedValue(new Error("Connection error"));

    const ResolvedPage = await InsightDetailPage({ params: { slug: "non-existent-slug" } });
    expect(ResolvedPage).toBeNull();
    expect(notFound).toHaveBeenCalled();
  });

  it("should render blog post details from mock fallback when post is not found in CMS", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(null);

    const ResolvedPage = await InsightDetailPage({ params: { slug: "tips-aman-tukar-valas" } });
    render(ResolvedPage);

    expect(screen.getByText("Tips Aman Menukarkan Uang Kertas Asing di Jakarta")).toBeInTheDocument();
    expect(screen.getByText("Diana Ningsih")).toBeInTheDocument();
  });

  it("should render blog post details from mock fallback when CMS fetch throws an error", async () => {
    (client.fetch as jest.Mock).mockRejectedValue(new Error("Connection error"));

    const ResolvedPage = await InsightDetailPage({ params: { slug: "tips-aman-tukar-valas" } });
    render(ResolvedPage);

    expect(screen.getByText("Tips Aman Menukarkan Uang Kertas Asing di Jakarta")).toBeInTheDocument();
    expect(screen.getByText("Diana Ningsih")).toBeInTheDocument();
  });

  it("should generate proper metadata for the page", async () => {
    const mockPost = {
      title: "Judul SEO",
      metaTitle: "Judul Kustom SEO",
      metaDescription: "Deskripsi Kustom SEO",
      mainImage: {
        asset: { _ref: "image-seo" },
      },
    };

    (client.fetch as jest.Mock).mockResolvedValue(mockPost);

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Judul Kustom SEO");
    expect(metadata.description).toBe("Deskripsi Kustom SEO");
  });

  it("should fallback to title and excerpt when SEO metadata is missing", async () => {
    const mockPost = {
      title: "Judul Standar",
      excerpt: "Ringkasan Standar",
    };

    (client.fetch as jest.Mock).mockResolvedValue(mockPost);

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Judul Standar");
    expect(metadata.description).toBe("Ringkasan Standar");
  });

  it("should generate metadata from mock fallback when post is not found in CMS", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(null);

    const metadata = await generateMetadata({ params: { slug: "tips-aman-tukar-valas" } });
    expect(metadata.title).toBe("Tips Aman Menukarkan Uang Kertas Asing di Jakarta");
    expect(metadata.description).toBe("Berikut ini adalah panduan praktis...");
  });

  it("should return empty metadata if post fetch throws an error", async () => {
    (client.fetch as jest.Mock).mockRejectedValue(new Error("Database error"));

    const metadata = await generateMetadata({ params });
    expect(metadata).toEqual({});
  });
});
