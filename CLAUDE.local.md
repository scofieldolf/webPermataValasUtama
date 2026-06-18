# Local Dev Preferences (gitignored — jangan commit)

## Personal Workflow

- Staging URL: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio
- Selalu jalankan `pnpm type-check` sebelum commit
- Gunakan Prettier extension di VS Code untuk auto-format on save

## Local Environment Notes

- ExchangeRate API: gunakan mock data jika quota habis (lihat `src/lib/kurs.mock.ts`)
- Google Maps: pakai `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` dari .env.local
- Untuk testing form kontak: gunakan email sandbox Resend (tidak perlu domain verified)

## Personal Imports

@~/.claude/my-preferences.md
