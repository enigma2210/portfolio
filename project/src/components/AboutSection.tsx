import { useEffect, useState } from 'react';
import { Sparkles, Brain, Target, Zap } from 'lucide-react';

const runes = [
  {
    icon: Brain,
    title: 'The Path of Intelligence',
    content: 'Trained in the sacred arts of Artificial Intelligence, wielding algorithms as weapons to solve the unsolvable. From neural networks to computer vision, the journey through machine learning realms has forged an unbreakable will.',
  },
  {
    icon: Target,
    title: 'The Vision',
    content: 'To bridge the ancient ways of agriculture with the power of modern intelligence. Every line of code written serves a greater purpose—empowering farmers, protecting communities, and illuminating paths through data-driven wisdom.',
  },
  {
    icon: Zap,
    title: 'The Arsenal',
    content: 'Master of Python, wielder of TensorFlow and PyTorch. Architect of full-stack realms, from React frontiers to cloud-hosted fortresses. Each tool sharpened through countless battles with complex problems.',
  },
  {
    icon: Sparkles,
    title: 'The Philosophy',
    content: 'In data, stories emerge. In intelligence, purpose reveals itself. Technology is not merely code—it is a force to reshape worlds, heal lands, and forge futures where innovation serves humanity.',
  },
];

export default function AboutSection() {
  const [activeRune, setActiveRune] = useState<number | null>(null);
  const [visibleRunes, setVisibleRunes] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    runes.forEach((_, index) => {
      setTimeout(() => {
        setVisibleRunes(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 200);
    });
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 mb-6 tracking-wider">
            HALL OF ORIGINS
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deep within the frozen halls, ancient runes reveal the story of a warrior who bridges worlds—
            where silicon meets soil, and intelligence serves purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {runes.map((rune, index) => {
            const Icon = rune.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  visibleRunes[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                onMouseEnter={() => setActiveRune(index)}
                onMouseLeave={() => setActiveRune(null)}
              >
                <div
                  className={`relative h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 ${
                    activeRune === index ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]' : 'border-slate-700/50'
                  } p-8 rounded-sm transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"></div>

                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`flex-shrink-0 p-4 rounded-sm bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border ${
                      activeRune === index ? 'border-cyan-400' : 'border-cyan-500/30'
                    } transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]`}>
                      <Icon className="w-8 h-8 text-cyan-400" strokeWidth={2.5} />
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-bold text-cyan-300 tracking-wide">
                        {rune.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {rune.content}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <Icon className="w-24 h-24 text-cyan-400" strokeWidth={1} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 bg-slate-800/50 border-2 border-cyan-500/30 rounded-sm backdrop-blur-sm">
            <p className="text-cyan-300 text-lg font-medium tracking-wide italic">
              "In data, I see stories. In intelligence, purpose."
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
}
