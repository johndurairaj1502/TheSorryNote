'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { KawaiiStickersBackground } from '@/components/KawaiiStickers';
import { CuteAudioToggle } from '@/components/kawaii/CuteAudioToggle';
import { SealedIntroCard } from '@/components/kawaii/SealedIntroCard';
import { SorryNoteCard } from '@/components/kawaii/SorryNoteCard';
import { CatPunishmentCard } from '@/components/kawaii/CatPunishmentCard';
import { GlossyHeartHold } from '@/components/kawaii/GlossyHeartHold';
import { FinalApologyMessage } from '@/components/kawaii/FinalApologyMessage';

export default function Home() {
  // Stage 1: Sealed Intro Card (Envelope Wax Seal)
  // Stage 2: Sorry Note ("Next… 🥺♡")
  // Stage 3: Cute Cat Punishment Mini-Interaction
  // Stage 4: Glossy Heart Hold (NO BURST - smoothly shrinks/zooms out)
  // Stage 5: Final Screen ("Sorry V🤍 ♡ — By yours, Kabi")
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
            <SealedIntroCard key="stage-1" onOpen={() => setStage(2)} />
          )}

          {stage === 2 && (
            <SorryNoteCard key="stage-2" onNext={() => setStage(3)} />
          )}

          {stage === 3 && (
            <CatPunishmentCard key="stage-3" onProceed={() => setStage(4)} />
          )}

          {stage === 4 && (
            <GlossyHeartHold key="stage-4" onComplete={() => setStage(5)} />
          )}

          {stage === 5 && (
            <FinalApologyMessage key="stage-5" onReplay={() => setStage(1)} />
          )}
        </AnimatePresence>
      </div>

      {/* NO FOOTER ANYWHERE (Per explicit instructions) */}
    </main>
  );
}

