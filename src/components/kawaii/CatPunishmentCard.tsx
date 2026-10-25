'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { kawaiiAudio } from '@/utils/audio';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { HeartBiscuit, ChocoPie, SparkleStar } from '../KawaiiStickers';

interface CatPunishmentCardProps {
  onProceed: () => void;
}

type PunishmentType = 'hammer' | 'stare' | 'cuddles';

interface PunishmentOption {
  id: PunishmentType;
  title: string;
  subtitle: string;
  icon: string;
  bubbleText: string;
  reactionSound: () => void;
}

export const CatPunishmentCard: React.FC<CatPunishmentCardProps> = ({ onProceed }) => {
  const [selectedPunishment, setSelectedPunishment] = useState<PunishmentType>('hammer');
  const [bonkCount, setBonkCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const punishments: PunishmentOption[] = [
    {
      id: 'hammer',
      title: 'Toy Hammer Bonk',
      subtitle: 'Soft squeaky plush bonk',
      icon: '🔨',
      bubbleText: 'BOINK! Bad kabiii! 😾 Think about your mistake!',
      reactionSound: () => kawaiiAudio.playBonk(),
    },
    {
      id: 'stare',
      title: 'Angry Cat Pout',
      subtitle: 'Deadly cute side-eye',
      icon: '😾',
      bubbleText: 'Hmph! Think about what you did, mister! 🐾',
      reactionSound: () => kawaiiAudio.playCuteMeow(),
    },
    {
      id: 'cuddles',
      title: '100 Cuddles Duty',
      subtitle: 'Mandatory snuggles',
      icon: '💖',
      bubbleText: 'Sentence: 100 extra cuddles & apologies to Madam Jii! 🧸',
      reactionSound: () => kawaiiAudio.playSparkle(),
    },
  ];

  const currentOption = punishments.find((p) => p.id === selectedPunishment) || punishments[0];

  const handleTriggerPunishment = (p: PunishmentOption) => {
    setSelectedPunishment(p.id);
    setIsAnimating(true);
    setBonkCount((prev) => prev + 1);
    p.reactionSound();

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -15, filter: 'blur(5px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center select-none"
    >
      {/* Decorative Washi Tape */}
      <div className="w-36 h-6 washi-tape-cream rounded-sm mb-3 flex items-center justify-center border-t border-b border-kawaii-choco-900/10 shadow-sm">
        <span className="text-[10px] tracking-widest uppercase font-bold text-kawaii-choco-800/80 font-sans">
          COURT OF MADAM JII ⚖️
        </span>
      </div>

      {/* Main Cute Prompt */}
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest font-sans text-kawaii-strawberry font-bold px-3 py-1 rounded-full bg-kawaii-pink-100 border border-kawaii-pink-200 inline-block mb-1">
          Madam Jii&apos;s Special Tribunal
        </span>
        <h2 className="font-handwriting text-3xl sm:text-4xl text-kawaii-choco-900 font-bold tracking-wide mt-1">
          Madam Jii, what punishment should kabiii get? 🐱
        </h2>
        <p className="text-xs sm:text-sm text-kawaii-choco-600 font-sans font-medium mt-1">
          Pick your cartoon punishment below! (Squeaky & soft only)
        </p>
      </div>

      {/* The Interactive Stage Box */}
      <div className="w-full scrapbook-paper p-5 sm:p-7 relative overflow-hidden flex flex-col items-center">
        {/* Cute corner biscuits */}
        <div className="absolute -top-3 -right-3 pointer-events-none opacity-80">
          <HeartBiscuit size={44} />
        </div>
        <div className="absolute -bottom-3 -left-3 pointer-events-none opacity-80">
          <ChocoPie size={48} />
        </div>

        {/* Comic Speech Bubble */}
        <motion.div
          key={selectedPunishment + bonkCount}
          initial={{ scale: 0.8, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.35, type: 'spring', stiffness: 300, damping: 20 }}
          className="relative bg-white border-2 border-kawaii-choco-800 rounded-2xl px-4 py-2.5 shadow-md max-w-sm mb-4 text-center"
        >
          <span className="text-xs sm:text-sm font-bold text-kawaii-choco-900 font-sans">
            {currentOption.bubbleText}
          </span>
          {/* Speech bubble pointy arrow */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-kawaii-choco-800 rotate-45" />
        </motion.div>

        {/* Central Animated Scene: The Cat & Kabi */}
        <div className="relative w-full max-w-sm h-48 sm:h-52 flex items-center justify-center my-2">
          {/* Floating comic stars when bonked */}
          <AnimatePresence>
            {isAnimating && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0, x: -30, y: -20 }}
                  animate={{ opacity: 1, scale: 1.2, x: -50, y: -50 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute z-30 pointer-events-none text-xl"
                >
                  ⭐
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, scale: 1.3, x: 40, y: -55 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute z-30 pointer-events-none text-xl"
                >
                  💫
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0, x: 0, y: -10 }}
                  animate={{ opacity: 1, scale: 1.2, x: 0, y: -65 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute z-30 pointer-events-none font-bold text-kawaii-strawberry text-sm"
                >
                  {selectedPunishment === 'cuddles' ? '💖' : '💢'}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Left: The Judge Cat */}
          <motion.div
            animate={
              isAnimating && selectedPunishment === 'hammer'
                ? { rotate: [-10, 25, -5, 0], scale: [1, 1.15, 1] }
                : isAnimating && selectedPunishment === 'stare'
                ? { x: [0, 8, -4, 0], scale: [1, 1.1, 1] }
                : { y: [0, -5, 0] }
            }
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center mr-4 sm:mr-8"
          >
            {/* Soft Toy Hammer in paw (if hammer punishment) */}
            {selectedPunishment === 'hammer' && (
              <motion.div
                animate={
                  isAnimating
                    ? { rotate: [-45, 45, -30, 0], x: [0, 20, 0] }
                    : { rotate: [-15, -5, -15] }
                }
                transition={{ duration: isAnimating ? 0.4 : 2, repeat: isAnimating ? 0 : Infinity }}
                className="absolute -top-6 right-0 text-3xl z-20 pointer-events-none origin-bottom-left"
              >
                🔨
              </motion.div>
            )}

            {/* Cat Illustration SVG */}
            <svg width="105" height="105" viewBox="0 0 100 100" fill="none" className="filter drop-shadow-md">
              {/* Ears */}
              <polygon points="20,32 12,8 42,20" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="22,26 18,14 36,20" fill="#FFB8CF" />
              <polygon points="80,32 88,8 58,20" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="78,26 82,14 64,20" fill="#FFB8CF" />
              {/* Head */}
              <ellipse cx="50" cy="48" rx="36" ry="30" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" />
              {/* Eyes */}
              {selectedPunishment === 'stare' ? (
                <>
                  <path d="M30 42L42 46" stroke="#542E1D" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M70 42L58 46" stroke="#542E1D" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="36" cy="48" r="3.5" fill="#542E1D" />
                  <circle cx="64" cy="48" r="3.5" fill="#542E1D" />
                </>
              ) : (
                <>
                  <ellipse cx="36" cy="46" rx="4" ry="5" fill="#542E1D" />
                  <circle cx="34" cy="44" r="1.5" fill="#FFFFFF" />
                  <ellipse cx="64" cy="46" rx="4" ry="5" fill="#542E1D" />
                  <circle cx="62" cy="44" r="1.5" fill="#FFFFFF" />
                </>
              )}
              {/* Nose & Mouth */}
              <polygon points="48,52 52,52 50,55" fill="#FF5C8D" />
              <path d="M46 55C48 57 50 57 50 55C50 57 52 57 54 55" stroke="#542E1D" strokeWidth="2.5" strokeLinecap="round" />
              {/* Cheeks */}
              <ellipse cx="28" cy="52" rx="5" ry="3" fill="#FFADC2" />
              <ellipse cx="72" cy="52" rx="5" ry="3" fill="#FFADC2" />
              {/* Body */}
              <path d="M30 75C30 62 70 62 70 75L72 88C72 92 28 92 28 88Z" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" />
              {/* Paws */}
              <ellipse cx="38" cy="80" rx="7" ry="5" fill="#FFFDF9" stroke="#542E1D" strokeWidth="2" />
              <ellipse cx="62" cy="80" rx="7" ry="5" fill="#FFFDF9" stroke="#542E1D" strokeWidth="2" />
            </svg>
            <span className="text-[11px] font-bold text-kawaii-choco-900 bg-white/90 px-2.5 py-0.5 rounded-full border border-kawaii-pink-200 mt-1">
              Madam Jii 🐾
            </span>
          </motion.div>

          {/* Right: The Apologetic Kabi Cartoon */}
          <motion.div
            animate={
              isAnimating
                ? {
                    x: [0, 8, -6, 4, 0],
                    rotate: [0, 8, -8, 4, 0],
                    scale: [1, 0.92, 1],
                  }
                : { y: [0, 3, 0] }
            }
            transition={{ duration: 0.45 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Cartoon Kabi Chibi Character */}
            <svg width="105" height="105" viewBox="0 0 100 100" fill="none" className="filter drop-shadow-md">
              {/* Hair */}
              <ellipse cx="50" cy="38" rx="33" ry="25" fill="#542E1D" />
              <path d="M22 42C24 24 38 18 50 18C62 18 76 24 78 42C72 32 64 30 50 32C36 30 28 32 22 42Z" fill="#3D2014" />
              {/* Head */}
              <ellipse cx="50" cy="50" rx="30" ry="26" fill="#FFE5D9" stroke="#542E1D" strokeWidth="2.5" />
              {/* Apologetic teary pleading eyes ( ╥ ﹏ ╥ ) */}
              <path d="M34 46C38 42 42 44 42 48" stroke="#542E1D" strokeWidth="3" strokeLinecap="round" />
              <path d="M66 46C62 42 58 44 58 48" stroke="#542E1D" strokeWidth="3" strokeLinecap="round" />
              {/* Cute little tears */}
              <ellipse cx="32" cy="54" rx="2" ry="3.5" fill="#70C1FF" />
              <ellipse cx="68" cy="54" rx="2" ry="3.5" fill="#70C1FF" />
              {/* Blush */}
              <ellipse cx="30" cy="52" rx="4" ry="2.5" fill="#FFADC2" />
              <ellipse cx="70" cy="52" rx="4" ry="2.5" fill="#FFADC2" />
              {/* Pouting mouth */}
              <path d="M46 58C48 56 52 56 54 58" stroke="#542E1D" strokeWidth="2.5" strokeLinecap="round" />
              {/* Chibi Body with "Sorry" note */}
              <path d="M35 72C35 66 65 66 65 72L67 86C67 90 33 90 33 86Z" fill="#FFADC2" stroke="#542E1D" strokeWidth="2.5" />
              {/* Hands holding "SORRY" sign */}
              <rect x="36" y="74" width="28" height="15" rx="3" fill="#FFFDF9" stroke="#542E1D" strokeWidth="1.5" />
              <text x="50" y="84" textAnchor="middle" fill="#FF4D75" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                SORRY
              </text>
            </svg>
            <span className="text-[11px] font-bold text-kawaii-choco-900 bg-white/90 px-2.5 py-0.5 rounded-full border border-kawaii-pink-200 mt-1">
              kabiii 🥺
            </span>
          </motion.div>
        </div>

        {/* 3 Clickable Punishment Options */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-3 mb-4">
          {punishments.map((opt) => {
            const isSelected = selectedPunishment === opt.id;
            return (
              <motion.button
                key={opt.id}
                type="button"
                onClick={() => handleTriggerPunishment(opt)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-2xl flex items-center gap-2.5 text-left border-2 transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-kawaii-pink-100 to-kawaii-pink-200 border-kawaii-strawberry shadow-md'
                    : 'bg-white hover:bg-kawaii-pink-50 border-kawaii-pink-200 text-kawaii-choco-800'
                }`}
              >
                <span className="text-2xl sm:text-3xl flex-shrink-0">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-kawaii-choco-900 block truncate">
                    {opt.title}
                  </span>
                  <span className="text-[10px] sm:text-xs text-kawaii-choco-600 block truncate">
                    {opt.subtitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-dashed border-kawaii-pink-200">
          <motion.button
            type="button"
            onClick={() => handleTriggerPunishment(currentOption)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 text-xs text-kawaii-choco-700 hover:text-kawaii-strawberry font-sans font-bold px-3 py-1.5 rounded-full bg-kawaii-pink-50 border border-kawaii-pink-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Bonk Again! (Bonks: {bonkCount})</span>
          </motion.button>

          {/* Proceed to Heart Hold */}
          <motion.button
            type="button"
            onClick={onProceed}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(255, 77, 121, 0.35)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-kawaii-strawberry via-kawaii-pink-500 to-kawaii-pink-600 text-white font-sans font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
          >
            <span>Okay, hold my heart now… 🥺</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
