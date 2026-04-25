'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../i18n/routing';
import { Button } from '../ui/button';
import { Languages, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
];

export default function LanguageSwitcherBubble() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const isDarkMode = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Theme Toggle Bubble */}
      <Button
        onClick={toggleTheme}
        className="rounded-full w-12 h-12 shadow-lg bg-background border-2 border-primary text-primary hover:bg-accent"
        size="icon"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg"
          variant="default"
          aria-label="Change language"
        >
          <Languages className="h-5 w-5" />
          <span className="ml-2 text-xs font-semibold">{currentLang.label}</span>
        </Button>

        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-lg shadow-xl border p-2 min-w-[120px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full text-left px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${
                  locale === lang.code ? 'bg-gray-100 dark:bg-slate-700 font-semibold' : ''
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

