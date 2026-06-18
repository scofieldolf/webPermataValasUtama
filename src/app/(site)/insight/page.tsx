import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { client, urlFor } from "@/lib/sanity/client";
import { ALL_POSTS_QUERY } from "@/lib/sanity/queries";
import type { BlogPost, BlogPostCategory } from "@/types/blog";

// Set revalidation interval to 5 minutes (consistent with exchange rate page)
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insight & Analisis Valas",
  description:
    "Temukan analisis pasar valuta asing terbaru, berita finansial global, tips liburan hemat luar negeri, serta panduan kepatuhan regulasi transaksi valas.",
};

// Map categories to user-friendly titles and colors
const CATEGORY_MAP: Record<BlogPostCategory, { label: string; bg: string; text: string }> = {
  "tips-valas": {
    label: "Tips Valas",
    bg: "bg-amber-50 border border-amber-100",
    text: "text-amber-700",
  },
  "analisis-pasar": {
    label: "Analisis Pasar",
    bg: "bg-emerald-50 border border-emerald-100",
    text: "text-emerald-700",
  },
  "regulasi-bi": {
    label: "Regulasi BI",
    bg: "bg-blue-50 border border-blue-100",
    text: "text-blue-700",
  },
  "berita-finansial": {
    label: "Berita Finansial",
    bg: "bg-purple-50 border border-purple-100",
    text: "text-purple-700",
  },
};

function formatPublishDate(dateString?: string): string {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export default async function InsightPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await client.fetch<BlogPost[]>(ALL_POSTS_QUERY);
  } catch (error) {
    // Graceful error handling in case Sanity API is unreachable
    posts = [];
  }

  // Get primary category details
  const getCategoryDetails = (postCategories?: BlogPostCategory[]) => {
    if (!postCategories || postCategories.length === 0) return null;
    const key = postCategories[0];
    return CATEGORY_MAP[key] || { label: key, bg: "bg-gray-50 border border-gray-100", text: "text-gray-600" };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-gray-100 pb-6 mb-12 text-center lg:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-pv-navy-deep">
          Insight & Analisis Valas
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-3xl">
          Temukan analisis pasar valuta asing terbaru, tips keuangan, informasi regulasi perbankan, dan berita finansial terkini untuk transaksi valas Anda yang cerdas.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Belum ada artikel yang diterbitkan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const category = getCategoryDetails(post.categories);
            const formattedDate = formatPublishDate(post.publishedAt);
            const mainImageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;

            return (
              <article
                key={post._id}
                className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                    {mainImageUrl ? (
                      <Image
                        src={mainImageUrl}
                        alt={post.mainImage?.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-pv-navy-deep/5 text-pv-navy-deep font-serif font-bold text-sm">
                        Permata Valas Utama
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      {category && (
                        <span className={`px-2.5 py-0.5 rounded-full font-semibold ${category.bg} ${category.text}`}>
                          {category.label}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {formattedDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base font-bold text-pv-navy-deep line-clamp-2 hover:text-pv-gold-primary transition-colors">
                      <Link href={`/insight/${post.slug.current}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-50 text-[11px] text-gray-500">
                  {post.author && (
                    <span className="flex items-center">
                      <User className="w-3.5 h-3.5 mr-1 text-pv-gold-primary" />
                      {post.author.name}
                    </span>
                  )}
                  <Link
                    href={`/insight/${post.slug.current}`}
                    className="flex items-center font-bold text-pv-navy-deep hover:text-pv-gold-primary transition-colors"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
