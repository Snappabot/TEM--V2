import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_v7mqCAwT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_D3qCqjnZ.mjs';
import { C as CustomCursor, S as ScrollProgress } from '../../chunks/ScrollProgress_CKVF3J0N.mjs';
import { A as AnimatedFooter } from '../../chunks/AnimatedFooter_DDJMlaug.mjs';
export { renderers } from '../../renderers.mjs';

const $$Rokka = createComponent(($$result, $$props, $$slots) => {
  const product = {
    name: "Rokka",
    tagline: "Micro Cement",
    description: "High-performance decorative wall coating for modern and classic architectural designs. Provides a smooth, slightly rustic finish with subtle undulations \u2014 versatile enough for halls, stairways, bathrooms, and living rooms.",
    image: "/images/products/rokka.png",
    features: [
      "Thick 2-5mm application for durability",
      "Smooth, rustic finish with subtle undulations",
      "Interior and exterior walls and ceilings",
      "Suitable for bathrooms and high-traffic areas",
      "Low VOC \u2014 Green Star compliant",
      "Non-combustible (AS 1530.1 certified)",
      "Custom colours available",
      "10-Year Limited Warranty"
    ],
    benefits: [
      "Versatile \u2014 works with modern AND classic designs",
      "Thick application provides superior durability",
      "Less shrinkage than traditional micro cement",
      "More stable and resistant to cracking",
      "Generous working time for quality application",
      "Perfect for hotels, restaurants, shops, showrooms",
      "Made in Western Australia"
    ],
    gallery: [
      { src: "/images/products/rokka/Roka+ceiling+moody.png", title: "Ceiling" },
      { src: "/images/products/rokka/Roka+outside.png", title: "Exterior" },
      { src: "/images/products/rokka/Roka+pilbara.png", title: "Pilbara" },
      { src: "/images/products/rokka/Roka+custom.png", title: "Custom Finish" },
      { src: "/images/products/rokka/Roka+warm+bone.png", title: "Warm Bone" },
      { src: "/images/products/rokka/Roka+ceiling.png", title: "Ceiling Detail" }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${product.name} | Troweled Earth Melbourne` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CustomCursor", CustomCursor, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/CustomCursor", "client:component-export": "default" })} ${renderComponent($$result2, "ScrollProgress", ScrollProgress, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/ScrollProgress", "client:component-export": "default" })} ${maybeRenderHead()}<section class="relative h-[70vh] min-h-[500px] flex items-end bg-[#0a0a0a] overflow-hidden"> <div class="absolute inset-0"> <img${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover opacity-60"> <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div> </div> <div class="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full"> <a href="/#finishes" class="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Back to Finishes
</a> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block">${product.tagline}</span> <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">${product.name}</h1> <p class="text-xl text-white/70 mt-6 max-w-2xl">${product.description}</p> </div> </section> <section class="py-24 bg-[#f5f5f0]"> <div class="max-w-7xl mx-auto px-6"> <div class="grid lg:grid-cols-2 gap-16"> <div> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block">Features</span> <h2 class="text-4xl font-bold text-[#1a1a1a] mb-8">Key Features</h2> <ul class="space-y-4"> ${product.features.map((feature) => renderTemplate`<li class="flex items-start gap-4"> <svg class="w-6 h-6 text-[#8b7355] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-[#1a1a1a]/70">${feature}</span> </li>`)} </ul> </div> <div> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block">Why Choose</span> <h2 class="text-4xl font-bold text-[#1a1a1a] mb-8">Benefits</h2> <ul class="space-y-4"> ${product.benefits.map((benefit) => renderTemplate`<li class="flex items-start gap-4"> <svg class="w-6 h-6 text-[#8b7355] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span class="text-[#1a1a1a]/70">${benefit}</span> </li>`)} </ul> </div> </div> </div> </section>  <section class="py-24 bg-[#0a0a0a]"> <div class="max-w-7xl mx-auto px-6"> <div class="text-center mb-12"> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block">Inspiration</span> <h2 class="text-4xl font-bold text-white">Project Gallery</h2> </div> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"> ${product.gallery.map((img) => renderTemplate`<div class="group relative aspect-square overflow-hidden bg-[#1a1a1a]"> <img${addAttribute(img.src, "src")}${addAttribute(img.title, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"> <span class="text-white font-medium">${img.title}</span> </div> </div>`)} </div> </div> </section>  <section class="py-24 bg-[#1a1a1a]"> <div class="max-w-4xl mx-auto px-6 text-center"> <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Interested in ${product.name}?</h2> <p class="text-xl text-white/60 mb-8">Get in touch to discuss your project and receive a quote.</p> <a href="/#contact" class="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#a68b6a] transition-colors">
Get a Quote
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </section> ${renderComponent($$result2, "AnimatedFooter", AnimatedFooter, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/AnimatedFooter", "client:component-export": "default" })} ` })}`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/products/rokka.astro", void 0);

const $$file = "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/products/rokka.astro";
const $$url = "/products/rokka";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rokka,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
