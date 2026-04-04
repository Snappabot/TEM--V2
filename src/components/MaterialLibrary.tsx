'use client';

import { useState, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

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

export default function MaterialLibrary() {
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex ?? scrollActiveIndex;

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map scrollYProgress [0,1] → [0, materials.length-1]
  const scrollIndexTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, materials.length - 0.001]
  );

  useMotionValueEvent(scrollIndexTransform, 'change', (val) => {
    const idx = Math.min(Math.floor(val), materials.length - 1);
    setScrollActiveIndex(idx);
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${materials.length * 40}vh` }}
    >
      {/* Sticky viewport panel */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
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
              style={{
                transform: activeIndex === index ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 6s ease-out',
              }}
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
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
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
        </div>

        {/* Dots indicator */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 items-center">
          {materials.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 6 : 4,
                height: i === activeIndex ? 6 : 4,
                backgroundColor: i === activeIndex
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
