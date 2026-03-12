import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface BioBlurbProps {
  html: string;
}

export default function BioBlurb({ html }: BioBlurbProps) {
  const [expanded, setExpanded] = useState(true);
  const lines = html
    .split('\n')
    .filter((line) => line.trim() && line.trim() !== '<p></p>');
  const preview = lines[0];
  const rest = lines.slice(1).join('\n');

  return (
    <div className="text-center">
      {/* Decorative divider */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <div className="bg-accent/30 h-px w-12"></div>
        <span className="text-accent/60 text-lg">✦</span>
        <div className="bg-accent/30 h-px w-12"></div>
      </div>

      {/* Welcome heading - always visible */}
      <div
        className="text-foreground/80 prose dark:prose-invert mx-auto max-w-xl text-base leading-relaxed md:text-lg"
        dangerouslySetInnerHTML={{ __html: preview }}
      />

      {/* Expandable details */}
      {rest && (
        <div className="mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={
              expanded ? 'Show less' : 'Read more about Islamic Education'
            }
            className="text-accent/70 hover:text-accent group inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300"
          >
            <span>{expanded ? 'Show less' : 'Read more'}</span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>

          {expanded && (
            <div className="mt-6 text-left">
              <div className="border-border/30 bg-card/50 rounded-lg border px-6 py-5">
                <div
                  className="text-foreground/70 prose dark:prose-invert max-w-none text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: rest }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom decorative divider */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="bg-accent/30 h-px w-12"></div>
        <span className="text-accent/60 text-lg">✦</span>
        <div className="bg-accent/30 h-px w-12"></div>
      </div>
    </div>
  );
}
