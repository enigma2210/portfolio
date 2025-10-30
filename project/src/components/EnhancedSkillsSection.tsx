import { useEffect, useState } from 'react';
import { Hammer } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  rune_color: string;
  order_index: number;
  created_at: string;
};

const skillsData: Skill[] = [
  { id: '1', name: 'AI Engineering', category: 'AI', proficiency: 95, rune_color: '#00D9FF', order_index: 1, created_at: new Date().toISOString() },
  { id: '2', name: 'Machine Learning', category: 'AI', proficiency: 92, rune_color: '#4ECDC4', order_index: 2, created_at: new Date().toISOString() },
  { id: '3', name: 'Deep Learning', category: 'AI', proficiency: 90, rune_color: '#00A8CC', order_index: 3, created_at: new Date().toISOString() },
  { id: '4', name: 'Computer Vision', category: 'AI', proficiency: 88, rune_color: '#0096C7', order_index: 4, created_at: new Date().toISOString() },
  { id: '5', name: 'NLP & LLMs', category: 'AI', proficiency: 85, rune_color: '#0077B6', order_index: 5, created_at: new Date().toISOString() },
  { id: '6', name: 'Python', category: 'Backend', proficiency: 95, rune_color: '#FFB703', order_index: 6, created_at: new Date().toISOString() },
  { id: '7', name: 'FastAPI', category: 'Backend', proficiency: 90, rune_color: '#FB8500', order_index: 7, created_at: new Date().toISOString() },
  { id: '8', name: 'PyTorch', category: 'AI', proficiency: 88, rune_color: '#FF6B35', order_index: 8, created_at: new Date().toISOString() },
  { id: '9', name: 'React', category: 'Frontend', proficiency: 85, rune_color: '#06FFA5', order_index: 9, created_at: new Date().toISOString() },
  { id: '10', name: 'TypeScript', category: 'Frontend', proficiency: 82, rune_color: '#2EC4B6', order_index: 10, created_at: new Date().toISOString() },
  { id: '11', name: 'Cloud Platforms', category: 'Tools', proficiency: 88, rune_color: '#A0C4FF', order_index: 11, created_at: new Date().toISOString() },
  { id: '12', name: 'Docker', category: 'Tools', proficiency: 85, rune_color: '#9BF6FF', order_index: 12, created_at: new Date().toISOString() },
  { id: '13', name: 'LangChain', category: 'AI', proficiency: 83, rune_color: '#B5179E', order_index: 13, created_at: new Date().toISOString() },
  { id: '14', name: 'Hugging Face', category: 'AI', proficiency: 80, rune_color: '#7209B7', order_index: 14, created_at: new Date().toISOString() },
  { id: '15', name: 'Pipecat SDK', category: 'AI', proficiency: 85, rune_color: '#F72585', order_index: 15, created_at: new Date().toISOString() },
  { id: '16', name: 'Solana', category: 'Blockchain', proficiency: 75, rune_color: '#9D4EDD', order_index: 16, created_at: new Date().toISOString() },
  { id: '17', name: 'IPFS', category: 'Blockchain', proficiency: 80, rune_color: '#5A189A', order_index: 17, created_at: new Date().toISOString() },
  { id: '18', name: 'Go', category: 'Backend', proficiency: 78, rune_color: '#0077B6', order_index: 18, created_at: new Date().toISOString() },
  { id: '19', name: 'Rust', category: 'Backend', proficiency: 75, rune_color: '#003566', order_index: 19, created_at: new Date().toISOString() },
  { id: '20', name: 'NestJS', category: 'Backend', proficiency: 82, rune_color: '#FFD60A', order_index: 20, created_at: new Date().toISOString() }
];

export default function EnhancedSkillsSection() {
  const [skills] = useState<Skill[]>(skillsData);
  const [loading] = useState(false);
  const [forgeActive, setForgeActive] = useState(false);
  const [strikeSkill, setStrikeSkill] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setTimeout(() => setForgeActive(true), 300);
  }, []);

  const handleSkillClick = (skillId: string) => {
    setStrikeSkill(skillId);
    setTimeout(() => setStrikeSkill(null), 800);
  };

  const themeColor = theme === 'aurora' ? 'gow-aurora' : 'gow-ember';
  const themeGradient = theme === 'aurora' ? 'aurora-veil' : 'ember-forge';

  if (loading) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-b from-gow-deep-gray via-gow-near-black to-gow-black flex items-center justify-center">
        <div className={`text-${themeColor} text-2xl animate-pulse`}>Awakening Runes...</div>
      </section>
    );
  }

  return (
    <section id="runes" className="relative min-h-screen w-full bg-gradient-to-b from-gow-deep-gray via-gow-near-black to-gow-black py-24 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/assets/midgard.png)' }}
      ></div>

      {forgeActive && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-t from-gow-molten to-transparent animate-spark"
              style={{
                left: `${20 + Math.random() * 60}%`,
                bottom: '10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Hammer className="w-12 h-12 text-gow-molten animate-hammer" />
            <h2 className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-${themeGradient} tracking-wider`}>
              RUNES OF POWER
            </h2>
            <Hammer className="w-12 h-12 text-gow-molten animate-hammer" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-gow-gold to-transparent mb-6"></div>
          <p className="text-xl text-gow-silver max-w-3xl mx-auto leading-relaxed">
            Forged in the fires of countless challenges, each rune represents mastery over a domain.
            Strike the runes to witness their power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <button
              key={skill.id}
              onClick={() => handleSkillClick(skill.id)}
              className="group relative text-left focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
              }}
              aria-label={`${skill.name} - ${skill.proficiency}% mastery`}
            >
              <div
                className={`relative h-full bg-gradient-to-br from-gow-near-black/90 to-gow-black/90 backdrop-blur-sm border-2 border-gow-deep-gray p-6 rounded-sm transition-all duration-300 hover:border-gow-molten hover:scale-105 cursor-pointer overflow-hidden ${strikeSkill === skill.id ? 'animate-forge-strike' : ''}`}
                style={{
                  boxShadow: `0 0 20px ${skill.rune_color}20`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.rune_color}40, transparent 70%)`,
                  }}
                ></div>

                <div className="absolute top-0 left-0 w-full h-full opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-6xl font-black"
                      fill={skill.rune_color}
                    >
                      ᚱ
                    </text>
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-gow-gold tracking-wide flex-1 group-hover:text-gow-icy transition-colors">
                      {skill.name}
                    </h3>
                    <span
                      className="text-sm font-bold px-2 py-1 rounded-sm border"
                      style={{
                        color: skill.rune_color,
                        borderColor: `${skill.rune_color}60`,
                        backgroundColor: `${skill.rune_color}10`,
                      }}
                    >
                      {skill.proficiency}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gow-silver">
                      <span className="uppercase tracking-wider">{skill.category}</span>
                      <span>Mastery</span>
                    </div>
                    <div className="relative h-2 bg-gow-deep-gray rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse-slow"
                        style={{
                          width: `${skill.proficiency}%`,
                          background: `linear-gradient(90deg, ${skill.rune_color}, ${skill.rune_color}dd)`,
                          boxShadow: `0 0 10px ${skill.rune_color}`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gow-silver group-hover:text-gow-gold transition-colors">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: skill.rune_color }}
                    ></div>
                    <span className="uppercase tracking-wider">Rune Active</span>
                  </div>
                </div>

                <div
                  className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: skill.rune_color, opacity: 0.7 }}
                ></div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-gow-ember/30 to-gow-molten/30 border-2 border-gow-molten/50 rounded-sm backdrop-blur-sm">
            <p className="text-gow-gold text-lg font-medium tracking-wide">
              Total Arsenal: <span className="text-2xl font-black text-gow-molten">{skills.length}</span> Runes Mastered
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gow-black to-transparent"></div>
    </section>
  );
}
