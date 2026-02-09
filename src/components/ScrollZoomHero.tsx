import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollZoomHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Text zoom - starts small, gets HUGE as you scroll
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 3]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-20%']);
  
  // Logo fades in as text fades out
  const logoOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.9], [0, 1, 1]);
  const logoScale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);
  
  // Background image zoom - no fade out
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Secondary images parallax
  const img1Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const img2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const img1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#FAF9F6]">
        
        {/* Background image with zoom */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: bgScale }}
        >
          <img 
            src="/TEM--V2/images/giorgi-city-beach.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Floating images with parallax */}
        <motion.div 
          className="absolute top-20 left-8 md:left-16 w-48 md:w-72 z-10"
          style={{ y: img1Y, scale: img1Scale }}
        >
          <img 
            src="/TEM--V2/images/products/marbellino/Marbellino+kitchen.png"
            alt="Marbellino finish"
            className="w-full shadow-2xl"
          />
        </motion.div>

        <motion.div 
          className="absolute bottom-32 right-8 md:right-16 w-40 md:w-64 z-10"
          style={{ y: img2Y }}
        >
          <img 
            src="/TEM--V2/images/products/concretum/Concretum+stairs.png"
            alt="Concretum finish"
            className="w-full shadow-2xl"
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
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1a1a1a] tracking-tight leading-none">
              TROWELED
            </h1>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1a1a1a] tracking-tight leading-none italic">
              Earth.
            </h1>
          </motion.div>
        </div>

        {/* Logo - fades in after text disappears */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none"
          style={{ opacity: logoOpacity, scale: logoScale }}
        >
          <img 
            src="/TEM--V2/images/logo.png" 
            alt="Troweled Earth" 
            className="w-48 md:w-64 lg:w-80 h-auto"
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
