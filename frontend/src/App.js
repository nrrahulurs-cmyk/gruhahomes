import { useState, useEffect, useRef } from 'react';
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

  // Lenis smooth scroll
  useEffect(() => {
    if (!introComplete) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [introComplete]);

  // Theme toggle
  useEffect(() => {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('gruha-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Cursor glow
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const move = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="app-root" data-testid="app-root" data-theme={theme}>
      {/* Logo intro */}
      {!introComplete && <LogoIntro onComplete={() => setIntroComplete(true)} />}

      {/* Cursor glow (dark mode only) */}
      <div ref={cursorRef} className="cursor-glow hidden md:block" />

      {/* Scroll progress */}
      {introComplete && <ScrollProgress />}

      {/* Navigation */}
      {introComplete && <Navbar theme={theme} toggleTheme={toggleTheme} />}

      {/* Main content */}
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
