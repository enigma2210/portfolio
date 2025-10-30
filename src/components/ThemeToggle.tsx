import { Snowflake, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-50 group p-4 bg-gow-near-black/80 backdrop-blur-md border-2 border-gow-gold/30 hover:border-gow-gold rounded-sm shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gow-gold"
      aria-label={`Switch to ${theme === 'aurora' ? 'ember' : 'aurora'} theme`}
      title={`Switch to ${theme === 'aurora' ? 'Ember' : 'Aurora'} Theme`}
    >
      <div className="relative w-8 h-8">
        {theme === 'aurora' ? (
          <Snowflake className="w-8 h-8 text-gow-aurora group-hover:text-gow-icy transition-colors animate-pulse" />
        ) : (
          <Flame className="w-8 h-8 text-gow-ember group-hover:text-gow-molten transition-colors animate-pulse" />
        )}
      </div>
      <div className={`absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'aurora' ? 'bg-gow-aurora/10' : 'bg-gow-ember/10'}`}></div>
    </button>
  );
}
