import { defineType, defineField } from "sanity";

export const cabang = defineType({
  name: "cabang",
  title: "Cabang / Lokasi Gerai",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Cabang",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Alamat Lengkap",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Nomor Telepon",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "Nomor WhatsApp",
      type: "string",
    }),
    defineField({
      name: "mapsUrl",
      title: "Google Maps URL (Share Link)",
      type: "url",
    }),
    defineField({
      name: "mapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
    }),
    defineField({
      name: "openingHours",
      title: "Jam Operasional",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "active",
      title: "Aktif",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Urutan Tampil",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "address" },
  },
  orderings: [
    { title: "Urutan Tampil", name: "orderRank", by: [{ field: "orderRank", direction: "asc" }] },
  ],
});
