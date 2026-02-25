import { useState, useEffect, useRef, useCallback } from 'react';
import "@/App.css";
import Lenis from 'lenis';
import LogoIntro from '@/components/LogoIntro';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import Team from '@/components/Team';
import Videos from '@/components/Videos';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('gruha-theme') || 'dark');
  const cursorRef = useRef(null);
  const rafId = useRef(null);

  // Lenis smooth scroll
  useEffect(() => {
    if (!introComplete) return;
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    function raf(time) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }
    rafId.current = requestAnimationFrame(raf);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lenis.destroy();
    };
  }, [introComplete]);

  // Theme toggle
  useEffect(() => {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('gruha-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(prev => prev === 'dark' ? 'light' : 'dark'), []);

  // Cursor glow - throttled with rAF
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let mx = 0, my = 0, ticking = false;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          cursor.style.left = mx + 'px';
          cursor.style.top = my + 'px';
          ticking = false;
        });
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="app-root" data-testid="app-root" data-theme={theme}>
      {!introComplete && <LogoIntro onComplete={() => setIntroComplete(true)} />}

      {theme === 'dark' && <div ref={cursorRef} className="cursor-glow hidden md:block" />}

      {introComplete && <ScrollProgress />}
      {introComplete && <Navbar theme={theme} toggleTheme={toggleTheme} />}

      {introComplete && (
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Pricing />
          <Process />
          <Team />
          <Videos />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      )}
    </div>
  );
}

export default App;
