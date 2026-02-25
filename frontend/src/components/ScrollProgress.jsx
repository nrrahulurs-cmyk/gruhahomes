import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
      <motion.div
        data-testid="scroll-progress"
        className="h-full"
        style={{ backgroundColor: '#F7E600', width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </div>
  );
}
