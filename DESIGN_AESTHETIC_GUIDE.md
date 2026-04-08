# 🎨 Design & Aesthetic Guide

## Visual Design System

### Color Palette

```
PRIMARY COLORS:
├─ Forest (#19332D)
│  └─ Used for: Main text, headings, primary buttons
│  └─ Opacity variants: Forest, Forest/75, Forest/65, Forest/50
│
├─ Ember (#E86A33)
│  └─ Used for: Accents, highlights, eyebrow text, hover states
│  └─ Opacity variants: Ember, Ember/10, Ember/20
│
└─ Sand (#F6EBDD)
   └─ Used for: Page background, light areas
   └─ Creates: Warm, inviting feeling

SECONDARY COLORS:
├─ Gold (#F6B26B)
│  └─ Alternative accent
│
├─ Mist (#EEF4F1)
│  └─ Light backgrounds
│
└─ Ink (#1A1A1A)
   └─ Fallback text color
```

### Typography System

```
FRAUNCES (Display Font)
├─ H1: 48-64px, Bold
├─ H2: 32-48px, Semibold
├─ H3: 24-32px, Semibold
└─ H4: 20-24px, Semibold

SPACE GROTESK (Body Font)
├─ Body: 16-18px, Regular (leading: 8px)
├─ Small: 14px, Regular
└─ XSmall: 12px, Regular

EYEBROW (Label Text)
├─ Size: 12px
├─ Weight: Semibold (600)
├─ Letter Spacing: 0.28em
├─ Text Transform: Uppercase
└─ Color: Ember
```

### Spacing Scale

```
PADDING / MARGIN:
px-4   → 16px
px-6   → 24px
px-8   → 32px
px-10  → 40px

GAPS:
gap-3  → 12px (small)
gap-4  → 16px (medium)
gap-5  → 20px (medium-large)
gap-6  → 24px (large)
gap-8  → 32px (extra large)
gap-10 → 40px (massive)

VERTICAL:
pt-6   → 24px
pb-16  → 64px
mt-4   → 16px
mt-6   → 24px
mt-10  → 40px
```

### Rounded Corners

```
BORDER RADIUS:
rounded-full  → 9999px (perfect circles)
rounded-[28px] → 28px (main cards/surfaces)
rounded-[24px] → 24px (feature cards)
rounded-[22px] → 22px (sub-cards)
rounded-2xl   → 16px (button radius, icon containers)
```

### Shadows & Effects

```
SHADOWS:
shadow-glow
├─ Effect: 0 20px 60px rgba(232, 106, 51, 0.25)
├─ Used on: Primary buttons, CTAs
└─ Creates: Depth and elevation

BASE SHADOWS:
├─ shadow-sm
├─ shadow-md
├─ shadow-lg
└─ shadow-xl (use sparingly)

BACKDROPS:
backdrop-blur    → Blurred glass effect
bg-white/80      → Semi-transparent white
bg-white/60      → More transparent
bg-white/65      → Custom transparency
```

---

## 🎯 Component Aesthetics

### Surface Cards

```
CHARACTERISTICS:
├─ Rounded: 28px border radius
├─ Border: 1px solid white/60
├─ Background: white/80 with backdrop-blur
├─ Padding: 24-40px (6-10 on all sides)
├─ Shadow: Subtle drop shadow
└─ Hover: Slight lift effect

USAGE:
├─ Main page containers
├─ Feature cards
├─ Section containers
└─ Information boxes

VARIATIONS:
├─ With gradient background
├─ With colored borders
├─ With colored backgrounds
└─ With icons inside
```

### Buttons

```
PRIMARY BUTTONS:
├─ Background: Forest (#19332D)
├─ Text: White
├─ Padding: px-6 py-3 (text), px-8 py-4 (large)
├─ Border Radius: rounded-full
├─ Shadow: shadow-glow
└─ Hover: -translate-y-0.5, bg-forest/90

SECONDARY BUTTONS:
├─ Background: Transparent
├─ Border: 1px solid forest/15
├─ Text: Forest
├─ Padding: px-6 py-3
├─ Border Radius: rounded-full
└─ Hover: bg-white/70

ICON BUTTONS:
├─ Inline with text
├─ Margin left: ml-2
├─ Size: h-4 w-4 (small), h-5 w-5 (medium)
└─ Color: Inherits text color or Ember
```

### Feature Cards

```
STRUCTURE:
├─ Icon Container
│  ├─ Size: h-12 w-12
│  ├─ Background: Ember/10
│  ├─ Border Radius: rounded-2xl
│  ├─ Display: flex items-center justify-center
│  └─ Icon Size: h-5 w-5
│
├─ Title
│  ├─ Margin Top: mt-5
│  ├─ Font Size: text-lg
│  ├─ Weight: font-semibold
│  └─ Color: Forest
│
└─ Description
   ├─ Margin Top: mt-3
   ├─ Font Size: text-sm
   ├─ Line Height: leading-7
   └─ Color: Forest/70
```

---

## 🌈 Color Applications

### Usage by Element

```
HEADINGS (H1, H2, H3, H4)
├─ Color: Forest
├─ Font: Display (Fraunces)
└─ Line Height: Tight (1.1)

BODY TEXT
├─ Primary: Forest
├─ Secondary: Forest/75
├─ Tertiary: Forest/65
└─ Disabled: Forest/50

ACCENTS & HIGHLIGHTS
├─ Buttons: Ember or Forest
├─ Icons: Ember
├─ Eyebrows: Ember
└─ Links: Forest/75 (hover: Forest)

BACKGROUNDS
├─ Page: Sand
├─ Cards: White/80
├─ Gradients: Ember/5 to Forest/5
└─ Warning: Red/50 to Red/5

BORDERS
├─ Light: white/60
├─ Ember: Ember/20
├─ Forest: Forest/20
└─ Muted: Forest/10
```

---

## 📐 Layout Patterns

### Hero Section Pattern

```
GRID: 2 columns (lg:grid-cols-2)
├─ LEFT COLUMN (Main content)
│  ├─ Eyebrow text
│  ├─ Large H1 heading
│  ├─ Descriptive paragraph
│  ├─ Button group
│  └─ Optional: Feature grid
│
└─ RIGHT COLUMN (Secondary)
   ├─ Feature cards grid
   ├─ Icon cards
   └─ Information boxes

SPACING:
├─ Gap between columns: gap-8
├─ Padding inside cards: px-6 sm:px-10
├─ Margin between sections: mt-10 mb-8
└─ Vertical stacking: gap-4
```

### Section Pattern

```
STANDARD SECTION:
├─ Container: surface class
├─ Padding: px-6 py-8 sm:px-10
├─ Gap from previous: gap-8
├─ Internal structure:
│  ├─ Eyebrow label
│  ├─ H2 heading (mt-4)
│  ├─ Description (mt-6)
│  └─ Content/Subsections (mt-8)
│
└─ Background options:
   ├─ Plain white/80
   ├─ Gradient
   ├─ Colored overlay
   └─ Special styling for important info
```

### Grid Patterns

```
RESPONSIVE GRIDS:

2-Column (Desktop)
grid gap-8 lg:grid-cols-2

3-Column (Desktop)
grid gap-6 md:grid-cols-2 lg:grid-cols-3

Auto-fit (Flexible)
grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

List (Mobile-first)
grid gap-3 (stacks to single column)
```

---

## ✨ Animation & Interactions

### Hover Effects

```
BUTTONS:
├─ Transform: hover:-translate-y-0.5
├─ Duration: transition duration-200
├─ Color: hover:bg-forest/90
└─ Creates: Subtle lift effect

LINKS:
├─ Color: hover:text-forest
├─ Transition: transition
└─ Opacity: hover:opacity-80

CARDS:
├─ Transform: hover:shadow-lg (optional)
├─ Transition: transition duration-200
└─ Creates: Depth effect
```

### Transitions

```
SMOOTH TRANSITIONS:
├─ transition
├─ transition duration-200
├─ transition duration-300
└─ Uses: All hover/active states

EASING:
├─ Default: ease-in-out
├─ Smooth: ease
└─ Creates: Natural motion
```

---

## 🎬 Visual Hierarchy

### Importance Levels

```
LEVEL 1 (Most Important)
├─ H1 Headings
├─ Primary Buttons
├─ Ember accent colors
└─ Large feature cards

LEVEL 2 (Important)
├─ H2 Headings
├─ Eyebrow labels
├─ Secondary buttons
└─ Medium cards

LEVEL 3 (Supporting)
├─ H3/H4 Headings
├─ Body text (Forest)
├─ Icons and images
└─ Small cards

LEVEL 4 (Background)
├─ Secondary text (Forest/75)
├─ Borders
├─ Backgrounds
└─ Muted elements
```

### Visual Weight

```
MAXIMUM CONTRAST:
├─ Dark text (Forest) on light (Sand)
└─ Light text (White) on dark (Forest)

MEDIUM CONTRAST:
├─ Forest text on white/80
├─ Forest/75 text on sand
└─ Ember on white/80

LOW CONTRAST:
├─ Forest/50 on sand
├─ Forest/65 text (secondary)
└─ Borders (forest/10)
```

---

## 📱 Responsive Adjustments

### Mobile Design

```
< 640px:
├─ Single column layouts
├─ Full-width (px-4)
├─ Large touch targets (py-3, px-6)
├─ Stacked navigation
├─ Larger text (sm:text-4xl for H1)
└─ More spacing between elements
```

### Tablet Design

```
640px - 1024px:
├─ 2-column grids (md:grid-cols-2)
├─ Medium padding (px-6)
├─ Optimized spacing (gap-6)
├─ Flexible layouts
└─ Readable text sizes
```

### Desktop Design

```
> 1024px:
├─ Multi-column grids (lg:grid-cols-3+)
├─ Generous padding (px-10)
├─ Max-width containers (max-w-4xl)
├─ Optimal line lengths
└─ Full-featured layouts
```

---

## 🎨 Special Styling

### Gradient Backgrounds

```
HERO GRADIENT:
background-image:
  radial-gradient(circle at top left, 
    rgba(246, 178, 107, 0.28), 
    transparent 30%),
  radial-gradient(circle at bottom right, 
    rgba(25, 51, 45, 0.18), 
    transparent 38%)

EFFECT:
├─ Creates: Warm, natural feel
├─ Positioning: Subtle, not overwhelming
└─ Colors: Gold and Forest tints

USAGE:
├─ Hero sections
├─ CTA sections
├─ Feature backgrounds
└─ Emphasis areas
```

### Glass Morphism

```
COMPONENT:
├─ Background: rgba(255, 255, 255, 0.8)
├─ Backdrop: filter blur(10px)
├─ Border: 1px solid rgba(255, 255, 255, 0.6)
├─ Shadow: Subtle drop shadow
└─ Rounded: 28px corners

EFFECT:
├─ Frosted glass appearance
├─ Depth and layering
├─ Modern, contemporary feel
└─ Blends with background
```

---

## ✅ Design Best Practices Applied

1. **Consistency** - Same colors, fonts, spacing throughout
2. **Hierarchy** - Clear visual importance levels
3. **Contrast** - Readable text on all backgrounds
4. **Spacing** - Generous, breathing room
5. **Responsive** - Adapts to all screen sizes
6. **Accessibility** - Good color contrast, readable text
7. **Performance** - Optimized, minimal custom CSS
8. **Modern** - Contemporary aesthetic with elegance

---

## 🎯 Design Goals Achieved

✅ Professional appearance
✅ Modern aesthetic
✅ Warm and inviting
✅ Easy to navigate
✅ Accessible design
✅ Brand-consistent
✅ Fully responsive
✅ High performance
✅ Beautiful typography
✅ Pleasing color scheme

---

*Created with careful attention to visual design and user experience.*

**The site is now as beautiful as it is functional! 🌟**
