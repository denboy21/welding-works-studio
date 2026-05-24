# Components & Features Documentation

Dokumentasi lengkap tentang komponen-komponen yang sudah ada dan cara menggunakannya.

---

## 📦 Custom Components (Feature Components)

### AnimatedCounter.tsx
**Purpose:** Menampilkan angka dengan animasi counter yang smooth

**Props:**
```typescript
interface AnimatedCounterProps {
  end: number          // Angka target
  duration?: number    // Durasi animasi (ms)
  prefix?: string      // Prefix (e.g., "$", "+")
  suffix?: string      // Suffix (e.g., "%", "K")
  format?: (n: number) => string  // Custom format function
}
```

**Usage:**
```typescript
<AnimatedCounter end={500} suffix="+" duration={2000} />
```

**Use Case:**
- Statistik perusahaan
- Customer count
- Project completed
- Years of experience

---

### AreaCoverageSection.tsx
**Purpose:** Section untuk menampilkan area coverage/jangkauan layanan

**Props:**
```typescript
interface AreaCoverageSectionProps {
  areas: string[]      // Array area yang dicakup
  title?: string
  description?: string
}
```

**Usage:**
```typescript
<AreaCoverageSection
  areas={["Karawang", "Cikampek", "Purwakarta", "Bekasi"]}
  title="Area Pelayanan"
/>
```

**Features:**
- Display area list dengan styling menarik
- Responsive grid
- Optional map integration point

---

### CTASection.tsx
**Purpose:** Call-to-Action section untuk mendorong user action

**Props:**
```typescript
interface CTASectionProps {
  title: string        // Main heading
  description: string  // Description text
  buttonText: string   // Button label
  buttonHref: string   // Link destination
  image?: string       // Optional background image
}
```

**Usage:**
```typescript
<CTASection
  title="Siap untuk project Anda?"
  description="Hubungi kami sekarang untuk konsultasi gratis"
  buttonText="Hubungi Via WhatsApp"
  buttonHref="https://wa.me/6282125171716"
/>
```

**Features:**
- Eye-catching design
- Responsive layout
- Animation on scroll

---

### FAQAccordion.tsx
**Purpose:** FAQ section dengan accordion component

**Props:**
```typescript
interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]      // FAQ items
  title?: string
}
```

**Usage:**
```typescript
<FAQAccordion
  items={[
    { question: "Berapa harga?", answer: "Tergantung project..." },
    { question: "Berapa lama?", answer: "3-7 hari kerja..." },
  ]}
  title="Pertanyaan Umum"
/>
```

**Features:**
- Accordion UI
- Smooth expand/collapse
- SEO-friendly markup

---

### Footer.tsx
**Purpose:** Footer komponen untuk semua halaman

**Props:** Biasanya tidak menerima props (content dari constant)

**Usage:**
```typescript
<Footer />
```

**Features:**
- Navigation links
- Contact info
- Social media links
- Copyright info
- Quick links

---

### GlowButton.tsx
**Purpose:** Button khusus dengan glow effect yang eye-catching

**Props:**
```typescript
interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}
```

**Usage:**
```typescript
<GlowButton onClick={() => console.log('Clicked!')}>
  Click Me
</GlowButton>
```

**Features:**
- Glow animation
- Hover effects
- Multiple variants
- Responsive sizes

---

### IndustrialNavbar.tsx
**Purpose:** Header/Navigation bar utama untuk website

**Props:** Biasanya tidak menerima props (responsive auto-adjust)

**Usage:**
```typescript
<IndustrialNavbar />
```

**Features:**
- Responsive mobile menu
- Active link highlighting
- Sticky on scroll (optional)
- Logo/branding
- Navigation links
- CTA button

---

### PortfolioGallery.tsx
**Purpose:** Gallery showcase untuk portfolio/proyek yang selesai

**Props:**
```typescript
interface Project {
  id: string
  title: string
  image: string
  category: string
  description?: string
}

interface PortfolioGalleryProps {
  projects: Project[]
  title?: string
  showCategories?: boolean
  columns?: 2 | 3 | 4
}
```

**Usage:**
```typescript
<PortfolioGallery
  projects={portfolioData}
  title="Portfolio Kami"
  columns={3}
/>
```

**Features:**
- Image gallery grid
- Category filter
- Lightbox/modal view
- Responsive columns
- Hover effects

---

### Reveal.tsx
**Purpose:** Animation component untuk reveal text/elements on scroll

**Props:**
```typescript
interface RevealProps {
  children: React.ReactNode
  delay?: number       // Delay animasi (ms)
  direction?: 'up' | 'down' | 'left' | 'right'
}
```

**Usage:**
```typescript
<Reveal delay={100} direction="up">
  <h2>This text reveals on scroll</h2>
</Reveal>
```

**Features:**
- Scroll-triggered animation
- Customizable direction
- Staggered animation support
- Performance optimized

---

### SectionEyebrow.tsx
**Purpose:** Small text element sebelum heading (marketing-style)

**Props:**
```typescript
interface SectionEyebrowProps {
  text: string         // Eyebrow text
  className?: string
}
```

**Usage:**
```typescript
<SectionEyebrow text="OUR SERVICES" />
<h2 className="text-4xl font-bold">Layanan Kami</h2>
```

**Features:**
- Styled small text
- Typography consistency
- Color accent

---

### ServiceCard.tsx
**Purpose:** Card component untuk menampilkan individual service

**Props:**
```typescript
interface ServiceCardProps {
  title: string        // Service name
  description: string  // Service description
  icon?: React.ReactNode  // Icon
  image?: string       // Background image
  price?: string       // Optional price
  onLearnMore?: () => void
}
```

**Usage:**
```typescript
<ServiceCard
  title="Pagar Besi"
  description="Pagar berkualitas tinggi dengan desain modern"
  icon={<Icon />}
/>
```

**Features:**
- Icon/image support
- Hover animation
- Responsive layout
- Click handler

---

### SiteLayout.tsx
**Purpose:** Main layout wrapper untuk entire website

**Props:**
```typescript
interface SiteLayoutProps {
  children: React.ReactNode
  showFooter?: boolean   // Default: true
  showNavbar?: boolean   // Default: true
}
```

**Usage:**
```typescript
<SiteLayout>
  {/* Page content */}
</SiteLayout>
```

**Features:**
- Navbar & Footer management
- Main container styling
- Consistent spacing
- Background effects

---

### SparkParticles.tsx
**Purpose:** Particle effect background animation

**Props:**
```typescript
interface SparkParticlesProps {
  count?: number       // Number of particles (default: 50)
  speed?: number       // Animation speed (default: 0.5)
  opacity?: number     // Particle opacity (default: 0.5)
  className?: string
}
```

**Usage:**
```typescript
<div className="relative">
  <SparkParticles count={100} speed={0.3} />
  <div className="relative z-10">
    {/* Content on top */}
  </div>
</div>
```

**Features:**
- Animated particle background
- Fully customizable
- Performance optimized
- Responsive sizing

---

### TestimonialSlider.tsx
**Purpose:** Carousel/slider untuk testimonial dari customers

**Props:**
```typescript
interface Testimonial {
  name: string
  role: string
  content: string
  image?: string
  rating?: number      // 1-5 stars
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  autoSlide?: boolean  // Default: true
  interval?: number    // Slide interval (ms)
}
```

**Usage:**
```typescript
<TestimonialSlider
  testimonials={testimonialsData}
  autoSlide={true}
  interval={5000}
/>
```

**Features:**
- Auto-rotating slides
- Navigation controls
- Star rating display
- Responsive slides
- Smooth transitions

---

### WhatsAppCTA.tsx
**Purpose:** Floating WhatsApp button untuk customer contact

**Props:**
```typescript
interface WhatsAppCTAProps {
  phoneNumber?: string // Default dari SITE_CONFIG
  message?: string     // Custom greeting message
  position?: 'bottom-right' | 'bottom-left'  // Default: bottom-right
}
```

**Usage:**
```typescript
<WhatsAppCTA
  phoneNumber="+6282125171716"
  message="Halo, saya ingin konsultasi"
/>
```

**Features:**
- Fixed floating button
- Pre-filled message
- Click to open WhatsApp
- Animated pulse effect
- Mobile-friendly

---

## 🎨 UI Components (from Radix UI + shadcn/ui)

Semua UI components ada di `src/components/ui/`. Berikut dokumentasi ringkas:

### Form Components
- **Input** - Text input field
- **Textarea** - Multi-line text area
- **Select** - Dropdown select
- **Checkbox** - Checkbox input
- **Radio Group** - Radio button group
- **Switch** - Toggle switch
- **Slider** - Range slider
- **Form** - Form wrapper dengan validation

**Usage:**
```typescript
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<div className="space-y-4">
  <Input placeholder="Name" />
  <Textarea placeholder="Message" />
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Choose..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="opt1">Option 1</SelectItem>
    </SelectContent>
  </Select>
  <Button type="submit">Submit</Button>
</div>
```

### Layout Components
- **Card** - Container dengan border & shadow
- **Tabs** - Tab navigation
- **Accordion** - Collapsible sections
- **Separator** - Divider line
- **Drawer** - Slide-out drawer (mobile friendly)
- **Sheet** - Full-height sheet
- **Dialog** - Modal dialog
- **Popover** - Floating popover
- **Hover Card** - Card on hover
- **Tooltip** - Tooltip on hover

**Usage:**
```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Tabs>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content</TabsContent>
    </Tabs>
  </CardContent>
</Card>
```

### Display Components
- **Badge** - Label/tag component
- **Avatar** - User avatar
- **Alert** - Alert message
- **Alert Dialog** - Confirmation dialog
- **Progress** - Progress bar
- **Skeleton** - Loading skeleton

### Navigation Components
- **Button** - Primary button
- **Navigation Menu** - Top navigation
- **Breadcrumb** - Breadcrumb navigation
- **Pagination** - Page pagination
- **Menubar** - Menu bar
- **Dropdown Menu** - Dropdown menu
- **Context Menu** - Right-click context menu

### Data Components
- **Table** - Data table
- **Chart** - Chart visualization (Recharts integrated)
- **Scroll Area** - Scrollable area
- **Carousel** - Image carousel

---

## 🔌 Hooks

### `use-mobile` Hook
Detects apakah device adalah mobile

```typescript
import { useMobile } from '@/hooks/use-mobile'

export function MyComponent() {
  const isMobile = useMobile()

  return isMobile ? <MobileLayout /> : <DesktopLayout />
}
```

---

## 📚 Data Structure

### Services Data (`lib/data.ts`)
```typescript
interface Service {
  id: string
  name: string
  description: string
  image?: string
  price?: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'pagar-besi',
    name: 'Pagar Besi',
    description: 'Pagar berkualitas tinggi...',
    features: ['Desain modern', 'Tahan lama', '...'],
  },
  // ...
]
```

### Portfolio Data
```typescript
interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  date: string
  client?: string
}
```

### Testimonials Data
```typescript
interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  image?: string
  rating: number
}
```

---

## 🎯 Component Usage Patterns

### Pattern 1: List Component
```typescript
import ServiceCard from '@/components/ServiceCard'

export function ServicesList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map(service => (
        <ServiceCard
          key={service.id}
          {...service}
          onLearnMore={() => navigate(`/layanan/${service.id}`)}
        />
      ))}
    </div>
  )
}
```

### Pattern 2: Section with Title
```typescript
export function MySection() {
  return (
    <section className="py-12 px-4">
      <SectionEyebrow text="SECTION INTRO" />
      <h2 className="text-4xl font-bold mb-8">Section Title</h2>
      <ServicesList />
    </section>
  )
}
```

### Pattern 3: With Loading State
```typescript
export function DataDisplay() {
  const { data, isLoading, error } = useQuery(...)

  if (isLoading) return <Skeleton className="h-96" />
  if (error) return <Alert variant="destructive">{error.message}</Alert>

  return <Content data={data} />
}
```

### Pattern 4: Form Integration
```typescript
export function ContactPage() {
  const form = useForm({ resolver: zodResolver(schema) })

  return (
    <SiteLayout>
      <div className="py-12">
        <h1 className="text-4xl font-bold mb-8">Hubungi Kami</h1>
        <Form {...form}>
          {/* Form fields */}
          <Button type="submit">Kirim</Button>
        </Form>
      </div>
    </SiteLayout>
  )
}
```

---

## 🚀 Component Best Practices

### 1. Use TypeScript Interfaces
```typescript
interface Props {
  title: string
  onClick?: () => void
  children: React.ReactNode
}

const MyComponent: React.FC<Props> = ({ title, onClick, children }) => {
  return <div onClick={onClick}>{title}{children}</div>
}
```

### 2. Memoize When Needed
```typescript
import { memo } from 'react'

const ServiceCard = memo(function ServiceCard({ service }) {
  return <div>{service.name}</div>
})
```

### 3. Handle Loading States
```typescript
if (isLoading) return <Skeleton />
if (error) return <ErrorComponent error={error} />
if (!data) return <EmptyState />

return <Content data={data} />
```

### 4. Use Conditional Classes
```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  "base-styles p-4 rounded",
  isActive && "bg-primary text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
  {content}
</div>
```

### 5. Extract to Separate Component if Complex
```typescript
// Instead of 500+ line component, break into:
// - ListComponent
// - ItemComponent
// - FilterComponent
// - SortComponent

export function ComplexPage() {
  return (
    <div>
      <FilterComponent />
      <SortComponent />
      <ListComponent />
    </div>
  )
}
```

---

## 📊 Component Dependency Graph

```
SiteLayout (Main wrapper)
├── IndustrialNavbar (Header)
│   └── Navigation links
├── Content Area
│   ├── Reveal
│   │   └── SectionEyebrow
│   │   └── ServiceCard / PortfolioGallery / etc
│   ├── AnimatedCounter (in hero or stats)
│   ├── FAQAccordion
│   ├── TestimonialSlider
│   └── CTASection
├── Footer
└── WhatsAppCTA (Floating)

UI Components (Atomic)
├── Button
├── Card
├── Form / Input / Textarea
├── Dialog / Drawer
├── Tabs / Accordion
└── ... (30+ more)
```

---

## 🔄 Component Communication

### Props Drilling
```typescript
// Parent passes props to child
<Parent>
  <Child data={data} onAction={handleAction} />
</Parent>
```

### Context API (if needed in future)
```typescript
const ThemeContext = React.createContext()

<ThemeProvider>
  <App />
</ThemeProvider>

// Usage in component
const theme = useContext(ThemeContext)
```

### Route Context
```typescript
// Via TanStack Router context
const router = useRouter()
const { queryClient } = router.getRouteContext()
```

---

## ✨ Creating New Components

### Template
```typescript
// src/components/MyNewComponent.tsx
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface MyNewComponentProps {
  title: string
  description?: string
  onClick?: () => void
}

const MyNewComponent: FC<MyNewComponentProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
      <Button onClick={onClick}>Action</Button>
    </div>
  )
}

export default MyNewComponent
```

### Export & Use
```typescript
// Import in route
import MyNewComponent from '@/components/MyNewComponent'

// Use in page
<MyNewComponent
  title="My Component"
  description="Description"
  onClick={() => console.log('clicked')}
/>
```

---

**Last Updated:** May 22, 2026  
**Version:** 1.0.0

