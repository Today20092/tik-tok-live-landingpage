import { ArrowRight } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  youtube?: string;
}

export default function LinkCard({
  icon,
  title,
  description,
  href,
  youtube,
}: LinkCardProps) {
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
              <DynamicIcon
                name={icon}
                size={24}
                className="text-accent"
              />
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
