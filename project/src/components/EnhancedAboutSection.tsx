import { useEffect, useState } from 'react';
import { Sparkles, Brain, Target, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const runes = [
  {
    icon: Brain,
    title: 'The Path of Intelligence',
    content: 'AI Engineer @NxtGen Cloud Technologies building ECI identity verification systems with 63→89% accuracy boost. Developed "M for Coding" - a VS Code AI assistant with 35% code completion acceptance. Proficient in Python, PyTorch, FastAPI, Docker, Hugging Face, LangChain, Pipecat SDK. Published "Quantifying IPv6 Readiness" at APAN61 aligning with NIXI implementation.',
  },
  {
    icon: Target,
    title: 'The Vision',
    content: 'Pursuing Integrated MTech in CS & AI at Rajiv Gandhi Institute of Petroleum Technology with SPI 9.25. Winner of Smart India Hackathon 2024 (Decentralized Storage) and 2023 (AI Surveillance). APrIGF 2025 Fellow (Sole Indian Fellow) focusing on Digital Governance in APAC. IEEE BEST Paper awardee for KrishiSetu platform innovation.',
  },
  {
    icon: Zap,
    title: 'The Arsenal',
    content: 'Full-Stack Developer @Catoff Gaming LLC with expertise in AWS (EC2, S3, RDS Aurora), NestJS, Go, PostgreSQL, Rust, Solana, IPFS. Built decentralized gaming backend managing >2TB IPFS data. Software Engineer Intern @Indian Oil Corporation Ltd reduced processing time by 50% with GenAI portal. Network Security Intern @NIXI developed IPv6 readiness tools.',
  },
  {
    icon: Sparkles,
    title: 'The Philosophy',
    content: 'Technology as a force for positive change. Creating accessible, ethical, and impactful solutions. Winner of Superteam Bounties ($500 each) for Best DApp using Solana Blinks and Best Telegram Mini App. Active open-source contributor. Google DSC Lead & Microsoft Learn Student Ambassador.',
  },
];

export default function EnhancedAboutSection() {
  const [activeRune, setActiveRune] = useState<number | null>(null);
  const [visibleRunes, setVisibleRunes] = useState<boolean[]>([false, false, false, false]);
  const { theme } = useTheme();

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

  const themeColor = theme === 'aurora' ? 'gow-aurora' : 'gow-ember';
  const themeGradient = theme === 'aurora' ? 'aurora-veil' : 'ember-forge';

  return (
    <section id="hall" className="relative min-h-screen w-full bg-gradient-to-b from-gow-deep-gray via-gow-near-black to-gow-black py-24 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/assets/asgard.png)' }}
      ></div>

      <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${themeColor} to-transparent`}></div>

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-8 bg-gradient-to-b from-gow-gold/50 to-transparent opacity-30"
          style={{
            left: `${10 + i * 4.5}%`,
            height: `${Math.random() * 60 + 40}%`,
            top: '10%',
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-${themeGradient} mb-6 tracking-wider`}>
            HALL OF ORIGINS
          </h2>
          <div className={`h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-gow-gold to-transparent mb-6`}></div>
          <p className="text-xl text-gow-silver max-w-3xl mx-auto leading-relaxed">
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
                onFocus={() => setActiveRune(index)}
                onBlur={() => setActiveRune(null)}
                tabIndex={0}
                role="article"
                aria-label={rune.title}
              >
                <div
                  className={`relative h-full bg-gradient-to-br from-gow-near-black/90 to-gow-black/90 backdrop-blur-sm border-2 ${
                    activeRune === index ? `border-${themeColor} shadow-[0_0_30px_${theme === 'aurora' ? 'rgba(79,176,255,0.5)' : 'rgba(212,63,47,0.5)'}]` : 'border-gow-deep-gray'
                  } p-8 rounded-sm transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${themeColor}/5 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 rounded-sm`}></div>

                  <div className={`absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-gow-gold opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300`}></div>
                  <div className={`absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-gow-gold opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300`}></div>
                  <div className={`absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-gow-gold opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300`}></div>
                  <div className={`absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-gow-gold opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300`}></div>

                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`flex-shrink-0 p-4 rounded-sm bg-gradient-to-br from-${themeColor}/20 to-${themeColor}/10 border ${
                      activeRune === index ? `border-${themeColor}` : `border-${themeColor}/30`
                    } transition-all duration-300 group-hover:shadow-[0_0_20px_${theme === 'aurora' ? 'rgba(79,176,255,0.3)' : 'rgba(212,63,47,0.3)'}]`}>
                      <Icon className={`w-8 h-8 text-${themeColor}`} strokeWidth={2.5} />
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className={`text-2xl font-bold text-gow-gold tracking-wide`}>
                        {rune.title}
                      </h3>
                      <p className="text-gow-silver leading-relaxed text-sm">
                        {rune.content}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-10 group-focus-within:opacity-10 transition-opacity duration-300">
                    <Icon className={`w-24 h-24 text-${themeColor}`} strokeWidth={1} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 bg-gow-near-black/50 border-2 border-gow-gold/30 rounded-sm backdrop-blur-sm">
            <p className="text-gow-gold text-lg font-medium tracking-wide italic">
              "In data, I see stories. In intelligence, purpose."
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gow-black to-transparent"></div>
    </section>
  );
}
