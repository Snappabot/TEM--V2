import { d as createAstro, c as createComponent, e as addAttribute, b as renderScript, a as renderTemplate, r as renderComponent, i as renderHead, j as renderSlot } from './astro/server_v7mqCAwT.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const $$Astro$1 = createAstro("https://www.troweledearthmelbourne.com.au");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/node_modules/astro/components/ClientRouter.astro", void 0);

const navLinks = [
  { label: "Finishes", href: "/#finishes" },
  { label: "Projects", href: "/projects" },
  { label: "Our Story", href: "/story" },
  { label: "Training", href: "/training" },
  { label: "Applicators", href: "/applicators" },
  { label: "Where to Buy", href: "/suppliers" },
  { label: "Blog", href: "/blog" },
  { label: "Visualizer", href: "/visualizer" },
  { label: "Contact", href: "/#contact" }
];
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
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};
const navItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }),
  exit: (i) => ({
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
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("a", { href: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/logo.png",
            alt: "Troweled Earth",
            className: "h-10 object-contain",
            style: { filter: "invert(1)" }
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "hidden md:block label", children: "Est. 2002" })
      ] }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          className: "menu-btn",
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          onClick: toggleMenu,
          "aria-expanded": isMenuOpen,
          "aria-label": isMenuOpen ? "Close menu" : "Open menu",
          children: "MENU"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isMenuOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "fixed inset-0 z-[100] bg-[#0a0a0a]",
        variants: overlayVariants,
        initial: "hidden",
        animate: "visible",
        exit: "exit",
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "h-full w-full flex flex-col",
            variants: menuContainerVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 md:px-12 py-6", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "/",
                    className: "flex items-center gap-3",
                    onClick: closeMenu,
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "/images/logo.png",
                          alt: "Troweled Earth",
                          className: "h-10 object-contain invert"
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "hidden md:block text-white text-sm tracking-widest uppercase", children: "Est. 2002" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.button,
                  {
                    className: "text-white text-sm tracking-widest uppercase font-medium hover:text-[#8b7355] transition-colors duration-300",
                    onClick: closeMenu,
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    "aria-label": "Close menu",
                    children: "CLOSE"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("nav", { className: "flex-1 flex flex-col justify-center items-center px-6 md:px-12", children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 md:space-y-4 text-center", children: navLinks.map((link, i) => /* @__PURE__ */ jsx(
                motion.li,
                {
                  custom: i,
                  variants: navItemVariants,
                  initial: "hidden",
                  animate: "visible",
                  exit: "exit",
                  children: /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: link.href,
                      onClick: closeMenu,
                      className: "block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight hover:text-[#8b7355] transition-colors duration-300",
                      children: link.label
                    }
                  )
                },
                link.label
              )) }) }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "px-6 md:px-12 py-8 flex items-center justify-between",
                  variants: footerVariants,
                  initial: "hidden",
                  animate: "visible",
                  exit: "exit",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-white/50 text-sm tracking-widest uppercase", children: "Est. 2002 · Melbourne" }),
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "https://instagram.com/troweledearth",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "text-white hover:text-[#8b7355] transition-colors duration-300",
                        "aria-label": "Follow us on Instagram",
                        children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                              /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }),
                              /* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
                              /* @__PURE__ */ jsx("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
                            ]
                          }
                        )
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      }
    ) })
  ] });
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "G'day! 👋 I'm the Troweled Earth assistant. I can help you find the perfect plaster finish for your project.\n\nWhat are you working on today?",
      timestamp: /* @__PURE__ */ new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [leadInfo, setLeadInfo] = useState({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId,
          conversationHistory: messages
        })
      });
      const data = await response.json();
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }
      if (data.leadInfo) {
        setLeadInfo((prev) => ({ ...prev, ...data.leadInfo }));
      }
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      if (messages.length >= 4 && !leadInfo.email) {
        setTimeout(() => setShowLeadForm(true), 2e3);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting. Please try again or contact us directly at 0439 243 055.",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/chat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadInfo,
          sessionId,
          productsInterested: messages.filter((m) => m.role === "assistant").flatMap((m) => {
            const matches = m.content.match(/\*\*([A-Za-z\s]+)\*\*/g);
            return matches ? matches.map((m2) => m2.replace(/\*\*/g, "")) : [];
          })
        })
      });
      if (!response.ok) {
        throw new Error("Failed to save lead");
      }
    } catch (error) {
      console.error("Lead save error:", error);
    }
    setShowLeadForm(false);
    const thankYouMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: `Thanks ${leadInfo.name || "for your details"}! 🎉 We'll be in touch soon to discuss your project. In the meantime, feel free to keep asking questions!`,
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, thankYouMessage]);
  };
  const quickQuestions = [
    "What's best for bathrooms?",
    "Tell me about Marbellino",
    "Can I get a quote?",
    "Do you offer training?"
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: () => setIsOpen(true),
        className: `fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#8b7355] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#a68b6a] transition-colors ${isOpen ? "hidden" : ""}`,
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
        className: "fixed inset-4 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[440px] sm:h-[700px]",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-10 left-1/2 -translate-x-1/2 z-10 hidden sm:block", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/jose-chat-avatar.png",
              alt: "Jose",
              className: "w-20 h-20 rounded-full object-cover border-4 border-[#8b7355] shadow-lg bg-white"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full sm:mt-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-[#1a1a1a] text-white pt-4 sm:pt-8 pb-4 px-5 flex items-center justify-between relative", children: [
              /* @__PURE__ */ jsx("div", { className: "sm:hidden mr-3", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/jose-chat-avatar.png",
                  alt: "Jose",
                  className: "w-12 h-12 rounded-full object-cover border-2 border-[#8b7355] bg-white"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg sm:text-xl sm:text-center", children: "Jose from Troweled Earth" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-white/60 sm:text-center", children: "Ask me anything" })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsOpen(false),
                  className: "text-white/60 hover:text-white transition-colors p-2",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-[#f5f5f0]", children: [
              messages.map((msg) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `max-w-[80%] p-3 rounded-2xl ${msg.role === "user" ? "bg-[#8b7355] text-white rounded-br-md" : "bg-white text-[#1a1a1a] rounded-bl-md shadow-sm"}`,
                      children: /* @__PURE__ */ jsx(
                        "p",
                        {
                          className: "text-base whitespace-pre-wrap",
                          dangerouslySetInnerHTML: {
                            __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>")
                          }
                        }
                      )
                    }
                  )
                },
                msg.id
              )),
              isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-3 rounded-2xl rounded-bl-md shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-[#8b7355] rounded-full animate-bounce", style: { animationDelay: "0ms" } }),
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-[#8b7355] rounded-full animate-bounce", style: { animationDelay: "150ms" } }),
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-[#8b7355] rounded-full animate-bounce", style: { animationDelay: "300ms" } })
              ] }) }) }),
              /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
            ] }),
            messages.length <= 2 && /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 bg-white border-t border-[#f5f5f0]", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-[#1a1a1a]/50 mb-2", children: "Quick questions:" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: quickQuestions.map((q) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setInput(q),
                  className: "text-sm px-4 py-2 bg-[#f5f5f0] text-[#1a1a1a]/70 rounded-full hover:bg-[#8b7355] hover:text-white transition-colors",
                  children: q
                },
                q
              )) })
            ] }),
            showLeadForm && !leadInfo.email && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-[#8b7355]/10 border-t border-[#8b7355]/20", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#1a1a1a] mb-2", children: "📩 Get personalized recommendations" }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleLeadSubmit, className: "space-y-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Your name",
                    value: leadInfo.name || "",
                    onChange: (e) => setLeadInfo((prev) => ({ ...prev, name: e.target.value })),
                    className: "w-full px-3 py-2 text-sm rounded-lg border border-[#8b7355]/30 focus:outline-none focus:border-[#8b7355]"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    placeholder: "Your email",
                    value: leadInfo.email || "",
                    onChange: (e) => setLeadInfo((prev) => ({ ...prev, email: e.target.value })),
                    className: "w-full px-3 py-2 text-sm rounded-lg border border-[#8b7355]/30 focus:outline-none focus:border-[#8b7355]",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      className: "flex-1 px-3 py-2 bg-[#8b7355] text-white text-sm rounded-lg hover:bg-[#a68b6a] transition-colors",
                      children: "Send"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowLeadForm(false),
                      className: "px-3 py-2 text-[#1a1a1a]/50 text-sm hover:text-[#1a1a1a] transition-colors",
                      children: "Later"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("form", { onSubmit: sendMessage, className: "p-4 bg-white border-t border-[#f5f5f0]", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  placeholder: "Type your message...",
                  className: "flex-1 px-5 py-3 bg-[#f5f5f0] text-[#1a1a1a] rounded-full text-base focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 placeholder:text-[#1a1a1a]/50",
                  disabled: isLoading
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: !input.trim() || isLoading,
                  className: "w-10 h-10 bg-[#8b7355] text-white rounded-full flex items-center justify-center hover:bg-[#a68b6a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
                }
              )
            ] }) })
          ] })
        ]
      }
    ) })
  ] });
}

const $$Astro = createAstro("https://www.troweledearthmelbourne.com.au");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Raw. Bold. Brutal. Melbourne's artisan plaster finishes, born from the earth, troweled by hand.", hideHeader = false, hideChat = false } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><!-- Open Graph --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website">${renderComponent($$result, "ViewTransitions", $$ClientRouter, {})}<title>${title}</title>${renderHead()}</head> <body class="antialiased scroll-smooth w-full min-w-full bg-black text-white"> ${!hideHeader && renderTemplate`${renderComponent($$result, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/Header", "client:component-export": "default" })}`} <main class="w-full"> ${renderSlot($$result, $$slots["default"])} </main> ${!hideChat && renderTemplate`${renderComponent($$result, "ChatWidget", ChatWidget, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/ChatWidget/ChatWidget", "client:component-export": "default" })}`} </body></html>`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/layouts/Layout.astro", void 0);

export { $$Layout as $, Header as H };
