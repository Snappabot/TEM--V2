import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function EditorialContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Left "Let's Create" fades in 0→50% (150vh)
  const leftOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const leftY       = useTransform(scrollYProgress, [0, 0.5], ['50px', '0px']);

  // Right logo fades in 50%→100% (150vh)
  const rightOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const rightY       = useTransform(scrollYProgress, [0.5, 1], ['50px', '0px']);

  return (
    <section id="contact" ref={containerRef} style={{ height: '300vh' }} className="relative">
      <div ref={inViewRef} className="sticky top-0 h-screen bg-[#0a0a0a] overflow-hidden flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* Left — "Let's Create" + contact */}
            <motion.div style={{ opacity: leftOpacity, y: leftY }}>
              <span className="label block mb-6 text-[#8b7355] text-xs uppercase tracking-[0.5em]">Begin Your Project</span>
              <h2 className="text-[#FAF9F6] max-w-2xl leading-tight tracking-tight mb-8"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700 }}>
                Let's create something<br />
                <span className="italic font-light text-white/60">extraordinary.</span>
              </h2>

              <motion.a
                href="mailto:matt-troweledearth@outlook.com"
                className="inline-flex items-center gap-4 mb-12 group"
                whileHover={{ x: 10 }}
              >
                <span className="text-lg text-[#FAF9F6]">Get in touch</span>
                <span className="w-10 h-10 rounded-full border border-[#FAF9F6] flex items-center justify-center text-[#FAF9F6] group-hover:bg-[#FAF9F6] group-hover:text-[#1a1a1a] transition-colors">→</span>
              </motion.a>

              {/* Footer info */}
              <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <span className="text-[#8b7355] text-xs uppercase tracking-[0.3em] block mb-3">Contact</span>
                  <div className="space-y-1 text-sm text-white/60">
                    <p>Matt</p>
                    <a href="tel:0439243055" className="block hover:text-white transition-colors">0439 243 055</a>
                    <a href="mailto:matt-troweledearth@outlook.com" className="block hover:text-white transition-colors text-xs">matt-troweledearth@outlook.com</a>
                  </div>
                </div>
                <div>
                  <span className="text-[#8b7355] text-xs uppercase tracking-[0.3em] block mb-3">Location</span>
                  <div className="text-sm text-white/60">
                    <p>Melbourne</p>
                    <p>Victoria, Australia</p>
                  </div>
                </div>
                <div>
                  <span className="text-[#8b7355] text-xs uppercase tracking-[0.3em] block mb-3">Follow</span>
                  <a href="https://instagram.com/troweled_earth_melbourne" target="_blank" rel="noopener noreferrer"
                     className="text-sm text-white/60 hover:text-white transition-colors block">Instagram</a>
                  <p className="text-xs text-white/30 mt-4">© 2026 Troweled Earth Melbourne</p>
                </div>
              </div>
            </motion.div>

            {/* Right — large TEM logo */}
            <motion.div style={{ opacity: rightOpacity, y: rightY }} className="flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Troweled Earth Melbourne"
                className="w-full max-w-sm h-auto"
                style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
