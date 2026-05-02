import {
  Book,
  BookOpen,
  HeartHandshake,
  Mail,
  PackageOpen,
  PencilLine,
  Scroll,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

const icons: Record<string, LucideIcon> = {
  Book,
  BookOpen,
  HeartHandshake,
  Mail,
  PackageOpen,
  PencilLine,
  Scroll,
};

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent {...props} />;
}
