'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartBiscuit, ChocoPie, KawaiiBow, SparkleStar } from '../KawaiiStickers';
import { kawaiiAudio } from '@/utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface SealedIntroCardProps {
  onOpen: () => void;
}

export const SealedIntroCard: React.FC<SealedIntroCardProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleUnseal = () => {
    if (isOpening) return;
    setIsOpening(true);
    kawaiiAudio.playPop();
    setTimeout(() => {
      kawaiiAudio.playSparkle();
    }, 200);

    setTimeout(() => {
      onOpen();
    }, 650);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-lg mx-auto px-4 py-6 flex flex-col items-center text-center select-none"
    >
      {/* Playful washi tape at top */}
      <div className="w-28 h-7 washi-tape-pink rounded-sm mb-4 flex items-center justify-center border-t border-b border-white/60">
        <span className="text-[10px] tracking-widest uppercase font-bold text-kawaii-choco-900/70 font-sans">
          SPECIAL DELIVERY ♡
        </span>
      </div>


      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="font-handwriting text-4xl sm:text-5xl text-kawaii-choco-900 font-bold tracking-wide mt-1 mb-2"
      >
        One tiny thing for you ♡
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-xs sm:text-sm text-kawaii-choco-600 font-sans font-medium mb-6 max-w-sm"
      >
        A very sincere, very cute note from Kabi… 🐾
      </motion.p>

      {/* Central Interactive Sealed Love Card */}
      <div className="relative w-full max-w-md aspect-[16/11] flex items-center justify-center my-2">
        {/* Floating companion stickers next to card */}
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-6 -left-4 sm:-left-8 z-30 pointer-events-none"
        >
          <HeartBiscuit size={60} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], rotate: [8, -8, 8] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute -bottom-6 -right-3 sm:-right-7 z-30 pointer-events-none"
        >
          <ChocoPie size={64} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -right-2 z-30 pointer-events-none"
        >
          <KawaiiBow size={42} />
        </motion.div>

        {/* The Card / Envelope Body */}
        <motion.div
          whileHover={{ scale: 1.02, rotate: 0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUnseal}
          role="button"
          tabIndex={0}
          aria-label="Click to open the love note"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleUnseal();
            }
          }}
          className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF7F9] to-[#FFEBF1] border-3 border-kawaii-pink-200 shadow-kawaii-lg flex flex-col items-center justify-center cursor-pointer p-6 transition-all duration-300 group overflow-hidden"
        >
          {/* Subtle scalloped dashed border */}
          <div className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-kawaii-pink-300/60 pointer-events-none" />

          {/* Sweet decorative corner hearts */}
          <div className="absolute top-4 left-4 text-kawaii-pink-300 text-sm pointer-events-none">♡</div>
          <div className="absolute top-4 right-4 text-kawaii-pink-300 text-sm pointer-events-none">♡</div>
          <div className="absolute bottom-4 left-4 text-kawaii-pink-300 text-sm pointer-events-none">♡</div>
          <div className="absolute bottom-4 right-4 text-kawaii-pink-300 text-sm pointer-events-none">♡</div>

          {/* Central Heart Seal Badge */}
          <motion.div
            animate={
              isOpening
                ? { scale: [1, 1.3, 0], rotate: [0, 15, -45], opacity: [1, 1, 0] }
                : { scale: [1, 1.06, 1] }
            }
            transition={
              isOpening
                ? { duration: 0.5, ease: 'easeOut' }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-kawaii-pink-400 via-kawaii-strawberry to-kawaii-pink-600 shadow-lg shadow-kawaii-pink-400/40 flex items-center justify-center relative border-3 border-white group-hover:shadow-kawaii-pink-500/60 transition-shadow"
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white/90 filter drop-shadow-sm group-hover:scale-110 transition-transform" />
            <Sparkles className="w-4 h-4 text-yellow-200 absolute -top-1 -right-1 animate-pulse" />
          </motion.div>

          {/* Prompt under seal */}
          <div className="mt-4 flex flex-col items-center gap-1 z-10">
            <span className="font-handwriting text-2xl sm:text-3xl text-kawaii-choco-900 font-bold">
              Tap the heart to unseal ♡
            </span>
            <span className="text-[11px] sm:text-xs text-kawaii-strawberry font-sans font-semibold tracking-wide uppercase flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full shadow-sm border border-kawaii-pink-200">
              <span>Open my apology note 💌</span>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
