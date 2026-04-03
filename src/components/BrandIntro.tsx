import { useEffect, useRef, useState } from 'react';

const BG_IMAGES = [
  '/images/products/marbellino/Marbellino+texture+cream.jpg',
  '/images/products/custom-finishes/Custom+finish+2.png',
  '/images/products/marbellino/Marbellino+common+grey+half.jpg',
];

export default function BrandIntro() {
  const [revealed, setRevealed] = useState(false);
  const [bgIdx, setBgIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Cycle background every 6s
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setBgIdx(i => (i + 1) % BG_IMAGES.length);
        setFading(false);
      }, 1000);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden mt-2" style={{ minHeight: '70vh' }}>

      {/* Ken Burns background */}
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: i === bgIdx && !fading ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.18)',
              transform: 'scale(1.08)',
              animation: i === bgIdx ? 'kenBurns 12s ease-in-out forwards' : 'none',
            }}
          />
        </div>
      ))}

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left */}
          <div
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 1.2s ease, transform 1.2s ease',
            }}
          >
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
          </div>

          {/* Right */}
          <div
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 1.2s ease 0.25s, transform 1.2s ease 0.25s',
            }}
          >
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
          </div>

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
