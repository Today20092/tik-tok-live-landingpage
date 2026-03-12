import { useState } from 'react';
import { ChevronDown, Image as ImageIcon } from 'lucide-react';

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
  title = 'Visual Learning Hub',
  items,
}: DrawingSectionProps) {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpandedIdx(expandedIdx === idx ? null : idx);
    }
  };

  return (
    <div className="w-full">
      {/* Section Level Dropdown Toggle */}
      <button
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className="group focus-visible:ring-accent/50 mb-6 -ml-2 flex w-full cursor-pointer items-center justify-between rounded-lg p-2 text-left focus-visible:ring-2 focus-visible:outline-none"
        aria-expanded={isSectionOpen}
      >
        <h2 className="text-foreground group-hover:text-accent font-serif text-3xl font-bold tracking-tight transition-colors duration-300 md:text-3xl">
          {title}
        </h2>
        <div className="bg-accent/5 group-hover:bg-accent/10 group-hover:border-accent/20 rounded-full border border-transparent p-2 transition-all duration-300">
          <ChevronDown
            size={24}
            className={`text-accent/70 group-hover:text-accent transition-transform duration-500 ${
              isSectionOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Drawing Items */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isSectionOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className="space-y-4 pt-2 pb-4"
            role="region"
            aria-label="Excalidraw drawings"
          >
            {items.map((drawing, idx) => {
              const headingId = `drawing-heading-${idx}`;
              const contentId = `drawing-content-${idx}`;

              return (
                <div
                  key={`drawing-${idx}`}
                  className="card-glow border-border/40 hover:border-accent/40 group relative flex w-full flex-col overflow-hidden rounded-lg border p-5 text-left transition-all duration-300"
                >
                  <button
                    id={headingId}
                    onClick={() =>
                      setExpandedIdx(expandedIdx === idx ? null : idx)
                    }
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    aria-expanded={expandedIdx === idx}
                    aria-controls={contentId}
                    className="relative z-10 flex w-full items-center justify-between gap-3 focus-visible:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-accent/5 text-accent/60 group-hover:text-accent rounded-lg p-2 transition-colors">
                        <ImageIcon size={18} />
                      </div>
                      <h3 className="text-foreground/95 group-hover:text-foreground flex-1 font-semibold transition-colors duration-300">
                        {drawing.title}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`text-accent/50 group-hover:text-accent shrink-0 transition-transform duration-300 ${
                        expandedIdx === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    id={contentId}
                    className={`grid w-full transition-all duration-300 ease-in-out ${
                      expandedIdx === idx
                        ? 'border-border/30 mt-4 grid-rows-[1fr] border-t pt-4 opacity-100'
                        : 'mt-0 grid-rows-[0fr] border-transparent pt-0 opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-foreground/70 mb-6 text-sm leading-relaxed">
                        {drawing.description}
                      </p>
                      <div className="border-border/40 overflow-hidden rounded-xl border bg-white/5 p-2">
                        <img
                          src={drawing.svgPath}
                          alt={drawing.title}
                          className="block h-auto w-full hue-rotate-180 invert-[0.9] transition-all dark:hue-rotate-0 dark:invert-0"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
