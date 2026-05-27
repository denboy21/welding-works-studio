# 🎯 Technology & Architecture Overview

Quick visual reference untuk memahami teknologi dan struktur website secara keseluruhan.

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React 19 Application (Frontend)                         │   │
│  │  ├─ TanStack Router (File-based routing)                │   │
│  │  ├─ React Query (Data fetching & caching)              │   │
│  │  ├─ Components (Custom + Radix UI)                      │   │
│  │  └─ Tailwind CSS (Styling)                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │
┌─────────────────────────────────────────────────────────────────┐
│                  CLOUDFLARE WORKERS (Edge Server)                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  TanStack Start (Full-Stack Framework)                  │   │
│  │  ├─ Server-Side Rendering (SSR)                         │   │
│  │  ├─ Route handlers (src/server.ts)                      │   │
│  │  ├─ Hydration (client activation)                       │   │
│  │  └─ API endpoints (optional)                            │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                           │
                           │
┌─────────────────────────────────────────────────────────────────┐
│             STATIC DATA & CONFIGURATION                          │
│  ├─ src/lib/data.ts (9 services, 8 portfolio, 5 testimonials)  │
│  ├─ src/lib/site.ts (business config)                          │
│  ├─ src/assets/ (images)                                       │
│  └─ Environment variables                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Technology Stack

### Frontend Layer

```
┌─────────────────────────────────┐
│       PRESENTATION               │
├─────────────────────────────────┤
│ React 19 (UI Library)           │
│ TypeScript 5.8 (Type Safety)    │
│ Tailwind CSS 4.2 (Styling)      │
│ Framer Motion 12.39 (Animation) │
│ Lucide React (Icons)            │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│     STATE & DATA MANAGEMENT      │
├─────────────────────────────────┤
│ TanStack Query 5.83             │
│ React Hook Form 7.71            │
│ Zod 3.24 (Validation)           │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│      ROUTING & NAVIGATION        │
├─────────────────────────────────┤
│ TanStack Router 1.168           │
│ File-based routing              │
│ Type-safe navigation            │
└─────────────────────────────────┘
```

### Backend Layer

```
┌─────────────────────────────────┐
│   SERVER-SIDE RENDERING         │
├─────────────────────────────────┤
│ TanStack Start 1.167            │
│ Node.js Runtime                 │
│ src/server.ts entry point       │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│    DEPLOYMENT PLATFORM          │
├─────────────────────────────────┤
│ Cloudflare Workers              │
│ wrangler.jsonc config           │
│ Edge computing @ speed of light │
└─────────────────────────────────┘
```

### Development Tools

```
┌─────────────────────────────────┐
│    BUILD & DEV TOOLING          │
├─────────────────────────────────┤
│ Vite 7.3 (Build tool)           │
│ esbuild (Bundler)               │
│ TypeScript compiler             │
│ Tailwind CSS compiler           │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│    CODE QUALITY & FORMATTING    │
├─────────────────────────────────┤
│ ESLint 9.32 (Linting)           │
│ Prettier 3.7 (Formatting)       │
│ TypeScript ESLint               │
└─────────────────────────────────┘
```

---

## 📁 Folder Structure Map

```
welding-works-studio/
│
├── 📄 Configuration Files
│   ├── package.json              ← Dependencies & scripts
│   ├── tsconfig.json             ← TypeScript config
│   ├── vite.config.ts            ← Build configuration
│   ├── wrangler.jsonc            ← Cloudflare Workers config
│   ├── eslint.config.js          ← Linting rules
│   └── components.json           ← shadcn/ui config
│
├── 📁 src/ (Main Source Code)
│   │
│   ├── 📄 Entry Points
│   │   ├── start.ts              ← Client entry point
│   │   ├── server.ts             ← Server entry point (SSR)
│   │   ├── router.tsx            ← Router setup + React Query
│   │   ├── routeTree.gen.ts      ← Auto-generated (don't edit!)
│   │   └── styles.css            ← Global styles (Tailwind)
│   │
│   ├── 📁 components/            ← React Components
│   │   │
│   │   ├── 📁 ui/                ← Headless UI Primitives (Radix UI)
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ... (30+ components)
│   │   │
│   │   ├── 📄 Feature Components  ← Custom Business Components
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── AreaCoverageSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── GlowButton.tsx
│   │   │   ├── IndustrialNavbar.tsx
│   │   │   ├── PortfolioGallery.tsx
│   │   │   ├── Reveal.tsx
│   │   │   ├── SectionEyebrow.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── SiteLayout.tsx
│   │   │   ├── SparkParticles.tsx
│   │   │   ├── TestimonialSlider.tsx
│   │   │   └── WhatsAppCTA.tsx
│   │
│   ├── 📁 routes/                ← Page Routes (File-based)
│   │   ├── __root.tsx            ← Root layout + metadata
│   │   ├── index.tsx             ← Homepage (/)
│   │   ├── tentang.tsx           ← About (/tentang)
│   │   ├── layanan.tsx           ← Services list (/layanan)
│   │   ├── layanan.$slug.tsx     ← Service detail (/layanan/:slug)
│   │   ├── area-layanan.tsx      ← Coverage area
│   │   ├── portfolio.tsx         ← Portfolio (/portfolio)
│   │   ├── testimoni.tsx         ← Testimonials (/testimoni)
│   │   ├── faq.tsx               ← FAQ (/faq)
│   │   ├── kontak.tsx            ← Contact (/kontak)
│   │   ├── blog.tsx              ← Blog list (/blog)
│   │   ├── blog.$slug.tsx        ← Blog detail (/blog/:slug)
│   │   └── sitemap[.]xml.ts      ← Dynamic sitemap
│   │
│   ├── 📁 hooks/                 ← Custom React Hooks
│   │   └── use-mobile.tsx        ← Mobile detection hook
│   │
│   ├── 📁 lib/                   ← Utilities & Configuration
│   │   ├── data.ts               ← ALL STATIC DATA
│   │   │   ├── 9 Services
│   │   │   ├── 8 Portfolio items
│   │   │   ├── 5 Testimonials
│   │   │   ├── 6 FAQs
│   │   │   └── Business config
│   │   ├── error-capture.ts      ← Error handling
│   │   ├── error-page.ts         ← Error component
│   │   ├── site.ts               ← Site configuration
│   │   └── utils.ts              ← Helper functions (cn, etc)
│   │
│   └── 📁 assets/                ← Static Images
│       ├── service-pagar.jpg
│       ├── service-kanopi.jpg
│       ├── service-railing.jpg
│       ├── service-balkon.jpg
│       ├── service-tralis.jpg
│       ├── service-baja-ringan.jpg
│       ├── service-las-panggilan.jpg
│       ├── service-konstruksi.jpg
│       ├── service-pintu.jpg
│       ├── hero-welder.jpg
│       └── ... (other images)
│
└── 📁 public/                    ← Static Public Files
    └── robots.txt
```

---

## 🔄 Data Flow

### Homepage Load

```
User visits homepage
        │
        ▼
Browser sends GET /
        │
        ▼
Cloudflare Workers receives request
        │
        ▼
TanStack Start renders React to HTML string
        │
        ├─ Load SERVICES from src/lib/data.ts
        ├─ Load PORTFOLIO from src/lib/data.ts
        ├─ Load TESTIMONIALS from src/lib/data.ts
        └─ Render all components to HTML
        │
        ▼
Send HTML + CSS + JS to browser
        │
        ▼
Browser displays HTML (fast initial load)
        │
        ▼
React hydrates (client activation)
        │
        ├─ Attach event listeners
        ├─ Activate animations
        └─ Enable interactivity
        │
        ▼
Page fully interactive ✅
```

### Service Detail Page Load

```
User clicks "Pagar Besi" service
        │
        ▼
TanStack Router navigates to /layanan/pagar-besi
        │
        ▼
routes/layanan.$slug.tsx renders
        │
        ├─ Extract slug: "pagar-besi"
        ├─ Find service from SERVICES array
        ├─ Load associated images
        └─ Render ServiceDetail component
        │
        ▼
Page shows service details with:
        ├─ Hero image
        ├─ Title & description
        ├─ Features list
        ├─ Call-to-action buttons
        └─ Related services
        │
        ▼
User can click CTA → WhatsApp pre-filled message ✅
```

---

## 🎯 Key Patterns

### Page Creation Pattern

```
src/routes/new-page.tsx
    │
    ├─ import { createFileRoute }
    ├─ export const Route = createFileRoute('/new-page')
    ├─ Define head() for meta tags
    └─ Export component function
    │
    ▼
File-based router auto-generates route
    │
    ▼
Page accessible at /new-page ✅
```

### Component Pattern

```
src/components/MyComponent.tsx
    │
    ├─ Define TypeScript interface for props
    ├─ Use Tailwind CSS for styling
    ├─ Import UI components from ui/
    └─ Export React component
    │
    ▼
Import in routes or other components
    │
    ▼
Reusable across website ✅
```

### Data Pattern

```
src/lib/data.ts
    │
    ├─ Export SERVICES array
    ├─ Export PORTFOLIO array
    ├─ Export TESTIMONIALS array
    ├─ Export FAQS array
    └─ Export ADVANTAGES array
    │
    ▼
Import in routes/components
    │
    ▼
.map() through arrays to render
    │
    ▼
Dynamic UI from static data ✅
```

---

## 🚀 Development Workflow

```
1. CODE
   ├─ Edit files in src/
   └─ npm run dev watches for changes

2. HOT RELOAD
   ├─ Browser auto-refreshes
   └─ State preserved when possible

3. TYPE CHECK
   ├─ TypeScript catches errors
   └─ IDE shows suggestions

4. LINT
   ├─ npm run lint checks code quality
   └─ ESLint enforces standards

5. FORMAT
   ├─ npm run format fixes formatting
   └─ Prettier ensures consistency

6. BUILD
   ├─ npm run build creates dist/
   └─ Vite optimizes bundle

7. PREVIEW
   ├─ npm run preview tests build locally
   └─ Verify production build

8. DEPLOY
   ├─ wrangler deploy pushes to Cloudflare
   └─ Live on Internet ✅
```

---

## 📊 Component Dependency Graph

```
SiteLayout (wrapper for all pages)
    │
    ├─ IndustrialNavbar
    │   ├─ Navigation links
    │   └─ Mobile menu
    │
    ├─ Page Content (routes/*)
    │   ├─ Hero Section
    │   │   ├─ SparkParticles
    │   │   ├─ Reveal
    │   │   └─ GlowButton
    │   │
    │   ├─ Services Grid
    │   │   └─ ServiceCard (repeating)
    │   │       ├─ Image
    │   │       └─ Link to detail
    │   │
    │   ├─ Portfolio Gallery
    │   │   └─ PortfolioGallery
    │   │       ├─ Category filters
    │   │       └─ Image grid
    │   │
    │   ├─ Testimonials
    │   │   └─ TestimonialSlider
    │   │       ├─ Auto-rotate
    │   │       └─ Navigation arrows
    │   │
    │   ├─ FAQ
    │   │   └─ FAQAccordion
    │   │       └─ Expand/collapse items
    │   │
    │   └─ CTA Section
    │       └─ CTASection
    │           └─ Button + text
    │
    ├─ Footer
    │   ├─ Navigation
    │   └─ Contact info
    │
    └─ WhatsAppCTA (floating, global)
        └─ Fixed position button
```

---

## 🔗 Integration Points

### Static Data

```
src/lib/data.ts → SERVICES, PORTFOLIO, TESTIMONIALS, FAQS
        │
        ├─ Used in routes for rendering
        ├─ Used in forms for dropdown options
        ├─ Used in components for display
        └─ NO database needed!
```

### Configuration

```
src/lib/site.ts → SITE, waLink()
        │
        ├─ Business phone number
        ├─ WhatsApp integration
        ├─ Coverage areas
        └─ Working hours
```

### Assets (Images)

```
src/assets/ → All service/portfolio images
        │
        ├─ Imported in src/lib/data.ts
        ├─ Used in components
        └─ Served by Vite
```

---

## ✨ Performance Highlights

```
┌────────────────────────────────────────┐
│ SSR (Server-Side Rendering)            │
├────────────────────────────────────────┤
│ ✅ Fast initial HTML delivery          │
│ ✅ Better SEO (search engines crawl)   │
│ ✅ Content visible before JS loads     │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Code Splitting                         │
├────────────────────────────────────────┤
│ ✅ Per-route chunks                    │
│ ✅ Load only needed code               │
│ ✅ Faster page transitions             │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ React Query Caching                    │
├────────────────────────────────────────┤
│ ✅ Smart cache management              │
│ ✅ Stale-while-revalidate              │
│ ✅ Automatic background refetch        │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Tailwind CSS Optimization              │
├────────────────────────────────────────┤
│ ✅ Purges unused styles                │
│ ✅ Minimal CSS output                  │
│ ✅ JIT compilation                     │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Edge Computing (Cloudflare)            │
├────────────────────────────────────────┤
│ ✅ Served from edge locations          │
│ ✅ Lowest latency globally             │
│ ✅ Automatic DDoS protection           │
└────────────────────────────────────────┘
```

---

## 🎓 Learning Path

### Level 1: Understand (Week 1)

```
1. Read README.md
2. Explore folder structure
3. Understand data flow
4. Know where components are
5. Know how routes work
```

### Level 2: Modify (Week 2)

```
1. Update content in data.ts
2. Add new portfolio item
3. Add new testimonial
4. Modify component styling
5. Change copy/text
```

### Level 3: Create (Week 3+)

```
1. Create new page
2. Create new component
3. Add forms & validation
4. Fetch data with React Query
5. Deploy changes
```

---

## 📞 Quick Reference

| What?             | Where?               | How?                   |
| ----------------- | -------------------- | ---------------------- |
| **Add Service**   | `src/lib/data.ts`    | Export SERVICES array  |
| **Add Portfolio** | `src/lib/data.ts`    | Export PORTFOLIO array |
| **Add Page**      | `src/routes/`        | Create new .tsx file   |
| **Add Component** | `src/components/`    | Create new .tsx file   |
| **Edit Styling**  | Component + Tailwind | Use className prop     |
| **Add Image**     | `src/assets/`        | Import in data.ts      |
| **Change Config** | `src/lib/site.ts`    | Edit SITE object       |
| **Add Form**      | Route or component   | Use React Hook Form    |

---

**Last Updated:** May 24, 2026  
**Version:** 1.0.0
