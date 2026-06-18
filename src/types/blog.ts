export interface SanityImage {
  _type?: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

export interface Slug {
  _type: "slug";
  current: string;
}

export interface Author {
  name: string;
  image?: SanityImage;
  bio?: string;
}

export type BlogPostCategory = "tips-valas" | "analisis-pasar" | "regulasi-bi" | "berita-finansial";

export interface BlogPost {
  _id: string;
  title: string;
  slug: Slug;
  excerpt?: string;
  body: any[]; // blockContent adalah array of blocks
  mainImage?: SanityImage;
  publishedAt?: string;
  categories?: BlogPostCategory[];
  author?: Author;
  metaTitle?: string;
  metaDescription?: string;
}
