import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseVx: number;
  baseVy: number;
}

export default function PlexusAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 320, height: 320 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, active: false });

  // Multiple image source attempts to bulletproof image loading
  const imageSources = [
    '/assets/Sandhya_portfolio_image.png',
    '/assets/sandhya_portfolio_image.png',
    '/assets/sandhya.png',
    // Fallback to the known working hosted portrait we located via grep
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBtNqkdHOBENf5YppjXawuRZl6OPt0HbvDC1PPSAEsogKe_8ywl38VWZO-A0CEabprDG6blETM5sso99mYT88U5ByKqwl28K5UCHh7RCJQnPUUfPZqm4sA2VLFz_PXT3RRnt1T954CdeoZLJ8yGWhP_NzqDuIw3ZZw1MJ7-7vyccdooc_amtZ2wM7FhmwnD5UEkffmTO0PNFqeh2HiZpkxZE1qv5Je8d82SUwKUmMiyIAuRjqKpH_1vyU5MR8xFldnguh3k5rYwDdg'
  ];
  const [imgSrcIndex, setImgSrcIndex] = useState(0);

  const handleImageError = () => {
    if (imgSrcIndex < imageSources.length - 1) {
      setImgSrcIndex((prev) => prev + 1);
    }
  };

  // Observe container size to adapt canvas dimensions exactly
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height: height || 320 });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Plexus simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const particleCount = 55;
    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const vx = (Math.random() * 0.6 - 0.3);
      const vy = (Math.random() * 0.6 - 0.3);
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 1.5 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Boost speeds when hovering the core
      const speedMultiplier = isHovered ? 2.5 : 1.0;
      const connectionDistance = 75;

      // Update positions
      particles.forEach((p) => {
        p.vx = p.baseVx * speedMultiplier;
        p.vy = p.baseVy * speedMultiplier;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce back boundaries
        if (p.x < 0) { p.x = 0; p.baseVx *= -1; }
        if (p.x > dimensions.width) { p.x = dimensions.width; p.baseVx *= -1; }
        if (p.y < 0) { p.y = 0; p.baseVy *= -1; }
        if (p.y > dimensions.height) { p.y = dimensions.height; p.baseVy *= -1; }

        // Magnetic attraction to cursor if active
        if (mousePos.active) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            // Apply slight gravitational force
            p.x += (dx / dist) * 0.35;
            p.y += (dy / dist) * 0.35;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? 'rgba(204, 255, 0, 0.5)' : 'rgba(148, 0, 228, 0.4)';
        ctx.fill();
      });

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Neon lime/purple balance depending on hover state
            if (isHovered) {
              ctx.strokeStyle = `rgba(204, 255, 0, ${alpha * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            }
            
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw mouse bonds
      if (mousePos.active) {
        particles.forEach((p) => {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.35;
            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(204, 255, 0, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        });
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [dimensions, isHovered, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000, active: false });
    setIsHovered(false);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[280px] md:h-[320px] rounded-2xl bg-black/80 border border-white/5 overflow-hidden flex items-center justify-center select-none"
    >
      {/* Absolute canvas container for particle overlay */}
      <canvas 
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Decorative concentric grid line background rings */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_50%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
      <div 
        className="absolute w-52 h-52 rounded-full border border-white/5 pointer-events-none scale-100" 
        style={{ transform: 'translateZ(0)' }}
      />
      <div 
        className="absolute w-64 h-64 rounded-full border border-purple-500/5 border-dashed pointer-events-none" 
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Centered Profile Avatar Ring Portal */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        className="relative z-10 w-44 h-44 md:w-48 md:h-48 rounded-full flex items-center justify-center transition-transform duration-500 transform hover:scale-[1.04]"
      >
        {/* Animated outer glowing halo vectors */}
        <div 
          className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
            isHovered 
              ? 'border-[#ccff00]/60 rotate-45 scale-[1.05] shadow-[0_0_30px_rgba(204,255,0,0.3)]' 
              : 'border-purple-500/20 animate-[spin_30s_linear_infinite]'
          }`}
        />
        <div 
          className={`absolute -inset-1.5 rounded-full border transition-all duration-500 ${
            isHovered 
              ? 'border-cyan-400/40 rotate-12 scale-[1.08] shadow-[0_0_20px_rgba(34,211,238,0.25)]' 
              : 'border-white/5'
          }`}
        />

        {/* Clean, circular mask for portrait representation */}
        <div className="w-[155px] h-[155px] md:w-[170px] md:h-[170px] rounded-full overflow-hidden border-2 border-white/15 bg-black/90 relative z-20 flex items-center justify-center shadow-2xl">
          {/* Subtle gradient behind */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/20 via-black to-[#ccff00]/5" />
          
          <img 
            src={imageSources[imgSrcIndex]}
            alt="Sandhya Tiwari Portrait"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered ? 'scale-108 brightness-[1.10]' : 'scale-100 brightness-[0.95]'
            }`}
          />

          {/* Active diagnostic sweep bar decor */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ccff00]/40 to-transparent animate-[bounce_4s_infinite] pointer-events-none" />
        </div>

        {/* Status terminal banner */}
        <div className={`absolute bottom-0 bg-[#050505] border border-white/10 px-2.5 py-0.5 rounded-full z-35 text-[8.5px] font-mono tracking-widest text-[#ccff00] font-black uppercase shadow-2xl transition-all duration-300 ${
          isHovered ? 'border-[#ccff00]/40 scale-102 text-white bg-[#ccff00]/10' : ''
        }`}>
          PORTAL_ON
        </div>
      </div>
    </div>
  );
}
