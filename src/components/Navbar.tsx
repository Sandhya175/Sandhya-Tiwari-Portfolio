import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, Radio, Cpu, Smartphone, ShieldCheck, User } from 'lucide-react';
import { TabType } from '../types';
import { sysSynth } from '../utils/audio';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  sysAuraOn: boolean;
  setSysAuraOn: (on: boolean) => void;
}

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab,
  sysAuraOn,
  setSysAuraOn
}: NavbarProps) {
  const [time, setTime] = useState(new Date());
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const notifications = [
    { title: 'Interactive Gesture Puzzle calibrated', desc: 'The AI computer vision canvas is online for gesture match testing.', time: 'Just now' },
    { title: 'Resume PDF generation stream established', desc: 'Symmetric digital download token ready for developer profiles.', time: '5m ago' },
    { title: 'Scanalyzer Diagnostics Active', desc: 'Clinical medical variable parsing model has loaded on port 3000.', time: '1h ago' }
  ];

  const handleNotificationClick = () => {
    sysSynth.playBeep(650, 0.05, 'sine');
    setShowNotificationOverlay(!showNotificationOverlay);
    setUnreadNotifications(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAuraToggle = () => {
    sysSynth.playBeep(sysAuraOn ? 350 : 750, 0.08, 'sine');
    setSysAuraOn(!sysAuraOn);
  };

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 md:px-8 z-40">
      
      {/* Search Console */}
      <div className="flex items-center gap-4 flex-1 max-w-sm">
        <div className="relative w-full flex items-center group">
          <Search className="absolute left-3.5 w-3.5 h-3.5 text-white/30 group-focus-within:text-[#ccff00] transition-colors" />
          <input
            type="text"
            placeholder="QUERY TELEMETRY DATABASE..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-black/40 border border-white/5 hover:border-white/10 rounded-full py-1.5 pl-10 pr-4 text-[10px] font-mono tracking-widest text-[#ccff00] placeholder:text-white/20 focus:ring-1 focus:ring-[#ccff00]/40 focus:border-[#ccff00]/40 outline-none transition-all"
          />
        </div>
      </div>

      {/* Widgets & Live Status Bar */}
      <div className="flex items-center gap-4 md:gap-6 ml-4">
        {/* Hardware Status Tag (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 bg-white/[0.03] rounded-full border border-white/5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#ccff00]" />
          <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase">
            SECURE PORTFOLIO OPERATIONAL
          </span>
        </div>

        {/* Real-time Clock (Desktop) */}
        <div className="hidden sm:flex flex-col items-end pr-2 border-r border-white/5">
          <span className="text-xs font-mono font-bold text-white tracking-widest">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span className="text-[8px] font-mono text-white/30">
            {time.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
          </span>
        </div>

        {/* Aura toggle */}
        <button 
          onClick={handleAuraToggle}
          className={`relative p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer group ${sysAuraOn ? 'text-[#ccff00]' : 'text-white/40'}`}
          title="Toggle system theme backdrop aura"
        >
          <Radio className={`w-4 h-4 ${sysAuraOn ? 'animate-pulse text-[#ccff00]' : ''}`} />
          {sysAuraOn && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ccff00]" />}
        </button>

        {/* Notification system */}
        <div className="relative">
          <button 
            onClick={handleNotificationClick}
            className="relative p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer text-white/60 hover:text-white"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
            )}
          </button>

          {/* Overlays / Popovers */}
          {showNotificationOverlay && (
            <div className="absolute right-0 mt-3 w-80 bg-[#07030e]/95 backdrop-blur-xl p-4 rounded-xl border-2 border-[#ccff00]/30 shadow-[0_0_30px_rgba(204,255,0,0.15)] z-50 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                <span className="text-[10px] font-mono tracking-widest text-[#ccff00] font-bold">
                  CORE SYSTEMS ALERTS
                </span>
                <span className="text-[9px] font-mono text-white/40">
                  {unreadNotifications} NEW
                </span>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {notifications.map((n, i) => (
                  <div key={i} className="p-2 rounded hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-headline font-bold text-white transition-colors hover:text-[#ccff00]">
                        {n.title}
                      </span>
                      <span className="text-[8px] font-mono text-white/30">{n.time}</span>
                    </div>
                    <p className="text-[10px] text-white/50 leading-relaxed font-sans">{n.desc}</p>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowNotificationOverlay(false)}
                className="w-full mt-3 py-1.5 text-center text-[9px] font-mono text-[#ccff00] bg-white/5 hover:bg-white/10 rounded transition-colors"
              >
                DISMISS CONSOLE LOGS
              </button>
            </div>
          )}
        </div>

        {/* User Icon Circle Beside Notification */}
        <div 
          onClick={() => {
            sysSynth.playBeep(500, 0.05);
            setActiveTab('about');
          }}
          className="w-8 h-8 rounded-full bg-[#120524] border border-[#ccff00]/30 hover:border-[#ccff00]/80 transition-all cursor-pointer shadow-glow-lime hover:scale-105 flex items-center justify-center text-[#ccff00] hover:text-white"
          title="Developer Profile"
        >
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
