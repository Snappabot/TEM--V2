import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function EditorialHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-[#FAF9F6] overflow-hidden">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Grid layout with parallax images */}
        <div className="absolute inset-0 grid grid-cols-12 gap-4 p-6 md:p-12">
          {/* Left image - moves up slower */}
          <motion.div 
            className="col-span-5 md:col-span-4 col-start-1 row-start-1 mt-24 md:mt-32 z-10"
            style={{ y: y1, opacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-[3/4] max-w-[320px] overflow-hidden">
              <motion.img 
                src="/TEM--V2/images/products/marbellino/Marbellino+kitchen.png"
                alt="Marbellino kitchen finish"
                className="w-full h-full object-cover"
                style={{ scale }}
              />
            </div>
          </motion.div>

          {/* Right large image - moves down */}
          <motion.div 
            className="col-span-8 md:col-span-8 col-start-5 row-start-1 z-0"
            style={{ y: y2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
              <motion.img 
                src="/TEM--V2/images/products/marbellino/Marbellino+stairs+2.png"
                alt="Sculptural Marbellino staircase"
                className="w-full h-full object-cover"
                style={{ scale }}
              />
              {/* Overlay text on image */}
              <motion.div 
                className="absolute bottom-4 right-4 text-white/80 text-xs tracking-widest"
                style={{ opacity }}
              >
                MAT: MARBELLINO // LOC: MELBOURNE
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Main title overlay - scales and moves on scroll */}
        <motion.div 
          className="relative z-20 flex items-end h-screen pb-24 md:pb-32 px-6 md:px-12 pointer-events-none"
          style={{ y: titleY, scale: titleScale, opacity }}
        >
          <motion.h1 
            className="heading-xl text-[#1a1a1a]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            TROWELED<br />
            <span className="italic">Earth.</span>
          </motion.h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div 
            className="w-px h-16 bg-[#1a1a1a]"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
