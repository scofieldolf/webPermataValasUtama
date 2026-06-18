import { defineType, defineField } from "sanity";

export const author = defineType({
  name: "author",
  title: "Penulis",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
    }),
    defineField({
      name: "bio",
      title: "Bio Singkat",
      type: "text",
      rows: 2,
    }),
  ],
});
