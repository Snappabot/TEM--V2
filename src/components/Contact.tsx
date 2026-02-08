import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  return (
    <section ref={ref} id="contact" className="py-32 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Centered */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.span>
          
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Let's Create Something<br />
            <span className="text-[#8b7355]">Extraordinary</span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to transform your space? Let's discuss your project and bring your vision to life.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side - Info */}
          <div>
            
            {/* Contact Details */}
            <motion.div
              className="space-y-6 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a 
                href="tel:0439243055" 
                className="group flex items-center gap-4 text-[#1a1a1a] hover:text-[#8b7355] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#8b7355] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm text-[#1a1a1a]/50 uppercase tracking-wider">Phone</span>
                  <span className="text-xl font-medium">0439 243 055</span>
                </div>
              </a>
              
              <a 
                href="mailto:matt-troweledearth@outlook.com" 
                className="group flex items-center gap-4 text-[#1a1a1a] hover:text-[#8b7355] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#8b7355] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm text-[#1a1a1a]/50 uppercase tracking-wider">Email</span>
                  <span className="text-lg font-medium">matt-troweledearth@outlook.com</span>
                </div>
              </a>
              
              <a 
                href="https://www.instagram.com/troweled_earth_melbourne/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[#1a1a1a] hover:text-[#8b7355] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#8b7355] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <span className="block text-sm text-[#1a1a1a]/50 uppercase tracking-wider">Instagram</span>
                  <span className="text-lg font-medium">@troweled_earth_melbourne</span>
                </div>
              </a>
            </motion.div>
          </div>
          
          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form 
              action="mailto:matt-troweledearth@outlook.com" 
              method="POST"
              encType="text/plain"
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {['firstName', 'lastName'].map((field) => (
                  <div key={field} className="relative">
                    <motion.label
                      className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                        focusedField === field ? 'text-xs -top-6 text-[#8b7355]' : 'text-base top-3 text-[#1a1a1a]/50'
                      }`}
                    >
                      {field === 'firstName' ? 'First Name' : 'Last Name'}
                    </motion.label>
                    <input
                      type="text"
                      name={field}
                      required
                      onFocus={() => setFocusedField(field)}
                      onBlur={(e) => !e.target.value && setFocusedField(null)}
                      className="w-full bg-transparent border-b-2 border-[#1a1a1a]/20 py-3 focus:border-[#8b7355] outline-none transition-colors text-[#1a1a1a]"
                    />
                  </div>
                ))}
              </div>
              
              <div className="relative">
                <motion.label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' ? 'text-xs -top-6 text-[#8b7355]' : 'text-base top-3 text-[#1a1a1a]/50'
                  }`}
                >
                  Email Address
                </motion.label>
                <input
                  type="email"
                  name="email"
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={(e) => !e.target.value && setFocusedField(null)}
                  className="w-full bg-transparent border-b-2 border-[#1a1a1a]/20 py-3 focus:border-[#8b7355] outline-none transition-colors text-[#1a1a1a]"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm text-[#1a1a1a]/50 uppercase tracking-wider mb-3">
                  I'm interested in
                </label>
                <select
                  name="interest"
                  required
                  className="w-full bg-transparent border-b-2 border-[#1a1a1a]/20 py-3 focus:border-[#8b7355] outline-none transition-colors text-[#1a1a1a] cursor-pointer"
                >
                  <option value="">Select an option...</option>
                  <option value="application">Application Services</option>
                  <option value="training">Training Programs</option>
                  <option value="products">Product Purchase</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
              
              <div className="relative">
                <motion.label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' ? 'text-xs -top-6 text-[#8b7355]' : 'text-base top-3 text-[#1a1a1a]/50'
                  }`}
                >
                  Tell us about your project
                </motion.label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  onFocus={() => setFocusedField('message')}
                  onBlur={(e) => !e.target.value && setFocusedField(null)}
                  className="w-full bg-transparent border-b-2 border-[#1a1a1a]/20 py-3 focus:border-[#8b7355] outline-none transition-colors resize-none text-[#1a1a1a]"
                />
              </div>
              
              <motion.button
                type="submit"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#8b7355] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Send Message</span>
                <motion.svg 
                  className="w-5 h-5"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  whileHover={{ x: 5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
