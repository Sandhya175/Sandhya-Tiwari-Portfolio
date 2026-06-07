import { 
  Briefcase, 
  Trophy, 
  Calendar, 
  MapPin, 
  Award, 
  ChevronRight, 
  Activity,
  AwardIcon,
  Sparkle
} from 'lucide-react';
import { EXPERIENCE_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { sysSynth } from '../utils/audio';

export default function ExperienceView() {
  
  const handleItemClick = (idx: number) => {
    sysSynth.playBeep(440 + idx * 40, 0.05, 'sine');
  };

  return (
    <div id="experience-timeline-matrix" className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Experience Timeline Column */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <Briefcase className="w-4 h-4 text-[#ccff00]" />
          <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
            01 // WEB DEVELOPER TIMELINE
          </h2>
        </div>

        <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div 
              key={exp.id}
              onClick={() => handleItemClick(idx)}
              className="relative pl-10 group"
            >
              {/* Pulsing indicator node */}
              <div className="absolute left-[10px] top-1.5 w-[15px] h-[15px] rounded-full bg-[#050505] border-2 border-[#ccff00] flex items-center justify-center group-hover:border-purple-400 group-hover:scale-110 transition-transform z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] group-hover:bg-purple-400" />
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/30 border border-white/5 hover:border-[#ccff00]/15 transition-all space-y-3 shadow-xl">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm font-headline font-black text-white group-hover:text-[#ccff00] transition-colors uppercase tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-[10px] font-mono text-[#ccff00] font-bold px-2.5 py-0.5 rounded bg-[#ccff00]/5 border border-[#ccff00]/10 w-fit">
                      {exp.period}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 mt-1 uppercase">
                    <span className="text-white hover:text-[#ccff00] transition-colors font-bold">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white/40" />
                      MUMBAI, IND
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                  {exp.description}
                </p>

                {/* Scope bullet tracks */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  {exp.highlights.map((high, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/60">
                      <ChevronRight className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span className="font-sans font-light leading-relaxed">{high}</span>
                    </div>
                  ))}
                </div>

                {/* Specific metrics stack */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {exp.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <Trophy className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
            02 // HONORS & ACADEMIC CREDITS
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {ACHIEVEMENTS_DATA.map((ach, idx) => (
            <div 
              key={ach.id}
              onClick={() => {
                sysSynth.playBeep(600 + idx * 50, 0.05, 'triangle');
              }}
              className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.01] to-black/30 border border-white/5 hover:border-purple-400/25 transition-all cursor-pointer group flex gap-4 items-start relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              
              {/* Trophy icon card with dynamic background colors based on values */}
              <div className={`p-3 rounded-xl bg-gradient-to-b ${ach.id === 'ach1' ? 'from-[#ccff00]/10 to-[#ccff00]/0 border-[#ccff00]/25 text-[#ccff00]' : 'from-purple-500/10 to-purple-500/0 border-purple-500/25 text-purple-400'} border shrink-0 flex items-center justify-center shadow-lg`}>
                <span className="material-icons text-xl font-black">
                  {ach.id === 'ach1' ? '🏆' : ach.id === 'ach2' ? '🥇' : ach.id === 'ach3' ? '🎓' : '🌟'}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 tracking-wider">
                    {ach.category.toUpperCase()} // {ach.date}
                  </span>
                </div>
                
                <h4 className="text-[13px] font-headline font-black text-white group-hover:text-[#ccff00] transition-colors leading-snug">
                  {ach.title}
                </h4>
                
                <p className="text-[11px] text-white/50 leading-relaxed font-sans font-light">
                  {ach.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
