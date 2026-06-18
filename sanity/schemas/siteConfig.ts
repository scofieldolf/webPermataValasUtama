import { defineType, defineField } from "sanity";

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Konfigurasi Website",
  type: "document",
  groups: [
    { name: "contact", title: "Kontak" },
    { name: "social", title: "Media Sosial" },
    { name: "seo", title: "SEO Default" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Judul Website",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "description",
      title: "Deskripsi Website",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "contactInfo",
      title: "Informasi Kontak",
      type: "object",
      group: "contact",
      fields: [
        { name: "address", title: "Alamat", type: "text", rows: 3 },
        { name: "phone", title: "Telepon", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "whatsapp", title: "WhatsApp", type: "string" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Media Sosial",
      type: "object",
      group: "social",
      fields: [
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "facebook", title: "Facebook URL", type: "url" },
      ],
    }),
    defineField({
      name: "licenseNumber",
      title: "Nomor Izin BI (KUPU)",
      type: "string",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
