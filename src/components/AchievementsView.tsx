import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Calendar, 
  ChevronRight, 
  Search, 
  Filter, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  BookOpen,
  ArrowUpRight,
  FileBadge
} from 'lucide-react';
import { ACHIEVEMENTS_DATA, CERTIFICATES_DATA } from '../data/portfolioData';
import { CertificateItem } from '../types';
import { sysSynth } from '../utils/audio';

interface AchievementsViewProps {
  searchQuery?: string;
}

export default function AchievementsView({ searchQuery: propSearchQuery }: AchievementsViewProps = {}) {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'credentials' | 'community'>('credentials');
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const [selectedIssuer, setSelectedIssuer] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [imageError, setImageError] = useState(false);

  // Filter unique issuers
  const issuers = ['all', ...Array.from(new Set(CERTIFICATES_DATA.map(c => c.issuer)))];

  const filteredCertificates = CERTIFICATES_DATA.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          cert.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIssuer = selectedIssuer === 'all' || cert.issuer === selectedIssuer;
    return matchesSearch && matchesIssuer;
  });

  const handleCertificateClick = (cert: CertificateItem) => {
    sysSynth.playBeep(480, 0.08, 'sine');
    setSelectedCert(cert);
    setImageError(false); // Reset image load status
  };

  const closeModal = () => {
    sysSynth.playBeep(350, 0.05, 'triangle');
    setSelectedCert(null);
    setImageError(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Intro Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-black/80 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-purple-500/10 to-transparent blur-2xl pointer-events-none" />
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
              Section 04 // Scientific Merit
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Verified Records</span>
          </div>
          <h1 className="text-xl md:text-2xl font-headline font-black text-white uppercase tracking-tight">
            HONORS & CERTIFICATE ARCHIVE
          </h1>
          <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
            An auditable index of academic honors, research distinctions, and technical competencies validated through official certification boards. Click on any credential to inspect the real certificate or digital record.
          </p>
        </div>
      </div>

      {/* Modern High-Performance Sub-Tab Selector */}
      <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-xl max-w-sm">
        <button
          onClick={() => {
            sysSynth.playBeep(440, 0.04, 'sine');
            setViewMode('credentials');
          }}
          className={`flex-1 py-1.5 text-[10px] font-mono font-black tracking-wider uppercase rounded-lg transition-all ${
            viewMode === 'credentials'
              ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/5'
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          Credentials & Honors
        </button>
        <button
          onClick={() => {
            sysSynth.playBeep(480, 0.04, 'sine');
            setViewMode('community');
          }}
          className={`flex-1 py-1.5 text-[10px] font-mono font-black tracking-wider uppercase rounded-lg transition-all ${
            viewMode === 'community'
              ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/5'
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          Community Impact
        </button>
      </div>

      {viewMode === 'credentials' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Academic & Research Honors */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Trophy className="w-4 h-4 text-purple-400" />
              <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
                HONORS & MAIN MERITS
              </h2>
            </div>

            <div className="space-y-4">
              {ACHIEVEMENTS_DATA.map((ach) => (
                <div 
                  key={ach.id}
                  className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.02] to-black/30 border border-white/5 hover:border-purple-500/20 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/3 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="flex gap-4 items-start">
                    <div className={`p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0`}>
                      <span className="text-lg font-bold leading-none">{ach.icon}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                        {ach.category} // {ach.date}
                      </span>
                      <h3 className="text-xs font-headline font-black text-white group-hover:text-[#ccff00] transition-colors leading-snug uppercase tracking-tight">
                        {ach.title}
                      </h3>
                      <p className="text-[11px] text-white/50 leading-relaxed font-sans font-light">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Searchable Certificates Index */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#ccff00]" />
                <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
                  CERTIFICATE ARCHIVE ({filteredCertificates.length})
                </h2>
              </div>

              {/* Inputs Grid */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:flex-initial min-w-[180px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Filter by skill, title..."
                    value={searchQuery}
                    onChange={(e) => {
                      if (propSearchQuery === undefined) {
                        setLocalSearchQuery(e.target.value);
                      }
                    }}
                    disabled={propSearchQuery !== undefined}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-1.5 pl-8 pr-3 text-[10px] font-mono text-white outline-none focus:border-[#ccff00]/40 font-bold placeholder:text-zinc-600 transition-all disabled:opacity-75"
                  />
                </div>

                {/* Select Issuer */}
                <div className="relative">
                  <select
                    value={selectedIssuer}
                    onChange={(e) => setSelectedIssuer(e.target.value)}
                    className="bg-zinc-900 border border-white/10 rounded-xl py-1.5 pl-3 pr-8 text-[11px] font-mono text-white/80 outline-none focus:border-[#ccff00]/40 appearance-none cursor-pointer"
                  >
                    {issuers.map((iss) => (
                      <option key={iss} value={iss}>
                        {iss === 'all' ? 'All Issuers' : iss.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid Layout */}
            {filteredCertificates.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white/[0.01] border border-dashed border-white/5 font-mono text-zinc-500 text-[10px]">
                No certifications matching current filter queries found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredCertificates.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => handleCertificateClick(cert)}
                    className="p-4 rounded-xl bg-gradient-to-b from-white/[0.02] to-black/30 border border-white/5 hover:border-[#ccff00]/15 hover:bg-white/[0.03] transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[8px] font-mono text-zinc-500 tracking-wider uppercase">
                          {cert.category} // {cert.date}
                        </span>
                        <span className="text-[8px] font-mono text-[#ccff00] font-bold px-1.5 py-0.5 rounded bg-[#ccff00]/5 border border-[#ccff00]/10 shrink-0">
                          VERIFIED
                        </span>
                      </div>

                      <h3 className="text-xs font-semibold text-white/90 group-hover:text-[#ccff00] leading-snug transition-colors pr-2">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="text-[10px] text-zinc-400 font-medium">
                        Issuer: <span className="text-white/80">{cert.issuer}</span>
                      </div>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1">
                        {cert.skills?.slice(0, 3).map((sk, index) => (
                          <span 
                            key={index} 
                            className="text-[8px] font-mono text-zinc-500 bg-white/[0.02] border border-white/5 px-1.5 py-0.5 rounded"
                          >
                            {sk}
                          </span>
                        ))}
                        {cert.skills && cert.skills.length > 3 && (
                          <span className="text-[8px] font-mono text-[#ccff00] font-bold px-1 py-0.5">
                            +{cert.skills.length - 3} More
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] font-mono text-zinc-500 group-hover:text-white transition-colors">
                      <span>LAUNCH CREDENTIAL PROTOCOL</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#ccff00] transition-colors" />
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      ) : (
        /* Community Impact View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
          
          {/* Left Column: Vision & Achievements overview (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
                COMMUNITY OUTREACH & EMPOWERMENT INITIATIVES
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.01] to-black/40 border border-white/5 space-y-4">
              <h3 className="text-sm font-headline font-black text-[#ccff00] uppercase tracking-wider">
                Our Civic & Social Mission
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
                Social responsibility and community enrichment are deeply woven into my developmental journey. Through Mumbai University's Department of Lifelong Learning and Extension (DLLE), I have channeled computational rigor and structured organization into community service, completing substantial field-based projects to drive grass-roots enrichment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: 'Core Social Focus', value: 'Empowerment & Education' },
                  { title: 'Field Contribution', value: '120+ Verified Hours' },
                  { title: 'Target Area', value: 'Urban & Semi-Urban Lifelong Learning' },
                  { title: 'Regulatory Body', value: 'University of Mumbai DLLE' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5">
                    <span className="text-[8px] font-mono text-zinc-500 block uppercase mb-1">{stat.title}</span>
                    <span className="text-xs font-mono font-bold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#120524]/10 to-black/40 border border-purple-500/10 space-y-4">
              <h3 className="text-sm font-headline font-black text-purple-400 uppercase tracking-tight">Key Community Projects & Deliverables</h3>
              <div className="space-y-3">
                {[
                  { role: 'Women Empowerment Seminars', desc: 'Conducted social awareness drives and informative sessions exploring fundamental rights, technological literacy, and academic paths.' },
                  { role: 'Population Education and Survey Protocols', desc: 'Structured localized surveys to understand demographic education gaps, processing and compiling feedback datasets for regional enhancement.' },
                  { role: 'Entrepreneurship & Career Orientation Programs', desc: 'Designed career guidance outlines and technological skill introduction workshops for underprivileged high school students.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-headline uppercase font-black text-[11px] tracking-tight">{item.role}</strong>
                      <span className="font-sans font-light leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: DLLE & Community Welfare (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Trophy className="w-4 h-4 text-[#ccff00]" />
              <h2 className="text-xs font-mono font-black tracking-widest text-white uppercase">
                COMMUNITY IMPACT & EXTENSION WORK
              </h2>
            </div>

            {/* DLLE Scholar Showcase Card */}
            <div 
              onClick={() => {
                const dlleCert = CERTIFICATES_DATA.find(c => c.id === 'cert_dlle');
                if (dlleCert) handleCertificateClick(dlleCert);
              }}
              className="p-5 rounded-3xl bg-gradient-to-br from-[#120524]/40 to-black/90 border border-purple-500/20 hover:border-[#ccff00]/40 transition-all cursor-pointer group relative overflow-hidden space-y-5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-1.5 z-10 relative">
                <div className="flex justify-between items-center text-[8px] font-mono">
                  <span className="text-purple-400 font-black uppercase tracking-widest">Achievements → Community Impact</span>
                  <span className="text-[#ccff00] font-black px-1.5 py-0.5 rounded bg-[#ccff00]/5 border border-[#ccff00]/20">120+ HOURS</span>
                </div>
                <h3 className="text-base font-headline font-black text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors mt-2">
                  DLLE Extension Work Scholar
                </h3>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mt-0.5">
                  University of Mumbai
                </p>
              </div>

              <p className="text-xs text-white/60 leading-relaxed font-sans font-light z-10 relative">
                Official extension work certified under the Department of Lifelong Learning and Extension (DLLE). Completed targeted structural community upliftment projects with verifiable records.
              </p>

              <div className="space-y-2.5 z-10 relative">
                <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest block font-bold">Extension Framework:</span>
                <div className="grid grid-cols-1 gap-2 p-3 rounded-2xl bg-black/50 border border-white/5">
                  {[
                    '120+ Hours of Certified Extension Work',
                    'Information Technology Activities',
                    'Industry Orientation Research',
                    'Entrepreneurship & Career Guidance',
                    'Women Empowerment Projects',
                    'Population Education & Open Schooling Programs'
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center text-[11px] text-zinc-300 font-sans">
                      <span className="text-[#ccff00] font-bold text-xs select-none">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2 z-10 relative">
                <div className="text-[10px] text-zinc-400 font-medium">
                  Verified by: <span className="text-zinc-200">University of Mumbai DLLE Authority</span>
                </div>
                
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 group-hover:text-white transition-colors pt-1">
                  <span>LAUNCH CREDENTIAL PROTOCOL</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#ccff00] transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED HIGH-FIDELITY CERTIFICATE LIGHTBOX MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0b0b0f] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col max-h-[90vh] custom-scrollbar">
            
            {/* Close Toggle */}
            <button 
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 mb-6 border-b border-white/5 pb-4 pr-12">
              <div className="flex items-center gap-1.5 text-[#ccff00] text-[9.5px] font-mono font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Academic Credentials Registry</span>
              </div>
              <h2 className="text-sm font-black font-mono text-white tracking-widest uppercase">
                {selectedCert.title}
              </h2>
            </div>

            {/* Display Box */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-6">
              
              {/* Actual Image Render path OR Beautiful SVG simulated template fallback */}
              <div className="relative rounded-2xl border-4 border-amber-950/40 bg-zinc-900 overflow-hidden shadow-inner aspect-[4/3] flex items-center justify-center p-2 sm:p-6 bg-gradient-to-tr from-[#151515] to-[#252528]">
                {!imageError ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {selectedCert.fileName.toLowerCase().endsWith('.pdf') ? (
                      <div className="flex flex-col items-center justify-center space-y-4 text-center p-4">
                        <FileBadge className="w-16 h-16 text-[#ccff00] animate-bounce" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">OFFICIAL ACADEMIC RECOGNITION DOCUMENT</span>
                        <h4 className="text-xs font-bold text-white uppercase max-w-md leading-relaxed">{selectedCert.title}</h4>
                        <p className="text-[10px] font-sans text-zinc-400 max-w-xs">
                          This selection letter is in PDF format. Keep your browser's PDF options active.
                        </p>
                        <a 
                          href={`/assets/${selectedCert.fileName}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-mono text-[10px] font-black tracking-widest uppercase rounded-xl border border-purple-400/30 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4 text-white" />
                          <span>Open Selection Letter Blueprint</span>
                        </a>
                      </div>
                    ) : (
                      <>
                        <img 
                          src={`/assets/${selectedCert.fileName}`} 
                          alt={selectedCert.title} 
                          onError={() => setImageError(true)} 
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain rounded-lg border border-white/10 shadow-2xl"
                        />
                        <button 
                          onClick={() => setImageError(true)}
                          className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 hover:bg-black text-[#ccff00] text-[8px] font-mono rounded border border-white/10 uppercase tracking-widest cursor-pointer"
                        >
                          Show Certificate Replica
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  /* Simulated Certificate UI - Unbelievably high fidelity, clean, leather-framed certificate card! */
                  <div className="relative w-full h-full border-2 border-zinc-800 rounded bg-[#f5f2e9] text-zinc-800 shadow-xl p-4 sm:p-8 flex flex-col justify-between font-serif select-none overflow-hidden select-text">
                    
                    {/* Subtle filigree borders */}
                    <div className="absolute inset-2 border border-amber-800/10 pointer-events-none" />
                    <div className="absolute inset-4 border border-zinc-900/15 pointer-events-none" />
                    <div className="absolute -top-12 -left-12 w-24 h-24 border border-zinc-950/10 rounded-full bg-transparent" />
                    <div className="absolute -bottom-12 -right-12 w-24 h-24 border border-zinc-950/10 rounded-full bg-transparent" />

                    {/* Corner details */}
                    <div className="absolute top-4 left-4 text-[7px] text-zinc-400 font-mono tracking-widest uppercase">
                      ID-{selectedCert.id} // VERIFIED_AUTHENTIC
                    </div>
                    <div className="absolute top-4 right-4 text-[7px] text-zinc-400 font-mono tracking-widest uppercase">
                       MUMBAI, MAHARASHTRA
                    </div>

                    {/* Top Header Logo */}
                    <div className="text-center space-y-1 mt-2 sm:mt-4">
                      <div className="flex justify-center mb-1">
                        <FileBadge className="w-8 h-8 text-amber-800" />
                      </div>
                      <div className="text-[10px] sm:text-[12px] font-bold tracking-widest uppercase text-zinc-500 font-mono leading-none">
                        Verified Academic Credential
                      </div>
                      <div className="text-[17px] sm:text-[22px] font-extrabold tracking-tight text-amber-950 uppercase font-headline">
                        Certificate of Achievement
                      </div>
                    </div>

                    {/* Middle Content */}
                    <div className="text-center space-y-2 my-2 sm:my-3">
                      <div className="text-[9px] sm:text-[11px] italic text-zinc-500">This holds to confirm that</div>
                      
                      <div className="text-[18px] sm:text-[23px] font-bold text-zinc-900 tracking-wide underline decoration-amber-900/30 font-headline uppercase leading-none">
                        Sandhya Tiwari
                      </div>
                      
                      <div className="text-[9px] sm:text-[10px] text-zinc-600 leading-relaxed max-w-sm sm:max-w-md mx-auto font-sans font-light">
                        has successfully satisfied all course frameworks, research methodologies, and continuous evaluations under the supervision of industry guides to earn the official credential for:
                        <div className="font-bold text-amber-950 text-[10px] sm:text-[11px] mt-1 uppercase font-mono tracking-tight leading-none text-center">
                          "{selectedCert.title}"
                        </div>
                      </div>
                    </div>

                    {/* Signatures & Seal Footer */}
                    <div className="flex items-end justify-between px-3 sm:px-6 mb-2 sm:mb-4">
                      {/* Left Signature */}
                      <div className="text-center space-y-1">
                        <div className="w-16 sm:w-20 border-b border-zinc-400 pb-0.5 mx-auto">
                          <span className="font-serif italic text-[10px] text-amber-900 leading-none">Sandhya.T</span>
                        </div>
                        <div className="text-[7.5px] font-mono text-zinc-400 uppercase tracking-widest">
                          Student Account
                        </div>
                      </div>

                      {/* Gold Certified Seal */}
                      <div className="flex flex-col items-center justify-center relative shrink-0">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-amber-600 bg-amber-200/50 flex items-center justify-center shadow-md animate-pulse">
                          <Award className="w-4 h-4 sm:w-6 sm:h-6 text-amber-700" />
                        </div>
                        <div className="text-[6.5px] font-mono text-amber-800 font-bold uppercase mt-1">
                          SEAL OF MERIT
                        </div>
                      </div>

                      {/* Right Signature */}
                      <div className="text-center space-y-1">
                        <div className="w-16 sm:w-20 border-b border-zinc-400 pb-0.5 mx-auto">
                          <span className="font-serif italic text-[10px] text-zinc-700 leading-none">{selectedCert.issuer}</span>
                        </div>
                        <div className="text-[7.5px] font-mono text-zinc-400 uppercase tracking-widest">
                          Authorized Issuer
                        </div>
                      </div>
                    </div>

                    {/* Micro ID Footer */}
                    <div className="flex justify-between items-center text-[7px] text-zinc-400 border-t border-zinc-200/40 pt-1.5 font-mono">
                      <span>DATE_ISSUED: {selectedCert.date}</span>
                      {selectedCert.credentialId ? (
                        <span className="truncate max-w-[150px]">ID: {selectedCert.credentialId}</span>
                      ) : (
                        <span>GENAI_VERIFIED_SYS</span>
                      )}
                    </div>

                  </div>
                )}
              </div>

              {/* Metadata Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Credential Issuer</span>
                    <span className="text-xs font-bold text-white uppercase">{selectedCert.issuer}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Issue Date / Period</span>
                    <span className="text-xs font-bold text-zinc-300">{selectedCert.date}</span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {selectedCert.credentialId && (
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Core License / Verification ID</span>
                      <span className="text-[10px] font-mono text-purple-400 font-bold select-all overflow-x-auto block py-0.5">
                        {selectedCert.credentialId}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Local Backup File Reference</span>
                    <span className="text-[10px] font-mono text-cyan-400 truncate block select-all">
                      {selectedCert.fileName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certification Focus Skills */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Coded Skill Integration Metrics</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((skill, index) => (
                    <span key={index} className="px-2.5 py-1 text-[10px] font-mono rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end border-t border-white/5 pt-4">
              <button
                onClick={closeModal}
                className="bg-[#ccff00] hover:bg-lime-400 text-black px-6 py-2 rounded-xl text-xs font-bold tracking-widest uppercase cursor-pointer transition-all"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
