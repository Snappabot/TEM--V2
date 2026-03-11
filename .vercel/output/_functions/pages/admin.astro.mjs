import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as renderScript } from '../chunks/astro/server_v7mqCAwT.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D3qCqjnZ.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin | Troweled Earth Visualizer" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="admin-app" class="min-h-screen bg-neutral-950 text-white"> <!-- Password Gate --> <div id="login-section" class="flex items-center justify-center min-h-screen px-4"> <div class="max-w-md w-full"> <h1 class="text-3xl font-light text-center mb-8">Admin Access</h1> <form id="login-form" class="space-y-4"> <input type="password" id="admin-password" placeholder="Admin password" class="w-full px-4 py-4 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"> <p id="login-error" class="text-red-400 text-sm hidden"></p> <button type="submit" class="w-full py-4 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors">
Enter
</button> </form> </div> </div> <!-- Admin Dashboard (hidden until authenticated) --> <div id="dashboard-section" class="hidden"> <div class="py-8 px-8 border-b border-neutral-800"> <div class="max-w-6xl mx-auto flex items-center justify-between"> <h1 class="text-2xl font-light">Visualizer Admin</h1> <button id="logout-btn" class="text-neutral-400 hover:text-white text-sm transition-colors">
Log out
</button> </div> </div> <div class="max-w-6xl mx-auto px-8 py-8"> <!-- Create New Code --> <div class="mb-8 p-6 bg-neutral-900 rounded-lg"> <h2 class="text-lg font-medium mb-4">Create New Access Code</h2> <form id="create-code-form" class="flex flex-wrap gap-4 items-end"> <div> <label class="block text-sm text-neutral-500 mb-2">Max Generations</label> <input type="number" id="max-generations" value="10" min="1" max="100" class="w-24 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-500"> </div> <div class="flex-1 min-w-[200px]"> <label class="block text-sm text-neutral-500 mb-2">Note (optional)</label> <input type="text" id="code-note" placeholder="e.g., Client name, project" class="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"> </div> <button type="submit" class="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 transition-colors">
Create Code
</button> </form> <div id="new-code-result" class="mt-4 hidden"> <p class="text-neutral-400 text-sm mb-2">New code created:</p> <div class="inline-flex items-center gap-3 px-4 py-3 bg-neutral-800 rounded-lg"> <code id="new-code-value" class="text-xl font-mono text-green-400"></code> <button id="copy-code-btn" class="text-neutral-400 hover:text-white transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path> </svg> </button> </div> </div> </div> <!-- Access Codes List --> <div> <div class="flex items-center justify-between mb-4"> <h2 class="text-lg font-medium">Access Codes</h2> <button id="refresh-btn" class="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path> </svg>
Refresh
</button> </div> <div id="codes-loading" class="text-neutral-500 py-8 text-center">
Loading codes...
</div> <div id="codes-table" class="hidden overflow-x-auto"> <table class="w-full text-sm"> <thead> <tr class="text-left text-neutral-500 border-b border-neutral-800"> <th class="px-4 py-3">Code</th> <th class="px-4 py-3">Status</th> <th class="px-4 py-3">Email</th> <th class="px-4 py-3">Generations</th> <th class="px-4 py-3">Created</th> <th class="px-4 py-3">Note</th> <th class="px-4 py-3"></th> </tr> </thead> <tbody id="codes-tbody"></tbody> </table> </div> <div id="codes-empty" class="hidden text-neutral-500 py-8 text-center">
No access codes found. Create one above.
</div> </div> </div> </div> </div> ${renderScript($$result2, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/admin.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/admin.astro", void 0);

const $$file = "/home/sittrapp/clawd/projects/troweled-earth/TEM-V2/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
