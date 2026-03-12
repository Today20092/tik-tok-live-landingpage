import { useState } from 'react';
import { ArrowRight, Star, Heart } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  youtube?: string;
  featured?: boolean;
  variant?: 'default' | 'featured' | 'charity';
}

function YouTubeEmbed({ youtube, title }: { youtube: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [triedHq, setTriedHq] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  const isPlaylist = youtube.startsWith('videoseries');

  // Playlists: render iframe directly (YouTube shows its own thumbnail preview)
  if (isPlaylist) {
    return (
      <div
        className="relative z-10 mt-4 aspect-video overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtube}&rel=0&modestbranding=1`}
          title={`${title} — YouTube playlist`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  // Individual videos: thumbnail facade → click to play
  return (
    <div
      className="relative z-10 mt-4 overflow-hidden rounded-lg"
      onClick={(e) => {
        e.preventDefault();
        setIsPlaying(true);
      }}
    >
      {isPlaying ? (
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtube}?autoplay=1&rel=0&modestbranding=1`}
            title={`${title} — YouTube video`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="group/thumb relative aspect-video cursor-pointer">
          {!thumbFailed ? (
            <img
              src={
                triedHq
                  ? `https://img.youtube.com/vi/${youtube}/hqdefault.jpg`
                  : `https://img.youtube.com/vi/${youtube}/maxresdefault.jpg`
              }
              alt={`${title} — video thumbnail`}
              className="h-full w-full object-cover"
              onError={() => {
                if (!triedHq) setTriedHq(true);
                else setThumbFailed(true);
              }}
            />
          ) : (
            <div className="h-full w-full bg-accent/10" />
          )}
          <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover/thumb:bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 group-hover/thumb:scale-110">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 translate-x-0.5 text-red-600"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LinkCard({
  icon,
  title,
  description,
  href,
  youtube,
  featured = false,
  variant,
}: LinkCardProps) {
  const resolvedVariant = variant ?? (featured ? 'featured' : 'default');

  if (resolvedVariant === 'charity') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card-glow border-primary/40 bg-primary/5 hover:bg-primary/10 relative block overflow-hidden rounded-lg border-2 p-6 pl-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 focus-visible:ring-2 focus-visible:outline-none"
      >
        {/* Sadaqah badge */}
        <div className="mb-2 flex justify-end">
          <div className="flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
            <Heart size={9} className="fill-primary" aria-hidden="true" />
            Sadaqah
          </div>
        </div>

        <div className="relative z-10 mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                <DynamicIcon name={icon} size={26} className="text-primary" />
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
            className="text-primary mt-1 shrink-0 transition-all duration-300"
          />
        </div>

        {youtube && <YouTubeEmbed youtube={youtube} title={title} />}
      </a>
    );
  }

  if (resolvedVariant === 'featured') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="card-glow border-accent/50 bg-accent/5 hover:bg-accent/10 relative block overflow-hidden rounded-lg border-2 p-6 pl-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-accent/10 focus-visible:ring-2 focus-visible:outline-none"
      >

        {/* Featured badge */}
        <div className="mb-2 flex justify-end">
          <div className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
            <Star size={9} className="fill-accent" aria-hidden="true" />
            Start Here
          </div>
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

        {youtube && <YouTubeEmbed youtube={youtube} title={title} />}
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

      {youtube && <YouTubeEmbed youtube={youtube} title={title} />}
    </a>
  );
}
