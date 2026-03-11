import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useMotionValue, useSpring, motion, useScroll } from 'framer-motion';

function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseEnter = () => {
      setIsHovering(true);
    };
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    window.addEventListener("mousemove", moveCursor);
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover');
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference",
        style: {
          x: cursorXSpring,
          y: cursorYSpring
        },
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
            animate: {
              width: isHovering ? 60 : 12,
              height: isHovering ? 60 : 12
            },
            transition: { duration: 0.2, ease: "easeOut" }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "fixed top-0 left-0 pointer-events-none z-[9998]",
        style: {
          x: cursorXSpring,
          y: cursorYSpring
        },
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30",
            animate: {
              width: isHovering ? 80 : 40,
              height: isHovering ? 80 : 40,
              opacity: isHovering ? 0.5 : 0.3
            },
            transition: { duration: 0.3, ease: "easeOut" }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      ` })
  ] });
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 1e-3
  });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed top-0 left-0 right-0 h-[3px] bg-[#8b7355] origin-left z-[100]",
      style: { scaleX }
    }
  );
}

export { CustomCursor as C, ScrollProgress as S };
