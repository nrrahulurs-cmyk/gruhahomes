import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ABOUT_IMG = "https://images.unsplash.com/photo-1770381142493-075344e6fc9b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob21lJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tJTIwcHJlbWl1bXxlbnwwfHx8fDE3NzIwNDkxMTh8MA&ixlib=rb-4.1.0&q=85";

const highlights = [
  'RERA Registered Builder',
  'ISO 9001:2015 Certified',
  'Award-Winning Designs',
  'Eco-Friendly Construction',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden" data-testid="about-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image side */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src={ABOUT_IMG}
                alt="Luxury living room"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Yellow accent bar */}
              <div className="absolute bottom-0 left-0 w-1 h-full" style={{ backgroundColor: '#F7E600' }} />
            </div>
            {/* Experience badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 md:right-8 md:bottom-8 px-6 py-4 z-10"
              style={{ backgroundColor: '#F7E600' }}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
            >
              <div className="text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#000' }}>15+</div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#000' }}>Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
              About Gruha Homes
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}>
              Crafting Homes<br />That Inspire
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--gruha-muted)' }}>
              Founded in Bengaluru, Gruha Homes has been at the forefront of residential construction 
              for over 15 years. We blend cutting-edge architectural design with time-tested construction 
              techniques to create homes that are not just structures, but living experiences.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--gruha-muted)' }}>
              Our commitment to quality, transparency, and client satisfaction has earned us the trust 
              of over 500 families across Bengaluru. Every project we undertake is a testament to our 
              passion for creating spaces where memories are made.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <CheckCircle2 size={18} color="#F7E600" />
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <button
              data-testid="about-learn-more"
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#F7E600', color: '#000' }}
            >
              Our Services
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
