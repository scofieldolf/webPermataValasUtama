# Update Company Contact & Operating Hours

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the company's address, WhatsApp number, and operational hours across the website.

**Architecture:** Modify `SITE_CONFIG` in `src/config/site.ts` to store the new WhatsApp number, address, and an `operatingHours` object. Then, update the components that consume this data (the JSON-LD structured data in the homepage and the explicit text in the "Lokasi" page) so they pull dynamically from the central config.

**Tech Stack:** Next.js 14, TypeScript

## Global Constraints

- Must use `pnpm` as the package manager
- Must use TypeScript strict mode
- Must not use `any` or `@ts-ignore`
- Must preserve existing UI layout

---

### Task 1: Update Central Config

**Files:**
- Modify: `src/config/site.ts`

**Interfaces:**
- Produces: Updated `contact` object in `SITE_CONFIG` with `address`, `whatsapp`, `whatsappDisplay`, and a new `operatingHours` object.

- [ ] **Step 1: Write the updated config**

Update the contact section in `src/config/site.ts`:

```typescript
  contact: {
    whatsapp: "6282246667301",
    whatsappDisplay: "+62 822-4666-7301",
    phone: "+62 21 5366 4614", // Keep existing phone number or update if provided (user didn't explicitly give a new fixed line, keep current or remove if obsolete, but let's keep the existing phone line from the prompt context if none was provided. Wait, the prompt provided: WhatsApp 0822-4666-7301. I'll just update WhatsApp and address). Wait, I will keep phone as "+62 21 5366 4614" which is in the codebase.
    email: "info@permatavalas.co.id", // keep existing or blank depending on what's there
    address: "Mall ITC Permata Hijau, Jl. Arteri Permata Hijau No.01 Lantai Dasar C18, RT.11/RW.10, Grogol Utara, Kec. Kebayoran Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12210",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.254714652259!2d106.80879687498045!3d-6.223482593764655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14cf4c76a59%3A0x89ee1722e0329ff0!2sSudirman%20Central%20Business%20District!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    operatingHours: {
      weekdays: { days: "Senin - Jumat", time: "09.00 - 19.00 WIB", opens: "09:00", closes: "19:00" },
      weekends: { days: "Sabtu - Minggu & Hari Libur", time: "10.00 - 18.00 WIB", opens: "10:00", closes: "18:00" }
    }
  },
```

- [ ] **Step 2: Commit**

```bash
git add src/config/site.ts
git commit -m "chore: update company address, whatsapp, and add operating hours config"
```

### Task 2: Update Homepage JSON-LD

**Files:**
- Modify: `src/app/(site)/page.tsx`

**Interfaces:**
- Consumes: The `operatingHours` and `address` from `SITE_CONFIG`.

- [ ] **Step 1: Update the JSON-LD schema**

In `src/app/(site)/page.tsx`, update the `address` and `openingHoursSpecification` fields:

```typescript
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mall ITC Permata Hijau, Jl. Arteri Permata Hijau No.01 Lantai Dasar C18",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12210",
      "addressCountry": "ID"
    },
```

And update `openingHoursSpecification` to an array since there are two different hours:

```typescript
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": SITE_CONFIG.contact.operatingHours.weekdays.opens,
        "closes": SITE_CONFIG.contact.operatingHours.weekdays.closes
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday", "PublicHolidays"],
        "opens": SITE_CONFIG.contact.operatingHours.weekends.opens,
        "closes": SITE_CONFIG.contact.operatingHours.weekends.closes
      }
    ],
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(site\)/page.tsx
git commit -m "feat: sync json-ld structured data with new address and operating hours"
```

### Task 3: Update Lokasi Page UI

**Files:**
- Modify: `src/app/(site)/lokasi/page.tsx`

**Interfaces:**
- Consumes: `SITE_CONFIG.contact.operatingHours`.

- [ ] **Step 1: Update the rendering of Jam Operasional**

In `src/app/(site)/lokasi/page.tsx`, replace the hardcoded hours:

```tsx
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Jam Operasional</span>
                <div className="flex items-center space-x-2 text-xs text-pv-navy-deep font-semibold">
                  <Clock className="w-4 h-4 text-pv-gold-primary" />
                  <span>{SITE_CONFIG.contact.operatingHours.weekdays.days}: {SITE_CONFIG.contact.operatingHours.weekdays.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-pv-navy-deep font-semibold">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{SITE_CONFIG.contact.operatingHours.weekends.days}: {SITE_CONFIG.contact.operatingHours.weekends.time}</span>
                </div>
              </div>
```

- [ ] **Step 2: Run tests and type-check**

Run: `pnpm type-check && pnpm test`
Expected: Passes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(site\)/lokasi/page.tsx
git commit -m "feat: render dynamic operating hours on lokasi page"
```