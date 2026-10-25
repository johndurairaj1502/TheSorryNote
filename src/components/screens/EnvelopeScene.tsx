'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/config/content';
import { romanticAudio } from '@/utils/audio';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface EnvelopeSceneProps {
  onNext: () => void;
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSealBroken, setIsSealBroken] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) {
      onNext();
      return;
    }

    // Haptic feedback
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignored
      }
    }

    romanticAudio.playWaxSealBreak();
    setIsSealBroken(true);

    setTimeout(() => {
      setIsOpen(true);
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full flex flex-col items-center justify-center min-h-[85vh] px-4 py-2 sm:py-6 max-w-xl mx-auto"
    >
      {/* Top hint prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-3 sm:mb-5"
      >
        <span className="text-xs uppercase tracking-widest font-sans text-rose-300/85 font-medium px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>{isOpen ? content.envelope.envelopeOpenedHint : content.envelope.envelopeHint}</span>
        </span>
      </motion.div>

      {/* The Envelope System Container (Perspective wrapper) */}
      <div
        className="relative w-full max-w-md sm:max-w-xl aspect-[16/11] flex items-center justify-center select-none"
        style={{ perspective: 1200 }}
      >
        {/* Glow behind envelope */}
        <div className="absolute inset-0 bg-rose-400/20 rounded-2xl blur-3xl -z-10 pointer-events-none" />

        {/* 1. Envelope Back Base Plate */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-burgundy-800 via-burgundy-900 to-burgundy-950 border border-rose-300/25 envelope-shadow z-0" />

        {/* 2. Top Flap (Triangular 3D folding flap) */}
        <motion.div
          style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: isOpen ? -180 : 0,
            zIndex: isOpen ? 5 : 30,
          }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute top-0 inset-x-0 h-1/2 pointer-events-none"
        >
          <div
            className="w-full h-full shadow-lg"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              background: 'linear-gradient(180deg, #461E33 0%, #301522 100%)',
              borderBottom: '1px solid rgba(217, 143, 163, 0.25)',
            }}
          />
        </motion.div>

        {/* 3. Letter Paper (Slides out smoothly and elevates into full readable view) */}
        <motion.div
          initial={false}
          animate={{
            y: isOpen ? -85 : 15,
            scale: isOpen ? 1.02 : 0.94,
            opacity: isOpen ? 1 : 0,
            zIndex: isOpen ? 40 : 10,
          }}
          transition={{
            duration: 0.85,
            delay: isOpen ? 0.25 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute inset-x-2 sm:inset-x-4 top-2 rounded-2xl paper-texture paper-shadow text-burgundy-950 p-5 sm:p-7 flex flex-col justify-between border border-cream-300/80 transition-shadow ${
            isOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
          style={{
            boxShadow: isOpen
              ? '0 25px 50px -12px rgba(15, 7, 11, 0.75), 0 0 35px rgba(246, 199, 208, 0.3)'
              : undefined,
          }}
        >
          {/* Letter Header */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-rose-200/60">
              <span className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-semibold">
                {content.envelope.salutation}
              </span>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-300/40" />
            </div>

            {/* Letter Paragraphs */}
            <div className="space-y-2.5 font-sans text-xs sm:text-sm text-burgundy-900/95 leading-relaxed font-normal">
              {content.envelope.letterBody.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  transition={{
                    delay: isOpen ? 0.35 + index * 0.1 : 0,
                    duration: 0.45,
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{
                  delay: isOpen ? 0.35 + content.envelope.letterBody.length * 0.1 : 0,
                  duration: 0.45,
                }}
                className="font-serif italic text-rose-800 text-sm sm:text-base pt-1 font-medium"
              >
                {content.envelope.closingQuestion}
              </motion.p>
            </div>
          </div>

          {/* Letter Bottom Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="pt-3 sm:pt-4 flex items-center justify-between"
          >
            <span className="text-[11px] sm:text-xs text-rose-600/80 font-serif italic">
              Tap to continue ♡
            </span>
            <motion.button
              type="button"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-cream-100 text-xs sm:text-sm font-sans font-medium shadow-md shadow-rose-950/40 hover:shadow-rose-950/60 transition-all duration-200"
            >
              <span>{content.envelope.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 4. Envelope Front Pocket Layers (Left, Right, Bottom folds) */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-20">
          {/* Left triangle fold */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
              background: 'linear-gradient(90deg, #26121D 0%, #301522 100%)',
            }}
          />
          {/* Right triangle fold */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
              background: 'linear-gradient(-90deg, #26121D 0%, #301522 100%)',
            }}
          />
          {/* Bottom triangle fold */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(0% 100%, 50% 45%, 100% 100%)',
              background: 'linear-gradient(0deg, #1d0c15 0%, #3a192b 100%)',
              borderTop: '1px solid rgba(217, 143, 163, 0.15)',
            }}
          />
        </div>

        {/* 5. Wax Seal in Center (Interactive button before opened) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 0.5,
                opacity: 0,
                rotate: -20,
                y: 25,
                filter: 'blur(3px)',
              }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 z-40 flex items-center justify-center cursor-pointer"
              onClick={handleOpenEnvelope}
              role="button"
              tabIndex={0}
              aria-label="Click wax seal to open letter"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenEnvelope();
                }
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.92 }}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(217, 143, 163, 0.3)',
                    '0 0 28px rgba(246, 199, 208, 0.65)',
                    '0 0 15px rgba(217, 143, 163, 0.3)',
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="w-full h-full rounded-full wax-seal flex items-center justify-center relative group"
              >
                {/* Wax edge irregularity */}
                <div className="absolute inset-1 rounded-full border border-rose-300/30" />
                
                {/* Heart emblem stamped in wax */}
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-rose-200 fill-rose-300/80 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:scale-110" />

                {/* Sparkle icon */}
                <Sparkles className="w-3.5 h-3.5 text-cream-200/80 absolute -top-1 -right-1 animate-pulse" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gentle helper text under envelope */}
      {!isOpen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-rose-300/80 font-sans mt-4 sm:mt-5 tracking-wide flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>{content.envelope.waxSealLabel}</span>
        </motion.p>
      )}
    </motion.div>
  );
};
