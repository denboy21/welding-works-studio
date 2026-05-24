# 📚 Dokumentasi Website - Welding Works Studio

Selamat datang di Welding Works Studio! Berikut adalah panduan lengkap untuk memahami dan mengembangkan website ini.

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

## 🎯 Untuk Developer Baru - Quick Start

### Hari Pertama (1-2 jam)
1. Baca [README.md](./README.md) - 15 menit
2. Jalankan `npm install` & `npm run dev` - 5 menit
3. Explore folder structure - 10 menit
4. Baca [ARCHITECTURE.md](./ARCHITECTURE.md) - 20 menit
5. Explore existing components - 20 menit

### Saat Mulai Coding
1. Refer ke [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) untuk snippets
2. Refer ke [COMPONENTS.md](./COMPONENTS.md) untuk available components
3. Check [ARCHITECTURE.md](./ARCHITECTURE.md) untuk patterns

---

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

### Create a New Page
```bash
# 1. Create file in src/routes/
# 2. Export a component with file name
# 3. Restart dev server
# 4. Route auto-generated!

# Example: src/routes/new-page.tsx
export function NewPage() {
  return <div>Page content</div>
}

# Now accessible at /new-page
```

**Detail:** Lihat [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md#membuat-page-baru)

---

### Create a New Component
```bash
# 1. Create file in src/components/
# 2. Export React component
# 3. Import & use in pages

# Example: src/components/MyComponent.tsx
export default function MyComponent() {
  return <div>Component content</div>
}
```

**Detail:** Lihat [COMPONENTS.md](./COMPONENTS.md#-creating-new-components)

---

### Add a Form
```typescript
// Use React Hook Form + Zod for validation
// Already integrated with UI components

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Define schema, create form, done!
```

**Detail:** Lihat [DEVELOPER_GUIDE.md - Form Examples](./DEVELOPER_GUIDE.md#-form-examples)

---

### Fetch Data
```typescript
// Use React Query for data fetching & caching
import { useQuery } from '@tanstack/react-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['data'],
  queryFn: () => fetch('/api/data').then(r => r.json()),
})
```

**Detail:** Lihat [DEVELOPER_GUIDE.md - Data Fetching](./DEVELOPER_GUIDE.md#-data-fetching-patterns)

---

### Add Styling
```typescript
// Use Tailwind CSS utility classes
<div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50">
  {/* Content */}
</div>
```

**Detail:** Lihat [DEVELOPER_GUIDE.md - Tailwind Snippets](./DEVELOPER_GUIDE.md#-tailwind-css-snippets)

---

## 🔍 Available Components

### Custom Feature Components
- `AnimatedCounter` - Animated number display
- `AreaCoverageSection` - Service area showcase
- `CTASection` - Call-to-action section
- `FAQAccordion` - FAQ with accordion
- `PortfolioGallery` - Project gallery
- `ServiceCard` - Service showcase card
- `TestimonialSlider` - Testimonial carousel
- `SparkParticles` - Particle animation
- `GlowButton` - Special CTA button
- `Reveal` - Scroll reveal animation

**Detail:** Lihat [COMPONENTS.md - Custom Components](./COMPONENTS.md#-custom-components-feature-components)

---

### UI Components (30+)
- Form components (Input, Textarea, Select, etc.)
- Layout (Card, Tabs, Accordion, Dialog, etc.)
- Navigation (Button, Breadcrumb, Pagination, etc.)
- Display (Badge, Avatar, Alert, etc.)
- Data (Table, Chart, Carousel, etc.)

**Detail:** Lihat [COMPONENTS.md - UI Components](./COMPONENTS.md#-ui-components-from-radix-ui--shadcnui)

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

1. **If this is your first time:** Start with [README.md](./README.md)
2. **If you're ready to code:** Use [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
3. **If you need component docs:** Check [COMPONENTS.md](./COMPONENTS.md)
4. **If you need architecture details:** Read [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 📝 Document Versions

| Document | Updated | Status |
|----------|---------|--------|
| README.md | May 22, 2026 | ✅ Current |
| ARCHITECTURE.md | May 22, 2026 | ✅ Current |
| DEVELOPER_GUIDE.md | May 22, 2026 | ✅ Current |
| COMPONENTS.md | May 22, 2026 | ✅ Current |
| DOCUMENTATION_INDEX.md | May 22, 2026 | ✅ Current |

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

