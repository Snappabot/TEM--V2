// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://agreed-also-aimed-else.trycloudflare.com',
  base: '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()]
});
