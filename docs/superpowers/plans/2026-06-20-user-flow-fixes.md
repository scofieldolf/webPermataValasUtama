# Perbaikan Alur Pengguna (User-Flow) E2E Rencana Implementasi

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Memperbaiki empat isu alur pengguna (user-flow) dan aksesibilitas (E2E) pada navigasi header, kalkulator valas, formulir booking kontak, dan halaman insights blog.

**Architecture:** Menerapkan modifikasi UI/UX secara deklaratif menggunakan Tailwind CSS untuk tata letak flexbox dan focus-visible, penambahan field input HTML yang hilang, serta integrasi logic fallback data statis pada server component halaman insight.

**Tech Stack:** Next.js 14 (App Router), TypeScript (strict mode), Tailwind CSS v3, Lucide React, Sanity.io client.

## Global Constraints
- React Server Components secara default, gunakan 'use client' hanya bila diperlukan.
- Kode dan UI menggunakan bahasa Indonesia sebagai default, bebas dari campuran bahasa Inggris untuk label-label utama.
- Selalu patuhi standar pengetikan ketat TypeScript (strict mode, tanpa `any` atau `@ts-ignore`).
- Jangan gunakan `console.log` di dalam kode produksi.

---

### Task 1: Aksesibilitas Navigasi Header & Pemicu Keyboard

**Files:**
- Modify: `src/components/layout/header.tsx`
- Test: Verifikasi dengan memfokuskan menu menggunakan Tab dan mengaktifkannya menggunakan tombol Enter.

**Interfaces:**
- Menggunakan link navigasi dari `SITE_CONFIG.navLinks` di `src/config/site.ts`.

- [ ] **Step 1: Modifikasi kelas gaya fokus dan penanganan tombol Keyboard**

Ubah bagian perulangan tautan navigasi desktop dan mobile di `src/components/layout/header.tsx` dengan kode berikut untuk menyertakan focus-visible ring dan listener keydown.

Pada navigasi desktop (baris 59-75):
```tsx
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200 py-2 border-b-2 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-pv-gold-primary focus-visible:ring-offset-2 focus-visible:rounded-md",
                    isActive
                      ? "text-pv-navy-deep border-pv-gold-primary"
                      : "text-gray-500 border-transparent hover:text-pv-navy-deep hover:border-pv-gold-light"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
```

Pada navigasi mobile (baris 109-126):
```tsx
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                  className={cn(
                    "block px-3 py-3 rounded-md text-base font-semibold transition-colors outline-none",
                    "focus-visible:ring-2 focus-visible:ring-pv-gold-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-pv-ivory-surface text-pv-navy-deep border-l-4 border-pv-gold-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-pv-navy-deep"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
```

- [ ] **Step 2: Jalankan linter dan type-check untuk verifikasi perubahan**

Jalankan perintah berikut di terminal:
```bash
pnpm lint && pnpm type-check
```
Expected: Tidak ada error tipe atau linter.

- [ ] **Step 3: Commit perubahan**

```bash
git add src/components/layout/header.tsx
git commit -m "refactor: improve header navigation accessibility with visible focus and keydown handlers"
```

---

### Task 2: Perbaikan Input Nominal Kalkulator & Fokus Ring (`KalkCalc`)

**Files:**
- Modify: `src/components/kurs/kalk-calc.tsx`

**Interfaces:**
- Mengkonsumsi input pengguna dari form kalkulator dan menghitung hasil secara lokal dengan state `amount` dan `result`.

- [ ] **Step 1: Ubah tipe input, styling flexbox, dan hilangkan focus-within**

Ubah input nominal di `src/components/kurs/kalk-calc.tsx` agar menggunakan `type="number"`, memiliki kelas `flex-1 min-w-0` agar tidak memicu luapan layout flexbox, dan berikan kelas focus ring secara individual pada `select` dan `input` menggantikan `focus-within` dari wrapper luar.

Temukan pembungkus input baris 112-135:
```tsx
          <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-white">
            {/* Dropdown Valas */}
            <select
              id="valas-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as KodeMataUang)}
              className="bg-gray-50 px-3 py-3 border-r border-gray-200 text-sm font-bold text-pv-navy-deep focus:outline-none focus:ring-2 focus:ring-pv-gold-primary focus:z-10 cursor-pointer rounded-l-lg"
            >
              {Object.keys(rateCalculatorMap).map((code) => (
                <option key={code} value={code}>
                  {rateCalculatorMap[code as KodeMataUang].bendera} {code}
                </option>
              ))}
            </select>
            {/* Input Nominal */}
            <input
              id="valas-amount"
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="flex-1 min-w-0 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-pv-gold-primary focus:z-10 text-pv-navy-deep rounded-r-lg"
            />
          </div>
```

Sesuaikan juga `handleAmountChange` (baris 60-63) untuk menyederhanakan penanganan input angka:
```typescript
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
```

- [ ] **Step 2: Jalankan pengujian unit tes kalkulator lokal**

Jalankan perintah berikut:
```bash
pnpm test src/components/kurs/kalk-calc.test.tsx
```
Expected: Unit test kalkulator lulus (pass).

- [ ] **Step 3: Commit perubahan**

```bash
git add src/components/kurs/kalk-calc.tsx
git commit -m "fix: make calculator nominal input fully editable and style it to prevent layout overflow"
```

---

### Task 3: Penambahan Kolom Email & Catatan Pada Form Booking/Reservasi

**Files:**
- Modify: `src/app/(site)/kontak/page.tsx`
- Modify: `src/app/(site)/kontak/page.test.tsx` (sesuaikan mock test jika diperlukan)

**Interfaces:**
- Memperluas tipe state form reservasi kurs dengan `email` dan `note` serta menyimpan `bookingCode` ter-generate di state.

- [ ] **Step 1: Modifikasi state form dan tambahkan kolom input baru**

Ubah state dan render form booking di `src/app/(site)/kontak/page.tsx`.
State form reservasi (baris 14-15):
```typescript
  // State untuk formulir Booking Kurs
  const [bookingForm, setBookingForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    valas: "USD",
    nominal: "",
    tipe: "beli",
    note: "",
  });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "sending" | "success">("idle");
  const [bookingCode, setBookingCode] = useState("");
```

Update penangan submit form reservasi (baris 30-37):
```typescript
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("sending");
    const code = `PV-${Math.floor(100000 + Math.random() * 900000)}`;
    // Simulasi respons server 1.5 detik
    setTimeout(() => {
      setBookingStatus("success");
      setBookingCode(code);
      setBookingForm({
        nama: "",
        email: "",
        telepon: "",
        valas: "USD",
        nominal: "",
        tipe: "beli",
        note: "",
      });
    }, 1500);
  };
```

Ubah dialog sukses (baris 195-211) agar menggunakan `bookingCode` dari state secara deterministik:
```tsx
            {bookingStatus === "success" ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <div>
                  <h4 className="font-bold text-emerald-800 text-sm">Reservasi Anda Terdaftar</h4>
                  <p className="text-[11px] text-emerald-700 font-mono mt-1 font-semibold">Kode Booking: {bookingCode}</p>
                </div>
                <p className="text-xs text-emerald-600 leading-relaxed">
                  Staf konter utama kami akan segera menghubungi Anda melalui WhatsApp atau telepon untuk mengonfirmasi ketersediaan nominal dan jam pengambilan valuta asing di gerai.
                </p>
                <button
                  onClick={() => {
                    setBookingStatus("idle");
                    setBookingCode("");
                  }}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-pv-navy-deep text-white text-xs font-bold"
                >
                  Buat Reservasi Baru
                </button>
              </div>
```

Tambahkan input email dan note ke dalam markup formulir booking (ganti bagian input Nama & Telepon serta tambahkan text area di atas tombol submit):
Ganti bagian Nama & Telepon (baris 246-275):
```tsx
                {/* Form Nama, Email, & Telepon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="booking-name" className="text-xs font-bold text-gray-600 block">
                      Nama Lengkap *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={bookingForm.nama}
                      onChange={(e) => setBookingForm({ ...bookingForm, nama: e.target.value })}
                      placeholder="Sesuai KTP / Paspor"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="booking-email" className="text-xs font-bold text-gray-600 block">
                      Alamat Email *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="booking-phone" className="text-xs font-bold text-gray-600 block">
                      Nomor WhatsApp *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      value={bookingForm.telepon}
                      onChange={(e) => setBookingForm({ ...bookingForm, telepon: e.target.value })}
                      placeholder="Contoh: 08123456789"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep"
                    />
                  </div>
                </div>
```

Tambahkan kolom Catatan/Pesan di atas tombol submit (sebelum baris 313):
```tsx
                {/* Note / Catatan */}
                <div className="space-y-1">
                  <label htmlFor="booking-note" className="text-xs font-bold text-gray-600 block">
                    Catatan Reservasi
                  </label>
                  <textarea
                    id="booking-note"
                    rows={3}
                    value={bookingForm.note}
                    onChange={(e) => setBookingForm({ ...bookingForm, note: e.target.value })}
                    placeholder="Contoh: pecahan nominal besar, jam rencana penjemputan, dll."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-pv-gold-primary text-pv-navy-deep resize-none"
                  />
                </div>
```

- [ ] **Step 2: Jalankan pengujian unit tes halaman kontak**

Jalankan perintah berikut:
```bash
pnpm test src/app/\(site\)/kontak/page.test.tsx
```
Expected: Tes berhasil. Jika tes gagal karena perbedaan state mock, sesuaikan mock data pengisian formulir di file test.

- [ ] **Step 3: Commit perubahan**

```bash
git add src/app/\(site\)/kontak/page.tsx
git commit -m "feat: add email and note fields to rate reservation form and fix hydration code warning"
```

---

### Task 4: Integrasi Menu Insights & Fallback Data Blog Statis

**Files:**
- Modify: `src/config/site.ts`
- Modify: `src/lib/sanity/client.ts`
- Modify: `src/app/(site)/insight/page.tsx`
- Modify: `src/app/(site)/insight/[slug]/page.tsx`

**Interfaces:**
- Mengekspor data mock `MOCK_POSTS` dari `src/lib/sanity/client.ts` untuk di-consume oleh halaman list dan detail insight saat CMS mengembalikan data kosong atau gagal koneksi.

- [ ] **Step 1: Daftarkan link Insights ke menu situs**

Edit `src/config/site.ts` dan tambahkan menu `Insights` ke `navLinks`:
```typescript
  navLinks: [
    { label: "Beranda", href: "/" },
    { label: "Kurs Hari Ini", href: "/kurs" },
    { label: "Layanan", href: "/layanan" },
    { label: "Insights", href: "/insight" },
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Lokasi Cabang", href: "/lokasi" },
    { label: "Hubungi Kami", href: "/kontak" },
  ],
```

- [ ] **Step 2: Tambahkan data Mock Blog Posts di Sanity Client**

Ubah file `src/lib/sanity/client.ts` dengan menyematkan konstanta `MOCK_POSTS` di bagian akhir berkas agar dapat diimpor secara global:
```typescript
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_CONFIG } from "./config";

export const client = createClient({
  ...SANITY_CONFIG,
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Data Fallback Artikel Blog/Insight untuk lingkungan offline / testing
export const MOCK_POSTS = [
  {
    _id: "mock-1",
    title: "Tips Aman Menukarkan Uang Kertas Asing di Jakarta",
    slug: { _type: "slug", current: "tips-aman-tukar-valas" },
    excerpt: "Berikut ini adalah panduan praktis dan tips penting bagi nasabah perorangan sebelum menukarkan mata uang asing di gerai money changer resmi.",
    publishedAt: "2026-06-18T10:00:00Z",
    categories: ["tips-valas" as const],
    author: { name: "Diana Ningsih" },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Menukarkan uang asing di money changer resmi berizin Bank Indonesia adalah langkah utama untuk menghindari peredaran uang palsu dan mendapatkan kurs terbaik. Sebelum bertransaksi, pastikan Anda membawa kartu identitas asli (KTP untuk WNI atau Paspor untuk WNA) sesuai aturan KYC/AML."
          }
        ]
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Selain itu, periksa kondisi fisik uang kertas asing Anda. Hindari membawa uang kertas yang lecek, robek, atau memiliki coretan, karena gerai money changer biasanya akan mengenakan potongan harga atau bahkan menolak uang kertas asing yang tidak dalam kondisi prima."
          }
        ]
      }
    ]
  },
  {
    _id: "mock-2",
    title: "Memahami Regulasi Pembawaan Uang Tunai Asing (KUPU)",
    slug: { _type: "slug", current: "regulasi-pembawaan-uang-asing" },
    excerpt: "Panduan mengenai aturan Bank Indonesia tentang batas pembawaan uang tunai lintas pabean dan kewajiban pelaporan underlying document.",
    publishedAt: "2026-06-19T08:30:00Z",
    categories: ["regulasi-bi" as const],
    author: { name: "Rian Samudra" },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Bank Indonesia menetapkan regulasi yang ketat mengenai pembawaan uang tunai lintas pabean. Untuk transaksi bernilai ekuivalen USD 25.000 atau lebih per bulan, nasabah wajib menyertakan dokumen pendukung (underlying document) yang sah."
          }
        ]
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Tujuan dari aturan ini adalah untuk mencegah pencucian uang dan pendanaan terorisme. PT Permata Valas Utama berkomitmen penuh untuk mematuhi regulasi ini dengan menerapkan prinsip kehati-hatian dalam setiap verifikasi dokumen nasabah."
          }
        ]
      }
    ]
  },
  {
    _id: "mock-3",
    title: "Analisis Pasar: Faktor yang Mempengaruhi Fluktuasi Kurs Valas",
    slug: { _type: "slug", current: "analisis-pasar-fluktuasi-kurs" },
    excerpt: "Pelajari faktor ekonomi makro seperti inflasi, suku bunga, dan stabilitas geopolitik yang secara langsung mempengaruhi nilai tukar rupiah.",
    publishedAt: "2026-06-20T09:00:00Z",
    categories: ["analisis-pasar" as const],
    author: { name: "Budi Santoso" },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Nilai tukar mata uang asing bersifat fluktuatif dan dipengaruhi oleh berbagai faktor ekonomi makro global. Di antaranya adalah kebijakan suku bunga bank sentral seperti Federal Reserve (AS), tingkat inflasi dalam negeri, serta stabilitas geopolitik internasional."
          }
        ]
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Sebagai pelaku bisnis atau perorangan yang sering bertransaksi valas, memantau tren pergerakan kurs secara harian sangat penting untuk menentukan waktu terbaik melakukan transaksi penukaran."
          }
        ]
      }
    ]
  }
];
```

- [ ] **Step 3: Terapkan data Fallback di Halaman List Insight**

Edit `src/app/(site)/insight/page.tsx` untuk mengimpor dan memuat `MOCK_POSTS` sebagai fallback jika `posts.length === 0`:
```typescript
import { client, urlFor, MOCK_POSTS } from "@/lib/sanity/client";
```
Dan di dalam fungsi utama `InsightPage()`:
```typescript
  let posts: BlogPost[] = [];
  try {
    posts = await client.fetch<BlogPost[]>(ALL_POSTS_QUERY);
  } catch (error) {
    posts = [];
  }

  // Jika data Sanity kosong (misalnya CMS tidak aktif/terkoneksi), gunakan mock data fallback
  if (!posts || posts.length === 0) {
    posts = MOCK_POSTS;
  }
```

- [ ] **Step 4: Terapkan data Fallback di Halaman Detail Insight**

Edit `src/app/(site)/insight/[slug]/page.tsx` untuk menyematkan data fallback offline.
Import `MOCK_POSTS` di awal:
```typescript
import { client, urlFor, MOCK_POSTS } from "@/lib/sanity/client";
```
Ganti penanganan metadata `generateMetadata`:
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    let post = await client.fetch<BlogPost | null>(POST_DETAIL_QUERY, { slug });
    
    // Cari di mock jika di CMS kosong
    if (!post) {
      post = MOCK_POSTS.find((p) => p.slug.current === slug) || null;
    }
    
    if (!post) return {};

    const mainImageUrl = post.mainImage ? urlFor(post.mainImage).url() : undefined;

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: mainImageUrl ? [{ url: mainImageUrl }] : undefined,
      },
    };
  } catch (error) {
    return {};
  }
}
```

Serta perbaiki logic penarikan data post di dalam function utama `InsightDetailPage`:
```typescript
export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = params;
  let post: BlogPost | null = null;

  try {
    post = await client.fetch<BlogPost | null>(POST_DETAIL_QUERY, { slug });
  } catch (error) {
    post = null;
  }

  // Jika tidak ditemukan di Sanity CMS, cari di data fallback statis lokal
  if (!post) {
    post = MOCK_POSTS.find((p) => p.slug.current === slug) || null;
  }

  if (!post) {
    return notFound();
  }
```

- [ ] **Step 5: Uji jalankan unit test blog posts lokal**

Jalankan perintah test:
```bash
pnpm test src/app/\(site\)/insight/page.test.tsx
pnpm test src/app/\(site\)/insight/\[slug\]/page.test.tsx
```
Expected: Seluruh unit test blog posts lulus (pass) dengan sukses.

- [ ] **Step 6: Commit seluruh sisa perubahan**

```bash
git add src/config/site.ts src/lib/sanity/client.ts src/app/\(site\)/insight/page.tsx src/app/\(site\)/insight/\[slug\]/page.tsx
git commit -m "feat: integrate insights in navigation menu and serve local mock fallback articles when sanity cms is offline"
```
