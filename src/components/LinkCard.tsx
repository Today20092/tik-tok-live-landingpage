import { ArrowRight } from 'lucide-react';

interface LinkCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function LinkCard({ icon, title, description, href }: LinkCardProps) {
  return (
    <a
      href={href}
      className="block p-5 bg-card rounded-lg border border-border hover:border-accent hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-semibold text-accent group-hover:text-accent/80 transition-colors">
              {title}
            </h3>
          </div>
          <p className="text-sm text-foreground/70 leading-relaxed">{description}</p>
        </div>
        <ArrowRight
          size={20}
          className="text-accent/60 group-hover:text-accent flex-shrink-0 mt-1 transition-colors"
        />
      </div>
    </a>
  );
}
