'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Floating3DHeartProps {
  size?: number;
  className?: string;
  glowIntensity?: number; // 0 to 1
  isPulsingFast?: boolean;
}

export const Floating3DHeart: React.FC<Floating3DHeartProps> = ({
  size = 200,
  className = '',
  glowIntensity = 0.6,
  isPulsingFast = false,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [18, -18]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Outer Atmospheric Glow */}
      <motion.div
        animate={{
          scale: isPulsingFast ? [1, 1.25, 1] : [1, 1.12, 1],
          opacity: [glowIntensity * 0.5, glowIntensity * 0.9, glowIntensity * 0.5],
        }}
        transition={{
          duration: isPulsingFast ? 0.7 : 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          background: 'radial-gradient(circle, rgba(217,143,163,0.5) 0%, rgba(246,199,208,0.2) 40%, rgba(48,21,34,0) 70%)',
          filter: 'blur(35px)',
        }}
      />

      {/* 3D Tilting Heart Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -12, 0],
          scale: isPulsingFast ? [1, 1.08, 1] : [1, 1.03, 1],
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
          scale: {
            duration: isPulsingFast ? 0.65 : 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="relative cursor-pointer transition-shadow"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_15px_30px_rgba(48,21,34,0.7)]"
        >
          <defs>
            {/* Deep rich 3D shading */}
            <radialGradient
              id="heart3DGrad"
              cx="40%"
              cy="35%"
              r="60%"
              fx="35%"
              fy="30%"
            >
              <stop offset="0%" stopColor="#FFAEC2" />
              <stop offset="25%" stopColor="#E57896" />
              <stop offset="65%" stopColor="#AF335A" />
              <stop offset="90%" stopColor="#6C1734" />
              <stop offset="100%" stopColor="#300B1B" />
            </radialGradient>

            {/* Specular curved highlight on upper left curve */}
            <linearGradient id="specularGlow" x1="0" y1="0" x2="0.8" y2="0.8">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#FFF0E8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F6C7D0" stopOpacity="0" />
            </linearGradient>

            {/* Bottom shadow curve */}
            <linearGradient id="deepShadow" x1="0.5" y1="0.5" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#180D12" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Base Heart Body */}
          <path
            d="M100 178C96.5 178 30 134 16 88C3.5 48 34.5 18 69.5 21C84 22.5 94.5 32 100 39.5C105.5 32 116 22.5 130.5 21C165.5 18 196.5 48 184 88C170 134 103.5 178 100 178Z"
            fill="url(#heart3DGrad)"
          />

          {/* Shadow Overlay */}
          <path
            d="M100 178C96.5 178 30 134 16 88C3.5 48 34.5 18 69.5 21C84 22.5 94.5 32 100 39.5C105.5 32 116 22.5 130.5 21C165.5 18 196.5 48 184 88C170 134 103.5 178 100 178Z"
            fill="url(#deepShadow)"
          />

          {/* Left Arch Specular Light (3D Curved Glint) */}
          <path
            d="M68 25C43 27 20 48 27 82C31 101 49 122 75 142C67 122 55 96 52 76C49 53 60 36 78 31C84 29 78 24 68 25Z"
            fill="url(#specularGlow)"
          />

          {/* Small Secondary Right Highlight */}
          <ellipse
            cx="140"
            cy="52"
            rx="14"
            ry="7"
            transform="rotate(-25 140 52)"
            fill="#FFFFFF"
            fillOpacity="0.45"
            filter="blur(1.5px)"
          />

          {/* Floating Sparkle within heart core */}
          <circle cx="92" cy="72" r="2.5" fill="#FFF0E8" fillOpacity="0.75" />
          <circle cx="115" cy="85" r="1.8" fill="#FFF0E8" fillOpacity="0.55" />
        </svg>
      </motion.div>
    </div>
  );
};
