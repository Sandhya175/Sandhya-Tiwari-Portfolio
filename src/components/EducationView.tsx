import React from 'react';
import { 
  BookOpen, 
  MapPin, 
  Award, 
  GraduationCap, 
  CheckCircle, 
  Clock, 
  Layers 
} from 'lucide-react';
import { sysSynth } from '../utils/audio';

export default function EducationView() {
  const handleDegreeClick = (degreeName: string) => {
    sysSynth.playBeep(480, 0.05, 'sine');
  };

  return (
    <div id="education-timeline-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left Column: Academic Degrees Timeline (7 Columns) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <GraduationCap className="w-4 h-4 text-[#ccff00]" />
          <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase font-bold">
            ACADEMIC DEGREES TIMELINE
          </h2>
        </div>

        <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
          
          {/* BSc Degree card */}
          <div 
            onClick={() => handleDegreeClick('BSc IT')}
            className="relative pl-10 group cursor-pointer"
          >
            <div className="absolute left-[10px] top-1.5 w-[15px] h-[15px] rounded-full bg-[#050505] border-2 border-[#ccff00] flex items-center justify-center group-hover:border-[#ccff00] group-hover:scale-110 transition-transform z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-ob from-white/[0.02] to-black/30 border border-white/5 hover:border-[#ccff00]/15 transition-all space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-[#ccff00] bg-[#ccff00]/5 border border-[#ccff00]/10 px-1.5 py-0.5 rounded font-bold uppercase transition-all duration-300">
                    2023 – 2026 // GRADUATE
                  </span>
                  <h3 className="text-sm font-headline font-black text-white group-hover:text-[#ccff00] transition-colors uppercase tracking-tight mt-1.5">
                    Bachelor of Information Technology (B.Sc. IT)
                  </h3>
                  <p className="text-xs text-white/60 font-sans font-light">
                    Seth L U J College of Arts & Sir M V College of Science and Commerce
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 mt-1">
                    <span>📍 Mumbai</span>
                    <span>•</span>
                    <span className="text-[#ccff00] font-bold">CGPI: 8.92 / 10</span>
                  </div>
                </div>

                <span className="text-[8px] font-mono text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  Graduated
                </span>
              </div>

              {/* Performance Timeline table */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <h4 className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest">
                  Academic Performance index
                </h4>
                <div className="overflow-hidden border border-white/5 rounded-xl bg-black/40">
                  <table className="w-full text-left font-mono text-xs text-white/80 border-collapse">
                    <thead>
                      <tr className="bg-white/5 text-[9px] text-zinc-500 uppercase border-b border-white/5">
                        <th className="py-2 px-3 font-semibold">Semester</th>
                        <th className="py-2 px-3 font-semibold text-right">SGPI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { sem: 'Semester I', sgpi: '8.40' },
                        { sem: 'Semester II', sgpi: '9.10' },
                        { sem: 'Semester III', sgpi: '8.80' },
                        { sem: 'Semester IV', sgpi: '9.30' },
                        { sem: 'Semester V', sgpi: '8.90' },
                        { sem: 'Semester VI', sgpi: '8.90' }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-1.5 px-3 text-zinc-300">{row.sem}</td>
                          <td className="py-1.5 px-3 text-right text-purple-400 font-bold">{row.sgpi}</td>
                        </tr>
                      ))}
                      <tr className="bg-[#ccff00]/5 font-bold text-[#ccff00]">
                        <td className="py-2 px-3">CGPI Cumulative</td>
                        <td className="py-2 px-3 text-right">8.92</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* HSC card */}
          <div 
            onClick={() => handleDegreeClick('HSC')}
            className="relative pl-10 group cursor-pointer"
          >
            <div className="absolute left-[10px] top-1.5 w-[15px] h-[15px] rounded-full bg-[#050505] border-2 border-white/20 flex items-center justify-center group-hover:border-purple-400 group-hover:scale-110 transition-transform z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.02] to-black/30 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                    2021 – 2023 // HSC BOARDS
                  </span>
                  <h3 className="text-sm font-headline font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight mt-1.5">
                    Higher Secondary Certificate (HSC)
                  </h3>
                  <p className="text-xs text-white/60 font-sans font-light">
                    Mithibai College
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 mt-1">
                    <span>📍 Mumbai</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-zinc-500 block uppercase">SCORE</span>
                  <span className="text-xs font-mono font-black text-white bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                    54.17%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SSC card */}
          <div 
            onClick={() => handleDegreeClick('SSC')}
            className="relative pl-10 group cursor-pointer"
          >
            <div className="absolute left-[10px] top-1.5 w-[15px] h-[15px] rounded-full bg-[#050505] border-2 border-white/20 flex items-center justify-center group-hover:border-purple-400 group-hover:scale-110 transition-transform z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.02] to-black/30 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                    2009 – 2021 // SSC BOARDS
                  </span>
                  <h3 className="text-sm font-headline font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight mt-1.5">
                    Secondary School Certificate (SSC)
                  </h3>
                  <p className="text-xs text-white/60 font-sans font-light">
                    St Agnes English High School
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 mt-1">
                    <span>📍 Mumbai</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-zinc-500 block uppercase">SCORE</span>
                  <span className="text-xs font-mono font-black text-[#ccff00] bg-[#ccff00]/5 border border-[#ccff00]/10 px-1.5 py-0.5 rounded">
                    90.40%
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Column: Academic Focus & Core Subjects Matrix (5 Columns) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <Layers className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase font-bold">
            ACADEMIC SPECIALIZATIONS
          </h2>
        </div>

        {/* Course subjects card */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#120524]/20 to-black/80 border border-purple-500/10 hover:border-purple-500/30 transition-all space-y-4">
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest font-black block">Core Curriculum Matrix</span>
            <h3 className="text-sm font-headline font-black text-white uppercase tracking-tight">Key Subjects Studied</h3>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Software Engineering & Testing', desc: 'System development life cycle, verification, and automated validation frameworks.' },
              { name: 'Web & Mobile Application Architectures', desc: 'Advanced frontend design principles, viewport-responsive standards, and API structures.' },
              { name: 'Database Management Systems (RDBMS)', desc: 'Relational logic models under SQL standardizations, normalization pipelines.' },
              { name: 'Computer Networks & Internet of Things', desc: 'Hardware-level networking protocols, telemetry collection systems, and node communications.' },
              { name: 'Applied Artificial Intelligence', desc: 'Deep learning introduction, algorithmic intelligence architectures, and variable optimizations.' }
            ].map((subject, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/20 transition-all space-y-1 group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] group-hover:bg-purple-500 transition-colors" />
                  <span className="text-xs font-semibold text-white/95 group-hover:text-[#ccff00] transition-colors">{subject.name}</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal pl-3.5 font-light font-sans">{subject.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[8px] font-mono text-zinc-600 uppercase tracking-widest text-center">
            BSCIT_SYLLABUS_INDEX::VER_1.43
          </div>
        </div>

        {/* Quick Academic Stat block */}
        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[8px] font-mono text-zinc-500 uppercase">CUMULATIVE SCORE</span>
            <div className="text-[#ccff00] font-headline font-black text-lg">8.92 / 10 CGPI</div>
          </div>
          <CheckCircle className="w-6 h-6 text-emerald-400 ml-4 shrink-0" />
        </div>
      </div>

    </div>
  );
}
