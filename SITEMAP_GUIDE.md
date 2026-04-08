# 🗺️ CREATIVE TECHNOLOGIES - Website Sitemap & Navigation Guide

## Website Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    HOMEPAGE (/)                              │
│  - Hero Section                                             │
│  - Features (4 cards)                                       │
│  - About Section (inline)                                  │
│  - CTA Section                                              │
│  - Footer with all links                                    │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
    _____|_____          _____|_____          _____|_____
   │           │        │           │        │           │
   ▼           ▼        ▼           ▼        ▼           ▼
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│About │  │Quiz  │  │Plans │  │Login │  │Reset │  │Setup │
│/about│  │/quiz │  │/plans│  │/login│  │/pass │  │/setup│
└──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘
   │
   ├─ Feature Highlights
   ├─ Mission & Vision
   ├─ What We Offer
   ├─ Why Choose Us
   ├─ Approach
   ├─ Disclaimer
   └─ CTA to Quiz

┌──────────────────────────────────────────────────────────┐
│             LEGAL & SUPPORT PAGES (Footer)                │
└──────────────────────────────────────────────────────────┘
  │                 │                   │                  │
  ▼                 ▼                   ▼                  ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Privacy     │ │  Terms &     │ │   Refund     │ │   Contact    │
│  Policy      │ │   Conditions │ │   Policy     │ │   Support    │
│ /privacy     │ │ /terms       │ │ /refund      │ │ /contact     │
│              │ │              │ │              │ │              │
│ 16 Sections  │ │ 19 Sections  │ │ 8 Sections   │ │ 6 Sections   │
│ - Data Use   │ │ - Services   │ │ - Refunds    │ │ - Company    │
│ - Collection │ │ - Payment    │ │ - Disputes   │ │ - Email      │
│ - Security   │ │ - Content    │ │ - Support    │ │ - Hours      │
│ - Rights     │ │ - IP Rights  │ │              │ │ - FAQ        │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

## 📍 Page Locations & File Structure

```
app/
├── page.tsx                    ← Home Page (/)
├── about/
│   └── page.tsx               ← About Page (/about)
├── privacy/
│   └── page.tsx               ← Privacy Policy (/privacy)
├── terms/
│   └── page.tsx               ← Terms & Conditions (/terms)
├── refund/
│   └── page.tsx               ← Refund Policy (/refund)
├── contact/
│   └── page.tsx               ← Contact Us (/contact)
├── quiz/                       ← Existing
│   └── page.tsx
├── plans/                      ← Existing
│   └── page.tsx
├── login/                      ← Existing
│   └── page.tsx
├── dashboard/                  ← Existing
│   └── page.tsx
└── api/                        ← Existing APIs
    ├── auth/
    ├── videos/
    ├── stripe/
    └── ...

components/
└── marketing/
    └── landing-page.tsx       ← Main landing component
```

---

## 🎯 User Journey

### New User Journey
```
Homepage (/)
    ↓
Reads About section OR clicks "Learn More"
    ↓
    ├─→ About Page (/about)
    │   ↓
    │   Reads full company info
    │   ↓
    │   Clicks "Take the Quiz"
    │   ↓
    │
    └─→ OR clicks "Start Quiz Now" directly
        ↓
    Quiz Page (/quiz)
        ↓
    Completes personalized quiz
        ↓
    Checkout (/checkout)
        ↓
    Payment (/api/checkout)
        ↓
    Dashboard (/dashboard)
```

### Support User Journey
```
Any Page
    ↓
Clicks "Contact Us" in Footer
    ↓
Contact Page (/contact)
    ↓
├─→ Reads FAQ
│   ↓
│   Question answered?
│   ├─→ Yes: Continue
│   └─→ No: Email support
│
└─→ Click Email Link
    ↓
Email Opens: Ameerlunera@gmail.com
```

### Legal User Journey
```
Footer of any page
    ↓
    ├─→ "Privacy Policy" (/privacy)
    │   ├─ How data is collected
    │   ├─ How data is used
    │   └─ User rights
    │
    ├─→ "Terms & Conditions" (/terms)
    │   ├─ Service overview
    │   ├─ Payment terms
    │   ├─ User conduct
    │   └─ Disclaimers
    │
    ├─→ "Refund Policy" (/refund)
    │   ├─ Non-refundable policy
    │   ├─ Exceptions
    │   └─ Dispute handling
    │
    └─→ "Contact Us" (/contact)
        ├─ Company details
        ├─ Support hours
        └─ FAQ
```

---

## 🔗 Internal Link Map

### Home Page Links
```
Header Navigation:
  - "About" → /#about (scroll to section)
  - "Start Quiz" → /quiz

Hero Section:
  - "Start Your Journey" → /quiz
  - "Learn More" → /#about

CTA Section:
  - "Start Quiz Now" → /quiz

Footer:
  - "About Us" → /#about
  - "Learn More" → /about
  - "Privacy Policy" → /privacy
  - "Terms & Conditions" → /terms
  - "Contact Us" → /contact
  - "Refund Policy" → /refund
  - "Email Support" → mailto:Ameerlunera@gmail.com
```

### About Page Links
```
Header:
  - Logo → / (implied)

Hero Section:
  - "Take the Quiz" → /quiz

Footer:
  - "About Us" → /#about
  - "Learn More" → /about
  - "Privacy Policy" → /privacy
  - "Terms & Conditions" → /terms
  - "Contact Us" → /contact
  - "Email Support" → mailto:Ameerlunera@gmail.com
```

### Legal Pages Links
```
All Legal Pages have same Footer:
  - "Privacy Policy" → /privacy
  - "Terms & Conditions" → /terms
  - "Refund Policy" → /refund
  - "Contact Us" → /contact
  - "Email Support" → mailto:Ameerlunera@gmail.com
```

### Contact Page Links
```
Email Link:
  - Direct mailto → Ameerlunera@gmail.com

CTA Section:
  - "Start Quiz" → /quiz

Footer:
  - Standard footer links
```

---

## 📊 Content Distribution

### Pages by Type
```
MARKETING PAGES (2):
├─ Home Page (/)
└─ About Page (/about)

LEGAL PAGES (3):
├─ Privacy Policy (/privacy)
├─ Terms & Conditions (/terms)
└─ Refund Policy (/refund)

SUPPORT PAGES (1):
└─ Contact Us (/contact)

EXISTING PAGES (preserved):
├─ Quiz (/quiz)
├─ Plans (/plans)
├─ Login (/login)
├─ Dashboard (/dashboard)
├─ Setup (/setup)
├─ Reset Password (/reset-password)
└─ Forgot Password (/forgot-password)

EXISTING APIs (preserved):
├─ Auth APIs
├─ Stripe APIs
├─ Video APIs
└─ More...
```

### Information by Section
```
COMPANY INFO:
├─ Home (/): Brief mention in header
├─ About (/about): Complete details
├─ Contact (/contact): Full address + GSTIN
└─ All Footers: Basic info

LEGAL INFO:
├─ Privacy (/privacy): Data handling
├─ Terms (/terms): User agreements
├─ Refund (/refund): Refund policy
└─ All Pages: Footer links

SUPPORT INFO:
├─ Contact (/contact): Hours, email, FAQ
└─ All Pages: Email in footer

DISCLAIMERS:
├─ Home (/): Important disclaimer
├─ About (/about): Health disclaimer
├─ Terms (/terms): Health disclaimer
└─ All Pages: Where relevant
```

---

## 🎨 Design Consistency

All pages use:
```
Colors:
  Primary Text: #19332D (Forest)
  Secondary Text: #19332D/75 (Forest with opacity)
  Accents: #E86A33 (Ember)
  Background: #F6EBDD (Sand)
  Cards: rgba(255,255,255,0.8) (Glass effect)

Typography:
  H1: Fraunces, 48-64px
  H2: Fraunces, 32-48px
  H3: Fraunces, 24-32px
  H4: Fraunces, 20-24px
  Body: Space Grotesk, 16-18px
  Small: Space Grotesk, 12-14px

Spacing:
  Section Gap: 32-64px
  Padding: 24-40px
  Component Gap: 16-24px

Borders & Shadows:
  Surface: rounded-[28px], border, backdrop-blur
  Cards: rounded-[22-24px], border
  Shadows: glow effect on buttons
```

---

## 📱 Mobile Responsiveness

### Breakpoints
```
Mobile (< 640px):
  - Single column layouts
  - Full-width containers
  - Stacked navigation
  - Large tap targets

Tablet (640px - 1024px):
  - 2-column grids
  - Flexible layouts
  - Grouped navigation
  - Medium containers

Desktop (> 1024px):
  - Multi-column grids
  - Max-width containers
  - Full navigation
  - Optimized spacing
```

---

## 🔐 Sensitive Info Protection

```
Public Pages:
  ✅ All legal pages
  ✅ Contact page (shows hours only)
  ✅ About page

Hidden Behind Auth:
  ✅ Dashboard
  ✅ User data
  ✅ Video content

External Services:
  ✅ Email via Ameerlunera@gmail.com
  ✅ Stripe payment processing
  ✅ Google Cloud Storage for videos
```

---

## 🚀 SEO Structure

### Meta Information (to be added)
```
Home Page (/):
  Title: "Face Yoga Programs | Transform Your Beauty"
  Description: "Discover guided face yoga programs..."
  Keywords: face yoga, skincare, beauty, wellness

About Page (/about):
  Title: "About CREATIVE TECHNOLOGIES"
  Description: "Learn about our mission..."
  Keywords: about, company, mission, face yoga

Legal Pages:
  Title: "[Policy Name] | CREATIVE TECHNOLOGIES"
  Description: "Our [policy] details..."
  No-index: No (allow indexing for transparency)

Contact Page:
  Title: "Contact Us | Support"
  Description: "Get in touch with our team..."
  Keywords: contact, support, help, email
```

### URL Structure
```
Logical & Hierarchy-based:
/           Home
/about      Extended about
/privacy    Privacy policy
/terms      Terms & conditions
/refund     Refund policy
/contact    Contact & support
/quiz       User journey begins
/plans      Purchase options
/dashboard  User dashboard
```

---

## 📈 Conversion Funnel

```
Discovery
    ↓
Home Page (/)
    ├─ Learn About
    │   ↓
    └─ About Page (/about)
        ↓
Consideration
    ├─ Read Details
    │   ↓
    ├─ Check Support (/contact)
    │   ↓
    ├─ Review Legal (/privacy, /terms)
    │   ↓
    └─ Check Refunds (/refund)
        ↓
Decision
    ↓
Quiz (/quiz)
    ↓
Conversion
    ↓
Payment & Dashboard

Post-Purchase Support
    ├─ Contact Us (/contact)
    ├─ FAQ Section
    └─ Email Support
```

---

## ✅ Checklist for Implementation

- [x] Home page created with all sections
- [x] About page created with detailed content
- [x] Privacy policy page created
- [x] Terms & conditions page created
- [x] Refund policy page created
- [x] Contact page created with FAQ
- [x] All pages use consistent styling
- [x] All pages responsive
- [x] All internal links functional
- [x] Footer consistent across pages
- [x] Company info included everywhere
- [x] Legal disclaimers present
- [x] Support information clear
- [x] CTAs to quiz present
- [x] Email links functional

---

**Website is fully structured and ready for launch! 🎉**

For any additions or changes, refer to the respective page files in the `app/` directory.
