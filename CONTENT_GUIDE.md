# 📝 Content Management & Update Guide

Panduan praktis untuk update content website tanpa perlu mengerti code yang rumit.

---

## 🚀 Quick Update Guide

Semua content website disimpan di satu file: **`src/lib/data.ts`**

Tidak perlu database! Semua data hardcoded dalam JavaScript, sehingga update sangat mudah.

---

## 📌 File Lokasi

**Main content file:**

```
src/lib/data.ts
```

**Images folder:**

```
src/assets/
```

---

## ➕ Menambah Service Baru

### Step 1: Siapkan Image

- Ukuran: 800x600px minimum (landscape)
- Format: JPG atau PNG
- Letakkan di `src/assets/`
- Contoh: `src/assets/service-nama-layanan.jpg`

### Step 2: Edit `src/lib/data.ts`

Buka file `src/lib/data.ts`, cari bagian SERVICES:

```typescript
import newService from "@/assets/service-nama-layanan.jpg";

export const SERVICES: Service[] = [
  // ... existing services ...

  {
    slug: "nama-slug", // PENTING: gunakan kebab-case
    title: "Nama Layanan",
    short: "Deskripsi pendek (satu baris)",
    description: "Deskripsi panjang yang detail...",
    image: newService,
    features: ["Fitur 1", "Fitur 2", "Fitur 3", "Fitur 4"],
  },
];
```

### Step 3: Restart Server

```bash
npm run dev
```

### Result

- Service akan muncul di `/layanan` (list)
- Service detail page otomatis di `/layanan/nama-slug`
- Service preview di homepage
- Service option di contact form

---

## 🖼️ Menambah Portfolio Project

### Step 1: Siapkan Image

- Ukuran: 400x400px minimum (atau sesuai dengan desain)
- Format: JPG atau PNG
- Letakkan di `src/assets/`

### Step 2: Edit `src/lib/data.ts`

Cari bagian PORTFOLIO:

```typescript
export const PORTFOLIO = [
  // ... existing projects ...

  {
    id: 9, // Nomor urut (incremental)
    image: portfolioImage, // Import image di atas
    title: "Nama Proyek — Lokasi", // Format: "Nama — Lokasi"
    category: "Pagar", // Harus match service title
    span: "tall", // optional: "tall" | "wide" | ""
  },
] as const;
```

### Category Options

```
"Pagar" | "Kanopi" | "Railing" | "Balkon" | "Tralis" | "Baja Ringan" | "Pintu" | "Konstruksi"
```

### Span Options

```
"tall"  → Mengambil 2 baris
"wide"  → Mengambil 2 kolom
""      → Normal size (default)
```

### Result

- Project muncul di `/portfolio`
- Bisa di-filter berdasarkan category
- Grid layout otomatis sesuai span setting

---

## 💬 Menambah Customer Testimonial

### Edit `src/lib/data.ts`

Cari bagian TESTIMONIALS:

```typescript
export const TESTIMONIALS = [
  // ... existing testimonials ...

  {
    name: "Nama Customer", // Nama customer
    location: "Karawang", // Lokasi customer
    rating: 5, // 1-5 bintang
    text: "Testimonial text di sini. Cerita tentang project dan hasil kerja...",
  },
] as const;
```

### Result

- Testimonial muncul di homepage (slider otomatis)
- Testimonial muncul di `/testimoni`
- Star rating otomatis ditampilkan

---

## ❓ Menambah FAQ

### Edit `src/lib/data.ts`

Cari bagian FAQS:

```typescript
export const FAQS = [
  // ... existing FAQs ...

  {
    q: "Pertanyaan di sini?",
    a: "Jawaban lengkap untuk pertanyaan tersebut...",
  },
];
```

### Result

- FAQ otomatis muncul di `/faq`
- Accordion expand/collapse functionality
- Mobile-responsive

---

## 🔧 Update Site Configuration

### Edit `src/lib/site.ts`

File ini berisi info bisnis dasar:

```typescript
export const SITE = {
  name: "Bara Baja Las",
  description: "...",
  phone: "+6282125171716",
  email: "email@example.com", // optional
  location: "Kp. Kadongdong, Desa Bengle, Karawang, Jawa Barat",

  workingHours: {
    open: "08:00",
    close: "17:00",
  },

  workingDays: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],

  coverage: ["Karawang", "Cikampek", "Purwakarta", "Bekasi", "Subang"],
};

export const waLink = (message: string) =>
  `https://wa.me/6282125171716?text=${encodeURIComponent(message)}`;
```

---

## 📋 Checklist Sebelum Deploy

- [ ] Images sudah tersimpan dengan baik
- [ ] Tidak ada typo dalam text
- [ ] Slugs konsisten (kebab-case: `pagar-besi`, bukan `pagarBesi`)
- [ ] Categories match dengan service titles
- [ ] Phone number format benar
- [ ] Dev server berjalan tanpa error: `npm run dev`
- [ ] Website tampil benar di browser
- [ ] Tested di mobile

---

## 🚀 Deploy ke Production

Setelah update content:

```bash
# 1. Stop dev server (Ctrl+C)
# 2. Build
npm run build

# 3. Test build lokal
npm run preview

# 4. Deploy (memerlukan Wrangler login)
wrangler deploy
```

---

## ❌ Common Mistakes

### Mistake 1: Salah format slug

```javascript
// ❌ WRONG
slug: "Pagar Besi"; // space & capital
slug: "pagarBesi"; // camelCase

// ✅ CORRECT
slug: "pagar-besi"; // kebab-case
```

### Mistake 2: Lupa import image

```javascript
// ❌ WRONG
{
  slug: "pagar-besi",
  image: "pagar.jpg",       // string path
}

// ✅ CORRECT
import pagarImage from "@/assets/service-pagar.jpg"

{
  slug: "pagar-besi",
  image: pagarImage,        // imported variable
}
```

### Mistake 3: Category tidak cocok

```javascript
// ❌ WRONG
// Service title: "Pagar Besi"
// Portfolio category: "pagar"  ← lowercase!

// ✅ CORRECT
// Service title: "Pagar Besi"
// Portfolio category: "Pagar"  ← Match exactly!
```

### Mistake 4: Lupa restart dev server

```bash
# Setelah edit src/lib/data.ts:
# ❌ Just refresh browser - tidak akan berubah
# ✅ Stop & restart dev server
npm run dev
```

---

## 🎨 Image Guidelines

### Service Images

- **Size:** 800x600px minimum
- **Format:** JPG or PNG
- **Quality:** High quality, well-lit
- **Content:** Product/work showcase
- **Aspect ratio:** 4:3

### Portfolio Images

- **Size:** 400x400px or larger
- **Format:** JPG or PNG
- **Quality:** Professional quality
- **Content:** Completed project photo
- **Aspect ratio:** 1:1 (square) recommended

### Optimization

```bash
# Use online tools atau:
# - TinyPNG (compress)
# - ImageOptim (if on Mac)
# - Windows Photo Viewer compress (if on Windows)
```

---

## 📊 Data Structure Quick Reference

### Service Structure

```typescript
{
  slug: string              // URL identifier (kebab-case)
  title: string             // Display name
  short: string             // One-liner description
  description: string       // Full description (can be long)
  image: string             // Imported image variable
  features: string[]        // Array of 3-4 feature points
}
```

### Portfolio Structure

```typescript
{
  id: number                // Sequential number
  image: string             // Imported image variable
  title: string             // "Project Name — Location"
  category: string          // Must match service title
  span?: string             // "tall" | "wide" | ""
}
```

### Testimonial Structure

```typescript
{
  name: string; // Customer name
  location: string; // City/area
  rating: number; // 1-5
  text: string; // Review text
}
```

### FAQ Structure

```typescript
{
  q: string; // Question
  a: string; // Answer
}
```

---

## 🔗 Related Documentation

- [README.md](./README.md) - Project overview
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Developer reference
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical details
- [COMPONENTS.md](./COMPONENTS.md) - Component reference

---

## 💡 Pro Tips

1. **Keep descriptions concise** - People don't read long text on web
2. **Use simple language** - Avoid jargon when possible
3. **Proofread** - Check typos before deploying
4. **Use emojis sparingly** - Only if brand appropriate
5. **Mobile first** - Always check on mobile before deploy
6. **Update regularly** - Fresh content is good for SEO
7. **Backup data** - Keep copy of old data before major updates

---

## 📞 Need Help?

- Check [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) untuk overview
- Check [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md#-common-errors--solutions) untuk troubleshooting
- Check existing content di `src/lib/data.ts` untuk template
- Google translate untuk help dengan English tech docs

---

**Last Updated:** May 24, 2026  
**Version:** 1.0.0
