import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Terminal, Code2, Database, Shield, Hammer, Cpu, Zap, Radio,
  Atom, FileCode, Layers, Server, Coffee, GitBranch, Github, Paintbrush, Compass
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { sysSynth } from '../utils/audio';

// Top premium skills selected for 3D Orbit Showcase
const ORBIT_SKILLS = [
  { name: 'React', level: 96, category: 'frontend' },
  { name: 'JavaScript', level: 94, category: 'frontend' },
  { name: 'Python', level: 90, category: 'programming' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express', level: 88, category: 'backend' },
  { name: 'MySQL', level: 82, category: 'database' },
  { name: 'Tailwind CSS', level: 97, category: 'frontend' },
  { name: 'GitHub', level: 95, category: 'tools' }
];

export default function SkillsView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'database' | 'programming' | 'tools'>('all');
  
  // 3D Orbit state machines
  const [angle, setAngle] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<any | null>(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.007);
  const [selectedOrbitSkill, setSelectedOrbitSkill] = useState<any | null>(ORBIT_SKILLS[0]);
  const [testSignalOn, setTestSignalOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  // Monitor screen layout bounds for responsive orbit metrics
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Responsive radial coordinates
  const rx = isMobile ? 96 : 180;
  const ry = isMobile ? 36 : 56;

  // Ultra fluid angle driver loop
  useEffect(() => {
    let animationFrameId: number;
    const tick = () => {
      setAngle((prev) => (prev + rotationSpeed) % (2 * Math.PI));
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [rotationSpeed]);

  // Adjust routing acceleration depending on cursor proximity
  const handleMouseMoveOrbit = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbitContainerRef.current) return;
    const rect = orbitContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = e.clientX - centerX;
    // Fluid responsive mapping to dynamic speed variables
    const mappedSpeed = (deltaX / (rect.width / 2)) * 0.024;
    setRotationSpeed(mappedSpeed === 0 ? 0.007 : mappedSpeed);
  };

  const handleMouseLeaveOrbit = () => {
    setRotationSpeed(0.007);
    setHoveredSkill(null);
  };

  const triggerTestSignal = (skill: any) => {
    setTestSignalOn(true);
    sysSynth.playBeep(880, 0.12, 'sawtooth');
    setTimeout(() => {
      sysSynth.playBeep(1200, 0.08, 'sine');
      setTestSignalOn(false);
    }, 200);
  };

  const getSkillIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'react': return Atom;
      case 'javascript': return FileCode;
      case 'html': return Code2;
      case 'css': return Layers;
      case 'tailwind css': return Compass;
      case 'scss': return Paintbrush;
      case 'node.js': return Server;
      case 'express': return Cpu;
      case 'mysql': return Database;
      case 'python': return Terminal;
      case 'java': return Coffee;
      case 'git': return GitBranch;
      case 'github': return Github;
      default: return Terminal;
    }
  };

  const categories = [
    { label: 'ALL DEPLOYABLES', value: 'all', icon: Brain },
    { label: 'FRONTEND STACK', value: 'frontend', icon: Code2 },
    { label: 'BACKEND SERVICES', value: 'backend', icon: Shield },
    { label: 'DATABASES', value: 'database', icon: Database },
    { label: 'LANGUAGES & SCRIPTS', value: 'programming', icon: Terminal },
    { label: 'UTILITIES & TOOLS', value: 'tools', icon: Hammer }
  ];

  const handleCategoryClick = (cat: any) => {
    sysSynth.playBeep(550, 0.05, 'sine');
    setActiveCategory(cat);
  };

  const filteredSkills = SKILLS_DATA.filter(skill => 
    activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <div id="skills-matrix-panel" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 3D ORBIT COGNITIVE PORTAL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive Orbit Interface (Left Side) - Takes up 7 columns */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-gradient-to-b from-white/[0.02] to-black/30 border border-white/5 flex flex-col justify-between overflow-hidden relative min-h-[340px] md:min-h-[380px] shadow-2xl">
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <Radio className="w-3.5 h-3.5 text-[#ccff00] animate-pulse" />
            <h3 className="text-[10px] font-mono font-black tracking-widest text-white uppercase">
              COGNITIVE_3D_ORBIT_NUCLEUS
            </h3>
          </div>
          <div className="absolute top-4 right-4 text-[8px] font-mono text-white/30 tracking-widest">
            X_SPEED: {(rotationSpeed * 1000).toFixed(1)}Hz // TILT: 30°
          </div>

          {/* Interactive Core Render Section */}
          <div 
            ref={orbitContainerRef}
            onMouseMove={handleMouseMoveOrbit}
            onMouseLeave={handleMouseLeaveOrbit}
            className="flex-1 w-full flex items-center justify-center relative mt-8 pb-4"
          >
            {/* Ambient grid projection decor rings */}
            <svg className="absolute w-full h-full pointer-events-none opacity-20" style={{ transform: 'rotateX(70deg) rotateY(10deg)' }}>
              <ellipse 
                cx="50%" 
                cy="50%" 
                rx={rx} 
                ry={ry * 1.5} 
                fill="none" 
                stroke="#ccff00" 
                strokeWidth="1.5" 
                strokeDasharray="4 6" 
                className="animate-[spin_40s_linear_infinite]"
              />
              <ellipse 
                cx="50%" 
                cy="50%" 
                rx={rx * 0.7} 
                ry={ry * 1.15} 
                fill="none" 
                stroke="#9400e4" 
                strokeWidth="1.2" 
                strokeDasharray="3 4" 
                className="animate-[spin_25s_linear_infinite_reverse]"
              />
            </svg>

            {/* CENTRAL READOUT NUCLEUS CORE */}
            <div 
              className={`absolute w-32 h-32 rounded-full bg-gradient-to-br from-black/80 to-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center p-3 text-center select-none z-50 transition-all duration-300 ${
                hoveredSkill ? 'shadow-[0_0_35px_rgba(204,255,0,0.25)] border-[#ccff00]/40' : 'shadow-[0_0_20px_rgba(148,0,228,0.15)]'
              }`}
            >
              {/* Core scanning particle elements */}
              <div className="absolute inset-1 rounded-full border border-white/5 animate-pulse" />
              <div className="absolute inset-2.5 rounded-full border border-[#ccff00]/5 animate-ping duration-[3s]" />

              {hoveredSkill || selectedOrbitSkill ? {
                display: (
                  <div className="animate-in fade-in zoom-in-95 duration-200">
                    <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest block leading-3">// CORE_SYNC</span>
                    <span className="text-xs font-black text-[#ccff00] font-headline tracking-tight uppercase leading-none block mt-1.5 truncate max-w-[110px]">
                      {(hoveredSkill || selectedOrbitSkill).name}
                    </span>
                    <span className="text-sm font-mono font-black text-purple-400 block mt-1">
                      {(hoveredSkill || selectedOrbitSkill).level}%
                    </span>
                    <span className="text-[7px] font-mono text-white/30 uppercase tracking-wide block mt-0.5">
                      {(hoveredSkill || selectedOrbitSkill).category}
                    </span>
                  </div>
                )
              }.display : (
                <div className="space-y-1 animate-pulse">
                  <Cpu className="w-5 h-5 text-purple-500 mx-auto" />
                  <span className="text-[8px] font-mono text-white/40 tracking-widest block">WAIT_TELM</span>
                </div>
              )}
            </div>

            {/* ROTATING 3D SATELLITE ORBIT NODES */}
            {ORBIT_SKILLS.map((skill, idx) => {
              const offsetAngle = (2 * Math.PI * idx) / ORBIT_SKILLS.length;
              const currentAngle = angle + offsetAngle;
              const cos = Math.cos(currentAngle);
              const sin = Math.sin(currentAngle);
              
              // 3D coordinates system projected onto the viewport
              const nodeX = cos * rx;
              const nodeY = sin * ry;
              
              const depthFactor = sin; // -1 to +1 (depth)
              const scale = 0.72 + (depthFactor + 1) * 0.16; // 0.72 to 1.04
              const opacity = 0.35 + (depthFactor + 1) * 0.325; // 0.35 to 1.0
              const depthZ = Math.round(50 + depthFactor * 42); // correctly puts nodes behind/in-front of the central core

              const IconComponent = getSkillIcon(skill.name);
              const isCurrentlyHovered = hoveredSkill?.name === skill.name;
              const isCurrentlySelected = selectedOrbitSkill?.name === skill.name;

              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    sysSynth.playBeep(700 + idx * 25, 0.05, 'sine');
                    setSelectedOrbitSkill(skill);
                  }}
                  onMouseEnter={() => {
                    sysSynth.playBeep(520 + idx * 10, 0.02, 'triangle');
                    setHoveredSkill(skill);
                  }}
                  className={`absolute p-2.5 rounded-xl border cursor-pointer select-none transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
                    isCurrentlyHovered 
                      ? 'bg-black/90 text-[#ccff00] border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.55)] scale-110 brightness-125 z-[120]' 
                      : isCurrentlySelected
                        ? 'bg-purple-950/20 text-white border-purple-500/30 shadow-[0_0_10px_rgba(148,0,228,0.25)]'
                        : 'bg-black/85 text-white/50 border-white/5 hover:border-white/20'
                  }`}
                  style={{
                    transform: `translate3d(${nodeX}px, ${nodeY}px, 0) scale(${scale})`,
                    opacity: opacity,
                    zIndex: isCurrentlyHovered ? 120 : depthZ,
                  }}
                >
                  <IconComponent className={`w-4 h-4 transition-transform duration-300 ${isCurrentlyHovered ? 'rotate-12 scale-110 text-[#ccff00]' : ''}`} />
                  <span className="text-[7.5px] font-mono tracking-wider uppercase block select-none">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-[9px] font-mono text-white/20 mt-2 text-center">// HOVER_NODES_TO_HALT_AND_DECODE // DRAG_X_TO_ROTATE_SPHERE</div>
        </div>

        {/* Diagnostic readout screen (Right Side) - Takes up 5 columns */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-white/[0.02] to-black/30 border border-white/5 flex flex-col justify-between space-y-4 shadow-2xl">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                DIAGNOSTIC_ANALYSIS.OUT
              </span>
              <span className="text-[9px] font-mono text-purple-400 font-extrabold px-1.5 py-0.5 rounded bg-purple-500/10">
                ACTIVE
              </span>
            </div>

            {selectedOrbitSkill ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-white/30 tracking-widest block uppercase">SYS_TELEMETRY_TARGET</span>
                  <div className="text-lg font-headline font-black text-white tracking-tight uppercase flex items-center gap-2">
                    {selectedOrbitSkill.name}
                    <span className="text-[10px] font-mono text-[#ccff00] font-black px-2 py-0.5 rounded bg-[#ccff00]/10 border border-[#ccff00]/20">
                      LEVEL: {selectedOrbitSkill.level}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-white/[0.01] border border-white/5">
                    <div className="text-[7px] font-mono text-white/30 uppercase">COMPILATION_UNIT</div>
                    <div className="text-[10px] font-mono text-white/70 uppercase mt-0.5">NOMINAL_COMPILE</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.01] border border-white/5">
                    <div className="text-[7px] font-mono text-white/30 uppercase">MATRIX_SECTOR</div>
                    <div className="text-[10px] font-mono text-white/70 uppercase mt-0.5">{selectedOrbitSkill.category}</div>
                  </div>
                </div>

                {/* Simulated diagnostic chart of compiled signal */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[8.5px] font-mono text-white/40">
                    <span>EMISSIVE SIGNAL COMPILATION</span>
                    <span className={testSignalOn ? 'text-[#ccff00] font-bold' : 'text-purple-400'}>
                      {testSignalOn ? 'TRANSMITTING...' : 'STABLE'}
                    </span>
                  </div>
                  <div className="h-12 w-full bg-black/40 border border-white/5 rounded-xl flex items-end p-1.5 gap-[2px] overflow-hidden relative">
                    {/* Pulsing visual graph wave bar decor */}
                    {Array.from({ length: isMobile ? 18 : 28 }).map((_, i) => {
                      const baseHeight = 15 + Math.sin(i * 0.4) * 12 + Math.cos(i * 0.8) * 8;
                      const noise = testSignalOn ? Math.random() * 20 - 10 : 0;
                      const heightPercent = Math.max(15, Math.min(95, baseHeight + noise));
                      return (
                        <div 
                          key={i} 
                          className={`flex-1 rounded-sm transition-all duration-150 ${
                            testSignalOn ? 'bg-[#ccff00]' : 'bg-purple-500/20 group-hover:bg-purple-500/40'
                          }`}
                          style={{ 
                            height: `${heightPercent}%`,
                            animation: `pulse 1.3s ease-in-out infinite alternate ${i * 0.05}s`
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-white/20 font-mono text-[9px]">
                SELECT ANY ROTATING NODE IN THE ORBIT FIELD TO ACTIVATE THE READOUT TERMINAL
              </div>
            )}
          </div>

          <button
            onClick={() => selectedOrbitSkill && triggerTestSignal(selectedOrbitSkill)}
            disabled={!selectedOrbitSkill || testSignalOn}
            className={`w-full py-2.5 rounded-xl text-[10px] font-mono tracking-widest border font-black uppercase transition-all cursor-pointer ${
              testSignalOn 
                ? 'bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/30 animate-pulse'
                : 'bg-white/5 text-white/80 border-white/5 hover:text-[#ccff00] hover:border-[#ccff00]/30 hover:bg-[#ccff00]/5'
            }`}
          >
            <Zap className={`w-3 h-3 inline mr-1.5 ${testSignalOn ? 'animate-bounce' : ''}`} />
            TRIGGER_FREQUENCY_DEEP_PULSE
          </button>
        </div>
        
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-4">
        {categories.map((c) => {
          const IconComp = c.icon;
          const isActive = activeCategory === c.value;
          return (
            <button
              key={c.value}
              onClick={() => handleCategoryClick(c.value as any)}
              className={`px-3.5 py-2 rounded-xl text-[10px] font-mono tracking-widest flex items-center gap-2 border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#ccff00] text-black border-[#ccff00] font-black shadow-glow-lime'
                  : 'bg-white/[0.01] text-white/50 border-white/5 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSkills.map((skill, idx) => (
          <div 
            key={idx}
            onClick={() => sysSynth.playBeep(650 + idx * 10, 0.04, 'sine')}
            className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/30 border border-white/5 hover:border-white/10 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-xl hover:scale-[1.01]"
          >
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase block">
                {skill.category} MODULE
              </span>
              <span className="text-sm font-headline font-black text-white group-hover:text-[#ccff00] transition-colors block">
                {skill.name}
              </span>
            </div>

            {/* Visual meter */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono select-none">
                <span className="text-white/40">COMPILATION RATING:</span>
                <span className="text-[#ccff00] font-bold">{skill.level}%</span>
              </div>

              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-[#ccff00] h-full transition-all duration-1000 group-hover:brightness-110"
                  style={{ width: `${skill.level}%`, transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

