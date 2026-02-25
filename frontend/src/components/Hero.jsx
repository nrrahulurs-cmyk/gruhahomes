import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen overflow-hidden" data-testid="hero-section">
      {/* Parallax BG */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src={HERO_BG}
          alt="Luxury modern home"
          className="w-full h-[120%] object-cover"
          loading="eager"
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(11,11,15,0.4) 0%, rgba(11,11,15,0.2) 40%, rgba(11,11,15,0.8) 100%)'
        }} />
      </motion.div>

      {/* Radial lighting */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(247,230,0,0.06) 0%, transparent 50%)' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: 'rgba(247,230,0,0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 50, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 max-w-[1400px] mx-auto"
        style={{ y: textY, opacity }}
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
            className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 glow-yellow"
            style={{ backgroundColor: '#F7E600', color: '#000' }}
          >
            Explore Projects
          </button>
          <button
            data-testid="hero-cta-showreel"
            onClick={() => document.querySelector('#videos')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-3.5 text-sm font-bold tracking-wider uppercase border transition-all duration-300 hover:border-[#F7E600] flex items-center gap-2"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FAFAFA' }}
          >
            <Play size={14} className="group-hover:text-[#F7E600] transition-colors" />
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#A1A1AA' }}>Scroll</span>
        <ArrowDown size={16} color="#F7E600" />
      </motion.div>
    </section>
  );
}
