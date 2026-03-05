// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.troweledearthmelbourne.com.au',
  base: '/',
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com']
    }
  },
  integrations: [react()]
});
