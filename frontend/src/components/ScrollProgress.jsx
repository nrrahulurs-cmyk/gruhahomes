import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (!barRef.current) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      barRef.current.style.width = `${pct}%`;
      ticking = false;
    };
    const handler = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
      <div
        ref={barRef}
        data-testid="scroll-progress"
        className="h-full"
        style={{ backgroundColor: '#F7E600', width: '0%', willChange: 'width' }}
      />
    </div>
  );
}
