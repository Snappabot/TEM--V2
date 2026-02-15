// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://snappabot.github.io',
  base: '/TEM--V2',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com']
    }
  },
  integrations: [react()]
});
