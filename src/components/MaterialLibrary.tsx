'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const materials = [
  {
    name: 'MARBELLINO',
    subtitle: 'Venetian // Matte',
    image: '/images/products/marbellino/Marbellino+state+of+kin.jpg',
    href: '/products/marbellino'
  },
  {
    name: 'CONCRETUM',
    subtitle: 'Raw Concrete // Matte',
    image: '/images/products/concretum/concretum-sconce-night.jpg',
    href: '/products/concretum'
  },
  {
    name: 'METALS',
    subtitle: 'Copper, Brass, Steel',
    image: '/images/products/metallics/Troweled+Metal+copper.jpg',
    href: '/products/metallics'
  },
  {
    name: 'ROKKA',
    subtitle: 'Textured Stone // Natural',
    image: '/images/products/rokka/rokka-hero-hq.jpg',
    href: '/products/rokka'
  },
  {
    name: 'TADELLINO',
    subtitle: 'Tadelakt Inspired // Water Resistant',
    image: '/images/products/tadellino/tadellino-shower-skylight.jpg',
    href: '/products/tadellino'
  },
  {
    name: 'CUSTOM',
    subtitle: 'Your Vision // Our Craft',
    image: '/images/products/custom-finishes/Custom+lunar+bedroom.jpg',
    href: '/products/custom-finishes'
  },
  {
    name: 'EARTHEN HEMP',
    subtitle: 'Sustainable // Rammed Earth',
    image: '/images/products/earthen-renders/hemp-hero.jpg',
    href: '/products/earthen-renders'
  },
  {
    name: 'NATURAL',
    subtitle: 'Hemp // Clay // Lime',
    image: '/images/arch-plaster-render.jpg',
    href: '/products/natural-plasters'
  },
];

const AUTO_CYCLE_MS = 4000;

export default function MaterialLibrary() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressStartRef = useRef<number>(Date.now());

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setProgress(0);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    progressStartRef.current = Date.now();
    setProgress(0);

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - progressStartRef.current;
      setProgress(Math.min(elapsed / AUTO_CYCLE_MS, 1));
    }, 50);

    autoPlayRef.current = setInterval(() => {
      progressStartRef.current = Date.now();
      setProgress(0);
      setActiveIndex(i => (i + 1) % materials.length);
    }, AUTO_CYCLE_MS);
  }, []);

  // Detect touch device
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Auto-play only on touch devices
  useEffect(() => {
    if (isTouchDevice && isAutoPlaying) {
      startAutoPlay();
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(0);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isTouchDevice, isAutoPlaying, startAutoPlay]);

  const handleItemInteraction = (index: number, isTouch: boolean) => {
    if (isTouch) {
      stopAutoPlay();
    }
    setActiveIndex(index);
  };

  return (
    <section className="relative bg-[#1a1a1a] h-screen" style={{ height: '100dvh' }}>
      {/* Background images — crossfade */}
      {materials.map((material, index) => (
        <div
          key={`bg-${index}`}
          className="absolute inset-0 z-0"
          style={{
            opacity: activeIndex === index ? 1 : 0,
            transition: 'opacity 600ms ease',
          }}
        >
          <img
            src={material.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16">
        {/* Section label */}
        <span
          className="label text-white/50 mb-6 md:mb-10 block"
          style={{ letterSpacing: '0.15em', fontSize: '0.7rem' }}
        >
          THE MATERIAL LIBRARY
        </span>

        {/* Products list */}
        <div className="space-y-1 md:space-y-2">
          {materials.map((material, index) => {
            const isActive = activeIndex === index;
            return (
              <a
                key={index}
                href={material.href}
                className="block origin-left select-none"
                style={{
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  opacity: isActive ? 1 : 0.35,
                  transition: 'transform 300ms ease, opacity 300ms ease',
                }}
                onMouseEnter={() => {
                  if (!isTouchDevice) handleItemInteraction(index, false);
                }}
                onTouchStart={(e) => {
                  // Prevent navigation on first tap — activate; subsequent tap navigates
                  if (!isActive) {
                    e.preventDefault();
                    handleItemInteraction(index, true);
                  }
                  // If already active, let the default href navigate
                }}
              >
                <div className="flex items-baseline gap-3 md:gap-5">
                  <span className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white leading-none">
                    {material.name}
                  </span>
                  <span
                    className="text-white text-xs md:text-sm tracking-wide"
                    style={{
                      opacity: isActive ? 0.7 : 0,
                      transition: 'opacity 400ms ease',
                    }}
                  >
                    [{material.subtitle}]
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Mobile auto-cycle progress dots */}
        {isTouchDevice && isAutoPlaying && (
          <div className="flex gap-2 mt-8">
            {materials.map((_, index) => (
              <div
                key={index}
                className="relative h-0.5 flex-1 bg-white/20 overflow-hidden rounded-full"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  style={{
                    width: activeIndex === index
                      ? `${progress * 100}%`
                      : activeIndex > index
                      ? '100%'
                      : '0%',
                    transition: activeIndex === index ? 'none' : 'width 200ms ease',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
