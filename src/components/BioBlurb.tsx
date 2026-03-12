import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface BioBlurbProps {
  html: string;
}

export default function BioBlurb({ html }: BioBlurbProps) {
  const [expanded, setExpanded] = useState(false);
  const lines = html.split('\n').filter(line => line.trim() && line.trim() !== '<p></p>');
  const preview = lines[0];
  const rest = lines.slice(1).join('\n');

  return (
    <div className="text-center">
      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-12 bg-accent/30"></div>
        <span className="text-accent/60 text-lg">✦</span>
        <div className="h-px w-12 bg-accent/30"></div>
      </div>

      {/* Welcome heading - always visible */}
      <div
        className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl mx-auto prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: preview }}
      />

      {/* Expandable details */}
      {rest && (
        <div className="mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? 'Show less' : 'Read more about Islamic Education'}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent/70 hover:text-accent transition-colors duration-300 group"
          >
            <span>{expanded ? 'Show less' : 'Read more'}</span>
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>

          {expanded && (
            <div className="mt-6 mx-auto max-w-xl text-left">
              <div className="px-6 py-5 rounded-lg border border-border/30 bg-card/50">
                <div
                  className="text-sm text-foreground/70 leading-relaxed prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: rest }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom decorative divider */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="h-px w-12 bg-accent/30"></div>
        <span className="text-accent/60 text-lg">✦</span>
        <div className="h-px w-12 bg-accent/30"></div>
      </div>
    </div>
  );
}
