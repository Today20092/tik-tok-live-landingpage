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
    return () => mediaQuery.removeEventListener('change', handleChange);
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
      className="border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 focus-visible:ring-accent/50 fixed top-6 right-6 z-50 rounded-full border p-2 transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none"
    >
      {isDark ? (
        <Sun size={20} className="text-accent" />
      ) : (
        <Moon size={20} className="text-foreground/70" />
      )}
    </button>
  );
}
