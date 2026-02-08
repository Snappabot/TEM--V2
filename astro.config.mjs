// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://snappabot.github.io',
  base: '/TEM--V2',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});
