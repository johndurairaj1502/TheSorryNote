'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { content } from '@/config/content';
import { ChevronLeft, Sparkles, Heart } from 'lucide-react';

interface LoveLetterProps {
  onNext: () => void;
  onPrev: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onNext, onPrev }) => {
  const { loveLetter } = content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25, scale: 0.96, filter: 'blur(6px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 max-w-2xl mx-auto"
    >
      {/* Category Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-5 flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300 font-sans font-medium"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        <span>{loveLetter.badge}</span>
      </motion.div>

      {/* Floating Letter Paper */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, rotate: -0.5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: 0.2 }}
        className="relative w-full rounded-3xl paper-texture paper-shadow p-8 sm:p-12 text-burgundy-950 border border-cream-300/60 overflow-hidden"
      >
        {/* Vintage Stamp / Seal in top right corner */}
        <div className="absolute top-6 right-6 flex flex-col items-center justify-center w-14 h-16 rounded-lg border-2 border-dashed border-rose-300/80 bg-rose-50/50 p-1 pointer-events-none select-none">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-300/50 mb-0.5" />
          <span className="text-[9px] uppercase tracking-wider text-rose-600 font-sans font-semibold">
            US &bull; ♡
          </span>
        </div>

        {/* Salutation */}
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          className="font-serif text-2xl sm:text-3xl text-rose-900 font-normal mb-6 tracking-tight"
        >
          {loveLetter.salutation}
        </motion.h2>

        {/* Body Paragraphs */}
        <div className="space-y-4 font-sans text-sm sm:text-base text-burgundy-900/90 leading-relaxed font-light">
          {loveLetter.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + idx * 0.1, duration: 0.5 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Handwritten Sign-off & Signature Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-8 pt-6 border-t border-rose-200/60 flex flex-col items-start"
        >
          <span className="font-serif italic text-rose-800 text-sm mb-1">
            {loveLetter.signOff}
          </span>
          <span className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold tracking-wide">
            {loveLetter.signature}
          </span>
        </motion.div>
      </motion.div>

      {/* Screen Navigation Buttons */}
      <div className="w-full flex items-center justify-between mt-8 gap-4 px-2">
        <motion.button
          type="button"
          onClick={onPrev}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md bg-burgundy-800/60 border border-rose-400/20 hover:border-rose-400/40 text-cream-200/90 text-sm font-sans transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 text-rose-300" />
          <span>Back</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(217, 143, 163, 0.4)' }}
          whileTap={{ scale: 0.96 }}
          className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-cream-100 font-sans font-medium text-sm sm:text-base shadow-xl shadow-rose-950/60 border border-rose-300/30 transition-all duration-300"
        >
          <span>{loveLetter.buttonText}</span>
          <Sparkles className="w-4 h-4 text-rose-200" />
        </motion.button>
      </div>
    </motion.div>
  );
};
