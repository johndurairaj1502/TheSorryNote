'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/config/content';
import { kawaiiAudio } from '@/utils/audio';
import { Sparkles, ArrowRight, Heart, Eye } from 'lucide-react';
import { HeartBiscuit, ChocoPie, KawaiiBow } from '../KawaiiStickers';

interface ScratchRevealScreenProps {
  onComplete: () => void;
}

export const ScratchRevealScreen: React.FC<ScratchRevealScreenProps> = ({ onComplete }) => {
  const [activeCard, setActiveCard] = useState<1 | 2>(1);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [scratchProgress, setScratchProgress] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const isScratchingRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastAudioTimeRef = useRef<number>(0);
  const hasRevealedRef = useRef<boolean>(false);

  const config = content.scratchCards;
  const currentCardData = activeCard === 1 ? config.card1 : config.card2;

  // Initialize the scratch-off canvas layer with pixel-perfect resolution
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Use container dimensions if canvas hasn't finished layout yet
    const container = cardContainerRef.current;
    const rect = container ? container.getBoundingClientRect() : canvas.getBoundingClientRect();
    const wCss = rect.width || 340;
    const hCss = rect.height || 255;

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2.5) : 1;

    // Set buffer resolution
    canvas.width = Math.round(wCss * dpr);
    canvas.height = Math.round(hCss * dpr);

    const w = canvas.width;
    const h = canvas.height;

    // Reset composite mode to standard paint
    ctx.globalCompositeOperation = 'source-over';

    // 1. Shimmering rose gold / silvery pink foil gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#FFD4E2');
    grad.addColorStop(0.3, '#FFF2F7');
    grad.addColorStop(0.6, '#FFB8CF');
    grad.addColorStop(0.85, '#FFA7C2');
    grad.addColorStop(1, '#FF85AC');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. Cute diagonal shimmer stripes
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 18 * dpr;
    for (let x = -w; x < w * 2; x += 45 * dpr) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Cute sprinkled hearts & stars watermark
    ctx.save();
    ctx.fillStyle = 'rgba(255, 77, 121, 0.28)';
    ctx.font = `${18 * dpr}px sans-serif`;
    for (let x = 20 * dpr; x < w - 10; x += 60 * dpr) {
      for (let y = 30 * dpr; y < h - 10; y += 50 * dpr) {
        ctx.fillText('♡', x, y);
      }
    }
    ctx.restore();

    // 4. Center Badge: "✨ Scratch to uncover ♡ ✨"
    ctx.save();
    ctx.shadowColor = 'rgba(84, 46, 29, 0.2)';
    ctx.shadowBlur = 10 * dpr;
    ctx.shadowOffsetY = 4 * dpr;

    const badgeW = Math.min(240 * dpr, w * 0.75);
    const badgeH = 48 * dpr;
    const badgeX = (w - badgeW) / 2;
    const badgeY = (h - badgeH) / 2;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 24 * dpr);
    ctx.fill();

    ctx.strokeStyle = '#FF85AC';
    ctx.lineWidth = 2.5 * dpr;
    ctx.stroke();

    ctx.fillStyle = '#FF4D79';
    ctx.font = `bold ${14 * dpr}px system-ui, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Scratch to reveal ♡ ✨', w / 2, h / 2);
    ctx.restore();

    hasRevealedRef.current = false;
    setIsRevealed(false);
    setScratchProgress(0);
  }, []);

  // Initialize canvas with a tiny delay to ensure proper CSS layout bounds
  useEffect(() => {
    const timer = setTimeout(() => {
      initCanvas();
    }, 60);

    return () => clearTimeout(timer);
  }, [activeCard, initCanvas]);

  // Window resize re-init if not already revealed
  useEffect(() => {
    const handleResize = () => {
      if (!hasRevealedRef.current) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  // Force reveal remaining card
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

  // Sample scratched pixels to compute percentage
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
    const stride = 32; // Sample every 32nd pixel for instantaneous check
    const totalSampled = (data.length / 4) / stride;

    for (let i = 0; i < data.length; i += 4 * stride) {
      if (data[i + 3] < 128) {
        transparentPixels++;
      }
    }

    const pct = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));
    setScratchProgress(pct);

    // Scratch threshold: 35% is very comfortable and satisfying
    if (pct >= 35) {
      completeReveal();
    }
  }, [completeReveal]);

  // Scratch drawing calculation with direct 1:1 viewport-to-buffer mapping
  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || hasRevealedRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    // Exact scale factor between display coordinates and internal canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 50 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.arc(x, y, 25 * dpr, 0, Math.PI * 2);
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

  // Pointer event handlers
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

  // Transition to next card or proceed to next stage
  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    kawaiiAudio.playPop();

    if (activeCard === 1) {
      setTimeout(() => {
        setActiveCard(2);
        setIsTransitioning(false);
      }, 400);
    } else {
      setTimeout(() => {
        onComplete();
      }, 400);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -15, filter: 'blur(5px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-lg mx-auto px-4 py-4 sm:py-6 flex flex-col items-center select-none"
    >
      {/* Decorative Washi Tape */}
      <div className="w-36 h-6 washi-tape-pink rounded-sm mb-3 flex items-center justify-center border-t border-b border-white/60 shadow-sm">
        <span className="text-[10px] tracking-widest uppercase font-bold text-kawaii-choco-900/80 font-sans">
          CARD {activeCard} OF 2 ♡
        </span>
      </div>

      {/* Main Required Heading */}
      <div className="text-center mb-3">
        <h2 className="font-handwriting text-4xl sm:text-5xl text-kawaii-choco-900 font-bold tracking-wide">
          {config.title}
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
          ref={cardContainerRef}
          className={`relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border-3 border-kawaii-pink-200 shadow-kawaii-md my-2 flex items-center justify-center transition-colors duration-300 ${
            activeCard === 1 ? 'bg-white' : 'bg-black'
          }`}
        >
          {/* Underlying Revealed Image (Edge to edge with high quality rendering) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentCardData.image}
              alt="Scratch revealed photo"
              className={`w-full h-full select-none pointer-events-none transition-transform duration-500 ${
                activeCard === 1
                  ? 'object-contain bg-white p-1'
                  : 'object-contain bg-black'
              } ${isRevealed ? 'scale-100' : 'scale-98'}`}
              draggable={false}
            />
          </div>

          {/* HTML5 Scratch-Off Canvas Layer (touch-action: none prevents scrolling) */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute inset-0 w-full h-full cursor-pointer touch-none z-10 transition-opacity duration-600 ${
              isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ touchAction: 'none' }}
          />

          {/* Sparkle burst on successful reveal */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              >
                <div className="text-5xl animate-bounce">✨</div>
              </motion.div>
            )}
          </AnimatePresence>
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
              key={`caption-${activeCard}`}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full flex flex-col items-center mt-3"
            >
              {/* Exact Caption Display */}
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-kawaii-pink-50 via-white to-kawaii-pink-50 border-2 border-kawaii-pink-300 shadow-sm max-w-sm mb-3">
                <p className="font-handwriting text-2xl sm:text-3xl text-kawaii-strawberry font-bold leading-snug">
                  &ldquo;{currentCardData.caption}&rdquo;
                </p>
              </div>

              {/* Continue Button */}
              <motion.button
                type="button"
                onClick={handleNext}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(255, 77, 121, 0.35)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-kawaii-strawberry via-kawaii-pink-500 to-kawaii-pink-600 text-white font-sans font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
              >
                <span>{activeCard === 1 ? 'Next scratch card ♡' : 'Continue… 🐾'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
