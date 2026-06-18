# Sanity Studio Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install and configure Sanity Studio v3 embedded in Next.js 14 App Router with 4 content schemas (blogPost, cabang, testimonial, siteConfig).

**Architecture:** Sanity config files at project root (`sanity.config.ts`, `sanity.cli.ts`), schemas in `sanity/schemas/`, and Studio route at `src/app/studio/[[...tool]]/page.tsx` using `next-sanity/studio`.

**Tech Stack:** Next.js 14.2.3, Sanity v3 (^3.37), next-sanity ^13.1.0, TypeScript strict mode

## Global Constraints

- ALL schemas use camelCase for type names
- ALL queries go in `src/lib/sanity/queries.ts`, never inline
- Studio route uses `history="hash"` for embedded App Router mode
- `sanity.config.ts` and `sanity.cli.ts` at project root level
- No `any` types, no `@ts-ignore`
- Environment variables from `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
- Branding: title "Permata Valas CMS", logo using gold/navy brand colors

---
### Task 1: Install sanity package & create config files

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity.cli.ts`
- Modify: `package.json` (add sanity dependency)

**Interfaces:**
- Produces: `sanity.config.ts` — exports default config object used by Studio route
- Produces: `sanity.cli.ts` — exports default CLI config for `sanity` CLI commands

- [ ] **Step 1: Install sanity package**

Run: `pnpm add sanity@^3.37`

Expected: sanity v3.37+ added to package.json dependencies

- [ ] **Step 2: Create `sanity.config.ts`**

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schema";
import { visionTool } from "@sanity/vision";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Permata Valas CMS",
  subtitle: "PT Permata Valas Utama",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schema,
  },
  studio: {
    components: {
      logo: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #B8860B, #F5E6A3)",
            }}
          />
          <span style={{ fontWeight: 700, fontSize: 16, color: "#042C53" }}>
            Permata Valas
          </span>
        </div>
      ),
    },
  },
});
```

- [ ] **Step 3: Create `sanity.cli.ts`**

```typescript
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
```

- [ ] **Step 4: Create shared Sanity config helper**

Create: `sanity/config.ts`

```typescript
export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-17" as const,
};
```

This file will be imported by both sanity.config.ts and sanity.cli.ts for DRY config.

Then update `sanity.config.ts` to import from it:

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schema";
import { SANITY_CONFIG } from "./sanity/config";

export default defineConfig({
  basePath: "/studio",
  ...SANITY_CONFIG,
  title: "Permata Valas CMS",
  plugins: [structureTool(), visionTool()],
  schema: { types: schema },
  studio: {
    components: {
      logo: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #B8860B, #F5E6A3)" }} />
          <span style={{ fontWeight: 700, fontSize: 16, color: "#042C53" }}>Permata Valas</span>
        </div>
      ),
    },
  },
});
```

And update `sanity.cli.ts`:

```typescript
import { defineCliConfig } from "sanity/cli";
import { SANITY_CONFIG } from "./sanity/config";

export default defineCliConfig({
  api: SANITY_CONFIG,
});
```

- [ ] **Step 5: Update `src/lib/sanity/client.ts` to use shared config**

```typescript
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_CONFIG } from "../../../sanity/config";

export const client = createClient({
  ...SANITY_CONFIG,
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: install sanity v3 and create config files"
```
---

### Task 2: Create schema index and all 4 schemas

**Files:**
- Create: `sanity/schemas/blogPost.ts`
- Create: `sanity/schemas/cabang.ts`
- Create: `sanity/schemas/testimonial.ts`
- Create: `sanity/schemas/siteConfig.ts`
- Create: `sanity/schema.ts`

**Interfaces:**
- Produces: `sanity/schema.ts` — exports `schema` array consumed by sanity.config.ts

- [ ] **Step 1: Create `sanity/schemas/blogPost.ts`**

```typescript
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
```

- [ ] **Step 2: Create `sanity/schemas/author.ts`** (referenced by blogPost)

```typescript
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
```

- [ ] **Step 3: Create blockContent type for rich text in blog posts**

Create: `sanity/schemas/blockContent.ts`

```typescript
import { defineType, defineArrayMember } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Konten Artikel",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          { name: "link", title: "URL", type: "object", fields: [{ name: "href", title: "Link URL", type: "url" }] },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),
  ],
});
```

- [ ] **Step 4: Create `sanity/schemas/cabang.ts`**

```typescript
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
```

- [ ] **Step 5: Create `sanity/schemas/testimonial.ts`**

```typescript
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
```

- [ ] **Step 6: Create `sanity/schemas/siteConfig.ts`**

```typescript
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
```

- [ ] **Step 7: Create `sanity/schema.ts`** (schema index)

```typescript
import type { SchemaTypeDefinition } from "sanity";
import { blogPost } from "./schemas/blogPost";
import { author } from "./schemas/author";
import { blockContent } from "./schemas/blockContent";
import { cabang } from "./schemas/cabang";
import { testimonial } from "./schemas/testimonial";
import { siteConfig } from "./schemas/siteConfig";

export const schema: SchemaTypeDefinition[] = [
  blogPost,
  author,
  blockContent,
  cabang,
  testimonial,
  siteConfig,
];
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: create all Sanity schemas (blogPost, cabang, testimonial, siteConfig)"
```
---

### Task 3: Create Studio route in Next.js App Router

**Files:**
- Create/Modify: `src/app/studio/[[...tool]]/page.tsx`

**Interfaces:**
- Consumes: `sanity.config.ts` — default export
- Produces: Studio route at `/studio` serving the embedded Sanity Studio

- [ ] **Step 1: Create `src/app/studio/[[...tool]]/page.tsx`**

```typescript
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} history="hash" />;
}
```

This uses:
- `"next-sanity/studio"` for the `NextStudio` component — renders the full Sanity Studio
- `history="hash"` — required for embedded Studio in App Router (avoids conflicts with Next.js routing)
- Re-exports `metadata` and `viewport` from `next-sanity/studio` for proper SEO/head tags

- [ ] **Step 2: Verify build**

Run: `pnpm type-check`

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add embedded Sanity Studio route at /studio"
```
---

### Task 4: Update progress documentation

**Files:**
- Modify: `docs/PROGRESS.md`
- Modify: `docs/DECISIONS.md`

- [ ] **Step 1: Update PROGRESS.md**

Update the Sanity CMS row:
```
| Sanity CMS | 🚧 | Studio tersedia di /studio, 6 schemas siap. |
```

Update overall Fase 3 progress to 70%.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "docs: update progress after Sanity Studio setup"
```
