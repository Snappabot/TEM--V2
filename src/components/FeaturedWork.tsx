import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'THE QUIET HOUSE',
    location: 'Brighton, VIC',
    material: 'Marbellino',
    image: '/TEM--V2/images/products/marbellino/Marbellino+entry.png',
    year: '2024'
  },
  {
    title: 'PATINA',
    location: 'South Yarra, VIC',
    material: 'Concretum + Metals',
    image: '/TEM--V2/images/products/metallics/Troweled+Metal+copper+4.png',
    year: '2024'
  },
  {
    title: 'EARTHEN RETREAT',
    location: 'Portsea, VIC',
    material: 'Rokka',
    image: '/TEM--V2/images/products/rokka/Roka+ceiling+moody.png',
    year: '2023'
  },
];

export default function FeaturedWork() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for header
  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 bg-[#FAF9F6] overflow-hidden">
      {/* Header with parallax */}
      <motion.div 
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div>
          <motion.span 
            className="label block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Selected Projects
          </motion.span>
          <motion.h2 
            className="heading-lg text-[#1a1a1a]"
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            FEATURED<br />WORK.
          </motion.h2>
        </div>
        
        <motion.span 
          className="label mt-4 md:mt-0"
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Sculptural Surfaces<br />2021 — 2026
        </motion.span>
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* First project - large with parallax */}
        <ProjectCard project={projects[0]} large index={0} />

        {/* Second and third projects - stacked */}
        <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
          {projects.slice(1).map((project, index) => (
            <ProjectCard key={index} project={project} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ 
  project, 
  large = false, 
  index 
}: { 
  project: typeof projects[0]; 
  large?: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Image parallax - moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  return (
    <motion.a
      ref={ref}
      href="/TEM--V2/projects"
      className={`group ${large ? 'md:col-span-7' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 * index, duration: 0.8 }}
    >
      <div className={`relative overflow-hidden mb-4 ${large ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <motion.img 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ y: imageY, scale: imageScale }}
        />
        <motion.div 
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" 
        />
        
        {/* Arrow button */}
        <motion.div 
          className={`absolute bottom-4 md:bottom-6 right-4 md:right-6 arrow-btn bg-white/90 ${large ? '' : 'w-10 h-10'}`}
          initial={{ scale: 0, rotate: -45 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.3 + 0.1 * index, type: "spring" }}
          whileHover={{ scale: 1.1 }}
        >
          <span className={large ? 'text-lg' : ''}>↗</span>
        </motion.div>

        {/* Title overlay on image */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <h3 className={`text-white font-serif ${large ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'} tracking-tight`}>
            {project.title}
          </h3>
        </motion.div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <motion.h3 
            className={`font-serif text-[#1a1a1a] group-hover:italic transition-all duration-300 ${large ? 'text-2xl md:text-3xl' : 'text-xl'}`}
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          <p className={`text-stone-500 mt-1 ${large ? 'text-sm' : 'text-xs'}`}>
            {project.material} // {project.location}
          </p>
        </div>
        <span className="label text-xs">{project.year}</span>
      </div>
    </motion.a>
  );
}
