import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function EditorialStatement() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Text scales up as you scroll into view
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -30]);

  const words = "We do not paint walls. We sculpt atmosphere. In a world of flat surfaces and digital noise, textural depth is the only true luxury. Our renders are born from the earth, troweled by hand, and cured to stone.".split(" ");

  return (
    <section ref={containerRef} className="section-dark py-32 md:py-48 px-6 md:px-12 min-h-screen flex items-center">
      <motion.div 
        className="max-w-5xl mx-auto"
        style={{ scale, opacity, y }}
      >
        <p className="body-lg text-[#FAF9F6] leading-relaxed">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </section>
  );
}
