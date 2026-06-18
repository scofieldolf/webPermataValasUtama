---
paths:
  - "sanity/**"
  - "src/lib/sanity/**"
---

# Sanity CMS Rules

## Schema Naming

- Schema type names: `camelCase` → `blogPost`, `kursSnapshot`, `cabang`
- Field names: `camelCase`
- Tidak ada spasi atau karakter khusus di nama schema

## Content Types yang Ada

```typescript
// sanity/schemas/
blogPost.ts      // Artikel insight valas
cabang.ts        // Data cabang/lokasi
testimonial.ts   // Testimoni nasabah
siteConfig.ts    // Konfigurasi global (kontak, sosmed, dll)
```

## GROQ Queries

Selalu define query sebagai konstanta di `src/lib/sanity/queries.ts`:

```typescript
// BENAR
export const BLOG_POSTS_QUERY = groq`*[_type == "blogPost"] | order(publishedAt desc)[0...10] {
  _id, title, slug, excerpt, publishedAt
}`

// SALAH — inline query di component
const data = await client.fetch(`*[_type == "blogPost"]`)
```

## Image Handling

Gunakan `@sanity/image-url` + Next.js `Image`:
```typescript
import imageUrlBuilder from '@sanity/image-url'
// Selalu specify width dan quality untuk optimasi
```

## Sanity Studio

- Studio path: `/studio` (App Router catch-all)
- Tidak diproteksi auth di fase 1 (akses via URL langsung)
- Fase 2: tambah NextAuth untuk proteksi studio
