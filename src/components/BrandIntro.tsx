import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// 4 text elements × 75vh = 300vh total scroll
const TOTAL_VH = 300;

export default function BrandIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Each element gets 25% of the scroll (= 75vh each)
  // Element 1: "Artisan finishes." — 0–25%
  const h1Opacity   = useTransform(scrollYProgress, [0, 0.08, 0.2, 0.28], [0, 1, 1, 0]);
  const h1Y         = useTransform(scrollYProgress, [0, 0.08], ['40px', '0px']);

  // Element 2: "Applied by hand." — 25–50%
  const h2Opacity   = useTransform(scrollYProgress, [0.22, 0.3, 0.45, 0.53], [0, 1, 1, 0]);
  const h2Y         = useTransform(scrollYProgress, [0.22, 0.3], ['40px', '0px']);

  // Element 3: First paragraph — 50–75%
  const p1Opacity   = useTransform(scrollYProgress, [0.47, 0.55, 0.7, 0.78], [0, 1, 1, 0]);
  const p1Y         = useTransform(scrollYProgress, [0.47, 0.55], ['40px', '0px']);

  // Element 4: Second + third paragraph — 75–100%
  const p2Opacity   = useTransform(scrollYProgress, [0.72, 0.8, 0.92, 1], [0, 1, 1, 0]);
  const p2Y         = useTransform(scrollYProgress, [0.72, 0.8], ['40px', '0px']);

  // Background fades in at start
  const bgOpacity   = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

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

        {/* Centred text stack */}
        <div className="relative z-10 h-full flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 max-w-4xl">

          {/* "Our Story" label — always visible once in */}
          <motion.div style={{ opacity: bgOpacity }} className="flex items-center gap-4 mb-10">
            <div className="w-6 h-px bg-[#8b7355]" />
            <span className="text-[#8b7355] text-xs uppercase tracking-[0.5em]">Our Story</span>
          </motion.div>

          {/* Element 1 */}
          <motion.h2
            style={{ opacity: h1Opacity, y: h1Y }}
            className="absolute text-white leading-tight tracking-tight"
            css-position="true"
            sx={{ top: '50%' }}
          >
            <span style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
              Artisan finishes.
            </span>
          </motion.h2>

          {/* Element 2 */}
          <motion.p
            style={{ opacity: h2Opacity, y: h2Y }}
            className="absolute text-white/40 italic"
            sx={{ top: '50%' }}
          >
            <span style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontWeight: 300 }}>
              Applied by hand.
            </span>
          </motion.p>

          {/* Element 3 */}
          <motion.p
            style={{ opacity: p1Opacity, y: p1Y }}
            className="absolute text-white/65 leading-relaxed max-w-2xl"
          >
            <span style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
              Established in 2002 in Perth, Western Australia, Troweled Earth have created a unique and customisable product range — from Venetian plaster and textured renders to concrete finishes and stucco.
            </span>
          </motion.p>

          {/* Element 4 */}
          <motion.div
            style={{ opacity: p2Opacity, y: p2Y }}
            className="absolute max-w-2xl space-y-5"
          >
            <p className="text-white/40 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)' }}>
              A household name associated with style and class in design aesthetics. Now expanding into Melbourne, offering training, product sales, and personalised application services.
            </p>
            <p className="text-white/40 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)' }}>
              Many of our products have been created for and featured in a number of award-winning architectural and interior design projects.
            </p>
          </motion.div>

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
