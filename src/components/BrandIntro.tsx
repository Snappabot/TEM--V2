import { useEffect, useRef, useState } from 'react';

export default function BrandIntro() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setRevealed(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — label + headline */}
          <div
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 1s ease, transform 1s ease',
            }}
          >
            <span className="text-[#8b7355] text-xs uppercase tracking-[0.5em] block mb-8">Our Story</span>
            <h2
              className="text-white leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 700 }}
            >
              Artisan finishes.
            </h2>
            <p className="text-white/40 italic text-xl mt-4" style={{ fontWeight: 300 }}>
              Applied by hand.
            </p>
          </div>

          {/* Right — story copy */}
          <div
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
            }}
          >
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Established in 2002 in Perth, Western Australia, Troweled Earth have created a unique and customisable product range — from Venetian plaster and textured renders to concrete finishes and stucco.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-10">
              A household name associated with style and class in design aesthetics. Now expanding into Melbourne, offering training, product sales, and personalised application services.
            </p>


          </div>

        </div>
      </div>
    </section>
  );
}
