import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({ 
  children, 
  className = '',
  strength = 0.3,
  href,
  onClick
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={`relative overflow-hidden group ${className}`}
      >
        {/* Button content */}
        <span className="relative z-10">{children}</span>
        
        {/* Hover fill effect */}
        <motion.span
          className="absolute inset-0 bg-[#8b7355] z-0"
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </Component>
    </motion.div>
  );
}

// Animated arrow for CTAs
export function AnimatedArrow({ className = '' }: { className?: string }) {
  return (
    <motion.svg 
      className={`w-5 h-5 ${className}`}
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <motion.path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M17 8l4 4m0 0l-4 4m4-4H3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.svg>
  );
}

// Rounded magnetic button variant
export function RoundedMagneticButton({ 
  children, 
  className = '',
  href,
  onClick
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = (clientX - left - width / 2) * 0.4;
    const y = (clientY - top - height / 2) * 0.4;
    
    setPosition({ x, y });
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={`
          relative flex items-center justify-center
          w-14 h-14 rounded-full
          bg-white/10 border border-white/20
          hover:bg-white/20 hover:border-white/30
          transition-colors duration-300
          ${className}
        `}
      >
        {children}
      </Component>
    </motion.div>
  );
}
