import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const products = [
  { 
    name: 'Marbellino', 
    slug: 'marbellino',
    tagline: 'Natural stone look without the stone price tag',
    description: 'Versatile acrylic-based venetian plaster. UV stable, suitable for internal and external walls including bathrooms. Endless colour options.',
    image: '/TEM-website/images/products/marbellino.png',
    color: '#8b7355'
  },
  { 
    name: 'Concretum', 
    slug: 'concretum',
    tagline: 'Washed patina with perfect imperfections',
    description: 'Grey base pitted and trowelled, overlaid with black patina highlighting cracks for a natural, rugged industrial aesthetic.',
    image: '/TEM-website/images/products/concretum.png',
    color: '#6b6b6b'
  },
  { 
    name: 'Rokka', 
    slug: 'rokka',
    tagline: 'Micro cement, maximum durability',
    description: 'High cement content for extreme durability. 2-5mm thickness. Pitted, smooth or sand finish. Less shrinkage than traditional micro cement.',
    image: '/TEM-website/images/products/rokka.png',
    color: '#a67c52'
  },
  { 
    name: 'Tadelakt', 
    slug: 'tadelakt',
    tagline: 'Moroccan luxury, modern durability',
    description: 'Traditional Moroccan plastering reimagined. Water-resistant, UV stable acrylic-based formula. Smooth polished finish, internal and external.',
    image: '/TEM-website/images/products/tadelakt.png',
    color: '#4a7c59'
  },
  { 
    name: 'Antique Stucco', 
    slug: 'antique-stucco',
    tagline: 'Southern European aged elegance',
    description: 'Smooth, subtle aged appearance like houses throughout Southern Europe. Natural product that continues to age with character and charm.',
    image: '/TEM-website/images/products/antique-stucco.png',
    color: '#c9b896'
  },
  { 
    name: 'Metallics', 
    slug: 'metallics',
    tagline: 'True copper, steel, bronze, brass & rust',
    description: 'Premium range with real metal shavings. True Copper develops natural patina over time. Industrial luxury for statement walls.',
    image: '/TEM-website/images/products/metallics.png',
    color: '#b87333'
  },
  { 
    name: 'Earthen Renders', 
    slug: 'earthen-renders',
    tagline: 'Hemp, lime, clay - sustainable textures',
    description: 'Natural beneficial plasters made with hemp, lime, clay and sustainable materials. Improve air quality while looking stunning.',
    image: '/TEM-website/images/products/earthen-renders.png',
    color: '#b8956b'
  },
  { 
    name: 'Custom Finishes', 
    slug: 'custom-finishes',
    tagline: 'Your vision, our craft',
    description: 'Bespoke finishes tailored to your project. Work directly with our team to create something truly unique.',
    image: '/TEM-website/images/products/custom-finishes.png',
    color: '#2d2d2d'
  },
];

function ProductCard({ product, index }: { product: typeof products[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.a
      href={`/TEM-website/products/${product.slug}`}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative aspect-square overflow-hidden cursor-pointer block"
      style={{ backgroundColor: product.color }}
    >
      {/* Image with zoom effect */}
      <motion.img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Glassmorphism card on hover */}
      <motion.div 
        className="absolute inset-4 flex flex-col justify-end p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
        initial={false}
      >
        <motion.h3 
          className="text-2xl md:text-3xl font-bold text-white mb-2"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
        >
          {product.name}
        </motion.h3>
        <p className="text-white/90 text-sm font-medium mb-2">{product.tagline}</p>
        <p className="text-white/60 text-xs mb-4 line-clamp-3">{product.description}</p>
        <motion.div 
          className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-widest"
          whileHover={{ x: 5 }}
        >
          <span>Learn More</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Default state text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
        <p className="text-white/60 text-sm">{product.tagline}</p>
      </div>
    </motion.a>
  );
}

export default function ProductGrid() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  return (
    <section id="finishes" className="w-full py-24 md:py-32 bg-[#f5f5f0]">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-sm uppercase tracking-[0.3em] text-stone-500 mb-4 block"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Our Finishes
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a]">
            Crafted Surfaces
          </h2>
          <motion.div 
            className="w-24 h-1 bg-[#8b7355] mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>
        
        {/* Grid - 4 columns on large screens for 8 products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
        
        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="/finishes" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#2d2d2d] transition-colors"
          >
            <span>View All Finishes</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
