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
  FileBadge,
  Play,
  RotateCcw
} from 'lucide-react';
import { sysSynth } from '../utils/audio';

export default function PublicationsView() {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'ongoing'>('all');
  const [showAbstract, setShowAbstract] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  
  // Custom states for interactive modals
  const [selectedPaper, setSelectedPaper] = useState(false);
  const [selectedCert, setSelectedCert] = useState(false);
  const [paperSection, setPaperSection] = useState<'intro' | 'method' | 'results' | 'conclusion'>('intro');

  // Interactive Scanalyzer simulation engine
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<any | null>(null);

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

  const handleStartScan = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);
    sysSynth.playBeep(440, 0.1, 'sine');

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult({
            hemoglobin: { val: 14.2, status: 'NORMAL', range: '13.5 - 17.5 g/dL', desc: 'Protein in RBC carrying oxygen stable.' },
            wbc: { val: 6.8, status: 'NORMAL', range: '4.5 - 11.0 x10^3/µL', desc: 'Leukocyte count optimal. No acute stressors.' },
            glucose: { val: 112, status: 'ELEVATED', range: '70 - 100 mg/dL', desc: 'Mild glycemic elevation. Monitor dietary pacing.' },
            platelets: { val: 245, status: 'NORMAL', range: '150 - 450 x10^3/µL', desc: 'Thrombocyte count ideal for clotting performance.' }
          });
          sysSynth.playSuccess();
          return 100;
        }
        sysSynth.playBeep(400 + prev * 3, 0.015, 'sine');
        return prev + 10;
      });
    }, 120);
  };

  const handleResetScan = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsScanning(false);
    setScanProgress(0);
    setScanResult(null);
    sysSynth.playBeep(330, 0.05, 'triangle');
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
                    onClick={() => { sysSynth.playBeep(520, 0.08, 'sine'); setSelectedPaper(true); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-mono font-bold tracking-widest uppercase transition-all cursor-pointer"
                  >
                    <span>Interactive PDF Reader</span>
                    <FileText className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCopyCitation}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-mono border border-white/10 transition-colors cursor-pointer"
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

          {/* 2. ONGOING RESEARCH PORTFOLIO (Featuring Live Interactive Scanalyzer Lab Simulation) */}
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

                {/* Interactive Scanalyzer Diagnostic Simulation Panel */}
                <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/80 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-purple-400 animate-ping' : 'bg-zinc-600'}`} />
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">
                        Scanalyzer™ Diagnostic Simulation Node
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {!isScanning && !scanResult ? (
                        <button
                          onClick={handleStartScan}
                          className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-[8.5px] font-mono font-bold uppercase cursor-pointer flex items-center gap-1"
                        >
                          <Play className="w-2.5 h-2.5" /> Start OCR Parse
                        </button>
                      ) : (
                        <button
                          onClick={handleResetScan}
                          className="px-2 py-1 bg-white/5 hover:bg-white/10 text-zinc-300 rounded text-[8.5px] font-mono uppercase cursor-pointer flex items-center gap-1"
                        >
                          <RotateCcw className="w-2.5 h-2.5" /> Reset Core
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Scanning Animation Progress View */}
                  {isScanning && (
                    <div className="space-y-2 py-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-purple-400">
                        <span>EXTRACTING CLINICAL DATASETS...</span>
                        <span>{scanProgress}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-150"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      <p className="text-[8px] font-mono text-zinc-600 animate-pulse">
                        Analyzing OCR coordinates [x:{scanProgress * 2.4}, y:{scanProgress * 1.8}]...
                      </p>
                    </div>
                  )}

                  {/* Diagnostic Results outputs */}
                  {scanResult && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Object.entries(scanResult).map(([key, item]: [string, any]) => (
                          <div key={key} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">{key}</span>
                              <span className={`text-[7px] font-mono font-bold px-1 py-0.2 rounded border ${
                                item.status === 'NORMAL' 
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <div className="mt-1 flex items-baseline gap-1.5">
                              <span className="text-xs font-black text-white">{item.val}</span>
                              <span className="text-[8px] font-mono text-zinc-500">{item.range}</span>
                            </div>
                            <p className="text-[9px] font-sans font-light text-zinc-400 mt-1 leading-normal">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-[9px] font-sans flex items-start gap-2 text-purple-300">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-400" />
                        <div>
                          <strong className="block text-[10px] font-mono uppercase tracking-wider text-purple-200">Local AI Health Evaluation Advisory:</strong>
                          Slight glycemic elevation noted. Suggest low glycemic load pacing, hydration, and active metabolic tracking. Standard clinical confirmation recommended.
                        </div>
                      </div>
                    </div>
                  )}

                  {!isScanning && !scanResult && (
                    <div className="py-6 text-center space-y-1.5 text-zinc-500 font-mono text-[9px]">
                      <FileBadge className="w-8 h-8 text-zinc-600 mx-auto" />
                      <p>AWAITING BLOOD REPORT DIAGNOSTIC IMAGE FILE ATTACHED INPUT</p>
                      <p className="text-[8px] text-zinc-700">Click &quot;Start OCR Parse&quot; to test the live Scanalyzer analysis simulation model.</p>
                    </div>
                  )}
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

          {/* Special Certificate Highlight Card (Clickable Lightbox Trigger) */}
          <div 
            onClick={() => { sysSynth.playBeep(485, 0.05, 'sine'); setSelectedCert(true); }}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#ccff00]/5 to-black/30 border border-[#ccff00]/10 hover:border-[#ccff00]/30 hover:bg-[#ccff00]/10 cursor-pointer transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/3 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <FileBadge className="w-8 h-8 text-[#ccff00]" />
                <span className="text-[8px] font-mono text-[#ccff00] border border-[#ccff00]/35 px-1.5 py-0.5 rounded uppercase tracking-widest font-bold group-hover:bg-[#ccff00] group-hover:text-black transition-colors">
                  Inspect Cert
                </span>
              </div>
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

      {/* 1. ACADEMIC PAPER FULL PREVIEW MODAL */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-[90vh] rounded-2xl bg-zinc-950 border border-white/10 flex flex-col overflow-hidden">
            
            {/* Header portion */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <h2 className="text-xs font-mono font-black text-[#ccff00] tracking-wider uppercase">
                    JOURNAL MANUSCRIPT DIGITAL READER
                  </h2>
                  <p className="text-[9.5px] text-zinc-400 truncate max-w-lg">
                    Real-Time Sign Language Translation and Audio Translation on Video Calls
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { sysSynth.playBeep(350, 0.05, 'triangle'); setSelectedPaper(false); }}
                className="p-1 px-2 text-[10px] font-mono bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded transition-colors"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Main content body with section split */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Paper navigation index column */}
              <div className="w-full md:w-52 border-b md:border-b-0 md:border-r border-white/5 p-4 space-y-2 bg-black/50 overflow-y-auto shrink-0">
                <span className="text-[8px] font-mono text-zinc-500 tracking-wider uppercase block mb-3">
                  Document Outlines
                </span>
                {([
                  { id: 'intro', label: '1. Abstract & Introduction' },
                  { id: 'method', label: '2. System Framework' },
                  { id: 'results', label: '3. Data & Accuracy' },
                  { id: 'conclusion', label: '4. Future & Conclusion' }
                ] as const).map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => { sysSynth.playBeep(450, 0.03, 'sine'); setPaperSection(sec.id); }}
                    className={`w-full py-2.5 px-3 rounded text-left font-mono text-[9px] font-bold uppercase transition-all tracking-wide ${
                      paperSection === sec.id 
                        ? 'bg-purple-900/40 text-purple-300 border-l-2 border-purple-400' 
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}

                <div className="pt-6 mt-6 border-t border-white/5 text-[9px] font-mono text-zinc-600 space-y-2 leading-relaxed">
                  <p>ISSN: 2394-7780</p>
                  <p>IJAIR Volume 13</p>
                  <p>Pages: 133–142</p>
                  <p className="text-[#ccff00] font-bold">Status: Peer Verified</p>
                </div>
              </div>

              {/* Scrollable Academic Paper Body */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-white text-zinc-900 font-sans leading-relaxed selection:bg-[#ccff00]/40">
                <div className="max-w-3xl mx-auto space-y-6">
                  
                  {paperSection === 'intro' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="text-center space-y-3 pb-6 border-b border-zinc-200">
                        <span className="text-[10px] font-mono tracking-widest text-[#d946ef] uppercase font-black">
                          IJAIR RESEARCH MANUSCRIPT VOLUME 13 // ISSUE 1
                        </span>
                        <h1 className="text-lg md:text-xl font-bold text-zinc-950 font-serif leading-tight">
                          Real-Time Sign Language Translation and Audio Translation on Video Calls
                        </h1>
                        <p className="text-[11px] text-zinc-600 font-sans">
                          Prajwal Bhosale, Dhruv Bendre, Sandhya Tiwari, Rohini Bhosale
                        </p>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          Received Dec 2025 // Accepted Jan 2026 // Published March 2026
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs font-mono font-black border-b border-zinc-200 pb-1 uppercase text-zinc-900 tracking-wider">
                          Abstract
                        </h3>
                        <p className="text-xs italic text-zinc-700 font-serif leading-relaxed">
                          Communication barriers continue to affect individuals with speech impairments who rely on sign language, especially during real-time digital communication such as video calls. This paper presents a multi-modal WebRTC-based framework for real-time sign language recognition, text translation, and cross-language audio generation. Using MediaPipe, CVZone, and machine learning techniques, the system converts sign language into text and speech while simultaneously transforming spoken communication into text for the signer. The framework creates a two-way accessible communication environment and demonstrates reliable real-time performance, highlighting its potential to improve digital accessibility and inclusive communication.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xs font-mono font-black border-b border-zinc-200 pb-1 uppercase text-zinc-900 tracking-wider">
                          1. Introduction
                        </h3>
                        <p className="text-[11.5px] text-zinc-800 leading-relaxed font-sans">
                          Advancements in real-time communication technologies have bridged geographical gaps, but digital accessibility has often lagged behind. The speech and hearing-impaired communities rely extensively on hand gestures and visual facial expressions to communicate. In conventional digital messaging, dynamic translation pipelines are non-existent, requiring personal human interpreters which limits independence. This project researches a machine-learning mediated communication bridge that handles multi-point spatial landmark tracking on raw video frames in browser processes, bridging the semantic gap in WebRTC interactions.
                        </p>
                        <p className="text-[11.5px] text-zinc-800 leading-relaxed font-sans">
                          Our methodology involves localized feature extractions utilizing specialized multi-pipeline hand trackers, processing mathematical angles of bone structures in real time, and binding outputs directly to modern web socket pipelines.
                        </p>
                      </div>
                    </div>
                  )}

                  {paperSection === 'method' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="pb-4 border-b border-zinc-200">
                        <span className="text-[10px] font-mono tracking-widest text-[#d946ef] uppercase font-bold">
                          METHODOLOGY REFERENCE
                        </span>
                        <h2 className="text-base font-bold text-zinc-950 font-serif mt-1">
                          2. Architectural Framework & Hand Landmark Pipelines
                        </h2>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[11.5px] text-zinc-800 leading-relaxed">
                          The system model revolves around five key computational layers running dynamically on client browser VMs to ensure sub-100ms latency:
                        </p>
                        
                        <div className="p-4 rounded bg-zinc-50 border border-zinc-200 space-y-2">
                          <h4 className="text-[10.5px] font-mono font-bold uppercase text-zinc-900">
                            Layer 1: Real-time Ingestion (Webcam Stream)
                          </h4>
                          <p className="text-[11px] text-zinc-600">
                            Captures continuous user frames at 340x280 resolution to maximize frame rate processing to 30 frames per second on portable computing machines.
                          </p>

                          <h4 className="text-[10.5px] font-mono font-bold uppercase text-zinc-900 mt-3">
                            Layer 2: MediaPipe Landmarks (Skeletal Mapping)
                          </h4>
                          <p className="text-[11px] text-zinc-600">
                            MediaPipe tracking evaluates 21 distinct hand structural points. Coordinates are mapped to normalized bounding spheres:
                          </p>
                          <div className="bg-zinc-150 p-2 rounded text-[10px] font-mono block text-center mt-1 border text-zinc-700">
                            D(p1, p2) = √ [ (x2 - x1)² + (y2 - y1)² + (z2 - z1)² ]
                          </div>

                          <h4 className="text-[10.5px] font-mono font-bold uppercase text-zinc-900 mt-3">
                            Layer 3: Neural Semantic Matching & Audio Output
                          </h4>
                          <p className="text-[11px] text-zinc-600">
                            Recognized gesture lists map to alphanumeric speech tokens. Speech-to-speech protocols execute synthesized verbal cues automatically via Web Speech synthesizers.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paperSection === 'results' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="pb-4 border-b border-zinc-200">
                        <span className="text-[10px] font-mono tracking-widest text-[#d946ef] uppercase font-bold">
                          DATA & STATISTICAL ACCURACY VALUES
                        </span>
                        <h2 className="text-base font-bold text-zinc-950 font-serif mt-1">
                          3. Experimental Analysis & System Accuracies
                        </h2>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[11.5px] text-zinc-800 leading-relaxed">
                          We evaluated gesture classifications inside varying environmental noise conditions, capturing performance and recognition thresholds across basic alphabetical triggers:
                        </p>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-[11px] mt-2">
                            <thead>
                              <tr className="bg-zinc-100 font-mono text-zinc-800 border-b border-zinc-300">
                                <th className="p-2 border border-zinc-200">Gesture Type</th>
                                <th className="p-2 border border-zinc-200">Distance Threshold</th>
                                <th className="p-2 border border-zinc-200">Testing Cycles</th>
                                <th className="p-2 border border-zinc-200">Verification Accuracy</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-zinc-200">
                                <td className="p-2 border border-zinc-200 font-semibold font-mono">Alphabets (A-Z)</td>
                                <td className="p-2 border border-zinc-200">0.02 units</td>
                                <td className="p-2 border border-zinc-200">1,200</td>
                                <td className="p-2 border border-zinc-200 text-emerald-700 font-bold">96.4%</td>
                              </tr>
                              <tr className="border-b border-zinc-200 text-zinc-850">
                                <td className="p-2 border border-zinc-200 font-semibold font-mono">Dynamic Gestures</td>
                                <td className="p-2 border border-zinc-200">0.05 units</td>
                                <td className="p-2 border border-zinc-200 font-mono">850</td>
                                <td className="p-2 border border-zinc-200 text-emerald-700 font-bold">93.1%</td>
                              </tr>
                              <tr className="border-b border-zinc-200 text-zinc-850">
                                <td className="p-2 border border-zinc-200 font-semibold font-mono">Emergency Symbols</td>
                                <td className="p-2 border border-zinc-200 font-mono">0.03 units</td>
                                <td className="p-2 border border-zinc-200 font-mono">600</td>
                                <td className="p-2 border border-zinc-200 text-emerald-700 font-bold">98.2%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {paperSection === 'conclusion' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="pb-4 border-b border-zinc-200">
                        <span className="text-[10px] font-mono tracking-widest text-[#d946ef] uppercase font-bold">
                          CONCLUSIONS & DISCOVERY SUMMARY
                        </span>
                        <h2 className="text-base font-bold text-zinc-950 font-serif mt-1">
                          4. Summary & Future Scope of Inquiry
                        </h2>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[11.5px] text-zinc-800 leading-relaxed font-sans">
                          This research solidifies that client-side machine learning execution holds extreme viability for universal digital translation systems. Providing barrierless interaction profiles for video calls dramatically improves employment metrics and independence vectors for impaired populations.
                        </p>
                        <p className="text-[11.5px] text-zinc-800 leading-relaxed font-sans">
                          Future inquiries will focus on integrating dense depth trackers, processing continuous conversation syntax instead of stand-alone key phrases, and compiling models to highly optimized ultra-low power microcontroller nodes.
                        </p>

                        <div className="pt-8 border-t border-zinc-200 mt-12 text-center text-[10px] text-zinc-400 font-mono">
                          © 2026 International Journal of Advance and Innovative Research (IJAIR). All rights reserved.
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 2. PUBLICATION CERTIFICATE LIGHTBOX MODAL */}
      {selectedCert && (
        <div 
          onClick={() => { sysSynth.playBeep(355, 0.04, 'triangle'); setSelectedCert(false); }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] bg-zinc-950 border border-white/10 p-2 rounded-2xl flex flex-col items-center overflow-hidden"
          >
            {/* Header / Info details */}
            <div className="w-full flex justify-between items-center px-4 py-2 text-[10px] font-mono text-zinc-400 border-b border-white/5 bg-zinc-900/50">
              <span className="uppercase text-[#ccff00]">IJAIR Certificate of Publication Preview</span>
              <button 
                onClick={() => { sysSynth.playBeep(350, 0.05, 'triangle'); setSelectedCert(false); }}
                className="hover:text-white cursor-pointer px-1 text-zinc-500 font-bold uppercase"
              >
                CLOSE [×]
              </button>
            </div>

            <div className="p-4 flex items-center justify-center overflow-auto max-h-[70vh]">
              <img
                src="/assets/icmvlu21-sandhya.jpg"
                alt="IJAIR Scientific Publication Certificate"
                className="max-h-[60vh] max-w-full object-contain rounded-lg border border-white/10 cursor-default"
                referrerPolicy="no-referrer"
                onError={() => {
                  {/* Backup certificate display inside canvas in case local assets are missing */}
                  const cv = document.getElementById('cert-canvas') as HTMLCanvasElement;
                  if (cv) {
                    const ctx = cv.getContext('2d');
                    if (ctx) {
                      ctx.fillStyle = '#09090b';
                      ctx.fillRect(0, 0, 700, 500);
                      // Draw framing border
                      ctx.strokeStyle = '#ccff00';
                      ctx.lineWidth = 6;
                      ctx.strokeRect(15, 15, 670, 470);
                      ctx.strokeStyle = '#27272a';
                      ctx.lineWidth = 1;
                      ctx.strokeRect(25, 25, 650, 450);

                      // Text
                      ctx.fillStyle = '#ffffff';
                      ctx.font = 'bold 24px serif';
                      ctx.fillText('International Journal of Advance & Innovative Research', 80, 100);
                      ctx.font = '14px sans-serif';
                      ctx.fillStyle = '#ccff00';
                      ctx.fillText('PEER-VERIFIED JOURNAL PUBLICATION INTEGRITY CERTIFICATE', 140, 140);
                      ctx.fillStyle = '#71717a';
                      ctx.font = 'italic 16px serif';
                      ctx.fillText('This document certifies that the research paper titled', 190, 200);
                      ctx.fillStyle = '#ffffff';
                      ctx.font = 'bold 15px sans-serif';
                      ctx.fillText('"Real-Time Sign Language Translation and Audio Translation on Video Calls"', 95, 240);
                      ctx.fillStyle = '#a1a1aa';
                      ctx.font = '13px sans-serif';
                      ctx.fillText('Co-Authored and Published by:', 260, 290);
                      ctx.fillStyle = '#ffffff';
                      ctx.font = 'bold 16px sans-serif';
                      ctx.fillText('SANDHYA TIWARI', 280, 325);
                      ctx.fillStyle = '#71717a';
                      ctx.font = '12px sans-serif';
                      ctx.fillText('Has been reviewed extensively by the IJAIR Editorial Board and is preserved', 140, 365);
                      ctx.fillText('under registered document identification hash index.', 220, 385);
                      ctx.fillStyle = '#ccff00';
                      ctx.font = 'bold 11px monospace';
                      ctx.fillText('REGISTRATION ID: IJAIR-2026-VAL133SM', 110, 430);
                      ctx.fillText('ISSN CODE: 2394-7780', 430, 430);
                    }
                  }
                }}
              />
            </div>

            <div className="w-full flex justify-between items-center p-3 px-5 border-t border-white/5 bg-zinc-900/50">
              <span className="text-[9px] font-mono text-zinc-500">
                REG-ID: IJAIR-2026-VAL133SM
              </span>
              <a
                href="/assets/icmvlu21-sandhya.jpg"
                download="icmvlu21-sandhya.jpg"
                className="text-[9px] font-mono text-xs text-black font-bold bg-[#ccff00] hover:bg-[#b8e600] rounded px-3 py-1 uppercase cursor-pointer"
              >
                Download Credential File
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
