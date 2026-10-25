'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeartBiscuit, ChocoPie, KawaiiBow, SparkleStar } from '../KawaiiStickers';
import { kawaiiAudio } from '@/utils/audio';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';

interface SorryNoteCardProps {
  onNext: () => void;
}

export const SorryNoteCard: React.FC<SorryNoteCardProps> = ({ onNext }) => {
  const handleProceed = () => {
    kawaiiAudio.playPop();
    setTimeout(() => {
      kawaiiAudio.playSparkle();
    }, 150);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-lg mx-auto px-4 py-4 sm:py-6 flex flex-col items-center select-none"
    >
      {/* Washi Tape at Top */}
      <div className="w-28 h-5 washi-tape-pink rounded-sm mb-2 flex items-center justify-center border-t border-b border-white/60 shadow-sm">
        <span className="text-[9px] tracking-widest uppercase font-bold text-kawaii-choco-900/80 font-sans">
          SORRY NOTE 💌
        </span>
      </div>

      {/* Main Scrapbook Letter Card */}
      <div className="w-full scrapbook-paper p-5 sm:p-7 relative flex flex-col items-center text-center overflow-hidden">
        {/* Decorative corner stickers */}
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [-8, 6, -8] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 -left-3 pointer-events-none z-20"
        >
          <HeartBiscuit size={46} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 5, 0], rotate: [6, -6, 6] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -bottom-3 -right-3 pointer-events-none z-20"
        >
          <ChocoPie size={48} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-2 right-2 pointer-events-none z-20"
        >
          <KawaiiBow size={32} />
        </motion.div>

        {/* Sweet Badge */}
        <div className="mb-1">
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-kawaii-pink-100 border border-kawaii-pink-300 text-kawaii-strawberry text-[11px] font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>To My Dearest ♡</span>
            <Sparkles className="w-3 h-3" />
          </span>
        </div>

        {/* Salutation */}
        <h2 className="font-handwriting text-3xl sm:text-4xl text-kawaii-choco-900 font-bold tracking-wide mt-0.5 mb-2">
          Dearest ♡
        </h2>

        {/* Sincere Letter Body - Exact Text Requested */}
        <div className="w-full flex flex-col gap-2 text-xs sm:text-[13px] text-kawaii-choco-800 font-sans leading-relaxed text-left sm:text-center px-1 sm:px-3 mb-3">
          <p className="bg-white/70 p-2 sm:p-2.5 rounded-xl border border-kawaii-pink-100 shadow-sm">
            Yes, I know that everything I did was wrong. But please, don&apos;t say that we&apos;re strangers now, or that I don&apos;t matter to you anymore, or that I&apos;m no longer someone close to you.
          </p>

          <p className="bg-white/70 p-2 sm:p-2.5 rounded-xl border border-kawaii-pink-100 shadow-sm">
            You&apos;ll always matter to me. No matter how many mistakes I make, even if I don&apos;t know how to convince you or make things right, I&apos;ll still stay by your side. I&apos;ll keep trying until you forgive me, no matter how long it takes. Even if I don&apos;t know how to make things right, I&apos;ll never stop trying to win back your forgiveness. 🥺❤️
          </p>

          <p className="bg-white/70 p-2 sm:p-2.5 rounded-xl border border-kawaii-pink-100 shadow-sm">
            So please, punish me if you want to… even with that little cat game. But please, don&apos;t stop talking to me.
          </p>

          <p className="bg-white/85 p-2.5 rounded-xl border border-kawaii-pink-200 shadow-sm font-handwriting text-2xl sm:text-3xl text-kawaii-strawberry font-bold text-center">
            We&apos;re not strangers anymore… ♡
          </p>
        </div>

        {/* Required Button: “Next… 🥺♡” */}
        <motion.button
          id="sorry-note-next-btn"
          type="button"
          onClick={handleProceed}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 8px 25px rgba(255, 77, 121, 0.4)',
          }}
          whileTap={{ scale: 0.96 }}
          className="relative inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-gradient-to-r from-kawaii-strawberry via-kawaii-pink-500 to-kawaii-pink-600 text-white font-sans font-bold text-xs sm:text-sm shadow-kawaii-md hover:shadow-kawaii-lg border-2 border-white transition-all cursor-pointer group"
        >
          <span>Next… 🥺♡</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};
