import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Anil Urs',
    role: 'Founder & CEO',
    bio: '20+ years in construction. Visionary leader who founded Gruha Homes with a mission to redefine residential living in Bengaluru.',
    image: 'https://images.unsplash.com/photo-1622705538993-6070f10a3b26?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBJbmRpYW4lMjBhcmNoaXRlY3QlMjBlbmdpbmVlciUyMHBvcnRyYWl0JTIwYnVzaW5lc3N8ZW58MHx8fHwxNzcyMDQ5MTI3fDA&ixlib=rb-4.1.0&q=85',
  },
  {
    name: 'Kiran',
    role: 'Lead Architect',
    bio: 'Award-winning architect with expertise in sustainable design. Kiran brings creative vision to every Gruha Homes project.',
    image: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBJbmRpYW4lMjBhcmNoaXRlY3QlMjBlbmdpbmVlciUyMHBvcnRyYWl0JTIwYnVzaW5lc3N8ZW58MHx8fHwxNzcyMDQ5MTI3fDA&ixlib=rb-4.1.0&q=85',
  },
  {
    name: 'Prithivi',
    role: 'Project Manager',
    bio: 'Engineering excellence personified. Prithivi ensures every project is delivered on time, on budget, and beyond expectations.',
    image: 'https://images.unsplash.com/photo-1694871420357-d3d8bc67a5de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBJbmRpYW4lMjBhcmNoaXRlY3QlMjBlbmdpbmVlciUyMHBvcnRyYWl0JTIwYnVzaW5lc3N8ZW58MHx8fHwxNzcyMDQ5MTI3fDA&ixlib=rb-4.1.0&q=85',
  },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="relative py-24 md:py-32" data-testid="team-section"
      style={{ backgroundColor: 'var(--gruha-surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Meet The Builders
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--gruha-muted)' }}>
            Passionate professionals dedicated to turning your dream home into reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              data-testid={`team-member-${i}`}
              className="group text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Circular portrait */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 transition-all duration-500 group-hover:border-[#F7E600] group-hover:scale-105"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Hover overlay with social */}
                <div className="absolute inset-2 rounded-full flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}>
                  <div className="flex gap-3">
                    <a href="#team" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: 'rgba(247,230,0,0.2)' }}>
                      <Linkedin size={14} color="#F7E600" />
                    </a>
                    <a href="#team" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: 'rgba(247,230,0,0.2)' }}>
                      <Mail size={14} color="#F7E600" />
                    </a>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{member.name}</h3>
              <span className="text-xs font-bold uppercase tracking-wider block mb-3" style={{ color: '#F7E600' }}>
                {member.role}
              </span>
              <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--gruha-muted)' }}>
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
