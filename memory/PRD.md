# Gruha Homes - Premium Architectural Website PRD

## Original Problem Statement
Build a fully immersive, award-winning, premium architectural website for Gruha Homes using React + Tailwind + Framer Motion + GSAP + Lenis. Company: Gruha Homes, Residential construction company in Bengaluru. Tagline: "A Place To Call Home".

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Lenis (smooth scroll)
- **Backend**: FastAPI + MongoDB (Motor async driver)
- **Database**: MongoDB (contacts, newsletter collections)
- **Styling**: Custom CSS variables, Syne + Manrope fonts, dark/light theme

## User Personas
1. **Homebuyers** - Looking for premium residential construction in Bengaluru
2. **Real Estate Investors** - Evaluating construction quality and pricing
3. **Architecture Enthusiasts** - Exploring modern residential designs

## Core Requirements (Static)
- Single-page website with 12+ sections
- Logo intro animation with SVG stroke draw
- Fullscreen cinematic hero with parallax
- Dark mode default with light/dark toggle (localStorage persistence)
- Contact form with MongoDB storage
- Newsletter subscription
- YouTube video embeds
- Google Maps integration
- Responsive design

## What's Been Implemented (Feb 25, 2026)
- [x] Logo intro animation (fade in, glow pulse, skip button)
- [x] Floating glassmorphism navbar with theme toggle
- [x] Hero section (parallax, floating particles, stat counters, CTAs)
- [x] About section (split layout, hover zoom image, 15+ years badge)
- [x] Services section (4 interactive 3D tilt cards)
- [x] Projects section (masonry grid, animated category filter)
- [x] Pricing section (3 plan cards, premium highlighted)
- [x] Process section (6-step animated timeline)
- [x] Team section (circular portraits with hover reveal - Anil Urs, Kiran, Prithivi)
- [x] Videos section (3 YouTube cards with modal player)
- [x] Testimonials section (glass cards with floating animation)
- [x] Contact section (split layout + Google Map + floating label form)
- [x] Footer (newsletter bar, 4-column layout, social links)
- [x] Scroll progress indicator
- [x] Cursor glow effect (dark mode)
- [x] Backend: Contact form API (POST/GET /api/contact)
- [x] Backend: Newsletter API (POST/GET /api/newsletter)
- [x] Dark/Light theme toggle with localStorage persistence

## Prioritized Backlog
### P0 (Critical) - All done
### P1 (High)
- Add GSAP ScrollTrigger for more cinematic scroll animations
- Add Lottie animations for service icons
- SEO meta tags and Open Graph

### P2 (Medium)
- Blog/Articles section
- FAQ accordion section
- WhatsApp chat widget
- Project detail modal/page
- Admin dashboard for managing contacts/newsletter

### P3 (Nice to have)
- 3D model viewer for projects
- Virtual tour integration
- Progressive Web App (PWA)
- Multi-language support (Kannada/English)

## Next Tasks
1. Add GSAP ScrollTrigger animations for more cinematic reveals
2. SEO optimization with meta tags
3. WhatsApp chat widget integration
4. Project detail pages with image galleries
5. Admin panel for contact/newsletter management
