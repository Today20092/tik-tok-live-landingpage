import { useState } from 'react';
import { ChevronDown, Image as ImageIcon, Maximize2, X } from 'lucide-react';

interface DrawingItem {
  id: string;
  title: string;
  description: string;
  svgPath: string;
}

interface DrawingSectionProps {
  title?: string;
  items: DrawingItem[];
}

export default function DrawingSection({
  title = 'Study visuals',
  items,
}: DrawingSectionProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [fullscreenIdx, setFullscreenIdx] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpandedIdx(expandedIdx === idx ? null : idx);
    }
  };

  const openFullscreen = (idx: number) => {
    setFullscreenIdx(idx);
    window.dispatchEvent(new CustomEvent('fullscreen-drawing', { detail: { active: true } }));
  };

  const closeFullscreen = () => {
    setFullscreenIdx(null);
    window.dispatchEvent(new CustomEvent('fullscreen-drawing', { detail: { active: false } }));
  };

  return (
    <div>
      {fullscreenIdx !== null && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/88 p-4 backdrop-blur-md"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 shadow-lg backdrop-blur-md transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
            aria-label="Close fullscreen"
          >
            <X size={18} />
          </button>
          <img
            src={items[fullscreenIdx].svgPath}
            alt={items[fullscreenIdx].title}
            className="max-h-[90vh] max-w-[95vw] rounded-[1rem] border border-white/10 bg-white/5 object-contain hue-rotate-180 invert-[0.9] dark:hue-rotate-0 dark:invert-0"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="mb-4">
        <p className="mb-2 text-[0.68rem] leading-none font-extrabold tracking-[0.16em] text-primary uppercase">
          Visual notes
        </p>
        <h2 className="text-3xl text-foreground md:text-4xl">{title}</h2>
      </div>

      <div className="border-y border-border/70">
        {items.map((drawing, idx) => {
          const headingId = `drawing-heading-${idx}`;
          const contentId = `drawing-content-${idx}`;

          return (
            <div key={`drawing-${idx}`} className="border-b border-border/70 last:border-b-0">
              <button
                id={headingId}
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-expanded={expandedIdx === idx}
                aria-controls={contentId}
                className="flex w-full items-start gap-4 py-5 text-left focus-visible:ring-2 focus-visible:outline-none"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-[0.625rem] border border-border bg-card/60 text-accent">
                  <ImageIcon size={18} strokeWidth={1.9} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.68rem] leading-none font-extrabold tracking-[0.16em] text-muted-foreground uppercase">
                    Drawing
                  </p>
                  <h3 className="text-xl leading-tight text-foreground md:text-[1.35rem]">
                    {drawing.title}
                  </h3>
                </div>
                <ChevronDown
                  size={18}
                  className={`mt-1 shrink-0 text-muted-foreground transition-transform ${
                    expandedIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                id={contentId}
                className={`grid transition-all duration-300 ease-out ${
                  expandedIdx === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-5 pb-5 pl-14">
                    <p className="max-w-[62ch] text-[0.98rem] leading-7 text-muted-foreground">
                      {drawing.description}
                    </p>
                    <div className="relative overflow-hidden rounded-[1rem] border border-border/70 bg-card/40">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openFullscreen(idx);
                        }}
                        className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/70 text-foreground/75 shadow-lg backdrop-blur-md transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:outline-none"
                        aria-label="View fullscreen"
                      >
                        <Maximize2 size={15} />
                      </button>
                      <img
                        src={drawing.svgPath}
                        alt={drawing.title}
                        className="block h-auto w-full cursor-zoom-in hue-rotate-180 invert-[0.9] dark:hue-rotate-0 dark:invert-0"
                        loading="lazy"
                        onClick={() => openFullscreen(idx)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
