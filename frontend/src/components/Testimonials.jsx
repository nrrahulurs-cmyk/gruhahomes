import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'Villa Owner, Whitefield',
    text: 'Gruha Homes built our dream villa exactly as we envisioned. The attention to detail, quality of materials, and professionalism was exceptional. We moved in right on schedule.',
    rating: 5,
  },
  {
    name: 'Priya Menon',
    role: 'Apartment Owner, Koramangala',
    text: 'From design to handover, the entire experience was seamless. Anil and his team kept us informed at every stage. The final result exceeded our expectations by miles.',
    rating: 5,
  },
  {
    name: 'Dr. Vikram Patel',
    role: 'Villa Owner, HSR Layout',
    text: 'What sets Gruha Homes apart is their honesty and transparency. No hidden costs, no delays. They delivered a world-class home at a competitive price. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Lakshmi Devi',
    role: 'Duplex Owner, Jayanagar',
    text: 'We were nervous about the construction process, but Gruha Homes made it so easy. The project manager was always available, and the quality is truly premium.',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="relative py-24 md:py-32" data-testid="testimonials-section"
      style={{ backgroundColor: 'var(--gruha-surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              data-testid={`testimonial-card-${i}`}
              className="relative p-8 glass glow-border group hover-lift-4"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Quote icon */}
              <Quote size={32} className="mb-4 opacity-20" style={{ color: '#F7E600' }} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#F7E600" color="#F7E600" />
                ))}
              </div>

              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--gruha-muted)' }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: 'rgba(247,230,0,0.1)', color: '#F7E600', fontFamily: 'Syne, sans-serif' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: 'var(--gruha-muted)' }}>{t.role}</div>
                </div>
              </div>

              {/* Floating animation - CSS only, no JS */}
              <div className="absolute -top-2 -right-2 w-20 h-20 rounded-full pointer-events-none animate-float"
                style={{ background: 'radial-gradient(circle, rgba(247,230,0,0.05) 0%, transparent 70%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
