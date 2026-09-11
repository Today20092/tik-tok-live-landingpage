// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://islam.ayoubabed.xyz',
  vite: {
    server: {
      allowedHosts: ['desktop-ayoub.cuttlefish-coho.ts.net'],
    },
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],
});
