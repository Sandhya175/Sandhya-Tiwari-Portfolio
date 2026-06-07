import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, HandLandmarker, DrawingUtils } from '@mediapipe/tasks-vision';
import { Loader2, RotateCcw, Trophy, Hand, Timer, ListOrdered, ArrowRight, User, Star, Wifi, WifiOff, X } from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

// --- UTILS & AUDIO ---
import { sysSynth } from '../utils/audio';

// --- FIREBASE INIT ---
// @ts-ignore
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

// Fallback empty config to prevent Firebase initialization crash if blank
const safeFirebaseConfig = firebaseConfig && firebaseConfig.apiKey ? firebaseConfig : {
  apiKey: "placeholder-key-for-development-offline",
  authDomain: "default-app-id.firebaseapp.com",
  projectId: "default-app-id",
  storageBucket: "default-app-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890"
};

const app = getApps().length > 0 ? getApp() : initializeApp(safeFirebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- GLOBAL CONFIG ---
// @ts-ignore
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- UTILS (from processing.ts) ---

/**
 * Captures the current video frame to an ImageData object.
 */
function captureFrame(video: HTMLVideoElement, width: number, height: number): ImageData {
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d');
  if (!ctx) throw new Error('Could not get context');
  
  // Draw video mirrored
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, width, height);
  
  return ctx.getImageData(0, 0, width, height);
}

/**
 * Generates the shuffled state for the puzzle.
 */
function generatePuzzleState(cols: number, rows: number) {
  const tiles = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      tiles.push({ 
        currentX: x, 
        currentY: y,
        origX: x, 
        origY: y, 
        id: y * cols + x 
      });
    }
  }
  
  // Fisher-Yates Shuffle
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  
  return tiles;
}

/**
 * Checks if the puzzle is solved
 */
function checkWinCondition(tiles: any[]) {
    return tiles.length > 0 && tiles.every((tile, index) => tile.id === index);
}

/**
 * Cyber background generator (for fallback / camera off mode)
 */
function drawCyberBackground(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  // Deep dark backing
  ctx.fillStyle = '#0a0a0e';
  ctx.fillRect(0, 0, width, height);

  // Digital matrices
  ctx.strokeStyle = 'rgba(204, 255, 0, 0.07)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Neon HUD elements
  ctx.strokeStyle = 'rgba(148, 0, 228, 0.18)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width/2, height/2, 110 + Math.sin(time / 400) * 12, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(width/2, height/2, 55 - Math.sin(time / 300) * 6, 0, Math.PI * 2);
  ctx.stroke();

  // Glowing circuit nodes
  ctx.strokeStyle = 'rgba(204, 255, 0, 0.25)';
  ctx.beginPath();
  ctx.moveTo(80, 80);
  ctx.lineTo(130, 130);
  ctx.lineTo(260, 130);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(227, 181, 255, 0.35)';
  ctx.beginPath();
  ctx.moveTo(width - 80, height - 80);
  ctx.lineTo(width - 130, height - 130);
  ctx.lineTo(width - 230, height - 130);
  ctx.stroke();

  // Text decorations
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.font = 'bold 11px monospace';
  ctx.fillText("MATRIX_PUZZLE_EMULATOR", 30, 45);
  ctx.fillText("ACTIVE_OFFLINE_READY_PROMPT", width - 210, height - 35);
  
  // Outer frame bindings
  ctx.strokeStyle = 'rgba(204, 255, 0, 0.2)';
  ctx.strokeRect(15, 15, width - 30, height - 30);

  // Rotating central grid
  ctx.save();
  ctx.translate(width/2, height/2);
  ctx.rotate(time / 800);
  ctx.fillStyle = '#ccff00';
  ctx.fillRect(-12, -12, 24, 24);
  ctx.restore();
}

/**
 * Renders the interactive puzzle game.
 */
function renderPuzzleGame(
  ctx: CanvasRenderingContext2D, 
  imageSource: HTMLCanvasElement, 
  tiles: any[], // The shuffled array
  cols: number, 
  rows: number, 
  destWidth: number, 
  destHeight: number,
  dragInfo: { index: number, x: number, y: number } | null, 
  hoverIndex: number | null 
) {
  const destTileW = destWidth / cols;
  const destTileH = destHeight / rows;
  const srcTileW = imageSource.width / cols;
  const srcTileH = imageSource.height / rows;

  // Fill background
  ctx.fillStyle = '#0f0f11';
  ctx.fillRect(0, 0, destWidth, destHeight);

  // Helper to draw a single tile
  const drawTile = (tile: any, dx: number, dy: number, width: number, height: number, isDragging: boolean = false) => {
      const srcCol = tile.origX;
      const srcRow = tile.origY;
      const sx = srcCol * srcTileW;
      const sy = srcRow * srcTileH;

      ctx.save();
      
      if (isDragging) {
          ctx.shadowColor = 'rgba(204, 255, 0, 0.4)';
          ctx.shadowBlur = 18;
          ctx.shadowOffsetY = 6;
          ctx.globalAlpha = 1.0;
          ctx.strokeStyle = '#ccff00'; 
          ctx.lineWidth = 3;
      } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
      }

      ctx.drawImage(imageSource, sx, sy, srcTileW, srcTileH, dx, dy, width, height);
      ctx.strokeRect(dx, dy, width, height);
      ctx.restore();
  };

  // 1. Draw grid (skipping the dragged tile)
  tiles.forEach((tile, currentIndex) => {
      const drawCol = currentIndex % cols;
      const drawRow = Math.floor(currentIndex / cols);
      const dx = drawCol * destTileW;
      const dy = drawRow * destTileH;

      if (dragInfo && dragInfo.index === currentIndex) {
          // Draw "hole" or dimmed version
          ctx.fillStyle = '#151518';
          ctx.fillRect(dx, dy, destTileW, destTileH);
          ctx.strokeStyle = 'rgba(255,255,255,0.05)';
          ctx.strokeRect(dx, dy, destTileW, destTileH);
      } else {
          // Normal tile
          if (dragInfo && hoverIndex === currentIndex) {
              ctx.save();
              ctx.globalAlpha = 0.55;
              drawTile(tile, dx, dy, destTileW, destTileH);
              ctx.fillStyle = 'rgba(204, 255, 0, 0.25)'; 
              ctx.fillRect(dx, dy, destTileW, destTileH);
              ctx.strokeStyle = '#ccff00'; 
              ctx.lineWidth = 2.5;
              ctx.strokeRect(dx, dy, destTileW, destTileH);
              ctx.restore();
          } else {
              drawTile(tile, dx, dy, destTileW, destTileH);
          }
      }
  });

  // 2. Draw dragged tile on top
  if (dragInfo) {
      const tile = tiles[dragInfo.index];
      const dragW = destTileW * 1.1; 
      const dragH = destTileH * 1.1;
      const dx = dragInfo.x - (dragW / 2);
      const dy = dragInfo.y - (dragH / 2);
      
      drawTile(tile, dx, dy, dragW, dragH, true);
  }
}

// --- CONSTANTS ---
const PINCH_THRESHOLD = 0.05; 
const FRAME_THRESHOLD = 0.1;
const RESET_DWELL_MS = 1500; 

// Game Constants
const ROWS = 3;
const COLS = 3;

type GameState = 'SCANNING' | 'PLAYING' | 'SOLVED' | 'LEADERBOARD';

type LeaderboardEntry = {
  id?: string;
  name: string;
  time: number;
  date: number;
};

// --- COMPONENT: GestureCamera ---

const GestureCamera: React.FC = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [gameState, setGameState] = useState<GameState>('SCANNING');
  const [error, setError] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCameraOff, setIsCameraOff] = useState(true); // Default to camera off to guarantee direct play on compile!

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try {
        const cached = localStorage.getItem('live-puzzle-leaderboard-cache');
        return cached ? JSON.parse(cached) : [];
    } catch (e) {
        return [];
    }
  });

  const [playerName, setPlayerName] = useState('');
  const [personalBest, setPersonalBest] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Firebase User State
  const [user, setUser] = useState<FirebaseUser | null>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const requestRef = useRef<number>(null);
  
  // Game Data
  const puzzleTilesRef = useRef<any[]>([]);
  const puzzleImageCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameBoardCoordsRef = useRef<{minX: number, maxX: number, minY: number, maxY: number} | null>(null);
  
  // Mouse Interaction fallbacks for Camera Off
  const mousePtrRef = useRef<{x: number, y: number, isDown: boolean}>({ x: 0, y: 0, isDown: false });

  // Interaction State
  const smoothCursorRef = useRef<{x: number, y: number}>({x: 0, y: 0});
  const dragRef = useRef<{isDragging: boolean, tileIndex: number | null}>({ isDragging: false, tileIndex: null });
  const lastPinchTimeRef = useRef<number>(0);
  const lastFrameCoordsRef = useRef<any>(null); 
  const fistHoldStartRef = useRef<number | null>(null); 

  // --- 1. AUTHENTICATION & LOCAL PREFS ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        // @ts-ignore
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          // @ts-ignore
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.warn("Anonymously Authenticating offline-fallback status triggered.");
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);

    // Load Local Prefs
    const storedName = localStorage.getItem('live-puzzle-player-name');
    if (storedName) setPlayerName(storedName);

    const storedBest = localStorage.getItem('live-puzzle-personal-best');
    if (storedBest) setPersonalBest(parseInt(storedBest));
    
    return () => unsubscribe();
  }, []);

  // --- 2. LEADERBOARD DATA EFFECT (REAL-TIME) ---
  useEffect(() => {
    if (!user) return; // Wait for auth

    const leaderboardRef = collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard');
    
    setIsConnected(false);
    
    const unsubscribe = onSnapshot(leaderboardRef, (snapshot) => {
        setIsConnected(true);
        const scores: LeaderboardEntry[] = [];
        snapshot.forEach((doc) => {
            scores.push({ id: doc.id, ...doc.data() } as LeaderboardEntry);
        });

        scores.sort((a, b) => a.time - b.time);
        const topScores = scores.slice(0, 10);
        setLeaderboard(topScores);
        
        localStorage.setItem('live-puzzle-leaderboard-cache', JSON.stringify(topScores));

    }, (err) => {
        console.warn("Failed to fetch online leaderboard, using local storage state fallback.");
        setIsConnected(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Initialize MediaPipe only on demand if webcam is on
  useEffect(() => {
    if (isCameraOff) {
      setModelLoaded(true);
      return;
    }
    
    const initMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 2 
        });
        
        setModelLoaded(true);
      } catch (err) {
        console.error(err);
        setError("AI Model failed to load. Ensure you have network connectivity.");
      }
    };
    initMediaPipe();
  }, [isCameraOff]);

  // Initialize Camera / Web stream toggles
  useEffect(() => {
    if (isCameraOff) {
      setCameraReady(true);
      return;
    }

    const startCamera = async () => {
      if (!videoRef.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }
        });
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => setCameraReady(true));
        };
      } catch (err) {
        // If webcam denied/error inside sandbox, gracefully pivot to camera off simulation automatically
        setError("Webcam feed restricted or inactive inside sandboxed browser frames. Activating high-performance simulator mode...");
        setTimeout(() => {
          setIsCameraOff(true);
          setError(null);
          setCameraReady(true);
          setModelLoaded(true);
        }, 1800);
      }
    };
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOff]);

  // Timer Logic
  useEffect(() => {
    let interval: number;
    if (gameState === 'PLAYING') {
        const startTime = Date.now();
        interval = window.setInterval(() => {
            setTimeElapsed(Date.now() - startTime);
        }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const resetGame = () => {
      sysSynth.playBeep(400, 0.1, 'triangle');
      setGameState('SCANNING');
      puzzleTilesRef.current = [];
      dragRef.current = { isDragging: false, tileIndex: null };
      gameBoardCoordsRef.current = null;
      fistHoldStartRef.current = null;
      setTimeElapsed(0);
      setIsSubmitting(false);
  };

  const submitScore = async () => {
      if (!playerName.trim() || isSubmitting) return;
      
      setIsSubmitting(true);
      const cleanName = playerName.trim().toUpperCase();

      localStorage.setItem('live-puzzle-player-name', cleanName);
      
      if (personalBest === null || timeElapsed < personalBest) {
          setPersonalBest(timeElapsed);
          localStorage.setItem('live-puzzle-personal-best', timeElapsed.toString());
      }

      const newEntry: LeaderboardEntry = {
          name: cleanName,
          time: timeElapsed,
          date: Date.now()
      };

      try {
          if (isConnected) {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'leaderboard'), newEntry);
          } else {
            const currentCache = [...leaderboard, newEntry].sort((a,b) => a.time - b.time);
            setLeaderboard(currentCache);
            localStorage.setItem('live-puzzle-leaderboard-cache', JSON.stringify(currentCache));
          }
          sysSynth.playLevelUp();
          setGameState('LEADERBOARD');
      } catch (e) {
          console.error("Error saving score:", e);
          const currentCache = [...leaderboard, newEntry].sort((a,b) => a.time - b.time);
          setLeaderboard(currentCache);
          setGameState('LEADERBOARD');
      } finally {
          setIsSubmitting(false);
      }
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Snaps / crops cyber design to generate game grid in simulation mode
   */
  const triggerSimulatorCapture = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    sysSynth.playSuccess();

    const sw = 330;
    const sh = 330;
    const sx = canvas.width / 2 - sw / 2;
    const sy = canvas.height / 2 - sh / 2;

    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = sw * 2;
    cropCanvas.height = sh * 2;
    const cropCtx = cropCanvas.getContext('2d');
    
    if (cropCtx) {
      drawCyberBackground(cropCtx, sw*2, sh*2, performance.now());
      cropCtx.fillStyle = 'rgba(0,0,0,0.15)';
      cropCtx.fillRect(0, 0, sw*2, sh*2);
      
      cropCtx.strokeStyle = '#ccff00';
      cropCtx.lineWidth = 14;
      cropCtx.strokeRect(0, 0, sw*2, sh*2);

      // Add cool grid lines as hints
      cropCtx.strokeStyle = 'rgba(255,255,255,0.4)';
      cropCtx.lineWidth = 3;
      cropCtx.beginPath();
      cropCtx.moveTo(sw, 0); cropCtx.lineTo(sw, sh*2);
      cropCtx.moveTo(0, sh); cropCtx.lineTo(sw*2, sh);
      cropCtx.stroke();
    }
    
    puzzleImageCanvasRef.current = cropCanvas;
    puzzleTilesRef.current = generatePuzzleState(COLS, ROWS);
    gameBoardCoordsRef.current = {
      minX: sx / canvas.width,
      maxX: (sx + sw) / canvas.width,
      minY: sy / canvas.height,
      maxY: (sy + sh) / canvas.height
    };
    
    setGameState('PLAYING');
  }, []);

  // --- MOUSE & TAP LISTENERS FOR SIMULATOR PLAYING ---
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    mousePtrRef.current = { x, y, isDown: true };

    if (isCameraOff && gameState === 'SCANNING') {
       triggerSimulatorCapture();
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    mousePtrRef.current.x = x;
    mousePtrRef.current.y = y;
  };

  const handleCanvasMouseUp = () => {
    mousePtrRef.current.isDown = false;
  };

  // Main Render Loop
  const renderLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const landmarker = handLandmarkerRef.current;

    if (!canvas || !cameraReady) return;

    if (canvas.width !== 640 || canvas.height !== 480) {
      canvas.width = 640;
      canvas.height = 480;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const time = performance.now();

    // Clear
    ctx.clearRect(0, 0, width, height);

    if (isCameraOff) {
      // --- RENDER PATH: CAMERA OFF (SIMULATOR) ---
      drawCyberBackground(ctx, width, height, time);

      // SCANNING MODE HUD (If camera is off)
      if (gameState === 'SCANNING') {
         // Render simulated framing corners
         const sx = width / 2 - 165;
         const sy = height / 2 - 165;
         const sw = 330;
         const sh = 330;

         ctx.strokeStyle = '#ccff00';
         ctx.lineWidth = 4;
         ctx.strokeRect(sx, sy, sw, sh);

         ctx.fillStyle = "rgba(204, 255, 0, 0.1)";
         ctx.fillRect(sx, sy, sw, sh);

         ctx.fillStyle = "#ccff00";
         ctx.font = "bold 13px monospace";
         ctx.textAlign = "center";
         ctx.fillText("TAP OR CLICK CANVAS TO CAPTURE FLOW", width/2, sy - 15);
         ctx.font = "9px monospace";
         ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
         ctx.fillText("[MOUSE WORKOUT SIMULATION MODE]", width/2, sy + sh + 30);
      }

      // PLAYING OR SOLVED MODE (If camera is off)
      else if ((gameState === 'PLAYING' || gameState === 'SOLVED') && puzzleImageCanvasRef.current && gameBoardCoordsRef.current) {
         const c = gameBoardCoordsRef.current;
         const boardSX = c.minX * width;
         const boardSY = c.minY * height;
         const boardW = (c.maxX - c.minX) * width;
         const boardH = (c.maxY - c.minY) * height;

         let hoverIndex = null;
         let isPinching = mousePtrRef.current.isDown;
         let cursorX = mousePtrRef.current.x;
         let cursorY = mousePtrRef.current.y;

         // Smooth cursor positioning
         const alpha = 0.6;
         smoothCursorRef.current.x = smoothCursorRef.current.x * (1 - alpha) + cursorX * alpha;
         smoothCursorRef.current.y = smoothCursorRef.current.y * (1 - alpha) + cursorY * alpha;

         const finalCursorX = smoothCursorRef.current.x;
         const finalCursorY = smoothCursorRef.current.y;

         const relX = finalCursorX - boardSX;
         const relY = finalCursorY - boardSY;

         if (relX >= 0 && relX <= boardW && relY >= 0 && relY <= boardH) {
             const col = Math.floor(relX / (boardW / COLS));
             const row = Math.floor(relY / (boardH / ROWS));
             if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
                 hoverIndex = row * COLS + col;
             }
         }

         if (gameState === 'PLAYING') {
             if (isPinching) {
                 if (!dragRef.current.isDragging) {
                     if (hoverIndex !== null) {
                         sysSynth.playBeep(600, 0.05, 'sine');
                         dragRef.current = { isDragging: true, tileIndex: hoverIndex };
                     }
                 } 
             } else {
                 if (dragRef.current.isDragging) {
                     const startIndex = dragRef.current.tileIndex;
                     const endIndex = hoverIndex;

                     if (startIndex !== null && endIndex !== null && startIndex !== endIndex) {
                         const newTiles = [...puzzleTilesRef.current];
                         [newTiles[startIndex], newTiles[endIndex]] = [newTiles[endIndex], newTiles[startIndex]];
                         puzzleTilesRef.current = newTiles;
                         
                         sysSynth.playConfirm();
                         
                         if (checkWinCondition(newTiles)) {
                             setGameState('SOLVED');
                             sysSynth.playSuccess();
                         }
                     }
                     dragRef.current = { isDragging: false, tileIndex: null };
                 }
             }
         }

         ctx.save();
         ctx.translate(boardSX, boardSY);
         
         renderPuzzleGame(
             ctx, 
             puzzleImageCanvasRef.current, 
             puzzleTilesRef.current, 
             COLS, 
             ROWS, 
             boardW, 
             boardH, 
             dragRef.current.isDragging && dragRef.current.tileIndex !== null ? { 
                 index: dragRef.current.tileIndex,
                 x: relX,
                 y: relY
             } : null, 
             hoverIndex
         );
         
         ctx.strokeStyle = '#ffffff';
         ctx.lineWidth = 4;
         ctx.strokeRect(0, 0, boardW, boardH);
         ctx.restore();

         // Draw Mouse Drag indicator dot
         ctx.beginPath();
         ctx.arc(finalCursorX, finalCursorY, 8, 0, Math.PI * 2);
         if (dragRef.current.isDragging) {
             ctx.fillStyle = '#ccff00';
             ctx.fill();
         } else {
             ctx.strokeStyle = '#ccff00';
             ctx.lineWidth = 2;
             ctx.stroke();
         }
      }
    } else {
      // --- RENDER PATH: CAMERA ON (WEBCAM TRACKING) ---
      if (!video) return;
      if (video.readyState >= 2) {
        ctx.save();
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, width, height);
        ctx.restore();

        let results = null;
        if (landmarker && modelLoaded) {
            results = landmarker.detectForVideo(video, performance.now());
        }

        if (gameState === 'SCANNING' || gameState === 'LEADERBOARD') {
            let validFrame = false;

            if (gameState === 'SCANNING') {
                if (results && results.landmarks && results.landmarks.length === 2) {
                  const h1 = results.landmarks[0];
                  const h2 = results.landmarks[1];
                  
                  const d1 = Math.hypot(h1[8].x - h1[4].x, h1[8].y - h1[4].y);
                  const d2 = Math.hypot(h2[8].x - h2[4].x, h2[8].y - h2[4].y);

                  if (d1 > FRAME_THRESHOLD && d2 > FRAME_THRESHOLD) {
                      const allX = [h1[8].x, h1[4].x, h2[8].x, h2[4].x];
                      const allY = [h1[8].y, h1[4].y, h2[8].y, h2[4].y];
                      lastFrameCoordsRef.current = {
                          minX: Math.min(...allX), maxX: Math.max(...allX),
                          minY: Math.min(...allY), maxY: Math.max(...allY)
                      };
                      validFrame = true;
                  } 
                  
                  if (d1 < PINCH_THRESHOLD && d2 < PINCH_THRESHOLD && lastFrameCoordsRef.current) {
                      const now = Date.now();
                      if (now - lastPinchTimeRef.current > 1000) {
                          lastPinchTimeRef.current = now;
                          sysSynth.playSuccess();
                          
                          const fullFrame = captureFrame(video, width, height);
                          
                          const c = lastFrameCoordsRef.current;
                          const sx = (1 - c.maxX) * width;
                          const sy = c.minY * height;
                          const sw = ((1 - c.minX) * width) - sx;
                          const sh = (c.maxY * height) - sy;

                          if (sw > 0 && sh > 0) {
                              const cropCanvas = document.createElement('canvas');
                              cropCanvas.width = sw * 2;
                              cropCanvas.height = sh * 2;
                              const cropCtx = cropCanvas.getContext('2d');
                              
                              const tempC = document.createElement('canvas');
                              tempC.width = width;
                              tempC.height = height;
                              tempC.getContext('2d')?.putImageData(fullFrame, 0, 0);
                              
                              if (cropCtx) {
                                  cropCtx.drawImage(tempC, sx, sy, sw, sh, 0, 0, cropCanvas.width, cropCanvas.height);
                              }
                              
                              puzzleImageCanvasRef.current = cropCanvas;
                              puzzleTilesRef.current = generatePuzzleState(COLS, ROWS);
                              gameBoardCoordsRef.current = {
                                minX: sx / width,
                                maxX: (sx + sw) / width,
                                minY: sy / height,
                                maxY: (sy + sh) / height
                              };
                              setGameState('PLAYING');
                          }
                      }
                  }
                }

                if (lastFrameCoordsRef.current && validFrame) {
                   const c = lastFrameCoordsRef.current;
                   const sx = (1 - c.maxX) * width;
                   const ex = (1 - c.minX) * width;
                   const sy = c.minY * height;
                   const ey = c.maxY * height;
                   
                   ctx.strokeStyle = '#ccff00';
                   ctx.lineWidth = 4;
                   ctx.strokeRect(sx, sy, ex-sx, ey-sy);
                   
                   ctx.fillStyle = "#ccff00";
                   ctx.font = "bold 13px monospace";
                   ctx.fillText("PINCH TO CAPTURE", sx, sy - 8);
                }
            }
        }

        else if ((gameState === 'PLAYING' || gameState === 'SOLVED') && puzzleImageCanvasRef.current && gameBoardCoordsRef.current) {
            const c = gameBoardCoordsRef.current;
            const boardSX = c.minX * width;
            const boardSY = c.minY * height;
            const boardW = (c.maxX - c.minX) * width;
            const boardH = (c.maxY - c.minY) * height;

            let hoverIndex = null;
            let isPinching = false;
            let rawPointerX = 0;
            let rawPointerY = 0;
            let interactingHand = null;

            if (results && results.landmarks && results.landmarks.length > 0) {
                const hand = results.landmarks[0];
                interactingHand = hand;
                const indexTip = hand[8];
                const thumbTip = hand[4];
                
                rawPointerX = (1 - ((indexTip.x + thumbTip.x) / 2)) * width;
                rawPointerY = ((indexTip.y + thumbTip.y) / 2) * height;

                const dist = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);
                isPinching = dist < PINCH_THRESHOLD;

                const distMove = Math.hypot(rawPointerX - smoothCursorRef.current.x, rawPointerY - smoothCursorRef.current.y);
                const alpha = distMove > 100 ? 1 : 0.4; 
                smoothCursorRef.current.x = smoothCursorRef.current.x * (1 - alpha) + rawPointerX * alpha;
                smoothCursorRef.current.y = smoothCursorRef.current.y * (1 - alpha) + rawPointerY * alpha;
            }

            const cursorX = smoothCursorRef.current.x;
            const cursorY = smoothCursorRef.current.y;

            const relX = cursorX - boardSX;
            const relY = cursorY - boardSY;
            
            if (relX >= 0 && relX <= boardW && relY >= 0 && relY <= boardH) {
                const col = Math.floor(relX / (boardW / COLS));
                const row = Math.floor(relY / (boardH / ROWS));
                if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
                    hoverIndex = row * COLS + col;
                }
            }

            if (gameState === 'PLAYING') {
                if (isPinching) {
                    if (!dragRef.current.isDragging) {
                        if (hoverIndex !== null) {
                            sysSynth.playBeep(600, 0.05, 'sine');
                            dragRef.current = { isDragging: true, tileIndex: hoverIndex };
                        }
                    } 
                } else {
                    if (dragRef.current.isDragging) {
                        const startIndex = dragRef.current.tileIndex;
                        const endIndex = hoverIndex;

                        if (startIndex !== null && endIndex !== null && startIndex !== endIndex) {
                            const newTiles = [...puzzleTilesRef.current];
                            [newTiles[startIndex], newTiles[endIndex]] = [newTiles[endIndex], newTiles[startIndex]];
                            puzzleTilesRef.current = newTiles;
                            
                            sysSynth.playConfirm();
                            
                            if (checkWinCondition(newTiles)) {
                                setGameState('SOLVED');
                                sysSynth.playSuccess();
                            }
                        }
                        dragRef.current = { isDragging: false, tileIndex: null };
                    }
                }
            }

            ctx.save();
            ctx.translate(boardSX, boardSY);
            
            renderPuzzleGame(
                ctx, 
                puzzleImageCanvasRef.current, 
                puzzleTilesRef.current, 
                COLS, 
                ROWS, 
                boardW, 
                boardH, 
                dragRef.current.isDragging && dragRef.current.tileIndex !== null ? { 
                    index: dragRef.current.tileIndex,
                    x: relX,
                    y: relY
                } : null, 
                hoverIndex
            );
            
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 4;
            ctx.strokeRect(0, 0, boardW, boardH);
            ctx.restore();

            if (results && results.landmarks && results.landmarks.length > 0) {
                ctx.beginPath();
                ctx.arc(cursorX, cursorY, 10, 0, Math.PI * 2);
                if (dragRef.current.isDragging) {
                    ctx.fillStyle = '#ccff00';
                } else {
                    ctx.strokeStyle = '#ccff00';
                    ctx.lineWidth = 2;
                }
                
                if (dragRef.current.isDragging) ctx.fill();
                else ctx.stroke();
            }

            let isFist = false;
            if (interactingHand) {
              const wrist = interactingHand[0];
              const tips = [8, 12, 16, 20];
              const pips = [6, 10, 14, 18]; 

              const closedFingers = tips.filter((tipIdx, i) => {
                const tip = interactingHand[tipIdx];
                const pip = interactingHand[pips[i]];
                const dTip = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
                const dPip = Math.hypot(pip.x - wrist.x, pip.y - wrist.y);
                return dTip < dPip;
              });
              
              isFist = closedFingers.length === 4;
            }

            if (isFist && gameState === 'PLAYING') {
                if (!fistHoldStartRef.current) {
                    fistHoldStartRef.current = performance.now();
                }
                const elapsed = performance.now() - fistHoldStartRef.current;
                const progress = Math.min(elapsed / RESET_DWELL_MS, 1);

                const cx = width / 2;
                const cy = height / 2;
                
                ctx.save();
                ctx.beginPath();
                ctx.arc(cx, cy, 50, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(cx, cy, 50, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * progress));
                ctx.strokeStyle = '#ccff00';
                ctx.lineWidth = 6;
                ctx.lineCap = 'round';
                ctx.stroke();

                ctx.fillStyle = "white";
                ctx.font = "bold 13px monospace";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("RESETTING", cx, cy - 5);
                ctx.font = "10px monospace";
                ctx.fillText("Hold Fist", cx, cy + 10);
                ctx.restore();

                if (elapsed > RESET_DWELL_MS) {
                    resetGame();
                }
            } else {
                fistHoldStartRef.current = null;
            }
        }

        if (results && results.landmarks && gameState !== 'LEADERBOARD') {
          const drawingUtils = new DrawingUtils(ctx);
          for (const landmarks of results.landmarks) {
             ctx.save();
             ctx.translate(width, 0);
             ctx.scale(-1, 1);
             
             drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { 
                 color: "rgba(255, 255, 255, 0.45)", 
                 lineWidth: 2 
             });
             
             drawingUtils.drawLandmarks(landmarks, { 
                 color: "#ccff00", 
                 radius: 2,
                 lineWidth: 1
             });
             
             ctx.restore();
          }
        }
      }
    }

    requestRef.current = requestAnimationFrame(renderLoop);
  }, [cameraReady, modelLoaded, gameState, leaderboard, isConnected, user, isCameraOff, triggerSimulatorCapture]);

  // Start Loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(renderLoop);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [renderLoop]);

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden rounded-2xl border border-white/5">
      <video ref={videoRef} className="hidden" playsInline muted autoPlay />
      <canvas 
        ref={canvasRef} 
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
        className="absolute inset-0 w-full h-full object-cover mx-auto cursor-crosshair" 
      />

      {/* Dynamic Camera Use Indicator & Switcher */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-black/90 p-1.5 rounded-full border border-white/10 shadow-2xl backdrop-blur pointer-events-auto">
         <button
           onClick={() => {
             sysSynth.playBeep(650, 0.05, 'sine');
             setIsCameraOff(false);
             setError(null);
             setCameraReady(false);
           }}
           className={`px-3 py-1 text-[9px] font-mono font-bold tracking-wider uppercase transition-all rounded-full cursor-pointer ${!isCameraOff ? 'bg-[#ccff00] text-black font-extrabold' : 'text-white/50 hover:text-white'}`}
         >
           🎥 Webcam
         </button>
         <button
           onClick={() => {
             sysSynth.playBeep(500, 0.05, 'triangle');
             setIsCameraOff(true);
             setError(null);
             setCameraReady(true);
             setModelLoaded(true);
           }}
           className={`px-3 py-1 text-[9px] font-mono font-bold tracking-wider uppercase transition-all rounded-full cursor-pointer ${isCameraOff ? 'bg-[#ccff00] text-black font-extrabold' : 'text-white/50 hover:text-white'}`}
         >
           🖱️ Camera OFF
         </button>
      </div>

      {/* Timer Display */}
      {gameState === 'PLAYING' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/90 text-white px-4 py-2 rounded-full border border-white/10 shadow-2xl backdrop-blur animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
             <Timer className="w-4 h-4 text-[#ccff00] animate-pulse" />
             <span className="font-bold tracking-wider text-sm">{formatTime(timeElapsed)}</span>
        </div>
      )}

      {/* View Leaderboard Button */}
      {gameState === 'SCANNING' && (
        <button 
          onClick={() => {
            sysSynth.playBeep(800, 0.05, 'sine');
            setGameState('LEADERBOARD');
          }}
          className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-zinc-900/90 text-white px-4 py-2 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors cursor-pointer pointer-events-auto shadow-lg"
        >
           <ListOrdered className="w-4 h-4 text-[#ccff00]" />
           <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Leaderboard</span>
        </button>
      )}

      {/* Instructions Overlay */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2 pointer-events-none">
          <div className="text-[10px] text-white/70 bg-black/85 p-3 rounded-xl backdrop-blur border border-white/5 text-right shadow-2xl font-mono">
             {gameState === 'SCANNING' && (
                 <>
                    <p className="font-bold text-[#ccff00] mb-1">SNAP IMAGE</p>
                    {isCameraOff ? (
                       <p className="text-[#ccff00]/80">TAP WORKSPACE TO SNAP HUD</p>
                    ) : (
                       <>
                          <p>1. Crop with your physical hands</p>
                          <p>2. Pinch both hands to SNAP</p>
                       </>
                    )}
                 </>
             )}
             {gameState === 'PLAYING' && (
                 <>
                    <p className="font-bold text-[#ccff00] mb-1">SWAP TILES TO SOLVE</p>
                    {isCameraOff ? (
                       <p>Hold Click to drag and drop</p>
                    ) : (
                       <>
                          <p>1. Pinch to Pick Up tile</p>
                          <p>2. Move & release to swap</p>
                       </>
                    )}
                    <p className="text-purple-400 mt-2 font-black">// TARGET: ASCENDING ORDER</p>
                 </>
             )}
             {gameState === 'SOLVED' && (
                 <p className="font-bold text-[#ccff00]">PUZZLE SOLVED!</p>
             )}
             {gameState === 'LEADERBOARD' && (
                 <p className="font-bold text-[#ccff00]">TOP SCIENTIFIC HIGHS</p>
             )}
          </div>
      </div>

      {/* Solved / Submit Score Overlay */}
      {gameState === 'SOLVED' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/90 backdrop-blur-md animate-in fade-in duration-500 font-mono">
               <Trophy className="w-16 h-16 text-[#ccff00] drop-shadow-lg mb-4 animate-bounce" />
               <h2 className="text-2xl font-headline font-black text-white mb-2 tracking-widest uppercase">COMPLETE!</h2>
               <div className="flex items-center gap-2 mb-8 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                   <Timer className="w-4 h-4 text-[#ccff00]" />
                   <span className="text-xl font-bold text-white">{formatTime(timeElapsed)}</span>
               </div>
               
               <div className="flex flex-col items-center gap-4 w-full max-w-xs px-6">
                   <p className="text-zinc-400 text-[10px] text-center uppercase tracking-widest">Enter name for continuous integration</p>
                   <div className="flex items-center gap-2 w-full">
                      <div className="relative flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-1">
                         <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                         <input 
                             type="text" 
                             placeholder="PLAYER"
                             maxLength={10}
                             value={playerName}
                             onChange={(e) => setPlayerName(e.target.value)}
                             className="w-full bg-transparent text-center text-sm text-white outline-none py-1.5 pl-6 font-bold tracking-widest uppercase placeholder:text-zinc-700 pointer-events-auto"
                             onKeyDown={(e) => e.key === 'Enter' && submitScore()}
                             autoFocus
                         />
                      </div>
                      <button 
                         onClick={submitScore}
                         disabled={!playerName.trim() || isSubmitting}
                         className="bg-[#ccff00] hover:bg-lime-400 disabled:opacity-50 disabled:cursor-not-allowed text-black p-2.5 rounded-xl transition-all cursor-pointer pointer-events-auto shrink-0 flex items-center justify-center"
                      >
                         {isSubmitting ? (
                            <Loader2 size={16} className="animate-spin" />
                         ) : (
                            <ArrowRight size={16} />
                         )}
                      </button>
                   </div>
               </div>

               <div className="mt-8 flex gap-4">
                  <button 
                     onClick={resetGame}
                     className="text-white/40 hover:text-white text-xs underline cursor-pointer pointer-events-auto"
                  >
                     Skip & Restart Trial
                  </button>
               </div>
          </div>
      )}

      {/* Leaderboard Screen */}
      {gameState === 'LEADERBOARD' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 font-mono">
             <div className="w-full max-w-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ListOrdered className="w-5 h-5 text-[#ccff00]" />
                        <h2 className="text-sm font-black text-white tracking-widest uppercase">Leaderboard</h2>
                    </div>
                    {/* Live Indicator */}
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                         {isConnected ? (
                             <>
                                <Wifi className="w-2.5 h-2.5 text-green-400" />
                                <span className="text-[8px] text-green-400 font-bold">LIVE_SYNC</span>
                             </>
                         ) : (
                             <>
                                <WifiOff className="w-2.5 h-2.5 text-white/30" />
                                <span className="text-[8px] text-white/30 font-bold">LOCAL_DB</span>
                             </>
                         )}
                    </div>
                </div>

                <div className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden max-h-[35vh] overflow-y-auto custom-scrollbar relative">
                    {leaderboard.length === 0 ? (
                        <div className="p-8 text-center text-zinc-500 font-mono text-[10px]">
                            {isConnected ? (
                                <p>No records in this database lobby.<br/>Be the first!</p>
                            ) : (
                                <div className="flex flex-col items-center gap-2 justify-center">
                                    <Loader2 className="w-5 h-5 animate-spin text-[#ccff00]" />
                                    <span>Syncing with master records...</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 text-[9px] text-zinc-400 font-bold uppercase tracking-wider sticky top-0 backdrop-blur-md">
                                <span>Rank</span>
                                <span>Player</span>
                                <span>Time</span>
                            </div>
                            {leaderboard.map((entry, i) => (
                                <div key={entry.id || i} className={`flex items-center justify-between px-4 py-2 text-xs transition-colors ${entry.name === playerName ? 'bg-[#ccff00]/10' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <span className={`font-bold w-4 ${i === 0 ? 'text-[#ccff00]' : 'text-white/40'}`}>
                                            #{i + 1}
                                        </span>
                                        <span className={`font-bold uppercase tracking-widest ${entry.name === playerName ? 'text-[#ccff00]' : 'text-white/85'}`}>{entry.name}</span>
                                    </div>
                                    <span className="text-[#ccff00] font-bold">{formatTime(entry.time)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Personal Best Section */}
                {personalBest !== null && (
                    <div className="bg-[#ccff00]/5 rounded-2xl p-3 border border-[#ccff00]/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#ccff00]" fill="currentColor" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Your Personal Best</span>
                        </div>
                        <span className="font-bold text-sm text-[#ccff00]">{formatTime(personalBest)}</span>
                    </div>
                )}
                
                <div className="flex justify-center pt-2">
                    <button 
                        onClick={resetGame}
                        className="bg-[#ccff00] hover:bg-lime-400 text-black text-xs font-black py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all hover:scale-102 cursor-pointer uppercase tracking-widest shadow-lg shadow-[#ccff00]/10"
                    >
                        <RotateCcw size={14} /> Resume Trial
                    </button>
                </div>
             </div>
          </div>
      )}

      {/* Reset Button (Always visible in game mode) */}
      {gameState === 'PLAYING' && (
          <button 
            onClick={resetGame}
            className="absolute bottom-6 left-6 z-20 bg-zinc-900/90 hover:bg-zinc-800 text-white p-3 rounded-full border border-white/10 transition-colors pointer-events-auto cursor-pointer shadow-xl"
            title="Reset Game"
          >
              <RotateCcw size={18} />
          </button>
      )}

      {/* Hand Hint Icon */}
      {gameState === 'PLAYING' && (
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 text-white/50 text-[10px] pointer-events-none font-mono">
              <Hand className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>{isCameraOff ? "Drag tiles with left-click" : "Use Index+Thumb Pinch"}</span>
          </div>
      )}

      {/* Loaders & Errors */}
      {!cameraReady && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-white z-20 font-mono">
          <Loader2 className="w-8 h-8 animate-spin text-[#ccff00] mb-3" />
          <p className="text-[10px] tracking-widest uppercase text-white/60">Booting Workspace Feed...</p>
        </div>
      )}
      {cameraReady && !modelLoaded && !error && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/85 backdrop-blur px-3 py-1.5 rounded-full border border-[#ccff00]/20 font-mono">
             <Loader2 className="w-3 h-3 animate-spin text-[#ccff00]" />
             <span className="text-[9px] uppercase tracking-wider text-[#ccff00]">Calibrating AI Models...</span>
        </div>
      )}
       {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 text-red-400 z-30 p-4 text-center font-mono space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
             <WifiOff className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-1 max-w-xs">
             <p className="font-headline font-black text-xs uppercase tracking-widest text-red-500">SYS_STREAM_ERROR</p>
             <p className="text-[10px] text-white/50 leading-relaxed font-sans">{error}</p>
          </div>
          <button 
             onClick={() => window.location.reload()} 
             className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold tracking-widest uppercase cursor-pointer"
          >
             Re-Initialize System
          </button>
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: App (Layout Wrapper) ---

export default function GameView() {
  return (
    <div id="gesture-game-panel" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
      
      {/* SaaS Product Intro Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.04] to-[#050505]/85 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-l from-[#ccff00]/5 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20">
              ACCESSIBILITY RESEARCH LAB_
            </span>
            <span className="text-[10px] text-white/30">V3.5_LIVE_PUZZLE</span>
          </div>
          <h1 className="text-xl md:text-2xl font-headline font-black text-white uppercase tracking-tight">
            LIVE GESTURE IMAGE PUZZLE
          </h1>
          <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
            Form a physical camera frame with your hands to snap a part of your webcam feed, or toggle the <strong>Camera Off</strong> switcher to play on a gorgeous cybernetic vector stream with your mouse! Swap image tiles to recreate the structured panel and reach the global leaderboard.
          </p>
        </div>
      </div>

      <div className="relative w-full h-[65vh] bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <GestureCamera />
      </div>
    </div>
  );
}
