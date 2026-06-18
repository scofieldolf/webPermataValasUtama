# Deploy ke Vercel Staging

Deploy branch saat ini ke preview environment Vercel.

```bash
# 1. Pastikan tidak ada uncommitted changes
git status

# 2. Jalankan pre-commit checks dulu
/pre-commit

# 3. Push ke branch staging
git push origin HEAD

# 4. Deploy ke Vercel preview
vercel deploy --prebuilt

# 5. Jalankan Lighthouse audit di URL preview
# (copy URL dari output vercel deploy)
```

Setelah deploy:
- [ ] Cek halaman Beranda dan Kurs tampil benar
- [ ] Verifikasi kurs update otomatis (tunggu 5 menit, refresh)
- [ ] Test form kontak — pastikan email masuk ke inbox
- [ ] Cek Console browser — tidak ada error 404 atau JS error
- [ ] Test di mobile (Chrome DevTools → iPhone 12)

URL Staging biasanya: `https://permata-valas-[hash].vercel.app`
