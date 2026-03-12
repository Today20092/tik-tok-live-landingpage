// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://today20092.github.io',
  base: '/tik-tok-live-landingpage/',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});