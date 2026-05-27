# Arsitektur Teknis - Welding Works Studio

Dokumentasi detail untuk fullstack developers tentang arsitektur, alur data, dan pola-pola yang digunakan.

---

## 🏛️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE WORKERS (Edge)                 │
│                   (Deployment Platform)                      │
└────────────────────────────────┬────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
        ┌───────────▼──────────┐   ┌─────────▼──────────┐
        │   Server Rendering   │   │   Static Assets    │
        │   (src/server.ts)    │   │   (public/, dist)  │
        │   SSR + Hydration    │   │                    │
        └───────────┬──────────┘   └────────────────────┘
                    │
        ┌───────────▼──────────────────────┐
        │   React 19 Application           │
        │   ├─ TanStack Router              │
        │   ├─ TanStack Query (cache)       │
        │   ├─ Components + UI              │
        │   └─ Styling (Tailwind CSS)       │
        └────────────┬──────────────────────┘
                     │
        ┌────────────▼────────────┐
        │   Client Hydration      │
        │   (src/start.ts)        │
        │   Interactive Phase     │
        └─────────────────────────┘
```

---

## 🏢 Welding Works Studio Data Model

### Service Categories (9 Types)

```
1. Pagar Besi (pagar-besi)
   ├─ Material: anti karat, custom desain
   ├─ Target: rumah, ruko, gudang
   └─ Features: survey gratis, garansi

2. Kanopi (kanopi)
   ├─ Tipe: polycarbonate, alderon, spandek
   ├─ Target: carport, teras, area servis
   └─ Features: anti bocor, konstruksi kokoh

3. Railing Tangga (railing-tangga)
   ├─ Material: besi tempa, stainless steel
   ├─ Target: indoor & outdoor
   └─ Features: finishing halus, custom desain

4. Balkon (balkon)
   ├─ Desain: geometris modern, klasik
   ├─ Target: lantai 2, fasad rumah
   └─ Features: anti karat, tinggi standar

5. Tralis Jendela (tralis-jendela)
   ├─ Gaya: minimalis modern
   ├─ Target: keamanan & estetika
   └─ Features: pengaman optimal, custom ukuran

6. Konstruksi Baja Ringan (baja-ringan)
   ├─ Standard: SNI certified
   ├─ Target: rangka atap, kanopi
   └─ Features: anti rayap & karat, hitungan presisi

7. Las Panggilan (las-panggilan)
   ├─ Layanan: 24 jam
   ├─ Target: perbaikan mendadak
   └─ Features: datang ke lokasi, respon cepat

8. Konstruksi Baja (konstruksi-baja)
   ├─ Material: WF, H-Beam, IWF
   ├─ Target: gudang, workshop, industri
   └─ Features: struktur teknis, welding sertifikasi

9. Pintu Besi (pintu-besi)
   ├─ Tipe: swing, sliding, folding gate
   ├─ Target: rumah, ruko, gudang
   └─ Features: heavy-duty engsel, custom desain
```

### Data Flow for Service Pages

```
URL Request: /layanan/pagar-besi
        │
        ▼
Router: routes/layanan.$slug.tsx
        │
        ├─ Extract slug parameter: "pagar-besi"
        │
        ├─ Query SERVICES data from lib/data.ts
        │
        ├─ Find matching service:
        │  {
        │    slug: "pagar-besi",
        │    title: "Pagar Besi",
        │    short: "Pagar minimalis, klasik, hingga custom desain.",
        │    description: "Pembuatan pagar besi...",
        │    image: pagar,
        │    features: ["Material anti karat", "Desain custom", ...]
        │  }
        │
        ├─ Render ServiceDetail component
        │
        └─ Display:
           ├─ Hero image
           ├─ Title & description
           ├─ Features list
           ├─ CTA buttons (WhatsApp, Contact form)
           └─ Related services carousel
```

### Homepage Component Flow

```
HomePage
├─ Hero (animated, particle background)
├─ TrustStrip (why choose us)
├─ ServicesSection
│  └─ Map SERVICES → ServiceCard (9 items)
├─ PortfolioPreview
│  └─ Display PORTFOLIO (8 showcase items)
├─ Advantages (6 key points with icons)
├─ AreaCoverageSection (service areas)
├─ Testimoni (TestimonialSlider with TESTIMONIALS)
├─ FAQ (FAQAccordion with FAQS)
└─ FinalCTA (contact call-to-action)
```

---

### Initial Page Load (SSR)

```
1. User Request Browser
                 │
2. Cloudflare Workers receives request
                 │
3. server.ts processes request
   ├─ Route matching (TanStack Router)
   ├─ Load data if needed
   └─ Render React to string
                 │
4. HTML + CSS + JS sent to client
                 │
5. Browser renders initial HTML (fast)
                 │
6. React hydrates (client-side activation)
                 │
7. Page interactive
```

### Data Fetching (Client-Side)

```
Component renders
        │
useQuery hook called
        │
React Query checks cache
        ├─ Cache hit? ─ Use cached data
        │
        └─ Cache miss? ─ Fetch from server
                          │
                          Fetch request to API/Server
                          │
                          Response data
                          │
                          React Query caches result
                          │
                          Component re-renders with data
```

---

## 🗂️ File Organization Details

### `/src/routes/` - Page Routes

**Routing Convention:**

```
routes/
├── __root.tsx          # Root layout, wrappers
├── index.tsx           # / (home)
├── about.tsx           # /about
├── layanan.tsx         # /layanan (list)
├── layanan.$slug.tsx   # /layanan/:slug (detail)
├── blog.tsx            # /blog
├── blog.$slug.tsx      # /blog/:slug
└── sitemap[.]xml.ts    # /sitemap.xml (special route)

Dynamic Routes: $param menjadi :param
Static Extensions: [.]xml menjadi .xml
```

**Root Layout (`__root.tsx`):**

```typescript
export const RootRoute = createRootRouteWithContext()({
  component: RootComponent,
  // Global layout, metadata, providers
  // Rendered untuk setiap halaman
});
```

### `/src/components/` - Reusable Components

**UI Components (`/ui/`)** - Headless primitives dari Radix UI:

- Tidak punya styling default (hanya struktur & accessibility)
- Dikombinasikan dengan Tailwind CSS classes
- Sangat fleksibel dan composable

**Feature Components** - Custom komponen spesifik untuk website:

```
AnimatedCounter.tsx    → Number counter dengan animasi
AreaCoverageSection.tsx → Section display area coverage
CTASection.tsx         → Call-to-Action section
FAQAccordion.tsx       → FAQ dengan accordion
PortfolioGallery.tsx   → Gallery showcase
ServiceCard.tsx        → Card untuk services
TestimonialSlider.tsx  → Carousel testimonial
GlowButton.tsx         → Button dengan glow effect
SparkParticles.tsx     → Particle background
Reveal.tsx             → Reveal on scroll animation
```

### `/src/lib/` - Business Logic & Utilities

```typescript
// data.ts - Static content
export const services = [
  { id: 1, name: "Welding", description: "..." },
  // ...
];

// utils.ts - Helper functions
export function cn(...classes) { ... }  // Tailwind class merger

// site.ts - Site configuration
export const SITE_CONFIG = { ... }

// error-capture.ts - Error handling
// error-page.ts - Error display component
```

### `/src/hooks/` - Custom React Hooks

```typescript
// use-mobile.tsx
export function useMobile() {
  // Hook untuk detect apakah device mobile
  // Digunakan untuk responsive behavior
}
```

---

## 🔄 Request/Response Cycle

### Route Handler Flow

```typescript
// routes/layanan.$slug.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/layanan/$slug')({
  // 1. Loader - fetch data sebelum render
  loader: async ({ params }) => {
    return await fetchService(params.slug)
  },

  // 2. Component - render dengan data
  component: ServiceDetailPage,

  // 3. Error boundary
  errorComponent: ErrorComponent,

  // 4. Not found
  notFoundComponent: NotFoundComponent,
})

function ServiceDetailPage() {
  // Akses data dari loader
  const { data } = Route.useLoaderData()
  return <div>{data.name}</div>
}
```

### Query Pattern (Data Fetching)

```typescript
import { useQuery } from '@tanstack/react-query'

function MyComponent() {
  // Query dengan cache otomatis
  const { data, isLoading, error } = useQuery({
    queryKey: ['service', id],
    queryFn: () => fetchService(id),
    staleTime: 5 * 60 * 1000, // Cache 5 menit
  })

  if (isLoading) return <Skeleton />
  if (error) return <ErrorBoundary />

  return <div>{data.name}</div>
}
```

---

## 🎨 Styling Architecture

### Tailwind CSS Structure

```
Global Styles
├── styles.css (Tailwind directives)
│   ├── @tailwind base;      (element resets)
│   ├── @tailwind components; (custom components)
│   └── @tailwind utilities;  (utility classes)
│
└── CSS Variables (dark mode, theming)
    ├── --background
    ├── --foreground
    ├── --primary
    ├── --secondary
    └── ...
```

### Component Styling Example

```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function ServiceCard({ isActive }) {
  return (
    <div className={cn(
      "p-4 rounded-lg transition-colors",
      isActive ? "bg-primary text-white" : "bg-gray-100"
    )}>
      <Button className="w-full">Learn More</Button>
    </div>
  )
}
```

### Responsive Design Pattern

```typescript
// Tailwind responsive prefixes
<div className="
  grid grid-cols-1        // mobile: 1 column
  md:grid-cols-2          // tablet: 2 columns
  lg:grid-cols-3          // desktop: 3 columns
  gap-4
">
  {/* content */}
</div>
```

---

## 🔐 Type Safety

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "strict": true, // Enable all strict checks
    "noUnusedLocals": false,
    "paths": {
      "@/*": ["./src/*"] // @ alias untuk imports
    }
  }
}
```

### Type Patterns

```typescript
// Interface untuk component props
interface ServiceCardProps {
  title: string;
  description?: string;
  isActive: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, isActive }) => {
  // ...
};

// Type-safe route params
type ServiceParams = {
  slug: string;
};

// Type-safe query keys
const queryKeys = {
  all: ["services"],
  lists: () => [...queryKeys.all, "list"],
  detail: (slug: string) => [...queryKeys.all, "detail", slug],
};
```

---

## 📊 State Management Strategy

### React Query (Server State)

```typescript
// Setup di router.tsx
const queryClient = new QueryClient();

// Usage di components
const { data, isLoading, error } = useQuery({
  queryKey: ["services"],
  queryFn: async () => {
    const res = await fetch("/api/services");
    return res.json();
  },
});
```

### React State (Local UI State)

```typescript
const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState({ ... })
```

### Form State (React Hook Form)

```typescript
const form = useForm({
  resolver: zodResolver(contactSchema),
  defaultValues: { ... },
})

const onSubmit = async (data) => {
  // Handle submission
}

return (
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <input {...form.register('email')} />
  </form>
)
```

---

## 🚀 Performance Optimizations

### 1. Code Splitting

- TanStack Router otomatis split routes
- Setiap route adalah separate chunk
- Load hanya ketika dibutuhkan

### 2. Lazy Loading

```typescript
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

export function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### 3. React Query Caching

```typescript
// Automatic cache management
// Stale while revalidate pattern
// Background refetching
```

### 4. Image Optimization Ready

```typescript
// Use native <img> dengan srcset, atau:
<picture>
  <source media="(min-width:768px)" srcSet="large.jpg" />
  <img src="small.jpg" alt="description" />
</picture>
```

### 5. Memoization

```typescript
import { memo, useMemo, useCallback } from 'react'

const ServiceCard = memo(({ service }) => {
  return <div>{service.name}</div>
})

const MemoizedList = ({ services }) => {
  const sorted = useMemo(
    () => services.sort((a, b) => a.name.localeCompare(b.name)),
    [services]
  )

  const handleClick = useCallback(
    (id) => console.log(id),
    []
  )

  return <div onClick={handleClick}>{/* ... */}</div>
}
```

---

## 🔌 Integration Points

### Server-Side Data Loading

```typescript
// routes/layanan.$slug.tsx
export const Route = createFileRoute("/layanan/$slug")({
  loader: async ({ params, context }) => {
    // Server runs this before component render
    // Can access database, external APIs, etc.

    const data = await context.queryClient.fetchQuery({
      queryKey: ["service", params.slug],
      queryFn: () => fetchServiceFromDB(params.slug),
    });

    return data;
  },
});
```

### API Endpoints (if needed)

```typescript
// Could add API routes in src/routes/api/ if needed
// Currently using server.ts for SSR

// Example structure:
// routes/api/services.ts → /api/services endpoint
// routes/api/contact.ts → /api/contact endpoint
```

### Form Submission Example

```typescript
const handleSubmit = async (data) => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed");

    const result = await response.json();
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

---

## 🧪 Component Development Pattern

### Creating a New Component

```typescript
// /src/components/NewFeature.tsx
import { FC, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface NewFeatureProps {
  title: string
  items: Item[]
  onSelect?: (id: string) => void
}

const NewFeature: FC<NewFeatureProps> = ({
  title,
  items,
  onSelect,
}) => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-2 rounded cursor-pointer transition-colors",
              selected === item.id && "bg-primary text-white"
            )}
            onClick={() => {
              setSelected(item.id)
              onSelect?.(item.id)
            }}
          >
            {item.name}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default NewFeature
```

### Adding to Route

```typescript
// /src/routes/mypage.tsx
import { createFileRoute } from '@tanstack/react-router'
import NewFeature from '@/components/NewFeature'

export const Route = createFileRoute('/mypage')({
  component: MyPage,
})

function MyPage() {
  return (
    <div className="space-y-8">
      <NewFeature
        title="My Feature"
        items={[...]}
        onSelect={(id) => console.log(id)}
      />
    </div>
  )
}
```

---

## 📝 Form Handling Deep Dive

### Zod Schema Definition

```typescript
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  message: z.string().min(10, "Message min 10 chars"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### Form Component

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (response.ok) {
        // Success
        form.reset()
      }
    } catch (error) {
      // Error handling
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Name</label>
        <input {...form.register('name')} />
        {form.formState.errors.name && (
          <span className="text-red-500">
            {form.formState.errors.name.message}
          </span>
        )}
      </div>

      {/* More fields... */}

      <button type="submit" disabled={form.formState.isSubmitting}>
        Submit
      </button>
    </form>
  )
}
```

---

## 🐛 Error Handling

### Global Error Boundaries

```typescript
// __root.tsx
import { ErrorComponent, RootErrorRoute } from '@tanstack/react-router'

const RootErrorRoute: RootErrorRoute = ({ error }) => {
  return (
    <div className="p-4">
      <h1>Error!</h1>
      <p>{error.message}</p>
    </div>
  )
}
```

### Route-Level Error Handling

```typescript
export const Route = createFileRoute('/page')({
  component: PageComponent,
  errorComponent: ({ error }) => (
    <div>Page Error: {error.message}</div>
  ),
  notFoundComponent: () => (
    <div>Page not found</div>
  ),
})
```

### Error Capture Utility

```typescript
// lib/error-capture.ts
export function captureError(error: Error) {
  console.error(error);
  // Could send to error tracking service
  // e.g., Sentry, LogRocket
}

// Usage
try {
  await fetchData();
} catch (error) {
  captureError(error as Error);
}
```

---

## 🔍 SEO Implementation

### Meta Tags (in \_\_root.tsx)

```typescript
export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "description",
        content: "Website description",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
  }),
});
```

### Structured Data (Schema.org)

```typescript
// LocalBusiness schema in __root.tsx
const LOCAL_BUSINESS_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Bara Baja Las",
  "telephone": "+6282125171716",
  "address": { ... },
})
```

### Dynamic Sitemap

```typescript
// routes/sitemap[.]xml.ts
export async function GET() {
  const pages = [
    { url: "/", priority: 1.0 },
    { url: "/layanan", priority: 0.8 },
    { url: "/portfolio", priority: 0.8 },
  ];

  return generateSitemap(pages);
}
```

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] Build passes: `npm run build`
- [ ] No linting errors: `npm run lint`
- [ ] Routes all working in dev
- [ ] SEO meta tags in place
- [ ] Images optimized
- [ ] Analytics configured (if needed)
- [ ] Error tracking setup (optional)
- [ ] Domain/DNS configured
- [ ] Cloudflare Workers deployment ready

---

## 🔗 Architecture Decision Records

### Why TanStack Start?

- Full-stack React framework dengan SSR built-in
- Type-safe routing
- Server functions support
- Excellent performance

### Why React Query?

- Automatic caching & synchronization
- Reduced boilerplate
- Built-in devtools
- Stale-while-revalidate pattern

### Why Tailwind CSS?

- Rapid development
- Consistent design system
- Small bundle size
- Great DX with VS Code

### Why Radix UI?

- Headless (no styling conflicts)
- Accessibility built-in (ARIA)
- Composable primitives
- Community support

---

## 📞 Getting Help

- Check TanStack Router docs
- Check React Query documentation
- Tailwind CSS utility reference
- Radix UI component docs
- GitHub Issues (if applicable)

---

**Last Updated:** May 22, 2026  
**Version:** 1.0.0
