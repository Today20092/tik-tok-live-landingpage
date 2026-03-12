import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items: FAQItem[];
}

export default function FAQ({
  title = 'The Why: Understanding Islamic Concepts',
  items,
}: FAQProps) {
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        <h2 className="text-foreground group-hover:text-accent font-serif text-3xl font-bold tracking-tight transition-colors duration-300 md:text-4xl">
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

      {/* FAQ Items (Grid animation for smooth collapse) */}
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
            aria-label="Frequently asked questions"
          >
            {items.map((faq, idx) => {
              const headingId = `faq-heading-${idx}`;
              const contentId = `faq-content-${idx}`;

              return (
                <div
                  key={`faq-${idx}`}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className="card-glow border-l-accent hover:border-accent/60 bg-card/60 hover:bg-card group relative flex w-full flex-col overflow-hidden rounded-lg border-l-4 transition-all duration-300 hover:shadow-sm"
                >
                  <button
                    id={headingId}
                    onClick={() => {
                      const isOpening = expandedIdx !== idx;
                      setExpandedIdx(expandedIdx === idx ? null : idx);
                      if (isOpening) {
                        setTimeout(() => {
                          itemRefs.current[idx]?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                          });
                        }, 50);
                      }
                    }}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    aria-expanded={expandedIdx === idx}
                    aria-controls={contentId}
                    className="relative z-10 flex w-full items-center justify-between gap-3 p-5 pl-6 text-left focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <div className="flex flex-1 items-baseline gap-3">
                      <span className="text-foreground/30 font-mono text-xs shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-foreground/95 group-hover:text-foreground font-semibold transition-colors duration-300">
                        {faq.question}
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
                        ? 'border-border/30 grid-rows-[1fr] border-t opacity-100'
                        : 'grid-rows-[0fr] border-transparent opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="text-foreground/70 prose dark:prose-invert relative z-10 max-w-none p-5 pl-6 pt-4 text-base leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
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
