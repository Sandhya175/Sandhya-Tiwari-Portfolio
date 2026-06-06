import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  User, 
  ExternalLink, 
  Layers, 
  Search, 
  Clock, 
  ArrowUpRight, 
  Activity, 
  FileText,
  Bookmark,
  Share2,
  CheckCircle,
  Copy,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Sparkles,
  FileBadge
} from 'lucide-react';
import { sysSynth } from '../utils/audio';

export default function PublicationsView() {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'ongoing'>('all');
  const [showAbstract, setShowAbstract] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  const citationText = 'Bhosale, P., Bendre, D., Tiwari, S., & Bhosale, R. (2026). Real-Time Sign Language Translation and Audio Translation on Video Calls. International Journal of Advance and Innovative Research (IJAIR), 13(1), 133-142. https://doi.org/10.5281/zenodo.20352667';

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    sysSynth.playBeep(600, 0.08, 'sine');
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleToggleAbstract = () => {
    sysSynth.playBeep(showAbstract ? 400 : 500, 0.05, 'triangle');
    setShowAbstract(!showAbstract);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header (Consistent with Section 04 Design) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-black/80 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-[#ccff00]/10 to-transparent blur-2xl pointer-events-none" />
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20 uppercase">
              Section 05 // Scientific Inquiries
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Peer-Reviewed & Pending</span>
          </div>
          <h1 className="text-xl md:text-2xl font-headline font-black text-white uppercase tracking-tight">
            RESEARCH & PUBLICATIONS
          </h1>
          <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
            An index showcasing published contributions to international literature as well as active laboratory investigations. These projects emphasize digital accessibility frameworks and healthcare diagnostic automation.
          </p>
        </div>
      </div>

      {/* Tabs Filter Controls */}
      <div className="flex border-b border-white/5 pb-2 gap-2">
        {(['all', 'published', 'ongoing'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              sysSynth.playBeep(450, 0.04, 'sine');
              setActiveTab(tab);
            }}
            className={`px-4 py-2 font-mono text-[10px] font-bold tracking-widest uppercase rounded-lg border transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/30 shadow-glow-lime/5'
                : 'bg-white/[0.01] text-zinc-400 border-white/5 hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            {tab === 'all' ? 'All Works' : tab === 'published' ? 'Published Research' : 'Ongoing Research'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left/Main Column: Research Portfolios */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* 1. PUBLISHED RESEARCH NODE */}
          {(activeTab === 'all' || activeTab === 'published') && (
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-black/90 border border-white/10 hover:border-[#ccff00]/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ccff00]/5 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-mono text-[#ccff00] font-bold px-2 py-0.5 rounded bg-[#ccff00]/10 border border-[#ccff00]/20 uppercase tracking-widest">
                      <Award className="w-3 h-3" /> Peer-Reviewed Journal
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">January – March 2026</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-widest">
                    Published
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-headline font-black text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors leading-snug">
                    Real-Time Sign Language Translation and Audio Translation on Video Calls
                  </h3>
                  <p className="text-xs text-white/80 font-mono font-medium">
                    Published in: <span className="text-zinc-300 italic">International Journal of Advance and Innovative Research (IJAIR)</span>
                  </p>
                </div>

                {/* Metadata Meta details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5 text-[11px] font-mono">
                  <div className="space-y-2">
                    <div className="text-zinc-500">
                      AUTHORS / CREATORS
                      <span className="block font-sans font-bold text-white/90 mt-0.5">
                        Prajwal Bhosale, Dhruv Bendre, Sandhya Tiwari, Rohini Bhosale
                      </span>
                    </div>
                    <div className="text-zinc-500">
                      JOURNAL META
                      <span className="block text-zinc-300 mt-0.5 text-[10px]">
                        Volume 13, Issue 1 (XIII) • January - March 2026
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-zinc-500">
                      INDEXING IDENTIFIER
                      <span className="block text-[#ccff00] font-bold mt-0.5 select-all">
                        ISSN: 2394-7780
                      </span>
                    </div>
                    <div className="text-zinc-500">
                      PAGES RANGE
                      <span className="block text-zinc-300 mt-0.5">
                        Pages 133–142
                      </span>
                    </div>
                  </div>
                </div>

                {/* Abstract Preview Drawer */}
                <div className="border border-white/5 rounded-xl overflow-hidden bg-black/40">
                  <button
                    onClick={handleToggleAbstract}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.01] text-[10px] font-mono font-bold tracking-widest text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>{showAbstract ? 'HIDE ABSTRACT SYNOPSIS' : 'EXPAND ABSTRACT SYNOPSIS'}</span>
                    {showAbstract ? <ChevronUp className="w-3.5 h-3.5 text-[#ccff00]" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />}
                  </button>

                  {showAbstract && (
                    <div className="px-4 py-3.5 border-t border-white/5 text-[11px] font-sans font-light leading-relaxed text-white/70 bg-black/60 animate-in fade-in duration-200">
                      Communication barriers continue to affect individuals with speech impairments who rely on sign language, especially during real-time digital communication such as video calls. This paper presents a multi-modal WebRTC-based framework for real-time sign language recognition, text translation, and cross-language audio generation. Using MediaPipe, CVZone, and machine learning techniques, the system converts sign language into text and speech while simultaneously transforming spoken communication into text for the signer. The framework creates a two-way accessible communication environment and demonstrates reliable real-time performance, highlighting its potential to improve digital accessibility and inclusive communication.
                    </div>
                  )}
                </div>

                {/* External Action protocols */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://doi.org/10.5281/zenodo.20352667"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ccff00] hover:bg-lime-400 text-black rounded-lg text-[10px] font-mono font-bold tracking-widest uppercase transition-all"
                  >
                    <span>DOI Redirect</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={handleCopyCitation}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-mono border border-white/10 transition-colors"
                  >
                    {copiedCitation ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-[#ccff00]" />
                        <span className="text-[#ccff00] font-bold">Citation Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>
                  
                  <span className="flex items-center gap-1 px-3 py-1.5 text-[9px] font-mono text-zinc-500">
                    <FileText className="w-3 h-3" />
                    IJAIR Vol. 13 Issued
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. ONGOING RESEARCH PORTFOLIO */}
          {(activeTab === 'all' || activeTab === 'ongoing') && (
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-black/90 border border-white/10 hover:border-purple-500/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-mono text-purple-400 font-bold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 uppercase tracking-widest">
                      <FlaskConical className="w-3 h-3" /> Lab Investigation
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">Current Phase</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-bold uppercase tracking-widest animate-pulse">
                    🚧 Research In Progress
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-headline font-black text-white uppercase tracking-tight group-hover:text-purple-400 transition-colors leading-snug">
                    Scanalyzer: AI-Based Health Report Analyzer
                  </h3>
                  <p className="text-xs text-white/80 font-mono">
                    Investigative Scope: <span className="text-zinc-300 italic font-sans font-light">Translating raw pathological outcomes into accessible clinical recommendations using Large Language Models.</span>
                  </p>
                </div>

                {/* Focus Areas Bento Grid inside panel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5 text-[11px] font-mono">
                  <div className="space-y-2">
                    <div className="text-zinc-500 uppercase tracking-widest">
                      Focus Areas
                      <div className="flex flex-wrap gap-1 md:gap-1.5 mt-1.5">
                        {['Medical Report Analysis', 'AI-assisted Healthcare', 'Blood Test Interpretation', 'Personalized Health Recommendations'].map((item, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/10 text-white/95 text-[9px] rounded px-1.5 py-0.5">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-zinc-500 uppercase tracking-widest">
                      Current Stage
                      <div className="flex flex-wrap gap-1 md:gap-1.5 mt-1.5">
                        {['Prototype Development', 'Dataset Research', 'Model Evaluation'].map((item, idx) => (
                          <span key={idx} className="bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[9px] rounded px-1.5 py-0.5 font-bold">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expected Outcome */}
                <div className="p-3.5 rounded-lg border border-white/5 bg-black/40 text-[11px] font-mono space-y-1">
                  <div className="text-zinc-500 uppercase tracking-wider text-[9px]">EXPECTED OUTCOME</div>
                  <div className="text-zinc-300 font-sans font-light">
                    🎯 Peer-reviewed paper submission to top-tier healthcare journals and a production-grade Healthcare AI client framework.
                  </div>
                </div>

                {/* Status line */}
                <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-yellow-500 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>MODELING MATRIX OPERATIONAL // ONGOING WORKSHOP SERIES</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Key Academic Standing Metrics & Certificate Promo */}
        <div className="xl:col-span-4 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Sparkles className="w-4 h-4 text-[#ccff00]" />
            <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
              Scientific Merit Highlight
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.02] to-black/30 border border-white/5 space-y-4">
            <h3 className="text-xs font-mono text-[#ccff00] font-bold tracking-widest uppercase">
              WHY RESEARCH MATTERS
            </h3>
            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed font-light">
              Undertaking formal scientific dissemination demonstrates meticulous attention to engineering methodology, robust testing protocols, and rigorous system evaluations.
            </p>
            
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                <span className="text-zinc-500">PEER-REVIEWED PAPERS</span>
                <span className="text-white font-bold font-sans">1 Published</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                <span className="text-zinc-500">ACTIVE LAB STUDIES</span>
                <span className="text-white font-bold font-sans">1 In Progress</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                <span className="text-zinc-500">COMPETITION RANKINGS</span>
                <span className="text-[#ccff00] font-bold font-sans">Avishkar Winner</span>
              </div>
            </div>
          </div>

          {/* Special Certificate Highlight Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#ccff00]/5 to-black/30 border border-[#ccff00]/10 hover:border-[#ccff00]/30 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/3 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="space-y-3">
              <FileBadge className="w-8 h-8 text-[#ccff00]" />
              <h4 className="text-xs font-headline font-black text-white uppercase tracking-tight">
                Certificate of Publication
              </h4>
              <p className="text-[10px] text-zinc-400 leading-relaxed font-sans font-light">
                Awarded by the <span className="text-white/80">International Journal of Advance and Innovative Research (IJAIR)</span> in recognition of the peer-approved publication.
              </p>
              
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 text-[9px] font-mono text-[#ccff00] font-bold select-all truncate">
                REG-ID: IJAIR-2026-VAL133SM
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
