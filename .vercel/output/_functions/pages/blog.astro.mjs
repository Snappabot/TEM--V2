import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_v7mqCAwT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D3qCqjnZ.mjs';
import { A as AnimatedFooter } from '../chunks/AnimatedFooter_DDJMlaug.mjs';
import { g as getCollection } from '../chunks/_astro_content_BtV843zE.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("blog");
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog | Troweled Earth Melbourne", "data-astro-cid-ijnerlr2": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-[#0a0a0a] overflow-hidden" data-astro-cid-ijnerlr2> <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/80 z-10" data-astro-cid-ijnerlr2></div> <div class="relative z-20 text-center px-6" data-astro-cid-ijnerlr2> <span class="text-[#8b7355] text-sm uppercase tracking-[0.3em] mb-4 block" data-astro-cid-ijnerlr2>News & Inspiration</span> <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight" data-astro-cid-ijnerlr2>
Blog
</h1> <p class="text-white/60 mt-6 text-lg max-w-xl mx-auto" data-astro-cid-ijnerlr2>
Insights, techniques, and inspiration from Melbourne's artisan plaster specialists.
</p> </div> </section>  <section class="py-24 bg-[#f5f5f0]" data-astro-cid-ijnerlr2> <div class="max-w-7xl mx-auto px-6" data-astro-cid-ijnerlr2> <!-- Featured Post (Latest) --> ${sortedPosts.length > 0 && renderTemplate`<a${addAttribute(`/blog/${sortedPosts[0].slug}`, "href")} class="block group mb-16" data-astro-cid-ijnerlr2> <article class="grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow" data-astro-cid-ijnerlr2> <div class="aspect-[4/3] bg-[#1a1a1a] relative overflow-hidden" data-astro-cid-ijnerlr2> <div class="absolute inset-0 bg-gradient-to-br from-[#8b7355]/30 to-transparent" data-astro-cid-ijnerlr2></div> <div class="absolute inset-0 flex items-center justify-center" data-astro-cid-ijnerlr2> <span class="text-[#8b7355] text-8xl font-bold opacity-20" data-astro-cid-ijnerlr2>T</span> </div> <div class="absolute top-4 left-4" data-astro-cid-ijnerlr2> <span class="bg-[#8b7355] text-white text-xs uppercase tracking-wider px-3 py-1" data-astro-cid-ijnerlr2>Featured</span> </div> </div> <div class="p-8 md:p-12" data-astro-cid-ijnerlr2> <span class="text-[#8b7355] text-sm uppercase tracking-[0.2em]" data-astro-cid-ijnerlr2> ${formatDate(sortedPosts[0].data.date)} </span> <h2 class="text-3xl md:text-4xl font-bold text-[#1a1a1a] mt-3 mb-4 group-hover:text-[#8b7355] transition-colors" data-astro-cid-ijnerlr2> ${sortedPosts[0].data.title} </h2> <p class="text-[#1a1a1a]/70 text-lg leading-relaxed mb-6" data-astro-cid-ijnerlr2> ${sortedPosts[0].data.excerpt} </p> <span class="inline-flex items-center gap-2 text-[#1a1a1a] font-medium uppercase tracking-wider text-sm group-hover:text-[#8b7355] transition-colors" data-astro-cid-ijnerlr2>
Read Article
<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-ijnerlr2></path> </svg> </span> </div> </article> </a>`} <!-- Post Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-ijnerlr2> ${sortedPosts.slice(1).map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="block group" data-astro-cid-ijnerlr2> <article class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1" data-astro-cid-ijnerlr2> <div class="aspect-[16/10] bg-[#1a1a1a] relative overflow-hidden" data-astro-cid-ijnerlr2> <div class="absolute inset-0 bg-gradient-to-br from-[#8b7355]/20 to-transparent" data-astro-cid-ijnerlr2></div> <div class="absolute inset-0 flex items-center justify-center" data-astro-cid-ijnerlr2> <span class="text-[#8b7355] text-6xl font-bold opacity-20" data-astro-cid-ijnerlr2>T</span> </div> </div> <div class="p-6" data-astro-cid-ijnerlr2> <span class="text-[#8b7355] text-xs uppercase tracking-[0.2em]" data-astro-cid-ijnerlr2> ${formatDate(post.data.date)} </span> <h3 class="text-xl font-bold text-[#1a1a1a] mt-2 mb-3 group-hover:text-[#8b7355] transition-colors line-clamp-2" data-astro-cid-ijnerlr2> ${post.data.title} </h3> <p class="text-[#1a1a1a]/60 text-sm leading-relaxed line-clamp-3" data-astro-cid-ijnerlr2> ${post.data.excerpt} </p> <div class="mt-4 flex items-center gap-2 text-[#1a1a1a] font-medium uppercase tracking-wider text-xs group-hover:text-[#8b7355] transition-colors" data-astro-cid-ijnerlr2>
Read More
<svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-ijnerlr2></path> </svg> </div> </div> </article> </a>`)} </div> <!-- Tags Cloud --> <div class="mt-20 text-center" data-astro-cid-ijnerlr2> <h3 class="text-sm uppercase tracking-[0.3em] text-[#1a1a1a]/40 mb-6" data-astro-cid-ijnerlr2>Browse by Topic</h3> <div class="flex flex-wrap justify-center gap-3" data-astro-cid-ijnerlr2> ${["workshop", "training", "tadelakt", "sustainability", "guide", "trends", "comparison"].map((tag) => renderTemplate`<span class="px-4 py-2 bg-white text-[#1a1a1a]/70 text-sm rounded-full hover:bg-[#8b7355] hover:text-white transition-colors cursor-pointer" data-astro-cid-ijnerlr2> ${tag} </span>`)} </div> </div> </div> </section>  <section class="py-24 bg-[#1a1a1a]" data-astro-cid-ijnerlr2> <div class="max-w-4xl mx-auto px-6 text-center" data-astro-cid-ijnerlr2> <h2 class="text-4xl md:text-5xl font-bold text-white mb-6" data-astro-cid-ijnerlr2>Stay Inspired</h2> <p class="text-xl text-white/60 mb-8" data-astro-cid-ijnerlr2>
Get the latest articles, project showcases, and workshop announcements delivered to your inbox.
</p> <a href="/#contact" class="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#a68b6a] transition-colors" data-astro-cid-ijnerlr2>
Get In Touch
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-ijnerlr2></path> </svg> </a> </div> </section> ${renderComponent($$result2, "AnimatedFooter", AnimatedFooter, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/components/AnimatedFooter", "client:component-export": "default", "data-astro-cid-ijnerlr2": true })} ` })} `;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/blog.astro", void 0);

const $$file = "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
