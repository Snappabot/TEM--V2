import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_v7mqCAwT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D3qCqjnZ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, useInView } from 'framer-motion';
export { renderers } from '../renderers.mjs';

function AnimatedHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  useEffect(() => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative h-screen overflow-hidden bg-black", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 will-change-auto", children: [
      /* @__PURE__ */ jsx(
        "video",
        {
          ref: videoRef,
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          preload: "auto",
          className: "w-full h-full object-cover",
          style: {
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "auto"
          },
          children: /* @__PURE__ */ jsx("source", { src: "/videos/hero.mp4", type: "video/mp4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [...Array(8)].map((_, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute w-1 h-1 bg-white/20 rounded-full",
        initial: {
          x: Math.random() * 100 + "%",
          y: "100%",
          opacity: 0
        },
        animate: {
          y: "-10%",
          opacity: [0, 0.4, 0]
        },
        transition: {
          duration: Math.random() * 15 + 15,
          repeat: Infinity,
          delay: Math.random() * 8,
          ease: "linear"
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        style: { opacity },
        className: "relative z-10 h-full flex flex-col justify-center items-center text-center px-6",
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 100 },
              animate: isLoaded ? { opacity: 1, y: 0 } : {},
              transition: { duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
              children: /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white", children: [
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "inline-block",
                    initial: { opacity: 0, x: -50 },
                    animate: isLoaded ? { opacity: 1, x: 0 } : {},
                    transition: { duration: 0.8, delay: 0.4 },
                    children: "Raw."
                  }
                ),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "inline-block bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent",
                    initial: { opacity: 0, x: 50 },
                    animate: isLoaded ? { opacity: 1, x: 0 } : {},
                    transition: { duration: 0.8, delay: 0.6 },
                    children: "Bold."
                  }
                ),
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    className: "inline-block",
                    initial: { opacity: 0, y: 50 },
                    animate: isLoaded ? { opacity: 1, y: 0 } : {},
                    transition: { duration: 0.8, delay: 0.8 },
                    children: "Uncompromising."
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              className: "mt-8 text-lg md:text-2xl text-white/70 max-w-2xl",
              initial: { opacity: 0, y: 30 },
              animate: isLoaded ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.8, delay: 1 },
              children: "Brutalist finishes for architects who refuse to settle."
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute bottom-10 left-1/2 -translate-x-1/2",
              initial: { opacity: 0 },
              animate: isLoaded ? { opacity: 1 } : {},
              transition: { delay: 2 },
              children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "w-6 h-10 border-2 border-white/30 rounded-full flex justify-center",
                  animate: { y: [0, 10, 0] },
                  transition: { duration: 2, repeat: Infinity },
                  children: /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      className: "w-1.5 h-3 bg-white/50 rounded-full mt-2",
                      animate: { opacity: [0.5, 1, 0.5], y: [0, 10, 0] },
                      transition: { duration: 2, repeat: Infinity }
                    }
                  )
                }
              )
            }
          )
        ]
      }
    )
  ] });
}

function ScrollZoomHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 3]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);
  const logoOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.9], [0, 1, 1]);
  const logoScale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  return /* @__PURE__ */ jsx("section", { ref: containerRef, className: "relative h-[400vh]", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-0 h-screen overflow-hidden bg-[#FAF9F6]", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 z-0",
        style: { scale: bgScale },
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/giorgi-city-beach.jpg",
            alt: "",
            className: "w-full h-full object-cover"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center z-20 pointer-events-none", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        style: {
          scale: textScale,
          opacity: textOpacity,
          y: textY
        },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsx("h1", { className: "font-serif text-6xl md:text-8xl lg:text-9xl text-[#1a1a1a] tracking-tight leading-none", children: "TROWELED" }),
          /* @__PURE__ */ jsx("h1", { className: "font-serif text-6xl md:text-8xl lg:text-9xl text-[#1a1a1a] tracking-tight leading-none italic", children: "Earth." })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute inset-0 flex items-center justify-center z-15 pointer-events-none",
        style: { opacity: logoOpacity, scale: logoScale },
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/logo.png",
            alt: "Troweled Earth",
            className: "w-48 md:w-64 lg:w-80 h-auto"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute bottom-8 right-8 text-xs tracking-widest text-[#1a1a1a]/60 z-20",
        children: "MAT: MARBELLINO // LOC: MELBOURNE"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-20",
        style: { opacity: textOpacity },
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "w-px h-12 bg-[#1a1a1a]",
            animate: { scaleY: [1, 0.5, 1] },
            transition: { duration: 2, repeat: Infinity }
          }
        )
      }
    )
  ] }) });
}

function ScrollZoomStatement() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const scale1 = useTransform(scrollYProgress, [0, 0.3, 0.5], [2, 1, 0.9]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.5], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.2, 0.5, 0.7], [2, 1, 0.9]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.7], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.4, 0.7, 0.9], [2, 1, 0.9]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.55, 0.8, 0.9], [0, 1, 1, 0]);
  return /* @__PURE__ */ jsx("section", { ref: containerRef, className: "relative h-[300vh] bg-[#1a1a1a]", children: /* @__PURE__ */ jsx("div", { className: "sticky top-0 h-screen flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 md:px-12 text-center", children: [
    /* @__PURE__ */ jsx(
      motion.p,
      {
        className: "font-serif text-3xl md:text-5xl lg:text-6xl text-[#FAF9F6] leading-tight mb-4 md:mb-6",
        style: { scale: scale1, opacity: opacity1 },
        children: "We do not paint walls."
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        className: "font-serif text-3xl md:text-5xl lg:text-6xl text-[#FAF9F6] leading-tight mb-4 md:mb-6 italic",
        style: { scale: scale2, opacity: opacity2 },
        children: "We sculpt atmosphere."
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        className: "font-serif text-xl md:text-2xl lg:text-3xl text-[#FAF9F6]/70 leading-relaxed max-w-3xl mx-auto",
        style: { scale: scale3, opacity: opacity3 },
        children: "In a world of flat surfaces and digital noise, textural depth is the only true luxury."
      }
    )
  ] }) }) });
}

const materials = [
  {
    name: "MARBELLINO",
    subtitle: "Venetian // High Polish",
    image: "/images/products/marbellino/Marbellino+state+of+kin.jpg",
    href: "/products/marbellino"
  },
  {
    name: "CONCRETUM",
    subtitle: "Raw Concrete // Matte",
    image: "/images/products/concretum/Concretum+stairs.png",
    href: "/products/concretum"
  },
  {
    name: "METALS",
    subtitle: "Copper, Brass, Steel",
    image: "/images/products/metallics/Troweled+Metal+copper.jpg",
    href: "/products/metallics"
  },
  {
    name: "ROKKA",
    subtitle: "Textured Stone // Natural",
    image: "/images/products/rokka/Roka+pilbara.png",
    href: "/products/rokka"
  },
  {
    name: "TADELAKT",
    subtitle: "Moroccan // Waterproof",
    image: "/images/products/tadelakt/Tadelakt+moody+shower.jpg",
    href: "/products/tadelakt"
  },
  {
    name: "CUSTOM",
    subtitle: "Your Vision // Our Craft",
    image: "/images/products/custom-finishes/Custom+lunar+bedroom.jpg",
    href: "/products/custom-finishes"
  },
  {
    name: "NATURAL",
    subtitle: "Hemp // Clay // Lime",
    image: "/images/arch-plaster-render.jpg",
    href: "/products/natural-plasters"
  }
];
function MaterialLibrary() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  return /* @__PURE__ */ jsx(
    "section",
    {
      ref: containerRef,
      className: "relative bg-[#1a1a1a]",
      style: { height: `${materials.length * 500}vh` },
      children: /* @__PURE__ */ jsxs("div", { className: "sticky top-0 h-screen overflow-hidden", children: [
        materials.map((material, index) => /* @__PURE__ */ jsx(
          ZoomingBackground,
          {
            material,
            index,
            totalProducts: materials.length,
            scrollYProgress
          },
          `bg-${index}`
        )),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 z-10" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-20 h-full flex flex-col justify-center px-6 md:px-12", children: [
          /* @__PURE__ */ jsx("span", { className: "label text-white/50 mb-8", children: "The Material Library" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: materials.map((material, index) => /* @__PURE__ */ jsx(
            ProductItem,
            {
              material,
              index,
              totalProducts: materials.length,
              scrollYProgress
            },
            index
          )) })
        ] })
      ] })
    }
  );
}
function ZoomingBackground({
  material,
  index,
  totalProducts,
  scrollYProgress
}) {
  const segmentSize = 1 / totalProducts;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, mid, end - segmentSize * 0.1, end],
    [1, 1.8, 2.5, 2, 1.2]
  );
  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.15, mid, end - segmentSize * 0.15, end],
    [0, 1, 1, 1, 0]
  );
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "absolute inset-0 z-0",
      style: { opacity },
      children: /* @__PURE__ */ jsx(
        motion.img,
        {
          src: material.image,
          alt: "",
          className: "w-full h-full object-cover",
          style: { scale }
        }
      )
    }
  );
}
function ProductItem({
  material,
  index,
  totalProducts,
  scrollYProgress
}) {
  const segmentSize = 1 / totalProducts;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.2, end],
    [1, 1.5, 2.5, 1.5, 1]
  );
  const x = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.2, end],
    ["0%", "20%", "30%", "20%", "0%"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.1, mid, end - segmentSize * 0.1, end],
    [0.3, 1, 1, 1, 0.3]
  );
  const color = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, mid, end - segmentSize * 0.2, end],
    ["rgba(255,255,255,0.4)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,0.4)"]
  );
  return /* @__PURE__ */ jsx(
    motion.a,
    {
      href: material.href,
      className: "block origin-left",
      style: { scale, x, opacity },
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4", children: [
        /* @__PURE__ */ jsx(
          motion.span,
          {
            className: "font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight",
            style: { color },
            children: material.name
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.span,
          {
            className: "text-sm tracking-wide",
            style: { color },
            children: [
              "[",
              material.subtitle,
              "]"
            ]
          }
        )
      ] })
    }
  );
}

const projects = [
  {
    title: "THE QUIET HOUSE",
    location: "Brighton, VIC",
    material: "Marbellino",
    image: "/images/products/marbellino/Marbellino+entry.png",
    year: "2024"
  },
  {
    title: "PATINA",
    location: "South Yarra, VIC",
    material: "Concretum + Metals",
    image: "/images/products/metallics/Troweled+Metal+copper+4.png",
    year: "2024"
  },
  {
    title: "EARTHEN RETREAT",
    location: "Claremont, WA",
    material: "Rokka",
    image: "/images/products/rokka/Roka+ceiling+moody.png",
    year: "2023"
  }
];
function FeaturedWork() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return /* @__PURE__ */ jsxs("section", { ref: containerRef, className: "py-24 md:py-32 px-6 md:px-12 bg-[#FAF9F6] overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        ref: headerRef,
        className: "flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24",
        style: { y: headerY, opacity: headerOpacity },
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              motion.span,
              {
                className: "label block mb-4",
                initial: { opacity: 0, y: 20 },
                animate: isHeaderInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.6 },
                children: "Selected Projects"
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.h2,
              {
                className: "heading-lg text-[#1a1a1a]",
                initial: { opacity: 0, y: 40 },
                animate: isHeaderInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.8, delay: 0.1 },
                children: [
                  "FEATURED",
                  /* @__PURE__ */ jsx("br", {}),
                  "WORK."
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            motion.span,
            {
              className: "label mt-4 md:mt-0",
              initial: { opacity: 0 },
              animate: isHeaderInView ? { opacity: 1 } : {},
              transition: { delay: 0.5 },
              children: [
                "Sculptural Surfaces",
                /* @__PURE__ */ jsx("br", {}),
                "2021 — 2026"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8", children: [
      /* @__PURE__ */ jsx(ProjectCard, { project: projects[0], large: true, index: 0 }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-5 flex flex-col gap-6 md:gap-8", children: projects.slice(1).map((project, index) => /* @__PURE__ */ jsx(ProjectCard, { project, index: index + 1 }, index)) })
    ] })
  ] });
}
function ProjectCard({
  project,
  large = false,
  index
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);
  return /* @__PURE__ */ jsxs(
    motion.a,
    {
      ref,
      href: "/projects",
      className: `group ${large ? "md:col-span-7" : ""}`,
      initial: { opacity: 0, y: 60 },
      animate: isInView ? { opacity: 1, y: 0 } : {},
      transition: { delay: 0.15 * index, duration: 0.8 },
      children: [
        /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden mb-4 ${large ? "aspect-[4/3]" : "aspect-[16/10]"}`, children: [
          /* @__PURE__ */ jsx(
            motion.img,
            {
              src: project.image,
              alt: project.title,
              className: "w-full h-full object-cover",
              style: { y: imageY, scale: imageScale }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: `absolute bottom-4 md:bottom-6 right-4 md:right-6 arrow-btn bg-white/90 ${large ? "" : "w-10 h-10"}`,
              initial: { scale: 0, rotate: -45 },
              animate: isInView ? { scale: 1, rotate: 0 } : {},
              transition: { delay: 0.3 + 0.1 * index, type: "spring" },
              whileHover: { scale: 1.1 },
              children: /* @__PURE__ */ jsx("span", { className: large ? "text-lg" : "", children: "↗" })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              children: /* @__PURE__ */ jsx("h3", { className: `text-white font-serif ${large ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"} tracking-tight`, children: project.title })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              motion.h3,
              {
                className: `font-serif text-[#1a1a1a] group-hover:italic transition-all duration-300 ${large ? "text-2xl md:text-3xl" : "text-xl"}`,
                whileHover: { x: 5 },
                children: project.title
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: `text-stone-500 mt-1 ${large ? "text-sm" : "text-xs"}`, children: [
              project.material,
              " // ",
              project.location
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "label text-xs", children: project.year })
        ] })
      ]
    }
  );
}

const BEHOLD_FEED_ID = "kukf4pCxjEVWGXm3wGB0";
function BeholdFeed() {
  useEffect(() => {
    if (!document.querySelector('script[src*="behold.so"]')) {
      const script = document.createElement("script");
      script.src = "https://w.behold.so/widget.js";
      script.type = "module";
      document.head.appendChild(script);
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("behold-widget", { "feed-id": BEHOLD_FEED_ID }) });
}
function InstagramFeed() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx("section", { ref, className: "w-full py-24 bg-[#0a0a0a]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "text-center mb-12",
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.instagram.com/troweled_earth_melbourne/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2 text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 hover:text-white transition-colors duration-300",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" }) }),
                "@troweled_earth_melbourne"
              ]
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-bold text-white mb-4", children: "Follow Our Work" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/50 max-w-xl mx-auto text-sm", children: "Latest projects, finishes and behind-the-scenes direct from Instagram" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay: 0.2 },
        children: /* @__PURE__ */ jsx(BeholdFeed, {}) 
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "text-center mt-12",
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { delay: 0.5 },
        children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://www.instagram.com/troweled_earth_melbourne/",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 group",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 transition-transform group-hover:scale-110", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.w6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) }),
              "View on Instagram"
            ]
          }
        )
      }
    )
  ] }) });
}

function EditorialContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsx("section", { ref, className: "section-dark py-24 md:py-32 px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "mb-24 md:mb-32",
        initial: { opacity: 0, y: 40 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.8 },
        children: [
          /* @__PURE__ */ jsx("span", { className: "label block mb-6", children: "Begin Your Project" }),
          /* @__PURE__ */ jsxs("h2", { className: "heading-lg text-[#FAF9F6] max-w-4xl", children: [
            "Let's create something",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "italic", children: "extraordinary." })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              href: "mailto:matt-troweledearth@outlook.com",
              className: "inline-flex items-center gap-4 mt-8 group",
              whileHover: { x: 10 },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg text-[#FAF9F6]", children: "Get in touch" }),
                /* @__PURE__ */ jsx("span", { className: "arrow-btn border-[#FAF9F6] text-[#FAF9F6] group-hover:bg-[#FAF9F6] group-hover:text-[#1a1a1a]", children: "→" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "mb-16 pb-16 border-b border-white/10",
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: { delay: 0.15 },
        children: [
          /* @__PURE__ */ jsx("span", { className: "label block mb-4", children: "Our Story" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/70 max-w-3xl text-lg leading-relaxed", children: "Established in 2002 in Perth, Western Australia, Troweled Earth have created a unique and customisable product range — from Venetian plaster and textured renders to concrete finishes and stucco. A household name associated with style and class in design aesthetics. Now expanding into Melbourne, offering training, product sales, and personalised application services." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-t border-white/10 pt-12", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { delay: 0.2 },
          children: [
            /* @__PURE__ */ jsx("span", { className: "label block mb-4", children: "Contact" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-white/70", children: [
              /* @__PURE__ */ jsx("p", { children: "Matt" }),
              /* @__PURE__ */ jsx("a", { href: "tel:0439243055", className: "block hover:text-white transition-colors", children: "0439 243 055" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:matt-troweledearth@outlook.com", className: "block hover:text-white transition-colors", children: "matt-troweledearth@outlook.com" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { delay: 0.3 },
          children: [
            /* @__PURE__ */ jsx("span", { className: "label block mb-4", children: "Location" }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-white/70", children: [
              /* @__PURE__ */ jsx("p", { children: "Melbourne, Victoria" }),
              /* @__PURE__ */ jsx("p", { children: "Australia" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { delay: 0.4 },
          children: [
            /* @__PURE__ */ jsx("span", { className: "label block mb-4", children: "Follow" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 text-sm text-white/70", children: /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://instagram.com/troweled_earth_melbourne",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block hover:text-white transition-colors",
                children: "Instagram"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "md:text-right",
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { delay: 0.5 },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/logo.png",
                alt: "Troweled Earth",
                className: "w-10 h-auto mb-4 md:ml-auto invert opacity-90"
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-white/50", children: [
              "© 2024 Troweled Earth Melbourne",
              /* @__PURE__ */ jsx("br", {}),
              "All rights reserved"
            ] })
          ]
        }
      )
    ] })
  ] }) });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Troweled Earth Melbourne | Artisan Plaster Finishes" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AnimatedHero", AnimatedHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/AnimatedHero", "client:component-export": "default" })}  ${renderComponent($$result2, "ScrollZoomStatement", ScrollZoomStatement, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/ScrollZoomStatement", "client:component-export": "default" })}  ${renderComponent($$result2, "ScrollZoomHero", ScrollZoomHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/ScrollZoomHero", "client:component-export": "default" })}  ${renderComponent($$result2, "MaterialLibrary", MaterialLibrary, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/MaterialLibrary", "client:component-export": "default" })}  ${renderComponent($$result2, "FeaturedWork", FeaturedWork, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/FeaturedWork", "client:component-export": "default" })}  ${renderComponent($$result2, "InstagramFeed", InstagramFeed, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/InstagramFeed", "client:component-export": "default" })}  ${renderComponent($$result2, "EditorialContact", EditorialContact, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/EditorialContact", "client:component-export": "default" })} ` })}`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/index.astro", void 0);

const $$file = "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
