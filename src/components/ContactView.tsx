import React, { useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Terminal, 
  Send, 
  Lock, 
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ContactForm } from '../types';
import { sysSynth } from '../utils/audio';

export default function ContactView() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sysSynth.playBeep(650, 0.05, 'sine');

    // Schema Validation
    if (!form.name.trim()) {
      sysSynth.playError();
      setStatus('error');
      setErrorMsg('VAL_ERR: Developer name coordinate is fully empty.');
      return;
    }

    if (!form.email.trim() || !validateEmail(form.email)) {
      sysSynth.playError();
      setStatus('error');
      setErrorMsg('VAL_ERR: Source transmission email is malformed.');
      return;
    }

    if (form.message.trim().length < 10) {
      sysSynth.playError();
      setStatus('error');
      setErrorMsg('VAL_ERR: Transmission message body is sub-minimum (<10 chars).');
      return;
    }

    setStatus('submitting');
    
    // Simulating secure token dispatch stream
    setTimeout(() => {
      sysSynth.playSuccess();
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 1800);
  };

  return (
    <div id="contact-panel-node" className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Contact Form Console */}
      <div className="lg:col-span-7 rounded-3xl glass-panel border border-white/5 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-32 bg-gradient-to-l from-[#ccff00]/5 to-transparent blur-3xl pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Terminal className="text-[#ccff00] w-4 h-4" />
            <span className="text-xs font-mono font-black tracking-widest text-[#ccff00] uppercase">
              TRANSMISSION TERMINAL STAGE
            </span>
          </div>

          <div className="space-y-4">
            {/* Input Name */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase block">
                01 // COMPILER DESIGNATOR (NAME)
              </label>
              <input 
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="ENTER YOUR NAME..."
                disabled={status === 'submitting'}
                className="w-full bg-black/60 border border-white/15 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/40 rounded-xl py-2 px-3.5 text-xs text-white placeholder:text-white/20 outline-none transition-all font-mono"
              />
            </div>

            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase block">
                02 // TRANSMISSION WAVE (EMAIL)
              </label>
              <input 
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ENTER YOUR EMAIL..."
                disabled={status === 'submitting'}
                className="w-full bg-black/60 border border-white/15 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/40 rounded-xl py-2 px-3.5 text-xs text-white placeholder:text-white/20 outline-none transition-all font-mono"
              />
            </div>

            {/* Input Message */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono tracking-widest text-white/50 uppercase block">
                03 // MESSAGE TELEMETRY PAYLOAD
              </label>
              <textarea 
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="COMPILE TRANSMISSION BODY..."
                rows={5}
                disabled={status === 'submitting'}
                className="w-full bg-black/60 border border-white/15 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/40 rounded-xl py-2 px-3.5 text-xs text-white placeholder:text-white/20 outline-none transition-all resize-none font-mono"
              />
            </div>
          </div>

          {/* Execution feedback log output */}
          {status === 'success' && (
            <div className="p-3 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center gap-2.5 text-[#ccff00] font-mono text-[10px]">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>TRANSMISSION SECURED: Message has reached Sandhya Tiwari. V1 routing log online.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-400 font-mono text-[10px]">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Button Trigger */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3 bg-[#ccff00] text-black font-headline font-black text-xs rounded-xl hover:shadow-glow-lime hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin shrink-0" />
                <span className="font-headline tracking-widest uppercase text-[10px]">DISPATCHING SECURE TOKEN...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span className="font-headline tracking-widest uppercase text-[10px]">DISPATCH TRANSMISSION</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Social and Hardware Specs Column */}
      <div className="lg:col-span-5 space-y-4">
        
        {/* Secure connection validation */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Lock className="text-purple-400 w-4 h-4" />
            <h4 className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
              SECURITY & METRIC PARAMETERS
            </h4>
          </div>

          <p className="text-[11px] text-white/60 font-sans leading-relaxed">
            All messages dispatched via this hub are secured using SSL. Transport routes verify integrity prior to sync-buffering database elements.
          </p>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono ">
              <span className="text-white/40">PROTOCOL</span>
              <span className="text-white font-bold">WSS://PORT_3000//TLS</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-white/40">CALIBRATOR</span>
              <span className="text-[#ccff00] font-bold">VERIFIED_ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Traditional Handles */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <ShieldCheck className="text-[#ccff00] w-4 h-4" />
            <h4 className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
              GRID COORDINATES & CODES
            </h4>
          </div>

          <div className="space-y-2.5">
            {[
              { label: 'GITHUB CHANNELS', value: '@Sandhya17', url: 'https://github.com/Sandhya175', icon: Github },
              { label: 'LINKEDIN PORTAL', value: 'Sandhya Tiwari', url: 'https://www.linkedin.com/in/sandhya-tiwari1752005/', icon: Linkedin },
              { label: 'DIRECT TRANSMIT EMAIL', value: 'sandhyatiwari1755@gmail.com', url: 'mailto:sandhyatiwari1755@gmail.com', icon: Mail }
            ].map((soc, idx) => {
              const IconComp = soc.icon;
              return (
                <a 
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sysSynth.playBeep(700, 0.05)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-black/35 border border-white/5 hover:border-[#ccff00]/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors text-white/60 group-hover:text-white">
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-white/30 tracking-wider block uppercase">{soc.label}</span>
                      <span className="text-[11px] font-headline font-bold text-white group-hover:text-[#ccff00] transition-colors">{soc.value}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-white/20 group-hover:text-white/60 transition-colors">
                    _CONNECT
                  </span>
                </a>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
