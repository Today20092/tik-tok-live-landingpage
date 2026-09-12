import verses from '../data/quran-verses.json' with { type: 'json' };
import hadith from '../data/hadith.json' with { type: 'json' };

export function readingTime(body = ''): number {
  const text = body
    .replace(/<(QuranVerse|HadithQuote)\s+[^>]*id="([^"]+)"[^>]*\/>/g,
      (_, component: string, id: string) => {
        const entries: Record<string, { arabic?: string; translation: string }> =
          component === 'QuranVerse' ? verses : hadith;
        const quote = entries[id];
        return quote ? `${quote.arabic ?? ''} ${quote.translation}` : '';
      })
    .replace(/^import\s.+$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, ' ');
  return Math.max(1, Math.ceil((text.match(/[\p{L}\p{N}]+/gu)?.length ?? 0) / 200));
}
