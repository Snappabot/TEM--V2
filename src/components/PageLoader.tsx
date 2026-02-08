import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Fallback: hide loader after max 2 seconds
    const timeout = setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <svg 
              className="w-16 h-16 text-white" 
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              {/* Simple tree/logo placeholder - replace with actual logo */}
              <circle cx="50" cy="30" r="20" opacity="0.8" />
              <rect x="45" y="45" width="10" height="40" opacity="0.8" />
            </svg>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            className="text-white text-2xl font-light tracking-[0.3em] uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Troweled Earth
          </motion.h1>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#8b7355]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            className="text-white/40 text-xs uppercase tracking-widest mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
