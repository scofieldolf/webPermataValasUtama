import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Artikel Insight Valas",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul Artikel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Isi Artikel",
      type: "blockContent",
    }),
    defineField({
      name: "mainImage",
      title: "Gambar Utama",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Teks Alternatif (Alt)", type: "string" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal Publikasi",
      type: "datetime",
    }),
    defineField({
      name: "categories",
      title: "Kategori",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Tips Valas", value: "tips-valas" },
          { title: "Analisis Pasar", value: "analisis-pasar" },
          { title: "Regulasi BI", value: "regulasi-bi" },
          { title: "Berita Finansial", value: "berita-finansial" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Penulis",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "mainImage",
    },
  },
});
