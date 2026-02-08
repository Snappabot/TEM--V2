import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FeaturedProject() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  
  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: imageY }}
      >
        <img 
          src="/TEM--V2/images/gallery/Screenshot_20240515_165019_Instagram.jpg" 
          alt="Enclosed House Project"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: textY }}
      >
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <motion.span
              className="inline-block text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Featured Project
            </motion.span>
            
            <motion.h3
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Enclosed House
            </motion.h3>
            
            <motion.p
              className="text-xl text-white/70 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Earthen Rokka finish for @morqarchitecture — austere, intimate, unforgettable. 
              Raw materiality meets contemporary design.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a 
                href="/projects" 
                className="group inline-flex items-center gap-4"
              >
                <span className="relative overflow-hidden">
                  <span className="inline-block text-white font-medium uppercase tracking-widest text-sm transition-transform group-hover:-translate-y-full duration-300">
                    View Project
                  </span>
                  <span className="absolute top-full left-0 inline-block text-[#8b7355] font-medium uppercase tracking-widest text-sm transition-transform group-hover:-translate-y-full duration-300">
                    View Project
                  </span>
                </span>
                <motion.div 
                  className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg 
                    className="w-5 h-5 text-white group-hover:text-black transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </a>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              className="flex justify-center gap-12 mt-16 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <span className="block text-3xl font-bold text-white">2024</span>
                <span className="text-white/50 text-sm uppercase tracking-wider">Year</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white">Rokka</span>
                <span className="text-white/50 text-sm uppercase tracking-wider">Finish</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white">Melbourne</span>
                <span className="text-white/50 text-sm uppercase tracking-wider">Location</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
