import { useState, useEffect } from 'react';
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
    // Suppress transitions on initial theme load
    html.classList.add('no-transition');

    // Check localStorage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) {
      setIsDark(stored === 'dark');
      applyTheme(stored === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      applyTheme(prefersDark);
    }

    // Remove no-transition class after initial paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        html.classList.remove('no-transition');
      });
    });

    // Listen for system preference changes
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
      className={`border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 focus-visible:ring-accent/50 fixed top-6 right-6 z-[9999] rounded-full border p-2 transition-[opacity,color,background-color,border-color] duration-300 focus-visible:ring-2 focus-visible:outline-none ${fullscreen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      {isDark ? (
        <Sun size={20} className="text-accent" />
      ) : (
        <Moon size={20} className="text-foreground/70" />
      )}
    </button>
  );
}
