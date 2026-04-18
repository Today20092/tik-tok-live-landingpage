import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const applyTheme = (dark: boolean) => {
  const html = document.documentElement;
  if (dark) {
    html.classList.add('dark');
    html.style.colorScheme = 'dark';
  } else {
    html.classList.remove('dark');
    html.style.colorScheme = 'light';
  }
};

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const html = document.documentElement;
    html.classList.add('no-transition');

    const stored = localStorage.getItem('theme');
    if (stored) {
      setIsDark(stored === 'dark');
      applyTheme(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      applyTheme(prefersDark);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        html.classList.remove('no-transition');
      });
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    const handleFullscreen = (e: Event) => {
      setFullscreen((e as CustomEvent<{ active: boolean }>).detail.active);
    };
    window.addEventListener('fullscreen-drawing', handleFullscreen);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('fullscreen-drawing', handleFullscreen);
    };
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    applyTheme(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`glass-chrome fixed top-4 right-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-full text-foreground/78 hover:text-foreground focus-visible:ring-2 focus-visible:outline-none md:top-6 md:right-6 ${fullscreen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      {isDark ? <Sun size={16} className="text-foreground/82" /> : <Moon size={16} />}
    </button>
  );
}
