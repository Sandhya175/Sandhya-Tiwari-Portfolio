import { useState, useEffect } from 'react';
import { Download, CheckCircle, Database, FileText, Cpu, X, ShieldAlert } from 'lucide-react';
import { sysSynth } from '../utils/audio';

interface ResumeDownloadProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeDownload({ isOpen, onClose }: ResumeDownloadProps) {
  const [downloadStep, setDownloadStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setDownloadStep(0);
      setProgress(0);
      return;
    }

    // Step 1: Initiate compiler validation
    setDownloadStep(1);
    
    // Increment loading progression
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setDownloadStep(2); // Accomplished
          sysSynth.playSuccess();
          triggerPhysicalFileDownload();
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen]);

  const triggerPhysicalFileDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = '/assets/Sandhya Tiwari Resume.pdf';
      link.download = 'Sandhya_Tiwari_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      // Ignored safely
    }
  };

  if (!isOpen) return null;

  return (
    <div id="resume-download-overlay" className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-sm glass-panel-heavy p-6 rounded-3xl border border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Dismiss trigger */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-5 text-center">
          <div className="w-12 h-12 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center mx-auto text-[#ccff00] animate-pulse">
            <Download className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-headline font-black text-white uppercase tracking-wider">
              RESUME DISTRIBUTION CORE
            </h3>
            <p className="text-[10px] font-mono text-white/40 uppercase">
              COMPILING CREDENTIAL TRANSACT_TOKEN
            </p>
          </div>

          {/* Load meters */}
          <div className="space-y-2 py-3 bg-black/45 rounded-xl border border-white/5 px-4 text-left">
            <div className="flex justify-between items-center text-[9px] font-mono">
              <span className="text-white/30">INTELLIGENT INTEGRITY</span>
              <span className="text-[#ccff00] font-bold">{progress}%</span>
            </div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="bg-[#ccff00] h-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5 text-[8px] font-mono text-white/30 pt-1 border-t border-white/5 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>
                {downloadStep === 1 ? 'PACKAGING NODES...' : 'TRANSMITTED COMPLETED'}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-white/50 font-sans leading-relaxed">
            Downloading <strong className="text-white">Sandhya_Tiwari_Resume.pdf</strong> to your client device. Standard structural profile synced perfectly.
          </p>

          <button 
            onClick={onClose}
            className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-lg text-xs font-headline font-bold transition-all cursor-pointer"
          >
            CLOSE DISPATCHER
          </button>
        </div>

      </div>
    </div>
  );
}
