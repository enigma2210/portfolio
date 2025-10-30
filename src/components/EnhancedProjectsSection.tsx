import { useEffect, useState } from 'react';
import { Shield, Zap, Eye, Axe, Sparkles, ExternalLink, Github, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Define the Project type locally since we're not using the supabase import
type Project = {
  id: string;
  title: string;
  description: string;
  artifact_type: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  skills: string[];
  order_index: number;
  created_at: string;
};

// Define your actual projects here
const yourProjects: Project[] = [
  {
    id: '1',
    title: 'KrishiSetu – A Multilingual Farmer Companion',
    description: 'Agri-Intelligence Platform with multimodal + multilingual advisory, weather integration, and <500ms UX. Provides real-time agricultural advice in multiple languages. Features include pest identification, weather forecasting, and market price updates. Built with React, FastAPI, and integrated with WhatsApp Business API for wider accessibility.',
    artifact_type: 'shield',
    image_url: '',
    demo_url: 'https://krishisetu-ai.catoff.xyz',
    github_url: 'https://github.com/enigma2210/krishisetu-ai',
    skills: ['Multimodal AI', 'Multilingual Advisory', 'FastAPI', 'React', 'WhatsApp Business API'],
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'DigiSecure – Decentralized Document Storage',
    description: 'Smart India Hackathon 2024 Winning Project for Ministry of Power. Blockchain + AI verification model on Sepolia testnet with ~60% gas cost reduction. Provides tamper-proof document storage with AI-powered verification. Features include document encryption, smart contract verification, and audit trail.',
    artifact_type: 'axe',
    image_url: '',
    demo_url: '',
    github_url: 'https://github.com/SIH-1709',
    skills: ['Blockchain', 'AI Verification', 'Solidity', 'React', 'IPFS'],
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'M for Coding - VS Code AI Assistant',
    description: 'AI Engineer Intern project at NxtGen Cloud Technologies. VS Code extension with 35% code completion acceptance rate. Built with Pipecat SDK, Hugging Face models, and integrated with VS Code API. Features include contextual code suggestions, bug detection, and code optimization tips.',
    artifact_type: 'orb',
    image_url: '',
    demo_url: 'https://mforcoding.nxtgen.ai',
    github_url: '',
    skills: ['VS Code Extension', 'Pipecat SDK', 'Hugging Face', 'LangChain', 'FastAPI'],
    order_index: 3,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'IPv6 Readiness Assessment Tool',
    description: 'Network Security Intern project at NIXI. Tool for assessing IPv6 readiness with alignment to APAN61 publication "Quantifying IPv6 Readiness". Provides comprehensive IPv4 to IPv6 migration strategy. Features include network scanning, compatibility assessment, and migration planning.',
    artifact_type: 'relic',
    image_url: '',
    demo_url: '',
    github_url: 'https://github.com/enigma2210/ipv6-readiness-scanner',
    skills: ['Network Security', 'IPv6', 'Python', 'Scapy', 'Nmap'],
    order_index: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'GenAI Internship Management Portal',
    description: 'Software Engineer Intern project at Indian Oil Corporation Ltd. RBAC + Active Directory integration with 50% processing time reduction. Streamlines internship management with automated workflows. Features include role-based access control, document management, and performance tracking.',
    artifact_type: 'shield',
    image_url: '',
    demo_url: '',
    github_url: '',
    skills: ['GenAI', 'Active Directory', 'RBAC', 'React', '.NET Core'],
    order_index: 5,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Decentralized Gaming Backend',
    description: 'Full-Stack Developer at Catoff Gaming LLC. Managed >2TB IPFS data with Solana contracts >50 SOL. Built scalable gaming backend with decentralized storage. Features include player identity management, asset tokenization, and cross-platform game state synchronization.',
    artifact_type: 'axe',
    image_url: '',
    demo_url: 'https://catoff.xyz',
    github_url: '',
    skills: ['Solana', 'IPFS', 'AWS', 'NestJS', 'Go', 'Rust'],
    order_index: 6,
    created_at: new Date().toISOString()
  }
];

const artifactIcons = {
  shield: Shield,
  axe: Axe,
  orb: Sparkles,
  relic: Eye,
};

export default function EnhancedProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  const loadProjects = async () => {
    // Use your hardcoded projects instead of fetching from Supabase
    setProjects(yourProjects);
    setLoading(false);
  };

  const getArtifactIcon = (type: string) => {
    return artifactIcons[type as keyof typeof artifactIcons] || Eye;
  };

  const themeColor = theme === 'aurora' ? 'gow-aurora' : 'gow-ember';
  const themeGradient = theme === 'aurora' ? 'aurora-veil' : 'ember-forge';

  if (loading) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-b from-gow-black via-gow-near-black to-gow-deep-gray flex items-center justify-center">
        <div className={`text-${themeColor} text-2xl animate-pulse`}>Forging Artifacts...</div>
      </section>
    );
  }

  return (
    <section id="artifacts" className="relative min-h-screen w-full bg-gradient-to-b from-gow-black via-gow-near-black to-gow-deep-gray py-24 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/assets/niflheim.png)' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-${themeGradient} mb-6 tracking-wider`}>
            ARTIFACTS OF ACHIEVEMENT
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-gow-gold to-transparent mb-6"></div>
          <p className="text-xl text-gow-silver max-w-3xl mx-auto leading-relaxed">
            Each artifact represents a conquest over complexity, a triumph of innovation.
            These relics hold the power to transform realms and reshape destinies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = getArtifactIcon(project.artifact_type);
            return (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-gow-gold rounded-sm"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
                aria-label={`View details for ${project.title}`}
              >
                <div className={`relative h-full bg-gradient-to-br from-gow-near-black/90 to-gow-black/90 backdrop-blur-sm border-2 border-gow-deep-gray p-8 rounded-sm transition-all duration-300 hover:border-${themeColor} hover:shadow-[0_0_40px_${theme === 'aurora' ? 'rgba(79,176,255,0.4)' : 'rgba(212,63,47,0.4)'}] hover:scale-105`}>
                  <div className={`absolute inset-0 bg-gradient-to-br from-${themeColor}/0 to-${themeColor}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm`}></div>

                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-center">
                      <div className={`p-6 rounded-full bg-gradient-to-br from-${themeColor}/20 to-${themeColor}/10 border-2 border-${themeColor}/30 group-hover:border-${themeColor} transition-all duration-300 group-hover:shadow-[0_0_30px_${theme === 'aurora' ? 'rgba(79,176,255,0.5)' : 'rgba(212,63,47,0.5)'}] animate-relic-float`}>
                        <Icon className={`w-12 h-12 text-${themeColor}`} strokeWidth={2} />
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <h3 className={`text-2xl font-bold text-gow-gold tracking-wide group-hover:text-${themeColor} transition-colors`}>
                        {project.title}
                      </h3>
                      <p className="text-gow-silver text-sm leading-relaxed line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-xs font-medium text-${themeColor} bg-${themeColor}/10 border border-${themeColor}/30 rounded-sm`}
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className={`px-3 py-1 text-xs font-medium text-${themeColor} bg-${themeColor}/10 border border-${themeColor}/30 rounded-sm`}>
                          +{project.skills.length - 4}
                        </span>
                      )}
                    </div>

                    <div className={`pt-4 flex items-center justify-center gap-2 text-${themeColor} text-sm font-medium group-hover:text-gow-gold transition-colors`}>
                      <span>Examine Artifact</span>
                      <Zap className="w-4 h-4 group-hover:animate-pulse" />
                    </div>
                  </div>

                  <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${themeColor} rounded-full animate-pulse opacity-70`}></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gow-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={`relative max-w-3xl w-full bg-gradient-to-br from-gow-near-black to-gow-black border-2 border-${themeColor} rounded-sm shadow-[0_0_60px_${theme === 'aurora' ? 'rgba(79,176,255,0.6)' : 'rgba(212,63,47,0.6)'}] animate-scaleIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
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
                <div className={`flex-shrink-0 p-6 rounded-full bg-gradient-to-br from-${themeColor}/20 to-${themeColor}/10 border-2 border-${themeColor} shadow-[0_0_30px_${theme === 'aurora' ? 'rgba(79,176,255,0.5)' : 'rgba(212,63,47,0.5)'}]`}>
                  {(() => {
                    const Icon = getArtifactIcon(selectedProject.artifact_type);
                    return <Icon className={`w-16 h-16 text-${themeColor}`} strokeWidth={2} />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 id="modal-title" className={`text-3xl md:text-4xl font-black text-gow-gold mb-4 tracking-wide`}>
                    {selectedProject.title}
                  </h3>
                  <p className="text-gow-silver leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className={`text-lg font-bold text-${themeColor} tracking-wider`}>FORGED WITH:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 text-sm font-medium text-${themeColor} bg-${themeColor}/10 border border-${themeColor}/50 rounded-sm hover:bg-${themeColor}/20 transition-colors`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {selectedProject.demo_url && (
                  <a
                    href={selectedProject.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-${themeGradient} text-white font-bold rounded-sm border-2 border-${themeColor} hover:shadow-[0_0_20px_${theme === 'aurora' ? 'rgba(79,176,255,0.6)' : 'rgba(212,63,47,0.6)'}] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gow-gold`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Visit Realm</span>
                  </a>
                )}
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gow-deep-gray text-white font-bold rounded-sm border-2 border-gow-silver hover:border-${themeColor} hover:shadow-[0_0_20px_${theme === 'aurora' ? 'rgba(79,176,255,0.4)' : 'rgba(212,63,47,0.4)'}] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gow-gold`}
                  >
                    <Github className="w-5 h-5" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gow-deep-gray to-transparent"></div>
    </section>
  );
}
