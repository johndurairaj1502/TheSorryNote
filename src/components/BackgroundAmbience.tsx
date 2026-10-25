'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RosePetalsCanvas } from './RosePetalsCanvas';

interface BackgroundAmbienceProps {
  stage?: number;
  variant?: 'burgundy' | 'anticipation' | 'blush' | 'warm';
}

export const BackgroundAmbience: React.FC<BackgroundAmbienceProps> = ({
  variant = 'burgundy',
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Dynamic Base Gradient */}
      <motion.div
        className="absolute inset-0 transition-colors duration-1000"
        animate={{
          background:
            variant === 'blush'
              ? 'radial-gradient(ellipse at 50% 30%, #3d1b2c 0%, #26111e 50%, #160a12 100%)'
              : variant === 'anticipation'
              ? 'radial-gradient(ellipse at 50% 40%, #250e1b 0%, #170912 60%, #0c0409 100%)'
              : variant === 'warm'
              ? 'radial-gradient(ellipse at 50% 25%, #461e33 0%, #2b1120 45%, #180D12 100%)'
              : 'radial-gradient(ellipse at 50% 20%, #301522 0%, #180D12 65%, #0F070B 100%)',
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Floating Ambient Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-400/20 blur-[100px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.22, 0.15, 0.22],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-burgundy-600/30 blur-[120px]"
      />

      <motion.div
        animate={{
          scale: [0.95, 1.1, 0.95],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -bottom-32 left-1/4 w-[32rem] h-[32rem] rounded-full bg-rose-300/15 blur-[110px]"
      />

      {/* Subtle Film Grain Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40 mix-blend-overlay" />

      {/* Romantic Rose Petals & Sparkles Canvas */}
      <RosePetalsCanvas density="medium" />

      {/* Vignette Shadow Frame */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(15,7,11,0.8)] pointer-events-none" />
    </div>
  );
};
