# Gruha Homes - Premium Architectural Website

## Original Problem Statement
Build a fully immersive, award-winning, premium architectural website for Gruha Homes (residential construction company in Bengaluru) using React + Tailwind + Framer Motion + GSAP + Lenis.

**Tagline:** "A Place To Call Home"

## Tech Stack
- **Frontend:** React 19, Tailwind CSS, Framer Motion v12, GSAP, Lenis (smooth scroll)
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Architecture:** SPA with REST API backend

## Color System
- Primary: #F7E600, Dark BG: #0B0B0F, Surface: #14141A, Elevated: #1C1C24, Gold: #D4AF37, Light BG: #F9FAFB

## Core Requirements
- Dark mode default with light/dark toggle
- Logo intro animation
- Fullscreen cinematic hero with parallax and particles
- Sections: About, Services, Projects (masonry), Pricing, Process, Team, Videos, Testimonials, Contact
- Micro-interactions: fade-up reveals, hover lifts, glow effects, scroll progress, cursor glow
- Contact form & newsletter stored in MongoDB

## Implemented Features (Completed)
- [x] All 11 sections with animations and micro-interactions
- [x] FastAPI backend with /api/contact and /api/newsletter endpoints
- [x] MongoDB integration for form data persistence
- [x] Lenis smooth scrolling
- [x] Light/dark theme toggle with localStorage
- [x] Logo intro with skip button
- [x] Responsive design with mobile menu
- [x] YouTube video modal integration
- [x] Project category filtering

## Performance Optimization (Completed - Feb 2026)
Fixed severe scroll lag while preserving all visual effects:
- Replaced all Framer Motion `whileHover` with pure CSS `hover-lift-*` classes (zero JS overhead)
- Wrapped all static section components in `React.memo` (prevents re-render cascade on theme toggle)
- Fixed cursor glow to use `transform: translate3d()` instead of `left/top` (eliminates layout thrashing)
- Optimized Navbar scroll listener to only update state when crossing 50px threshold
- Added `decoding="async"` to all lazy-loaded images (off-main-thread decoding)
- CSS-only particles and bounce animations (no JS overhead)
- `content-visibility: auto` for below-fold sections
- rAF-throttled scroll listeners throughout

## DB Schema
- **contacts:** { name, email, phone?, service?, message, created_at }
- **newsletter_subscriptions:** { email, created_at }

## API Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/contacts` - List contacts
- `GET /api/newsletter` - List subscriptions

## Backlog
- P1: Image optimization (WebP, responsive srcset)
- P1: Mobile performance tuning
- P2: Lazy-load below-fold sections with React.lazy/Suspense
