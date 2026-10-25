'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/config/content';
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

interface StoryChaptersProps {
  onNext: () => void;
  onPrev: () => void;
}

export const StoryChapters: React.FC<StoryChaptersProps> = ({ onNext, onPrev }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [direction, setDirection] = useState(1);

  const chapters = content.story.chapters;
  const isFirstChapter = currentChapter === 0;
  const isLastChapter = currentChapter === chapters.length - 1;

  const handleNext = () => {
    if (isLastChapter) {
      onNext();
    } else {
      setDirection(1);
      setCurrentChapter((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (isFirstChapter) {
      onPrev();
    } else {
      setDirection(-1);
      setCurrentChapter((prev) => prev - 1);
    }
  };

  const chapter = chapters[currentChapter];

  // Motion variants for directional chapter transition
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.35,
        ease: 'easeIn',
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
      transition={{ duration: 0.6 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 max-w-2xl mx-auto"
    >
      {/* Chapter Progress Header */}
      <div className="w-full max-w-md flex flex-col items-center mb-8">
        <span className="text-xs uppercase tracking-widest font-sans text-rose-300/80 mb-3 font-medium">
          {content.story.sectionBadge} &bull; {chapter.chapterNumber} / 0{chapters.length}
        </span>

        {/* Progress Bar with glowing segments */}
        <div className="w-full grid grid-cols-3 gap-2.5 h-1.5 px-2">
          {chapters.map((_, idx) => (
            <div
              key={idx}
              className="relative h-full bg-burgundy-700/80 rounded-full overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{
                  width: idx <= currentChapter ? '100%' : '0%',
                  opacity: idx <= currentChapter ? 1 : 0.3,
                }}
                transition={{ duration: 0.4 }}
                className={`h-full rounded-full ${
                  idx === currentChapter
                    ? 'bg-gradient-to-r from-rose-400 to-rose-300 shadow-[0_0_8px_rgba(246,199,208,0.8)]'
                    : 'bg-rose-500/60'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Chapter Card with AnimatePresence */}
      <div className="relative w-full min-h-[340px] flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentChapter}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full backdrop-blur-xl bg-burgundy-900/60 border border-rose-300/20 rounded-3xl p-7 sm:p-10 shadow-2xl shadow-burgundy-950/80 relative overflow-hidden text-center"
          >
            {/* Subtle card glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Decorative Heart Icon */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-rose-500/15 border border-rose-400/25 flex items-center justify-center text-rose-300 shadow-inner"
            >
              <Heart className="w-5 h-5 fill-rose-300/20" />
            </motion.div>

            {/* Chapter Subtitle / Theme */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 0.2 }}
              className="text-xs uppercase tracking-widest text-rose-300 font-sans font-medium block mb-2"
            >
              {chapter.subtitle}
            </motion.span>

            {/* Chapter Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream-100 font-normal tracking-tight mb-5 leading-snug"
            >
              {chapter.title}
            </motion.h2>

            {/* Chapter Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="font-sans text-sm sm:text-base text-rose-100/85 font-light leading-relaxed max-w-lg mx-auto"
            >
              {chapter.text}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="w-full max-w-md flex items-center justify-between mt-8 gap-4 px-2">
        {/* Back Button */}
        <motion.button
          type="button"
          onClick={handlePrev}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md bg-burgundy-800/60 border border-rose-400/20 hover:border-rose-400/40 text-cream-200/90 text-sm font-sans transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 text-rose-300" />
          <span>{content.story.backButtonText}</span>
        </motion.button>

        {/* Chapter Dot Indicators */}
        <div className="flex items-center gap-2">
          {chapters.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection(idx > currentChapter ? 1 : -1);
                setCurrentChapter(idx);
              }}
              aria-label={`Go to chapter ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentChapter
                  ? 'bg-rose-300 scale-125 shadow-[0_0_8px_rgba(246,199,208,0.8)]'
                  : 'bg-rose-500/30 hover:bg-rose-400/50'
              }`}
            />
          ))}
        </div>

        {/* Next / Proceed Button */}
        <motion.button
          type="button"
          onClick={handleNext}
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 text-cream-100 text-sm font-sans font-medium shadow-md shadow-rose-950/40 hover:shadow-rose-950/60 transition-all duration-200"
        >
          <span>{isLastChapter ? content.story.finishButtonText : content.story.nextButtonText}</span>
          {isLastChapter ? (
            <Sparkles className="w-4 h-4 text-rose-200" />
          ) : (
            <ChevronRight className="w-4 h-4 text-rose-200" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
