import { useEffect, useState } from 'react';
import { Trophy, Scroll, Sword, Shield, Volume2, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Define the Achievement type locally
type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  order_index: number;
};

// Define your actual achievements here
const yourAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Smart India Hackathon 2024 Winner',
    description: 'Led team to victory in Ministry of Power category with DigiSecure - a blockchain + AI verification model. Implemented smart contracts on Sepolia testnet achieving ~60% gas cost reduction. Secured ₹1,00,000 prize money and industry recognition.',
    date: '2024-08-22',
    icon: 'trophy',
    order_index: 1
  },
  {
    id: '2',
    title: 'IEEE BEST Student Paper Award',
    description: 'Awarded for "KrishiSetu: Multilingual Agri-Intelligence Platform" at IEEE ICACCI 2024. Recognized for innovative approach combining multimodal AI with WhatsApp Business API for farmer accessibility. Published in IEEE Xplore with 50+ citations.',
    date: '2024-03-15',
    icon: 'scroll',
    order_index: 2
  },
  {
    id: '3',
    title: 'Google DSC Lead',
    description: 'Selected as Google Developer Student Clubs Lead for organizing 15+ workshops reaching 500+ students. Conducted sessions on ML, Cloud, and Android development. Grew community engagement by 200% and mentored teams for national competitions.',
    date: '2023-09-01',
    icon: 'shield',
    order_index: 3
  },
  {
    id: '4',
    title: 'Microsoft Learn Student Ambassador',
    description: 'Beta MLSA for driving tech adoption among 1000+ students. Delivered 20+ sessions on Azure AI/ML services. Created learning pathways that helped students earn 50+ Microsoft certifications and secure internships.',
    date: '2024-01-15',
    icon: 'horn',
    order_index: 4
  },
  {
    id: '5',
    title: 'Published Researcher',
    description: 'Authored "Quantifying IPv6 Readiness: Network Security Assessment Tool" aligning with APAN61 publication. Research implemented at NIXI for national IPv6 migration strategy. Published in IEEE Xplore with institutional adoption.',
    date: '2024-05-30',
    icon: 'scroll',
    order_index: 5
  },
  {
    id: '6',
    title: 'Superteam Bounty Winner',
    description: 'Winner of $500 Superteam Bounty for Best DApp using Solana Blinks and Best Telegram Mini App. Developed innovative blockchain solutions with exceptional user experience. Recognized for technical excellence and creative implementation.',
    date: '2024-06-15',
    icon: 'sword',
    order_index: 6
  }
];

const iconMap = {
  trophy: Trophy,
  scroll: Scroll,
  sword: Sword,
  shield: Shield,
  horn: Volume2,
};

export default function EnhancedAchievementsSection() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    loadAchievements();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedAchievement) {
        setSelectedAchievement(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedAchievement]);

  const loadAchievements = async () => {
    // Use your hardcoded achievements instead of fetching from Supabase
    setAchievements(yourAchievements);
    setLoading(false);
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Trophy;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const themeColor = theme === 'aurora' ? 'gow-aurora' : 'gow-ember';
  const themeGradient = theme === 'aurora' ? 'aurora-veil' : 'ember-forge';

  if (loading) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-b from-gow-black via-gow-near-black to-gow-deep-gray flex items-center justify-center">
        <div className={`text-${themeColor} text-2xl animate-pulse`}>Raising Pillars...</div>
      </section>
    );
  }

  return (
    <section id="pillars" className="relative min-h-screen w-full bg-gradient-to-b from-gow-black via-gow-near-black to-gow-deep-gray py-24 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/assets/alfheim.png)' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-${themeGradient} mb-6 tracking-wider`}>
            PILLARS OF TRIUMPH
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-gow-gold to-transparent mb-6"></div>
          <p className="text-xl text-gow-silver max-w-3xl mx-auto leading-relaxed">
            Monuments carved in ice and stone, each pillar stands as testament to battles won
            and challenges conquered. These are the marks of a warrior's journey.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className={`absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-${themeColor}/50 via-gow-gold/50 to-${themeColor}/50 -translate-x-1/2 hidden md:block`}></div>

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
                    <button
                      className={`inline-block cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm`}
                      onClick={() => setSelectedAchievement(achievement)}
                      aria-label={`View details for ${achievement.title}`}
                    >
                      <div className={`relative bg-gradient-to-br from-gow-near-black/90 to-gow-black/90 backdrop-blur-sm border-2 border-gow-deep-gray p-6 rounded-sm hover:border-${themeColor} hover:shadow-[0_0_30px_${theme === 'aurora' ? 'rgba(79,176,255,0.4)' : 'rgba(212,63,47,0.4)'}] transition-all duration-300 animate-pillar-glow`}>
                        <div className={`absolute inset-0 bg-gradient-to-br from-${themeColor}/0 to-${themeColor}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm`}></div>

                        <div className="relative z-10 space-y-3">
                          <h3 className={`text-2xl font-bold text-gow-gold tracking-wide`}>
                            {achievement.title}
                          </h3>
                          <p className="text-gow-silver text-sm leading-relaxed">
                            {achievement.description}
                          </p>
                          <div className="pt-2">
                            <span className={`inline-block px-4 py-1 text-xs font-medium text-${themeColor} bg-${themeColor}/10 border border-${themeColor}/30 rounded-sm`}>
                              {formatDate(achievement.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="flex-shrink-0 flex justify-center items-center md:w-16 w-full">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-${themeColor}/20 blur-xl rounded-full animate-pulse`}></div>
                      <div className={`relative p-4 bg-gradient-to-br from-gow-near-black to-gow-black border-4 border-${themeColor} rounded-full shadow-[0_0_30px_${theme === 'aurora' ? 'rgba(79,176,255,0.6)' : 'rgba(212,63,47,0.6)'}] group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 text-${themeColor}`} strokeWidth={2.5} />
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
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gow-near-black/80 to-gow-black/80 border-2 border-gow-gold/30 rounded-sm backdrop-blur-sm">
            <Trophy className={`w-8 h-8 text-${themeColor}`} />
            <p className="text-gow-gold text-xl font-bold tracking-wide">
              <span className={`text-3xl text-${themeColor}`}>{achievements.length}</span> Triumphs Recorded
            </p>
          </div>
        </div>
      </div>

      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gow-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedAchievement(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-title"
        >
          <div
            className={`relative max-w-2xl w-full bg-gradient-to-br from-gow-near-black to-gow-black border-2 border-${themeColor} rounded-sm shadow-[0_0_60px_${theme === 'aurora' ? 'rgba(79,176,255,0.6)' : 'rgba(212,63,47,0.6)'}] animate-scaleIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute -top-4 -right-4 p-2 bg-gow-near-black border-2 border-gow-gold rounded-full hover:bg-gow-gold hover:text-gow-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gow-gold z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-gow-gold"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-gow-gold"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-gow-gold"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-gow-gold"></div>

            <div className="p-8 md:p-12 space-y-6">
              <div className="flex items-start gap-6">
                <div className={`flex-shrink-0 p-6 bg-gradient-to-br from-${themeColor}/20 to-${themeColor}/10 border-2 border-${themeColor} rounded-full shadow-[0_0_30px_${theme === 'aurora' ? 'rgba(79,176,255,0.5)' : 'rgba(212,63,47,0.5)'}]`}>
                  {(() => {
                    const Icon = getIcon(selectedAchievement.icon);
                    return <Icon className={`w-12 h-12 text-${themeColor}`} strokeWidth={2} />;
                  })()}
                </div>
                <div className="flex-1 space-y-4">
                  <h3 id="achievement-modal-title" className="text-3xl md:text-4xl font-black text-gow-gold tracking-wide">
                    {selectedAchievement.title}
                  </h3>
                  <p className="text-gow-silver leading-relaxed text-lg">
                    {selectedAchievement.description}
                  </p>
                  <div className="pt-2">
                    <span className={`inline-block px-6 py-2 text-sm font-bold text-${themeColor} bg-${themeColor}/10 border-2 border-${themeColor}/50 rounded-sm`}>
                      {formatDate(selectedAchievement.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gow-deep-gray to-transparent"></div>
    </section>
  );
}
