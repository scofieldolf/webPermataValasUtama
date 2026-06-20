# Vercel Analytics and GA4 Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Vercel Analytics for core web vitals and visitor tracking, and Google Analytics 4 for deeper marketing insights into the Next.js 14 App Router application.

**Architecture:** Install necessary packages and wrap the Root Layout (`src/app/layout.tsx`) with the Vercel `<Analytics />` and Next.js `<GoogleAnalytics />` components. Ensure Google Analytics uses the environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

**Tech Stack:** Next.js 14, `@vercel/analytics`, `@next/third-parties`

## Global Constraints

- Must use `pnpm` as the package manager
- Must use TypeScript strict mode
- Must not use `any` or `@ts-ignore`
- Must preserve existing layout elements like `Header`, `Footer`, and `WhatsAppButton`

---

### Task 1: Install Analytics Packages

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: Installed `@vercel/analytics` and `@next/third-parties` dependencies.

- [ ] **Step 1: Install packages via pnpm**

Run: `pnpm add @vercel/analytics @next/third-parties`
Expected: Packages added successfully to dependencies.

- [ ] **Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: install @vercel/analytics and @next/third-parties"
```

### Task 2: Implement Vercel Analytics and GA4 in Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: The newly installed packages.
- Produces: Integrated analytics in the global application shell.

- [ ] **Step 1: Update RootLayout to include analytics components**

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { SITE_CONFIG } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Money Changer Berizin Resmi Jakarta`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  keywords: [
    "money changer Jakarta",
    "tukar uang resmi",
    "kurs dollar hari ini",
    "valuta asing Jakarta",
    "tukar valas terpercaya",
    "KUPU Bank Indonesia",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | Money Changer Berizin Resmi Jakarta`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run type check to ensure no errors**

Run: `pnpm type-check`
Expected: No TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: integrate vercel analytics and google analytics 4"
```

### Task 3: Update PROGRESS.md Status

**Files:**
- Modify: `docs/PROGRESS.md`

**Interfaces:**
- Consumes: The completion of Tasks 1 and 2.

- [ ] **Step 1: Mark Analytics tasks as complete in PROGRESS.md**

Locate the `Vercel Analytics` and `Google Analytics 4` rows under `## Integrasi` and change the status to `✅`. Also update the Phase 4 status to 100%. Add a note in the `## Log Sesi` under the current session.

```markdown
...
| Vercel Analytics | ✅ | Diimplementasikan menggunakan @vercel/analytics. |
| Google Analytics 4 | ✅ | Diimplementasikan menggunakan @next/third-parties/google. |
...
```

Update Phase 4 status:
```markdown
| Fase 4 — Launch | ✅ Selesai | 100% |
```

- [ ] **Step 2: Commit**

```bash
git add docs/PROGRESS.md
git commit -m "docs: mark analytics tasks as completed in progress tracking"
```