import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollZoomHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Text zoom - starts small, gets HUGE as you scroll
  const textScale = useTransform(scrollYProgress, [0, 0.08, 0.5], [0.9, 1, 3]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.08, 0.35, 0.5], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-20%']);
  
  // Logo fades in as text fades out
  const logoOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.9], [0, 1, 1]);
  const logoScale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);
  
  // Background image zoom - no fade out
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  // Fade in from black on entry
  const bgOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[360vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        
        {/* Background image with zoom */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: bgScale, opacity: bgOpacity }}
        >
          <img 
            src="/images/products/marbellino/Marbellino+curved+sunset.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Main title - ZOOMS as you scroll */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            style={{ 
              scale: textScale, 
              opacity: textOpacity,
              y: textY
            }}
            className="text-center"
          >
            <h1 className="font-serif text-[4.8rem] md:text-[6.4rem] lg:text-[8rem] text-[#1a1a1a] tracking-tight leading-none">
              TROWELED
            </h1>
            <h1 className="font-serif text-[4.8rem] md:text-[6.4rem] lg:text-[8rem] text-[#1a1a1a] tracking-tight leading-none">
              EARTH.
            </h1>
          </motion.div>
        </div>

        {/* Logo - fades in after text disappears */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none"
          style={{ opacity: logoOpacity, scale: logoScale }}
        >
          <img 
            src="/images/logo.png" 
            alt="Troweled Earth" 
            className="w-32 md:w-44 lg:w-56 h-auto"
          />
        </motion.div>

        {/* Location tag */}
        <motion.div 
          className="absolute bottom-8 right-8 text-xs tracking-widest text-[#1a1a1a]/60 z-20"
        >
          MAT: MARBELLINO // LOC: MELBOURNE
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: textOpacity }}
        >
          <motion.div 
            className="w-px h-12 bg-[#1a1a1a]"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
