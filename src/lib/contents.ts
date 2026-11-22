import type { MarkdownHeading } from 'astro';

/** Groups rendered headings into h2 sections with their h3 children for the contents rail. */
export function groupContents(headings: MarkdownHeading[]) {
  const sections = headings.filter(
    (heading) => heading.depth === 2 && heading.slug !== 'footnote-label'
  );
  const contents = sections.map((heading) => {
    const start = headings.indexOf(heading) + 1;
    const next = headings.findIndex(
      (item, index) => index >= start && item.depth === 2
    );
    return {
      ...heading,
      children: headings
        .slice(start, next < 0 ? undefined : next)
        .filter((item) => item.depth === 3),
    };
  });
  return { sections, contents };
}
