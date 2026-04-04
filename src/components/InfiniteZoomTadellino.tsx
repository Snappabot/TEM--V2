import { useState, useEffect, useRef } from 'react';

const images = [
  { src: '/images/products/tadellino/07-tadelakt-bathroom-shower.jpg', label: 'Modern Bathroom' },
  { src: '/images/products/tadellino/1771138149522-IMG_8341.jpeg', label: 'Moody Shower' },
  { src: '/images/products/tadellino/manual-outdoor-shower-vines.jpg', label: 'Outdoor Shower' },
  { src: '/images/products/tadellino/Tadelakt+green.png', label: 'Sage Green' },
  { src: '/images/products/tadellino/Tadelakt+pink+blush.png', label: 'Blush Pink' },
];

const ZOOM_DURATION = 5000;
const FADE_DURATION = 700;

export default function InfiniteZoomTadellino() {
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
      const p = Math.min((ts - startRef.current) / ZOOM_DURATION, 1);
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

  const scale = 1 + progress * 1.8;

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-black">
      <div className="absolute inset-0" style={{ opacity: fading ? 0 : 1, transition: fading ? `opacity ${FADE_DURATION}ms ease` : 'none' }}>
        <img
          src={images[current].src}
          alt={images[current].label}
          className="w-full h-full object-cover"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center', willChange: 'transform' }}
        />
      </div>
      <div className="absolute inset-0" style={{ opacity: fading ? 1 : 0, transition: fading ? `opacity ${FADE_DURATION}ms ease` : 'none' }}>
        <img src={images[next].src} alt={images[next].label} className="w-full h-full object-cover" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Centre text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[#8b7355] text-xs uppercase tracking-[0.5em] mb-3">The Finish</span>
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight text-center px-8 drop-shadow-2xl">
          Seamless. Water Resistant.<br className="hidden md:block" /> Alive.
        </h2>
        <p className="text-white/40 text-sm mt-5 max-w-sm text-center px-8">
          No grout lines. One continuous surface, hand-polished with stone.
        </p>
      </div>

      {/* Label */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        <span key={current} className="text-white/40 text-xs tracking-[0.35em] uppercase" style={{ animation: 'tadFadeIn 0.6s ease forwards' }}>
          {images[current].label}
        </span>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 right-8 flex gap-1.5 pointer-events-none">
        {images.map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: i === current ? 'rgba(139,115,85,0.9)' : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>

      <style>{`
        @keyframes tadFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
