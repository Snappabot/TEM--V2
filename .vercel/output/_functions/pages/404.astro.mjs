import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_v7mqCAwT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D3qCqjnZ.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page Not Found | Troweled Earth Melbourne" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6"> <div class="text-center"> <span class="text-[#8b7355] text-9xl font-bold opacity-20">404</span> <h1 class="text-4xl md:text-5xl font-bold text-white -mt-16 mb-4">Page Not Found</h1> <p class="text-white/60 text-lg mb-8 max-w-md mx-auto">
The page you're looking for doesn't exist or has been moved.
</p> <a href="/" class="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#a68b6a] transition-colors"> <svg class="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg>
Back to Home
</a> </div> </section> ` })}`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/404.astro", void 0);

const $$file = "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
