import { useState, useEffect, useRef } from 'react';

const images = [
  { src: '/images/products/metallics/Troweled+Metal+copper.png', label: 'True Copper' },
  { src: '/images/products/metallics/Troweled+metal+copper+with+ageing+patina.png', label: 'Copper Patina' },
  { src: '/images/products/metallics/Troweled+Metals+Scorched+copper+1.png', label: 'Scorched Copper' },
  { src: '/images/products/metallics/Troweled+Metal+brass+gold+combination.png', label: 'Brass & Gold' },
  { src: '/images/products/metallics/Troweled+Metal+verdigris.jpg', label: 'Verdigris' },
  { src: '/images/products/metallics/Troweled+metal+scorch+steel.png', label: 'Scorched Steel' },
  { src: '/images/products/metallics/14-metallics-rust-patina-closeup.jpg', label: 'Rust Patina' },
];

const ZOOM_DURATION = 6000;   // ms to zoom from 1x → 8x
const FADE_DURATION = 600;    // crossfade duration

export default function InfiniteZoomMetals() {
  const [current, setCurrent] = useState(0);
  const [nextIdx, setNextIdx] = useState(1);
  const [fading, setFading] = useState(false);
  const [scale, setScale] = useState(1);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fadingRef = useRef(false);

  useEffect(() => {
    startRef.current = 0;
    fadingRef.current = false;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / ZOOM_DURATION, 1);

      // Exponential zoom: 1x → 8x
      const s = Math.pow(8, progress);
      setScale(s);

      if (progress >= 1 && !fadingRef.current) {
        fadingRef.current = true;
        setFading(true);
        setTimeout(() => {
          setCurrent(c => (c + 1) % images.length);
          setNextIdx(n => (n + 1) % images.length);
          setScale(1);
          setFading(false);
          fadingRef.current = false;
          startRef.current = 0;
        }, FADE_DURATION);
      } else if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current]);

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-black">

      {/* Current image — keeps zooming in */}
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

      {/* Next image — waits at 1x, fades in during transition */}
      <div
        className="absolute inset-0"
        style={{
          opacity: fading ? 1 : 0,
          transition: fading ? `opacity ${FADE_DURATION}ms ease` : 'none',
        }}
      >
        <img
          src={images[nextIdx].src}
          alt={images[nextIdx].label}
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1)', transformOrigin: 'center center' }}
        />
      </div>

      {/* Dark edges vignette — enhances the "pulling you in" effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Centre overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[#b8935a] text-xs uppercase tracking-[0.5em] mb-3">
          Raw Metal
        </span>
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight text-center px-8 drop-shadow-2xl">
          Into the Surface
        </h2>
      </div>

      {/* Label bottom-left */}
      <div className="absolute bottom-8 left-8 pointer-events-none">
        <span
          key={current}
          className="text-white/40 text-xs tracking-[0.35em] uppercase"
          style={{ animation: 'metalFadeIn 0.6s ease forwards' }}
        >
          {images[current].label}
        </span>
      </div>

      {/* Dots bottom-right */}
      <div className="absolute bottom-8 right-8 flex gap-1.5 pointer-events-none">
        {images.map((_, i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === current
                ? 'rgba(184,147,90,0.8)'
                : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes metalFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
