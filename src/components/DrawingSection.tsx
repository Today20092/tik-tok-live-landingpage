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

export default function DrawingSection({ title = "Visual Learning Hub", items }: DrawingSectionProps) {
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
        className="w-full flex items-center justify-between text-left mb-6 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg p-2 -ml-2"
        aria-expanded={isSectionOpen}
      >
        <h2 className="text-3xl md:text-3xl font-serif font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
          {title}
        </h2>
        <div className="p-2 rounded-full bg-accent/5 group-hover:bg-accent/10 border border-transparent group-hover:border-accent/20 transition-all duration-300">
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
          isSectionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 pt-2 pb-4" role="region" aria-label="Excalidraw drawings">
            {items.map((drawing, idx) => {
              const headingId = `drawing-heading-${idx}`;
              const contentId = `drawing-content-${idx}`;

              return (
                <div
                  key={`drawing-${idx}`}
                  className="w-full text-left p-5 card-glow rounded-lg border border-border/40 hover:border-accent/40 transition-all duration-300 group relative overflow-hidden flex flex-col"
                >
                  <button
                    id={headingId}
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    aria-expanded={expandedIdx === idx}
                    aria-controls={contentId}
                    className="flex items-center justify-between gap-3 relative z-10 w-full focus-visible:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/5 text-accent/60 group-hover:text-accent transition-colors">
                        <ImageIcon size={18} />
                      </div>
                      <h3 className="font-semibold text-foreground/95 flex-1 group-hover:text-foreground transition-colors duration-300">
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
                    className={`grid transition-all duration-300 ease-in-out w-full ${
                      expandedIdx === idx ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-border/30' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-transparent'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                        {drawing.description}
                      </p>
                      <div className="rounded-xl border border-border/40 bg-white/5 overflow-hidden p-2">
                        <img 
                          src={drawing.svgPath} 
                          alt={drawing.title}
                          className="w-full h-auto block invert-[0.9] hue-rotate-180 dark:invert-0 dark:hue-rotate-0 transition-all"
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
