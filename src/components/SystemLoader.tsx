import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, RefreshCw, Database, Terminal } from 'lucide-react';

interface SystemLoaderProps {
  targetTab: string;
}

export default function SystemLoader({ targetTab }: SystemLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [sysLog, setSysLog] = useState<string>('INITIATING_ROUTING_ENVELOPE...');

  // Map tab IDs to futuristic system modules
  const getTabSystemLabel = (tab: string) => {
    switch (tab) {
      case 'home': return 'COGNITIVE_SPLASH_CORE';
      case 'dashboard': return 'TELEMETRY_DASHBOARD_V4';
      case 'about': return 'BIOMETRIC_PROFILE_INDEX';
      case 'projects': return 'EXECUTABLE_BUILDS_REPOSITORIES';
      case 'game': return 'GESTURE_INTERFACE_LABORATORY';
      case 'skills': return 'INTELLIGENT_MATRIX_COMPILER';
      case 'experience': return 'HISTORIC_TIMELINE_SEQUENCER';
      case 'education': return 'ACADEMIC_TIMELINE_SEQUENCER';
      case 'achievements': return 'ACADEMIC_HONORS_CREDITS';
      case 'leadership': return 'COORDINATION_LOGISTICS_CONSOLE';
      case 'contact': return 'CLIENT_PORTAL_COMMUNICATION_LINK';
      default: return 'SYSTEM_MODULE_WORKSPACE';
    }
  };

  useEffect(() => {
    // Elegant fast telemetry loader bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 70);

    const logStates = [
      'ALLOCATING_TEMPORARY_BUFFER_MEMORY...',
      'ESTABLISHING_TLS_COMMUNICATIONS_PIPELINES...',
      `COMPILING_RESOURCES_FOR_${getTabSystemLabel(targetTab)}...`,
      'RENDERING_CONCURRENT_VIEWPORT_DOM...',
      'SYSTEM_MODULE_LOADED_NOMINAL'
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logStates.length) {
        setSysLog(logStates[logIndex]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 110);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [targetTab]);

  const boundedProgress = Math.min(100, progress);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-50 min-h-[450px] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 border border-white/5 rounded-3xl"
    >
      {/* Cybernetic grid decoration overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-3xl" />
      
      {/* Animated glowing scanning laser line */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ccff00]/60 to-transparent shadow-[0_0_12px_#ccff00] animate-scan pointer-events-none" />

      <div className="w-full max-w-md relative space-y-6 text-left">
        {/* Top Header telemetry */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#ccff00] animate-spin-slow" />
            <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">
              COMPILING TRANSIT ENVELOPE
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20 text-[8px] font-mono">
            <RefreshCw className="w-2.5 h-2.5 animate-spin" />
            <span>SYS_TRANSIT</span>
          </div>
        </div>

        {/* Compiling telemetry body */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-white/30 block uppercase tracking-wider">
              RESOURCES TARGET_SECTOR
            </span>
            <div className="text-xs font-mono font-black text-[#ccff00] uppercase tracking-wide">
              {getTabSystemLabel(targetTab)}
            </div>
          </div>

          {/* Glowing loader bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-mono text-white/50">
              <span className="animate-pulse">LOADING_DATASTREAM...</span>
              <span>{boundedProgress}%</span>
            </div>
            
            {/* ProgressBar */}
            <div className="h-2 w-full bg-white/[0.03] border border-white/10 rounded-full overflow-hidden relative p-[1px]">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#ccff00] shadow-[0_0_8px_rgba(204,255,0,0.5)] transition-all duration-100 ease-out"
                style={{ width: `${boundedProgress}%` }}
              />
            </div>
          </div>

          {/* Compiler log terminal */}
          <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1.5 min-h-[64px] flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-purple-400">
              <Terminal className="w-3 h-3" />
              <span>TERMINAL_RECEIVER:</span>
            </div>
            <div className="text-[9px] font-mono text-white/70 animate-pulse uppercase tracking-tight">
              &gt; {sysLog}
            </div>
          </div>
        </div>

        {/* Bottom system micro indicators */}
        <div className="flex justify-between items-center text-[8px] font-mono text-white/20 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#ccff00] animate-ping" />
            MEMORY_PAGING: OK
          </span>
          <span>LATENCY: ~0.02ms</span>
          <span className="flex items-center gap-1">
            <Database className="w-2.5 h-2.5 text-purple-500" />
            LOCAL_BUFFERS_SYMETRIC
          </span>
        </div>
      </div>
    </motion.div>
  );
}
