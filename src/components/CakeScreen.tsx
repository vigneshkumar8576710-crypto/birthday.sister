import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { magicAudio } from '../utils/audio';
import { Wind, Cake as CakeIcon, Sparkles, RefreshCw, Heart, MousePointerClick } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreeCake } from './ThreeCake';

export const CakeScreen: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeCut, setCakeCut] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [sisterWishText, setSisterWishText] = useState('');
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);

  const handleBlowCandles = () => {
    magicAudio.playBlowSound();
    setCandlesLit(false);
    setWishMade(true);
    // Subtle mini sparkle chime after blowing
    setTimeout(() => {
      magicAudio.playSparkleSound();
    }, 600);
  };

  const handleCutCake = () => {
    magicAudio.playCelebrationSound();
    setCakeCut(true);
    setShowCelebrationBanner(true);

    // Multi-burst pastel and gold confetti
    const count = 220;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#f8c8dc', '#ffe088', '#e9bacd', '#795465', '#ffd8e7', '#f9d156', '#ffffff']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 30,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Auto-hide toast after 7 seconds
    setTimeout(() => {
      setShowCelebrationBanner(false);
    }, 7000);
  };

  const handleReset = () => {
    magicAudio.playSparkleSound();
    setCandlesLit(true);
    setCakeCut(false);
    setWishMade(false);
    setShowCelebrationBanner(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-73px)] bg-gradient-soft py-10 md:py-16 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f8c8dc]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="text-center mb-6 md:mb-8 max-w-2xl mx-auto relative z-10">
        <span className="font-sans text-xs uppercase tracking-widest text-[#795465] font-bold bg-white/70 border border-[#e9bacd]/50 rounded-full px-4 py-1.5 inline-block mb-3 shadow-xs">
          Interactive 3D Celebration
        </span>
        <h1 className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#795465] mb-3 drop-shadow-sm">
          Make a Wish and Cut the Cake!
        </h1>
        <p className="font-sans text-sm sm:text-base text-[#5c5d6e] max-w-xl mx-auto leading-relaxed">
          A magical moment just for you. Close your eyes, think of something beautiful, blow out the candles, and slice into sweetness.
        </p>
      </header>

      {/* Interactive Cake Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-8 md:p-10 w-full max-w-4xl flex flex-col items-center relative overflow-hidden shadow-[0_16px_48px_rgba(230,230,250,0.4)] border border-white/80">
        {/* Decorative subtle dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#f8c8dc 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Optional Custom Wish Note Input */}
        <div className="w-full max-w-md mb-4 z-20 text-center">
          <input
            type="text"
            placeholder="Type your secret birthday wish here (optional)..."
            value={sisterWishText}
            onChange={(e) => setSisterWishText(e.target.value)}
            className="w-full text-xs sm:text-sm px-4 py-2 rounded-full bg-white/75 border border-[#e9bacd]/60 focus:outline-none focus:ring-2 focus:ring-[#795465]/40 text-center font-sans text-[#795465] placeholder:text-gray-400 placeholder:italic shadow-inner"
          />
        </div>

        {/* 3D Cake Canvas Container */}
        <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-b from-white/30 to-white/10 border border-white/40 shadow-inner">
          <ThreeCake
            candlesLit={candlesLit}
            cakeCut={cakeCut}
            className="w-full h-full"
          />

          {/* Sliced piece visual tag when cut */}
          <AnimatePresence>
            {cakeCut && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#f9d156] z-30 flex items-center gap-1.5 pointer-events-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f9d156]" />
                <span className="font-serif italic font-bold text-[#795465] text-xs sm:text-sm">
                  First Slice For You! 🍰
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drag to rotate hint badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1.5 text-[11px] font-medium text-[#795465]/70 bg-white/60 backdrop-blur-xs px-3 py-1 rounded-full border border-white/50 shadow-xs">
            <MousePointerClick className="w-3 h-3 text-[#795465]" />
            <span>Drag around to rotate 3D cake in 360°</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 z-20">
          {/* Blow Candles Button */}
          <button
            onClick={handleBlowCandles}
            disabled={!candlesLit}
            id="blow-candles-btn"
            className={`font-serif font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2.5 border border-white/60 ${
              candlesLit
                ? 'gold-shimmer text-[#705900] hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
                : 'bg-gray-200 text-gray-400 opacity-60 cursor-not-allowed border-transparent'
            }`}
          >
            <Wind className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Blow Candles</span>
          </button>

          {/* Cut Cake Button */}
          <button
            onClick={handleCutCake}
            disabled={candlesLit || cakeCut}
            id="cut-cake-btn"
            className={`font-serif font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2.5 border border-white/60 ${
              !candlesLit && !cakeCut
                ? 'bg-[#795465] text-white hover:bg-[#5f3c4d] hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse'
                : 'bg-gray-300 text-gray-500 opacity-60 cursor-not-allowed border-transparent'
            }`}
          >
            <CakeIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>{cakeCut ? 'Cake Sliced ✨' : 'Cut Cake'}</span>
          </button>

          {/* Relight / Play Again Button */}
          {(!candlesLit || cakeCut) && (
            <button
              onClick={handleReset}
              id="btn-relight-cake"
              className="px-5 py-3.5 rounded-full bg-white/85 hover:bg-white text-[#795465] text-xs sm:text-sm font-sans font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-white/80 cursor-pointer"
              title="Relight the candles and celebrate again"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#795465]" />
              <span>Make Another Wish</span>
            </button>
          )}
        </div>

        {/* Step Guide Hint */}
        <div className="mt-5 text-xs font-semibold text-[#795465]/85 flex items-center justify-center text-center">
          {candlesLit && (
            <span className="bg-white/70 px-4 py-1.5 rounded-full border border-white/50 shadow-xs">
              🕯️ Step 1: Make a silent wish in your heart, then click "Blow Candles"
            </span>
          )}
          {!candlesLit && !cakeCut && (
            <span className="bg-[#ffd8e7] px-4 py-1.5 rounded-full border border-[#f8c8dc] text-[#795465] shadow-xs animate-bounce">
              ✨ Step 2: Now click "Cut Cake" to watch the 3D slicing animation!
            </span>
          )}
          {cakeCut && (
            <span className="bg-[#ffe088]/40 px-4 py-1.5 rounded-full border border-[#f9d156]/40 text-[#735c00] shadow-xs">
              🎉 Happy Birthday to the sweetest sister in the universe!
            </span>
          )}
        </div>
      </div>

      {/* Floating Celebration Toast Banner */}
      <AnimatePresence>
        {showCelebrationBanner && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl px-7 py-3.5 rounded-full shadow-2xl border-2 border-[#f9d156] z-50 flex items-center gap-3 text-[#795465]"
          >
            <Sparkles className="w-5 h-5 text-[#f9d156] animate-spin" />
            <div className="text-center">
              <p className="font-serif italic font-bold text-base text-[#795465]">
                Yay! Time to celebrate! ✨
              </p>
              {sisterWishText && (
                <p className="font-sans text-xs text-[#5c5d6e] italic mt-0.5">
                  Wish locked in the stars: "{sisterWishText}"
                </p>
              )}
            </div>
            <Heart className="w-4 h-4 text-[#ba1a1a] fill-[#ba1a1a] animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
