import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Finishes', href: '/#finishes' },
  { label: 'Projects', href: '/projects' },
  { label: 'Our Story', href: '/story' },
  { label: 'Training', href: '/training' },
  { label: 'Applicators', href: '/applicators' },
  { label: 'Where to Buy', href: '/suppliers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Visualizer', href: '/visualizer' },
  { label: 'Contact', href: '/#contact' },
];

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

const menuContainerVariants = {
  hidden: { y: '-100%' },
  visible: { 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    y: '-100%',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -20,
    transition: {
      delay: i * 0.03,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const footerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { delay: 0.7, duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="Troweled Earth" 
              className="h-10 object-contain" 
              style={{ filter: 'invert(1)' }} 
            />
            <span className="hidden md:block label">Est. 2002</span>
          </a>

          {/* Menu Button */}
          <motion.button 
            className="menu-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            MENU
          </motion.button>
        </div>
      </header>

      {/* Fullscreen Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0a0a0a]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="h-full w-full flex flex-col"
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 md:px-12 py-6">
                {/* Logo in menu */}
                <a 
                  href="/" 
                  className="flex items-center gap-3"
                  onClick={closeMenu}
                >
                  <img 
                    src="/images/logo.png" 
                    alt="Troweled Earth" 
                    className="h-10 object-contain invert" 
                  />
                  <span className="hidden md:block text-white text-sm tracking-widest uppercase">Est. 2002</span>
                </a>

                {/* Close Button */}
                <motion.button
                  className="text-white text-sm tracking-widest uppercase font-medium hover:text-[#8b7355] transition-colors duration-300"
                  onClick={closeMenu}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  CLOSE
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-center items-center px-6 md:px-12">
                <ul className="space-y-2 md:space-y-4 text-center">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.label}
                      custom={i}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight hover:text-[#8b7355] transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Menu Footer */}
              <motion.div
                className="px-6 md:px-12 py-8 flex items-center justify-between"
                variants={footerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Est. text */}
                <span className="text-white/50 text-sm tracking-widest uppercase">
                  Est. 2002 · Melbourne
                </span>

                {/* Instagram Link */}
                <a
                  href="https://instagram.com/troweledearth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#8b7355] transition-colors duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
