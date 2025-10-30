import { useEffect, useState } from 'react';
import { Trophy, Scroll, Sword, Shield, Volume2 } from 'lucide-react';
import { supabase, type Achievement } from '../lib/supabase';

const iconMap = {
  trophy: Trophy,
  scroll: Scroll,
  sword: Sword,
  shield: Shield,
  horn: Volume2,
};

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setAchievements(data);
    }
    setLoading(false);
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Trophy;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-cyan-400 text-2xl animate-pulse">Raising Pillars...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 mb-6 tracking-wider">
            PILLARS OF TRIUMPH
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Monuments carved in ice and stone, each pillar stands as testament to battles won
            and challenges conquered. These are the marks of a warrior's journey.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/50 via-cyan-400/50 to-cyan-500/50 -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12">
            {achievements.map((achievement, index) => {
              const Icon = getIcon(achievement.icon);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={achievement.id}
                  className={`relative flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 group`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                  }}
                >
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <div
                      className={`inline-block cursor-pointer transition-all duration-300 hover:scale-105`}
                      onClick={() => setSelectedAchievement(achievement)}
                    >
                      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-slate-700/50 p-6 rounded-sm hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"></div>

                        <div className="relative z-10 space-y-3">
                          <h3 className="text-2xl font-bold text-cyan-300 tracking-wide">
                            {achievement.title}
                          </h3>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {achievement.description}
                          </p>
                          <div className="pt-2">
                            <span className="inline-block px-4 py-1 text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-sm">
                              {formatDate(achievement.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex justify-center items-center md:w-16 w-full">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse"></div>
                      <div className="relative p-4 bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)] group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-cyan-400" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-2 border-cyan-500/30 rounded-sm backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-cyan-400" />
            <p className="text-cyan-300 text-xl font-bold tracking-wide">
              <span className="text-3xl text-cyan-400">{achievements.length}</span> Triumphs Recorded
            </p>
          </div>
        </div>
      </div>

      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-sm shadow-[0_0_60px_rgba(34,211,238,0.6)] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>

            <div className="p-8 md:p-12 space-y-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-6 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-2 border-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                  {(() => {
                    const Icon = getIcon(selectedAchievement.icon);
                    return <Icon className="w-12 h-12 text-cyan-400" strokeWidth={2} />;
                  })()}
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-black text-cyan-300 tracking-wide">
                    {selectedAchievement.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {selectedAchievement.description}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-6 py-2 text-sm font-bold text-cyan-300 bg-cyan-500/10 border-2 border-cyan-500/50 rounded-sm">
                      {formatDate(selectedAchievement.date)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="w-full mt-6 px-6 py-3 bg-slate-700/50 text-slate-300 font-bold rounded-sm border-2 border-slate-600 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-800 to-transparent"></div>
    </section>
  );
}
