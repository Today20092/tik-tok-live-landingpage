import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // @ts-ignore - Dynamic access to Lucide icons
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // If the icon name doesn't exist, we return a fallback or nothing
    // This allows emojis to be passed through the same prop and handled by the parent
    return null;
  }

  return <IconComponent {...props} />;
}
