import { Users, Compass, CircleDot, Milestone, ArrowUpRight, Award, Trophy } from 'lucide-react';
import { LEADERSHIP_DATA } from '../data/portfolioData';
import { sysSynth } from '../utils/audio';

export default function LeadershipView() {
  
  const handleItemClick = (idx: number) => {
    sysSynth.playBeep(460 + idx * 40, 0.05, 'sine');
  };

  return (
    <div id="leadership-matrix-section" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Overview Intro Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { title: 'TEAM DIRECTIVES', val: '45+ PEERS COORDINATED', desc: 'Managed student activities across multiple committees.', color: 'text-[#ccff00]' },
          { title: 'CAMPAIGN ENGAGEMENT', val: '1,500+ AUDIENCES', desc: 'Designed publicity channels for vibes festivals.', color: 'text-purple-400' },
          { title: 'CRISIS CALIBRATION', val: '100% TIMING ACCURACY', desc: 'Maintained absolute zero-latency coordinate schedules.', color: 'text-cyan-400' }
        ].map((item, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-gradient-to-b from-white/[0.04] to-black/35 border border-white/5 flex flex-col justify-between"
          >
            <div className="text-[9px] font-mono text-white/30 tracking-widest">{item.title}</div>
            <div className="my-2 text-sm font-headline font-black text-white">{item.val}</div>
            <p className="text-[10px] text-white/50 font-sans">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Main List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEADERSHIP_DATA.map((lead, idx) => (
          <div 
            key={lead.id}
            onClick={() => handleItemClick(idx)}
            className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] via-black/10 to-[#050505]/95 border border-white/5 hover:border-purple-400/20 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden h-full min-h-[340px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ccff00]/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#ccff00] font-bold px-2 py-0.5 rounded bg-[#ccff00]/5 border border-[#ccff00]/10">
                  {lead.period}
                </span>
                
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  ROLE: {lead.role}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-headline font-black text-white group-hover:text-[#ccff00] transition-colors uppercase leading-snug">
                  {lead.title}
                </h3>
                <p className="text-[10px] font-mono text-white/40 tracking-tight uppercase">
                  LEADERSHIP NODE COORDINATOR
                </p>
              </div>

              <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
                {lead.description}
              </p>

              {/* Highlights key outcomes */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase block">KEY OUTCOMES:</span>
                {lead.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/75 font-sans font-light">
                    <span className="text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competency metrics */}
            <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-white/5">
              {lead.skills.map((s, i) => (
                <span 
                  key={i} 
                  className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60"
                >
                  {s}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
