'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/config/content';
import { Heart, RotateCcw, MessageCircleHeart, Clock, Sparkles } from 'lucide-react';

interface FinalMessageProps {
  onReplay: () => void;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({ onReplay }) => {
  const [selectedChoice, setSelectedChoice] = useState<'talk' | 'time' | null>(null);
  const { finalPayoff } = content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full flex flex-col items-center justify-center min-h-[90vh] px-4 py-10 max-w-2xl mx-auto text-center"
    >
      {/* Top soft badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-400/15 border border-rose-300/30 backdrop-blur-md mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
        <span className="text-xs uppercase tracking-widest font-sans text-rose-200 font-medium">
          Always &bull; With you
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-100 font-light tracking-tight leading-snug mb-8 whitespace-pre-line"
      >
        {finalPayoff.headline}
      </motion.h1>

      {/* Card Content with paragraphs and closing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full backdrop-blur-xl bg-burgundy-800/40 border border-rose-300/20 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-burgundy-950/80 mb-10 relative overflow-hidden"
      >
        {/* Soft card inner aura */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Supporting paragraphs */}
        <div className="space-y-4 font-sans text-sm sm:text-base text-rose-100/90 font-light leading-relaxed mb-8 max-w-lg mx-auto">
          {finalPayoff.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + idx * 0.12 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Tagline progression */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="pt-6 border-t border-rose-300/15 flex flex-col items-center gap-1.5"
        >
          {finalPayoff.closingTagline.map((line, idx) => (
            <span
              key={idx}
              className={`font-serif tracking-wide ${
                idx === finalPayoff.closingTagline.length - 1
                  ? 'text-lg sm:text-xl text-rose-200 font-normal italic mt-1'
                  : 'text-sm sm:text-base text-rose-300/80 font-light'
              }`}
            >
              {line}
            </span>
          ))}

          {/* Handwritten Signature */}
          <span className="font-handwriting text-3xl sm:text-4xl text-rose-300 font-bold tracking-wide mt-5">
            {finalPayoff.signature}
          </span>
        </motion.div>
      </motion.div>

      {/* Respectful Choice Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="w-full max-w-md flex flex-col items-center"
      >
        <p className="text-xs uppercase tracking-wider font-sans text-rose-300/70 font-medium mb-4">
          {finalPayoff.choicePrompt}
        </p>

        {/* Two Equal Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-6">
          <motion.button
            type="button"
            onClick={() => setSelectedChoice('talk')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`min-h-[48px] px-5 py-3 rounded-full flex items-center justify-center gap-2.5 text-sm font-sans font-medium transition-all duration-300 border ${
              selectedChoice === 'talk'
                ? 'bg-rose-500 text-cream-100 border-rose-300 shadow-lg shadow-rose-950/50'
                : 'bg-burgundy-800/60 hover:bg-burgundy-700/70 text-cream-200 border-rose-400/25 hover:border-rose-400/50'
            }`}
          >
            <MessageCircleHeart className="w-4 h-4 text-rose-300" />
            <span>{finalPayoff.choiceTalk.buttonText}</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setSelectedChoice('time')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`min-h-[48px] px-5 py-3 rounded-full flex items-center justify-center gap-2.5 text-sm font-sans font-medium transition-all duration-300 border ${
              selectedChoice === 'time'
                ? 'bg-rose-500 text-cream-100 border-rose-300 shadow-lg shadow-rose-950/50'
                : 'bg-burgundy-800/60 hover:bg-burgundy-700/70 text-cream-200 border-rose-400/25 hover:border-rose-400/50'
            }`}
          >
            <Clock className="w-4 h-4 text-rose-300" />
            <span>{finalPayoff.choiceTime.buttonText}</span>
          </motion.button>
        </div>

        {/* Dynamic Respectful Response Card */}
        <AnimatePresence mode="wait">
          {selectedChoice && (
            <motion.div
              key={selectedChoice}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full p-4 rounded-2xl bg-burgundy-900/80 border border-rose-400/30 text-center mb-8 shadow-lg shadow-burgundy-950/60"
            >
              <p className="font-serif italic text-rose-200 text-sm sm:text-base leading-relaxed">
                {selectedChoice === 'talk'
                  ? finalPayoff.choiceTalk.responseMessage
                  : finalPayoff.choiceTime.responseMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replay Button */}
        <motion.button
          type="button"
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans text-rose-300/80 hover:text-cream-100 bg-burgundy-900/40 hover:bg-burgundy-800/60 border border-rose-400/20 hover:border-rose-400/40 transition-all duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{finalPayoff.replayButtonText}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
