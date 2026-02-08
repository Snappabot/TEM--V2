import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Statement() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a]"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        style={{ 
          background: 'radial-gradient(circle, #8b7355 0%, transparent 70%)',
          y
        }}
      />
      
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.p 
          className="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          We don't do{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#8b7355] font-medium">ordinary</span>
            <motion.span 
              className="absolute bottom-2 left-0 right-0 h-3 bg-[#8b7355]/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </span>
          {' '}walls.
        </motion.p>
        
        <motion.p
          className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Every surface tells a story. We craft finishes that transform spaces into experiences.
        </motion.p>
      </motion.div>
    </section>
  );
}
