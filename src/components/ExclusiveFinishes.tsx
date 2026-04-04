import { useState, useEffect, useRef } from 'react';

const pieces = [
  {
    src: '/images/products/custom-finishes/exclusive-copper-v2.jpg',
    name: 'Burnt Copper',
    detail: 'Private residence — Melbourne',
  },
  {
    src: '/images/products/custom-finishes/exclusive-fireplace.jpg',
    name: 'Earthen Fireplace',
    detail: 'Private residence commission',
  },
  {
    src: '/images/products/custom-finishes/exclusive-giorgi.jpg',
    name: 'Giorgi Curves',
    detail: 'Architectural collaboration — Melbourne',
  },
  {
    src: '/images/products/custom-finishes/Custom+moon+finish.jpg',
    name: 'Crater',
    detail: 'Private commission',
  },
  {
    src: '/images/products/custom-finishes/Custom+lunar+bedroom.jpg',
    name: 'Lunar — Bedroom',
    detail: 'Private residence — Melbourne',
  },
];

export default function ExclusiveFinishes() {
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-cycle images
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % pieces.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background image — full bleed, slow pan */}
      <div className="absolute inset-0">
        {pieces.map((p, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[2000ms]"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img
              src={p.src}
              alt={p.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.35)' }}
            />
          </div>
        ))}
        {/* Deep vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 50%, transparent 20%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-36 flex flex-col md:flex-row md:items-center gap-16 md:gap-24">

        {/* Left — copy */}
        <div
          className="md:w-1/2"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 1.2s ease, transform 1.2s ease',
          }}
        >
          {/* Label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#8b7355]" />
            <span className="text-[#8b7355] text-xs uppercase tracking-[0.5em]">By Invitation Only</span>
          </div>

          {/* Headline */}
          <h2
            className="text-white mb-6 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 700 }}
          >
            Exclusive<br />
            <span className="italic font-light text-white/70">Finishes</span>
          </h2>

          {/* Sub */}
          <p className="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-6">
            Bespoke creations — private collaboration only
          </p>

          {/* Body */}
          <p className="text-white/50 leading-relaxed text-base max-w-md mb-10">
            Developed in intimate partnership with our principal artists at Troweled Earth, these finishes are crafted for visionary architects, designers, and clients who demand absolute singularity. Each piece is born from deep creativity and significant time — an experience reserved for those who require true exclusivity.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-10" />

          {/* CTA */}
          <a
            href="/exclusive"
            className="group inline-flex items-center gap-4 text-white"
          >
            <span className="text-xs uppercase tracking-[0.4em] border-b border-[#8b7355] pb-0.5 group-hover:border-white transition-colors">
              Begin Your Private Collaboration
            </span>
            <svg className="w-4 h-4 text-[#8b7355] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Right — image stack */}
        <div
          className="md:w-1/2 relative"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 1.4s ease 0.2s, transform 1.4s ease 0.2s',
          }}
        >
          {/* Main image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            {pieces.map((p, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-[1500ms]"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <img src={p.src} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-sm font-medium">{p.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{p.detail}</p>
                </div>
              </div>
            ))}

            {/* Jose credit */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Principal Artists</span>
              <div className="w-4 h-px bg-white/30" />
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Troweled Earth</span>
            </div>
          </div>

          {/* Dot pagination */}
          <div className="flex gap-2 mt-5 justify-end">
            {pieces.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300"
                style={{
                  width: i === active ? '24px' : '6px',
                  height: '2px',
                  backgroundColor: i === active ? '#8b7355' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating "commission number" — adds luxury authenticity */}
      <div
        className="absolute bottom-10 left-6 flex items-center gap-3"
        style={{ opacity: revealed ? 0.3 : 0, transition: 'opacity 2s ease 1s' }}
      >
        <div className="w-6 h-px bg-white/40" />
        <span className="text-white/60 text-xs tracking-[0.4em] uppercase">Limited Commissions — 2026</span>
      </div>
    </section>
  );
}
