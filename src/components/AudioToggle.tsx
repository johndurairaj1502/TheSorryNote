'use client';

import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { romanticAudio } from '@/utils/audio';

interface AudioToggleProps {
  className?: string;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing: boolean) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    setHasInteracted(true);
    romanticAudio.toggle();
  };

  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 ${className}`}>
      <motion.button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Mute romantic ambient music' : 'Play romantic ambient music'}
        className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md bg-burgundy-900/60 border border-rose-400/25 hover:border-rose-400/60 shadow-lg text-cream-200 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative flex items-center justify-center w-5 h-5">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.span
                key="playing"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-rose-300"
              >
                <Volume2 size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="muted"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-cream-200/60 group-hover:text-cream-200"
              >
                <VolumeX size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span className="text-xs font-medium tracking-wide uppercase font-sans text-rose-200/90 hidden sm:inline-block">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>

        {/* Pulsing indicator when playing */}
        {isPlaying && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-300"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
