import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#8b7355] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

// Alternative: circular progress
export function CircularProgress() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <svg width="60" height="60" viewBox="0 0 60 60" className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <motion.circle
          cx="30"
          cy="30"
          r="26"
          fill="none"
          stroke="#8b7355"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            pathLength,
          }}
        />
      </svg>
      {/* Percentage text */}
      <motion.span 
        className="absolute inset-0 flex items-center justify-center text-xs text-white/70 font-medium"
      >
        <motion.span>
          {/* We'd need JS to show percentage */}
        </motion.span>
      </motion.span>
    </div>
  );
}
