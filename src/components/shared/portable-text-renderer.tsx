import React from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/client";

interface PortableTextRendererProps {
  value: any[];
}

const customComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-lg sm:text-xl font-bold text-pv-navy-deep mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-sm sm:text-base font-bold text-pv-navy-deep mt-6 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-pv-gold-primary bg-pv-ivory-surface/40 pl-4 py-2 my-6 text-xs sm:text-sm text-gray-500 italic rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-600 space-y-2 mb-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 text-xs sm:text-sm text-gray-600 space-y-2 mb-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-800">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      // Pastikan URL aman untuk mencegah XSS melalui protokol berbahaya seperti javascript:
      const isSafe = /^(https?:\/\/|mailto:|tel:|\/)/i.test(href);
      const safeHref = isSafe ? href : "#";
      return (
        <a
          href={safeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pv-gold-primary hover:underline font-semibold"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="my-8 space-y-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Gambar artikel"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          {value.alt && (
            <p className="text-[10px] text-gray-400 text-center italic">
              {value.alt}
            </p>
          )}
        </div>
      );
    },
  },
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || !Array.isArray(value)) return null;
  return <PortableText value={value} components={customComponents} />;
}
