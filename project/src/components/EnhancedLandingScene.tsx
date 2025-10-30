import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function EnhancedLandingScene() {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [showSerpent, setShowSerpent] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShowSerpent(true), 2000);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const themeColors = theme === 'aurora'
    ? {
        primary: 'gow-aurora',
        secondary: 'gow-icy',
        gradient: 'aurora-veil',
        glow: 'rgba(79, 176, 255, 0.6)',
      }
    : {
        primary: 'gow-ember',
        secondary: 'gow-molten',
        gradient: 'ember-forge',
        glow: 'rgba(212, 63, 47, 0.6)',
      };

  return (
    <section id="arrival" className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/assets/muspelheim.png)'
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-gow-black/40 via-gow-near-black/30 to-gow-deep-gray/50"
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent)',
          backgroundSize: '200px 200px, 300px 300px, 150px 150px',
          backgroundPosition: '0 0, 40px 60px, 130px 270px',
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-${themeColors.primary}/20 rounded-full blur-3xl animate-aurora`}
        style={{ transform: `translate(-50%, ${scrollY * 0.15}px)` }}
      />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-12 opacity-20 animate-rune-rotate">
        {['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ'].map((rune, i) => (
          <div
            key={i}
            className={`text-6xl font-bold text-${themeColors.primary}`}
            style={{
              textShadow: `0 0 20px ${themeColors.glow}`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {rune}
          </div>
        ))}
      </div>

      {showSerpent && (
        <div className="absolute top-1/2 left-0 w-full h-32 animate-serpent-emerge pointer-events-none">
          <svg viewBox="0 0 1200 100" className="w-full h-full opacity-60">
            <path
              d="M 0,50 Q 200,20 400,50 T 800,50 Q 1000,30 1200,50"
              stroke={theme === 'aurora' ? '#4fb0ff' : '#d43f2f'}
              strokeWidth="3"
              fill="none"
              opacity="0.7"
            />
            <circle cx="1180" cy="50" r="15" fill={theme === 'aurora' ? '#9fd9ff' : '#ff6a3d'} opacity="0.8" />
          </svg>
        </div>
      )}

      <div className="absolute left-24 bottom-32 opacity-60 animate-guide-breath hidden md:block" style={{ transform: `translateY(${scrollY * 0.25}px)` }}>
        <svg width="120" height="180" viewBox="0 0 120 180" className="drop-shadow-2xl">
          <ellipse cx="60" cy="170" rx="30" ry="8" fill={theme === 'aurora' ? '#4fb0ff' : '#d43f2f'} opacity="0.3" />

          <path
            d="M 40,160 L 35,120 L 45,80 L 60,40 L 75,80 L 85,120 L 80,160 Z"
            fill={theme === 'aurora' ? '#1b1c22' : '#0b0b0e'}
            stroke={theme === 'aurora' ? '#4fb0ff' : '#d43f2f'}
            strokeWidth="2"
          />

          <path
            d="M 35,120 L 20,100 L 25,130 M 85,120 L 100,100 L 95,130"
            stroke={theme === 'aurora' ? '#4fb0ff' : '#d43f2f'}
            strokeWidth="2"
            fill="none"
            className="animate-cape-flutter origin-top"
          />

          <circle cx="60" cy="30" r="12" fill={theme === 'aurora' ? '#9fd9ff' : '#ff6a3d'} opacity="0.8" />

          <line x1="45" y1="90" x2="35" y2="70" stroke={theme === 'aurora' ? '#b7beca' : '#dab56a'} strokeWidth="3" />

          <circle cx="33" cy="68" r="4" fill={theme === 'aurora' ? '#4fb0ff' : '#d43f2f'} />
        </svg>
      </div>

      <div className={`relative z-10 h-full flex flex-col items-center justify-center px-4 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-6">
            <div className={`h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-${themeColors.primary} to-transparent animate-pulse-slow`}></div>
          </div>

          <div className="space-y-6">
            <h2 className={`text-3xl md:text-5xl font-bold text-${themeColors.secondary} tracking-wide animate-fade-in-delay`}>
              Rishabh Singh
            </h2>
            <p className={`text-xl md:text-2xl text-gow-gold font-medium tracking-widest animate-fade-in-delay-2`}>
              WARRIOR OF INNOVATION
            </p>
            <p className="text-base md:text-lg text-gow-silver max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-3">
              Where ancient wisdom meets artificial intelligence. Journey through the frozen realm
              where data becomes destiny and algorithms forge the future.
            </p>
          </div>

          <button
            onClick={scrollToContent}
            className={`group relative mt-12 px-10 py-4 bg-${themeColors.gradient} text-white font-bold text-lg tracking-wider rounded-sm border-2 border-${themeColors.primary} hover:border-gow-gold transition-all duration-300 hover:scale-105 animate-fade-in-delay-4 overflow-hidden focus:outline-none focus:ring-2 focus:ring-gow-gold`}
            style={{ boxShadow: `0 0 30px ${themeColors.glow}` }}
          >
            <span className="relative z-10">ENTER THE REALM</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gow-gold/50 to-gow-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className={`w-12 h-12 text-${themeColors.primary}`} strokeWidth={2} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gow-deep-gray to-transparent"></div>
    </section>
  );
}
