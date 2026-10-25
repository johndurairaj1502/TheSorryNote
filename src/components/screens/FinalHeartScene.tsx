'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '@/config/content';
import { Floating3DHeart } from '../Floating3DHeart';
import { romanticAudio } from '@/utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface FinalHeartSceneProps {
  onNext: () => void;
}

export const FinalHeartScene: React.FC<FinalHeartSceneProps> = ({ onNext }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { anticipation } = content;

  const handleReadyClick = () => {
    setIsTransitioning(true);
    romanticAudio.playHeartbeatThud(0.6);

    // Haptic feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([20, 40, 20]);
      } catch {
        // Ignored
      }
    }

    setTimeout(() => {
      onNext();
    }, 750);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: isTransitioning ? 0.4 : 1,
        scale: isTransitioning ? 1.15 : 1,
      }}
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 text-center max-w-xl mx-auto"
    >
      {/* Glow aura */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 h-72 rounded-full bg-rose-500/20 blur-3xl pointer-events-none"
      />

      {/* Center glowing heart with progressive brightness */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="my-6"
      >
        <Floating3DHeart size={180} glowIntensity={0.85} isPulsingFast={isTransitioning} />
      </motion.div>

      {/* Teaser Title */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xs uppercase tracking-[0.25em] font-sans text-rose-300 font-medium mb-3"
      >
        {anticipation.teaserTitle}
      </motion.p>

      {/* Main Emotion Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="font-serif text-3xl sm:text-4xl text-cream-100 font-light tracking-tight max-w-md mx-auto leading-snug mb-10"
      >
        {anticipation.teaserSubtitle}
      </motion.h2>

      {/* "I'm ready" Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <motion.button
          type="button"
          onClick={handleReadyClick}
          disabled={isTransitioning}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(246, 199, 208, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-cream-100 font-sans font-medium text-base shadow-xl shadow-burgundy-950/70 border border-rose-300/30 overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10">{anticipation.buttonText}</span>
          <Heart className="w-4 h-4 text-rose-200 fill-rose-200/50 transition-transform duration-300 group-hover:scale-125" />
          <Sparkles className="w-3.5 h-3.5 text-cream-200/80 absolute right-3 -top-1 animate-pulse" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
