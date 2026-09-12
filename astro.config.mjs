// @ts-check
import { URL } from 'node:url';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const excludedFromSitemap = new Set([
  '/search/',
  '/kofi-preview/',
  '/podcast-preview/',
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://islam.ayoubabed.xyz',
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' },
    ],
  },
  vite: {
    server: {
      allowedHosts: ['desktop-ayoub.cuttlefish-coho.ts.net'],
    },
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !excludedFromSitemap.has(new URL(page).pathname),
    }),
    mdx(),
  ],
});
