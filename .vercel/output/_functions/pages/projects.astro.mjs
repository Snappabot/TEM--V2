import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_v7mqCAwT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D3qCqjnZ.mjs';
import { C as CustomCursor, S as ScrollProgress } from '../chunks/ScrollProgress_CKVF3J0N.mjs';
import { A as AnimatedFooter } from '../chunks/AnimatedFooter_DDJMlaug.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  const galleryImages = [
    { src: "/images/products/marbellino.png", title: "Marbellino Kitchen", category: "Marbellino" },
    { src: "/images/products/concretum.png", title: "Concretum Feature Wall", category: "Concretum" },
    { src: "/images/products/rokka.png", title: "Rokka Ceiling", category: "Rokka" },
    { src: "/images/products/tadelakt.png", title: "Tadelakt Bathroom", category: "Tadelakt" },
    { src: "/images/products/antique-stucco.png", title: "Antique Stucco Fireplace", category: "Antique Stucco" },
    { src: "/images/products/metallics.png", title: "True Copper Wall", category: "Metallics" },
    { src: "/images/products/custom-finishes.png", title: "Fractured Plaster", category: "Custom" },
    { src: "/images/products/earthen-renders.png", title: "Earthen Fireplace", category: "Earthen" },
    // New high-res project photos
    { src: "/images/gallery/gallery-01.jpg", title: "Moody Plaster Facade", category: "Exterior" },
    { src: "/images/gallery/gallery-02.jpg", title: "Polished Plaster Stairwell", category: "Featured" },
    { src: "/images/gallery/gallery-03.jpg", title: "Board-Formed Feature Wall", category: "Featured" },
    { src: "/images/gallery/gallery-04.jpg", title: "Barrel Vault Ceiling", category: "Featured" },
    { src: "/images/gallery/gallery-05.jpg", title: "Luxury Living Room", category: "Featured" },
    { src: "/images/gallery/gallery-06.jpg", title: "Sculptural Spiral Staircase", category: "Interior" },
    { src: "/images/gallery/gallery-07.jpg", title: "Organic Plaster Bar Counter", category: "Custom" },
    { src: "/images/gallery/gallery-08.jpg", title: "Dark Plaster Entry Hall", category: "Featured" },
    { src: "/images/gallery/gallery-09.jpg", title: "Fractured Rock Feature Wall", category: "Featured" },
    { src: "/images/gallery/gallery-10.jpg", title: "Grand Double-Height Entry", category: "Featured" },
    { src: "/images/gallery/gallery-11.jpg", title: "Loft with Dramatic Light Shaft", category: "Featured" },
    { src: "/images/gallery/gallery-12.jpg", title: "Stairwell Void & Skylights", category: "Interior" },
    { src: "/images/gallery/gallery-13.jpg", title: "Dark Moody Bathroom", category: "Tadelakt" },
    { src: "/images/gallery/gallery-14.jpg", title: "Hemp Render Cabinet Doors", category: "Earthen" },
    { src: "/images/gallery/gallery-15.jpg", title: "Hemp Render Kitchen Cabinetry", category: "Earthen" },
    { src: "/images/gallery/gallery-16.jpg", title: "Hemp Render Kitchen Full", category: "Earthen" },
    { src: "/images/gallery/gallery-17.jpg", title: "Polished Plaster Splashback", category: "Custom" },
    { src: "/images/gallery/gallery-18.jpg", title: "Cantilevered Exterior Facade", category: "Exterior" },
    { src: "/images/gallery/gallery-19.jpg", title: "Plaster Facade with Dark Beams", category: "Exterior" },
    { src: "/images/gallery/gallery-20.jpg", title: "Grey Cement-Look Exterior", category: "Exterior" },
    { src: "/images/gallery/gallery-21.jpg", title: "Modern Plaster Home Facade", category: "Exterior" },
    { src: "/images/gallery/gallery-22.jpg", title: "Concrete-Look Render Wall", category: "Exterior" },
    { src: "/images/gallery/gallery-23.jpg", title: "Curved Plaster Arch Entry", category: "Exterior" },
    { src: "/images/gallery/gallery-24.jpg", title: "Dark Plaster Walkway", category: "Exterior" },
    { src: "/images/gallery/gallery-25.jpg", title: "Curved Facade with Angular Windows", category: "Exterior" },
    { src: "/images/gallery/gallery-26.jpg", title: "Grey Plaster & Corten Steel", category: "Exterior" },
    { src: "/images/gallery/gallery-27.jpg", title: "Landscaped Plaster Facade", category: "Exterior" },
    { src: "/images/gallery/gallery-28.jpg", title: "Angular Plaster Overhangs", category: "Exterior" },
    { src: "/images/gallery/gallery-29.jpg", title: "Plaster Outdoor Shower", category: "Tadelakt" },
    { src: "/images/gallery/gallery-30.jpg", title: "Terracotta Earthen Render", category: "Exterior" },
    { src: "/images/gallery/gallery-31.jpg", title: "Green-Grey Plaster Fireplace", category: "Interior" },
    { src: "/images/gallery/gallery-32.jpg", title: "Hemp Render Texture Detail", category: "Earthen" },
    { src: "/images/gallery/gallery-33.jpg", title: "Hemp Render Wall Close-Up", category: "Earthen" },
    { src: "/images/gallery/gallery-34.jpg", title: "Seamless Plaster Bathroom", category: "Tadelakt" },
    { src: "/images/gallery/gallery-35.jpg", title: "Curved Ceiling Void", category: "Interior" },
    { src: "/images/gallery/gallery-36.jpg", title: "Moody Stairwell Void", category: "Interior" },
    { src: "/images/gallery/gallery-37.jpg", title: "Sculptural Plaster Sample", category: "Custom" },
    { src: "/images/gallery/gallery-38.jpg", title: "Warm Plaster & Dark Timber", category: "Exterior" },
    { src: "/images/gallery/gallery-39.jpg", title: "Luxury Plaster Kitchen", category: "Featured" },
    { src: "/images/gallery/gallery-40.jpg", title: "Curved Facade at Dusk", category: "Exterior" },
    // New TEM project photos
    { src: "/images/gallery/gallery-41.jpg", title: "Concretum Fireplace Surround", category: "Concretum" },
    { src: "/images/gallery/gallery-42.jpg", title: "Concretum Study Niche", category: "Concretum" },
    { src: "/images/gallery/gallery-43.jpg", title: "Concretum Window Bench", category: "Concretum" },
    { src: "/images/gallery/gallery-44.jpg", title: "Earthen Render Stairwell", category: "Earthen" },
    { src: "/images/gallery/gallery-45.jpg", title: "Concretum Dark Entry", category: "Concretum" },
    { src: "/images/gallery/gallery-46.jpg", title: "Concretum Double-Height Fireplace", category: "Concretum" },
    { src: "/images/gallery/gallery-47.jpg", title: "Concretum Blade Wall Pillar", category: "Concretum" },
    { src: "/images/gallery/gallery-48.jpg", title: "Concretum Exterior Facade", category: "Concretum" },
    { src: "/images/gallery/gallery-49.jpg", title: "Concretum Application In Progress", category: "Concretum" },
    { src: "/images/gallery/gallery-50.jpg", title: "Natural Plaster Exterior Application", category: "Natural Plasters" },
    { src: "/images/gallery/gallery-51.jpg", title: "Natural Plaster Team Shot", category: "Natural Plasters" },
    { src: "/images/gallery/gallery-52.jpg", title: "Natural Plaster Barrel Vault", category: "Natural Plasters" },
    { src: "/images/gallery/gallery-53.jpg", title: "Concretum Stairwell Feature Wall", category: "Concretum" },
    { src: "/images/gallery/gallery-54.jpg", title: "Concretum Living Room Wall", category: "Concretum" },
    { src: "/images/gallery/gallery-55.jpg", title: "Concretum Fireplace Wall", category: "Concretum" },
    { src: "/images/gallery/gallery-56.jpg", title: "Custom Arched Corridor", category: "Custom" },
    { src: "/images/gallery/gallery-57.jpg", title: "Earthen Render Exterior", category: "Earthen" },
    { src: "/images/gallery/gallery-58.jpg", title: "Earthen Render Interior", category: "Earthen" },
    { src: "/images/gallery/gallery-59.jpg", title: "Concretum Modern Facade", category: "Concretum" },
    { src: "/images/gallery/gallery-60.jpg", title: "Concretum Curved Entry Wall", category: "Concretum" },
    { src: "/images/gallery/gallery-61.jpg", title: "Concretum Charcoal Facade", category: "Concretum" },
    { src: "/images/gallery/gallery-62.jpg", title: "Concretum Poolside Wall", category: "Concretum" },
    { src: "/images/gallery/gallery-63.jpg", title: "Concretum Two-Storey Facade", category: "Concretum" },
    { src: "/images/gallery/gallery-64.jpg", title: "Earthen Render Artisan", category: "Earthen" },
    { src: "/images/gallery/gallery-65.jpg", title: "Concretum Street Facade", category: "Concretum" },
    { src: "/images/gallery/gallery-66.jpg", title: "Concretum Balcony Soffit", category: "Concretum" },
    { src: "/images/gallery/gallery-67.jpg", title: "Concretum Interior Stairwell", category: "Concretum" },
    { src: "/images/gallery/gallery-68.jpg", title: "Earthen Travertine Detail", category: "Earthen" },
    { src: "/images/gallery/gallery-69.jpg", title: "Concretum Interior Void", category: "Concretum" },
    { src: "/images/gallery/gallery-70.jpg", title: "Earthen Warm Interior", category: "Earthen" },
    { src: "/images/gallery/gallery-71.jpg", title: "Concretum Kitchen Feature Wall", category: "Concretum" },
    { src: "/images/gallery/gallery-72.jpg", title: "Tadelakt Bathroom Finish", category: "Tadelakt" },
    { src: "/images/gallery/gallery-73.jpg", title: "Concretum Living Room Feature", category: "Concretum" },
    { src: "/images/gallery/gallery-74.jpg", title: "Sculptural Entry Installation", category: "Custom" }
  ];
  const categories = ["All", "Featured", "Exterior", "Interior", "Concretum", "Tadelakt", "Earthen", "Natural Plasters", "Custom", "Marbellino", "Rokka", "Metallics"];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects | Troweled Earth Melbourne", "data-astro-cid-aid3sr62": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CustomCursor", CustomCursor, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/CustomCursor", "client:component-export": "default", "data-astro-cid-aid3sr62": true })} ${renderComponent($$result2, "ScrollProgress", ScrollProgress, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/ScrollProgress", "client:component-export": "default", "data-astro-cid-aid3sr62": true })}  ${maybeRenderHead()}<section class="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-[#0a0a0a] overflow-hidden" data-astro-cid-aid3sr62> <div class="relative z-20 text-center px-6" data-astro-cid-aid3sr62> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block" data-astro-cid-aid3sr62>Our Work</span> <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight" data-astro-cid-aid3sr62>
Projects
</h1> <p class="text-white/60 mt-6 text-lg max-w-2xl mx-auto" data-astro-cid-aid3sr62>
Explore our portfolio of stunning wall finishes across Melbourne and beyond.
</p> </div> </section>  <section class="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10" data-astro-cid-aid3sr62> <div class="max-w-7xl mx-auto px-6 py-4" data-astro-cid-aid3sr62> <div class="flex gap-4 overflow-x-auto hide-scrollbar" data-astro-cid-aid3sr62> ${categories.map((cat) => renderTemplate`<button class="px-4 py-2 text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors whitespace-nowrap data-[active=true]:text-[#8b7355] data-[active=true]:border-b-2 data-[active=true]:border-[#8b7355]"${addAttribute(cat, "data-category")}${addAttribute(cat === "All" ? "true" : "false", "data-active")} data-astro-cid-aid3sr62> ${cat} </button>`)} </div> </div> </section>  <section class="py-16 bg-[#0a0a0a]" data-astro-cid-aid3sr62> <div class="max-w-7xl mx-auto px-6" data-astro-cid-aid3sr62> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="gallery-grid" data-astro-cid-aid3sr62> ${galleryImages.map((image, index) => renderTemplate`<div class="group relative aspect-[4/3] overflow-hidden bg-[#1a1a1a] cursor-pointer gallery-item"${addAttribute(image.category, "data-category")}${addAttribute(`animation-delay: ${index * 0.1}s`, "style")} data-astro-cid-aid3sr62> <img${addAttribute(image.src, "src")}${addAttribute(image.title, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" data-astro-cid-aid3sr62> <!-- Overlay --> <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" data-astro-cid-aid3sr62></div> <!-- Content --> <div class="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500" data-astro-cid-aid3sr62> <span class="text-[#8b7355] text-xs uppercase tracking-widest mb-2" data-astro-cid-aid3sr62>${image.category}</span> <h3 class="text-xl font-bold text-white" data-astro-cid-aid3sr62>${image.title}</h3> </div> <!-- Corner accent --> <div class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/50 transition-all duration-500" data-astro-cid-aid3sr62></div> <div class="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/50 transition-all duration-500" data-astro-cid-aid3sr62></div> </div>`)} </div> </div> </section>  <section class="py-24 bg-[#1a1a1a]" data-astro-cid-aid3sr62> <div class="max-w-4xl mx-auto px-6 text-center" data-astro-cid-aid3sr62> <h2 class="text-4xl md:text-5xl font-bold text-white mb-6" data-astro-cid-aid3sr62>Have a Project in Mind?</h2> <p class="text-xl text-white/60 mb-8" data-astro-cid-aid3sr62>Let's create something extraordinary together.</p> <a href="/#contact" class="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#a68b6a] transition-colors" data-astro-cid-aid3sr62>
Start Your Project
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-aid3sr62> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-aid3sr62></path> </svg> </a> </div> </section> ${renderComponent($$result2, "AnimatedFooter", AnimatedFooter, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/AnimatedFooter", "client:component-export": "default", "data-astro-cid-aid3sr62": true })} ` })}  ${renderScript($$result, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/projects.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/projects.astro", void 0);

const $$file = "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/projects.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
