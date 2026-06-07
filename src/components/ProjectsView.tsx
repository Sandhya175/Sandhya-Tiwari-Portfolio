import { useState } from 'react';
import { 
  FolderGit2, 
  Search, 
  Layers, 
  ExternalLink, 
  Github, 
  FileText, 
  X, 
  Cpu, 
  CheckCircle,
  HelpCircle,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { Project, TabType } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { sysSynth } from '../utils/audio';

interface ProjectsViewProps {
  searchQuery: string;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  setActiveTab: (tab: TabType) => void;
}

export default function ProjectsView({ searchQuery, selectedProject, setSelectedProject, setActiveTab }: ProjectsViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'react' | 'accessibility' | 'other'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const filterCategories = [
    { label: 'ALL RUNNABLES', value: 'all' },
    { label: 'AI PROJECTS', value: 'ai' },
    { label: 'REACT SYSTEMS', value: 'react' },
    { label: 'ACCESSIBILITY FOCUS', value: 'accessibility' },
    { label: 'OTHER SCRIPTS', value: 'other' }
  ];

  const handleFilterClick = (cat: any) => {
    sysSynth.playBeep(520, 0.05, 'sine');
    setActiveFilter(cat);
  };

  const handleOpenCaseStudy = (proj: Project) => {
    sysSynth.playConfirm();
    setSelectedProject(proj);
  };

  const handleCloseCaseStudy = () => {
    sysSynth.playBeep(320, 0.05, 'sine');
    setSelectedProject(null);
  };

  // Multiple levels of cascading filter (Category + Navbar Search Query)
  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesCategory = activeFilter === 'all' || proj.category === activeFilter;
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="projects-showcase-panel" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Category Tab Bar Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {filterCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleFilterClick(cat.value as any)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-widest transition-all duration-300 border cursor-pointer ${
                activeFilter === cat.value
                  ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-glow-lime'
                  : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white hover:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <span className="text-[10px] font-mono text-white/30">
          FILTERED_LOGS: {filteredProjects.length} OF {PROJECTS_DATA.length}
        </span>
      </div>

      {/* Grid of Custom Premium Cards */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-white/5 bg-black/20">
          <HelpCircle className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <h3 className="text-sm font-headline font-bold text-white uppercase">No assets found</h3>
          <p className="text-xs text-white/40 mt-1">Adjust search parameters or select a different compiler tab.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="rounded-3xl glass-panel border border-white/5 overflow-hidden flex flex-col justify-between group hover:border-[#ccff00]/25 hover:shadow-[0_0_30px_rgba(204,255,0,0.1)] hover:scale-[1.01] transition-all duration-500 shadow-xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ccff00]/0 to-transparent group-hover:via-[#ccff00]/40 transition-all duration-500" />
              
              {/* Card visual banner */}
              <div className="p-5 space-y-4">
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/5 bg-[#050505] relative">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur border border-white/10 text-[9px] font-mono text-[#ccff00] font-bold uppercase tracking-wider">
                    {proj.category}
                  </div>
                </div>

                {/* Information Header */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-headline font-black text-white group-hover:text-[#ccff00] transition-colors uppercase tracking-tight">
                        {proj.title}
                      </h3>
                      <p className="text-[10px] font-mono text-[#ccff00] font-medium tracking-wide uppercase mt-0.5">
                        {proj.tagline}
                      </p>
                    </div>
                    {proj.caseStudyUrl && (
                      <button
                        onClick={() => handleOpenCaseStudy(proj)}
                        className="px-2.5 py-1 text-[8px] font-mono tracking-widest text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/25 rounded-md hover:bg-[#ccff00] hover:text-black transition-all cursor-pointer uppercase shrink-0"
                        title="View Architecture Details"
                      >
                        Specs
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-sans line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                {/* Custom stats panel inside card */}
                {proj.stats && (
                  <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-lg bg-black/45 border border-white/5">
                    {proj.stats.map((s, idx) => (
                      <div key={idx} className="text-left">
                        <span className="text-[8px] font-mono text-white/30 uppercase block">{s.label}</span>
                        <span className="text-[11px] font-mono text-white font-extrabold block mt-0.5">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technologies row and buttons footer */}
              <div className="p-5 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-white/70 border border-white/5 transition-colors group-hover:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Prominent Try Gesture Lab button for the Live Gesture Image Puzzle */}
                {proj.id === 'gesture-lab' && (
                  <button
                    onClick={() => {
                      sysSynth.playConfirm();
                      setActiveTab('game');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#ccff00] hover:bg-lime-400 text-black font-headline font-black text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-glow-lime hover:scale-[1.02] transition-all duration-300 uppercase"
                  >
                    <Cpu className="w-4 h-4 text-black animate-pulse" />
                    <span>Try Gesture Lab</span>
                  </button>
                )}

                {/* Project links footer */}
                <div className="grid grid-cols-2 gap-2.5 pt-3.5 border-t border-white/5">
                  <a
                    href={proj.liveUrl && proj.liveUrl !== '#' ? proj.liveUrl : undefined}
                    target={proj.liveUrl && proj.liveUrl !== '#' ? "_blank" : undefined}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!proj.liveUrl || proj.liveUrl === '#') {
                        e.preventDefault();
                        sysSynth.playError();
                        showToast(`Deployment node for ${proj.title} is preparing for continuous integration. Local simulation is fully active!`);
                      } else {
                        sysSynth.playSuccess();
                        showToast(`Handshake secure. Redirecting to deployment server at ${proj.title}...`);
                      }
                    }}
                    className="py-2.5 px-2 rounded-xl bg-[#ccff00] hover:brightness-110 text-black text-[10px] font-headline font-black flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer uppercase tracking-wider"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-black" />
                    <span>View Project</span>
                  </a>

                  <a
                    href={proj.githubUrl && proj.githubUrl !== '#' ? proj.githubUrl : undefined}
                    target={proj.githubUrl && proj.githubUrl !== '#' ? "_blank" : undefined}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!proj.githubUrl || proj.githubUrl === '#') {
                        e.preventDefault();
                        sysSynth.playError();
                        showToast(`Source repository node for ${proj.title} is preparing. Local configuration is fully active!`);
                      } else {
                        sysSynth.playConfirm();
                        showToast(`Handshake secure. Redirecting to repository at ${proj.title}...`);
                      }
                    }}
                    className="py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] font-headline font-black flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer uppercase tracking-wider"
                  >
                    <Github className="w-3.5 h-3.5 text-white/80" />
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Creative Works Section */}
      <div className="pt-12 border-t border-white/5 space-y-6">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#ccff00] animate-pulse" />
          <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
            CREATIVE WORKS // DESIGN_PORTFOLIO
          </h2>
        </div>

        <div className="rounded-3xl glass-panel border border-white/5 overflow-hidden group hover:border-[#ccff00]/20 hover:shadow-[0_0_40px_rgba(204,255,0,0.08)] transition-all duration-500 relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ccff00]/0 to-transparent group-hover:via-[#ccff00]/40 transition-all duration-500" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 items-center">
            {/* Poster Image Container */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative h-[420px] md:h-[500px]">
              <img 
                src="/assets/alone-poster-final.jpg" 
                alt="Alone (Movie Poster Concept)" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="px-2.5 py-1 rounded bg-[#ccff00] text-black text-[9px] font-mono font-black uppercase tracking-wider shadow-glow-lime">
                  Graphic Design / Photoshop
                </span>
                <h3 className="text-lg font-headline font-black text-white uppercase mt-2.5 tracking-tight leading-tight">
                  Alone
                </h3>
                <span className="text-[10px] font-mono text-[#ccff00] block mt-0.5">MOVIE POSTER CONCEPT // 2025</span>
              </div>
            </div>

            {/* Poster Details Container */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div>
                <span className="text-[9px] font-mono text-[#ccff00] tracking-widest uppercase block mb-1">
                  CASE STUDY // DESIGN_NODE_01
                </span>
                <h2 className="text-xl md:text-3xl font-headline font-black text-white uppercase tracking-tight">
                  Alone (Movie Poster Concept)
                </h2>
                <div className="flex gap-4 mt-2">
                  <div className="text-left">
                    <span className="text-[8px] font-mono text-white/30 uppercase block">Category</span>
                    <span className="text-[11px] font-mono text-[#ccff00] font-bold">Graphic Design / Photoshop</span>
                  </div>
                  <div className="text-left border-l border-white/10 pl-4">
                    <span className="text-[8px] font-mono text-white/30 uppercase block">Year</span>
                    <span className="text-[11px] font-mono text-white font-bold">2025</span>
                  </div>
                  <div className="text-left border-l border-white/10 pl-4">
                    <span className="text-[8px] font-mono text-white/30 uppercase block">Tool</span>
                    <span className="text-[11px] font-mono text-white font-bold">Adobe Photoshop</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 font-sans text-xs text-white/70 leading-relaxed border-t border-b border-white/5 py-5">
                <p>
                  My first Photoshop project. A horror-themed movie poster designed using Adobe Photoshop. 
                  This project helped me learn photo manipulation, layer blending, cinematic typography, 
                  color grading, and visual storytelling.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1 bg-black/30 p-3 rounded-lg border border-white/5">
                    <span className="text-[9px] font-mono text-[#ccff00] uppercase block font-bold">Techniques Learned</span>
                    <ul className="text-[10px] space-y-1 text-white/50 font-mono">
                      <li>• Photo Manipulation</li>
                      <li>• Complex Layer Blending</li>
                      <li>• Cinematic Color Grading</li>
                    </ul>
                  </div>
                  <div className="space-y-1 bg-black/30 p-3 rounded-lg border border-white/5">
                    <span className="text-[9px] font-mono text-[#ccff00] uppercase block font-bold">Visual Storytelling</span>
                    <ul className="text-[10px] space-y-1 text-white/50 font-mono">
                      <li>• Dark Ambient Atmosphere</li>
                      <li>• Custom Horror Typography</li>
                      <li>• Depth and Focus Masking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="/assets/alone-poster-final.jpg"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sysSynth.playSuccess()}
                  className="px-5 py-3 rounded-xl bg-[#ccff00] text-black font-headline font-black text-xs tracking-wider flex items-center gap-1.5 transition-all hover:shadow-glow-lime cursor-pointer uppercase"
                >
                  <ExternalLink className="w-4 h-4 text-black" />
                  <span>View Full Concept Poster</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Deep Dive Dialog Overlay */}
      {selectedProject && (
        <div id="case-study-overlay" className="fixed inset-0 bg-[#050505]/90 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="w-full max-w-3xl glass-panel-heavy rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative my-8 animate-in zoom-in-95 duration-300">
            
            {/* Top Close Bar */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/30">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#ccff00]" />
                <span className="text-[10px] font-mono tracking-widest text-white/50">
                  CASE STUDY ARCHITECTURE COMPLIANCE LOGS
                </span>
              </div>
              <button 
                onClick={handleCloseCaseStudy}
                className="p-1 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Case study scroll container */}
            <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Title & Tagline */}
              <div>
                <span className="text-[9px] font-mono text-[#ccff00] tracking-widest uppercase">
                  PROJECT SPECIFICATION REPORT // NODE_{selectedProject.id.toUpperCase()}
                </span>
                <h2 className="text-xl md:text-2xl font-headline font-black text-white uppercase mt-1">
                  {selectedProject.title}
                </h2>
                <p className="text-xs font-mono text-[#ccff00] mt-0.5">{selectedProject.tagline}</p>
              </div>

              {/* Graphic Banner */}
              <div className="w-full h-56 rounded-2xl overflow-hidden border border-white/5 bg-[#050505]">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 2-Column Specs Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Core description col */}
                <div className="md:col-span-8 space-y-4">
                  <h4 className="text-xs font-mono text-white tracking-widest border-b border-white/5 pb-1">
                    01 // PROJECT OVERVIEW & SCOPE
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {selectedProject.description}
                  </p>

                  <h4 className="text-xs font-mono text-white tracking-widest border-b border-white/5 pb-1 pt-2">
                    02 // ARCHITECTURAL FEATURES
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-white/60">
                        <CheckCircle className="w-4 h-4 text-[#ccff00] mt-0.5 shrink-0" />
                        <span className="font-sans">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stats side drawer */}
                <div className="md:col-span-4 space-y-4 bg-black/20 p-4 rounded-xl border border-white/5 h-fit">
                  <div>
                    <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      COMPILATION STACK
                    </h5>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {selectedProject.technologies.map((t, i) => (
                        <span key={i} className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.stats && (
                    <div className="space-y-3.5 pt-3 border-t border-white/5">
                      <h5 className="text-[10px] font-mono text-[#ccff00] uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-[#ccff00]" />
                        <span>METRIC SCORES</span>
                      </h5>
                      {selectedProject.stats.map((s, i) => (
                        <div key={i} className="flex justify-between items-center text-xs font-mono">
                          <span className="text-white/40 text-[9px] uppercase">{s.label}</span>
                          <span className="text-white font-bold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 border-t border-white/5 text-[9px] font-mono text-white/20">
                    STATUS: SECURE_DEPLOY
                  </div>
                </div>

              </div>

              {/* Architectural diagram mockup for extreme SaaS detail */}
              <div className="p-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01] space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[9px] font-mono tracking-widest text-[#ccff00] uppercase">
                    VIRTUAL RUNTIME ENVIRONMENT PIPELINE
                  </span>
                </div>
                <div className="flex items-center justify-between text-[8px] font-mono text-white/30 bg-black/40 p-2.5 rounded border border-white/5">
                  <span>[CLIENT] --(HTTPS)--&gt; [PORT_3000 ENGINE] --&gt; [PARSING MICROSERVICE] --&gt; [CLOUD STORES REST]</span>
                </div>
              </div>

            </div>

            {/* Bottom bar links */}
            <div className="p-4 border-t border-white/5 flex items-center justify-end gap-2 bg-black/30">
              <button 
                onClick={handleCloseCaseStudy}
                className="px-4 py-2 text-xs font-headline font-bold bg-white/5 hover:bg-white/10 text-white rounded-lg cursor-pointer border border-white/5 transition-all"
              >
                DISMISS DETAILS
              </button>
              <a 
                href={selectedProject.githubUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs font-headline font-bold bg-[#ccff00] text-black rounded-lg hover:shadow-glow-lime transition-all flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GOTO_CODEBASE</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Dynamic Security/Deployment Alert Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-black/95 border-2 border-[#ccff00]/40 text-white font-mono text-[10px] tracking-wider px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur max-w-sm">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping shrink-0" />
            <div className="space-y-0.5">
              <span className="text-[#ccff00] font-black uppercase block">SYS_NET_ALERT:</span>
              <span className="text-white/80 font-sans font-light text-xs leading-normal">{toastMessage}</span>
            </div>
            <button 
              onClick={() => setToastMessage(null)} 
              className="text-white/40 hover:text-white shrink-0 ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
