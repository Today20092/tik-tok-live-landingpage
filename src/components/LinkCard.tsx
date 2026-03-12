import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  youtube?: string;
}

export default function LinkCard({ icon, title, description, href, youtube }: LinkCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setShowVideo(!showVideo);
    }
  };

  if (youtube) {
    return (
      <button
        onClick={() => setShowVideo(!showVideo)}
        onKeyDown={handleKeyDown}
        aria-label={`${title} — ${showVideo ? 'Hide video' : 'Show video'}`}
        aria-expanded={showVideo}
        className="w-full text-left p-5 card-glow rounded-lg border border-border/40 hover:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none transition-all duration-300 group relative overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                {title}
              </h3>
            </div>
            <p className="text-sm text-foreground/65 leading-relaxed">{description}</p>
          </div>
          <div className="text-accent/50 group-hover:text-accent flex-shrink-0 mt-1 transition-all duration-300" aria-hidden="true">
            {showVideo ? <X size={20} /> : <ArrowRight size={20} />}
          </div>
        </div>
        {showVideo && (
          <div className="mt-4 pt-4 border-t border-border/30 relative z-10">
            <iframe
              width="100%"
              height="240"
              src={`https://www.youtube.com/embed/${youtube}`}
              title={`${title} — YouTube video embed`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            />
          </div>
        )}
      </button>
    );
  }

  return (
    <a
      href={href}
      className="block p-5 card-glow rounded-lg border border-border/40 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl" aria-hidden="true">{icon}</span>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
          </div>
          <p className="text-sm text-foreground/65 leading-relaxed">{description}</p>
        </div>
        <ArrowRight
          size={20}
          aria-hidden="true"
          className="text-accent/50 group-hover:text-accent flex-shrink-0 mt-1 transition-all duration-300"
        />
      </div>
    </a>
  );
}
