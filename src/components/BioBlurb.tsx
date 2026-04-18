import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface BioBlurbProps {
  html: string;
}

export default function BioBlurb({ html }: BioBlurbProps) {
  const [expanded, setExpanded] = useState(false);
  const lines = html
    .split('\n')
    .filter((line) => line.trim() && line.trim() !== '<p></p>');
  const preview = lines[0];
  const rest = lines.slice(1).join('\n');

  return (
    <div className="reveal-up reveal-delay-1">
      <div
        className="prose max-w-none text-[1rem] leading-7 md:text-[1.05rem]"
        dangerouslySetInnerHTML={{ __html: preview }}
      />

      {rest && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? 'Show less' : 'Read more'}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:outline-none"
          >
            <span>{expanded ? 'Show less' : 'Read more'}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            className={`grid transition-all duration-400 ease-out ${
              expanded ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div
                className="prose max-w-none text-[0.98rem] leading-7"
                dangerouslySetInnerHTML={{ __html: rest }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
