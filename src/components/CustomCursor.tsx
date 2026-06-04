import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if touch device or mobile user agent
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      // Look for button, link, interactive elements/classes
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('.group') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select');

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Custom cursor dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#ccff00] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate3d(0, 0, 0) scale(${isHovered ? 1.4 : 1})`,
        }}
      />
      {/* Custom cursor outer glowing ring with fluid scale shift */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '42px' : '26px',
          height: isHovered ? '42px' : '26px',
          backgroundColor: isHovered ? 'rgba(204, 255, 0, 0.12)' : 'rgba(204, 255, 0, 0.02)',
          borderColor: isHovered ? '#ccff00' : 'rgba(204, 255, 0, 0.35)',
          borderRadius: '50%',
          borderWidth: '1px',
          boxShadow: isHovered ? '0 0 14px rgba(204, 255, 0, 0.4)' : '0 0 6px rgba(204, 255, 0, 0.15)',
        }}
      />
    </>
  );
}
