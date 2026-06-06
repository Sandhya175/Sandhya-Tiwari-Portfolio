import { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  Gamepad2, 
  Brain, 
  Briefcase, 
  Trophy, 
  Target, 
  Mail, 
  Volume2, 
  VolumeX, 
  Download,
  Settings,
  Cpu,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { TabType } from '../types';
import { sysSynth } from '../utils/audio';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  triggerResumeDownload: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, triggerResumeDownload }: SidebarProps) {
  const [isMuted, setIsMuted] = useState(sysSynth.getMutedState());

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'game', label: 'Gesture Lab', icon: Gamepad2, badge: 'NEW' },
    { id: 'skills', label: 'Skills', icon: Brain },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'leadership', label: 'Leadership', icon: Target },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleTabClick = (tabId: TabType) => {
    sysSynth.playBeep(480, 0.05, 'sine');
    setActiveTab(tabId);
  };

  const toggleSound = () => {
    const muted = sysSynth.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sysSynth.playBeep(800, 0.1, 'sine');
    }
  };

  return (
    <aside 
      id="side-nav-bar"
      className="fixed left-0 top-0 h-screen w-64 bg-[#050505]/40 backdrop-blur-3xl border-r border-white/5 flex flex-col py-6 px-4 z-50 shadow-[15px_0_40px_rgba(0,0,0,0.7)] justify-between hidden md:flex"
    >
      {/* Brand Profile Code */}
      <div className="mb-6 px-3">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleTabClick('home')}
        >
          <div className="w-10 h-10 rounded-full border border-[#ccff00]/30 flex items-center justify-center bg-black overflow-hidden group-hover:border-[#ccff00]/80 transition-all duration-300">
            <Cpu className="w-5 h-5 text-[#ccff00] animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-headline font-black tracking-widest text-white uppercase group-hover:text-[#ccff00] transition-colors duration-300">
              SANDHYA_t
            </h1>
            <p className="text-[9px] font-mono text-[#ccff00] tracking-wider">
              V1.0 - ACTIVE
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Nodes */}
      <nav className="flex-1 space-y-1.5 py-4 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id as TabType)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-300 group ${
                isActive
                  ? 'text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20'
                  : 'text-white/60 hover:text-[#ccff00] hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-[#ccff00]' : 'text-white/40 group-hover:text-[#ccff00]'
                }`} />
                <span className="text-xs font-medium font-headline tracking-tight">
                  {item.label}
                </span>
              </div>
              
              {item.badge && (
                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00] font-bold border border-[#ccff00]/20 animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Console */}
      <div className="pt-4 border-t border-white/5 space-y-4">
        {/* Quick actions line */}
        <div className="flex items-center justify-between px-3">
          <button 
            onClick={toggleSound}
            className="flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-white transition-all"
            title={isMuted ? "Enable system sounds" : "Mute sounds"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#ccff00]" />
            )}
            <span>{isMuted ? 'AUDIO_MUTE' : 'AUDIO_ON'}</span>
          </button>
          
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
            <span className="text-[9px] font-mono text-white/30">INTEG_OK</span>
          </div>
        </div>

        {/* Dynamic resume action */}
        <button 
          onClick={triggerResumeDownload}
          className="w-full bg-[#ccff00] text-black font-headline font-bold text-xs py-2.5 rounded-lg hover:shadow-glow-lime hover:brightness-110 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          <span>RESUME.PDF</span>
        </button>

        {/* Footer Meta */}
        <div className="flex items-center justify-between px-3 text-[9px] font-mono text-white/20">
          <div className="flex items-center gap-1">
            <Settings className="w-3 h-3 text-white/20" />
            <span>PORT_3000</span>
          </div>
          <span>SECURE_CONN</span>
        </div>
      </div>
    </aside>
  );
}
