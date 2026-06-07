import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Workflow, 
  CheckCircle,
  FileCode, 
  Brain, 
  Compass, 
  ArrowRight,
  Database,
  Terminal,
  Layers,
  Award,
  Filter,
  BookOpen,
  UserCheck,
  Shield,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType, Project } from '../types';
import { PROJECTS_DATA, SKILLS_DATA, ROADMAP_DATA, DEVELOP_PROCESS } from '../data/portfolioData';
import { sysSynth } from '../utils/audio';

interface DashboardViewProps {
  setActiveTab: (tab: TabType) => void;
  openProjectDetails: (project: Project) => void;
  searchQuery: string;
}

export default function DashboardView({ setActiveTab, openProjectDetails, searchQuery }: DashboardViewProps) {
  const [commits, setCommits] = useState(1348);
  const [uptime, setUptime] = useState(99.98);
  const [metricProgress, setMetricProgress] = useState(0);

  // Filters for Featured Projects / Builds
  const [techFilter, setTechFilter] = useState<'all' | 'react' | 'python' | 'ai' | 'node'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'frontend' | 'ai' | 'accessibility'>('all');

  useEffect(() => {
    // Elegant incremental trigger to showcase animations
    const timer = setTimeout(() => setMetricProgress(1), 100);
    
    // Simulate real-time commit stream to make dashboard immersive
    const commitInterval = setInterval(() => {
      setCommits(prev => prev + (Math.random() > 0.85 ? 1 : 0));
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearInterval(commitInterval);
    };
  }, []);

  const handleWidgetClick = (freq: number) => {
    sysSynth.playBeep(freq, 0.05, 'triangle');
  };

  // Safe search query matching custom fields
  const filteredRoadmap = ROADMAP_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="dashboard-saas-panel" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Banner System Alert */}
      <div className="p-4 rounded-2xl glass-panel border border-[#ccff00]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute top-0 right-0 w-64 h-24 bg-gradient-to-l from-[#ccff00]/5 to-transparent blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00]">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#ccff00] uppercase">
              COGNITIVE LABS SYSTEM ALIVE
            </h4>
            <p className="text-[11px] text-white/50 leading-relaxed max-w-xl">
              Currently compiling Next-Gen models. Browse interactive accessibility puzzles, diagnostic reports analyzers, and community recycling networks.
            </p>
          </div>
        </div>
        <button 
          onClick={() => {
            sysSynth.playConfirm();
            setActiveTab('projects');
          }}
          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg px-4 py-2 text-xs font-headline font-bold flex items-center gap-2 group transition-all"
        >
          <span>EXPLORE BUILDS</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Primary Dynamic Counter Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'PROJECTS BUILT', value: '11+', icon: Workflow, color: 'text-[#ccff00]' },
          { label: 'CERTIFICATIONS', value: '20+', icon: Award, color: 'text-[#e3b5ff]' },
          { label: 'INTERNSHIPS', value: '2', icon: Layers, color: 'text-emerald-400' },
          { label: 'TEAM MEMBERS MANAGED', value: '25+', icon: UserCheck, color: 'text-cyan-400' },
          { label: 'PUBLISHED RESEARCH PAPERS', value: '1', icon: BookOpen, color: 'text-purple-400' },
          { label: 'ONGOING RESEARCH STUDY', value: '1', icon: Brain, color: 'text-[#a5eff3]' },
          { label: 'CUMULATIVE CGPI', value: '8.92', icon: CheckCircle, color: 'text-cyan-500' },
          { label: 'LEADERSHIP ROLES', value: '4+', icon: Shield, color: 'text-amber-400' },
          { label: 'COMMUNITY SERVICE HOURS', value: '120+ Hrs', icon: Heart, color: 'text-pink-400' },
          { label: 'AVISHKAR ZONAL FINALIST', value: 'Qualified', icon: TrendingUp, color: 'text-[#ffd8b4]' },
          { label: 'GUINNESS WORLD RECORD', value: 'Participant', icon: Sparkles, color: 'text-amber-300' }
        ].map((stat, i) => (
          <div 
            key={i} 
            onClick={() => handleWidgetClick(400 + i * 100)}
            className="p-4 rounded-xl glass-panel border border-white/5 flex flex-col justify-between h-28 cursor-pointer hover:border-white/10 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform`} />
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-mono text-white/40 tracking-wider">
                {stat.label}
              </span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <div className="text-lg md:text-xl font-headline font-black text-white group-hover:text-[#ccff00] transition-colors leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-[8px] font-mono text-white/30 tracking-widest uppercase">
                STATUS_NOMINAL // SYS_VERIFIED
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main SaaS Analytics Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget: Growth Chart & Commits trend panel */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel border border-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#ccff00]" />
              <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
                DEVELOPER METRICS & GROWTH CURVE
              </h2>
            </div>
            <span className="text-[9px] font-mono text-white/30 px-2 py-0.5 rounded bg-white/5 border border-white/5">
              AUTO_REFRESH: ACTIVE
            </span>
          </div>

          <div className="h-60 relative w-full flex flex-col justify-between pt-4">
            {/* Beautiful Custom SVG Line and Fill Graph */}
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ccff00" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#ccff00" stopOpacity="0.00"/>
                </linearGradient>
                <linearGradient id="altGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9400e4" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#9400e4" stopOpacity="0.00"/>
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="70" x2="600" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="170" x2="600" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3,3" />

              {/* Commits fill & stroke lines (Neon Lime) */}
              <path
                d={`M 0 170 Q 120 150, 240 100 T 360 85 T 480 35 T 600 15 L 600 170 L 0 170 Z`}
                fill="url(#chartGradient)"
                className="transition-all duration-1000 ease-out"
                style={{ transform: `scaleY(${metricProgress})`, transformOrigin: 'bottom' }}
              />
              <path
                d="M 0 170 Q 120 150, 240 100 T 360 85 T 480 35 T 600 15"
                fill="none"
                stroke="#ccff00"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{ transform: `scaleY(${metricProgress})`, transformOrigin: 'bottom' }}
              />

              {/* Secondary academic study trend line (Purple) */}
              <path
                d={`M 0 180 Q 120 175, 240 130 T 360 110 T 480 80 T 600 50 L 600 180 L 0 180 Z`}
                fill="url(#altGradient)"
                className="transition-all duration-1000 ease-out"
                style={{ transform: `scaleY(${metricProgress})`, transformOrigin: 'bottom' }}
              />
              <path
                d="M 0 180 Q 120 175, 240 130 T 360 110 T 480 80 T 600 50"
                fill="none"
                stroke="#9400e4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="4,2"
                className="transition-all duration-1000 ease-out animate-pulse"
                style={{ transform: `scaleY(${metricProgress})`, transformOrigin: 'bottom' }}
              />

              {/* Dots of Highlight */}
              <circle cx="240" cy="100" r="4" fill="#ccff00" className="animate-ping" />
              <circle cx="240" cy="100" r="3" fill="#ccff00" />
              <circle cx="480" cy="35" r="3" fill="#ccff00" />
              <circle cx="600" cy="15" r="4" fill="#ccff00" />
            </svg>

            {/* Labels overlay */}
            <div className="flex justify-between text-[8px] font-mono text-white/30 px-1 pt-2 border-t border-white/5">
              <span>Q1_2022 // ENTRY</span>
              <span>Q3_2022 // SHIFT_TO_REACT</span>
              <span>Q1_2023 // INTERNSHIPS</span>
              <span>Q3_2023 // AI_TRANSITION</span>
              <span>LATEST // PORTFOLIO</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/5">
            <div className="text-center p-2 rounded bg-white/[0.01]">
              <div className="text-[10px] font-mono text-white/40">TOTAL_PROJECTS</div>
              <div className="text-sm font-headline font-bold text-[#ccff00]">11+ Built</div>
            </div>
            <div className="text-center p-2 rounded bg-white/[0.01]">
              <div className="text-[10px] font-mono text-white/40">CERTIFICATIONS</div>
              <div className="text-sm font-headline font-bold text-white">20+ Verified</div>
            </div>
            <div className="text-center p-2 rounded bg-white/[0.01]">
              <div className="text-[10px] font-mono text-white/40">RESEARCH_PAPERS</div>
              <div className="text-sm font-headline font-bold text-purple-400">1 Published</div>
            </div>
          </div>
        </div>

        {/* Column 3 containing both "Now Building" and "Roadmap tracker" */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* Widget: Now Building (Current Mission) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/20 to-black/80 border border-purple-500/10 shadow-[0_0_20px_rgba(148,0,228,0.05)] relative overflow-hidden flex-1 flex flex-col justify-between min-h-[140px] hover:border-purple-500/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent blur-2xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  <h2 className="text-[10px] font-mono font-black tracking-widest text-[#e3b5ff] uppercase">
                    CURRENT MISSION: NOW BUILDING
                  </h2>
                </div>
                <span className="text-[8px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  R&D PHASE
                </span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase block leading-none mb-1">Mission Identifier</span>
                  <h3 className="text-xs font-headline font-black text-white uppercase tracking-tight">
                    Scanalyzer AI
                  </h3>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-400">RESEARCH PROGRESS</span>
                    <span className="text-[#ccff00] font-black">72%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-[#ccff00] rounded-full"
                      style={{ width: '72%' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-[10px] font-mono">
                  <div>
                    <span className="text-zinc-500 uppercase block text-[7.5px] mb-0.5">Focus Domain</span>
                    <span className="text-white/80 font-medium">Medical Intelligence</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase block text-[7.5px] mb-0.5">Target Release</span>
                    <span className="text-[#ccff00] font-bold">2026 // EST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 mt-3 text-[7.5px] font-mono text-white/30 uppercase tracking-widest leading-none flex justify-between">
              <span>DB_TRACK: SCAN_AI_NODE</span>
              <span>SYS_NOMINAL_ON</span>
            </div>
          </div>

          {/* Widget: Roadmap tracker */}
          <div className="p-5 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#ffffff10] pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
                  <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
                    ROADMAP & TARGETS
                  </h2>
                </div>
                <span className="text-[8px] font-mono text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 px-1.5 py-0.5 rounded">
                  LEARNING
                </span>
              </div>

              <div className="space-y-3.5">
                {filteredRoadmap.map((item, id) => (
                  <div key={id} className="space-y-1.5 p-2.5 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-headline font-bold text-white">{item.title}</span>
                      <span className="text-[9px] font-mono text-[#ccff00]">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.status === 'active' ? 'bg-[#ccff00]' : item.status === 'learning' ? 'bg-purple-500' : 'bg-white/10'}`}
                        style={{ width: `${item.progress}%`, transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                      />
                    </div>
                    <p className="text-[9px] text-white/40 font-mono tracking-tight leading-relaxed">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4">
              <div className="flex items-center justify-between text-[9px] font-mono text-white/30">
                <span>DB_REF: ROADMAP_SQL</span>
                <span>SECURE_SHELL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Process Pipeline Section */}
      <div className="p-5 rounded-2xl glass-panel border border-white/5">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
          <Workflow className="w-4 h-4 text-[#ccff00]" />
          <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
            DEVELOPMENT PIPELINE PROCESSOR
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {DEVELOP_PROCESS.map((p, i) => (
            <div 
              key={i} 
              className={`p-3.5 rounded-xl border transition-all ${
                p.active 
                  ? 'bg-gradient-to-b from-white/[0.04] to-black/40 border-[#ccff00]/20 hover:border-[#ccff00]/60 hover:shadow-glow-lime' 
                  : 'bg-white/[0.01] border-white/5 opacity-50'
              } text-left relative overflow-hidden group`}
            >
              <div className="absolute top-1 right-2 text-2xl font-mono font-extrabold text-white/5 group-hover:text-white/10 transition-colors">
                {p.step}
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <CheckCircle className={`w-3.5 h-3.5 ${p.active ? 'text-[#ccff00]' : 'text-white/20'}`} />
                <span className="text-[11px] font-headline font-bold text-white">
                  {p.title}
                </span>
              </div>
              <p className="text-[9px] text-white/40 font-mono leading-relaxed truncate-2-lines">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects quick panel */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase sm:mb-0">
              HIGH STACK EXECUTABLES PREVIEW
            </h2>
          </div>
          <button 
            onClick={() => setActiveTab('projects')}
            className="text-[10px] font-mono text-[#ccff00] hover:underline text-left"
          >
            VIEW ALL BUILDS ({PROJECTS_DATA.length})
          </button>
        </div>

        {/* Elegant Futuristic Combined Filter Panel */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/50">
              <Filter className="w-3 h-3 text-[#ccff00]" />
              <span>COGNITIVE_FILTER_ENGINE.SH [ONLINE]</span>
            </div>
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
              RESULT_COUNT = {PROJECTS_DATA.filter(item => {
                const matchesTech = techFilter === 'all' || item.technologies.some(t => {
                  const text = t.toLowerCase();
                  if (techFilter === 'ai') return text.includes('ai') || text.includes('learning') || text.includes('tensorflow') || text.includes('gemini');
                  if (techFilter === 'node') return text.includes('node') || text.includes('express');
                  return text.includes(techFilter.toLowerCase());
                });
                const matchesType = typeFilter === 'all' || (
                  typeFilter === 'ai' && (item.category === 'ai' || item.technologies.some(t => t.toLowerCase().includes('ai'))) ||
                  typeFilter === 'accessibility' && item.category === 'accessibility' ||
                  typeFilter === 'frontend' && (item.category === 'react' || item.category === 'other' || item.technologies.includes('React'))
                );
                return matchesTech && matchesType;
              }).length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filter by Technology */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-purple-500 rounded" />
                <span className="text-[9.5px] font-mono font-black text-purple-400 tracking-wider">
                  TECHNOLOGY_STACK
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: 'all', label: 'ALL_TECH' },
                  { value: 'react', label: 'REACT' },
                  { value: 'python', label: 'PYTHON' },
                  { value: 'ai', label: 'AI_MODELS' },
                  { value: 'node', label: 'NODE_JS' }
                ].map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => {
                      sysSynth.playBeep(450, 0.04, 'sine');
                      setTechFilter(tf.value as any);
                    }}
                    className={`px-3 py-1 rounded-lg text-[9px] font-mono tracking-widest border transition-all cursor-pointer ${
                      techFilter === tf.value
                        ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                        : 'bg-white/5 text-white/50 border-white/5 hover:text-[#ccff00] hover:border-[#ccff00]/20'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Type */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-[#ccff00] rounded" />
                <span className="text-[9.5px] font-mono font-black text-[#ccff00] tracking-wider">
                  PROJECT_CATEGORIES
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: 'all', label: 'ALL_TYPES' },
                  { value: 'frontend', label: 'FRONTEND' },
                  { value: 'ai', label: 'AI_SYSTEMS' },
                  { value: 'accessibility', label: 'ACCESSIBILITY' }
                ].map((tyf) => (
                  <button
                    key={tyf.value}
                    onClick={() => {
                      sysSynth.playBeep(520, 0.04, 'triangle');
                      setTypeFilter(tyf.value as any);
                    }}
                    className={`px-3 py-1 rounded-lg text-[9px] font-mono tracking-widest border transition-all cursor-pointer ${
                      typeFilter === tyf.value
                        ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                        : 'bg-white/5 text-white/50 border-white/5 hover:text-[#ccff00] hover:border-[#ccff00]/20'
                    }`}
                  >
                    {tyf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Animated Grid */}
        <div className="relative min-h-[220px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {PROJECTS_DATA.filter((item) => {
                // 1. Tech Match
                if (techFilter !== 'all') {
                  const q = techFilter.toLowerCase();
                  const matches = item.technologies.some(t => {
                    const text = t.toLowerCase();
                    if (q === 'ai') return text.includes('ai') || text.includes('learning') || text.includes('tensorflow') || text.includes('gemini');
                    if (q === 'node') return text.includes('node') || text.includes('express');
                    return text.includes(q);
                  });
                  if (!matches) return false;
                }

                // 2. Type Match
                if (typeFilter !== 'all') {
                  const q = typeFilter.toLowerCase();
                  let matches = false;
                  if (q === 'ai') {
                    matches = item.category === 'ai' || item.technologies.some(t => t.toLowerCase().includes('ai'));
                  } else if (q === 'accessibility') {
                    matches = item.category === 'accessibility';
                  } else if (q === 'frontend') {
                    matches = item.category === 'react' || item.category === 'other' || item.technologies.includes('React');
                  }
                  if (!matches) return false;
                }

                // 3. Search query match
                if (searchQuery) {
                  const q = searchQuery.toLowerCase();
                  const hasSearch = 
                    item.title.toLowerCase().includes(q) ||
                    item.tagline.toLowerCase().includes(q) ||
                    item.technologies.some(t => t.toLowerCase().includes(q));
                  if (!hasSearch) return false;
                }

                return true;
              }).map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  key={item.id}
                  onClick={() => {
                    sysSynth.playConfirm();
                    openProjectDetails(item);
                  }}
                  className="p-4 rounded-xl bg-gradient-to-b from-white/[0.02] to-black/30 border border-white/5 hover:border-[#ccff00]/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full h-32 rounded-lg overflow-hidden border border-white/5 mb-3.5 relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xl border border-white/10 text-[8px] font-mono text-[#ccff00] uppercase">
                        {item.category}
                      </div>
                    </div>

                    <h3 className="text-xs font-headline font-black text-white group-hover:text-[#ccff00] transition-colors uppercase">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-mono text-white/40 mb-3 mt-1 uppercase">
                      {item.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00]">
                        +{item.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {PROJECTS_DATA.filter((item) => {
              if (techFilter !== 'all') {
                const q = techFilter.toLowerCase();
                const matches = item.technologies.some(t => {
                  const text = t.toLowerCase();
                  if (q === 'ai') return text.includes('ai') || text.includes('learning') || text.includes('tensorflow') || text.includes('gemini');
                  if (q === 'node') return text.includes('node') || text.includes('express');
                  return text.includes(q);
                });
                if (!matches) return false;
              }
              if (typeFilter !== 'all') {
                const q = typeFilter.toLowerCase();
                let matches = false;
                if (q === 'ai') {
                  matches = item.category === 'ai' || item.technologies.some(t => t.toLowerCase().includes('ai'));
                } else if (q === 'accessibility') {
                  matches = item.category === 'accessibility';
                } else if (q === 'frontend') {
                  matches = item.category === 'react' || item.category === 'other' || item.technologies.includes('React');
                }
                if (!matches) return false;
              }
              if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const hasSearch = 
                  item.title.toLowerCase().includes(q) ||
                  item.tagline.toLowerCase().includes(q) ||
                  item.technologies.some(t => t.toLowerCase().includes(q));
                if (!hasSearch) return false;
              }
              return true;
            }).length === 0 && (
              <div className="col-span-full py-12 text-center rounded-xl bg-white/[0.01] border border-white/5 flex flex-col items-center justify-center">
                <span className="text-xl mb-2">📡</span>
                <p className="text-xs font-mono text-white/40 uppercase">// ZERO_RECORDS_MATCH_PARAMETERS</p>
                <p className="text-[10px] text-white/20 font-mono mt-1">Try resetting technologies or categories filter matrix</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
