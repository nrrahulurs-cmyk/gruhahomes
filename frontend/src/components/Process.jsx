import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, FileText, HardHat, Ruler, Home as HomeIcon, Key } from 'lucide-react';

const steps = [
  { icon: MessageSquare, title: 'Consultation', desc: 'Free initial meeting to understand your vision, budget, and requirements.' },
  { icon: FileText, title: 'Design & Planning', desc: 'Architectural design, 3D visualization, and detailed project planning.' },
  { icon: Ruler, title: 'Approvals', desc: 'RERA registration, BBMP approvals, and all legal documentation.' },
  { icon: HardHat, title: 'Construction', desc: 'Quality construction with regular updates and milestone tracking.' },
  { icon: HomeIcon, title: 'Interior Finishing', desc: 'Premium finishing touches, fixtures, and quality inspection.' },
  { icon: Key, title: 'Handover', desc: 'Final walkthrough, documentation, and keys to your dream home.' },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section id="process" ref={containerRef} className="relative py-24 md:py-32 overflow-hidden" data-testid="process-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div ref={ref} className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Our Process
          </h2>
        </motion.div>

        {/* Horizontal scrolling timeline */}
        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <motion.div className="h-full" style={{ width: lineWidth, backgroundColor: '#F7E600' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  data-testid={`process-step-${i}`}
                  className="relative text-center md:text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Step number circle */}
                  <div className="relative inline-flex items-center justify-center w-[120px] h-[120px] mx-auto md:mx-0 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 transition-colors duration-300"
                      style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                    <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: 'rgba(247,230,0,0.1)', border: '1px solid rgba(247,230,0,0.2)' }}>
                      <Icon size={24} color="#F7E600" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-7 h-7 flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: '#F7E600', color: '#000' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--gruha-muted)' }}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
