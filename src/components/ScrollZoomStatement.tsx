import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollZoomStatement() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Text starts big, zooms out as you scroll through
  const scale1 = useTransform(scrollYProgress, [0, 0.3, 0.5], [2, 1, 0.9]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.5], [0, 1, 1, 0]);
  
  const scale2 = useTransform(scrollYProgress, [0.2, 0.5, 0.7], [2, 1, 0.9]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  
  const scale3 = useTransform(scrollYProgress, [0.4, 0.7, 0.9], [2, 1, 0.9]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.55, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#1a1a1a]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Statement lines - each zooms in sequence */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          
          {/* Line 1 */}
          <motion.p 
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#FAF9F6] leading-tight mb-4 md:mb-6"
            style={{ scale: scale1, opacity: opacity1 }}
          >
            We do not paint walls.
          </motion.p>
          
          {/* Line 2 */}
          <motion.p 
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#FAF9F6] leading-tight mb-4 md:mb-6 italic"
            style={{ scale: scale2, opacity: opacity2 }}
          >
            We sculpt atmosphere.
          </motion.p>
          
          {/* Line 3 */}
          <motion.p 
            className="font-serif text-xl md:text-2xl lg:text-3xl text-[#FAF9F6]/70 leading-relaxed max-w-3xl mx-auto"
            style={{ scale: scale3, opacity: opacity3 }}
          >
            In a world of flat surfaces and digital noise, textural depth is the only true luxury.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
