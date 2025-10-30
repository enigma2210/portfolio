import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'aurora' | 'ember';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('aurora');
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('gow-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedAudio = localStorage.getItem('gow-audio');
    if (savedAudio === 'true') {
      setAudioEnabled(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'aurora' ? 'ember' : 'aurora';
    setTheme(newTheme);
    localStorage.setItem('gow-theme', newTheme);
  };

  const toggleAudio = () => {
    const newAudioState = !audioEnabled;
    setAudioEnabled(newAudioState);
    localStorage.setItem('gow-audio', String(newAudioState));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, audioEnabled, toggleAudio }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
