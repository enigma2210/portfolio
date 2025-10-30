import { Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AudioToggle() {
  const { audioEnabled, toggleAudio, theme } = useTheme();

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-8 right-28 z-50 group p-4 bg-gow-near-black/80 backdrop-blur-md border-2 border-gow-gold/30 hover:border-gow-gold rounded-sm shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gow-gold"
      aria-label={audioEnabled ? 'Mute audio' : 'Enable audio'}
      title={audioEnabled ? 'Mute Audio' : 'Enable Audio'}
    >
      <div className="relative w-8 h-8">
        {audioEnabled ? (
          <Volume2 className={`w-8 h-8 transition-colors ${theme === 'aurora' ? 'text-gow-aurora' : 'text-gow-ember'}`} />
        ) : (
          <VolumeX className="w-8 h-8 text-gow-silver" />
        )}
      </div>
    </button>
  );
}
