# Welding Works Studio - Bara Baja Las

Website profesional untuk layanan jasa las dan konstruksi baja di Karawang, Jawa Barat, Indonesia.

---

## 📋 Ringkasan Proyek

**Nama Bisnis:** Bara Baja Las  
**Lokasi:** Karawang, Jawa Barat  
**Layanan:** Jasa las profesional, pagar besi, kanopi, railing, tralis, balkon, pintu besi, konstruksi baja, welding custom  
**Website Type:** Full-stack web application dengan SSR (Server-Side Rendering)

---

## 🏗️ Stack Teknologi

### Frontend
- **React 19.2** - UI library modern dengan features terbaru
- **TypeScript 5.8** - Type-safe development
- **TanStack Router 1.168** - File-based routing dengan type-safety
- **Tailwind CSS 4.2** - Utility-first CSS framework
- **Radix UI** - Headless component library untuk aksesibilitas

### Framework & Tools
- **TanStack Start 1.167** - Full-stack React framework untuk SSR
- **Vite 7.3** - Modern build tool yang super cepat
- **@tanstack/react-query 5.83** - Data fetching & state management

### Styling & Components
- **Tailwind CSS with Vite** - Optimized styling
- **shadcn/ui compatible** - Pre-built accessible components
- **Framer Motion 12.39** - Animation library yang powerful
- **Lucide React 0.575** - Icon library yang comprehensive

### Form & Validation
- **React Hook Form 7.71** - Performant form state management
- **Zod 3.24** - TypeScript-first schema validation
- **@hookform/resolvers 5.2** - Integration hooks

### UI Components Tersedia
- Accordion, Alert Dialog, Avatar, Badge, Breadcrumb
- Button, Card, Carousel, Chart, Checkbox, Collapsible
- Command, Context Menu, Dialog, Drawer, Dropdown
- Form, Hover Card, Input, Label, Menubar
- Navigation Menu, Pagination, Popover, Progress
- Radio Group, Resizable, Scroll Area, Select
- Separator, Sheet, Sidebar, Skeleton, Slider
- Switch, Table, Tabs, Textarea, Toggle
- Tooltip, dan lebih banyak...

### Deployment & Server
- **Cloudflare Workers** - Edge computing platform
- **Wrangler** - CLI untuk Cloudflare Workers
- **Node.js Compatibility** - Full Node.js API support

### Development Tools
- **ESLint 9.32** - Linting & code quality
- **Prettier 3.7** - Code formatter
- **TypeScript ESLint** - TypeScript linting

---

## 📁 Struktur Folder

```
welding-works-studio-main/
│
├── public/                      # Static files yang langsung serve
│   └── robots.txt
│
├── src/
│   ├── components/              # React components
│   │   ├── ui/                  # Headless UI primitives dari Radix UI
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (30+ UI primitives)
│   │   │
│   │   ├── AnimatedCounter.tsx      # Custom component untuk animated number
│   │   ├── AreaCoverageSection.tsx  # Section untuk area coverage
│   │   ├── CTASection.tsx           # Call-to-Action section
│   │   ├── FAQAccordion.tsx         # FAQ dengan accordion
│   │   ├── Footer.tsx               # Footer komponen
│   │   ├── GlowButton.tsx           # Button dengan glow effect
│   │   ├── IndustrialNavbar.tsx     # Header/Navigation
│   │   ├── PortfolioGallery.tsx     # Gallery untuk portfolio/proyek
│   │   ├── Reveal.tsx               # Animation reveal component
│   │   ├── SectionEyebrow.tsx       # Kecil text sebelum heading
│   │   ├── ServiceCard.tsx          # Card untuk display layanan
│   │   ├── SiteLayout.tsx           # Main layout wrapper
│   │   ├── SparkParticles.tsx       # Particle animation effect
│   │   ├── TestimonialSlider.tsx    # Carousel untuk testimonial
│   │   └── WhatsAppCTA.tsx          # WhatsApp call-to-action button
│   │
│   ├── routes/                  # Page routes (TanStack Router file-based)
│   │   ├── __root.tsx               # Root layout dengan metadata & SEO
│   │   ├── index.tsx                # Halaman utama (/)
│   │   ├── tentang.tsx              # About page (/tentang)
│   │   ├── layanan.tsx              # Services page (/layanan)
│   │   ├── layanan.$slug.tsx        # Service detail (/layanan/:id)
│   │   ├── area-layanan.tsx         # Coverage area page
│   │   ├── portfolio.tsx            # Portfolio page
│   │   ├── testimoni.tsx            # Testimonials page
│   │   ├── faq.tsx                  # FAQ page
│   │   ├── kontak.tsx               # Contact page
│   │   ├── blog.tsx                 # Blog list page
│   │   ├── blog.$slug.tsx           # Blog detail page
│   │   └── sitemap[.]xml.ts         # Dynamic sitemap untuk SEO
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── use-mobile.tsx           # Hook untuk detect mobile device
│   │
│   ├── lib/                     # Utility & helper functions
│   │   ├── data.ts                  # Static data (layanan, portfolio, dll)
│   │   ├── error-capture.ts         # Error handling utilities
│   │   ├── error-page.ts            # Error page component
│   │   ├── site.ts                  # Site configuration
│   │   └── utils.ts                 # General utilities (cn, classNames, dll)
│   │
│   ├── assets/                  # Static images & media
│   │
│   ├── styles.css               # Global Tailwind CSS styles
│   ├── router.tsx               # Router configuration dengan React Query
│   ├── routeTree.gen.ts         # Auto-generated route tree (jangan edit!)
│   ├── server.ts                # Server entry point untuk SSR
│   └── start.ts                 # Client entry point
│
├── Configuration Files
│   ├── package.json             # Dependencies & scripts
│   ├── tsconfig.json            # TypeScript configuration
│   ├── vite.config.ts           # Vite build configuration
│   ├── wrangler.jsonc           # Cloudflare Workers config
│   ├── components.json          # shadcn/ui configuration
│   ├── eslint.config.js         # ESLint configuration
│   ├── bunfig.toml              # Bun package manager config
│   └── README.md                # (file ini)
```

---

## 🚀 Cara Setup & Development

### Prerequisites
- Node.js 18+ atau Bun
- npm atau Bun package manager

### Installation
```bash
# Clone repository (jika belum)
git clone <repo-url>
cd welding-works-studio-main

# Install dependencies
npm install
# atau jika menggunakan Bun:
bun install
```

### Development Server
```bash
npm run dev
# atau
bun dev

# Website akan tersedia di http://localhost:5173
```

### Build untuk Production
```bash
npm run build
# atau
bun build
```

### Preview Build
```bash
npm run preview
```

### Linting & Formatting
```bash
# Check linting issues
npm run lint

# Auto-fix formatting
npm run format
```

---

## 📊 Arsitektur Aplikasi

### Client-Side Rendering + Server-Side Rendering (SSR)
- **TanStack Start** menangani SSR untuk performa & SEO yang lebih baik
- Route tree auto-generated dari struktur file di `/src/routes/`
- React Query untuk data fetching dan caching

### Routing
- **File-based routing** - File di `src/routes/` otomatis menjadi route
- `[.]` dalam filename menunjukkan file extension (misal `sitemap[.]xml.ts`)
- `$slug` menunjukkan dynamic segment
- Type-safe routing dengan TanStack Router

### Component Architecture
```
SiteLayout (Main wrapper)
├── IndustrialNavbar (Header)
├── [Page Components]
│   ├── Hero/Section
│   ├── ServiceCard
│   ├── PortfolioGallery
│   ├── TestimonialSlider
│   ├── FAQAccordion
│   └── CTASection
├── Footer
└── WhatsAppCTA (Floating CTA)
```

### Styling Strategy
- **Tailwind CSS** - Utility classes untuk rapid development
- **CSS Variables** - Customizable via `styles.css`
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Tailwind dark mode support built-in

---

## 🔑 Key Features

### ✅ SEO Optimized
- Server-Side Rendering (SSR)
- Dynamic sitemap generation
- Structured data (Schema.org LocalBusiness JSON-LD)
- Meta tags management
- Social media OG tags

### ✅ Performance
- Code splitting otomatis
- Image optimization ready
- Lazy loading components
- React Query caching

### ✅ Accessibility
- Radix UI untuk semantik HTML
- ARIA attributes
- Keyboard navigation support
- Contrast-aware colors

### ✅ Mobile Responsive
- Mobile detection hook (`use-mobile`)
- Responsive components
- Touch-friendly UI

### ✅ Animations
- Framer Motion untuk smooth transitions
- Particle effects (`SparkParticles`)
- Reveal animations
- Scroll-based animations ready

---

## 📝 Konvensi & Best Practices

### File Naming
- **Components**: PascalCase (misal `ServiceCard.tsx`)
- **Routes**: kebab-case (misal `area-layanan.tsx`)
- **Utilities**: camelCase (misal `error-capture.ts`)
- **Constants**: UPPER_SNAKE_CASE

### Component Structure
```typescript
// Imports
import { FC } from 'react';
import { Button } from '@/components/ui/button';

// Type definitions
interface ComponentProps {
  title: string;
  // ...
}

// Component
const MyComponent: FC<ComponentProps> = ({ title }) => {
  return <div>{title}</div>;
};

export default MyComponent;
```

### Styling Approach
```typescript
// Gunakan cn() untuk conditional classes
import { cn } from '@/lib/utils';

<Button className={cn(
  "base-styles",
  isActive && "active-styles"
)} />
```

### Data Structure
- Static data disimpan di `src/lib/data.ts`
- Type definitions untuk consistency
- Easy to update tanpa edit multiple files

---

## 🔧 Development Workflow

### 1. Membuat Halaman Baru
```bash
# Buat file di src/routes/
# Misal: src/routes/halaman-baru.tsx

export default function HalamaBaru() {
  return <div>Halaman Baru</div>;
}
```

### 2. Membuat Komponen
```bash
# Buat file di src/components/
# Misal: src/components/MyComponent.tsx

import { FC } from 'react';

interface Props {
  // ...
}

const MyComponent: FC<Props> = () => {
  return <div></div>;
};

export default MyComponent;
```

### 3. Styling
```typescript
// Gunakan Tailwind classes
<div className="flex items-center justify-between p-4 rounded-lg bg-slate-100">
  {/* content */}
</div>
```

### 4. Form Handling
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

---

## 📚 Useful Resources

### Documentation
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Framer Motion](https://www.framer.com/motion)
- [Vite](https://vitejs.dev)
- [Cloudflare Workers](https://workers.cloudflare.com)

### VS Code Extensions Recommended
- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **TypeScript Vue Plugin** - Vue.volar
- **Prettier** - esbenp.prettier-vscode
- **ESLint** - dbaeumer.vscode-eslint

---

## 🌐 Deployment

### Deploy ke Cloudflare Workers
```bash
# Build terlebih dahulu
npm run build

# Deploy (memerlukan Wrangler login)
wrangler deploy
```

### Konfigurasi Environment
Edit `wrangler.jsonc` untuk setup environment:
```json
{
  "name": "welding-works-studio",
  "compatibility_date": "2025-09-24",
  "compatibility_flags": ["nodejs_compat"],
  "main": "src/server.ts"
}
```

---

## 🐛 Troubleshooting

### Port sudah digunakan
```bash
# Kill process di port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5173 | xargs kill -9
```

### Build error
```bash
# Clear cache dan rebuild
rm -rf node_modules
npm install
npm run build
```

### Route tidak ditemukan
- Pastikan file route ada di `src/routes/`
- Jalankan dev server, route tree auto-generate
- Jangan edit `routeTree.gen.ts` secara manual

---

## 📞 Contact & Support

**Bara Baja Las**
- 📞 +62 821 2517 1716 (WhatsApp)
- 📍 Kp. Kadongdong, Desa Bengle, Karawang, Jawa Barat
- 🕐 Jam Operasional: 08:00 - 17:00 (Senin-Sabtu)

---

## 📄 License

Private Project - Semua rights reserved untuk Bara Baja Las

---

**Last Updated:** May 22, 2026  
**Version:** 1.0.0  
**Status:** Active Development ✅

