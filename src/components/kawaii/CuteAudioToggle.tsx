'use client';

import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { kawaiiAudio } from '@/utils/audio';

export const CuteAudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = kawaiiAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    kawaiiAudio.toggle();
  };

  return (
    <div className="fixed top-4 right-4 z-50 select-none">
      <motion.button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Mute cute music' : 'Play cute music'}
        className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/80 hover:bg-white border-2 border-kawaii-pink-200 hover:border-kawaii-pink-400 shadow-sm text-kawaii-choco-800 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative flex items-center justify-center w-4 h-4">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.span
                key="playing"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="text-kawaii-strawberry"
              >
                <Volume2 size={15} />
              </motion.span>
            ) : (
              <motion.span
                key="muted"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="text-kawaii-choco-600"
              >
                <VolumeX size={15} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span className="text-[11px] font-bold tracking-wide uppercase font-sans text-kawaii-choco-700">
          {isPlaying ? 'Music On ♫' : 'Music Off'}
        </span>

        {isPlaying && (
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kawaii-strawberry opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-kawaii-strawberry"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
