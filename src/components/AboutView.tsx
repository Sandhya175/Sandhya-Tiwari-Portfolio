import { 
  Sparkles, 
  Grid, 
  Rocket, 
  Search, 
  Brain, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Database,
  Terminal,
  Code
} from 'lucide-react';
import { sysSynth } from '../utils/audio';
import PlexusAvatar from './PlexusAvatar';

export default function AboutView() {
  
  const coreCompetencies = [
    {
      title: 'Frontend Architecture',
      desc: 'Formulating elegant browser layouts utilizing structural modern HTML5 components, responsive Flexbox/Grid constructs, and beautiful custom utility classes.',
      icon: Layers,
      color: 'text-[#ccff00]',
      shadow: 'shadow-[#ccff00]/10'
    },
    {
      title: 'React Ecosystem Engine',
      desc: 'Integrating customized reactive state vectors, custom hook workflows, modular reusable component units, and optimized profiling matrices.',
      icon: Code,
      color: 'text-purple-400',
      shadow: 'shadow-purple-500/10'
    },
    {
      title: 'UI/UX Visual Cognitive Thinker',
      desc: 'Crafting responsive user flows rooted in rigorous human interface patterns, sufficient typography contrast matching visual structures, and elegant animations.',
      icon: Sparkles,
      color: 'text-cyan-400',
      shadow: 'shadow-cyan-500/10'
    },
    {
      title: 'Asynchronous API Integrator',
      desc: 'Structuring telemetry channels that coordinate requests safely, with fallback architectures, error boundaries, and low transport overhead parameters.',
      icon: Cpu,
      color: 'text-[#ccff00]',
      shadow: 'shadow-[#ccff00]/10'
    },
    {
      title: 'Algorithmic Problem Solving',
      desc: 'Investigating complex algorithmic edgecases, data caching limits, spatial complexities, and efficient execution speeds.',
      icon: Brain,
      color: 'text-purple-400',
      shadow: 'shadow-purple-500/10'
    }
  ];

  const bioMilestones = [
    { label: 'Role', value: 'Technical Innovator & Developer' },
    { label: 'Academic Path', value: 'BSc Information Technology Student' },
    { label: 'Academic Standing', value: 'CGPA 9.10 Academic Elite' },
    { label: 'Focus Nodes', value: 'Computer Vision, High-Performance React UI, Human Factors Accessibilities' }
  ];

  return (
    <div id="about-developer-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Visual Header card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Dynamic Photo node */}
        <div className="lg:col-span-4 rounded-3xl overflow-hidden glass-panel border border-white/5 p-3.5 flex flex-col justify-between min-h-[350px] relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ccff00]/5 to-purple-500/5 opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none" />
          
          <PlexusAvatar />

          <div className="w-full text-center mt-3 pt-3 border-t border-white/5">
            <h3 className="text-sm font-headline font-black text-white uppercase tracking-wider">
              SANDHYA TIWARI
            </h3>
            <p className="text-[10px] font-mono text-[#ccff00] uppercase mt-0.5 tracking-widest">
              BSc. Information Technology Student
            </p>
          </div>
        </div>

        {/* Biography content card */}
        <div className="lg:col-span-8 rounded-3xl glass-panel border border-white/5 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Terminal className="w-4 h-4 text-[#ccff00]" />
              <span className="text-xs font-mono font-black tracking-widest text-[#ccff00] uppercase">
                SYS_BIOGRAPHY_MANIFEST
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-headline font-black text-white leading-tight">
              A Frontend Catalyst sculpting deep digital solutions on React systems.
            </h2>
            
            <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
              Hello, I am Sandhya Tiwari. Pursuing my Bachelor of Science in Information Technology, I view software compilation not merely as a career, but as an engineering discipline that balances technical excellence with profound social accessibility.
            </p>
            <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
              Through designing real-world systems — such as <strong className="text-[#ccff00] font-bold">Scanalyzer™</strong> for medical report analytics, gesture models for <strong className="text-purple-400 font-bold">Sign Language Translation</strong>, and community telemetry trackers like <strong className="text-cyan-400 font-bold">Ether Recycle</strong> — my primary mission is building beautiful, performant SaaS products with zero architectural overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
            {bioMilestones.map((bm, idx) => (
              <div key={idx} className="p-2 rounded bg-white/[0.01] border border-white/5">
                <span className="text-[9px] font-mono text-white/30 tracking-wide uppercase block">
                  {bm.label}
                </span>
                <span className="text-xs font-headline font-bold text-white uppercase mt-0.5 block">
                  {bm.value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Competencies Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
            SPECIALIZED COMPETENCY DOMAINS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {coreCompetencies.map((comp, idx) => {
            const IconComp = comp.icon;
            return (
              <div 
                key={idx}
                onClick={() => sysSynth.playBeep(450 + idx * 50, 0.05)}
                className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/5 hover:border-white/10 hover:shadow-2xl hover:scale-[1.01] transition-all cursor-pointer group flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform`} />
                <div className="space-y-3">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 w-fit ${comp.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-sm font-headline font-black text-white uppercase group-hover:text-[#ccff00] transition-colors">
                    {comp.title}
                  </h3>
                  
                  <p className="text-[11px] text-white/60 leading-relaxed font-sans font-light">
                    {comp.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/30 uppercase pt-2 border-t border-white/5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${comp.color}`} />
                  <span>SYS_CALIBRATED_NOMINAL</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
