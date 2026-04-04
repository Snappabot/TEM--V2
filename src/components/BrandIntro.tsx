import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BG_IMAGES = [
  '/images/products/marbellino/Marbellino+texture+cream.jpg',
  '/images/products/custom-finishes/exclusive-fireplace.jpg',
  '/images/products/marbellino/Marbellino+common+grey+half.jpg',
];

export default function BrandIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Headline fades and rises in — same speed as hero word scroll
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6], [0, 1, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 0.2], ['40px', '0px']);

  // Paragraph fades in slightly after headline
  const paraOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.7], [0, 1, 1]);
  const paraY = useTransform(scrollYProgress, [0.15, 0.35], ['40px', '0px']);

  // Background slowly reveals
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ minHeight: '115vh' }}
    >
      {/* Cycling background with Ken Burns */}
      {BG_IMAGES.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? bgOpacity : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.18)', transform: 'scale(1.08)', animation: 'kenBurns 14s ease-in-out forwards' }}
          />
        </motion.div>
      ))}

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6" style={{ minHeight: '115vh', display: 'flex', alignItems: 'center' }}>
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center w-full">

          {/* Left — headline with scroll reveal */}
          <motion.div style={{ opacity: headlineOpacity, y: headlineY }}>
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

          {/* Right — paragraphs fade in after */}
          <motion.div style={{ opacity: paraOpacity, y: paraY }}>
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

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.08); }
          to   { transform: scale(1.18); }
        }
      `}</style>
    </section>
  );
}
