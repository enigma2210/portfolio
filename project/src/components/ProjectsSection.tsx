import { useEffect, useState } from 'react';
import { Shield, Zap, Eye, Axe, Sparkles, ExternalLink, Github } from 'lucide-react';
import { supabase, type Project } from '../lib/supabase';

const artifactIcons = {
  shield: Shield,
  axe: Axe,
  orb: Sparkles,
  relic: Eye,
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const getArtifactIcon = (type: string) => {
    return artifactIcons[type as keyof typeof artifactIcons] || Eye;
  };

  if (loading) {
    return (
      <section className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-cyan-400 text-2xl animate-pulse">Forging Artifacts...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-cyan-400 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 mb-6 tracking-wider">
            ARTIFACTS OF ACHIEVEMENT
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Each artifact represents a conquest over complexity, a triumph of innovation.
            These relics hold the power to transform realms and reshape destinies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = getArtifactIcon(project.artifact_type);
            return (
              <div
                key={project.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="relative h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-slate-700/50 p-8 rounded-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm"></div>

                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-center">
                      <div className="p-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-2 border-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:rotate-12">
                        <Icon className="w-12 h-12 text-cyan-400" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <h3 className="text-2xl font-bold text-cyan-300 tracking-wide group-hover:text-cyan-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-sm">
                          +{project.skills.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="pt-4 flex items-center justify-center gap-2 text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">
                      <span>Examine Artifact</span>
                      <Zap className="w-4 h-4 group-hover:animate-pulse" />
                    </div>
                  </div>

                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-70"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-sm shadow-[0_0_60px_rgba(34,211,238,0.6)] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>

            <div className="p-8 md:p-12 space-y-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 p-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                  {(() => {
                    const Icon = getArtifactIcon(selectedProject.artifact_type);
                    return <Icon className="w-16 h-16 text-cyan-400" strokeWidth={2} />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-black text-cyan-300 mb-4 tracking-wide">
                    {selectedProject.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-bold text-cyan-400 tracking-wider">FORGED WITH:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/50 rounded-sm hover:bg-cyan-500/20 transition-colors"
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
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-sm border-2 border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Live</span>
                  </a>
                )}
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 text-white font-bold rounded-sm border-2 border-slate-500 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-5 h-5" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full mt-4 px-6 py-3 bg-slate-700/50 text-slate-300 font-bold rounded-sm border-2 border-slate-600 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
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
