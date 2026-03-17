import type { APIRoute } from 'astro';

const SITE = 'https://www.troweledearthmelbourne.com.au';

// Blog slugs — update as posts are added
const blogSlugs = [
  '2026-trends',
  'choosing-right-finish',
  'hemp-render-sustainability',
  'marbellino-vs-microcement',
  'marbellino-workshop',
  'tadelakt-moroccan-classic',
];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/story/', priority: '0.8', changefreq: 'monthly' },
  { url: '/projects/', priority: '0.8', changefreq: 'weekly' },
  { url: '/blog/', priority: '0.8', changefreq: 'weekly' },
  { url: '/training/', priority: '0.7', changefreq: 'monthly' },
  { url: '/applicators/', priority: '0.7', changefreq: 'monthly' },
  { url: '/suppliers/', priority: '0.6', changefreq: 'monthly' },
  // Product pages
  { url: '/products/marbellino/', priority: '0.9', changefreq: 'monthly' },
  { url: '/products/tadelakt/', priority: '0.9', changefreq: 'monthly' },
  { url: '/products/tadelino/', priority: '0.9', changefreq: 'monthly' },
  { url: '/products/concretum/', priority: '0.9', changefreq: 'monthly' },
  { url: '/products/rokka/', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/earthen-renders/', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/natural-plasters/', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/antique-stucco/', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/metallics/', priority: '0.7', changefreq: 'monthly' },
  { url: '/products/custom-finishes/', priority: '0.7', changefreq: 'monthly' },
];

const blogPages = blogSlugs.map(slug => ({
  url: `/blog/${slug}/`,
  priority: '0.7',
  changefreq: 'yearly',
}));

const allPages = [...staticPages, ...blogPages];

const today = new Date().toISOString().split('T')[0];

export const GET: APIRoute = () => {
  const urls = allPages
    .map(
      ({ url, priority, changefreq }) => `
  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
