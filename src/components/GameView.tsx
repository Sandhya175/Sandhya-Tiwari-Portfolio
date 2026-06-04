import { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Play, 
  RotateCcw, 
  Award, 
  Clock, 
  Camera, 
  Volume2, 
  Cpu, 
  CheckCircle2, 
  HelpCircle,
  VideoOff,
  Sparkles,
  CameraOff,
  X
} from 'lucide-react';
import { sysSynth } from '../utils/audio';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export default function GameView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [targetGesture, setTargetGesture] = useState('PEACE_SIGN (✌️)');
  const [cameraActive, setCameraActive] = useState(false);
  const [gestureMatchCount, setGestureMatchCount] = useState(0);
  const [confidenceRate, setConfidenceRate] = useState(0);
  const [fpsVal, setFpsVal] = useState(30);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const triggerErrorToast = (msg: string) => {
    setCameraError(msg);
    setTimeout(() => {
      setCameraError(null);
    }, 4500);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const gesturesList = [
    { name: 'PEACE_SIGN (✌️)', tip: 'Spread index and middle fingers apart' },
    { name: 'PINCH_ZOOM (🤏)', tip: 'Touch thumb and index fingers closely' },
    { name: 'FIST_PULSE (✊)', tip: 'Fold all fingers tightly' },
    { name: 'OPEN_PALM (🖐️)', tip: 'Spread all fingers apart fully' },
    { name: 'THUMBS_UP (👍)', tip: 'Point thumb upwards, fold remaining fingers' }
  ];

  const initialLeaderboard: LeaderboardEntry[] = [
    { rank: 1, username: 'CYBER_CODE_ACE', score: 380, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80' },
    { rank: 2, username: 'T_SANDHYA (YOU)', score: 0, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtNqkdHOBENf5YppjXawuRZl6OPt0HbvDC1PPSAEsogKe_8ywl38VWZO-A0CEabprDG6blETM5sso99mYT88U5ByKqwl28K5UCHh7RCJQnPUUfPZqm4sA2VLFz_PXT3RRnt1T954CdeoZLJ8yGWhP_NzqDuIw3ZZw1MJ7-7vyccdooc_amtZ2wM7FhmwnD5UEkffmTO0PNFqeh2HiZpkxZE1qv5Je8d82SUwKUmMiyIAuRjqKpH_1vyU5MR8xFldnguh3k5rYwDdg', isCurrentUser: true },
    { rank: 3, username: 'MUTEX_LOCK', score: 240, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80' },
    { rank: 4, username: 'KRONOS_AI', score: 190, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80' }
  ];

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);

  // Timer pipeline
  useEffect(() => {
    let timerId: any = null;
    if (isPlaying && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleGameOver();
            return 0;
          }
          if (prev === 6) {
            sysSynth.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isPlaying, timeLeft]);

  // Handle game end
  const handleGameOver = () => {
    setIsPlaying(false);
    sysSynth.playLevelUp();
    
    // Update personal score on leaderboard
    setLeaderboard(prev => {
      const updated = prev.map(entry => {
        if (entry.isCurrentUser) {
          return { ...entry, score: score };
        }
        return entry;
      });
      return updated.sort((a, b) => b.score - a.score).map((entry, idx) => ({ ...entry, rank: idx + 1 }));
    });
  };

  // Start gesture game
  const startGame = () => {
    sysSynth.playConfirm();
    setScore(0);
    setTimeLeft(45);
    setGestureMatchCount(0);
    setConfidenceRate(0);
    setIsPlaying(true);
    selectNewGesture();
  };

  const selectNewGesture = () => {
    const idx = Math.floor(Math.random() * gesturesList.length);
    setTargetGesture(gesturesList[idx].name);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCameraActive(false);
  };

  // Camera integration
  const startCamera = async () => {
    sysSynth.playTick();
    try {
      if (cameraActive) {
        stopCamera();
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240, facingMode: 'user' } 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      requestAnimationFrame(runSimulationLoop);
    } catch (err) {
      sysSynth.playError();
      triggerErrorToast('Camera access denied or unavailable. Fallback simulated analyzer is fully active!');
    }
  };

  // Simulated CV Processing Frame Loop
  const runSimulationLoop = () => {
    if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) return;
    
    setFpsVal(Math.floor(28 + Math.random() * 4));
    
    // Increment confidence rating when target is hot
    if (isPlaying) {
      setConfidenceRate(prev => {
        const delta = Math.floor(Math.random() * 8);
        const next = Math.min(100, Math.max(0, prev + (Math.random() > 0.4 ? delta : -delta + 2)));
        
        // Auto trigger match when score exceeds 85% confidence
        if (next >= 92) {
          triggerSimulatedMatch();
          return 0;
        }
        return next;
      });
    }

    animationRef.current = requestAnimationFrame(runSimulationLoop);
  };

  const triggerSimulatedMatch = () => {
    sysSynth.playSuccess();
    setScore(prev => prev + 30);
    setGestureMatchCount(prev => prev + 1);
    selectNewGesture();
  };

  // Direct manual mock click logic for non-webcam developers
  const triggerManualClickMatch = () => {
    sysSynth.playBeep(900, 0.1, 'sine');
    setScore(prev => prev + 30);
    setGestureMatchCount(prev => prev + 1);
    setConfidenceRate(100);
    setTimeout(() => {
      setConfidenceRate(0);
      selectNewGesture();
    }, 400);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div id="gesture-game-panel" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* SaaS Product Intro Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.04] to-[#050505]/80 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              ACCESSIBILITY RESEARCH LAB_
            </span>
            <span className="text-[10px] font-mono text-white/30">V2.4_CV</span>
          </div>
          <h1 className="text-xl md:text-2xl font-headline font-black text-white uppercase tracking-tight">
            INTERACTIVE GESTURE TRANSLATOR SYSTEM
          </h1>
          <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
            An exploratory neural laboratory testing hand telemetry. In continuous research mode, our models translate physical finger coords into command strings. Calibrate webcam to stream real matrices, or interact using manual controls.
          </p>
        </div>
      </div>

      {/* Main Game Interface Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CV Video Screen Console */}
        <div className="lg:col-span-8 rounded-3xl glass-panel border border-white/5 p-5 flex flex-col justify-between space-y-4 relative overflow-hidden">
          
          {/* Diagnostic Stats Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Camera className={`w-4 h-4 ${cameraActive ? 'text-[#ccff00] animate-pulse' : 'text-white/30'}`} />
              <span className="text-xs font-mono font-black text-white tracking-widest uppercase">
                {cameraActive ? 'TELEMETRY WEBCAM_STREAM' : 'STREAM STANDBY'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-mono">
              <span className="text-white/30">FPS: <strong className="text-white">{cameraActive ? fpsVal : '0'}</strong></span>
              <span className="text-white/30">LATENCY: <strong className="text-[#ccff00]">{cameraActive ? '18ms' : '--'}</strong></span>
            </div>
          </div>

          {/* Core Camera Simulation / Frame */}
          <div className="w-full h-80 rounded-2xl bg-black border border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Real Video Element */}
            <video 
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${cameraActive ? 'opacity-70' : 'opacity-0'}`}
              playsInline
              muted
            />

            {/* Matrix overlay decoration */}
            {cameraActive && (
              <div className="absolute inset-x-8 inset-y-12 border border-dashed border-[#ccff00]/40 rounded-xl pointer-events-none flex flex-col items-center justify-center">
                <div className="absolute top-2 left-2 text-[8px] font-mono text-[#ccff00]">CV_MATRIX_BOUND=CALIBRATED</div>
                {/* Horizontal radar scanner sweep line */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent absolute top-1/2 -translate-y-1/2 opacity-60 animate-bounce" />
                
                {/* Simulated point coordinates overlay */}
                {isPlaying && (
                  <div className="absolute flex gap-1.5 p-2 bg-black/85 backdrop-blur items-center rounded-lg border border-white/10 shadow-2xl scale-95 md:scale-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
                    <span className="text-[9px] font-mono text-white/80">MATCHING TARGET GESTURE... ({confidenceRate}%)</span>
                  </div>
                )}
              </div>
            )}

            {/* Mock graphics when camera is offline */}
            {!cameraActive && (
              <div className="space-y-4 text-center p-6 max-w-sm">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/40">
                  <CameraOff className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">SYS_STREAM_OFFLINE</h4>
                  <p className="text-[10px] text-white/40 mt-1 font-sans">Turn on system webcam telemetry to feed live frames, or click manual match calibration to secure high scores.</p>
                </div>
                <button 
                  onClick={startCamera}
                  className="px-4 py-2 text-[10px] font-mono tracking-widest bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Camera className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>CALIBRATE WEBCAM</span>
                </button>
              </div>
            )}

            {/* Active match prompts overlay */}
            {isPlaying && (
              <div className="absolute bottom-4 left-4 right-4 py-3 px-4 rounded-xl bg-[#050505]/95 backdrop-blur border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-mono text-purple-400 tracking-wider">TARGET INSTRUCTION</span>
                  <div className="text-xs font-headline font-black text-white">{targetGesture}</div>
                  <p className="text-[9px] text-white/40 font-sans">{gesturesList.find(g => g.name === targetGesture)?.tip}</p>
                </div>

                <div className="flex gap-2 font-mono">
                  {cameraActive ? (
                    <button 
                      onClick={triggerSimulatedMatch}
                      className="px-3.5 py-1.5 rounded-lg bg-[#ccff00] text-black text-[9px] font-bold hover:shadow-glow-lime hover:scale-102 transition-all cursor-pointer"
                    >
                      AUTO DECIPHER
                    </button>
                  ) : (
                    <button 
                      onClick={triggerManualClickMatch}
                      className="px-3.5 py-1.5 rounded-lg bg-purple-600 text-white text-[9px] font-bold hover:bg-purple-700 hover:shadow-glow-purple transition-all cursor-pointer"
                    >
                      MANUAL GESTURE MATCH
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Not playing screen start trigger overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="p-3.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] animate-pulse">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-headline font-black text-white uppercase tracking-widest">
                    HAND GESTURE TRANSLATOR EXPERIMENT
                  </h3>
                  <p className="text-[10px] text-white/50 max-w-sm mt-1 leading-relaxed">
                    Test your response times! Align targeted physical shapes swiftly to trigger metric score updates.
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-lg bg-[#ccff00] hover:brightness-110 text-black text-xs font-headline font-black tracking-widest hover:shadow-glow-lime transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>START TRIAL LABS</span>
                </button>
              </div>
            )}

          </div>

          {/* Quick Stats Toolbar Footer */}
          <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5 text-[10px] font-mono">
            <div className="flex items-center gap-2">
              <span className="text-white/40">SCORE:</span>
              <span className="text-[#ccff00] font-bold">{score} XP</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-white/40">CALIBRATIONS:</span>
              <span className="text-purple-400 font-bold">{gestureMatchCount} COMPLETED</span>
            </div>

            {cameraActive && (
              <button 
                onClick={stopCamera}
                className="text-red-400 hover:underline flex items-center gap-1.5"
                title="Disconnect client camera streams"
              >
                <VideoOff className="w-3 h-3 text-red-400" />
                <span>TERMINATE</span>
              </button>
            )}
          </div>

        </div>

        {/* Leaderboard Panel Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Clock Timer Panel */}
          <div className="p-4 rounded-2xl glass-panel border border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono font-black tracking-widest text-white/50 uppercase">
              TRIAL COUNTDOWN:
            </span>
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
              <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-red-500 animate-ping' : 'text-[#ccff00]'}`} />
              <span className={`text-sm font-mono font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Real Leaderboard */}
          <div className="p-5 rounded-3xl glass-panel border border-white/5 space-y-4 flex flex-col justify-between min-h-[310px]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Award className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-mono font-black tracking-widest text-white uppercase">
                  LEADERBOARD XP
                </h3>
              </div>

              <div className="space-y-2.5">
                {leaderboard.map((user) => (
                  <div 
                    key={user.rank}
                    className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                      user.isCurrentUser 
                        ? 'bg-[#ccff00]/5 border-[#ccff00]/30' 
                        : 'bg-black/20 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold w-4 text-center ${
                        user.rank === 1 ? 'text-[#ccff00]' : 'text-white/40'
                      }`}>
                        #{user.rank}
                      </span>
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10">
                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-tight ${
                        user.isCurrentUser ? 'text-[#ccff00] font-black' : 'text-white/80'
                      }`}>
                        {user.username}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-black text-white">
                      {user.score} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-center">
              <p className="text-[9px] font-mono text-white/30 lowercase">
                updates dynamically at study termination.
              </p>
            </div>
          </div>

        </div>

      </div>

      {cameraError && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-black/95 border-2 border-red-500/40 text-white font-mono text-[10px] tracking-wider px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur max-w-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
            <div className="space-y-0.5">
              <span className="text-red-400 font-black uppercase block">SYS_CAMERA_ALERT:</span>
              <span className="text-white/80 font-sans font-light text-xs leading-normal">{cameraError}</span>
            </div>
            <button 
              onClick={() => setCameraError(null)} 
              className="text-white/40 hover:text-white shrink-0 ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
