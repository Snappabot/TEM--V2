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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#1a1a1a]" 
      style={{ height: `${materials.length * 500}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Background images - each zooms when active */}
        {materials.map((material, index) => (
          <ZoomingBackground 
            key={`bg-${index}`}
            material={material}
            index={index}
            totalProducts={materials.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12">
          {/* Section label */}
          <span className="label text-white/50 mb-8">The Material Library</span>

          {/* Products list */}
          <div className="space-y-2">
            {materials.map((material, index) => (
              <ProductItem 
                key={index}
                material={material}
                index={index}
                totalProducts={materials.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ZoomingBackground({ 
  material, 
  index, 
  totalProducts,
  scrollYProgress 
}: { 
  material: typeof materials[0];
  index: number;
  totalProducts: number;
  scrollYProgress: any;
}) {
  const segmentSize = 1 / totalProducts;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;

  // Zoom: 1 → 2.5 → 3 → 2 → 1
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, mid, end - segmentSize * 0.1, end],
    [1, 1.8, 2.5, 2, 1.2]
  );

  // Opacity: fade in and out
  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.15, mid, end - segmentSize * 0.15, end],
    [0, 1, 1, 1, 0]
  );

  return (
    <motion.div 
      className="absolute inset-0 z-0"
      style={{ opacity }}
    >
      <motion.img 
        src={material.image}
        alt=""
        className="w-full h-full object-cover"
        style={{ scale }}
      />
    </motion.div>
  );
}

function ProductItem({ 
  material, 
  index, 
  totalProducts,
  scrollYProgress 
}: { 
  material: typeof materials[0];
  index: number;
  totalProducts: number;
  scrollYProgress: any;
}) {
  const segmentSize = 1 / totalProducts;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;

  // Text scale: small → HUGE → small
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.2, end],
    [1, 1.5, 2.5, 1.5, 1]
  );

  // Move to center when active
  const x = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.2, end],
    ['0%', '20%', '30%', '20%', '0%']
  );

  // Opacity boost when active
  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.1, mid, end - segmentSize * 0.1, end],
    [0.3, 1, 1, 1, 0.3]
  );

  // Color change when active
  const color = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.2, end],
    ['rgba(255,255,255,0.4)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.4)']
  );

  return (
    <motion.a
      href={material.href}
      className="block origin-left"
      style={{ scale, x, opacity }}
    >
      <div className="flex items-baseline gap-4">
        <motion.span 
          className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight"
          style={{ color }}
        >
          {material.name}
        </motion.span>
        <motion.span 
          className="text-sm tracking-wide"
          style={{ color }}
        >
          [{material.subtitle}]
        </motion.span>
      </div>
    </motion.a>
  );
}
