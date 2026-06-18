import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimoni Nasabah",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Nasabah",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Peran / Jabatan",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Perusahaan",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Isi Testimoni",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
    }),
    defineField({
      name: "active",
      title: "Tampilkan",
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
    select: { title: "name", subtitle: "company" },
  },
  orderings: [
    { title: "Urutan Tampil", name: "orderRank", by: [{ field: "orderRank", direction: "asc" }] },
  ],
});
