'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Floating3DHeart } from '../Floating3DHeart';
import { content } from '@/config/content';
import { Sparkles } from 'lucide-react';

interface OpeningScreenProps {
  onNext: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onNext }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onNext();
    }, 650);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full flex flex-col items-center justify-center min-h-[85vh] px-4 py-4 sm:py-8 text-center max-w-2xl mx-auto select-none"
    >
      {/* Intimate Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-400/10 border border-rose-400/20 backdrop-blur-sm mb-3 sm:mb-5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-300 animate-pulse" />
        <span className="text-xs sm:text-sm tracking-widest uppercase font-sans text-rose-200/90 font-medium">
          {content.opening.greeting}
        </span>
      </motion.div>

      {/* Floating 3D Heart (Interactive Click Target) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 1, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Click to open heart"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        className="my-1 sm:my-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-400/50 rounded-full"
      >
        <Floating3DHeart size={160} glowIntensity={0.65} />
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.85 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-cream-100 tracking-tight leading-[1.18] mb-3 sm:mb-4 whitespace-pre-line"
      >
        {content.opening.headline}
      </motion.h1>

      {/* Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.85 }}
        className="font-sans text-sm sm:text-base text-rose-200/80 font-light max-w-md mx-auto leading-relaxed mb-6 sm:mb-8"
      >
        {content.opening.subheadline}
      </motion.p>

      {/* Interactive Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.button
          type="button"
          onClick={handleClick}
          disabled={isOpening}
          whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(217, 143, 163, 0.45)' }}
          whileTap={{ scale: 0.96 }}
          animate={isOpening ? { scale: 0.92, opacity: 0.7 } : {}}
          className="group relative inline-flex items-center gap-3 px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-cream-100 font-sans font-medium tracking-wide shadow-xl shadow-rose-950/60 border border-rose-300/30 overflow-hidden transition-all duration-300"
        >
          {/* Shimmer sweep */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

          <span className="relative z-10 text-sm sm:text-base">
            {content.opening.buttonText}
          </span>
          <Sparkles className="w-4 h-4 text-rose-200 transition-transform duration-300 group-hover:rotate-12" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
