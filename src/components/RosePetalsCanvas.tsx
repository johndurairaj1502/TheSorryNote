'use client';

import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  swingAngle: number;
  swingSpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  fadeSpeed: number;
  maxOpacity: number;
  color: string;
}

interface RosePetalsCanvasProps {
  density?: 'low' | 'medium' | 'high';
  className?: string;
  enableSparkles?: boolean;
}

export const RosePetalsCanvas: React.FC<RosePetalsCanvasProps> = ({
  density = 'medium',
  className = '',
  enableSparkles = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette for romantic petals
    const petalColors = [
      'rgba(217, 143, 163, 0.45)', // Rose
      'rgba(246, 199, 208, 0.55)', // Blush
      'rgba(182, 84, 113, 0.35)',  // Wine rose
      'rgba(234, 178, 192, 0.45)', // Soft pink
      'rgba(255, 240, 232, 0.35)', // Cream rose
    ];

    const sparkleColors = [
      'rgba(255, 240, 232, 0.8)',
      'rgba(246, 199, 208, 0.9)',
      'rgba(255, 225, 235, 0.7)',
    ];

    const isMobile = window.innerWidth < 768;
    const countMultiplier = density === 'low' ? 0.5 : density === 'high' ? 1.5 : 1;
    const petalCount = Math.floor((isMobile ? 18 : 34) * countMultiplier);
    const sparkleCount = enableSparkles ? Math.floor((isMobile ? 20 : 40) * countMultiplier) : 0;

    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 8,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.5 + 0.2,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        swingAngle: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const sparkles: Sparkle[] = [];
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.8,
        fadeSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        maxOpacity: Math.random() * 0.7 + 0.3,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      });
    }

    // Function to draw organic petal shape
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      // Curved organic petal path
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.9, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
      ctx.closePath();
      ctx.fill();

      // Subtle vein highlight in the center
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    // Function to draw delicate star sparkle
    const drawSparkle = (s: Sparkle) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, s.opacity));

      ctx.beginPath();
      ctx.arc(0, 0, s.size, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow aura
      ctx.beginPath();
      ctx.arc(0, 0, s.size * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 240, 232, 0.12)';
      ctx.fill();

      ctx.restore();
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = (time - lastTime) / 16.66; // normalize to 60fps
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render & update sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.opacity += s.fadeSpeed * delta;
        if (s.opacity > s.maxOpacity) {
          s.opacity = s.maxOpacity;
          s.fadeSpeed = -Math.abs(s.fadeSpeed);
        } else if (s.opacity <= 0.05) {
          s.opacity = 0.05;
          s.fadeSpeed = Math.abs(s.fadeSpeed);
          s.x = Math.random() * width;
          s.y = Math.random() * height;
        }
        drawSparkle(s);
      }

      // Render & update petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swingAngle += p.swingSpeed * delta;
        p.y += p.speedY * delta;
        p.x += (p.speedX + Math.sin(p.swingAngle) * 0.5) * delta;
        p.rotation += p.rotationSpeed * delta;

        // Reset if off bottom or screen edges
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, enableSparkles]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
};
