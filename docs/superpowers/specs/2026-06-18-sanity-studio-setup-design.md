# Sanity Studio Setup — Design Document

## Overview

Setup Sanity Studio v3 embedded in Next.js App Router and define 4 content schemas (blogPost, cabang, testimonial, siteConfig) to enable dynamic content management for the Permata Valas website.

## Architecture

- Studio lives at `/studio` route via Next.js App Router catch-all (`src/app/studio/[[...tool]]/page.tsx`)
- Sanity config files at project root (`sanity.config.ts`, `sanity.cli.ts`)
- Schemas in `sanity/schemas/` folder, imported by `sanity/schema.ts`
- Existing `src/lib/sanity/client.ts` and `src/lib/sanity/queries.ts` already set up

## Content Types

### blogPost (for /insight pages)
- title (string, required)
- slug (slug, required, unique)
- excerpt (text)
- body (block content / Portable Text)
- mainImage (image)
- publishedAt (datetime)
- categories (array of strings)
- author (reference to another doc)
- metaTitle, metaDescription (for SEO)

### cabang (for /lokasi branch data)
- name (string, required)
- address (string)
- phone, whatsapp (strings)
- mapsUrl, mapsEmbedUrl (strings)
- openingHours (text)
- active (boolean)
- orderRank (number, for manual ordering)

### testimonial (for home page testimonials)
- name (string, required)
- role, company (strings)
- content (text, required)
- rating (number, 1-5)
- active (boolean)
- orderRank (number)

### siteConfig (singleton)
- contactInfo: object with address, phone, email, whatsapp
- socialLinks: object with instagram, facebook
- seoDefaults: object with meta title, description

## Files to Create

1. `sanity.config.ts` — Studio config with project ID, dataset, branding
2. `sanity.cli.ts` — CLI config for sanity commands
3. `sanity/schema.ts` — Schema index
4. `sanity/schemas/blogPost.ts`
5. `sanity/schemas/cabang.ts`
6. `sanity/schemas/testimonial.ts`
7. `sanity/schemas/siteConfig.ts`
8. `src/app/studio/[[...tool]]/page.tsx` — Studio route

## Dependencies

Need to add: `sanity` package (v3) for Studio components.
Already installed: `next-sanity`, `@sanity/client`, `@sanity/image-url`.

## Migration Path

- Phase 1: Create schemas + Studio route (this task)
- Phase 2 (future): Populate data through Studio
- Phase 3 (future): Connect dynamic data to frontend components
