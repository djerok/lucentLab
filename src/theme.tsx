import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'dark' | 'light';
const KEY = 'lucent.theme';

function loadTheme(): Theme {
  if (typeof localStorage === 'undefined') return 'dark';
  const v = localStorage.getItem(KEY);
  if (v === 'light' || v === 'dark') return v;
  // first visit: respect OS preference
  if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

const Ctx = createContext<{ theme: Theme; toggle: () => void; set: (t: Theme) => void }>({
  theme: 'dark',
  toggle: () => {},
  set: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(loadTheme);

  // Sync to <html data-theme=...> so CSS overrides apply globally.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const value = {
    theme,
    set: setTheme,
    toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme() { return useContext(Ctx); }
