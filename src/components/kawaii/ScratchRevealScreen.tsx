'use client';

import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/config/content';
import { kawaiiAudio } from '@/utils/audio';
import { ArrowRight, Heart, Eye } from 'lucide-react';
import { HeartBiscuit, ChocoPie, KawaiiBow } from '../KawaiiStickers';

interface SingleCardProps {
  cardNumber: 1 | 2;
  image: string;
  caption: string;
  isSecondCard: boolean;
  onDone: () => void;
}

const SingleScratchCard: React.FC<SingleCardProps> = ({
  cardNumber,
  image,
  caption,
  isSecondCard,
  onDone,
}) => {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [scratchProgress, setScratchProgress] = useState<number>(0);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScratchingRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastAudioTimeRef = useRef<number>(0);
  const hasRevealedRef = useRef<boolean>(false);

  // Paint the scratch foil onto the canvas buffer synchronously
  const paintScratchLayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Reset composite mode
    ctx.globalCompositeOperation = 'source-over';

    // 1. Shimmering metallic foil gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#FFD4E2');
    grad.addColorStop(0.25, '#FFF2F7');
    grad.addColorStop(0.55, '#FFB8CF');
    grad.addColorStop(0.85, '#FFA7C2');
    grad.addColorStop(1, '#FF85AC');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. Crisp diagonal shimmer stripes
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 36;
    for (let x = -w; x < w * 2; x += 85) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Delicate hearts & sparkles watermark
    ctx.save();
    ctx.fillStyle = 'rgba(255, 77, 121, 0.28)';
    ctx.font = '32px sans-serif';
    for (let x = 40; x < w - 20; x += 110) {
      for (let y = 60; y < h - 20; y += 95) {
        ctx.fillText('♡', x, y);
      }
    }
    ctx.restore();

    // 4. Center Cute Badge: "✨ Scratch to reveal ♡ ✨"
    ctx.save();
    ctx.shadowColor = 'rgba(84, 46, 29, 0.22)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;

    const badgeW = Math.min(460, w * 0.76);
    const badgeH = 88;
    const badgeX = (w - badgeW) / 2;
    const badgeY = (h - badgeH) / 2;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 44);
    ctx.fill();

    ctx.strokeStyle = '#FF85AC';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#FF4D79';
    ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch to reveal ♡', w / 2, h / 2);
    ctx.restore();
  }, []);

  // useLayoutEffect runs SYNCHRONOUSLY before the browser renders the first frame
  // This guarantees the canvas is 100% opaque and covered BEFORE ANY PAINT!
  useLayoutEffect(() => {
    paintScratchLayer();
  }, [paintScratchLayer]);

  // Complete reveal
  const completeReveal = useCallback(() => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;
    setIsRevealed(true);
    setScratchProgress(100);
    kawaiiAudio.playSparkle();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  // Compute scratched percentage by sampling
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealedRef.current) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let transparentPixels = 0;
    const stride = 32;
    const totalSampled = (data.length / 4) / stride;

    for (let i = 0; i < data.length; i += 4 * stride) {
      if (data[i + 3] < 128) {
        transparentPixels++;
      }
    }

    const pct = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));
    setScratchProgress(pct);

    // Scratch threshold: ~32% triggers full smooth reveal
    if (pct >= 32) {
      completeReveal();
    }
  }, [completeReveal]);

  // Scratch with exact 1:1 mapping from screen client coordinates to 680x510 canvas buffer
  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 80; // comfortable wide brush on 680x510 buffer
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPointRef.current = { x, y };

    // Play subtle scratch sound throttled
    const now = Date.now();
    if (now - lastAudioTimeRef.current > 110) {
      kawaiiAudio.playScratch();
      lastAudioTimeRef.current = now;
    }

    checkScratchPercentage();
  };

  // Pointer event listeners
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isScratchingRef.current = true;
    lastPointRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    e.preventDefault();
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isScratchingRef.current = false;
    lastPointRef.current = null;
  };

  const handleProceedClick = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    kawaiiAudio.playPop();
    onDone();
  };

  return (
    <motion.div
      key={`scratch-stage-${cardNumber}`}
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -15, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col items-center"
    >
      {/* Decorative Washi Tape */}
      <div className="w-36 h-6 washi-tape-pink rounded-sm mb-3 flex items-center justify-center border-t border-b border-white/60 shadow-sm">
        <span className="text-[10px] tracking-widest uppercase font-bold text-kawaii-choco-900/80 font-sans">
          CARD {cardNumber} OF 2 ♡
        </span>
      </div>

      {/* Main Required Heading */}
      <div className="text-center mb-3">
        <h2 className="font-handwriting text-4xl sm:text-5xl text-kawaii-choco-900 font-bold tracking-wide">
          Scratch to reveal ✨
        </h2>
        <p className="text-xs sm:text-sm text-kawaii-choco-600 font-sans font-medium mt-1">
          Rub your finger or mouse gently to reveal the photo!
        </p>
      </div>

      {/* Scrapbook Container */}
      <div className="w-full scrapbook-paper p-5 sm:p-7 relative flex flex-col items-center text-center overflow-hidden">
        {/* Floating companion stickers */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -left-3 pointer-events-none z-20"
        >
          <HeartBiscuit size={48} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0], rotate: [6, -6, 6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -bottom-4 -right-3 pointer-events-none z-20"
        >
          <ChocoPie size={52} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-2 right-3 pointer-events-none z-20"
        >
          <KawaiiBow size={34} />
        </motion.div>

        {/* Central Scratch Card Frame */}
        <div
          className={`relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border-3 border-kawaii-pink-200 shadow-kawaii-md my-2 flex items-center justify-center transition-colors duration-300 ${
            isSecondCard ? 'bg-black' : 'bg-white'
          }`}
        >
          {/* Underlying Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Scratch revealed photo"
              className={`w-full h-full select-none pointer-events-none ${
                isSecondCard
                  ? 'object-contain bg-black'
                  : 'object-contain bg-white p-1'
              }`}
              draggable={false}
            />
          </div>

          {/* 
            HTML5 Scratch Canvas Layer:
            Pre-configured with width=680 and height=510, with initial CSS background.
            This ensures zero millisecond of transparency before canvas draws!
          */}
          <canvas
            ref={canvasRef}
            width={680}
            height={510}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute inset-0 w-full h-full cursor-pointer touch-none z-10 transition-opacity duration-500 ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ touchAction: 'none' }}
          />
        </div>

        {/* Controls while scratching */}
        {!isRevealed && (
          <div className="mt-2 flex items-center gap-2">
            <div className="text-xs font-sans font-semibold text-kawaii-choco-600 bg-white/90 px-3 py-1 rounded-full border border-kawaii-pink-200 shadow-sm flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-kawaii-strawberry fill-kawaii-strawberry/40" />
              <span>Scratched: {scratchProgress}%</span>
            </div>

            {/* Quick Uncover Button */}
            <button
              type="button"
              onClick={completeReveal}
              className="text-[11px] font-sans font-bold text-kawaii-strawberry bg-kawaii-pink-50 hover:bg-kawaii-pink-100 px-3 py-1 rounded-full border border-kawaii-pink-200 shadow-sm transition-colors cursor-pointer flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              <span>Reveal all</span>
            </button>
          </div>
        )}

        {/* Revealed Caption Section */}
        <AnimatePresence mode="wait">
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full flex flex-col items-center mt-3"
            >
              {/* Exact Caption Display */}
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-kawaii-pink-50 via-white to-kawaii-pink-50 border-2 border-kawaii-pink-300 shadow-sm max-w-sm mb-3">
                <p className="font-handwriting text-2xl sm:text-3xl text-kawaii-strawberry font-bold leading-snug">
                  &ldquo;{caption}&rdquo;
                </p>
              </div>

              {/* Continue Button */}
              <motion.button
                type="button"
                onClick={handleProceedClick}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(255, 77, 121, 0.35)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-kawaii-strawberry via-kawaii-pink-500 to-kawaii-pink-600 text-white font-sans font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
              >
                <span>{isSecondCard ? 'Continue… 🐾' : 'Next scratch card ♡'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const ScratchRevealScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [activeCard, setActiveCard] = useState<1 | 2>(1);
  const config = content.scratchCards;

  return (
    <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-4 sm:py-6 flex flex-col items-center select-none">
      {/* 
        mode="wait" ensures Card 1 smoothly fades out and unmounts completely 
        BEFORE Card 2 mounts. Only one card exists in the DOM at any time!
      */}
      <AnimatePresence mode="wait">
        {activeCard === 1 && (
          <SingleScratchCard
            key="scratch-card-1"
            cardNumber={1}
            image={config.card1.image}
            caption={config.card1.caption}
            isSecondCard={false}
            onDone={() => setActiveCard(2)}
          />
        )}

        {activeCard === 2 && (
          <SingleScratchCard
            key="scratch-card-2"
            cardNumber={2}
            image={config.card2.image}
            caption={config.card2.caption}
            isSecondCard={true}
            onDone={onComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
