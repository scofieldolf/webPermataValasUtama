import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { client, urlFor } from "@/lib/sanity/client";
import { POST_DETAIL_QUERY } from "@/lib/sanity/queries";
import type { BlogPost } from "@/types/blog";
import { PortableTextRenderer } from "@/components/shared/portable-text-renderer";

interface PageProps {
  params: {
    slug: string;
  };
}

// Caching page for 5 minutes
export const revalidate = 300;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    const post = await client.fetch<BlogPost | null>(POST_DETAIL_QUERY, { slug });
    if (!post) return {};

    const mainImageUrl = post.mainImage ? urlFor(post.mainImage).url() : undefined;

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: mainImageUrl ? [{ url: mainImageUrl }] : undefined,
      },
    };
  } catch (error) {
    return {};
  }
}

function formatPublishDate(dateString?: string): string {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = params;
  let post: BlogPost | null = null;

  try {
    post = await client.fetch<BlogPost | null>(POST_DETAIL_QUERY, { slug });
  } catch (error) {
    post = null;
  }

  if (!post) {
    notFound();
    return null;
  } else {
    const formattedDate = formatPublishDate(post.publishedAt);
    const mainImageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/insight"
            className="inline-flex items-center text-xs font-semibold text-pv-navy-deep hover:text-pv-gold-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Insight
          </Link>
        </div>

        <article className="space-y-8">
          {/* Article Header */}
          <div className="space-y-4 border-b border-gray-100 pb-6">
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-pv-navy-deep leading-tight">
              {post.title}
            </h1>

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              {post.author && (
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1.5 text-pv-gold-primary" />
                  {post.author.name}
                </span>
              )}
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          {mainImageUrl && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
              <Image
                src={mainImageUrl}
                alt={post.mainImage?.alt || post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="max-w-3xl mx-auto">
            <PortableTextRenderer value={post.body} />
          </div>
        </article>
      </div>
    );
  }
}
