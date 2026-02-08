import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-[#1a1a1a] text-[#FAF9F6] overflow-hidden min-h-screen">
      {/* Background image (changes on hover) with parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {materials.map((material, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredIndex === index ? 0.5 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ y: bgY }}
          >
            <img 
              src={material.image}
              alt=""
              className="w-full h-full object-cover scale-110"
            />
          </motion.div>
        ))}
        {/* Default background when nothing hovered */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hoveredIndex === null ? 0.15 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ y: bgY }}
        >
          <img 
            src="/TEM--V2/images/products/marbellino/Marbellino+stairs+2.png"
            alt=""
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>
      </div>

      <div className="relative z-10 px-6 md:px-12">
        {/* Section label */}
        <motion.span 
          className="label block mb-12 md:mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Material Library
        </motion.span>

        {/* Materials list */}
        <div className="space-y-2 md:space-y-4">
          {materials.map((material, index) => (
            <MaterialItem 
              key={index}
              material={material}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialItem({ 
  material, 
  index, 
  isHovered,
  onHover, 
  onLeave 
}: { 
  material: typeof materials[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={material.href}
      className="group flex items-baseline justify-between border-b border-white/10 py-4 md:py-6 block"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <motion.h3 
          className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight"
          animate={{ 
            x: isHovered ? 20 : 0,
            fontStyle: isHovered ? 'italic' : 'normal'
          }}
          transition={{ duration: 0.4 }}
        >
          {material.name}
        </motion.h3>
        <motion.span 
          className="hidden md:block text-sm text-white/50 tracking-wide"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          [{material.subtitle}]
        </motion.span>
      </div>
      
      {/* Arrow */}
      <motion.span 
        className="text-2xl md:text-3xl"
        animate={{ 
          x: isHovered ? 20 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}
