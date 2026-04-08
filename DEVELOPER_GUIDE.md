# 👨‍💻 Developer Quick Reference Guide

## File Structure Overview

```
PROJECT ROOT: d:\musab_projects\Roop_Veda\

NEW FILES CREATED:
├── app/
│   ├── about/
│   │   └── page.tsx                    (✨ NEW - 230 lines)
│   ├── privacy/
│   │   └── page.tsx                    (✨ NEW - 150 lines)
│   ├── terms/
│   │   └── page.tsx                    (✨ NEW - 180 lines)
│   ├── refund/
│   │   └── page.tsx                    (✨ NEW - 140 lines)
│   └── contact/
│       └── page.tsx                    (✨ NEW - 200 lines)
│
├── components/
│   └── marketing/
│       └── landing-page.tsx            (🔄 UPDATED - 254 lines)
│
└── DOCUMENTATION FILES:
    ├── PAGES_CREATED.md                (Project overview)
    ├── WEBSITE_DOCUMENTATION.md        (Complete documentation)
    └── SITEMAP_GUIDE.md                (Navigation structure)
```

---

## 🎨 Component Template Pattern

All new pages follow this structure:

```tsx
import Link from "next/link";
import { IconName } from "lucide-react";

export default function PageName() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        
        {/* Header */}
        <header className="surface px-6 py-6 sm:px-10">
          <p className="eyebrow">CATEGORY</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
            Page Title
          </h1>
        </header>

        {/* Sections */}
        <section className="surface px-6 py-8 sm:px-10">
          {/* Content */}
        </section>

        {/* Footer */}
        <footer className="border-t border-forest/10 pt-8 text-center text-sm text-forest/65">
          <p>&copy; 2026 CREATIVE TECHNOLOGIES. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
```

---

## 🎯 Key CSS Classes Used

### Layout Classes
```css
/* Container & Spacing */
min-h-screen              /* Full viewport height */
px-4 sm:px-6 lg:px-8     /* Responsive padding */
pb-16 pt-6                /* Vertical padding */
gap-8 md:gap-10          /* Flex/grid gaps */

/* Max Width */
max-w-4xl                 /* Legal pages max width */
max-w-7xl                 /* Home page max width */

/* Grid Layouts */
grid gap-8               /* Base grid */
lg:grid-cols-2          /* 2 columns on large screens */
md:grid-cols-2          /* 2 columns on medium screens */
md:grid-cols-3          /* 3 columns on medium screens */
```

### Component Classes
```css
/* Surface Card */
.surface                  /* Main card class */
rounded-[28px]           /* Surface border radius */
border border-white/60   /* Card border */
bg-white/80              /* Glass effect background */
backdrop-blur            /* Blur effect */

/* Text Styling */
.eyebrow                 /* Small caps, tracked, ember color */
font-display             /* Fraunces font */
text-forest              /* Main text color */
text-forest/75           /* Secondary text (75% opacity) */
text-forest/65           /* Tertiary text (65% opacity) */

/* Buttons */
rounded-full             /* Circular corners */
px-6 py-3               /* Button padding */
shadow-glow             /* Custom shadow glow */
hover:-translate-y-0.5  /* Hover animation */
hover:bg-forest/90      /* Hover state */
```

### Gradients
```css
bg-gradient-to-br       /* Top-left to bottom-right */
from-ember/5 to-forest/5 /* Color gradient */
bg-hero-radial          /* Custom gradient (defined in tailwind)*/
```

---

## 📝 Text Styling Hierarchy

```tsx
// Eyebrow - Label text
<p className="eyebrow">SECTION LABEL</p>

// H1 - Main headings
<h1 className="font-display text-4xl leading-tight text-forest sm:text-5xl">
  Main Heading
</h1>

// H2 - Section headings  
<h2 className="text-2xl font-semibold text-forest mb-4">
  Section Heading
</h2>

// H3 - Subsection headings
<h3 className="text-lg font-semibold text-forest mb-2">
  Subsection
</h3>

// Body text
<p className="text-forest/75 leading-7">
  Body paragraph text
</p>

// Small text
<p className="text-sm text-forest/65">
  Small text
</p>
```

---

## 🔗 Link Patterns

### Internal Links
```tsx
// To page route
<Link href="/about" className="...">About</Link>

// To home page anchor
<Link href="/#about" className="...">About Section</Link>

// Button style link
<Link
  href="/quiz"
  className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-forest/90"
>
  Start Quiz
  <ArrowRight className="ml-2 h-4 w-4" />
</Link>
```

### External Links
```tsx
// Email link
<a href="mailto:Ameerlunera@gmail.com" className="...">
  Email Support
</a>

// Regular link
<a href="https://example.com" className="...">
  External Site
</a>
```

---

## 🎨 Grid Patterns

### 2-Column Layout
```tsx
<div className="grid gap-8 lg:grid-cols-2">
  <div>Left column</div>
  <div>Right column</div>
</div>
```

### 3-Column Layout
```tsx
<div className="grid gap-8 md:grid-cols-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Feature Card Grid
```tsx
<div className="grid gap-6 md:grid-cols-2">
  {features.map((feature) => (
    <div key={feature.title} className="surface px-6 py-6">
      {/* Card content */}
    </div>
  ))}
</div>
```

---

## 🎨 Icon Usage

All icons from `lucide-react`:

```tsx
import {
  ArrowRight,      // CTA arrows
  Shield,          // Disclaimers
  Smile,           // Benefits
  Zap,            // Speed/Instant
  Users,          // Community
  Leaf,           // Natural
  Mail,           // Email
  MapPin,         // Location
  Clock,          // Time/Hours
  AlertCircle     // Warnings
} from "lucide-react";

// Usage
<Shield className="h-5 w-5 text-ember" />
<Icon className="h-{4|5|6} w-{4|5|6} text-{ember|forest|red-700}" />
```

---

## 📱 Responsive Breakpoints

```tsx
/* Tailwind Breakpoints */
sm:     640px   /* Small - tablets */
md:     768px   /* Medium - larger tablets */
lg:     1024px  /* Large - desktops */
xl:     1280px  /* Extra large */
2xl:    1536px  /* 2X large */

/* Usage Pattern */
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

---

## 🎯 Common Component Patterns

### Card with Icon
```tsx
<div className="rounded-[22px] border border-ember/20 bg-ember/5 p-8">
  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ember/10 text-ember">
    <IconComponent className="h-5 w-5" />
  </div>
  <h3 className="mt-5 text-lg font-semibold text-forest">{title}</h3>
  <p className="mt-3 text-sm leading-7 text-forest/70">{description}</p>
</div>
```

### Button Styles
```tsx
/* Primary Button */
<button className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-forest/90">
  Primary Button
</button>

/* Secondary Button */
<button className="rounded-full border border-forest/15 px-6 py-3 text-sm font-semibold text-forest transition hover:bg-white/70">
  Secondary Button
</button>
```

### Section Header
```tsx
<div className="mb-12">
  <p className="eyebrow">CATEGORY</p>
  <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
    Section Title
  </h2>
</div>
```

---

## 🔄 Data Mapping Example

### For Lists of Sections
```tsx
{[
  {
    number: "1",
    title: "Section Title",
    content: "Section content here"
  },
  // ... more items
].map((section) => (
  <section key={section.number} className="surface px-6 py-8 sm:px-10">
    <h2 className="text-2xl font-semibold text-forest mb-4">
      {section.number}. {section.title}
    </h2>
    <p className="text-forest/75 leading-7">{section.content}</p>
  </section>
))}
```

---

## 🚀 Performance Tips

1. **Use Next.js Link** for internal navigation (no page reload)
2. **Lazy load images** with `next/image`
3. **Minimize CSS** - Use Tailwind classes only
4. **Optimize fonts** - Already configured in `next.config.mjs`
5. **Code split** - Each page is a separate route

---

## 🔐 Security Considerations

1. **No sensitive data** in JSX (client-side)
2. **Contact info** is public (on Contact page)
3. **Email links** use `mailto:` (no direct sending)
4. **External links** should have `rel="noopener noreferrer"` for security
5. **Form submissions** handled by backend APIs

---

## 📊 File Sizes (Approximate)

```
about/page.tsx        ~8 KB
privacy/page.tsx      ~6 KB
terms/page.tsx        ~7 KB
refund/page.tsx       ~5 KB
contact/page.tsx      ~8 KB
landing-page.tsx      ~10 KB
─────────────────
Total new code       ~44 KB
```

---

## 🛠️ Common Edits

### Add a New Section
```tsx
<section className="surface px-6 py-8 sm:px-10">
  <p className="eyebrow">LABEL</p>
  <h2 className="mt-4 font-display text-3xl text-forest">Title</h2>
  <p className="mt-6 text-forest/75 leading-8">Content here</p>
</section>
```

### Add a Feature Card
```tsx
<div className="rounded-[22px] border border-amber-200 bg-amber-50 p-8">
  <h4 className="text-xl font-semibold text-amber-900 mb-4">Title</h4>
  <p className="text-amber-900/75">Description</p>
</div>
```

### Update Footer Link
```tsx
// In footer component
<Link href="/new-page" className="text-forest/75 hover:text-forest transition">
  New Page Link
</Link>
```

---

## 🧪 Testing Checklist

- [ ] All pages load without errors
- [ ] Links work correctly (internal and external)
- [ ] Responsive on mobile (< 640px)
- [ ] Responsive on tablet (640px - 1024px)
- [ ] Responsive on desktop (> 1024px)
- [ ] Colors display correctly
- [ ] Typography is readable
- [ ] Icons render properly
- [ ] Buttons are clickable
- [ ] Footer appears on all pages
- [ ] No console errors
- [ ] No broken images
- [ ] Email links work
- [ ] Smooth scrolling

---

## 📚 Resources

- **Tailwind Docs**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev/

---

## 🆘 Troubleshooting

### Page not loading
- Check file path matches route
- Verify `export default` function
- Check for TypeScript errors

### Styling not applying
- Verify class names match Tailwind config
- Check `tailwind.config.ts` for custom colors
- Clear cache: `npm run build` then `npm run dev`

### Links not working
- Verify path starts with `/`
- For anchors, use `href="/#section-id"`
- For external, use full URL with `https://`

### Icons not showing
- Verify import from `lucide-react`
- Check component name capitalization
- Verify className includes `h-X w-X`

---

**Happy coding! 🚀**

For more details, refer to:
- `WEBSITE_DOCUMENTATION.md` - Complete feature overview
- `SITEMAP_GUIDE.md` - Navigation structure
- `PAGES_CREATED.md` - Quick overview of pages
