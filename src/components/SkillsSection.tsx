import { useEffect, useState } from 'react';
import { Hammer } from 'lucide-react';
import { supabase, type Skill } from '../lib/supabase';

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [forgeActive, setForgeActive] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setSkills(data);
      setTimeout(() => setForgeActive(true), 300);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-cyan-400 text-2xl animate-pulse">Awakening Runes...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,133,0,0.1),transparent_70%)] animate-pulse-slow"></div>
      </div>

      {forgeActive && (
        <>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-t from-orange-500 to-transparent animate-spark"
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
            <Hammer className="w-12 h-12 text-orange-500 animate-hammer" />
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 tracking-wider">
              RUNES OF POWER
            </h2>
            <Hammer className="w-12 h-12 text-orange-500 animate-hammer" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Forged in the fires of countless challenges, each rune represents mastery over a domain.
            Strike the anvil to witness their power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
              }}
            >
              <div
                className="relative h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-slate-700/50 p-6 rounded-sm transition-all duration-300 hover:border-orange-500 hover:scale-105 cursor-pointer overflow-hidden"
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
                    <h3 className="text-xl font-bold text-cyan-300 tracking-wide flex-1 group-hover:text-cyan-200 transition-colors">
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
                    <div className="flex justify-between text-xs text-slate-400">
                      <span className="uppercase tracking-wider">{skill.category}</span>
                      <span>Mastery</span>
                    </div>
                    <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse-slow"
                        style={{
                          width: `${skill.proficiency}%`,
                          background: `linear-gradient(90deg, ${skill.rune_color}, ${skill.rune_color}dd)`,
                          boxShadow: `0 0 10px ${skill.rune_color}`,
                        }}
                      ></div>
                      <div
                        className="absolute top-0 left-0 h-full w-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${skill.rune_color}20, transparent)`,
                          animation: 'shimmer 2s infinite',
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
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
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-2 border-orange-500/50 rounded-sm backdrop-blur-sm">
            <p className="text-orange-300 text-lg font-medium tracking-wide">
              Total Arsenal: <span className="text-2xl font-black text-orange-400">{skills.length}</span> Runes Mastered
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
}
