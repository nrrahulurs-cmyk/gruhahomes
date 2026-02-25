import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';

const HERO_BG = "https://images.pexels.com/photos/16811460/pexels-photo-16811460.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const stats = [
  { value: 500, suffix: '+', label: 'Homes Built' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 50, suffix: 'Cr+', label: 'Project Value' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  // Lightweight parallax with raw scroll listener + transform
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${y * 0.4}px, 0)`;
          contentRef.current.style.opacity = Math.max(0, 1 - y / 600);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen overflow-hidden" data-testid="hero-section">
      {/* Parallax BG - hardware accelerated */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <img
          src={HERO_BG}
          alt="Luxury modern home"
          className="w-full h-[130%] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(11,11,15,0.6) 0%, rgba(11,11,15,0.5) 40%, rgba(11,11,15,0.92) 100%)'
        }} />
      </div>

      {/* Radial lighting - static, no animation */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(247,230,0,0.06) 0%, transparent 50%)' }} />

      {/* CSS-only particles (no JS overhead) */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle-dot"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 max-w-[1400px] mx-auto will-change-transform"
      >
        {/* Label */}
        <motion.span
          className="text-xs font-bold uppercase tracking-[0.3em] mb-4"
          style={{ color: '#F7E600' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Bengaluru&apos;s Premier Builder
        </motion.span>

        {/* Heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter mb-6"
          style={{ fontFamily: 'Syne, sans-serif', color: '#FAFAFA' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Building Dreams<br />
          <span style={{ color: '#F7E600' }}>Into Reality</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base md:text-lg max-w-xl mb-8 leading-relaxed"
          style={{ color: '#A1A1AA' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Premium residential construction in Bengaluru. Crafting architectural masterpieces 
          that blend modern design with timeless elegance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            data-testid="hero-cta-explore"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase hover:scale-105 active:scale-95 glow-yellow"
            style={{ backgroundColor: '#F7E600', color: '#000', transition: 'transform 0.2s' }}
          >
            Explore Projects
          </button>
          <button
            data-testid="hero-cta-showreel"
            onClick={() => document.querySelector('#videos')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-3.5 text-sm font-bold tracking-wider uppercase border flex items-center gap-2"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FAFAFA', transition: 'border-color 0.3s' }}
          >
            <Play size={14} className="group-hover:text-[#F7E600]" style={{ transition: 'color 0.3s' }} />
            Watch Showreel
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {stats.map((stat, i) => (
            <div key={i} data-testid={`hero-stat-${i}`}>
              <div className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#F7E600' }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs uppercase tracking-widest mt-1" style={{ color: '#A1A1AA' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - CSS animation only */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#A1A1AA' }}>Scroll</span>
        <ArrowDown size={16} color="#F7E600" />
      </div>
    </section>
  );
}
