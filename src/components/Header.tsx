import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="/TEM--V2/" className="flex items-center gap-3">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 100 100" 
            className="text-[#1a1a1a]"
          >
            {/* Tree of Life Logo */}
            <g fill="currentColor">
              {/* Trunk */}
              <path d="M48 95 L48 60 Q48 55 50 55 Q52 55 52 60 L52 95 Z" />
              {/* Main branches */}
              <path d="M50 55 Q35 45 25 35 Q20 30 25 25 Q30 20 35 25 Q42 32 50 40" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M50 55 Q65 45 75 35 Q80 30 75 25 Q70 20 65 25 Q58 32 50 40" fill="none" stroke="currentColor" strokeWidth="3" />
              {/* Upper branches */}
              <path d="M35 30 Q25 20 20 10 Q18 5 22 5 Q28 5 35 15" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M65 30 Q75 20 80 10 Q82 5 78 5 Q72 5 65 15" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* Center branch */}
              <path d="M50 40 L50 10 Q50 5 50 8" fill="none" stroke="currentColor" strokeWidth="2.5" />
              {/* Small branches */}
              <path d="M50 25 Q40 18 35 12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50 25 Q60 18 65 12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Roots */}
              <path d="M48 95 Q40 98 35 95 Q30 92 35 90" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M52 95 Q60 98 65 95 Q70 92 65 90" fill="none" stroke="currentColor" strokeWidth="2" />
            </g>
          </svg>
          <span className="hidden md:block label">Est. 2018</span>
        </a>

        {/* Menu Button */}
        <motion.button 
          className="menu-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          MENU
        </motion.button>
      </div>
    </header>
  );
}
