// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://today20092.github.io',
  base: process.env.NODE_ENV === 'production' ? '/tik-tok-live-landingpage/' : undefined,
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});