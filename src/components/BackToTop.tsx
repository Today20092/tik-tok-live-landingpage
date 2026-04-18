import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="glass-chrome fixed right-4 bottom-4 z-50 flex h-10 w-10 items-center justify-center rounded-full text-foreground/72 hover:text-foreground focus-visible:ring-2 focus-visible:outline-none md:right-6 md:bottom-6"
      aria-label="Back to top"
    >
      <ChevronUp className="h-4 w-4" />
    </button>
  );
}
