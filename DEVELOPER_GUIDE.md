# Developer Quick Reference

Panduan cepat untuk developer dalam mengerjakan task sehari-hari pada Welding Works Studio.

---

## 🚀 Quick Start Commands

```bash
# Setup awal
npm install                    # Install dependencies
npm run dev                    # Start dev server (http://localhost:5173)

# Development
npm run lint                   # Check code quality
npm run format                 # Auto-fix formatting

# Production
npm run build                  # Build untuk production
npm run preview               # Preview build lokal
npm run build:dev             # Build untuk development

# Deployment
wrangler deploy               # Deploy ke Cloudflare Workers
```

---

## 📁 Common File Patterns

### Membuat Page Baru

**Step 1:** Buat file route
```typescript
// src/routes/halaman-baru.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/halaman-baru')({
  component: HalamaBaru,
})

function HalamaBaru() {
  return (
    <div className="min-h-screen px-4 py-12">
      <h1 className="text-4xl font-bold">Halaman Baru</h1>
      {/* Content */}
    </div>
  )
}
```

**Step 2:** Link di navbar/menu
```typescript
// Tambah di navigation atau link components
<Link to="/halaman-baru">Halaman Baru</Link>
```

### Membuat Component

```typescript
// src/components/MyCard.tsx
import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface MyCardProps {
  title: string
  description: string
}

const MyCard: FC<MyCardProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <Button className="mt-4">Learn More</Button>
      </CardContent>
    </Card>
  )
}

export default MyCard
```

---

## 🎨 Tailwind CSS Snippets

### Responsive Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* items */}
</div>
```

### Flexbox Container
```typescript
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
  {/* items */}
</div>
```

### Card Layout
```typescript
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold mb-4">Title</h2>
  <p className="text-gray-600">Content</p>
</div>
```

### Button Variants
```typescript
// Primary
<Button>Click me</Button>

// Secondary
<Button variant="secondary">Click me</Button>

// Outline
<Button variant="outline">Click me</Button>

// Ghost
<Button variant="ghost">Click me</Button>

// Full width
<Button className="w-full">Click me</Button>

// With icon
<Button>
  <Icon className="mr-2" />
  Click me
</Button>
```

### Spacing Utilities
```typescript
// Margin
className="m-4"      // margin: 1rem
className="mx-4"     // margin-left & right
className="my-4"     // margin-top & bottom

// Padding
className="p-4"      // padding: 1rem
className="px-4"     // padding-left & right
className="py-4"     // padding-top & bottom

// Gap
className="gap-4"    // gap between flex/grid items
```

### Text Utilities
```typescript
// Size
className="text-sm"      // 14px
className="text-base"    // 16px
className="text-lg"      // 18px
className="text-xl"      // 20px
className="text-2xl"     // 24px
className="text-4xl"     // 36px

// Weight
className="font-normal"  // 400
className="font-semibold" // 600
className="font-bold"    // 700

// Color
className="text-white"       // foreground
className="text-gray-600"    // muted text
className="text-red-500"     // error
className="text-green-500"   // success

// Alignment
className="text-center"
className="text-right"
className="text-left"
```

### Color System
```typescript
// Primary colors
className="bg-primary"           // Primary color
className="text-primary"         // Primary text

// Secondary
className="bg-secondary"
className="text-secondary"

// Utility
className="bg-background"        // Page background
className="text-foreground"      // Default text
className="bg-muted"             // Muted background
className="text-muted-foreground" // Muted text

// States
className="bg-destructive"       // Error/danger
className="text-success"         // Success
```

---

## 📝 Form Examples

### Simple Form
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Min 8 characters'),
})

type FormData = z.infer<typeof schema>

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    // Send to server
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Email</label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          {...register('password')}
          type="password"
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      <Button type="submit" className="w-full">Login</Button>
    </form>
  )
}
```

### Form with UI Components
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
})

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Send</Button>
      </form>
    </Form>
  )
}
```

---

## 🔄 Data Fetching Patterns

### Using useQuery
```typescript
import { useQuery } from '@tanstack/react-query'

export function ServicesList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch('/api/services')
      return res.json()
    },
    staleTime: 5 * 60 * 1000, // Cache 5 minutes
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading services</div>

  return (
    <div>
      {data?.map(service => (
        <div key={service.id}>{service.name}</div>
      ))}
    </div>
  )
}
```

### Route Loader Pattern
```typescript
// routes/layanan.$slug.tsx
export const Route = createFileRoute('/layanan/$slug')({
  loader: async ({ params, context }) => {
    return await context.queryClient.fetchQuery({
      queryKey: ['service', params.slug],
      queryFn: () => fetch(`/api/services/${params.slug}`).then(r => r.json()),
    })
  },
  component: ServiceDetail,
})

function ServiceDetail() {
  const service = Route.useLoaderData()
  return <div>{service.name}</div>
}
```

### Fetch with Error Handling
```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
```

---

## 🎨 Animation Examples

### Fade In on Mount
```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Slide and Fade
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  Content
</motion.div>
```

### Hover Animation
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Scroll-triggered Animation
```typescript
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ScrollAnimation() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <motion.div ref={ref} style={{ opacity }}>
      Animated on scroll
    </motion.div>
  )
}
```

---

## 🔗 Routing Examples

### Link Navigation
```typescript
import { Link } from '@tanstack/react-router'

<Link to="/about">About Us</Link>
<Link to="/layanan/$slug" params={{ slug: 'welding' }}>
  Welding Service
</Link>
```

### Programmatic Navigation
```typescript
import { useNavigate } from '@tanstack/react-router'

const navigate = useNavigate()

// After form submission
navigate({ to: '/success' })

// With params
navigate({ to: '/layanan/$slug', params: { slug: 'welding' } })
```

### Access Route Params
```typescript
import { useParams } from '@tanstack/react-router'

export function ServiceDetail() {
  const { slug } = useParams({ from: '/layanan/$slug' })
  return <div>Service: {slug}</div>
}
```

### Access Search Params
```typescript
import { useSearch } from '@tanstack/react-router'

export function FilteredList() {
  const { category, sort } = useSearch({ from: '/services' })
  return <div>Category: {category}, Sort: {sort}</div>
}
```

---

## 🏛️ UI Components Quick Examples

### Card
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Dialog
```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Accordion
```typescript
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1?</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2?</AccordionTrigger>
    <AccordionContent>Answer 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Tabs
```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Badge
```typescript
import { Badge } from '@/components/ui/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

---

## 🔌 Conditional Rendering

### Inline Conditional
```typescript
{isActive && <div>Active</div>}
{isLoading ? <Skeleton /> : <Content />}
```

### Switch Statement
```typescript
const getContent = () => {
  switch (status) {
    case 'loading':
      return <Skeleton />
    case 'error':
      return <Error />
    case 'success':
      return <Success />
    default:
      return null
  }
}

return <div>{getContent()}</div>
```

### Ternary with Multiple Conditions
```typescript
{isLoading && !error ? (
  <Skeleton />
) : error ? (
  <Error message={error} />
) : (
  <Content data={data} />
)}
```

---

## 📊 Common Patterns

### Loading Skeleton
```typescript
import { Skeleton } from '@/components/ui/skeleton'

<div className="space-y-2">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>
```

### Empty State
```typescript
function EmptyState() {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold">No items found</h3>
      <p className="text-gray-600">Try adjusting your filters</p>
    </div>
  )
}
```

### Error State
```typescript
function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 className="font-semibold text-red-800">Error</h3>
      <p className="text-red-700">{error}</p>
      <button onClick={onRetry} className="mt-2 text-red-600 underline">
        Try again
      </button>
    </div>
  )
}
```

---

## 🎯 Import Aliases

```typescript
// Instead of:
import { Button } from '../../../components/ui/button'

// Use:
import { Button } from '@/components/ui/button'

// @ adalah alias untuk src/
// @/ maps to src/
```

---

## 🔍 Debugging Tips

### Console Logging
```typescript
console.log('Value:', value)           // Basic log
console.table(array)                   // Table format
console.time('timer')                  // Start timer
console.timeEnd('timer')               // End timer
console.group('Group Name')            // Group logs
console.error('Error message')         // Error log
```

### React DevTools
- Install React DevTools extension
- Check component hierarchy
- View props and state
- Profile performance

### React Query DevTools
```typescript
// Already included in project
// Access at http://localhost:5173/__TanStackRouterDevtools
```

---

## 🚨 Common Errors & Solutions

### "Cannot find module '@/...'"
```typescript
// Check tsconfig.json paths configuration
// Should have: "@/*": ["./src/*"]
```

### Build fails with "Routes not found"
```bash
# Make sure route file exists in src/routes/
# Route tree auto-generates on dev server start
npm run dev
```

### Form validation not working
```typescript
// Check:
// 1. Zod schema defined correctly
// 2. zodResolver passed to useForm
// 3. Field names match schema
```

### Styles not applying
```typescript
// Check:
// 1. Tailwind CSS is compiled (npm run dev running)
// 2. Class names are spelled correctly
// 3. Check browser dev tools for computed styles
```

---

## 📚 Useful Resources

- [React Docs](https://react.dev)
- [TanStack Router](https://tanstack.com/router/latest)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI Docs](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com)
- [Zod Docs](https://zod.dev)

---

## ✨ Pro Tips

1. **Use TypeScript** - Let TS catch errors early
2. **Component composition** - Build small, focused components
3. **Reuse UI components** - Don't create custom when UI components exist
4. **Cache strategically** - Use staleTime and gcTime wisely
5. **Error boundaries** - Handle errors gracefully
6. **Performance monitoring** - Use React DevTools Profiler
7. **Keyboard shortcuts** - Learn VS Code shortcuts for speed
8. **Code formatting** - Run `npm run format` before commits

---

**Last Updated:** May 22, 2026  
**Version:** 1.0.0

