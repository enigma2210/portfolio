import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LandingScene() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJzbm93IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxLjUiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMTAiIHI9IjAuOCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3Nub3cpIi8+PC9zdmc+')] opacity-20 animate-snow"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 via-transparent to-transparent"></div>

      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent animate-aurora"></div>

      <div className={`relative z-10 h-full flex flex-col items-center justify-center px-4 transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-cyan-600 tracking-wider drop-shadow-2xl animate-title-glow">
              JÖTUNHEIM
            </h1>
            <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-slow"></div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-cyan-100 tracking-wide animate-fade-in-delay">
              Rishabh Singh
            </h2>
            <p className="text-xl md:text-2xl text-cyan-300/90 font-medium tracking-widest animate-fade-in-delay-2">
              WARRIOR OF INNOVATION
            </p>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-3">
              Where ancient wisdom meets artificial intelligence. Journey through the frozen realm
              where data becomes destiny and algorithms forge the future.
            </p>
          </div>

          <button
            onClick={scrollToContent}
            className="group relative mt-12 px-10 py-4 bg-gradient-to-r from-cyan-600 to-cyan-800 text-white font-bold text-lg tracking-wider rounded-sm border-2 border-cyan-400/50 hover:border-cyan-300 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 animate-fade-in-delay-4 overflow-hidden"
          >
            <span className="relative z-10">ENTER THE REALM</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="w-12 h-12 text-cyan-400/70" strokeWidth={2} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-800 to-transparent"></div>
    </section>
  );
}
