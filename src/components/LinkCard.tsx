import { ArrowUpRight, Play } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  url?: string;
  youtube?: string;
  featured?: boolean;
  variant?: 'default' | 'featured' | 'charity' | 'stream-pick' | 'video';
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
  const resolvedVariant = variant ?? (youtube ? 'video' : featured ? 'featured' : 'default');
  const isFeatured = resolvedVariant === 'featured';

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`live-row focus-visible:ring-2 focus-visible:outline-none`}
    >
      <div className="live-row-icon" aria-hidden="true">
        <DynamicIcon name={icon} size={20} strokeWidth={1.9} />
      </div>
      <div className="live-row-body">
        <p className="live-row-meta">
          {isFeatured
            ? 'Start here'
            : resolvedVariant === 'video'
              ? 'Video'
              : resolvedVariant === 'stream-pick'
                ? 'From the stream'
                : resolvedVariant === 'charity'
                  ? 'Support'
                  : 'Resource'}
        </p>
        <h3 className={`live-row-name ${isFeatured ? 'live-row-name-primary' : ''}`}>
          {title}
        </h3>
        <p className="live-row-desc">{description}</p>
      </div>
      <div className="live-row-arrow" aria-hidden="true">
        {resolvedVariant === 'video' ? (
          <Play size={16} />
        ) : (
          <ArrowUpRight size={16} />
        )}
      </div>
    </a>
  );
}
