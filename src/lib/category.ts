// Shared by the articles index anchors and each article's category link.
export const categorySlug = (category: string) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
