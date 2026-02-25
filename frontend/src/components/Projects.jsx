import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';

const categories = ['All', 'Villas', 'Apartments', 'Commercial', 'Interior'];

const projects = [
  {
    title: 'Serenity Villas',
    category: 'Villas',
    location: 'Whitefield, Bengaluru',
    area: '4500 sq.ft',
    image: 'https://images.pexels.com/photos/16811460/pexels-photo-16811460.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tall: true,
  },
  {
    title: 'Skyline Towers',
    category: 'Apartments',
    location: 'Koramangala, Bengaluru',
    area: '2200 sq.ft',
    image: 'https://images.unsplash.com/photo-1764686630524-2d399d87fa2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwY29uc3RydWN0aW9uJTIwYXJjaGl0ZWN0dXJlJTIwQmVuZ2FsdXJ1JTIwSW5kaWF8ZW58MHx8fHwxNzcyMDQ5MTA5fDA&ixlib=rb-4.1.0&q=85',
    tall: false,
  },
  {
    title: 'The Grand Residence',
    category: 'Villas',
    location: 'HSR Layout, Bengaluru',
    area: '6200 sq.ft',
    image: 'https://images.unsplash.com/photo-1676287734314-b7616c3c5e5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGFyY2hpdGVjdHVyZSUyMGV4dGVyaW9yJTIwZHVzayUyMHR3aWxpZ2h0JTIwYmVhdXRpZnVsfGVufDB8fHx8MTc3MjA0OTEzNXww&ixlib=rb-4.1.0&q=85',
    tall: false,
  },
  {
    title: 'Prestige Business Park',
    category: 'Commercial',
    location: 'Electronic City, Bengaluru',
    area: '15000 sq.ft',
    image: 'https://images.pexels.com/photos/17208244/pexels-photo-17208244.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    tall: true,
  },
  {
    title: 'Luxe Interiors Studio',
    category: 'Interior',
    location: 'Indiranagar, Bengaluru',
    area: '3200 sq.ft',
    image: 'https://images.unsplash.com/photo-1758448500596-ce0e0239f1be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBtb2Rlcm4lMjBob21lJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tJTIwcHJlbWl1bXxlbnwwfHx8fDE3NzIwNDkxMTh8MA&ixlib=rb-4.1.0&q=85',
    tall: false,
  },
  {
    title: 'Emerald Heights',
    category: 'Apartments',
    location: 'Jayanagar, Bengaluru',
    area: '1800 sq.ft',
    image: 'https://images.unsplash.com/photo-1701844279504-e3a974aaafb5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwY29uc3RydWN0aW9uJTIwYXJjaGl0ZWN0dXJlJTIwQmVuZ2FsdXJ1JTIwSW5kaWF8ZW58MHx8fHwxNzcyMDQ5MTA5fDA&ixlib=rb-4.1.0&q=85',
    tall: true,
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 md:py-32" data-testid="projects-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Our Projects
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveFilter(cat)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                style={{
                  backgroundColor: activeFilter === cat ? '#F7E600' : 'transparent',
                  color: activeFilter === cat ? '#000' : 'var(--gruha-muted)',
                  border: activeFilter === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                data-testid={`project-card-${i}`}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`relative overflow-hidden ${project.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: '#F7E600' }}>
                        {project.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: '#FAFAFA' }}>
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#A1A1AA' }}>
                          <MapPin size={12} /> {project.location}
                        </span>
                        <span className="text-xs" style={{ color: '#A1A1AA' }}>{project.area}</span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-4"
                      style={{ backgroundColor: '#F7E600' }}>
                      <ArrowUpRight size={18} color="#000" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
