import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Essential',
    price: '1,899',
    unit: '/sq.ft',
    desc: 'Perfect for budget-conscious homeowners who want quality construction.',
    features: [
      'Standard architectural design',
      'Quality cement & steel (JSW/Ultratech)',
      'Basic electrical & plumbing',
      'Vitrified tile flooring',
      'Standard paint finish',
      'BBMP plan approval assistance',
      '1 year structural warranty',
    ],
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '2,499',
    unit: '/sq.ft',
    desc: 'Our most popular choice. Premium materials with stunning finishes.',
    features: [
      'Custom architectural design',
      'Premium cement & TMT steel',
      'Branded electrical (Havells/Anchor)',
      'Italian marble/granite flooring',
      'Asian Paints Royale finish',
      'Complete RERA & BBMP approvals',
      'Modular kitchen included',
      '5 year comprehensive warranty',
      'Home automation ready',
    ],
    highlighted: true,
  },
  {
    name: 'Luxury',
    price: '3,499',
    unit: '/sq.ft',
    desc: 'Bespoke luxury homes with world-class materials and finishes.',
    features: [
      'Bespoke architectural design',
      'Imported premium materials',
      'Schneider electrical fittings',
      'Imported marble flooring',
      'Designer wall finishes',
      'All approvals & legal support',
      'Full smart home integration',
      'Landscaping & exterior design',
      'Lifetime structural warranty',
      'Dedicated project manager',
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" className="relative py-24 md:py-32" data-testid="pricing-section"
      style={{ backgroundColor: 'var(--gruha-surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Investment Plans
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--gruha-muted)' }}>
            Transparent pricing with no hidden costs. Choose the plan that fits your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              data-testid={`pricing-card-${plan.name.toLowerCase()}`}
              className={`relative p-8 transition-all duration-500 ${plan.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
              style={{
                backgroundColor: plan.highlighted ? '#F7E600' : 'var(--gruha-elevated)',
                border: plan.highlighted ? 'none' : '1px solid rgba(255,255,255,0.05)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: '#000', color: '#F7E600' }}>
                  <Star size={12} /> Most Popular
                </div>
              )}

              <h3 className="text-lg font-bold uppercase tracking-wider mb-2"
                style={{ fontFamily: 'Syne, sans-serif', color: plan.highlighted ? '#000' : 'inherit' }}>
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xs" style={{ color: plan.highlighted ? '#000' : 'var(--gruha-muted)' }}>INR</span>
                <span className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: plan.highlighted ? '#000' : '#F7E600' }}>
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: plan.highlighted ? 'rgba(0,0,0,0.6)' : 'var(--gruha-muted)' }}>
                  {plan.unit}
                </span>
              </div>

              <p className="text-sm mb-6 leading-relaxed" style={{ color: plan.highlighted ? 'rgba(0,0,0,0.7)' : 'var(--gruha-muted)' }}>
                {plan.desc}
              </p>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check size={16} className="mt-0.5 flex-shrink-0"
                      style={{ color: plan.highlighted ? '#000' : '#F7E600' }} />
                    <span className="text-sm" style={{ color: plan.highlighted ? 'rgba(0,0,0,0.8)' : 'inherit' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{
                  backgroundColor: plan.highlighted ? '#000' : '#F7E600',
                  color: plan.highlighted ? '#F7E600' : '#000',
                }}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
