---
name: frontend-ui-ux
description: Style guidelines, responsive layout rules, centering strategies, and premium animations for high-end SaaS frontend design.
---

# Frontend UI/UX Design System Guidelines

Follow these guidelines to design, implement, and maintain premium, production-grade frontend interfaces that feel like elite SaaS products (e.g., Stripe, Linear, Vercel).

## 1. Centering & Viewport Spanning (Ultra-wide Support)
- **Problem**: Monolithic layouts can float to the left or squish into a fraction of the screen on ultra-wide monitors (21:9 or 32:9).
- **Rule**: Every section container must occupy full width and constrain its contents to a centered maximum width.
- **Tailwind Classes**:
  - Container element: `w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` (limits layout width to 1152px and centers it in the viewport).
  - Main wrapper tag: `<main className="w-full flex-grow flex flex-col items-center relative z-10">` (centers restricted-width block children).
  - Fixed elements (e.g., Navbar): Always specify `left-0 right-0 w-full` to force full viewport coverage before placing maximum-width centered children inside.

## 2. Spacing & Spacing Utilities
- **Problem**: Legacy margins (`space-x-`, `space-y-`) are brittle and easily overridden or broken in complex layouts.
- **Rule**: Use flexbox or CSS grid **gap** properties (`gap-`, `gap-x-`, `gap-y-`) for spacing adjacent elements.
- **Examples**:
  - Horizontal items: `flex items-center gap-4 md:gap-6`
  - Vertical layout stack: `flex flex-col gap-6 md:gap-12`

## 3. Premium Aesthetics (Dark Mode First)
- **Palette**: Dark primary background (`#030712`) paired with slate-gray card containers (`#0b0f19`). Use high-contrast slate-white text (`#f3f4f6`) for maximum legibility.
- **Glow & Gradients**: Use radial gradient backgrounds or abstract glowing blur containers (`filter: blur(80px)`) to add depth.
- **Glassmorphism**: Render card sections with semi-transparent, blurred backdrops:
  - `background: rgba(11, 15, 25, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05);`

## 4. Typography
- Use strict typographic scales with tight tracking on headings:
  - Titles: `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight`
  - Subtitles: `text-lg text-gray-400 font-light`
  - Technical labels: `text-xs font-mono tracking-widest uppercase text-accent-android`

## 5. Micro-interactions & Framer Motion
- Animations must be subtle, fast, and professional.
- Transition Settings:
  - Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo) or `ease-in-out`
  - Duration: `150ms` to `300ms` max
- Interactive elements (cards, buttons) should scale slightly (`scale: 1.01`) or illuminate borders on hover.
