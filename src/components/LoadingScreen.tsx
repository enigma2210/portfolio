import { useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    // Set a 1.5 second timeout for the loading screen
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gow-black">
      {/* Background with mystic effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gow-ember/10 via-gow-black to-gow-aurora/10 animate-pulse-slow"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gow-gold rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: `${0.3 + Math.random() * 0.7}`,
            }}
          />
        ))}
      </div>

      {/* Central loading text */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gow-gold mb-6 animate-pulse-slow tracking-wider">
          Loading ultimate cinematic experience
        </h1>
        
        {/* Progress indicator */}
        <div className="w-64 h-1 bg-gow-deep-gray mx-auto rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gow-ember to-gow-aurora animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
}
