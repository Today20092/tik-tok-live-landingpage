import { ArrowUpRight, Heart, Play, Sparkles, Tv2 } from 'lucide-react';
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

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card link-card--${resolvedVariant} ${youtube ? 'link-card--video' : ''}`}
    >
      {thumbnail ? (
        <span className="link-card__thumb" aria-hidden="true">
          <img src={thumbnail} alt="" width="480" height="360" loading="lazy" />
          <span className="link-card__play">
            <Play size={20} className="fill-current" />
          </span>
        </span>
      ) : (
        <span className="link-card__icon" aria-hidden="true">
          <DynamicIcon name={icon} size={22} />
          {!icon.match(/^[a-zA-Z]/) && icon}
        </span>
      )}

      <span className="link-card__body">
        <span className="link-card__topline">
          <span className="link-card__title">{title}</span>
          {badge && BadgeIcon && (
            <span className="link-card__badge">
              <BadgeIcon size={12} aria-hidden="true" />
              {badge.text}
            </span>
          )}
        </span>
        <span className="link-card__description">{description}</span>
      </span>

      <span className="link-card__arrow" aria-hidden="true">
        <ArrowUpRight size={20} />
      </span>
    </a>
  );
}
