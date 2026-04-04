import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Left fades in 0–75vh, right fades in 75–150vh, stays on screen after
const TOTAL_VH = 200;

export default function BrandIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Left column: "Artisan finishes. / Applied by hand." — fades in first 50%
  const leftOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const leftY       = useTransform(scrollYProgress, [0, 0.5], ['40px', '0px']);

  // Right column: paragraphs — fades in second 50%
  const rightOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const rightY       = useTransform(scrollYProgress, [0.5, 1], ['40px', '0px']);

  // Background fades in at start
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${TOTAL_VH}vh` }}
    >
      {/* Sticky panel */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* Background */}
        <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }}>
          <img
            src="/images/products/marbellino/Marbellino+texture+cream.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.18)', transform: 'scale(1.08)', animation: 'kenBurns 20s ease-in-out forwards' }}
          />
        </motion.div>

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Content — original two-column layout */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

              {/* Left */}
              <motion.div style={{ opacity: leftOpacity, y: leftY }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-6 h-px bg-[#8b7355]" />
                  <span className="text-[#8b7355] text-xs uppercase tracking-[0.5em]">Our Story</span>
                </div>
                <h2
                  className="text-white leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700 }}
                >
                  Artisan finishes.
                </h2>
                <p className="text-white/40 italic mt-4" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 300 }}>
                  Applied by hand.
                </p>
              </motion.div>

              {/* Right */}
              <motion.div style={{ opacity: rightOpacity, y: rightY }}>
                <p className="text-white/65 leading-relaxed mb-6"
                   style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}>
                  Established in 2002 in Perth, Western Australia, Troweled Earth have created a unique and customisable product range — from Venetian plaster and textured renders to concrete finishes and stucco.
                </p>
                <p className="text-white/35 leading-relaxed mb-6"
                   style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}>
                  A household name associated with style and class in design aesthetics. Now expanding into Melbourne, offering training, product sales, and personalised application services.
                </p>
                <p className="text-white/35 leading-relaxed"
                   style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1rem)' }}>
                  Many of our products have been created for and featured in a number of award-winning architectural and interior design projects.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.08); }
          to   { transform: scale(1.22); }
        }
      `}</style>
    </section>
  );
}
