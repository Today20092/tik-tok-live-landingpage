import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpandedIdx(expandedIdx === idx ? null : idx);
    }
  };

  return (
    <div className="space-y-4" role="region" aria-label="Frequently asked questions">
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
            className="w-full text-left p-5 card-glow rounded-lg border border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none transition-all duration-300 group relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 relative z-10">
              <h3 className="font-semibold text-foreground/95 flex-1 group-hover:text-foreground transition-colors duration-300">{faq.question}</h3>
              <ChevronDown
                size={20}
                aria-hidden="true"
                className={`text-accent/50 group-hover:text-accent flex-shrink-0 transition-all duration-300 ${
                  expandedIdx === idx ? 'rotate-180' : ''
                }`}
              />
            </div>

            {expandedIdx === idx && (
              <div
                id={contentId}
                className="mt-4 pt-4 border-t border-border/30 text-sm text-foreground/70 leading-relaxed prose dark:prose-invert max-w-none relative z-10"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
