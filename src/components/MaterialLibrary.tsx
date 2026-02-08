import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const materials = [
  { 
    name: 'MARBELLINO', 
    subtitle: 'Venetian // High Polish',
    image: '/TEM--V2/images/products/marbellino/Marbellino+bathroom+8.png',
    href: '/TEM--V2/products/marbellino'
  },
  { 
    name: 'CONCRETUM', 
    subtitle: 'Raw Concrete // Matte',
    image: '/TEM--V2/images/products/concretum/Concretum+stairs.png',
    href: '/TEM--V2/products/concretum'
  },
  { 
    name: 'METALS', 
    subtitle: 'Copper, Brass, Steel',
    image: '/TEM--V2/images/products/metallics/Troweled+Metal+copper.png',
    href: '/TEM--V2/products/metallics'
  },
  { 
    name: 'ROKKA', 
    subtitle: 'Textured Stone // Natural',
    image: '/TEM--V2/images/products/rokka/Roka+ceiling.png',
    href: '/TEM--V2/products/rokka'
  },
  { 
    name: 'TADELAKT', 
    subtitle: 'Moroccan // Waterproof',
    image: '/TEM--V2/images/products/tadelakt/Tadelakt+bathroom+1.png',
    href: '/TEM--V2/products/tadelakt'
  },
  { 
    name: 'CUSTOM', 
    subtitle: 'Your Vision // Our Craft',
    image: '/TEM--V2/images/products/custom-finishes/Custom+finish+bar.png',
    href: '/TEM--V2/products/custom-finishes'
  },
];

export default function MaterialLibrary() {
  const containerRef = useRef(null);
  
  // Total scroll height = 5 "rolls" per product × 6 products = 30 scroll units
  // Each product gets equal portion of scroll
  const scrollPerProduct = 1 / materials.length;

  return (
    <section ref={containerRef} className="relative bg-[#1a1a1a]" style={{ height: `${materials.length * 500}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section label */}
        <div className="absolute top-8 left-8 z-30">
          <span className="label text-white/50">The Material Library</span>
        </div>

        {/* Products */}
        {materials.map((material, index) => (
          <ProductZoom 
            key={index}
            material={material}
            index={index}
            totalProducts={materials.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
}

function ProductZoom({ 
  material, 
  index, 
  totalProducts,
  containerRef 
}: { 
  material: typeof materials[0];
  index: number;
  totalProducts: number;
  containerRef: React.RefObject<HTMLElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Each product gets its own scroll segment
  const segmentSize = 1 / totalProducts;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;

  // Zoom: start normal → zoom in close → zoom out → fade out
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, mid, end - segmentSize * 0.1, end],
    [1, 2.5, 3, 2, 1]
  );

  // Opacity: fade in → visible → fade out
  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.1, mid, end - segmentSize * 0.1, end],
    [0, 1, 1, 1, 0]
  );

  // Text opacity: appears in middle of zoom
  const textOpacity = useTransform(
    scrollYProgress,
    [start + segmentSize * 0.2, start + segmentSize * 0.35, end - segmentSize * 0.3, end - segmentSize * 0.15],
    [0, 1, 1, 0]
  );

  // Text scale: subtle zoom with image
  const textScale = useTransform(
    scrollYProgress,
    [start, mid, end],
    [0.8, 1, 0.9]
  );

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      {/* Background image with zoom */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <img 
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Text overlay */}
      <motion.div 
        className="relative z-10 text-center"
        style={{ opacity: textOpacity, scale: textScale }}
      >
        <motion.h2 
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-tight"
        >
          {material.name}
        </motion.h2>
        <p className="text-white/60 text-sm md:text-base tracking-widest mt-4">
          [{material.subtitle}]
        </p>
        <motion.a
          href={material.href}
          className="inline-flex items-center gap-3 mt-8 text-white/80 hover:text-white transition-colors"
          whileHover={{ x: 10 }}
        >
          <span className="text-sm tracking-wider">Explore</span>
          <span className="text-xl">→</span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
