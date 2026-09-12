// @ts-check
import { URL } from 'node:url';
import { defineConfig } from 'astro/config';


import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const excludedFromSitemap = new Set([
  '/search/',
  '/lumos-preview/',
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
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !excludedFromSitemap.has(new URL(page).pathname),
    }),
    mdx(),
  ],
});
