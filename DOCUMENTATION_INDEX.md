# 📚 Dokumentasi Website - Welding Works Studio

**Bara Baja Las** — Jasa las & konstruksi besi profesional Karawang sejak 2019

Selamat datang di dokumentasi lengkap Welding Works Studio! Website ini adalah showcase showcase profesional untuk bisnis jasa las dan konstruksi baja di Karawang. Berikut adalah panduan lengkap untuk memahami dan mengembangkan website ini.

---

## 🎯 Website at a Glance

```
What?   → Jasa las & konstruksi besi profesional (Bara Baja Las)
Where?  → Karawang, Jawa Barat (area layanan: Karawang, Cikampek, Purwakarta, Bekasi, Subang)
Services→ 9 kategori (Pagar, Kanopi, Railing, Balkon, Tralis, Baja Ringan, Las Panggilan, Konstruksi, Pintu)
Contact → WhatsApp: +62 821 2517 1716
Goal    → Generate leads, showcase portfolio, drive customer inquiries
Tech    → React 19 + TypeScript + TanStack Router + Tailwind CSS
Deploy  → Cloudflare Workers
```

### Key Stats
- **9 Service Categories** - Each with dedicated detail page
- **8+ Portfolio Projects** - With category filtering
- **5 Customer Reviews** - Real testimonials with 5-star ratings
- **6 FAQs** - Common questions answered
- **Mobile-First** - Fully responsive design
- **SEO Optimized** - Server-side rendering + dynamic sitemap
- **WhatsApp Integrated** - Direct customer contact

---

## 📖 Daftar Dokumentasi

### 1. **[README.md](./README.md)** - Start here! 🚀
Ringkasan lengkap tentang:
- ✅ Stack teknologi yang digunakan
- ✅ Struktur folder project
- ✅ Cara setup & development
- ✅ Perintah-perintah penting
- ✅ Arsitektur aplikasi

**Waktu baca:** 10-15 menit  
**Untuk:** Developer baru atau ingin quick overview

---

### 2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Deep technical dive 🏗️
Penjelasan detail tentang:
- ✅ Arsitektur sistem (diagram)
- ✅ Data flow & request cycle
- ✅ Type safety & TypeScript patterns
- ✅ State management strategy
- ✅ Performance optimizations
- ✅ Error handling
- ✅ SEO implementation
- ✅ Deployment checklist

**Waktu baca:** 20-30 menit  
**Untuk:** Fullstack developer yang ingin memahami sistem secara mendalam

---

### 3. **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Daily reference ⚡
Panduan praktis dengan:
- ✅ Quick start commands
- ✅ Common file patterns & snippets
- ✅ Tailwind CSS utilities cheat sheet
- ✅ Form examples & validation patterns
- ✅ Data fetching patterns
- ✅ Animation examples
- ✅ Routing examples
- ✅ UI components quick reference
- ✅ Common errors & solutions
- ✅ Pro tips & best practices

**Waktu baca:** 15-20 menit (reference, baca sesuai kebutuhan)  
**Untuk:** Developer saat sedang coding - gunakan sebagai cheat sheet

---

### 4. **[COMPONENTS.md](./COMPONENTS.md)** - Component reference 🎨
Dokumentasi lengkap tentang:
- ✅ Custom components yang tersedia
- ✅ UI components library (Radix UI)
- ✅ Hooks yang custom
- ✅ Data structures
- ✅ Component usage patterns
- ✅ Best practices
- ✅ Template untuk membuat component baru

**Waktu baca:** 15-20 menit (reference)  
**Untuk:** Saat ingin membuat component baru atau menggunakan component existing

---

### 5. **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** - Content management 📝
Panduan praktis untuk update content website:
- ✅ Menambah service baru
- ✅ Menambah portfolio project
- ✅ Menambah customer testimonial
- ✅ Update FAQ
- ✅ Update site configuration
- ✅ Image guidelines
- ✅ Common mistakes & troubleshooting
- ✅ Deployment checklist

**Waktu baca:** 10-15 menit (reference)  
**Untuk:** Content manager, marketing, atau siapa yang perlu update content tanpa perlu tahu code

---

### 6. **[TECH_STACK_OVERVIEW.md](./TECH_STACK_OVERVIEW.md)** - Visual reference 🎯
Visual diagrams & quick reference:
- ✅ Architecture diagram
- ✅ Technology stack visual
- ✅ Folder structure map
- ✅ Data flow diagrams
- ✅ Component dependency graph
- ✅ Development workflow
- ✅ Learning path
- ✅ Quick reference table

**Waktu baca:** 10 menit (quick overview)  
**Untuk:** Visual learners yang ingin melihat big picture sebelum deep dive

---

## 🛠️ 9 Service Categories (What This Website Sells)

| Service | Slug | Target Market | Key Feature |
|---------|------|----------------|-------------|
| Pagar Besi | pagar-besi | Rumah, ruko, gudang | Custom desain + anti karat |
| Kanopi | kanopi | Carport, teras, area servis | Atap polycarbonate/alderon |
| Railing Tangga | railing-tangga | Indoor & outdoor | Besi tempa & stainless steel |
| Balkon | balkon | Lantai 2, fasad rumah | Desain geometris modern |
| Tralis Jendela | tralis-jendela | Keamanan jendela | Minimalis modern, anti karat |
| Baja Ringan | baja-ringan | Rangka atap & kanopi | SNI certified, anti rayap |
| Las Panggilan | las-panggilan | Perbaikan mendadak | 24 jam, datang ke lokasi |
| Konstruksi Baja | konstruksi-baja | Gudang, workshop, industri | WF/H-Beam, sertifikasi welding |
| Pintu Besi | pintu-besi | Pagar, gudang, ruko | Swing/sliding/folding gate |

---

## 📊 Content & Data Overview

### Static Data Stored in Code (`src/lib/data.ts`)

**Services:** 9 service categories with images, descriptions, features
- Each has unique slug for URL routing
- Contains full description, short preview, and feature list
- Access via `/layanan` (list) or `/layanan/:slug` (detail)

**Portfolio:** 8 completed projects showcase
- With category filtering (Pagar, Kanopi, Railing, etc)
- Images with grid layout variants
- No database needed - hardcoded data
- Available at `/portfolio`

**Testimonials:** 5 customer reviews
- From real customers (Pak Ahmad, Bu Ratna, Pak Joko, Bu Sinta, Pak Dedi)
- Located in Karawang, Cikampek, Purwakarta, Bekasi
- 5-star ratings with text reviews
- Displayed on homepage & `/testimoni`

**FAQs:** 6 common questions
- About survey, timeline, custom design, coverage, consultation, payment
- Available at `/faq`

**Site Config:** (`src/lib/site.ts`)
- Business info (name, phone, address)
- Working hours & days (08:00-17:00, Senin-Sabtu)
- Coverage areas (Karawang, Cikampek, Purwakarta, Bekasi, Subang)
- WhatsApp link configuration

### To Add New Service/Portfolio/Testimonial

1. Edit `src/lib/data.ts` - add item to array
2. Add image to `src/assets/` folder
3. Import image at top of data.ts
4. Restart dev server (if needed)
5. New content auto-appears on relevant pages!

No database setup needed! Everything is in code - super simple to update.

---

## 🎯 Untuk Developer Baru - Quick Start
1. Baca [README.md](./README.md) - 15 menit
2. Jalankan `npm install` & `npm run dev` - 5 menit
3. Explore folder structure - 10 menit
4. Baca [ARCHITECTURE.md](./ARCHITECTURE.md) - 20 menit
5. Explore existing components - 20 menit

### Saat Mulai Coding
1. Refer ke [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) untuk snippets
2. Refer ke [COMPONENTS.md](./COMPONENTS.md) untuk available components
3. Check [ARCHITECTURE.md](./ARCHITECTURE.md) untuk patterns

### Saat Perlu Update Content
1. Refer ke [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) untuk cara menambah/update
2. Edit `src/lib/data.ts`
3. Restart dev server
4. Deploy

## 🏢 Tech Stack Overview

```
Frontend Framework:    React 19 + TypeScript
Routing:              TanStack Router (file-based)
State Management:     TanStack React Query
Styling:              Tailwind CSS 4.2 + Radix UI
Form Handling:        React Hook Form + Zod
Animations:           Framer Motion
Build Tool:           Vite
Deployment:           Cloudflare Workers
Development:          ESLint + Prettier
```

---

## 📁 Project Structure at a Glance

```
src/
├── components/              # Reusable React components
│   ├── ui/                 # Headless UI primitives
│   └── [Feature components] # Custom business components
├── routes/                 # Page routes (file-based)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & helpers
└── styles.css              # Global styles

Configuration:
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Build config
└── wrangler.jsonc          # Deployment config
```

**Detail lebih lanjut:** Lihat [README.md - Folder Structure](./README.md#-struktur-folder)

---

## 🚀 Common Development Tasks

### Add a New Service
```typescript
// Step 1: Add image to src/assets/
// (e.g., service-new-category.jpg)

// Step 2: Edit src/lib/data.ts
import newImage from "@/assets/service-new-category.jpg"

export const SERVICES: Service[] = [
  // ... existing services
  {
    slug: "new-category",
    title: "New Service Name",
    short: "Short description",
    description: "Full description...",
    image: newImage,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
]

// Step 3: Restart dev server
// Step 4: New service automatically appears:
// - /layanan page (service list)
// - /layanan/new-category (service detail page)
// - Homepage services preview
```

### Add Portfolio Project
```typescript
// Edit src/lib/data.ts
export const PORTFOLIO = [
  // ... existing projects
  { 
    id: 9, 
    image: newImage, 
    title: "Project Name — Location", 
    category: "Pagar",  // Must match service category
    span: "tall"        // optional: "tall" | "wide" | ""
  },
]

// Automatically appears on /portfolio page with filter by category
```

### Add Customer Testimonial
```typescript
// Edit src/lib/data.ts
export const TESTIMONIALS = [
  // ... existing testimonials
  {
    name: "Nama Customer",
    location: "Kota",
    rating: 5,
    text: "Review text here...",
  },
]

// Appears on homepage testimonial slider & /testimoni page
```

### Add FAQ
```typescript
// Edit src/lib/data.ts
export const FAQS = [
  // ... existing FAQs
  {
    q: "Question here?",
    a: "Answer here...",
  },
]

// Appears on /faq page
```

### Create a New Page
```typescript
// Create file: src/routes/new-page.tsx
import { createFileRoute } from '@tanstack/react-router'
import { SiteLayout } from '@/components/SiteLayout'

export const Route = createFileRoute('/new-page')({
  component: NewPage,
  head: () => ({
    meta: [
      { title: "Page Title" },
      { name: "description", content: "Page description" },
    ],
  }),
})

function NewPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen px-4 py-12">
        <h1 className="text-4xl font-bold">Page Title</h1>
        {/* Content */}
      </div>
    </SiteLayout>
  )
}
```

Automatically accessible at `/new-page`!

---

## 🎨 Available Components

### Custom Feature Components (Used on This Website)
- `ServiceCard` - Display individual service (used on /layanan, homepage)
- `ServiceDetail` - Full service detail (on /layanan/:slug)
- `PortfolioGallery` - Project showcase with filter (on /portfolio)
- `TestimonialSlider` - Auto-rotating testimonials (homepage, /testimoni)
- `FAQAccordion` - Collapsible FAQ items (on /faq)
- `CTASection` - Call-to-action section (multiple places)
- `AnimatedCounter` - Animated numbers (homepage stats)
- `AreaCoverageSection` - Service coverage map (on /area-layanan)
- `SparkParticles` - Animated background (hero section)
- `GlowButton` - Special glowing CTA button (hero)
- `Reveal` - Scroll-triggered reveal animation (sections)
- `IndustrialNavbar` - Main navigation header (all pages)
- `SectionEyebrow` - Small intro text (section headers)
- `Footer` - Footer component (all pages)
- `SiteLayout` - Main layout wrapper (all pages)
- `WhatsAppCTA` - Floating WhatsApp button (all pages)

### UI Components (30+)
- Form: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Form`
- Layout: `Card`, `Tabs`, `Accordion`, `Dialog`, `Drawer`, `Popover`, `Sheet`
- Display: `Badge`, `Avatar`, `Alert`, `Progress`, `Skeleton`
- Navigation: `Button`, `Breadcrumb`, `Pagination`, `Dropdown`, `ContextMenu`
- Data: `Table`, `Chart` (Recharts)

---

## 📊 Architecture Highlights

### Server-Side Rendering (SSR)
- Fast initial page load
- Better SEO
- Automatic hydration

### Type Safety
- Full TypeScript support
- Type-safe routing
- Type-safe data fetching

### Performance
- Code splitting per route
- Lazy loading support
- React Query caching
- Optimized builds

### Accessibility
- Radix UI primitives (ARIA built-in)
- Keyboard navigation
- Semantic HTML

---

## 🔐 Important Files

| File | Purpose |
|------|---------|
| `src/router.tsx` | Router setup dengan React Query |
| `src/routes/__root.tsx` | Root layout, metadata, SEO |
| `src/server.ts` | Server entry point untuk SSR |
| `src/lib/data.ts` | Static content (services, portfolio, etc) |
| `vite.config.ts` | Build configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Dependencies & scripts |
| `wrangler.jsonc` | Cloudflare Workers config |

---

## 🆘 Troubleshooting Quick Links

**Error: Port already in use?**
→ Lihat [README.md - Troubleshooting](./README.md#-troubleshooting)

**Error: Build fails?**
→ Lihat [README.md - Troubleshooting](./README.md#-troubleshooting)

**Error: Route not found?**
→ Lihat [README.md - Troubleshooting](./README.md#-troubleshooting)

**Common errors saat coding?**
→ Lihat [DEVELOPER_GUIDE.md - Common Errors](./DEVELOPER_GUIDE.md#-common-errors--solutions)

---

## 📚 External Resources

- [React Docs](https://react.dev)
- [TanStack Router](https://tanstack.com/router/latest)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Vite](https://vitejs.dev)

---

## 🎯 Development Workflow

```
1. Clone/Setup
   └─> npm install
   └─> npm run dev

2. Create/Edit
   └─> Make changes to files
   └─> Hot reload automatic

3. Test
   └─> Browser preview
   └─> Check console errors

4. Lint & Format
   └─> npm run lint
   └─> npm run format

5. Build
   └─> npm run build
   └─> npm run preview

6. Deploy
   └─> wrangler deploy
```

---

## 💡 Pro Tips

1. **Use VS Code Extensions**
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux Snippets
   - TypeScript Vue Plugin
   - Prettier
   - ESLint

2. **Use React DevTools**
   - Install browser extension
   - Debug component state
   - Profile performance

3. **Use React Query DevTools**
   - Built-in, no setup needed
   - Access at `/__TanStackRouterDevtools`
   - Debug queries & cache

4. **Read the source code**
   - Existing components show best practices
   - Learn from implementation

5. **Keep components small**
   - Single responsibility
   - Easier to test
   - More reusable

6. **Document complex logic**
   - Comments for why, not what
   - Type annotations as documentation

---

## 📞 Contact Information

**Website:** Welding Works Studio  
**Business:** Bara Baja Las  
**Location:** Karawang, Jawa Barat  
**Phone:** +62 821 2517 1716 (WhatsApp)  
**Email:** (Add if available)

---

## 📋 Checklist untuk Developer Baru

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Run `npm run dev` dan akses http://localhost:5173
- [ ] Baca [README.md](./README.md)
- [ ] Baca [ARCHITECTURE.md](./ARCHITECTURE.md)
- [ ] Explore `src/` folder structure
- [ ] Check existing components di `src/components/`
- [ ] Try membuat page baru
- [ ] Try membuat component baru
- [ ] Read [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) untuk update content
- [ ] Run `npm run lint` & `npm run format`
- [ ] Bookmark [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) untuk reference

---

## 🎓 Learning Path

### Beginner (First Day)
1. Read: [README.md](./README.md)
2. Do: Setup & run dev server
3. Do: Explore folder structure
4. Read: [ARCHITECTURE.md](./ARCHITECTURE.md) sections 1-3

### Intermediate (First Week)
1. Create: 2-3 new pages
2. Create: 2-3 new components
3. Add: Forms & validation
4. Learn: All [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
5. Understand: React Query patterns

### Advanced (Ongoing)
1. Optimize: Performance
2. Add: Advanced features
3. Handle: Complex state
4. Deploy: To production
5. Monitor: User analytics

---

## 🚀 Ready to Start?

1. **If this is your first time:** Start with [README.md](./README.md) or [TECH_STACK_OVERVIEW.md](./TECH_STACK_OVERVIEW.md) (visual)
2. **If you're ready to code:** Use [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
3. **If you need component docs:** Check [COMPONENTS.md](./COMPONENTS.md)
4. **If you need to update content:** Read [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
5. **If you want visual diagrams:** Check [TECH_STACK_OVERVIEW.md](./TECH_STACK_OVERVIEW.md)
6. **If you need architecture details:** Read [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 📝 Document Versions

| Document | Updated | Status |
|----------|---------|--------|
| README.md | May 24, 2026 | ✅ Updated |
| ARCHITECTURE.md | May 24, 2026 | ✅ Updated |
| DEVELOPER_GUIDE.md | May 24, 2026 | ✅ Updated |
| COMPONENTS.md | May 24, 2026 | ✅ Updated |
| CONTENT_GUIDE.md | May 24, 2026 | ✅ New |
| TECH_STACK_OVERVIEW.md | May 24, 2026 | ✅ New |
| DOCUMENTATION_INDEX.md | May 24, 2026 | ✅ Updated |

---

**Last Updated:** May 22, 2026  
**Project Version:** 1.0.0  
**Status:** Active Development ✅

---

## Questions or Issues?

Jika ada yang kurang jelas:
1. Cek dokumentasi yang relevan
2. Search di GitHub issues (jika ada)
3. Hubungi team lead / project owner
4. Refer ke external documentation links

Happy Coding! 🎉

