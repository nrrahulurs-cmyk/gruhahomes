import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Phone, Mail } from 'lucide-react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_ca17f502-0f39-4964-b8ed-efd95e4be7f8/artifacts/o2aj09u7_logo1.png";

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 text-xs py-2 px-6 flex justify-between items-center transition-all duration-300 ${scrolled ? 'opacity-0 -translate-y-full' : 'opacity-100'}`}
        style={{ backgroundColor: '#0B0B0F', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-6">
          <a href="tel:+918073104017" className="flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#F7E600] transition-colors" data-testid="topbar-phone">
            <Phone size={12} /> +91 8073104017
          </a>
          <a href="mailto:contact@gruhahomes.com" className="flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#F7E600] transition-colors" data-testid="topbar-email">
            <Mail size={12} /> contact@gruhahomes.com
          </a>
        </div>
        <span className="text-[#A1A1AA] hidden md:block">Bengaluru, Karnataka</span>
      </div>

      {/* Main nav */}
      <motion.nav
        data-testid="main-navbar"
        className={`fixed left-0 right-0 z-50 ${scrolled ? 'top-0' : 'top-8'}`}
        style={{ transition: 'top 0.5s ease' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={`mx-4 md:mx-8 rounded-none ${scrolled ? 'md:mx-0 md:rounded-none' : 'md:rounded-full'} ${scrolled ? 'glass shadow-lg' : ''}`}
          style={scrolled ? { transition: 'background-color 0.5s, border-radius 0.5s' } : { backgroundColor: 'transparent', transition: 'background-color 0.5s, border-radius 0.5s' }}>
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} data-testid="nav-logo">
              <img src={LOGO_URL} alt="Gruha Homes" className="h-10 md:h-12" />
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm font-medium tracking-wide hover:text-[#F7E600] transition-colors"
                  style={{ color: theme === 'dark' ? '#FAFAFA' : '#111827' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                data-testid="theme-toggle"
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:border-[#F7E600]"
                style={{
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                }}
              >
                {theme === 'dark' ? <Sun size={16} color="#F7E600" /> : <Moon size={16} color="#111827" />}
              </button>

              {/* CTA */}
              <button
                data-testid="nav-get-quote"
                onClick={() => scrollTo('#contact')}
                className="hidden md:block px-6 py-2.5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ backgroundColor: '#F7E600', color: '#000' }}
              >
                Get a Quote
              </button>

              {/* Mobile menu */}
              <button
                data-testid="mobile-menu-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: '#0B0B0F' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-semibold tracking-wide hover:text-[#F7E600] transition-colors"
                style={{ fontFamily: 'Syne, sans-serif', color: '#FAFAFA' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollTo('#contact')}
              className="mt-4 px-8 py-3 text-sm font-bold tracking-wider uppercase"
              style={{ backgroundColor: '#F7E600', color: '#000' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
