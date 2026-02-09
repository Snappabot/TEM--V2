import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function EditorialContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-dark py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <motion.div
          className="mb-24 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="label block mb-6">Begin Your Project</span>
          <h2 className="heading-lg text-[#FAF9F6] max-w-4xl">
            Let's create something<br />
            <span className="italic">extraordinary.</span>
          </h2>
          
          <motion.a
            href="mailto:matt-troweledearth@outlook.com"
            className="inline-flex items-center gap-4 mt-8 group"
            whileHover={{ x: 10 }}
          >
            <span className="text-lg text-[#FAF9F6]">Get in touch</span>
            <span className="arrow-btn border-[#FAF9F6] text-[#FAF9F6] group-hover:bg-[#FAF9F6] group-hover:text-[#1a1a1a]">
              →
            </span>
          </motion.a>
        </motion.div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-t border-white/10 pt-12">
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="label block mb-4">Contact</span>
            <div className="space-y-2 text-sm text-white/70">
              <p>Matt</p>
              <a href="tel:0439243055" className="block hover:text-white transition-colors">
                0439 243 055
              </a>
              <a href="mailto:matt-troweledearth@outlook.com" className="block hover:text-white transition-colors">
                matt-troweledearth@outlook.com
              </a>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <span className="label block mb-4">Location</span>
            <div className="text-sm text-white/70">
              <p>Melbourne, Victoria</p>
              <p>Australia</p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <span className="label block mb-4">Follow</span>
            <div className="space-y-2 text-sm text-white/70">
              <a 
                href="https://instagram.com/troweled_earth_melbourne" 
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </motion.div>

          {/* Logo & copyright */}
          <motion.div
            className="md:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <img 
              src="/TEM--V2/images/logo.png" 
              alt="Troweled Earth" 
              className="w-10 h-auto mb-4 md:ml-auto invert opacity-90"
            />
            <p className="text-xs text-white/50">
              © 2024 Troweled Earth Melbourne<br />
              All rights reserved
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
