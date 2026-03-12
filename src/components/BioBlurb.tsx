import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function BioBlurb() {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left px-6 py-4 bg-card rounded-lg border border-border hover:border-accent transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-foreground/90 leading-relaxed flex-1">
          Welcome to the Quran Reading Sessions. Join me on TikTok Live for daily readings of the Quran in English. Whether you're curious about Islam or seeking spiritual growth, this is a welcoming space for everyone.
        </p>
        <ChevronDown
          size={20}
          className={`text-accent flex-shrink-0 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm text-foreground/80">
          <p>
            These live sessions are designed to introduce the Quran's teachings in an accessible way. You'll find resources, answers to common questions, and links to deeper learning materials below.
          </p>
          <p>
            Feel free to ask questions in the chat or follow up here. No prior knowledge of Islam is needed—everyone is welcome.
          </p>
        </div>
      )}
    </button>
  );
}
