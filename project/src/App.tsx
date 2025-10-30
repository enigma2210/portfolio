import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import EnhancedLandingScene from './components/EnhancedLandingScene';
import EnhancedAboutSection from './components/EnhancedAboutSection';
import EnhancedProjectsSection from './components/EnhancedProjectsSection';
import EnhancedSkillsSection from './components/EnhancedSkillsSection';
import EnhancedAchievementsSection from './components/EnhancedAchievementsSection';
import EnhancedContactSection from './components/EnhancedContactSection';
import ThemeToggle from './components/ThemeToggle';
import AudioToggle from './components/AudioToggle';
import Preloader from './components/Preloader';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const { theme } = useTheme();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');

      parallaxElements.forEach((el) => {
        if (!prefersReducedMotion) {
          const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
          const yPos = -(scrolled * speed);
          (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeColor = theme === 'aurora' ? 'gow-aurora' : 'gow-ember';

  return (
    <div className="relative bg-gow-black text-white overflow-x-hidden">
      <Navbar theme={theme} />
      <EnhancedLandingScene />
      <EnhancedAboutSection />
      <EnhancedProjectsSection />
      <EnhancedSkillsSection />
      <EnhancedAchievementsSection />
      <EnhancedContactSection />

      <ThemeToggle />
      <AudioToggle />

      <footer className="relative bg-gradient-to-b from-gow-black to-gow-near-black py-12 px-4 border-t border-gow-gold/20">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className={`flex items-center justify-center gap-2 text-${themeColor}`}>
            <div className={`w-2 h-2 bg-${themeColor} rounded-full animate-pulse`}></div>
            <p className="text-sm font-medium tracking-wider uppercase">
              Crafted in the Frozen Realms of Jötunheim
            </p>
            <div className={`w-2 h-2 bg-${themeColor} rounded-full animate-pulse`}></div>
          </div>
          <p className="text-gow-silver text-sm">
            &copy; {new Date().getFullYear()} Rishabh Singh. All rights reserved.
          </p>
          <p className="text-gow-silver/70 text-xs italic">
            "Where data becomes destiny, and algorithms forge the future."
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Trigger fade in animation
      setTimeout(() => setShowContent(true), 50);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
