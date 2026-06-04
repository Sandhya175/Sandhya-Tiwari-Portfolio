import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  CornerDownRight, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Home, 
  Heart,
  Volume2,
  VolumeX,
  FileText
} from 'lucide-react';
import { TabType, Project } from './types';

// Importing beautiful modular components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import AboutView from './components/AboutView';
import ProjectsView from './components/ProjectsView';
import GameView from './components/GameView';
import SkillsView from './components/SkillsView';
import ExperienceView from './components/ExperienceView';
import LeadershipView from './components/LeadershipView';
import ContactView from './components/ContactView';
import ResumeDownload from './components/ResumeDownload';
import CustomCursor from './components/CustomCursor';
import SystemLoader from './components/SystemLoader';

import { sysSynth } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sysAuraOn, setSysAuraOn] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // High-fidelity tab transition system loading states
  const [isSystemLoading, setIsSystemLoading] = useState(false);
  const [loadingTab, setLoadingTab] = useState<TabType>('home');

  // States and refs for interactive hero mesh-gradient
  const [heroMouse, setHeroMouse] = useState({ x: 300, y: 300, approach: 0.1 });
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let approachVal = 0;
    if (nameRef.current) {
      const nameRect = nameRef.current.getBoundingClientRect();
      const nameCenterX = nameRect.left + nameRect.width / 2 - rect.left;
      const nameCenterY = nameRect.top + nameRect.height / 2 - rect.top;
      
      const dx = x - nameCenterX;
      const dy = y - nameCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Proximity gradient: starts feeling effect within 550px, intensifies steeply closer
      const maxRadius = 550;
      approachVal = Math.max(0, 1 - distance / maxRadius);
      // Non-linear easing for an immersive feeling closer to the name
      approachVal = Math.pow(approachVal, 1.6);
    }
    
    setHeroMouse({ x, y, approach: approachVal });
  };

  // Mouse cursor coordinate tracking for interactive futuristic background glow
  const appContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (appContainerRef.current) {
        appContainerRef.current.style.setProperty('--x', `${e.clientX}px`);
        appContainerRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTabChange = (tab: TabType) => {
    sysSynth.playBeep(450, 0.05, 'sine');
    if (tab === activeTab) {
      setMobileMenuOpen(false);
      return;
    }

    setLoadingTab(tab);
    setIsSystemLoading(true);
    setMobileMenuOpen(false);

    setTimeout(() => {
      setActiveTab(tab);
      setIsSystemLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  const triggerResumeDownload = () => {
    sysSynth.playConfirm();
    setIsResumeOpen(true);
  };

  const handleOpenProjectDetails = (proj: Project) => {
    setSelectedProject(proj);
    setLoadingTab('projects');
    setIsSystemLoading(true);

    setTimeout(() => {
      setActiveTab('projects');
      setIsSystemLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  return (
    <div 
      ref={appContainerRef}
      className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans select-none"
    >
      {/* Interactive Cyber Cursor with Neon Green Glow */}
      <CustomCursor />
      
      {/* 1. Futuristic Mouse Follow Glow Backdrop Layer */}
      <div className="cursor-glow fixed inset-0 z-0 pointer-events-none opacity-80" />

      {/* 2. Abstract Moving Ambient Blobs (Neon Lime & Purple) */}
      {sysAuraOn && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Neon lime grid accent */}
          <div className="absolute top-[10%] left-[25%] w-96 h-96 bg-[#ccff00]/[0.02] rounded-full blur-3xl animate-pulse" />
          {/* Deep Purple cyber glow */}
          <div className="absolute bottom-[20%] right-[15%] w-[480px] h-[480px] bg-[#9400e4]/[0.04] rounded-full blur-3xl animate-pulse duration-5000" />
          
          {/* Tech Matrix Grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-70" />
        </div>
      )}

      {/* 3. Mobile Navigation Header Menu */}
      <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 z-50 px-4 flex items-center justify-between">
        <div 
          onClick={() => handleTabChange('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Cpu className="text-[#ccff00] w-5 h-5 animate-pulse" />
          <span className="text-xs font-headline font-black text-white uppercase tracking-wider">SANDHYA_T</span>
        </div>

        <button 
          onClick={() => {
            sysSynth.playBeep(600, 0.05);
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="p-1 rounded bg-white/5 text-white/80 hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 4. Mobile Menu Drawer Links */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 z-50 p-5 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="text-[9px] font-mono tracking-widest text-[#ccff00] pb-2 border-b border-white/5">SELECT TELEMETRY COMPILER:</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'dashboard', label: 'DASHBOARD' },
              { id: 'about', label: 'PROFILE' },
              { id: 'projects', label: 'PROJECTS' },
              { id: 'game', label: 'GESTURE LAB' },
              { id: 'skills', label: 'SKILLS Matrix' },
              { id: 'experience', label: 'TIMELINE' },
              { id: 'achievements', label: 'HONORS' },
              { id: 'leadership', label: 'LEADERSHIP' },
              { id: 'contact', label: 'DIRECT_LINE' }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => handleTabChange(nav.id as TabType)}
                className={`py-2 px-3 text-left rounded-lg text-xs font-mono border transition-all ${
                  activeTab === nav.id 
                    ? 'bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/30' 
                    : 'bg-white/[0.02] text-white/60 border-white/5'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              triggerResumeDownload();
            }}
            className="w-full mt-4 py-2.5 bg-[#ccff00] text-black rounded-xl font-headline font-black text-xs text-center flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>RESUME.PDF [DOWNLOAD]</span>
          </button>
        </div>
      )}

      {/* 5. Desktop Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        triggerResumeDownload={triggerResumeDownload}
      />

      {/* 6. Main Visual Layout View Container */}
      <div className={`transition-all duration-300 relative z-10 ${
        activeTab === 'home' 
          ? 'w-full md:pl-64' 
          : 'w-full md:pl-64 pt-20 md:pt-24 pb-12 px-5 md:px-8 max-w-7xl mx-auto'
      }`}>
        
        {/* Top Header navbar (Excluding pure home splash page) */}
        {activeTab !== 'home' && (
          <Navbar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            sysAuraOn={sysAuraOn}
            setSysAuraOn={setSysAuraOn}
          />
        )}

        {/* Core Screen Router */}
        <main className="relative min-h-[500px]">
          
          {isSystemLoading ? (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <SystemLoader targetTab={loadingTab} />
            </div>
          ) : (
            <>
              {/* VIEW: HOME HERO EXPERIENCE */}
              {activeTab === 'home' && (
            <div 
              ref={heroRef}
              id="full-hero-landing" 
              className="min-h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden"
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={() => setHeroMouse(prev => ({ ...prev, approach: 0.1 }))}
            >
              
              {/* Dynamic Mesh-Gradient Overlay reacting to mouse movement */}
              <div 
                className="absolute inset-0 pointer-events-none z-0 transition-all duration-300"
                style={{
                  background: `
                    radial-gradient(
                      circle 450px at ${heroMouse.x}px ${heroMouse.y}px, 
                      rgba(204, 255, 0, ${0.06 + heroMouse.approach * 0.24}) 0%, 
                      rgba(148, 0, 228, ${0.03 + (1 - heroMouse.approach) * 0.05}) 60%, 
                      transparent 100%
                    ),
                    radial-gradient(
                      circle 600px at 15% 25%, 
                      rgba(148, 0, 228, 0.04) 0%, 
                      transparent 80%
                    ),
                    radial-gradient(
                      circle 500px at 85% 75%, 
                      rgba(204, 255, 0, ${0.02 + heroMouse.approach * 0.06}) 0%, 
                      transparent 70%
                    )
                  `
                }}
              />

              {/* Intensifying glow filter element behind name */}
              <div 
                className="absolute left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-[140px] pointer-events-none transition-all duration-300 z-0"
                style={{
                  opacity: 0.12 + heroMouse.approach * 0.58,
                  transform: `translate3d(-50%, -50%, 0) scale(${1 + heroMouse.approach * 0.35})`,
                }}
              />

              {/* Outer grid decor lines */}
              <div className="absolute inset-0 bg-[#000000]/20 pointer-events-none z-0" />

              {/* Top metadata line */}
              <div className="flex justify-between items-center z-10 relative mt-12 md:mt-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white animate-pulse">
                    <Cpu className="w-5 h-5 text-[#ccff00]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-white uppercase tracking-widest block block">
                      SANDHYA_TIWARI.SYS
                    </span>
                    <span className="text-[9px] font-mono text-white/30 tracking-wider">
                      COGNITIVE_DEVELOPER_PORTFOLIO // INTERNSHIP_NOMINAL
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 bg-white/[0.03] rounded-full border border-white/5 text-[9px] font-mono text-white/50 tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>SECURE PORTAL PORT_3000//STANDBY</span>
                </div>
              </div>

              {/* Main typography stack */}
              <div className="max-w-4xl space-y-6 my-12 md:my-0 md:py-16 text-left z-10 relative">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 inline-flex bg-[#ccff00]/5 border border-[#ccff00]/15 rounded-full px-3 py-1 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
                    <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#ccff00]">
                      System Active & Available for Roles
                    </span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-headline font-black text-white tracking-tighter leading-none uppercase">
                    <span ref={nameRef}>SANDHYA</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#ccff00] text-glow-lime">TIWARI</span>
                  </h1>
                  
                  <p className="text-sm sm:text-lg font-mono text-white/40 uppercase tracking-widest flex flex-wrap gap-2 md:gap-3 items-center pt-2">
                    <span>Frontend Developer</span>
                    <span>•</span>
                    <span>React Developer</span>
                    <span>•</span>
                    <span>BSc Information Technology Student</span>
                  </p>
                </div>

                <p className="text-base sm:text-xl text-white/70 font-sans font-light leading-relaxed max-w-2xl">
                  Building scalable, user-focused and interactive web experiences. Merging analytical science with computer vision puzzles & accessibility pipelines.
                </p>

                {/* Main Action buttons row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                  <button
                    onClick={() => handleTabChange('dashboard')}
                    className="px-6 py-3.5 bg-[#ccff00] text-black font-headline font-black text-xs tracking-widest rounded-xl hover:shadow-glow-lime hover:scale-[1.01] hover:brightness-115 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                  >
                    <span>EXPLORE PORTFOLIO</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>

                  <button
                    onClick={triggerResumeDownload}
                    className="px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-headline font-bold text-xs tracking-wide rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                  >
                    <span>DOWNLOAD RESUME</span>
                  </button>

                  <button
                    onClick={() => handleTabChange('contact')}
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-headline font-bold text-xs tracking-wide rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                  >
                    <span>Contact Me</span>
                  </button>
                </div>
              </div>

              {/* Bottom system credentials and stats */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-white/5 z-10 relative">
                <div className="text-[9px] font-mono text-white/30 space-y-0.5 uppercase">
                  <div>© 2026 SANDHYA TIWARI. All rights reserved.</div>
                  <div>Crafted using standard react concurrent processes.</div>
                </div>

                <div className="flex gap-4 font-mono text-[9px] text-white/40">
                  <button 
                    onClick={() => handleTabChange('dashboard')}
                    className="hover:text-white hover:underline transition-colors block text-left"
                  >
                    // DIRECT_DASHBOARD_TRANSIT
                  </button>
                  <button 
                    onClick={() => handleTabChange('game')}
                    className="hover:text-white hover:underline transition-colors block text-left"
                  >
                    // LAUNCH_ACCESSIBILITY_LAB_
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: SAAS DASHBOARD INTERFACE */}
          {activeTab === 'dashboard' && (
            <DashboardView 
              setActiveTab={handleTabChange}
              openProjectDetails={handleOpenProjectDetails}
              searchQuery={searchQuery}
            />
          )}

          {/* VIEW: ABOUT BIO PORTRAIT */}
          {activeTab === 'about' && (
            <AboutView />
          )}

          {/* VIEW: FEATURED PROJECTS GRID */}
          {activeTab === 'projects' && (
            <ProjectsView 
              searchQuery={searchQuery}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          )}

          {/* VIEW: PLAYABLE GESTURE HUB */}
          {activeTab === 'game' && (
            <GameView />
          )}

          {/* VIEW: COMPOSITE SKILLS TARGETS */}
          {activeTab === 'skills' && (
            <SkillsView />
          )}

          {/* VIEW: EXPERIENCE HISTORIES */}
          {activeTab === 'experience' && (
            <ExperienceView />
          )}

          {/* VIEW: ACADEMIC CREDITS & HONORS */}
          {activeTab === 'achievements' && (
            <ExperienceView /> 
          )}

          {/* VIEW: LEADERSHIP COORDINATION CODES */}
          {activeTab === 'leadership' && (
            <LeadershipView />
          )}

          {/* VIEW: CLIENT TRANSMISSION CONSOLE */}
          {activeTab === 'contact' && (
            <ContactView />
          )}
            </>
          )}

        </main>

        {/* Global sticky return to home floating action button (FAB) */}
        {activeTab !== 'home' && (
          <button
            onClick={() => handleTabChange('home')}
            className="fixed bottom-6 right-6 p-3 bg-[#ccff00] hover:bg-lime-400 text-black rounded-full shadow-glow-lime hover:scale-110 active:scale-95 transition-all z-40 group cursor-pointer"
            title="Return to Splash Terminal"
          >
            <Home className="w-5 h-5" />
          </button>
        )}

      </div>

      {/* 7. Centered Resume Downloader simulated popover overlay */}
      <ResumeDownload 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

    </div>
  );
}
