import { ArrowUpRight, Heart, Play, Sparkles, Tv2 } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  youtube?: string;
  featured?: boolean;
  variant?: 'default' | 'featured' | 'charity' | 'stream-pick';
}

const labels = {
  featured: { text: 'Start', Icon: Sparkles },
  charity: { text: 'Urgent', Icon: Heart },
  'stream-pick': { text: 'Stream pick', Icon: Tv2 },
  default: null,
};

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

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card link-card--${resolvedVariant}`}
    >
      <span className="link-card__icon" aria-hidden="true">
        {youtube ? (
          <Play size={22} className="fill-current" />
        ) : (
          <>
            <DynamicIcon name={icon} size={22} />
            {!icon.match(/^[a-zA-Z]/) && icon}
          </>
        )}
      </span>

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
