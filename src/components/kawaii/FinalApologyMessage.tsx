'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeartBiscuit, ChocoPie, SparkleStar, KawaiiBow } from '../KawaiiStickers';
import { RotateCcw } from 'lucide-react';

interface FinalApologyMessageProps {
  onReplay?: () => void;
}

export const FinalApologyMessage: React.FC<FinalApologyMessageProps> = ({ onReplay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-lg mx-auto px-4 py-8 flex flex-col items-center select-none"
    >
      {/* Washi tape header */}
      <div className="w-32 h-6 washi-tape-pink rounded-sm mb-4 flex items-center justify-center border-t border-b border-white/60 shadow-sm">
        <span className="text-[10px] tracking-widest uppercase font-bold text-kawaii-choco-900/80 font-sans">
          FROM THE HEART ♡
        </span>
      </div>

      {/* Main Cute Scrapbook Card */}
      <div className="w-full scrapbook-paper p-8 sm:p-12 relative flex flex-col items-center text-center overflow-hidden">
        {/* Decorative corner stickers */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-8, 4, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -left-4 pointer-events-none"
        >
          <HeartBiscuit size={56} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0], rotate: [6, -6, 6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -bottom-4 -right-4 pointer-events-none"
        >
          <ChocoPie size={58} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 right-4 pointer-events-none"
        >
          <KawaiiBow size={36} />
        </motion.div>

        {/* Adorable Cat Illustration (Holding Heart with Pleading Love Eyes) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="my-3"
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="filter drop-shadow-md">
            {/* Cat Ears */}
            <polygon points="20,32 14,8 42,20" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="22,26 18,14 36,20" fill="#FFB8CF" />
            <polygon points="80,32 86,8 58,20" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="78,26 82,14 64,20" fill="#FFB8CF" />
            {/* Head */}
            <ellipse cx="50" cy="46" rx="36" ry="30" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" />
            {/* Big pleading anime kitten eyes */}
            <ellipse cx="36" cy="44" rx="6" ry="8" fill="#542E1D" />
            <circle cx="34" cy="40" r="3" fill="#FFFFFF" />
            <circle cx="38" cy="47" r="1.5" fill="#FFFFFF" />
            <ellipse cx="64" cy="44" rx="6" ry="8" fill="#542E1D" />
            <circle cx="62" cy="40" r="3" fill="#FFFFFF" />
            <circle cx="66" cy="47" r="1.5" fill="#FFFFFF" />
            {/* Nose & tiny smile */}
            <polygon points="48,51 52,51 50,54" fill="#FF5C8D" />
            <path d="M46 54C48 56 50 56 50 54C50 56 52 56 54 54" stroke="#542E1D" strokeWidth="2.5" strokeLinecap="round" />
            {/* Blushing cheeks */}
            <ellipse cx="26" cy="52" rx="6" ry="3.5" fill="#FFADC2" />
            <ellipse cx="74" cy="52" rx="6" ry="3.5" fill="#FFADC2" />
            {/* Body */}
            <path d="M32 72C32 62 68 62 68 72L70 88C70 92 30 92 30 88Z" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" />
            {/* Red Heart in paws */}
            <path
              d="M50 82C48 82 36 71 34 63C32 55 38 50 44 51.5C47 52.5 49 55 50 56C51 55 53 52.5 56 51.5C62 50 68 55 66 63C64 71 52 82 50 82Z"
              fill="#FF4D75"
              stroke="#E62E58"
              strokeWidth="2"
            />
            {/* Paws holding the heart */}
            <ellipse cx="36" cy="66" rx="5" ry="4" fill="#FFFDF9" stroke="#542E1D" strokeWidth="2" />
            <ellipse cx="64" cy="66" rx="5" ry="4" fill="#FFFDF9" stroke="#542E1D" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* The ONLY Main Final Apology Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="flex flex-col items-center mt-2 mb-3"
        >
          {/* Main Headline */}
          <h1 className="font-handwriting text-5xl sm:text-6xl text-kawaii-strawberry font-bold tracking-wide leading-tight filter drop-shadow-sm">
            Sorry V🤍 ♡
          </h1>

          {/* Subtitle / Signature */}
          <p className="font-handwriting text-3xl sm:text-4xl text-kawaii-choco-800 font-semibold tracking-wide mt-2">
            — By yours, Kabi
          </p>
        </motion.div>

        {/* Gentle pulsating tiny heart */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl mt-1 text-kawaii-strawberry pointer-events-none"
        >
          💖
        </motion.div>
      </div>

      {/* Action Button: Click here for your final move ♡ */}
      <motion.a
        id="final-move-button"
        href="https://wa.me/918610263526"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          scale: 1.06,
          boxShadow: '0 8px 25px rgba(255, 77, 121, 0.45)',
        }}
        whileTap={{ scale: 0.96 }}
        className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-kawaii-strawberry via-kawaii-pink-500 to-kawaii-pink-600 text-white font-sans font-bold text-xs sm:text-sm shadow-kawaii-md hover:shadow-kawaii-lg border-2 border-white transition-all cursor-pointer group"
      >
        <span>Click here for your final move ♡</span>
      </motion.a>
    </motion.div>
  );
};
