import { useState, useEffect } from 'react';

const images = [
  { src: '/images/products/marbellino/Marbellino+curved+sunset.jpg', label: 'Curved Sunset' },
  { src: '/images/products/marbellino/Marbellino+state+of+kin.jpg', label: 'State of Kin' },
  { src: '/images/products/marbellino/Marbellino+white+curves.jpg', label: 'White Curves' },
  { src: '/images/products/marbellino/Marbellino+giorgi+curves.jpg', label: 'Giorgi Curves' },
  { src: '/images/products/marbellino/Marbellino+outdoor+arches.jpg', label: 'Outdoor Arches' },
  { src: '/images/products/marbellino/Marbellino+ivory+arch+niche.jpg', label: 'Ivory Arch Niche' },
  { src: '/images/products/marbellino/Marbellino+spiral+stair.jpg', label: 'Spiral Stair' },
  { src: '/images/products/marbellino/Marbellino+angular+exterior.jpg', label: 'Angular Exterior' },
];

const ZOOM_DURATION = 4000; // ms per image
const FADE_DURATION = 600;  // ms crossfade

export default function InfiniteZoom() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number;
    let raf: number;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / ZOOM_DURATION, 1);
      setProgress(p);

      if (p >= 1) {
        // begin crossfade
        setFading(true);
        setTimeout(() => {
          setCurrent(c => (c + 1) % images.length);
          setNext(c => (c + 2) % images.length);
          setFading(false);
          setProgress(0);
          start = 0;
        }, FADE_DURATION);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  // scale from 1 → 2.2 continuously
  const scale = 1 + progress * 1.2;
  const nextScale = 1 + 0 * 1.2; // next always starts at 1

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-black">
      {/* Current image zooming in */}
      <div
        className="absolute inset-0 transition-opacity"
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

      {/* Next image fading in */}
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
          style={{
            transform: `scale(${nextScale})`,
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Label */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
        <span
          key={current}
          className="text-white/60 text-sm tracking-[0.3em] uppercase"
          style={{ animation: 'fadeInUp 0.6s ease forwards' }}
        >
          {images[current].label}
        </span>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 right-8 flex gap-1.5 pointer-events-none">
        {images.map((_, i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: i === current ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
