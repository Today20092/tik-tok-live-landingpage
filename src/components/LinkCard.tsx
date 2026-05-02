import { ArrowUpRight, Heart, Play, Sparkles, Tv2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import DynamicIcon from './DynamicIcon';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  youtube?: string;
  featured?: boolean;
  variant?: 'default' | 'featured' | 'primary' | 'charity' | 'stream-pick';
}

const labels = {
  primary: { text: 'Start here', Icon: Sparkles },
  featured: { text: 'Start', Icon: Sparkles },
  charity: { text: 'Urgent', Icon: Heart },
  'stream-pick': { text: 'Stream pick', Icon: Tv2 },
  default: null,
};

const playlistThumbnailIds: Record<string, string> = {
  'PLlZazEh_c4nScNCvGBn8OEf6ujk-sDUpg': 'sQMC7fkjmOA',
  'PL9821CA747E7E0674': 'IQjzErJlpJ0',
};

const variantClasses = {
  primary:
    'border-accent/70 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent),transparent_86%),transparent_58%),color-mix(in_srgb,var(--paper),var(--color-white)_22%)] shadow-[0_20px_54px_color-mix(in_srgb,var(--color-stone-900),transparent_88%)] [--card-accent:var(--accent)]',
  featured: '[--card-accent:var(--accent)]',
  charity: '[--card-accent:var(--coral)]',
  'stream-pick': '[--card-accent:var(--gold)]',
  default: '[--card-accent:var(--blue)]',
};

function getYouTubeThumbnail(youtube?: string) {
  if (!youtube) return null;

  if (youtube.startsWith('videoseries')) {
    const playlistId = new URLSearchParams(youtube.split('?')[1]).get('list');
    const videoId = playlistId ? playlistThumbnailIds[playlistId] : null;
    return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
  }

  return `https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`;
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
  const badge = labels[resolvedVariant];
  const BadgeIcon = badge?.Icon;
  const thumbnail = getYouTubeThumbnail(youtube);
  const isVideo = Boolean(youtube);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        'group relative grid min-h-24 grid-cols-[2.625rem_minmax(0,1fr)_1.5rem] items-center gap-2.5 overflow-hidden rounded-xl border border-border bg-white/40 p-3 text-inherit no-underline transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--card-accent),transparent_38%)] hover:bg-[color-mix(in_srgb,var(--paper),var(--color-white)_18%)] hover:shadow-[0_16px_38px_color-mix(in_srgb,var(--color-stone-900),transparent_88%)] focus-visible:border-[var(--card-accent)] focus-visible:shadow-[0_16px_38px_color-mix(in_srgb,var(--color-stone-900),transparent_86%)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,var(--card-accent),transparent_58%)] dark:bg-white/[0.04] dark:hover:bg-white/[0.07] min-[521px]:grid-cols-[2.875rem_minmax(0,1fr)_2.125rem] min-[521px]:gap-3 min-[521px]:p-3.5',
        isVideo &&
          'min-h-0 grid-cols-[minmax(0,1fr)_1.5rem] min-[521px]:min-h-32 min-[521px]:grid-cols-[minmax(8rem,10rem)_minmax(0,1fr)_2.125rem]',
        variantClasses[resolvedVariant],
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--card-accent),transparent_64%)] opacity-10"
        aria-hidden="true"
      />

      {thumbnail ? (
        <span
          className="relative col-span-full block aspect-video overflow-hidden rounded-[0.625rem] border border-[color-mix(in_srgb,var(--card-accent),transparent_54%)] bg-[color-mix(in_srgb,var(--card-accent),transparent_86%)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-white),transparent_91%)] min-[521px]:col-span-1"
          aria-hidden="true"
        >
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            width="480"
            height="360"
            loading="eager"
            decoding="async"
            className="block h-full w-full object-cover saturate-95 contrast-105 transition-transform duration-200 group-hover:scale-[1.045]"
          />
          <span
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,color-mix(in_srgb,var(--color-black),transparent_64%)),radial-gradient(circle_at_50%_50%,transparent_0_22px,color-mix(in_srgb,var(--color-black),transparent_82%)_23px_100%)]"
            aria-hidden="true"
          />
          <span className="absolute inset-0 z-10 m-auto grid size-10 place-items-center rounded-full border border-white/60 bg-stone-950/75 text-stone-50 shadow-[0_10px_28px_color-mix(in_srgb,var(--color-black),transparent_72%)]">
            <Play size={20} className="fill-current" />
          </span>
        </span>
      ) : (
        <span
          className="relative grid size-10 place-items-center rounded-[0.625rem] border border-[color-mix(in_srgb,var(--card-accent),transparent_58%)] bg-[color-mix(in_srgb,var(--card-accent),transparent_88%)] text-[var(--card-accent)] min-[521px]:size-12"
          aria-hidden="true"
        >
          <DynamicIcon name={icon} size={22} />
          {!icon.match(/^[a-zA-Z]/) && icon}
        </span>
      )}

      <span
        className={twMerge(
          'relative grid min-w-0 gap-1',
          isVideo && 'col-start-1 min-[521px]:col-start-auto',
        )}
      >
        <span className="grid min-h-6 min-w-0 grid-cols-[minmax(0,1fr)_6rem] items-start gap-2 min-[521px]:grid-cols-[minmax(0,1fr)_7rem]">
          <span className="text-base leading-tight font-bold text-foreground">
            {title}
          </span>
          {badge && BadgeIcon && (
            <span className="inline-flex justify-self-end rounded-full bg-[color-mix(in_srgb,var(--card-accent),transparent_84%)] px-2 py-1 text-[0.66rem] leading-none font-extrabold whitespace-nowrap text-[var(--card-accent)] min-[521px]:gap-1 min-[521px]:text-[0.7rem]">
              <BadgeIcon size={12} aria-hidden="true" />
              {badge.text}
            </span>
          )}
        </span>
        <span className="text-sm leading-[1.38] text-[var(--ink-soft)]">
          {description}
        </span>
      </span>

      <span
        className={twMerge(
          'relative grid place-items-center text-[var(--card-accent)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
          isVideo && 'col-start-2 row-start-2 self-start min-[521px]:col-start-auto min-[521px]:row-start-auto min-[521px]:self-auto',
        )}
        aria-hidden="true"
      >
        <ArrowUpRight size={20} />
      </span>
    </a>
  );
}
