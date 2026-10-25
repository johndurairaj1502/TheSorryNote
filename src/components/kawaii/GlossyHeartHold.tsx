'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { kawaiiAudio } from '@/utils/audio';
import { Sparkles, Heart } from 'lucide-react';
import { HeartBiscuit, ChocoPie, KawaiiBow } from '../KawaiiStickers';

interface GlossyHeartHoldProps {
  onComplete: () => void;
}

export const GlossyHeartHold: React.FC<GlossyHeartHoldProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const isHoldingRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastHeartbeatStageRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const HOLD_DURATION = 4000; // 4 seconds

  // Add a few floating particles while holding
  const spawnParticle = useCallback(() => {
    const x = (Math.random() - 0.5) * 120;
    const y = (Math.random() - 0.5) * 120;
    const id = Date.now() + Math.random();
    setFloatingParticles((prev) => [...prev.slice(-10), { id, x, y }]);
  }, []);

  const cancelHold = useCallback(() => {
    if (isCompleted || !isHoldingRef.current) return;
    isHoldingRef.current = false;
    setIsHolding(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    startTimeRef.current = null;
    lastHeartbeatStageRef.current = 0;
    setFloatingParticles([]);
    setProgress(0);
  }, [isCompleted]);

  const startHold = useCallback(() => {
    if (isCompleted || isHoldingRef.current) return;
    isHoldingRef.current = true;
    setIsHolding(true);
    startTimeRef.current = Date.now();
    lastHeartbeatStageRef.current = 0;
    kawaiiAudio.playHeartbeat(0.4);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / HOLD_DURATION) * 100);

      setProgress(currentProgress);

      // Heartbeat audio at stages
      if (currentProgress >= 30 && lastHeartbeatStageRef.current < 1) {
        lastHeartbeatStageRef.current = 1;
        kawaiiAudio.playHeartbeat(0.5);
      }
      if (currentProgress >= 65 && lastHeartbeatStageRef.current < 2) {
        lastHeartbeatStageRef.current = 2;
        kawaiiAudio.playHeartbeat(0.8);
      }
      if (currentProgress >= 88 && lastHeartbeatStageRef.current < 3) {
        lastHeartbeatStageRef.current = 3;
        kawaiiAudio.playHeartbeat(1.0);
      }

      // Spawn occasional sparkles
      if (currentProgress > 25 && Math.random() > 0.6) {
        spawnParticle();
      }

      if (currentProgress >= 100) {
        // COMPLETED!
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        isHoldingRef.current = false;
        setIsCompleted(true);
        setIsHolding(false);

        // Sound effect: soft magical zoom-out chime
        kawaiiAudio.playZoomOut();
        setTimeout(() => {
          kawaiiAudio.playSparkle();
        }, 300);

        // Smooth shrink/zoom-out animation completes and reveals final screen
        setTimeout(() => {
          onComplete();
        }, 750);
      }
    }, 25);
  }, [HOLD_DURATION, isCompleted, onComplete, spawnParticle]);

  // Cleanup timer on component unmount only
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // Window-level release listeners so holding works even if cursor drifts
  useEffect(() => {
    if (!isHolding) return;

    const onRelease = () => {
      cancelHold();
    };

    window.addEventListener('pointerup', onRelease);
    window.addEventListener('mouseup', onRelease);
    window.addEventListener('touchend', onRelease);

    return () => {
      window.removeEventListener('pointerup', onRelease);
      window.removeEventListener('mouseup', onRelease);
      window.removeEventListener('touchend', onRelease);
    };
  }, [isHolding, cancelHold]);

  // Keyboard accessibility: hold with Space or Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !isHoldingRef.current && !isCompleted) {
      e.preventDefault();
      startHold();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && isHoldingRef.current && !isCompleted) {
      e.preventDefault();
      cancelHold();
    }
  };

  // Circular progress calculations
  const radius = 100;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isCompleted ? 0 : 1,
        scale: isCompleted ? 0.92 : 1,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-lg mx-auto px-4 py-4 sm:py-6 flex flex-col items-center select-none touch-hold-target"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      aria-label="Hold to forgive heart interaction"
    >
      {/* Playful washi tape at top */}
      <div className="w-28 h-6 washi-tape-pink rounded-sm mb-3 flex items-center justify-center border-t border-b border-white/60 shadow-sm">
        <span className="text-[10px] tracking-widest uppercase font-bold text-kawaii-choco-900/80 font-sans">
          HOLD TO FORGIVE ♡
        </span>
      </div>

      {/* Main Prompt */}
      <div className="text-center mb-5">
        <motion.div
          animate={{ scale: isHolding ? 1.05 : 1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-kawaii-pink-100 border border-kawaii-pink-300 text-kawaii-strawberry text-xs font-bold tracking-wide shadow-sm mb-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Almost there… ♡</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>
        <h2 className="font-handwriting text-4xl sm:text-5xl text-kawaii-choco-900 font-bold tracking-wide">
          Hold my little heart ♡
        </h2>
        <p className="text-xs sm:text-sm text-kawaii-choco-600 font-sans font-medium mt-1">
          Just a few seconds… pretty please 🥺
        </p>
      </div>

      {/* Central Interactive Heart Container */}
      <div className="relative flex items-center justify-center my-3 sm:my-6">
        {/* Soft background glow that intensifies during hold */}
        <motion.div
          animate={{
            scale: isCompleted ? 0 : 1 + (progress / 100) * 0.4,
            opacity: isCompleted ? 0 : 0.3 + (progress / 100) * 0.5,
          }}
          transition={{ duration: isCompleted ? 0.6 : 0.1 }}
          className="absolute w-64 h-64 rounded-full bg-kawaii-pink-300 blur-3xl pointer-events-none"
        />

        {/* Floating tiny heart particles during holding */}
        <AnimatePresence>
          {floatingParticles.map((pt) => (
            <motion.div
              key={pt.id}
              initial={{ x: pt.x, y: pt.y + 20, opacity: 0.9, scale: 0.6 }}
              animate={{ y: pt.y - 70, opacity: 0, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute text-kawaii-strawberry text-sm pointer-events-none z-30"
            >
              ♡
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Circular SVG Progress Ring */}
        <svg
          className="absolute pointer-events-none transform -rotate-90 z-20"
          width="230"
          height="230"
          viewBox="0 0 230 230"
        >
          <defs>
            <linearGradient id="kawaiiHoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA7C3" />
              <stop offset="50%" stopColor="#FF4D79" />
              <stop offset="100%" stopColor="#FF7597" />
            </linearGradient>
            <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx="115"
            cy="115"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 184, 207, 0.4)"
            strokeWidth={strokeWidth}
          />

          {/* Active Progress Ring */}
          <circle
            cx="115"
            cy="115"
            r={radius}
            fill="transparent"
            stroke="url(#kawaiiHoldGrad)"
            strokeWidth={strokeWidth + 2}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter="url(#ringGlow)"
            className="transition-all duration-75 ease-out"
          />
        </svg>

        {/* The 3D Glossy Pink Heart (NO BURST: Smoothly ZOOMS OUT / SHRINKS into center on completion!) */}
        <motion.div
          id="glossy-heart-hold-btn"
          data-testid="heart-hold-button"
          role="button"
          tabIndex={0}
          aria-label="Press and hold heart to forgive"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onPointerDown={(e) => {
            e.preventDefault();
            startHold();
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            cancelHold();
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            startHold();
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            cancelHold();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            startHold();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            cancelHold();
          }}
          animate={
            isCompleted
              ? {
                  // SMOOTH ZOOM OUT / SHRINK INTO CENTER (CRITICAL: NEVER BURST OR EXPLODE)
                  scale: 0,
                  opacity: 0,
                  rotate: 45,
                }
              : isHolding
              ? {
                  scale: 1.05 + (progress / 100) * 0.15,
                }
              : {
                  scale: [1, 1.04, 1],
                }
          }
          transition={
            isCompleted
              ? { duration: 0.75, ease: [0.4, 0, 0.2, 1] }
              : isHolding
              ? { duration: 0.1 }
              : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full flex items-center justify-center cursor-pointer touch-hold-target z-10"
        >
          {/* Glossy Pink 3D Heart SVG */}
          <svg
            width="145"
            height="145"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_12px_24px_rgba(255,92,141,0.4)]"
          >
            <defs>
              {/* Glossy strawberry-pink 3D shading */}
              <radialGradient id="kawaiiHeartGrad" cx="35%" cy="30%" r="65%" fx="30%" fy="25%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#FFAEC5" />
                <stop offset="55%" stopColor="#FF4D79" />
                <stop offset="85%" stopColor="#E62E5B" />
                <stop offset="100%" stopColor="#B31E42" />
              </radialGradient>

              {/* Specular curved highlight */}
              <linearGradient id="kawaiiHeartHighlight" x1="0" y1="0" x2="0.6" y2="0.6">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#FFF0F5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFAEC5" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Base Heart */}
            <path
              d="M100 178C96.5 178 30 134 16 88C3.5 48 34.5 18 69.5 21C84 22.5 94.5 32 100 39.5C105.5 32 116 22.5 130.5 21C165.5 18 196.5 48 184 88C170 134 103.5 178 100 178Z"
              fill="url(#kawaiiHeartGrad)"
            />

            {/* Left curve glossy highlight */}
            <path
              d="M68 25C43 27 20 48 27 82C31 101 49 122 75 142C67 122 55 96 52 76C49 53 60 36 78 31C84 29 78 24 68 25Z"
              fill="url(#kawaiiHeartHighlight)"
            />

            {/* Sparkle glint on upper right */}
            <circle cx="138" cy="50" r="4.5" fill="#FFFFFF" opacity="0.85" />
            <circle cx="146" cy="58" r="2.5" fill="#FFFFFF" opacity="0.6" />

            {/* Percentage inside heart while holding */}
            {isHolding && !isCompleted && (
              <text
                x="100"
                y="110"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="22"
                fontFamily="sans-serif"
                fontWeight="800"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
              >
                {Math.round(progress)}%
              </text>
            )}
          </svg>
        </motion.div>
      </div>

      {/* Dynamic status feedback below heart */}
      <motion.div
        animate={{
          scale: isHolding ? 1.05 : 1,
          color: isHolding ? '#FF4D79' : '#542E1D',
        }}
        className="mt-3 flex flex-col items-center text-center"
      >
        <span className="font-handwriting text-2xl sm:text-3xl font-bold">
          {isCompleted
            ? 'Thank you… ♡'
            : isHolding
            ? 'Holding tightly onto us… ♡'
            : 'Press & hold gently with thumb or mouse ♡'}
        </span>
        <span className="text-xs text-kawaii-choco-600 font-sans font-medium mt-1">
          {isHolding ? 'Almost there, keep holding!' : 'Hold for 4 seconds to unlock final message'}
        </span>
      </motion.div>
    </motion.div>
  );
};
