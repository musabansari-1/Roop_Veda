# Landing Page - Developer Quick Reference

## File Location
```
d:\musab_projects\Roop_Veda\components\marketing\landing-page.tsx
```

## Quick Start

### Import in Your Page
```tsx
import { LandingPage } from "@/components/marketing/landing-page";

export default function Home() {
  return <LandingPage />;
}
```

## Component Structure

### Exports
```tsx
export function LandingPage() {
  // Main landing page component
  // Contains all sections below
}
```

### Sub-Components
```tsx
function FAQItem({ item, index }) {
  // Interactive accordion component for FAQ
  // Props: item (object), index (number)
  // Returns: Expandable FAQ item with smooth animations
}
```

## Data Arrays

### 1. Features Array
```tsx
const features = [
  {
    title: string,
    description: string,
    icon: LucideIcon
  }
]
// Used in: Hero Section (right column)
// Count: 4 items
// Access: .map((feature) => ...)
```

### 2. Benefits Array
```tsx
const benefits = [
  {
    title: string,
    description: string,
    icon: LucideIcon
  }
]
// Used in: "How Face Yoga Transforms You" section
// Count: 4 items
```

### 3. Transformations Array
```tsx
const transformations = [
  {
    title: string,
    beforeImage: string (URL),
    highlight: string
  }
]
// Used in: "Real Women, Real Transformations" section
// Count: 3 items
```

### 4. Testimonials Array
```tsx
const testimonials = [
  {
    name: string,
    location: string,
    rating: number,
    title: string,
    quote: string
  }
]
// Used in: "Loved by Users Worldwide" section
// Count: 6 items
```

### 5. Plans Array
```tsx
const plans = [
  {
    name: string,
    duration: string,
    originalPrice: number,
    price: number,
    perDay: number,
    popular: boolean,
    features: string[]
  }
]
// Used in: "Unlock Your Natural Glow" (Pricing) section
// Count: 3 items
// Note: popular: true creates highlighted styling
```

### 6. FAQs Array
```tsx
const faqs = [
  {
    question: string,
    answer: string
  }
]
// Used in: "Important Questions Answered" section
// Count: 5 items
// Interactive: Click to expand/collapse
```

## Sections & Components

### 1. Header
```tsx
<header className="surface flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
  // Branding, nav links, CTA button
</header>
```
**Props:** None (uses hardcoded content)

### 2. Hero Section
```tsx
<section className="grid gap-8 lg:grid-cols-2">
  // Left: Text + CTA
  // Right: Feature cards (uses features array)
</section>
```

### 3. Benefits Section (How Face Yoga Transforms You)
```tsx
<section>
  // Renders 4 benefit cards with icons
  // Uses: benefits array
  // Grid: 1 col mobile → 4 cols desktop
</section>
```

### 4. Transformations Section
```tsx
<section>
  // Renders 3 transformation cards
  // Uses: transformations array
  // Grid: 1 col mobile → 3 cols desktop
</section>
```

### 5. Testimonials Section
```tsx
<section className="surface px-6 py-12 sm:px-10">
  // Renders 6 testimonial cards
  // Uses: testimonials array
  // Grid: 1 col mobile → 3 cols desktop
  // Shows: Rating stars, quote, name, location
</section>
```

### 6. Pricing Section
```tsx
<section>
  // Renders 3 plan cards
  // Uses: plans array
  // Popular plan: Highlighted (ring + scale)
  // Features: Checkmark list for each plan
</section>
```

### 7. Package Includes Section
```tsx
<section className="surface px-6 py-12">
  // 4 package component cards
  // Static content with icons
  // Grid: 2 cols tablet → 4 cols desktop
</section>
```

### 8. FAQ Section
```tsx
<section>
  // Interactive accordion
  // Uses: faqs array
  // Component: FAQItem (handles state)
  // Features: Smooth expand/collapse, icon rotation
</section>
```

### 9. About Section
```tsx
<section id="about" className="surface px-6 py-12">
  // Multi-part: Foundation, Mission, Offer, Why Choose, Approach
  // Includes: Important Disclaimer alert box
  // Styling: Various backgrounds and highlights
</section>
```

### 10. Final CTA Section
```tsx
<section className="surface bg-hero-radial px-6 py-10">
  // Centered content
  // Heading + Description + CTA button
</section>
```

### 11. Footer
```tsx
<footer className="border-t border-forest/10 pt-10">
  // 3-column grid:
  //   1. Company Info
  //   2. Quick Links
  //   3. Support Links
  // Copyright notice
</footer>
```

## Common Tailwind Classes Used

### Layout
```
grid, flex, flex-col, gap-*, px-*, py-*, p-*
sm:, md:, lg: (responsive prefixes)
max-w-*, min-h-*, h-*, w-*
```

### Typography
```
font-display, font-semibold, font-bold
text-*, leading-*
eyebrow (custom), text-forest, text-forest/75, text-forest/70, etc
```

### Styling
```
surface (custom), bg-hero-radial (custom), rounded-[18px], rounded-[22px], rounded-full
border, border-forest/15, border-forest/20
shadow-glow (custom)
```

### Colors
```
forest (primary, green)
ember (accent, orange)
white, gray shades with /10, /15, /30, /60, /70, /75
```

### Effects
```
hover:bg-*, hover:text-*, transition
scale-*, rotate-180
-translate-y-0.5
ring-*, ring-ember
```

## Lucide Icons Used

```tsx
import { 
  ArrowRight,      // CTAs, navigation
  Shield,          // Disclaimer
  Smile,           // Feature: Guided Programs
  Zap,             // Feature: Instant Access
  Users,           // Feature: For Everyone
  Leaf,            // Feature: Natural Approach
  Clock,           // Benefit: Anti-aging
  Droplets,        // Benefit: Define & Sculpt
  Wind,            // Benefit: Release Tension
  Sparkles,        // Benefit: Glowing Complexion
  ChevronDown      // FAQ toggle
} from "lucide-react";
```

## State Management

### FAQ Accordion State
```tsx
const [isOpen, setIsOpen] = useState(false);
// Used in: FAQItem component
// Toggle on button click
// Affects: Styling and icon rotation
```

## Routing & Links

### Internal Navigation
```tsx
href="/quiz"           // Quiz flow
href="/about"          // Full About page
href="/privacy"        // Privacy policy
href="/terms"          // Terms & Conditions
href="/refund"         // Refund policy
href="/contact"        // Contact page
href="/#about"         // Anchor to About section
```

### External Links
```tsx
href="mailto:Ameerlunera@gmail.com"  // Email support
```

## How to Customize

### Update Pricing
```tsx
const plans = [
  {
    price: 199,           // Update this
    originalPrice: 299,   // And this
    perDay: 28,          // Calculate from: price / 7
  }
]
```

### Add Testimonials
```tsx
// Add to testimonials array:
{
  name: "Your Name",
  location: "City, Country",
  rating: 5,
  title: "Review Title",
  quote: "Your testimonial quote here..."
}
```

### Update FAQ
```tsx
// Add to faqs array:
{
  question: "Your question?",
  answer: "Detailed answer here..."
}
```

### Change Plan Highlight
```tsx
// Set popular: true on the plan you want highlighted:
{
  name: "Your Plan",
  popular: true,  // This makes it stand out
}
```

## Performance Tips

1. **Images:** Replace placeholder URLs with optimized images
2. **Icons:** Lucide React icons are tree-shakeable
3. **Rendering:** Arrays are small (5-6 items each), no optimization needed
4. **CSS:** Tailwind is purged in production, no unused CSS shipped

## Responsive Behavior

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero Grid | 1 col | 2 cols | 2 cols |
| Features | 1 col | 2 cols | 4 cols |
| Benefits | 1 col | 2 cols | 4 cols |
| Testimonials | 1 col | 2 cols | 3 cols |
| Plans | 1 col | 2 cols | 3 cols |
| Package | 1 col | 2 cols | 4 cols |
| Footer | 1 col | 2 cols | 3 cols |

## Common Customizations

### Change Primary Color (Forest Green)
1. Update `tailwind.config.ts`
2. Search for `text-forest` and replace with new class
3. Update `.surface` and other forest-colored elements

### Change Accent Color (Ember Orange)
1. Update `tailwind.config.ts`
2. Search for `text-ember` and `bg-ember`
3. Update badge, highlights, and CTA buttons

### Add New Section
```tsx
// Template:
<section className="px-6 py-12 sm:px-10">
  <div className="mb-12">
    <p className="eyebrow">LABEL</p>
    <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
      Section Title
    </h2>
  </div>
  
  {/* Content here */}
</section>
```

## TypeScript

### Component Type
```tsx
type LandingPage = React.FC<{}>
// No required props
```

### Feature Type (Optional)
```tsx
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
```

## Debugging

### Check FAQ State
```tsx
// In FAQItem component
console.log('isOpen:', isOpen);
```

### Verify Data Arrays
```tsx
// At top of component
console.log('Features:', features.length);
console.log('Plans:', plans.length);
console.log('Testimonials:', testimonials.length);
```

### Responsive Issues
```tsx
// Use browser DevTools to simulate breakpoints
// Test at: 375px, 768px, 1024px, 1440px
```

## Testing Checklist

- [ ] All links navigate correctly
- [ ] FAQ accordion opens/closes smoothly
- [ ] Plans scale properly on hover
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Images load (if added)
- [ ] Colors render correctly
- [ ] Text is readable on all backgrounds
- [ ] Buttons are clickable on touch devices

---

## Quick Copy-Paste Snippets

### Add a New Feature
```tsx
{
  title: "Feature Name",
  description: "Feature description here",
  icon: IconName  // From lucide-react
}
```

### Add a New Testimonial
```tsx
{
  name: "User Name",
  location: "City, Country",
  rating: 5,
  title: "Review Title",
  quote: "User's actual quote..."
}
```

### New FAQ Item
```tsx
{
  question: "Question here?",
  answer: "Answer here..."
}
```

---

**Document Version:** 1.0
**Last Updated:** April 8, 2026
**Component Status:** Production Ready ✅
