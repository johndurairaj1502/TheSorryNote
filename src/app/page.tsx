'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { KawaiiStickersBackground } from '@/components/KawaiiStickers';
import { CuteAudioToggle } from '@/components/kawaii/CuteAudioToggle';
import { GiftRibbonScreen } from '@/components/kawaii/GiftRibbonScreen';
import { SealedIntroCard } from '@/components/kawaii/SealedIntroCard';
import { SorryNoteCard } from '@/components/kawaii/SorryNoteCard';
import { ScratchRevealScreen } from '@/components/kawaii/ScratchRevealScreen';
import { CatPunishmentCard } from '@/components/kawaii/CatPunishmentCard';
import { GlossyHeartHold } from '@/components/kawaii/GlossyHeartHold';
import { FinalApologyMessage } from '@/components/kawaii/FinalApologyMessage';

export default function Home() {
  // Stage 1: Opening Screen — Pull Away the Ribbon 🎁
  // Stage 2: Heart-Sealed Letter (Layered Envelope & Wax Seal) 💌
  // Stage 3: Sorry Note (Exact preserved apology letter) 🥺♡
  // Stage 4: Scratch to Reveal ✨ (Card 1: Bite cheek, Card 2: Lotte Choco Pie)
  // Stage 5: Cat Punishment Tribunal (Madam Jii + Toy Hammer + "Sorry!" popup on impact) 🐱🔨
  // Stage 6: Glossy Heart Hold (Smooth circular progress & Zoom OUT without burst) 💖
  // Stage 7: Final Message ("Sorry V🤍 — By yours, Kabi" + WhatsApp button)
  const [stage, setStage] = useState<number>(1);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden py-6 sm:py-10">
      {/* Decorative Floating Stickers (Heart biscuits, Choco Pies, cats, bows, flowers, stars) */}
      <KawaiiStickersBackground />

      {/* Floating Audio Toggle (Cute Pastel Pill) */}
      <CuteAudioToggle />

      {/* Main Interactive Stage Container */}
      <div className="relative z-10 w-full flex items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <GiftRibbonScreen key="stage-1" onRibbonRemoved={() => setStage(2)} />
          )}

          {stage === 2 && (
            <SealedIntroCard key="stage-2" onOpen={() => setStage(3)} />
          )}

          {stage === 3 && (
            <SorryNoteCard key="stage-3" onNext={() => setStage(4)} />
          )}

          {stage === 4 && (
            <ScratchRevealScreen key="stage-4" onComplete={() => setStage(5)} />
          )}

          {stage === 5 && (
            <CatPunishmentCard key="stage-5" onProceed={() => setStage(6)} />
          )}

          {stage === 6 && (
            <GlossyHeartHold key="stage-6" onComplete={() => setStage(7)} />
          )}

          {stage === 7 && (
            <FinalApologyMessage key="stage-7" onReplay={() => setStage(1)} />
          )}
        </AnimatePresence>
      </div>

      {/* NO FOOTER ANYWHERE (Per explicit instructions) */}
    </main>
  );
}
