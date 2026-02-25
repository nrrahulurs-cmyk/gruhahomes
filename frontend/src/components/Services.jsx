import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Home, Ruler, PaintBucket, Building2 } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Construction',
    desc: 'Custom-built homes designed to perfection. From luxury villas to modern apartments, we bring your dream home to life.',
    image: 'https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    icon: Ruler,
    title: 'Architectural Design',
    desc: 'Innovative architectural solutions that balance aesthetics with functionality. Our designs win awards and hearts.',
    image: 'https://images.unsplash.com/photo-1758448500596-ce0e0239f1be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtb2Rlcm4lMjBob21lJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tJTIwcHJlbWl1bXxlbnwwfHx8fDE3NzIwNDkxMTh8MA&ixlib=rb-4.1.0&q=85',
  },
  {
    icon: PaintBucket,
    title: 'Interior Finishing',
    desc: 'Premium interior solutions with handpicked materials and finishes that transform houses into stunning living spaces.',
    image: 'https://images.unsplash.com/photo-1760072513367-55182245e76c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBtb2Rlcm4lMjBob21lJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tJTIwcHJlbWl1bXxlbnwwfHx8fDE3NzIwNDkxMTh8MA&ixlib=rb-4.1.0&q=85',
  },
  {
    icon: Building2,
    title: 'Renovation & Remodeling',
    desc: 'Breathe new life into existing structures. Our renovation expertise ensures seamless transformation with minimal disruption.',
    image: 'https://images.unsplash.com/photo-1760072513442-9872656c1b07?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBob21lJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tJTIwcHJlbWl1bXxlbnwwfHx8fDE3NzIwNDkxMTh8MA&ixlib=rb-4.1.0&q=85',
  },
];

function TiltCard({ service, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [8, -8]);
  const rotateY = useTransform(x, [-150, 150], [-8, 8]);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleMouse = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const Icon = service.icon;

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <motion.div
        ref={cardRef}
        data-testid={`service-card-${index}`}
        className="relative overflow-hidden group cursor-pointer h-[400px]"
        style={{
          backgroundColor: 'var(--gruha-surface)',
          border: '1px solid rgba(255,255,255,0.05)',
          perspective: 800,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* BG Image */}
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,15,0.95) 40%, transparent 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
          <div className="w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: 'rgba(247,230,0,0.1)', border: '1px solid rgba(247,230,0,0.2)' }}>
            <Icon size={22} color="#F7E600" />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            {service.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--gruha-muted)' }}>
            {service.desc}
          </p>
          {/* Glow border on hover */}
          <div className="absolute inset-0 border border-transparent group-hover:border-[rgba(247,230,0,0.2)] transition-all duration-500 pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: '#F7E600' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-24 md:py-32" data-testid="services-section"
      style={{ backgroundColor: 'var(--gruha-surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div ref={ref} className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <TiltCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
