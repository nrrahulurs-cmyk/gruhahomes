import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, X } from 'lucide-react';

const videos = [
  {
    id: '4V4sHeaBXJw',
    title: 'Gruha Homes - Our Vision',
    desc: 'Discover the philosophy behind every Gruha Homes project.',
    thumbnail: `https://img.youtube.com/vi/4V4sHeaBXJw/maxresdefault.jpg`,
  },
  {
    id: 'bd_5D6QH03s',
    title: 'Premium Villa Construction',
    desc: 'A walkthrough of our latest premium villa project in Bengaluru.',
    thumbnail: `https://img.youtube.com/vi/bd_5D6QH03s/maxresdefault.jpg`,
  },
  {
    id: 'TGrJueMIUMk',
    title: 'Client Testimonial',
    desc: 'Hear from our satisfied homeowners about their Gruha experience.',
    thumbnail: `https://img.youtube.com/vi/TGrJueMIUMk/maxresdefault.jpg`,
  },
];

export default function Videos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="videos" className="relative py-24 md:py-32" data-testid="videos-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div ref={ref} className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: '#F7E600' }}>
            Videos
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Watch Our Story
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              data-testid={`video-card-${i}`}
              className="group relative overflow-hidden cursor-pointer hover-lift-5"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onClick={() => setActiveVideo(video.id)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,15,0.9) 0%, rgba(11,11,15,0.2) 50%)' }} />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 hover-scale-play"
                    style={{ backgroundColor: '#F7E600' }}
                  >
                    <Play size={24} color="#000" fill="#000" className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5" style={{ backgroundColor: 'var(--gruha-elevated)' }}>
                <h3 className="text-base font-semibold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {video.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--gruha-muted)' }}>{video.desc}</p>
              </div>

              {/* Glow border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[rgba(247,230,0,0.2)] transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActiveVideo(null)}
        >
          <button
            data-testid="close-video-modal"
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center transition-colors hover:text-[#F7E600]"
            onClick={() => setActiveVideo(null)}
            style={{ color: '#FAFAFA' }}
          >
            <X size={28} />
          </button>
          <div className="w-full max-w-4xl aspect-video mx-4" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="YouTube video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
