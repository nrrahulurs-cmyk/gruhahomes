import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUp, Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from 'lucide-react';
import axios from 'axios';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_ca17f502-0f39-4964-b8ed-efd95e4be7f8/artifacts/o2aj09u7_logo1.png";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Residential Construction',
  'Architectural Design',
  'Interior Finishing',
  'Renovation & Remodeling',
];

const socials = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Youtube, href: '#' },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await axios.post(`${API}/newsletter`, { email });
      setSubbed(true);
      setEmail('');
    } catch {
      // silent fail
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative pt-20 pb-8" data-testid="footer-section"
      style={{ backgroundColor: '#0B0B0F', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Newsletter bar */}
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 mb-16"
          style={{ backgroundColor: '#14141A', border: '1px solid rgba(255,255,255,0.05)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: '#FAFAFA' }}>
              Newsletter To Get Updated
            </h3>
            <p className="text-sm" style={{ color: '#A1A1AA' }}>Stay informed about our latest projects and offers.</p>
          </div>
          {subbed ? (
            <div data-testid="newsletter-success" className="flex items-center gap-2 text-sm font-medium" style={{ color: '#F7E600' }}>
              <Send size={16} /> Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex w-full md:w-auto" data-testid="newsletter-form">
              <input
                data-testid="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-3 text-sm outline-none w-full md:w-72"
                style={{ backgroundColor: '#1C1C24', color: '#FAFAFA', border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <button
                data-testid="newsletter-submit"
                type="submit"
                className="px-6 py-3 text-sm font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-2"
                style={{ backgroundColor: '#F7E600', color: '#000' }}
              >
                <Send size={14} /> Subscribe
              </button>
            </form>
          )}
        </motion.div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src={LOGO_URL} alt="Gruha Homes" className="h-14 mb-4" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#A1A1AA' }}>
              Building premium homes in Bengaluru since 2010. Where quality meets craftsmanship, 
              and dreams find an address.
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a key={i} href={s.href} data-testid={`social-${i}`}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Icon size={14} color="#A1A1AA" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: '#F7E600' }}>Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm transition-colors hover:text-[#F7E600]"
                    style={{ color: '#A1A1AA' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: '#F7E600' }}>Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(service => (
                <li key={service}>
                  <span className="text-sm" style={{ color: '#A1A1AA' }}>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: '#F7E600' }}>Contact</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" color="#F7E600" />
                <span className="text-sm" style={{ color: '#A1A1AA' }}>
                  177/A, 7th Cross Rd, 2nd Block,<br />2nd Stage, Naagarabhavi,<br />Bengaluru - 560072
                </span>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="flex-shrink-0" color="#F7E600" />
                <div className="text-sm" style={{ color: '#A1A1AA' }}>
                  <a href="tel:+918073104017" className="hover:text-[#F7E600] transition-colors block">+91 8073104017</a>
                  <a href="tel:+919980864573" className="hover:text-[#F7E600] transition-colors block">+91 9980864573</a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="flex-shrink-0" color="#F7E600" />
                <div className="text-sm" style={{ color: '#A1A1AA' }}>
                  <a href="mailto:contact@gruhahomes.com" className="hover:text-[#F7E600] transition-colors block">contact@gruhahomes.com</a>
                  <a href="mailto:support@gruhahomes.com" className="hover:text-[#F7E600] transition-colors block">support@gruhahomes.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs" style={{ color: '#A1A1AA' }}>
            &copy; {new Date().getFullYear()} <span style={{ color: '#F7E600' }}>GruhaHomes</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: '#A1A1AA' }}>
            <a href="#footer" className="hover:text-[#F7E600] transition-colors">Terms of Service</a>
            <a href="#footer" className="hover:text-[#F7E600] transition-colors">Privacy Policy</a>
            <a href="#footer" className="hover:text-[#F7E600] transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        data-testid="back-to-top"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center z-40 transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: '#F7E600' }}
      >
        <ArrowUp size={20} color="#000" />
      </button>
    </footer>
  );
}
