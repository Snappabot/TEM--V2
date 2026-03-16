import { useState, useEffect, useRef } from 'react';

// Texture-focused images — zooming deep into the grain
const images = [
  { src: '/images/products/earthen-renders/hemp-texture-arch.jpg', label: 'Sculptural Arch — Raw Grain' },
  { src: '/images/products/earthen-renders/hemp-texture-closeup.jpg', label: 'Hemp Fibre — Kitchen Contrast' },
  { src: '/images/products/earthen-renders/hemp-hero.jpg', label: 'Rammed Earth — Spotlight' },
  { src: '/images/products/earthen-renders/hemp-beams.jpg', label: 'Rammed Earth — Beams' },
  { src: '/images/products/earthen-renders/hemp-commercial-corridor.jpg', label: 'Commercial Corridor' },
];

const ZOOM_DURATION = 5000;
const FADE_DURATION = 700;

export default function InfiniteZoomHemp() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = 0;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / ZOOM_DURATION, 1);
      setProgress(p);

      if (p >= 1) {
        setFading(true);
        setTimeout(() => {
          setCurrent(c => (c + 1) % images.length);
          setNext(n => (n + 1) % images.length);
          setFading(false);
          setProgress(0);
          startRef.current = 0;
        }, FADE_DURATION);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current]);

  // Zoom from 1x to 3x — deeper than marbellino, really gets into the texture
  const scale = 1 + progress * 2;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-black">
      {/* Current image */}
      <div
        className="absolute inset-0"
        style={{
          opacity: fading ? 0 : 1,
          transition: fading ? `opacity ${FADE_DURATION}ms ease` : 'none',
        }}
      >
        <img
          src={images[current].src}
          alt={images[current].label}
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Next image */}
      <div
        className="absolute inset-0"
        style={{
          opacity: fading ? 1 : 0,
          transition: fading ? `opacity ${FADE_DURATION}ms ease` : 'none',
        }}
      >
        <img
          src={images[next].src}
          alt={images[next].label}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vignette — heavier to emphasise texture depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" 
           style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

      {/* Label */}
      <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
        <span
          key={current}
          className="text-white/50 text-xs tracking-[0.4em] uppercase"
          style={{ animation: 'fadeInUp 0.8s ease forwards' }}
        >
          {images[current].label}
        </span>
      </div>

      {/* Section title overlay */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-full pointer-events-none">
        <span className="text-[#8b7355] text-xs uppercase tracking-[0.4em] mb-3">The Texture</span>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight text-center px-8">
          Deep in the Grain
        </h2>
        <p className="text-white/50 text-sm mt-4 max-w-md text-center px-8">
          Real hemp fibres, hand-applied. Every wall is one of a kind.
        </p>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 right-8 flex gap-1.5 pointer-events-none">
        {images.map((_, i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: i === current ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
