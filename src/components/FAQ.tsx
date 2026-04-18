import { useRef, useState } from 'react';
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
  title = 'Frequently asked questions',
  items,
}: FAQProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpandedIdx(expandedIdx === idx ? null : idx);
    }
  };

  return (
    <div className="reveal-up">
      <div className="mb-4">
        <p className="eyebrow mb-2">FAQ</p>
        <h2 className="text-3xl text-foreground md:text-4xl">{title}</h2>
      </div>

      <div className="plain-divider">
        {items.map((faq, idx) => {
          const headingId = `faq-heading-${idx}`;
          const contentId = `faq-content-${idx}`;

          return (
            <div
              key={`faq-${idx}`}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className="plain-divider last:border-b-0"
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
                className="flex w-full items-start gap-4 py-5 text-left focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl leading-tight text-foreground md:text-[1.35rem]">
                    {faq.question}
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
                  <div className="pb-5 pl-10">
                    <div
                      className="prose max-w-none text-[0.98rem] leading-7"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
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
