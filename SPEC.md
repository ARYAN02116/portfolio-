# Aryan Raj - Professional Portfolio Website

## Concept & Vision

A sophisticated, modern portfolio that showcases Aryan Raj's journey as a Frontend Developer. The design embodies professionalism with a tech-forward aesthetic—clean lines, purposeful animations, and a commanding presence that leaves a lasting impression on recruiters and potential employers.

## Design Language

### Aesthetic Direction
Corporate tech elegance meets creative flair. Think Bloomberg Terminal meets Apple's design sensibility—bold, confident, and effortlessly sophisticated.

### Color Palette
**Light Mode:**
- Primary: `#2563EB` (Royal Blue)
- Primary Dark: `#1D4ED8`
- Secondary: `#3B82F6` (Sky Blue)
- Accent: `#06B6D4` (Cyan)
- Background: `#FFFFFF`
- Surface: `#F8FAFC`
- Text Primary: `#0F172A`
- Text Secondary: `#475569`
- Border: `#E2E8F0`

**Dark Mode:**
- Primary: `#3B82F6`
- Primary Light: `#60A5FA`
- Secondary: `#06B6D4`
- Accent: `#22D3EE`
- Background: `#0F172A`
- Surface: `#1E293B`
- Text Primary: `#F8FAFC`
- Text Secondary: `#94A3B8`
- Border: `#334155`

### Typography
- Headings: Inter (700, 600) - Modern, professional, excellent readability
- Body: Inter (400, 500) - Clean and versatile
- Code/Tech elements: JetBrains Mono - Developer authenticity

### Spatial System
- Base unit: 4px
- Section padding: 80px (desktop), 48px (mobile)
- Card padding: 24px
- Gap between elements: 16px, 24px, 32px
- Max content width: 1200px

### Motion Philosophy
- Entrance animations: Fade up with stagger (opacity 0→1, translateY 20px→0, 600ms ease-out)
- Hover states: Scale 1.02, shadow elevation, 200ms ease
- Section transitions: Smooth scroll with 800ms duration
- Typing effect: 100ms per character with cursor blink
- Progress bar: Real-time scroll tracking with smooth width transition

## Layout & Structure

### Navigation
- Fixed top navbar with backdrop blur
- Logo/Name on left, nav links on right
- Dark mode toggle with sun/moon icon
- Mobile: Hamburger menu with slide-in drawer
- Active section highlighting

### Sections Flow
1. **Hero** - Full viewport, centered content, gradient background mesh
2. **About** - Two-column layout (image placeholder + text)
3. **Skills** - Grid of skill cards with progress indicators
4. **Experience** - Timeline layout with cards
5. **Projects** - Card grid with hover reveal
6. **Education** - Clean timeline
7. **Contact** - Split layout (form + contact info)
8. **Footer** - Minimal with social links

### Responsive Strategy
- Desktop: 1200px max-width, multi-column layouts
- Tablet (768px): 2-column grids, adjusted spacing
- Mobile (480px): Single column, stacked elements, larger touch targets

## Features & Interactions

### Hero Section
- Animated typing effect cycling through titles
- Gradient animated background
- Floating decorative elements
- CTA buttons with ripple effect on click
- Scroll indicator animation

### Navigation
- Smooth scroll to sections
- Scroll progress bar at top
- Back-to-top button (appears after 300px scroll)
- Navbar background opacity changes on scroll

### Skills Section
- Skill cards with icon and proficiency bar
- Hover reveals skill details
- Category grouping (Languages, Backend, Tools)

### Projects Section
- Project cards with image placeholders
- Tech stack tags
- Hover overlay with project details
- External links to GitHub

### Contact Form
- Real-time validation
- Success/error states
- Social links with hover effects

### Dark Mode
- Toggle with smooth transition (300ms)
- Persists in localStorage
- Respects system preference initially

## Component Inventory

### Button
- Variants: Primary (filled), Secondary (outlined), Ghost
- States: Default, Hover (lift + shadow), Active (pressed), Disabled (opacity 50%)
- Sizes: Small, Medium, Large

### Card
- Default: White/dark surface, subtle border, rounded-xl
- Hover: Elevated shadow, slight scale
- Active: Border highlight

### Skill Badge
- Icon + name + progress bar
- Hover: Progress bar animation fills

### Timeline Item
- Dot indicator, connecting line
- Content card with date badge
- Alternating sides on desktop

### Form Input
- Default: Border, placeholder
- Focus: Blue border, label float
- Error: Red border, error message
- Success: Green border, checkmark

### Social Icon
- Circular container
- Hover: Background fill, icon color change

## Technical Approach

### Stack
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations (or CSS animations)
- Lucide React for icons

### Architecture
```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Section.tsx
├── hooks/
│   └── useScrollProgress.ts
├── App.tsx
├── main.tsx
└── index.css
```

### Performance
- Lazy load sections
- Optimized images
- Minimal bundle size
- Fast Time to Interactive

### SEO
- Semantic HTML structure
- Meta tags for social sharing
- Proper heading hierarchy
- Alt text for images
