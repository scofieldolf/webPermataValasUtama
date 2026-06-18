# Permata Valas Utama — Company Profile Website

> Project memory for Claude Code CLI. Dibaca otomatis setiap sesi dimulai.
> Selalu patuhi instruksi di file ini dan file `.claude/rules/` yang relevan.

## Project Overview

Website company profile untuk **Permata Valas Utama**, perusahaan money changer resmi
berizin Bank Indonesia yang beroperasi di Jakarta. Tujuan utama: membangun kepercayaan,
menampilkan kurs real-time, dan mengkonversi pengunjung menjadi nasabah.

**PRD Reference:** `docs/PRD.md`
**Tech decisions:** `docs/DECISIONS.md`
**Progress tracking:** `docs/PROGRESS.md`

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript (strict mode)
- **Styling:** Tailwind CSS v3 + shadcn/ui
- **Animation:** Framer Motion
- **CMS:** Sanity.io v3
- **Charts:** Recharts
- **Maps:** Google Maps API + @react-google-maps/api
- **Email:** Resend
- **Analytics:** Vercel Analytics + Google Analytics 4
- **Deploy:** Vercel (production), staging branch auto-deploy
- **Package Manager:** pnpm (JANGAN pakai npm atau yarn)

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (site)/             # Route group untuk public pages
│   │   ├── page.tsx        # Beranda /
│   │   ├── kurs/           # /kurs - Kurs hari ini
│   │   ├── layanan/        # /layanan
│   │   ├── tentang/        # /tentang
│   │   ├── lokasi/         # /lokasi
│   │   ├── kontak/         # /kontak
│   │   └── insight/        # /insight (blog)
│   ├── api/                # API Routes
│   │   ├── kurs/route.ts   # GET kurs terkini (ISR 5 menit)
│   │   └── contact/route.ts
│   └── studio/[[...tool]]/ # Sanity Studio (admin CMS)
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── layout/             # Header, Footer, Navigation
│   ├── kurs/               # KursTicker, KursTable, KalkCalc
│   ├── sections/           # Hero, Features, Testimonials, dll
│   └── shared/             # WhatsAppButton, Badge, dll
├── lib/
│   ├── kurs.ts             # Fetch & transform data kurs
│   ├── sanity/             # Sanity client & queries
│   └── utils.ts            # cn(), formatRupiah(), dll
├── types/
│   └── kurs.ts             # KursData, MataUang, dll
└── config/
    └── site.ts             # Metadata, nav links, kontak perusahaan
```

## Build & Dev Commands

```bash
pnpm dev          # Development server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint check
pnpm type-check   # tsc --noEmit
pnpm test         # Jest + Testing Library
pnpm test:e2e     # Playwright end-to-end
pnpm analyze      # Bundle analyzer
```

## Coding Standards

### TypeScript
- Selalu pakai strict mode — tidak ada `any`, tidak ada `@ts-ignore`
- Semua props harus punya interface eksplisit, bukan `object` atau inline type
- Gunakan `type` untuk union/primitive, `interface` untuk object shape
- Import types dengan `import type { ... }`

### React / Next.js
- Server Components by default — tambah `'use client'` hanya jika BENAR-BENAR perlu
- Semua fetch data dari Server Component, bukan useEffect
- Gunakan Next.js `Image` untuk semua gambar (bukan `<img>`)
- Gunakan `next/font` untuk semua font (bukan CDN `<link>`)
- ISR dengan `revalidate = 300` (5 menit) untuk halaman kurs

### Styling
- Gunakan Tailwind utility classes, bukan CSS inline atau CSS modules
- Class name digabung dengan fungsi `cn()` dari `@/lib/utils`
- Responsive: mobile-first — `sm:` `md:` `lg:` `xl:`
- Dark mode support dengan `dark:` prefix (sistem theme dari `next-themes`)

### Data Kurs
- Semua nilai kurs simpan sebagai `number` (bukan `string`)
- Format display: `Intl.NumberFormat('id-ID')` — TIDAK boleh `toLocaleString()` langsung
- Kurs beli/jual harus SELALU ditampilkan bersamaan — tidak boleh salah satu saja
- Timestamp update wajib ditampilkan di semua tabel kurs

### Penamaan
- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Functions/hooks: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`
- CSS variables: `--pv-color-gold-primary` (prefix `pv-` untuk brand tokens)

## Konten & Compliance

### Data Perusahaan (JANGAN ubah tanpa konfirmasi)
- Nama resmi: **PT Permata Valas Utama**
- Izin BI: harus tampil di footer setiap halaman
- Kontak utama: harus konsisten di semua halaman
- Bahasa: Indonesia sebagai default, tidak ada mixed language UI

### KYC/AML
- Website TIDAK menyimpan data sensitif nasabah (KTP, NIK, dll)
- Form kontak hanya boleh menyimpan: nama, email, telepon, pesan
- Semua form harus ada reCAPTCHA v3
- Privacy policy wajib ada sebelum launch

### SEO
- Setiap halaman wajib punya `metadata` eksplisit (title, description, og:image)
- Gunakan `generateMetadata()` untuk halaman dinamis
- Schema.org `LocalBusiness` + `FinancialService` di halaman utama
- Canonical URL wajib di setiap halaman

## Environment Variables

```bash
# .env.local (gitignored)
NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=        # format: 628xxxxxxxxx
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# Server-only
SANITY_API_TOKEN=
RESEND_API_KEY=
RECAPTCHA_SECRET_KEY=
EXCHANGE_RATE_API_SECRET=
```

## Hal yang TIDAK boleh dilakukan

- Jangan commit file `.env.local` atau `.env*.local`
- Jangan hardcode nomor telepon, email, atau kurs di dalam kode — gunakan `config/site.ts`
- Jangan buat komponen baru sebelum cek apakah sudah ada di `components/ui/` atau shadcn
- Jangan pakai `console.log` di production code — gunakan proper error handling
- Jangan fetch API kurs langsung dari client component — selalu via API route server
- Jangan gunakan `<a href>` untuk internal links — gunakan `<Link>` dari Next.js
