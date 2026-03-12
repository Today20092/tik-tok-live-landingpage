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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      onKeyDown={handleKeyDown}
      aria-label={expanded ? 'Collapse biography section' : 'Expand biography section'}
      aria-expanded={expanded}
      className="w-full text-left px-6 py-5 card-glow rounded-lg border border-border/40 hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none transition-all duration-300 group"
    >
      <div className="flex items-center justify-between gap-3 relative z-10">
        <div
          className="text-sm text-foreground/85 leading-relaxed flex-1 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: preview }}
        />
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={`text-accent/70 group-hover:text-accent flex-shrink-0 transition-all duration-300 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      {expanded && rest && (
        <div
          className="mt-4 pt-4 border-t border-border/30 text-sm text-foreground/70 prose prose-invert max-w-none relative z-10"
          dangerouslySetInnerHTML={{ __html: rest }}
        />
      )}
    </button>
  );
}
