import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const linkIcons = [
  'Book',
  'BookOpen',
  'Compass',
  'HandCoins',
  'HeartHandshake',
  'Kofi',
  'Mail',
  'PackageOpen',
  'PencilLine',
  'Play',
  'Scroll',
  'Youtube',
] as const;

const siteCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({}).optional(),
});

const linksCollection = defineCollection({
  loader: async () => {
    const fs = await import('node:fs/promises');
    const text = await fs.readFile('src/content/links/links.json', 'utf-8');
    const data = JSON.parse(text);
    return data.map((item: Record<string, unknown>, index: number) => ({
      id: `link-${index}`,
      ...item,
    }));
  },
  schema: z.object({
    id: z.string(),
    icon: z.enum(linkIcons),
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    youtube: z.string().optional(),
    variant: z
      .enum(['default', 'featured', 'charity', 'stream-pick', 'support'])
      .optional(),
  }),
});

const drawingsCollection = defineCollection({
  loader: async () => {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const filePath = path.resolve('src/content/drawings/drawings.json');
    const text = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(text);
    return data;
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    svgPath: z.string(),
  }),
});

export const collections = {
  articles: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
    schema: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      date: z.coerce.date(),
      category: z.string().default('Articles'),
      draft: z.boolean().default(true),
      cover: z.object({ src: z.string(), alt: z.string().min(1) }).optional(),
    }),
  }),
  site: siteCollection,
  links: linksCollection,
  drawings: drawingsCollection,
};
