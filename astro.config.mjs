import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://snappabot.github.io',
  base: '/TEM--V2',
  integrations: [react(), tailwind()],
  vite: {
    ssr: {
      noExternal: ['framer-motion']
    }
  }
});
