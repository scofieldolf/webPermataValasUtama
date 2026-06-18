# DECISIONS.md — Architectural Decision Records

> Dokumentasi setiap keputusan teknis penting beserta alasannya.
> Update file ini setiap kali ada keputusan arsitektur baru.

---

## ADR-001: Next.js 14 App Router sebagai Framework

**Tanggal:** 2026-06-17
**Status:** Accepted

**Keputusan:** Menggunakan Next.js 14 dengan App Router (bukan Pages Router)

**Alasan:**
- Server Components by default = performa lebih baik (lebih sedikit JS di browser)
- ISR (Incremental Static Regeneration) ideal untuk data kurs yang update periodik
- Built-in image optimization via `next/image`
- SEO-friendly dengan metadata API baru
- Konsisten dengan NusaApi project (same tech stack)

**Konsekuensi:**
- Learning curve lebih tinggi dari Pages Router
- Beberapa library lama belum support App Router penuh

---

## ADR-002: Tailwind CSS + shadcn/ui sebagai Design System

**Tanggal:** 2026-06-17
**Status:** Accepted

**Keputusan:** Tailwind CSS untuk styling utility + shadcn/ui untuk base components

**Alasan:**
- shadcn/ui bukan dependency — code di-copy ke project, lebih control
- Accessible by default (Radix UI primitives)
- Mudah dikustomisasi dengan Tailwind
- Tidak ada bundle bloat dari component library eksternal

**Konsekuensi:**
- shadcn components perlu diinstall satu per satu (`pnpm dlx shadcn@latest add [component]`)
- Upgrade manual jika ada versi baru

---

## ADR-003: ISR 5 Menit untuk Data Kurs

**Tanggal:** 2026-06-17
**Status:** Accepted

**Keputusan:** Gunakan Next.js ISR dengan `revalidate = 300` (5 menit) untuk halaman kurs

**Alasan:**
- Kurs valas tidak berubah detik per detik — 5 menit cukup untuk use case money changer
- ISR lebih hemat quota API dibanding real-time fetch per request
- Halaman tetap cepat (served dari cache) dengan data yang cukup fresh

**Alternatif yang Dipertimbangkan:**
- WebSocket / SSE untuk real-time: overkill untuk money changer, biaya tinggi
- Cache 1 jam: terlalu stale — kurs bisa berubah signifikan
- Fetch setiap request: quota API cepat habis, response lambat

---

## ADR-004: Sanity.io sebagai CMS

**Tanggal:** 2026-06-17
**Status:** Accepted

**Keputusan:** Sanity.io v3 untuk mengelola konten blog, testimonial, dan data cabang

**Alasan:**
- Hosted CMS — tidak perlu maintain server database sendiri
- GROQ query language fleksibel
- Real-time preview di Studio
- Free tier cukup untuk fase awal

**Konsekuensi:**
- Dependen pada Sanity cloud
- Data konten tidak di-self-host
- Perlu migrasi jika ingin pindah CMS di masa depan

---

## ADR-005: Resend sebagai Email Provider

**Tanggal:** 2026-06-17
**Status:** Accepted

**Keputusan:** Resend untuk pengiriman email notifikasi form kontak

**Alasan:**
- Developer-friendly API, integrasi mudah dengan Next.js
- Free tier 3000 email/bulan — cukup untuk fase awal
- React Email untuk template email yang maintainable

---

## ADR-006: pnpm sebagai Package Manager

**Tanggal:** 2026-06-17
**Status:** Accepted

**Keputusan:** Gunakan pnpm, bukan npm atau yarn

**Alasan:**
- Lebih cepat install
- Disk space lebih efisien (hard links)
- Strict dependency resolution — mencegah phantom dependencies

**Catatan:** TIDAK boleh mix dengan npm/yarn — pilih satu dan konsisten.

---

## Template ADR Baru

```markdown
## ADR-00X: [Judul Keputusan]

**Tanggal:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded

**Keputusan:** [Apa yang diputuskan]

**Alasan:** [Mengapa keputusan ini diambil]

**Alternatif yang Dipertimbangkan:** [Opsi lain yang ditolak]

**Konsekuensi:** [Dampak dari keputusan ini]
```
