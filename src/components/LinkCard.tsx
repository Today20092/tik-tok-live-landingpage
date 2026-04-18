import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Play, Tv2 } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  url?: string;
  youtube?: string;
  featured?: boolean;
  variant?: 'default' | 'featured' | 'charity' | 'stream-pick';
}

function YouTubeReveal({ youtube, title }: { youtube: string; title: string }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="plain-divider">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-3 py-5 text-left focus-visible:ring-2 focus-visible:outline-none md:gap-4"
        aria-expanded={open}
      >
        <div className="row-icon mt-1">
          <Tv2 size={18} strokeWidth={1.9} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="row-meta">Video</p>
              <h3 className="text-[2rem] leading-[1.15] text-foreground md:text-[2.15rem]">
                {title}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-3 pt-1">
              <span className="hidden text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:inline">
                {open ? 'Open' : 'Closed'}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pl-[3.25rem] md:pl-14">
            <div className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-black/90">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${youtube}`}
                  title={title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LinkCard({
  icon,
  title,
  description,
  href,
  url,
  youtube,
  featured = false,
  variant,
}: LinkCardProps) {
  const resolvedHref = href ?? url;
  const resolvedVariant = variant ?? (featured ? 'featured' : 'default');

  if (youtube) {
    return <YouTubeReveal youtube={youtube} title={title} />;
  }

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noopener noreferrer"
      className="row-link focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="row-icon">
        <DynamicIcon name={icon} size={18} strokeWidth={1.9} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="row-meta">
          {resolvedVariant === 'featured'
            ? 'Primary'
            : resolvedVariant === 'stream-pick'
              ? 'From the stream'
              : resolvedVariant === 'charity'
                ? 'Support'
                : 'Resource'}
        </p>
        <h3 className="row-title">{title}</h3>
        <p className="row-description">{description}</p>
      </div>
      <div className="row-arrow self-center" aria-hidden="true">
        {youtube ? <Play size={16} /> : <ArrowUpRight size={16} />}
      </div>
    </a>
  );
}
