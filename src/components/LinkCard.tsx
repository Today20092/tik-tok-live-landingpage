import { ArrowRight } from 'lucide-react';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  youtube?: string;
}

export default function LinkCard({ icon, title, description, href, youtube }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 shadow-sm card-glow rounded-lg border border-border/40 hover:border-accent/50 hover:shadow-md hover:shadow-accent/10 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3 relative z-10 mb-2">
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
          className="text-accent/50 group-hover:text-accent shrink-0 mt-1 transition-all duration-300"
        />
      </div>

      {youtube && (
        <div className="relative z-10 mt-4 pointer-events-none">
          <iframe
            width="100%"
            height="240"
            src={`https://www.youtube.com/embed/${youtube}${youtube.includes('?') ? '&' : '?'}controls=0&modestbranding=1&rel=0`}
            title={`${title} — YouTube video preview`}
            frameBorder="0"
            className="rounded-md w-full"
            tabIndex={-1}
          />
        </div>
      )}
    </a>
  );
}
