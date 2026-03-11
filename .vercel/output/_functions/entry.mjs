import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_B-nTUFP7.mjs';
import { manifest } from './manifest_DOPp20N6.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin.astro.mjs');
const _page3 = () => import('./pages/api/admin/codes.astro.mjs');
const _page4 = () => import('./pages/api/auth/login.astro.mjs');
const _page5 = () => import('./pages/api/auth/register.astro.mjs');
const _page6 = () => import('./pages/api/auth/session.astro.mjs');
const _page7 = () => import('./pages/api/chat.astro.mjs');
const _page8 = () => import('./pages/api/visualize.astro.mjs');
const _page9 = () => import('./pages/applicators.astro.mjs');
const _page10 = () => import('./pages/blog/_slug_.astro.mjs');
const _page11 = () => import('./pages/blog.astro.mjs');
const _page12 = () => import('./pages/products/antique-stucco.astro.mjs');
const _page13 = () => import('./pages/products/concretum.astro.mjs');
const _page14 = () => import('./pages/products/custom-finishes.astro.mjs');
const _page15 = () => import('./pages/products/earthen-renders.astro.mjs');
const _page16 = () => import('./pages/products/marbellino.astro.mjs');
const _page17 = () => import('./pages/products/metallics.astro.mjs');
const _page18 = () => import('./pages/products/natural-plasters.astro.mjs');
const _page19 = () => import('./pages/products/rokka.astro.mjs');
const _page20 = () => import('./pages/products/tadelakt.astro.mjs');
const _page21 = () => import('./pages/products/tadelino.astro.mjs');
const _page22 = () => import('./pages/projects.astro.mjs');
const _page23 = () => import('./pages/story.astro.mjs');
const _page24 = () => import('./pages/suppliers.astro.mjs');
const _page25 = () => import('./pages/training.astro.mjs');
const _page26 = () => import('./pages/visualizer.astro.mjs');
const _page27 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin.astro", _page2],
    ["src/pages/api/admin/codes.ts", _page3],
    ["src/pages/api/auth/login.ts", _page4],
    ["src/pages/api/auth/register.ts", _page5],
    ["src/pages/api/auth/session.ts", _page6],
    ["src/pages/api/chat.ts", _page7],
    ["src/pages/api/visualize.ts", _page8],
    ["src/pages/applicators.astro", _page9],
    ["src/pages/blog/[slug].astro", _page10],
    ["src/pages/blog.astro", _page11],
    ["src/pages/products/antique-stucco.astro", _page12],
    ["src/pages/products/concretum.astro", _page13],
    ["src/pages/products/custom-finishes.astro", _page14],
    ["src/pages/products/earthen-renders.astro", _page15],
    ["src/pages/products/marbellino.astro", _page16],
    ["src/pages/products/metallics.astro", _page17],
    ["src/pages/products/natural-plasters.astro", _page18],
    ["src/pages/products/rokka.astro", _page19],
    ["src/pages/products/tadelakt.astro", _page20],
    ["src/pages/products/tadelino.astro", _page21],
    ["src/pages/projects.astro", _page22],
    ["src/pages/story.astro", _page23],
    ["src/pages/suppliers.astro", _page24],
    ["src/pages/training.astro", _page25],
    ["src/pages/visualizer.astro", _page26],
    ["src/pages/index.astro", _page27]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "6e3da43a-5093-4412-b879-49d22204f8fa",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
