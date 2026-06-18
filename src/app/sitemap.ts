import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";

interface SitemapPost {
  slug: { current: string };
  publishedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // 1. Static pages
  const staticRoutes = [
    "",
    "/kurs",
    "/layanan",
    "/tentang",
    "/lokasi",
    "/kontak",
    "/insight",
  ];

  const staticMaps = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/kurs" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : route === "/kurs" ? 0.9 : 0.7,
  }));

  // 2. Dynamic Blog/Insight pages from Sanity CMS
  let dynamicMaps: MetadataRoute.Sitemap = [];
  try {
    const postsQuery = groq`*[_type == "blogPost" && publishedAt < now()] { slug, publishedAt }`;
    const posts = await client.fetch<SitemapPost[]>(postsQuery);

    if (posts && Array.isArray(posts)) {
      dynamicMaps = posts.map((post) => ({
        url: `${baseUrl}/insight/${post.slug.current}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }));
    }
  } catch (error) {
    // Fail-safe: jika Sanity API gagal, kembalikan rute statis saja secara aman
    dynamicMaps = [];
  }

  return [...staticMaps, ...dynamicMaps];
}
