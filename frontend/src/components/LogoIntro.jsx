import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_ca17f502-0f39-4964-b8ed-efd95e4be7f8/artifacts/o2aj09u7_logo1.png";

export default function LogoIntro({ onComplete }) {
  const [phase, setPhase] = useState('drawing');

  const finish = useCallback(() => {
    setPhase('exit');
    setTimeout(() => onComplete(), 800);
  }, [onComplete]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('glow'), 1200);
    const t2 = setTimeout(() => finish(), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [finish]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          data-testid="logo-intro"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: '#0B0B0F' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Animated frame lines */}
          <div className="relative">
            {/* Top frame line */}
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 h-[2px]"
              style={{ backgroundColor: '#F7E600' }}
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            {/* Top left vertical */}
            <motion.div
              className="absolute -top-8 h-[2px] w-0"
              style={{ left: 'calc(50% - 80px)', backgroundColor: '#F7E600', transformOrigin: 'top' }}
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="w-[2px] h-full" style={{ backgroundColor: '#F7E600' }} />
            </motion.div>
            {/* Top right vertical */}
            <motion.div
              className="absolute -top-8"
              style={{ left: 'calc(50% + 78px)' }}
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="w-[2px] h-full" style={{ backgroundColor: '#F7E600' }} />
            </motion.div>

            {/* Logo image */}
            <motion.img
              src={LOGO_URL}
              alt="Gruha Homes"
              className="w-64 md:w-80 relative z-10"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{
                opacity: phase === 'glow' ? 1 : 0.8,
                scale: 1,
                y: 0,
                filter: phase === 'glow' ? 'drop-shadow(0 0 30px rgba(247,230,0,0.4))' : 'none'
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Bottom frame line */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-[2px]"
              style={{ backgroundColor: '#F7E600' }}
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
            {/* Bottom verticals */}
            <motion.div
              className="absolute -bottom-8"
              style={{ left: 'calc(50% - 60px)' }}
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="w-[2px] h-full" style={{ backgroundColor: '#F7E600', transform: 'translateY(-100%)' }} />
            </motion.div>
            <motion.div
              className="absolute -bottom-8"
              style={{ left: 'calc(50% + 58px)' }}
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="w-[2px] h-full" style={{ backgroundColor: '#F7E600', transform: 'translateY(-100%)' }} />
            </motion.div>
          </div>

          {/* Radial glow pulse */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'glow' ? 0.3 : 0 }}
            transition={{ duration: 1 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(247,230,0,0.08) 0%, transparent 60%)'
            }}
          />

          {/* Skip button */}
          <motion.button
            data-testid="skip-intro-btn"
            className="absolute bottom-8 right-8 text-sm tracking-widest uppercase"
            style={{ color: '#A1A1AA' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, color: '#F7E600' }}
            onClick={finish}
            transition={{ delay: 1 }}
          >
            Skip
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
