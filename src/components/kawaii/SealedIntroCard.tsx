'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartBiscuit, ChocoPie, KawaiiBow, SparkleStar } from '../KawaiiStickers';
import { kawaiiAudio } from '@/utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface SealedIntroCardProps {
  onOpen: () => void;
}

export const SealedIntroCard: React.FC<SealedIntroCardProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleUnseal = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Spawn gentle celebratory hearts
    const hearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -30 - Math.random() * 80,
    }));
    setFloatingHearts(hearts);

    // Play tactile unsealing sounds
    kawaiiAudio.playPop();
    setTimeout(() => {
      kawaiiAudio.playSparkle();
    }, 200);

    // Complete opening transition smoothly
    setTimeout(() => {
      onOpen();
    }, 750);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.06, y: -10, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-lg mx-auto px-4 py-6 flex flex-col items-center text-center select-none"
    >
      {/* Playful washi tape at top */}
      <div className="w-28 h-6 washi-tape-pink rounded-sm mb-3 flex items-center justify-center border-t border-b border-white/60 shadow-sm">
        <span className="text-[10px] tracking-widest uppercase font-bold text-kawaii-choco-900/80 font-sans">
          SPECIAL DELIVERY ♡
        </span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-handwriting text-4xl sm:text-5xl text-kawaii-choco-900 font-bold tracking-wide mt-1 mb-1"
      >
        One tiny thing for you ♡
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs sm:text-sm text-kawaii-choco-600 font-sans font-medium mb-5 max-w-sm"
      >
        A very sincere, very cute note from Kabi… 🐾
      </motion.p>

      {/* Layered Physical Envelope Container */}
      <div className="relative w-full max-w-md aspect-[16/11] flex items-center justify-center my-2 perspective-1000">
        {/* Floating companion stickers */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-6 -left-4 sm:-left-8 z-30 pointer-events-none"
        >
          <HeartBiscuit size={58} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], rotate: [8, -8, 8] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute -bottom-6 -right-3 sm:-right-7 z-30 pointer-events-none"
        >
          <ChocoPie size={62} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -right-2 z-30 pointer-events-none"
        >
          <KawaiiBow size={40} />
        </motion.div>

        {/* Floating hearts emitted on unseal */}
        <AnimatePresence>
          {floatingHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
              animate={{ x: h.x, y: h.y, scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute text-kawaii-strawberry text-2xl z-40 pointer-events-none"
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>

        {/* --- PHYSICAL ENVELOPE BACKDROP & POCKET --- */}
        <motion.div
          whileHover={{ scale: 1.02, rotate: 0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUnseal}
          role="button"
          tabIndex={0}
          aria-label="Click the heart wax seal to open the letter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleUnseal();
            }
          }}
          className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF6F9] to-[#FFEAF1] border-3 border-kawaii-pink-200 shadow-kawaii-lg flex flex-col items-center justify-center cursor-pointer p-6 transition-all duration-300 group overflow-hidden"
        >
          {/* Subtle scalloped dashed inner border */}
          <div className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-kawaii-pink-300/60 pointer-events-none" />

          {/* Corner heart watermarks */}
          <div className="absolute top-4 left-4 text-kawaii-pink-300 text-sm pointer-events-none">♡</div>
          <div className="absolute top-4 right-4 text-kawaii-pink-300 text-sm pointer-events-none">♡</div>
          <div className="absolute bottom-4 left-4 text-kawaii-pink-300 text-sm pointer-events-none">♡</div>
          <div className="absolute bottom-4 right-4 text-kawaii-pink-300 text-sm pointer-events-none">♡</div>

          {/* Inner Letter Paper Peeking Outward */}
          <motion.div
            animate={
              isOpening
                ? { y: -45, scale: 1.02, opacity: 1 }
                : { y: 0, opacity: 0.85 }
            }
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-5 inset-x-8 h-28 rounded-xl bg-white/90 border border-kawaii-pink-200 shadow-inner flex flex-col items-center justify-center p-3 pointer-events-none"
          >
            <div className="w-24 h-1 bg-kawaii-pink-200 rounded-full mb-1.5" />
            <div className="w-36 h-1 bg-kawaii-pink-100 rounded-full mb-1.5" />
            <div className="w-28 h-1 bg-kawaii-pink-100 rounded-full" />
            <span className="font-handwriting text-kawaii-strawberry text-sm font-bold mt-2">
              For You… ♡
            </span>
          </motion.div>

          {/* Envelope Pocket Triangular Flaps Overlay (SVG) */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 400 280" fill="none" preserveAspectRatio="none">
              {/* Lower pocket left fold */}
              <polygon points="0,280 200,165 0,160" fill="#FFF2F6" opacity="0.6" />
              {/* Lower pocket right fold */}
              <polygon points="400,280 200,165 400,160" fill="#FFEBF2" opacity="0.6" />
              {/* Bottom pocket envelope crease */}
              <polygon points="0,280 200,165 400,280" fill="#FFE5ED" stroke="#FFC2D5" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Envelope Top Flap Folding Open on Unseal */}
          <motion.div
            animate={
              isOpening
                ? { rotateX: 180, y: -20, opacity: 0 }
                : { rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute inset-x-0 top-0 h-1/2 pointer-events-none origin-top z-15"
          >
            <svg width="100%" height="100%" viewBox="0 0 400 140" fill="none" preserveAspectRatio="none">
              <polygon
                points="0,0 200,135 400,0"
                fill="url(#topFlapGrad)"
                stroke="#FFB8CF"
                strokeWidth="1.5"
                filter="drop-shadow(0 4px 6px rgba(84,46,29,0.06))"
              />
              <defs>
                <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF9" />
                  <stop offset="100%" stopColor="#FFF0F5" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Central Heart Wax Seal Badge */}
          <motion.div
            animate={
              isOpening
                ? { scale: [1, 1.35, 0], rotate: [0, 15, -45], opacity: [1, 1, 0] }
                : { scale: [1, 1.06, 1] }
            }
            transition={
              isOpening
                ? { duration: 0.5, ease: 'easeOut' }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-kawaii-pink-400 via-kawaii-strawberry to-kawaii-pink-600 shadow-lg shadow-kawaii-pink-400/50 flex items-center justify-center relative border-3 border-white group-hover:shadow-kawaii-pink-500/70 transition-shadow z-25 mt-4"
          >
            {/* Scalloped wax edge ring */}
            <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-white/60 pointer-events-none" />
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white/90 filter drop-shadow-sm group-hover:scale-110 transition-transform" />
            <Sparkles className="w-4 h-4 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
          </motion.div>

          {/* Prompt under seal */}
          <div className="mt-4 flex flex-col items-center gap-1 z-25">
            <span className="font-handwriting text-2xl sm:text-3xl text-kawaii-choco-900 font-bold">
              Tap the heart to unseal ♡
            </span>
            <span className="text-[11px] sm:text-xs text-kawaii-strawberry font-sans font-semibold tracking-wide uppercase flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full shadow-sm border border-kawaii-pink-200">
              <span>Open my apology note 💌</span>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
