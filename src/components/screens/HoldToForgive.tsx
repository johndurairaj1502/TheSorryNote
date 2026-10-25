'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { content } from '@/config/content';
import { romanticAudio } from '@/utils/audio';
import { Heart, Sparkles } from 'lucide-react';

interface HoldToForgiveProps {
  onComplete: () => void;
}

export const HoldToForgive: React.FC<HoldToForgiveProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0); // 0 to 100
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [convergingParticles, setConvergingParticles] = useState<
    { id: number; x: number; y: number; angle: number; dist: number }[]
  >([]);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastHeartbeatStageRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { holdInteraction } = content;
  const HOLD_DURATION = holdInteraction.holdDurationMs || 2800;

  // Trigger rich celebratory rose petal burst
  const triggerCelebration = useCallback(() => {
    romanticAudio.playSuccessChime();

    // Haptic success pattern
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 60, 40, 80, 120]);
      } catch {
        // Ignored
      }
    }

    // Canvas Confetti with romantic rose & blush palette
    const colors = ['#F6C7D0', '#D98FA3', '#FFF0E8', '#EAB2C0', '#B65471'];
    
    // Center explosion
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.52 },
      colors,
      scalar: 1.2,
      ticks: 200,
    });

    // Left & Right delayed soft showers
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.6 },
        colors,
      });
    }, 250);
  }, []);

  // Update converging particles during holding
  const spawnConvergingParticle = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 140 + Math.random() * 60;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    const id = Date.now() + Math.random();

    setConvergingParticles((prev) => [...prev.slice(-16), { id, x, y, angle, dist }]);
  }, []);

  // Heartbeat sound & haptic progression trigger
  const handleMilestones = useCallback((currentProgress: number) => {
    // Stage 1: 30%
    if (currentProgress >= 30 && lastHeartbeatStageRef.current < 1) {
      lastHeartbeatStageRef.current = 1;
      romanticAudio.playHeartbeatThud(0.5);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try { navigator.vibrate(25); } catch {}
      }
    }
    // Stage 2: 60%
    if (currentProgress >= 60 && lastHeartbeatStageRef.current < 2) {
      lastHeartbeatStageRef.current = 2;
      romanticAudio.playHeartbeatThud(0.8);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try { navigator.vibrate(35); } catch {}
      }
    }
    // Stage 3: 85%
    if (currentProgress >= 85 && lastHeartbeatStageRef.current < 3) {
      lastHeartbeatStageRef.current = 3;
      romanticAudio.playHeartbeatThud(1.0);
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        try { navigator.vibrate(45); } catch {}
      }
    }
  }, []);

  // Main animation frame tick for holding
  const step = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const currentProgress = Math.min(100, (elapsed / HOLD_DURATION) * 100);

    setProgress(currentProgress);
    handleMilestones(currentProgress);

    // Spawn tiny converging particles when past 25%
    if (currentProgress > 25 && Math.random() > 0.4) {
      spawnConvergingParticle();
    }

    if (currentProgress < 100) {
      animFrameRef.current = requestAnimationFrame(step);
    } else {
      // Completed!
      setIsCompleted(true);
      setIsHolding(false);
      triggerCelebration();

      setTimeout(() => {
        onComplete();
      }, 1200);
    }
  }, [HOLD_DURATION, handleMilestones, spawnConvergingParticle, triggerCelebration, onComplete]);

  const startHold = useCallback(() => {
    if (isCompleted) return;
    setIsHolding(true);
    startTimeRef.current = null;
    lastHeartbeatStageRef.current = 0;
    romanticAudio.playHeartbeatThud(0.4);

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(step);
  }, [isCompleted, step]);

  const cancelHold = useCallback(() => {
    if (isCompleted) return;
    setIsHolding(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    startTimeRef.current = null;
    lastHeartbeatStageRef.current = 0;
    setConvergingParticles([]);

    // Smoothly spring progress back to 0
    setProgress(0);
  }, [isCompleted]);

  // Clean unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Keyboard accessibility: hold with Space or Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !isHolding && !isCompleted) {
      e.preventDefault();
      startHold();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && isHolding && !isCompleted) {
      e.preventDefault();
      cancelHold();
    }
  };

  // Circular progress calculations
  const radius = 115;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full flex flex-col items-center justify-center min-h-[90vh] px-4 py-6 text-center max-w-xl mx-auto select-none"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      aria-label="Hold to forgive interactive heart"
    >
      {/* Background illumination that brightens with hold progress */}
      <motion.div
        animate={{
          scale: 1 + (progress / 100) * 0.45,
          opacity: 0.35 + (progress / 100) * 0.55,
        }}
        transition={{ duration: 0.1 }}
        className="absolute w-[26rem] h-[26rem] rounded-full bg-rose-500/25 blur-[90px] pointer-events-none"
      />

      {/* Prompt Above */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 sm:mb-8"
      >
        <span className="text-xs uppercase tracking-[0.25em] font-sans text-rose-300 font-medium block mb-1.5">
          A gentle wish
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-cream-100 font-light tracking-tight">
          {holdInteraction.promptAbove}
        </h2>
      </motion.div>

      {/* Main Interactive Heart Zone */}
      <div className="relative flex items-center justify-center my-3 sm:my-6">
        {/* Converging particles during holding */}
        <AnimatePresence>
          {convergingParticles.map((pt) => (
            <motion.div
              key={pt.id}
              initial={{ x: pt.x, y: pt.y, opacity: 0.8, scale: 1 }}
              animate={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeIn' }}
              className="absolute w-2 h-2 rounded-full bg-rose-200 pointer-events-none shadow-[0_0_8px_#FFF0E8]"
            />
          ))}
        </AnimatePresence>

        {/* Circular SVG Progress Ring */}
        <svg
          className="absolute pointer-events-none transform -rotate-90 z-20"
          width="260"
          height="260"
          viewBox="0 0 260 260"
        >
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6C7D0" />
              <stop offset="50%" stopColor="#D98FA3" />
              <stop offset="100%" stopColor="#FFF0E8" />
            </linearGradient>
            <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background subtle track */}
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="transparent"
            stroke="rgba(217, 143, 163, 0.18)"
            strokeWidth={strokeWidth}
          />

          {/* Active Progress Arc */}
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="transparent"
            stroke="url(#progressGrad)"
            strokeWidth={strokeWidth + 1}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter="url(#ringGlow)"
            className="transition-all duration-75 ease-out"
          />
        </svg>

        {/* Interactive Pointer Target Button */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-label={holdInteraction.promptBelow}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            startHold();
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            try {
              (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
            } catch {}
            cancelHold();
          }}
          onPointerCancel={(e) => {
            e.preventDefault();
            cancelHold();
          }}
          animate={{
            scale: isCompleted
              ? 1.55
              : isHolding
              ? 1.05 + (progress / 100) * 0.22
              : [1, 1.04, 1],
          }}
          transition={{
            scale: isHolding || isCompleted
              ? { duration: 0.1 }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center cursor-pointer touch-hold-target z-10"
        >
          {/* Inner 3D Heart SVG with dynamic fill and glow */}
          <svg
            width="170"
            height="170"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_12px_28px_rgba(48,21,34,0.85)]"
          >
            <defs>
              <clipPath id="heartFillClip">
                <path d="M100 178C96.5 178 30 134 16 88C3.5 48 34.5 18 69.5 21C84 22.5 94.5 32 100 39.5C105.5 32 116 22.5 130.5 21C165.5 18 196.5 48 184 88C170 134 103.5 178 100 178Z" />
              </clipPath>

              {/* Heart base 3D gradient */}
              <radialGradient
                id="holdHeartBase"
                cx="40%"
                cy="35%"
                r="60%"
              >
                <stop offset="0%" stopColor="#FFAEC2" />
                <stop offset="30%" stopColor="#D98FA3" />
                <stop offset="70%" stopColor="#752A40" />
                <stop offset="100%" stopColor="#301522" />
              </radialGradient>

              {/* Rising liquid fill gradient */}
              <linearGradient id="liquidGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#FFAEC2" />
                <stop offset="60%" stopColor="#FFF0E8" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>

            {/* Base Heart Path */}
            <path
              d="M100 178C96.5 178 30 134 16 88C3.5 48 34.5 18 69.5 21C84 22.5 94.5 32 100 39.5C105.5 32 116 22.5 130.5 21C165.5 18 196.5 48 184 88C170 134 103.5 178 100 178Z"
              fill="url(#holdHeartBase)"
            />

            {/* Rising liquid fill masked by heart shape */}
            <g clipPath="url(#heartFillClip)">
              <rect
                x="0"
                y={200 - (progress / 100) * 190}
                width="200"
                height="200"
                fill="url(#liquidGrad)"
                opacity={0.85}
                className="transition-all duration-75"
              />
            </g>

            {/* Specular Curved Highlight on Upper Left */}
            <path
              d="M68 25C43 27 20 48 27 82C31 101 49 122 75 142C67 122 55 96 52 76C49 53 60 36 78 31C84 29 78 24 68 25Z"
              fill="#FFFFFF"
              fillOpacity={0.45 + (progress / 100) * 0.35}
            />

            {/* Progress Percentage Inside Heart */}
            {isHolding && !isCompleted && (
              <text
                x="100"
                y="105"
                textAnchor="middle"
                fill="#FFF0E8"
                fontSize="18"
                fontFamily="sans-serif"
                fontWeight="600"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
              >
                {Math.round(progress)}%
              </text>
            )}
          </svg>
        </motion.div>
      </div>

      {/* Prompt Below with dynamic state */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 sm:mt-8 flex flex-col items-center"
      >
        <motion.p
          animate={{
            scale: isHolding ? 1.08 : 1,
            color: isHolding ? '#FFF0E8' : '#F6C7D0',
          }}
          className="font-serif text-2xl sm:text-3xl tracking-wide font-normal mb-2"
        >
          {isCompleted
            ? holdInteraction.holdSuccessText
            : isHolding
            ? holdInteraction.holdingText
            : holdInteraction.promptBelow}
        </motion.p>

        {/* Small accessibility & instruction helper */}
        <p className="text-xs text-rose-300/70 font-sans max-w-xs leading-relaxed">
          {holdInteraction.hintText}
        </p>
      </motion.div>
    </motion.div>
  );
};
