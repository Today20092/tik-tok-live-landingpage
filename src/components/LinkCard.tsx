import { ArrowRight, Star } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  youtube?: string;
  featured?: boolean;
}

export default function LinkCard({
  icon,
  title,
  description,
  href,
  youtube,
  featured = false,
}: LinkCardProps) {
  if (featured) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card-glow border-accent/50 bg-accent/5 hover:bg-accent/10 relative block overflow-hidden rounded-lg border-2 p-6 pl-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-accent/10 focus-visible:ring-2 focus-visible:outline-none"
      >
        {/* Featured badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
          <Star size={9} className="fill-accent" aria-hidden="true" />
          Start Here
        </div>

        <div className="relative z-10 mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                <DynamicIcon name={icon} size={26} className="text-accent" />
                {!icon.match(/^[a-zA-Z]/) && icon}
              </span>
              <h3 className="text-foreground text-xl font-semibold transition-colors duration-300">
                {title}
              </h3>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <ArrowRight
            size={20}
            aria-hidden="true"
            className="text-accent mt-1 shrink-0 transition-all duration-300"
          />
        </div>

        {youtube && (
          <div className="pointer-events-none relative z-10 mt-4">
            <iframe
              width="100%"
              height="240"
              src={`https://www.youtube.com/embed/${youtube}${youtube.includes('?') ? '&' : '?'}controls=0&modestbranding=1&rel=0`}
              title={`${title} — YouTube video preview`}
              frameBorder="0"
              className="w-full rounded-md"
              tabIndex={-1}
            />
          </div>
        )}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-glow border-border/40 border-l-accent hover:border-accent/40 bg-card/60 hover:bg-card relative block overflow-hidden rounded-lg border-y border-r border-l-4 p-6 pl-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="relative z-10 mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">
              <DynamicIcon name={icon} size={24} className="text-accent" />
              {!icon.match(/^[a-zA-Z]/) && icon}
            </span>
            <h3 className="text-foreground group-hover:text-accent text-lg font-semibold transition-colors duration-300">
              {title}
            </h3>
          </div>
          <p className="text-foreground/65 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <ArrowRight
          size={20}
          aria-hidden="true"
          className="text-accent/50 group-hover:text-accent mt-1 shrink-0 transition-all duration-300"
        />
      </div>

      {youtube && (
        <div className="pointer-events-none relative z-10 mt-4">
          <iframe
            width="100%"
            height="240"
            src={`https://www.youtube.com/embed/${youtube}${youtube.includes('?') ? '&' : '?'}controls=0&modestbranding=1&rel=0`}
            title={`${title} — YouTube video preview`}
            frameBorder="0"
            className="w-full rounded-md"
            tabIndex={-1}
          />
        </div>
      )}
    </a>
  );
}
