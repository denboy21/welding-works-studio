
# Website Bara Baja Las — Jasa Las & Konstruksi Karawang

Brand: **Bara Baja Las**
WhatsApp: **+62 821-2517-1716**
Workshop: Kp. Kadongdong, Desa Bengle, Karawang
Maps: https://maps.app.goo.gl/X38xLYV96M7VYD487
Stack: TanStack Start + React + TypeScript + Tailwind v4 + Framer Motion

## 1. Sitemap & Routing

```text
/                 Home (landing penuh konversi)
/tentang          Tentang Kami
/layanan          Daftar layanan
/layanan/$slug    Detail layanan (12 layanan)
/portfolio        Galeri proyek (masonry + lightbox)
/area-layanan    Cakupan area + map
/testimoni        Review pelanggan
/faq              Pertanyaan umum
/blog             Index blog
/blog/$slug       Artikel
/kontak           Kontak + form + map embed
/sitemap.xml      Server route SEO
```

File route di `src/routes/` (flat dot-naming, mis. `layanan.$slug.tsx`).

## 2. Design System (Tailwind v4 tokens di `src/styles.css`)

Tokens (oklch equivalents dari palet user):
- `--background` #0F172A, `--surface` #111827, `--surface-2` #1E293B
- `--foreground` #F8FAFC, `--muted-foreground` #E5E7EB
- `--primary` #F97316 (welding orange), `--primary-glow` #FACC15 (spark)
- `--steel-from` #475569, `--steel-to` #94A3B8 (gradient metallic)
- `--gradient-industrial` linear-gradient(135deg, #F97316, #FACC15)
- `--gradient-steel` linear-gradient(135deg, #1E293B, #475569, #94A3B8)
- `--shadow-glow` 0 0 40px color-mix(in oklab, #F97316 35%, transparent)
- `--shadow-elegant` 0 20px 60px -20px rgba(0,0,0,.6)
- Radius: `--radius` .75rem

Tipografi (Google Fonts via `<link>` di root):
- Display: **Poppins** 600/700/800 (headline)
- Body: **Inter** 400/500
- Accent industrial caps: **Montserrat** 700 (eyebrows, counters)

Dark mode adalah default; tidak ada toggle (industrial premium).

## 3. Komponen Reusable (`src/components/`)

- `IndustrialNavbar` — sticky, glassmorphism (`backdrop-blur`), border bawah tipis dengan gradient orange, tombol WA highlight
- `GlowButton` — variants: `primary` (gradient orange→yellow + shadow-glow on hover), `outline` (steel border), `ghost`
- `WhatsAppCTA` — floating bottom-right (mobile besar 56×56, desktop 64×64), pulse halus, link `https://wa.me/6282125171716?text=...`
- `ServiceCard` — ikon Lucide industrial, hover metallic sheen (gradient sweep)
- `PortfolioGallery` — masonry CSS columns, lightbox via `@radix-ui/react-dialog`, lazy `loading="lazy"`, WebP
- `BeforeAfterSlider` — drag handle untuk before/after
- `TestimonialSlider` — `embla-carousel-react` (sudah ada di shadcn carousel)
- `FAQAccordion` — shadcn Accordion + schema FAQPage JSON-LD
- `AnimatedCounter` — `useInView` + `motion.span` count-up
- `AreaCoverageSection` — list kota + map embed iframe
- `SparkParticles` — canvas tipis (max ~25 partikel, di hero only, `prefers-reduced-motion` aware)
- `WeldGlow` — div absolut blur radial orange untuk aksen hero/CTA
- `SectionEyebrow` — uppercase tracking-widest dengan dash kiri

## 4. Struktur Homepage (`src/routes/index.tsx` + section components di `src/components/home/`)

1. **Navbar** sticky glass
2. **Hero** — fullscreen, bg gradient gelap + image overlay welder, headline reveal per kata (Framer Motion stagger), 3 CTA (WA primary, Konsultasi outline, Lihat Portfolio ghost), SparkParticles + WeldGlow
3. **TrustStrip** — 4 AnimatedCounter (500+ Proyek, 5+ Tahun, 5 Kota, 100% Garansi Rapi)
4. **ServicesGrid** — 9 ServiceCard, hover metallic sheen
5. **PortfolioPreview** — 6 thumbnail masonry → link `/portfolio`
6. **Keunggulan** — 6 item icon + judul + deskripsi, reveal on scroll
7. **AreaCoverage** — chip kota + mini map
8. **Testimoni** — slider 3-up desktop / 1-up mobile
9. **FAQ** — 6 pertanyaan
10. **CTA Besar** — full-bleed gradient industrial + glow, dua tombol WA
11. **Footer** — alamat, jam (Sen–Sab 08.00–17.00), WA, IG/FB, map link, quick links

## 5. Copywriting (ID, ready to ship)

- Hero H1: **"Jasa Las Profesional Karawang & Sekitarnya"**
- Hero sub: "Melayani pembuatan pagar, kanopi, railing, konstruksi besi, dan berbagai kebutuhan las dengan hasil rapi, kuat, dan terpercaya."
- CTA primer: "Chat WhatsApp Sekarang"
- CTA sekunder: "Konsultasi Gratis"
- CTA besar bawah H2: **"Butuh Jasa Las Profesional dan Terpercaya?"** — sub: "Tim Bara Baja Las siap survey lokasi gratis di Karawang, Cikampek, Purwakarta, Bekasi & Subang."
- Eyebrow contoh: "WORKSHOP KARAWANG · SEJAK 2019"
- 12 layanan + 6 FAQ + 6 keunggulan diisi dengan copy final di file komponen.

## 6. Animasi (Framer Motion) — restrained

- Hero headline: `staggerChildren` 0.08, y:20→0, opacity 0→1, sekali jalan
- Section reveal: `whileInView` fade+up 24px, `viewport={{ once: true, margin: "-80px" }}`
- ServiceCard hover: gradient sheen via CSS `::before` translateX (-100%→100%) 700ms
- GlowButton hover: scale 1.02 + shadow-glow membesar
- Counter: spring count-up saat in-view
- SparkParticles: requestAnimationFrame, 20 partikel orange→yellow, naik perlahan, hanya di hero, dimatikan jika `prefers-reduced-motion: reduce`
- Tidak ada parallax berat, tidak ada 3D, tidak ada efek api besar.

## 7. SEO Lokal

- Root `__root.tsx`: og:site_name "Bara Baja Las", JSON-LD `LocalBusiness` (name, telephone, address Karawang, geo, openingHours Mo-Sa 08:00-17:00, areaServed: Karawang, Cikampek, Purwakarta, Bekasi, Subang, sameAs WA)
- Per-route `head()`: title pola `{Halaman} | Bara Baja Las Karawang`, description mengandung "jasa las Karawang"
- `/faq` tambah `FAQPage` JSON-LD
- `/blog/$slug` tambah `Article` JSON-LD
- `/layanan/$slug` tambah `Service` JSON-LD + `areaServed`
- `src/routes/sitemap[.]xml.ts` + `public/robots.txt`
- Keyword target ditenun ke H1/H2/alt: "jasa las Karawang", "tukang las Karawang", "jasa pagar Karawang", "jasa kanopi Karawang", "railing Karawang", "las panggilan Karawang"
- Semua `<img>` punya `alt` deskriptif + lokasi

## 8. Strategi Konversi

- Sticky `WhatsAppCTA` di semua halaman (mobile-first; aman dari notch dengan `pb-safe`)
- Tombol WA di navbar (desktop) + hamburger drawer (mobile)
- CTA besar minimal 2× per halaman panjang
- Setiap card layanan punya tombol "Tanya via WA" dengan prefilled message berisi nama layanan
- Form kontak ringan (nama, WA, kebutuhan) — submit redirect ke WA link dengan pesan terformat (tanpa backend)

## 9. Performa & Mobile-First

- Tailwind v4 (sudah aktif) — purge otomatis
- Gambar: WebP, `loading="lazy"` (kecuali hero `fetchpriority="high"`), `width`/`height` eksplisit
- Font Google: `preconnect` + `display=swap`
- Tidak ada library berat tambahan (pakai shadcn carousel & accordion yang sudah ada)
- Framer Motion sudah dependency standar; SparkParticles native canvas (<2KB)
- Lighthouse target: Perf ≥90 mobile, A11y ≥95, SEO 100

## 10. Aset Placeholder

Generate via `imagegen` (model `fast`, simpan di `src/assets/`):
- `hero-welder.jpg` 1920×1080 — welder dengan percikan api, mood gelap sinematik
- 9 thumbnail layanan 800×600
- 8 foto portfolio (pagar, kanopi, railing, balkon, tralis, pintu, baja ringan, gudang)
- 4 avatar testimoni 200×200
- `og-image.jpg` 1200×630

## 11. Deployment

Project sudah berjalan di Lovable preview. Setelah selesai: gunakan tombol **Publish** Lovable untuk dapat `*.lovable.app` URL, lalu (opsional) hubungkan custom domain seperti `barabajalas.com`. Setelah domain final, isi `BASE_URL` di `sitemap.xml.ts`, `og:url`, dan JSON-LD `url`.

## 12. Eksekusi (urutan)

1. Setup design system (`src/styles.css`) + fonts di `__root.tsx` + global JSON-LD LocalBusiness
2. Komponen inti: `IndustrialNavbar`, `Footer`, `WhatsAppCTA`, `GlowButton`, `WeldGlow`, `SparkParticles`
3. Generate aset hero + thumbnail layanan + portfolio (parallel imagegen)
4. Build homepage section per section
5. Build halaman: tentang, layanan (+detail), portfolio, area-layanan, testimoni, faq, blog (+detail), kontak
6. SEO: sitemap.xml route, robots.txt, per-route head()
7. QA: cek mobile (375px), tablet (768px), desktop; cek sticky WA tidak menutupi konten penting; cek reduced-motion

Setelah plan disetujui, langsung mulai dari langkah 1.
