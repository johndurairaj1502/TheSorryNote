'use client';

import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { kawaiiAudio } from '@/utils/audio';
import { Sparkles, Heart } from 'lucide-react';
import { HeartBiscuit, ChocoPie, KawaiiBow } from '../KawaiiStickers';

interface GiftRibbonScreenProps {
  onRibbonRemoved: () => void;
}

export const GiftRibbonScreen: React.FC<GiftRibbonScreenProps> = ({ onRibbonRemoved }) => {
  const [isUntied, setIsUntied] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const untiedRef = useRef<boolean>(false);

  const handleUntie = () => {
    if (untiedRef.current) return;
    untiedRef.current = true;
    setIsUntied(true);
    setIsDragging(false);

    // Play ribbon untie whoosh and chime
    kawaiiAudio.playRibbonUntie();

    // Transition smoothly to next screen after untie animation
    setTimeout(() => {
      onRibbonRemoved();
    }, 800);
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragOffset({ x: info.offset.x, y: info.offset.y });
    setIsDragging(true);

    // If dragged sufficiently far in any direction, trigger untie
    const distance = Math.hypot(info.offset.x, info.offset.y);
    if (distance > 90 && !untiedRef.current) {
      handleUntie();
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const distance = Math.hypot(info.offset.x, info.offset.y);
    if (distance > 60 && !untiedRef.current) {
      handleUntie();
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isUntied ? 0 : 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 w-full max-w-lg mx-auto px-4 py-6 flex flex-col items-center select-none"
    >
      {/* Decorative Washi Tape at Top */}
      <div className="w-32 h-6 washi-tape-pink rounded-sm mb-3 flex items-center justify-center border-t border-b border-white/60 shadow-sm">
        <span className="text-[10px] tracking-widest uppercase font-bold text-kawaii-choco-900/80 font-sans">
          SPECIAL DELIVERY 🎁
        </span>
      </div>

      {/* Main Gift Parcel Box */}
      <div className="relative w-full max-w-md aspect-[16/12] sm:aspect-[16/11] rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF5F8] to-[#FFE8F0] border-3 border-kawaii-pink-200 shadow-kawaii-lg p-6 flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle romantic pattern on gift paper */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#FF4D79_1px,transparent_1px)] [background-size:18px_18px]" />

        {/* Delicate dashed inner stitch border */}
        <div className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-kawaii-pink-300/60 pointer-events-none" />

        {/* Floating companion stickers outside box */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-5 -left-3 pointer-events-none z-30"
        >
          <HeartBiscuit size={52} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0], rotate: [6, -6, 6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -bottom-4 -right-3 pointer-events-none z-30"
        >
          <ChocoPie size={56} />
        </motion.div>

        {/* Hanging Gift Tag */}
        <motion.div
          animate={{ rotate: isDragging ? 8 : [-2, 3, -2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-4 left-6 z-25 origin-top-left pointer-events-none"
        >
          <div className="relative bg-white/95 border-2 border-kawaii-pink-300 rounded-xl px-3 py-1.5 shadow-md flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-kawaii-pink-400 absolute -top-1 left-3 shadow-inner" />
            <Heart className="w-3.5 h-3.5 text-kawaii-strawberry fill-kawaii-strawberry/30" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold text-kawaii-choco-900 tracking-wider font-sans leading-none">
                For You ♡
              </span>
              <span className="text-[9px] font-handwriting text-kawaii-strawberry font-bold leading-none mt-0.5">
                From Kabi
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- VERTICAL SATIN RIBBON --- */}
        <motion.div
          animate={
            isUntied
              ? { y: ['0%', '-140%'], opacity: [1, 0] }
              : {
                  x: dragOffset.x * 0.15,
                  scaleY: 1 + Math.abs(dragOffset.y) * 0.002,
                }
          }
          transition={{ duration: isUntied ? 0.7 : 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-y-0 w-12 sm:w-14 bg-gradient-to-r from-kawaii-pink-400 via-kawaii-strawberry to-kawaii-pink-500 shadow-md flex items-center justify-center pointer-events-none z-10"
        >
          {/* Specular sheen line down center */}
          <div className="w-1.5 h-full bg-white/40 blur-[1px]" />
          {/* Subtle stitched ribbon borders */}
          <div className="absolute inset-y-0 left-1 border-r border-dashed border-white/50" />
          <div className="absolute inset-y-0 right-1 border-l border-dashed border-white/50" />
        </motion.div>

        {/* --- HORIZONTAL SATIN RIBBON --- */}
        <motion.div
          animate={
            isUntied
              ? { x: ['0%', '140%'], opacity: [1, 0] }
              : {
                  y: dragOffset.y * 0.15,
                  scaleX: 1 + Math.abs(dragOffset.x) * 0.002,
                }
          }
          transition={{ duration: isUntied ? 0.7 : 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-x-0 h-12 sm:h-14 bg-gradient-to-b from-kawaii-pink-400 via-kawaii-strawberry to-kawaii-pink-500 shadow-md flex items-center justify-center pointer-events-none z-10"
        >
          <div className="h-1.5 w-full bg-white/40 blur-[1px]" />
          <div className="absolute inset-x-0 top-1 border-b border-dashed border-white/50" />
          <div className="absolute inset-x-0 bottom-1 border-t border-dashed border-white/50" />
        </motion.div>

        {/* --- INTERACTIVE 3D RIBBON BOW & PULL GRIP --- */}
        <motion.div
          drag
          dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
          dragElastic={0.4}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onClick={handleUntie}
          whileHover={{ scale: 1.06, cursor: 'grab' }}
          whileTap={{ scale: 0.95, cursor: 'grabbing' }}
          animate={
            isUntied
              ? {
                  scale: [1, 1.3, 0],
                  rotate: [0, 45, 90],
                  opacity: [1, 1, 0],
                }
              : {
                  scale: isDragging ? 1.15 : [1, 1.05, 1],
                  rotate: isDragging ? dragOffset.x * 0.1 : [0, 2, -2, 0],
                }
          }
          transition={
            isUntied
              ? { duration: 0.65, ease: 'easeOut' }
              : isDragging
              ? { duration: 0.05 }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          role="button"
          tabIndex={0}
          aria-label="Grab and pull the ribbon to open the surprise"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleUntie();
            }
          }}
          className="relative z-30 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none p-4"
        >
          {/* Luscious Satin Bow SVG with glossy 3D shading */}
          <div className="relative filter drop-shadow-[0_10px_20px_rgba(255,77,121,0.5)]">
            <svg width="120" height="96" viewBox="0 0 120 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="satinGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFAEC5" />
                  <stop offset="40%" stopColor="#FF4D79" />
                  <stop offset="100%" stopColor="#B31E42" />
                </linearGradient>
                <linearGradient id="satinGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFAEC5" />
                  <stop offset="40%" stopColor="#FF4D79" />
                  <stop offset="100%" stopColor="#B31E42" />
                </linearGradient>
                <radialGradient id="satinCenter" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#FFE0EA" />
                  <stop offset="35%" stopColor="#FF4D79" />
                  <stop offset="100%" stopColor="#991535" />
                </radialGradient>
              </defs>

              {/* Hanging Ribbon Tails */}
              <path
                d="M50 48C42 66 30 84 18 90C30 86 46 80 54 60"
                fill="url(#satinGradLeft)"
                stroke="#B31E42"
                strokeWidth="2"
              />
              <path
                d="M70 48C78 66 90 84 102 90C90 86 74 80 66 60"
                fill="url(#satinGradRight)"
                stroke="#B31E42"
                strokeWidth="2"
              />

              {/* Left Ribbon Loop */}
              <path
                d="M54 48C40 30 8 32 12 56C16 74 42 64 54 50Z"
                fill="url(#satinGradLeft)"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Left loop highlight */}
              <path
                d="M48 48C36 36 18 38 20 52C22 62 38 56 46 50Z"
                fill="#FFAEC5"
                opacity="0.6"
              />

              {/* Right Ribbon Loop */}
              <path
                d="M66 48C80 30 112 32 108 56C104 74 78 64 66 50Z"
                fill="url(#satinGradRight)"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              {/* Right loop highlight */}
              <path
                d="M72 48C84 36 102 38 100 52C98 62 82 56 74 50Z"
                fill="#FFAEC5"
                opacity="0.6"
              />

              {/* Center Ribbon Knot */}
              <ellipse cx="60" cy="48" rx="14" ry="14" fill="url(#satinCenter)" stroke="#FFFFFF" strokeWidth="2.5" />
              <path d="M52 46C56 42 64 42 68 46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            </svg>
          </div>

          {/* Pull instruction tag badge */}
          <motion.div
            animate={{
              y: [0, 4, 0],
              boxShadow: [
                '0 4px 12px rgba(255, 77, 121, 0.25)',
                '0 8px 20px rgba(255, 77, 121, 0.45)',
                '0 4px 12px rgba(255, 77, 121, 0.25)',
              ],
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-kawaii-pink-400 text-kawaii-strawberry font-sans font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
            <span>Grab & pull the ribbon to open ♡</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
