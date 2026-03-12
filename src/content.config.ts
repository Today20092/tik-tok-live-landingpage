import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

const siteCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/site" }),
  schema: z.object({}).optional()
});

const linksCollection = defineCollection({
  loader: async () => {
    const fs = await import('node:fs/promises');
    const text = await fs.readFile('src/content/links/links.json', 'utf-8');
    const data = JSON.parse(text);
    return data.map((item: any, index: number) => ({ id: `link-${index}`, ...item }));
  },
  schema: z.object({
      id: z.string(),
      icon: z.string(),
      title: z.string(),
      description: z.string(),
      url: z.string().url(),
      youtube: z.string().optional(),
  })
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
  })
});

export const collections = {
  'site': siteCollection,
  'links': linksCollection,
  'drawings': drawingsCollection,
};
