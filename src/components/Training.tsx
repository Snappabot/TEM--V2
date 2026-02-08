import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function Training() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="relative w-full py-32 overflow-hidden bg-[#1a1a1a]">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #8b7355 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.span
          className="inline-block text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Workshops & Training
        </motion.span>
        
        <motion.h2
          className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Learn The Craft
        </motion.h2>
        
        <motion.p
          className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          2026 workshop dates now open. Master brutalist plaster techniques with hands-on training from industry leaders.
        </motion.p>
        
        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-12 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { title: 'Hands-On', desc: 'Learn by doing with real materials' },
            { title: 'Expert Led', desc: 'Trained by industry professionals' },
            { title: 'Certified', desc: 'Receive official TEM certification' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(139, 115, 85, 0.5)' }}
            >
              <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
              <p className="text-white/50 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a 
            href="/training" 
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium uppercase tracking-widest text-sm hover:bg-[#8b7355] hover:text-white transition-all duration-300"
          >
            <span>Book A Workshop</span>
            <motion.svg 
              className="w-5 h-5"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              whileHover={{ x: 5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
