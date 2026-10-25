'use client';

import React from 'react';
import { motion } from 'framer-motion';

// --- Individual Cute Kawaii SVG Sticker Components ---

// 1. Heart Biscuit with Pink Strawberry Glaze & Sprinkles
export const HeartBiscuit: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`filter drop-shadow-md ${className}`}>
    {/* Golden baked cookie base */}
    <path
      d="M50 88C47 88 15 63 8 39C2 18 20 6 38 9C45 10 48 16 50 20C52 16 55 10 62 9C80 6 98 18 92 39C85 63 53 88 50 88Z"
      fill="#E6AC6E"
      stroke="#C98F4E"
      strokeWidth="3.5"
    />
    {/* Baked cookie inner rim */}
    <path
      d="M50 84C47.5 84 18 61 12 39C6.5 20 22 10 37 12.5C44 13.5 48 18.5 50 22C52 18.5 56 13.5 63 12.5C78 10 93.5 20 88 39C82 61 52.5 84 50 84Z"
      fill="#F5C48A"
    />
    {/* Pink strawberry icing */}
    <path
      d="M50 76C48 76 22 56 18 38C14 23 27 15 39 17C44 18 47.5 22 50 25C52.5 22 56 18 61 17C73 15 86 23 82 38C78 56 52 76 50 76Z"
      fill="#FF85AC"
    />
    <path
      d="M50 72C48.5 72 25 54 21 38C17.5 24.5 29 17.5 39.5 19C44.5 20 47.5 23.5 50 26C52.5 23.5 55.5 20 60.5 19C71 17.5 82.5 24.5 79 38C75 54 51.5 72 50 72Z"
      fill="#FFA7C3"
    />
    {/* Cute Sprinkles */}
    <rect x="32" y="32" width="7" height="3.5" rx="1.75" transform="rotate(25 32 32)" fill="#FFFFFF" />
    <rect x="62" y="30" width="7" height="3.5" rx="1.75" transform="rotate(-30 62 30)" fill="#FFF3A8" />
    <rect x="42" y="44" width="7" height="3.5" rx="1.75" transform="rotate(15 42 44)" fill="#B5EAD7" />
    <rect x="58" y="48" width="7" height="3.5" rx="1.75" transform="rotate(-40 58 48)" fill="#FFFFFF" />
    <rect x="48" y="58" width="6" height="3" rx="1.5" transform="rotate(35 48 58)" fill="#C7CEEA" />
  </svg>
);

// 2. Lotte Choco Pie Style Pie (Chocolate Glaze, White Marshmallow layer peek)
export const ChocoPie: React.FC<{ size?: number; className?: string }> = ({ size = 68, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`filter drop-shadow-md ${className}`}>
    {/* Base chocolate cake disc bottom */}
    <ellipse cx="50" cy="58" rx="42" ry="24" fill="#3D2014" />
    <ellipse cx="50" cy="54" rx="40" ry="22" fill="#542E1D" />
    {/* Fluffy white marshmallow filling */}
    <ellipse cx="50" cy="48" rx="38" ry="18" fill="#FFFDF9" stroke="#FFEBF1" strokeWidth="2" />
    {/* Soft pink strawberry swirl in marshmallow */}
    <path d="M28 47C35 45 42 49 50 47C58 45 65 49 72 47" stroke="#FFADC2" strokeWidth="3" strokeLinecap="round" />
    {/* Top chocolate cake dome */}
    <ellipse cx="50" cy="38" rx="42" ry="24" fill="#542E1D" />
    <ellipse cx="50" cy="35" rx="40" ry="22" fill="#6D3D27" />
    {/* Glossy chocolate coating glaze */}
    <ellipse cx="48" cy="32" rx="34" ry="17" fill="#8A5136" />
    {/* Specular curved highlight on chocolate */}
    <path d="M22 30C28 20 45 16 65 18" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />
    <path d="M28 35C33 28 45 25 56 26" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    {/* Drizzled pink chocolate lines */}
    <path d="M30 38C38 34 46 41 54 37C62 33 68 40 73 36" stroke="#FF7597" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3. Round Strawberry Biscuit with Jam Center
export const StrawberryBiscuit: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`filter drop-shadow-md ${className}`}>
    {/* Scalloped cookie edge */}
    <circle cx="50" cy="50" r="42" fill="#F5C48A" stroke="#C98F4E" strokeWidth="3" />
    <circle cx="50" cy="50" r="36" fill="#FCE0C2" />
    {/* Tiny decorative holes around */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <circle
        key={i}
        cx={50 + 26 * Math.cos((angle * Math.PI) / 180)}
        cy={50 + 26 * Math.sin((angle * Math.PI) / 180)}
        r="2"
        fill="#C98F4E"
      />
    ))}
    {/* Strawberry jam heart in the middle */}
    <path
      d="M50 64C48 64 34 52 30 40C26 29 36 22 43 25C47 26.5 49 30 50 31.5C51 30 53 26.5 57 25C64 22 74 29 70 40C66 52 52 64 50 64Z"
      fill="#FF4D75"
    />
    <path
      d="M50 60C48.5 60 36 49 33 39C30 30 38 24 44 26C47 27 49 30 50 31C51 30 53 27 56 26C62 24 70 30 67 39C64 49 51.5 60 50 60Z"
      fill="#FF7597"
    />
    {/* Jam shine */}
    <circle cx="42" cy="33" r="2.5" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

// 4. Cute Pastel Pink Ribbon Bow
export const KawaiiBow: React.FC<{ size?: number; className?: string }> = ({ size = 52, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`filter drop-shadow-sm ${className}`}>
    {/* Left ribbon loop */}
    <path d="M44 48C30 32 8 36 12 56C15 72 34 62 44 52Z" fill="#FF85AC" stroke="#E6396E" strokeWidth="2.5" />
    <path d="M42 49C32 37 16 40 18 54C20 65 34 58 42 51Z" fill="#FFA7C3" />
    {/* Right ribbon loop */}
    <path d="M56 48C70 32 92 36 88 56C85 72 66 62 56 52Z" fill="#FF85AC" stroke="#E6396E" strokeWidth="2.5" />
    <path d="M58 49C68 37 84 40 82 54C80 65 66 58 58 51Z" fill="#FFA7C3" />
    {/* Hanging ribbon tails */}
    <path d="M42 54L30 82C29 84 32 86 35 84L48 68L44 54Z" fill="#FF7597" stroke="#E6396E" strokeWidth="2" />
    <path d="M58 54L70 82C71 84 68 86 65 84L52 68L56 54Z" fill="#FF7597" stroke="#E6396E" strokeWidth="2" />
    {/* Center knot */}
    <circle cx="50" cy="50" r="10" fill="#FF4D79" stroke="#E6396E" strokeWidth="2" />
    <circle cx="48" cy="48" r="3" fill="#FFFFFF" opacity="0.7" />
  </svg>
);

// 5. Adorable Winking Kawaii Cat (White with pink ears & cheeks)
export const KawaiiCatWink: React.FC<{ size?: number; className?: string }> = ({ size = 70, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`filter drop-shadow-md ${className}`}>
    {/* Ears */}
    <polygon points="22,35 15,8 42,22" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" strokeLinejoin="round" />
    <polygon points="24,30 20,15 36,22" fill="#FFB8CF" />
    <polygon points="78,35 85,8 58,22" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" strokeLinejoin="round" />
    <polygon points="76,30 80,15 64,22" fill="#FFB8CF" />
    {/* Cat Face / Head */}
    <ellipse cx="50" cy="52" rx="38" ry="32" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" />
    {/* Left open happy eye */}
    <ellipse cx="36" cy="48" rx="4.5" ry="5.5" fill="#542E1D" />
    <circle cx="34" cy="46" r="1.8" fill="#FFFFFF" />
    {/* Right winking eye (> shape or curved arc) */}
    <path d="M60 48C63 44 68 44 71 48" stroke="#542E1D" strokeWidth="3.5" strokeLinecap="round" />
    {/* Cute nose & mouth */}
    <polygon points="48,53 52,53 50,56" fill="#FF5C8D" />
    <path d="M45 56C47 58 50 58 50 56C50 58 53 58 55 56" stroke="#542E1D" strokeWidth="2.5" strokeLinecap="round" />
    {/* Pink blushing cheeks */}
    <ellipse cx="28" cy="55" rx="6" ry="3.5" fill="#FFADC2" opacity="0.85" />
    <ellipse cx="72" cy="55" rx="6" ry="3.5" fill="#FFADC2" opacity="0.85" />
    {/* Whiskers */}
    <path d="M16 48L25 50M15 54L24 53" stroke="#542E1D" strokeWidth="2" strokeLinecap="round" />
    <path d="M84 48L75 50M85 54L76 53" stroke="#542E1D" strokeWidth="2" strokeLinecap="round" />
    {/* Tiny flower on head */}
    <circle cx="32" cy="24" r="5" fill="#FF7597" />
    <circle cx="32" cy="24" r="2" fill="#FFF3A8" />
  </svg>
);

// 6. Cute Happy Cat Eating a Strawberry
export const KawaiiCatStrawberry: React.FC<{ size?: number; className?: string }> = ({ size = 72, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`filter drop-shadow-md ${className}`}>
    {/* Ears */}
    <polygon points="25,32 18,10 42,22" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" strokeLinejoin="round" />
    <polygon points="26,27 22,16 36,22" fill="#FFB8CF" />
    <polygon points="75,32 82,10 58,22" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" strokeLinejoin="round" />
    <polygon points="74,27 78,16 64,22" fill="#FFB8CF" />
    {/* Cat Head */}
    <ellipse cx="50" cy="46" rx="36" ry="30" fill="#FFFDF9" stroke="#542E1D" strokeWidth="3" />
    {/* Happy closed curve eyes ( ^ ^ ) */}
    <path d="M32 44C35 40 40 40 43 44" stroke="#542E1D" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M57 44C60 40 65 40 68 44" stroke="#542E1D" strokeWidth="3.5" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="26" cy="48" rx="6" ry="3" fill="#FFADC2" />
    <ellipse cx="74" cy="48" rx="6" ry="3" fill="#FFADC2" />
    {/* Strawberry held in paws */}
    <path
      d="M50 85C42 85 32 75 34 60C35 52 42 50 50 52C58 50 65 52 66 60C68 75 58 85 50 85Z"
      fill="#FF4D75"
      stroke="#542E1D"
      strokeWidth="2.5"
    />
    {/* Strawberry seeds */}
    <circle cx="43" cy="62" r="1.5" fill="#FFF3A8" />
    <circle cx="55" cy="64" r="1.5" fill="#FFF3A8" />
    <circle cx="48" cy="72" r="1.5" fill="#FFF3A8" />
    <circle cx="42" cy="74" r="1.5" fill="#FFF3A8" />
    {/* Green strawberry leaf top */}
    <path d="M50 52C48 48 40 48 44 45C48 47 50 49 50 52Z" fill="#88D49E" />
    <path d="M50 52C52 48 60 48 56 45C52 47 50 49 50 52Z" fill="#88D49E" />
    {/* Cat Paws holding strawberry */}
    <ellipse cx="34" cy="65" rx="5" ry="4" fill="#FFFDF9" stroke="#542E1D" strokeWidth="2.5" />
    <ellipse cx="66" cy="65" rx="5" ry="4" fill="#FFFDF9" stroke="#542E1D" strokeWidth="2.5" />
  </svg>
);

// 7. Mini Love Letter Sticker with Wings
export const LoveLetterSticker: React.FC<{ size?: number; className?: string }> = ({ size = 56, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`filter drop-shadow-sm ${className}`}>
    {/* Angel wings */}
    <path d="M25 45C10 35 4 48 8 58C12 66 22 58 25 54Z" fill="#FFFDF9" stroke="#FFADC2" strokeWidth="2" />
    <path d="M75 45C90 35 96 48 92 58C88 66 78 58 75 54Z" fill="#FFFDF9" stroke="#FFADC2" strokeWidth="2" />
    {/* Envelope Body */}
    <rect x="22" y="34" width="56" height="38" rx="6" fill="#FFFDF9" stroke="#542E1D" strokeWidth="2.5" />
    {/* Envelope fold lines */}
    <path d="M24 36L50 56L76 36" stroke="#542E1D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Heart seal */}
    <path
      d="M50 61C49 61 43 56 41 51C39 46 44 43 47 44.5C49 45.5 50 47 50 47C50 47 51 45.5 53 44.5C56 43 61 46 59 51C57 56 51 61 50 61Z"
      fill="#FF4D75"
    />
  </svg>
);

// 8. 4-Point Kawaii Sparkle Star
export const SparkleStar: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M25 2C25 15 35 25 48 25C35 25 25 35 25 48C25 35 15 25 2 25C15 25 25 15 25 2Z"
      fill="#FFE58F"
      stroke="#FFC53D"
      strokeWidth="2"
    />
    <circle cx="25" cy="25" r="4" fill="#FFFFFF" />
  </svg>
);

// 9. Cherry Blossom Flower Sticker
export const SakuraFlower: React.FC<{ size?: number; className?: string }> = ({ size = 42, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {[0, 72, 144, 216, 288].map((angle, idx) => (
      <path
        key={idx}
        d="M50 50 C45 30, 40 18, 50 14 C60 18, 55 30, 50 50"
        fill="#FFB8CF"
        stroke="#FF85AC"
        strokeWidth="1.5"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="7" fill="#FFF3A8" stroke="#E8B478" strokeWidth="1.5" />
  </svg>
);

// --- The Master Floating Stickers Ambient Background ---
export const KawaiiStickersBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden select-none">
      {/* 1. Top-Left: Heart Biscuit */}
      <motion.div
        className="absolute top-6 left-5 sm:left-12 opacity-85"
        animate={{
          y: [0, -14, 0],
          rotate: [0, -8, 0],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <HeartBiscuit size={72} />
      </motion.div>

      {/* 2. Top-Right: Lotte Choco Pie */}
      <motion.div
        className="absolute top-12 right-6 sm:right-16 opacity-90"
        animate={{
          y: [0, 15, 0],
          rotate: [5, 12, 5],
        }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <ChocoPie size={76} />
      </motion.div>

      {/* 3. Top-Center Left: Cute Bow */}
      <motion.div
        className="absolute top-20 left-1/4 hidden md:block opacity-75"
        animate={{
          y: [0, -8, 0],
          rotate: [-12, -4, -12],
        }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <KawaiiBow size={48} />
      </motion.div>

      {/* 4. Top-Center Right: Sparkle */}
      <motion.div
        className="absolute top-16 right-1/4 opacity-80"
        animate={{
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 90, 180],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SparkleStar size={34} />
      </motion.div>

      {/* 5. Mid-Left: Winking Kitty */}
      <motion.div
        className="absolute top-1/3 -left-2 sm:left-8 opacity-90"
        animate={{
          y: [0, 12, 0],
          rotate: [-4, 6, -4],
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <KawaiiCatWink size={74} />
      </motion.div>

      {/* 6. Mid-Right: Strawberry Biscuit */}
      <motion.div
        className="absolute top-1/3 -right-2 sm:right-10 opacity-85"
        animate={{
          y: [0, -16, 0],
          rotate: [10, -5, 10],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <StrawberryBiscuit size={68} />
      </motion.div>

      {/* 7. Lower-Left: Kitty with Strawberry */}
      <motion.div
        className="absolute bottom-20 left-6 sm:left-14 opacity-90"
        animate={{
          y: [0, -10, 0],
          rotate: [3, -5, 3],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <KawaiiCatStrawberry size={78} />
      </motion.div>

      {/* 8. Lower-Right: Love Letter with Wings */}
      <motion.div
        className="absolute bottom-24 right-8 sm:right-16 opacity-85"
        animate={{
          y: [0, 14, 0],
          rotate: [-8, 6, -8],
        }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <LoveLetterSticker size={64} />
      </motion.div>

      {/* 9. Bottom-Center Left: Little Flower */}
      <motion.div
        className="absolute bottom-10 left-1/3 opacity-70"
        animate={{
          scale: [0.9, 1.1, 0.9],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SakuraFlower size={38} />
      </motion.div>

      {/* 10. Bottom-Center Right: Heart Biscuit small */}
      <motion.div
        className="absolute bottom-8 right-1/3 hidden sm:block opacity-75"
        animate={{
          y: [0, -8, 0],
          rotate: [15, 25, 15],
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      >
        <HeartBiscuit size={48} />
      </motion.div>

      {/* 11. Random tiny floating star sparkles */}
      <motion.div
        className="absolute top-1/2 left-20 hidden lg:block opacity-65"
        animate={{ scale: [0.7, 1.1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SparkleStar size={24} />
      </motion.div>

      <motion.div
        className="absolute top-2/3 right-24 hidden lg:block opacity-65"
        animate={{ scale: [0.7, 1.2, 0.7] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <SparkleStar size={28} />
      </motion.div>
    </div>
  );
};
