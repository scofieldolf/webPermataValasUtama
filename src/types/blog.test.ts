import type { Author, BlogPost } from "./blog";

describe("Blog Type Definitions", () => {
  it("should enforce correct structure for Author", () => {
    const author: Author = {
      name: "John Doe",
      image: {
        asset: {
          _ref: "image-12345",
          _type: "reference",
        },
      },
      bio: "An experienced writer.",
    };

    expect(author.name).toBe("John Doe");
    expect(author.bio).toBe("An experienced writer.");
  });

  it("should enforce correct structure for BlogPost", () => {
    const post: BlogPost = {
      _id: "post-1",
      title: "Tren Kurs USD 2026",
      slug: {
        _type: "slug",
        current: "tren-kurs-usd-2026",
      },
      excerpt: "Analisis tren pergerakan nilai tukar USD terhadap IDR.",
      publishedAt: "2026-06-18T10:00:00Z",
      categories: ["analisis-pasar"],
      mainImage: {
        asset: {
          _ref: "image-abc",
          _type: "reference",
        },
        alt: "Grafik USD",
      },
      body: [],
      author: {
        name: "Jane Smith",
      },
      metaTitle: "Tren Kurs USD 2026 | Permata Valas Utama",
      metaDescription: "Temukan analisis terbaru tren pergerakan USD.",
    };

    expect(post.title).toBe("Tren Kurs USD 2026");
    expect(post.slug.current).toBe("tren-kurs-usd-2026");
    expect(post.author?.name).toBe("Jane Smith");
  });
});
