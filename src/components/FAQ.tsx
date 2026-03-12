import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items: FAQItem[];
}

export default function FAQ({ title = "The Why: Understanding Islamic Concepts", items }: FAQProps) {
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

      {/* FAQ Items (Grid animation for smooth collapse) */}
      <div 
        className={`grid transition-all duration-500 ease-in-out ${
          isSectionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 pt-2 pb-4" role="region" aria-label="Frequently asked questions">
            {items.map((faq, idx) => {
              const headingId = `faq-heading-${idx}`;
              const contentId = `faq-content-${idx}`;

              return (
                <button
                  key={`faq-${idx}`}
                  id={headingId}
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-expanded={expandedIdx === idx}
                  aria-controls={contentId}
                  className="w-full text-left p-5 card-glow rounded-lg border border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none transition-all duration-300 group relative overflow-hidden flex flex-col"
                >
                  <div className="flex items-center justify-between gap-3 relative z-10 w-full">
                    <h3 className="font-semibold text-foreground/95 flex-1 group-hover:text-foreground transition-colors duration-300">{faq.question}</h3>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`text-accent/50 group-hover:text-accent flex-shrink-0 transition-transform duration-300 ${
                        expandedIdx === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <div 
                    id={contentId}
                    className={`grid transition-all duration-300 ease-in-out w-full ${
                      expandedIdx === idx ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-border/30' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-transparent'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="text-sm text-foreground/70 leading-relaxed prose dark:prose-invert max-w-none relative z-10"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
