import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_v7mqCAwT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_D3qCqjnZ.mjs';
import { C as CustomCursor, S as ScrollProgress } from '../../chunks/ScrollProgress_CKVF3J0N.mjs';
import { A as AnimatedFooter } from '../../chunks/AnimatedFooter_DDJMlaug.mjs';
export { renderers } from '../../renderers.mjs';

const $$NaturalPlasters = createComponent(($$result, $$props, $$slots) => {
  const product = {
    name: "Natural & Beneficial Plasters",
    tagline: "Living Walls",
    description: "A premium collection of eco-friendly and sustainable plasters designed for internal use. Made from natural materials such as clay and lime, easy to use, and providing a healthy indoor environment.",
    image: "/images/arch-plaster-render.jpg",
    features: [
      "Hemp plaster - excellent thermal and acoustic insulation",
      "Clay plaster - natural humidity regulation",
      "Lime plaster - antimicrobial and breathable",
      "Carbon-negative building materials",
      "Non-toxic and VOC-free finishes",
      "Locally sourced and sustainable"
    ],
    benefits: [
      "Healthier indoor air quality",
      "Natural temperature regulation",
      "Reduced energy costs",
      "Environmentally responsible choice",
      "Timeless, organic aesthetic",
      "Supports sustainable building practices",
      "10 Year Limited Warranty"
    ],
    materials: [
      {
        name: "Hemp Plaster",
        description: "Made from hemp fibres and lime, this plaster offers exceptional insulation properties while actively sequestering carbon. Ideal for creating warm, breathable walls."
      },
      {
        name: "Clay Plaster",
        description: "Pure earth-based finish that naturally regulates humidity, absorbing excess moisture and releasing it when the air is dry. Creates a calm, grounding atmosphere."
      },
      {
        name: "Lime Plaster",
        description: "Traditional lime-based renders that have been used for centuries. Naturally antimicrobial, breathable, and develops a beautiful patina over time."
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${product.name} | Troweled Earth Melbourne` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CustomCursor", CustomCursor, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/CustomCursor", "client:component-export": "default" })} ${renderComponent($$result2, "ScrollProgress", ScrollProgress, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/ScrollProgress", "client:component-export": "default" })} ${maybeRenderHead()}<section class="relative h-[70vh] min-h-[500px] flex items-end bg-[#0a0a0a] overflow-hidden"> <div class="absolute inset-0"> <img${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover opacity-60"> <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div> </div> <div class="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full"> <a href="/#finishes" class="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Back to Finishes
</a> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block">${product.tagline}</span> <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">${product.name}</h1> <p class="text-xl text-white/70 mt-6 max-w-2xl">${product.description}</p> </div> </section>  <section class="py-24 bg-[#FAF9F6]"> <div class="max-w-7xl mx-auto px-6"> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block">Our Materials</span> <h2 class="text-4xl font-bold text-[#1a1a1a] mb-16">Three Pillars of Natural Building</h2> <div class="grid md:grid-cols-3 gap-12"> ${product.materials.map((material) => renderTemplate`<div class="space-y-4"> <h3 class="text-2xl font-bold text-[#1a1a1a]">${material.name}</h3> <p class="text-[#1a1a1a]/70 leading-relaxed">${material.description}</p> </div>`)} </div> </div> </section> <section class="py-24 bg-[#f5f5f0]"> <div class="max-w-7xl mx-auto px-6"> <div class="grid lg:grid-cols-2 gap-16"> <div> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block">Features</span> <h2 class="text-4xl font-bold text-[#1a1a1a] mb-8">Key Features</h2> <ul class="space-y-4"> ${product.features.map((feature) => renderTemplate`<li class="flex items-start gap-4"> <svg class="w-6 h-6 text-[#8b7355] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-[#1a1a1a]/70">${feature}</span> </li>`)} </ul> </div> <div> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block">Why Choose</span> <h2 class="text-4xl font-bold text-[#1a1a1a] mb-8">Benefits</h2> <ul class="space-y-4"> ${product.benefits.map((benefit) => renderTemplate`<li class="flex items-start gap-4"> <svg class="w-6 h-6 text-[#8b7355] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span class="text-[#1a1a1a]/70">${benefit}</span> </li>`)} </ul> </div> </div> </div> </section> <section class="py-24 bg-[#1a1a1a]"> <div class="max-w-4xl mx-auto px-6 text-center"> <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build Naturally?</h2> <p class="text-xl text-white/60 mb-8">Discover how natural plasters can transform your space and improve your wellbeing.</p> <a href="/#contact" class="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#a68b6a] transition-colors">
Get a Quote
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </section> ${renderComponent($$result2, "AnimatedFooter", AnimatedFooter, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/AnimatedFooter", "client:component-export": "default" })} ` })}`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/products/natural-plasters.astro", void 0);

const $$file = "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/products/natural-plasters.astro";
const $$url = "/products/natural-plasters";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NaturalPlasters,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
