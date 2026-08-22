import React from 'react';
import { SparkleShader } from './SparkleShader';
import { magicAudio } from '../utils/audio';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeScreenProps {
  onEnterCelebration: () => void;
  onSendLove: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onEnterCelebration,
  onSendLove,
}) => {
  const handleEnter = () => {
    magicAudio.playSparkleSound();
    onEnterCelebration();
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-73px)] flex flex-col items-center justify-center overflow-hidden bg-gradient-soft px-4 py-8">
      {/* Interactive WebGL Shader Background */}
      <SparkleShader className="absolute inset-0 w-full h-full z-0 opacity-85 mix-blend-screen pointer-events-none" />

      {/* Hero Content (Glass Card) */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 glass-panel rounded-2xl ambient-shadow p-8 sm:p-12 md:p-16 max-w-[820px] w-[92%] mx-auto text-center flex flex-col items-center gap-8 border border-white/60 shadow-[0_16px_48px_rgba(230,230,250,0.5)] my-auto"
      >
        {/* Sparkle decorative icons in corners */}
        <div className="absolute -top-5 -left-5 text-[#f9d156] opacity-80 animate-pulse pointer-events-none">
          <Sparkles className="w-10 h-10 drop-shadow-md" />
        </div>
        <div className="absolute -bottom-4 -right-4 text-[#f9d156] opacity-80 animate-pulse delay-300 pointer-events-none">
          <Sparkles className="w-9 h-9 drop-shadow-md" />
        </div>

        {/* Content stack */}
        <div className="space-y-5 flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-widest text-[#f8c8dc] bg-[#795465] font-bold rounded-full px-5 py-2 inline-block shadow-sm">
            A Special Day
          </span>

          <h1 className="font-serif italic font-bold text-3xl sm:text-4xl md:text-6xl text-[#795465] gold-foil-text leading-tight tracking-tight drop-shadow-sm px-2">
            Happy Birthday to My Amazing Sister!
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-[#4f4448] max-w-xl mx-auto leading-relaxed opacity-95">
            May your day be filled with magic, laughter, boundless happiness, and all the love you deserve.
          </p>
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={handleEnter}
            id="btn-enter-celebration"
            className="shimmer-button bg-gradient-to-r from-[#f9d156] to-[#f8c8dc] text-[#5f3c4d] font-serif font-bold text-lg md:text-xl px-10 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 border border-white/60 flex items-center gap-3 cursor-pointer group"
          >
            <span>Enter the Celebration</span>
            <Sparkles className="w-5 h-5 text-[#795465] group-hover:rotate-12 transition-transform" />
          </button>

          <button
            onClick={() => {
              magicAudio.playChime(800, 'sine', 0.5);
              onSendLove();
            }}
            id="btn-home-send-love"
            className="px-6 py-3.5 rounded-full bg-white/60 hover:bg-white/90 text-[#795465] font-sans font-semibold text-sm transition-all duration-200 border border-white/70 shadow-sm flex items-center gap-2 hover:scale-105"
          >
            <Heart className="w-4 h-4 text-[#ba1a1a] fill-[#ba1a1a]" />
            <span>Send Sister Hugs</span>
          </button>
        </div>

        {/* Floating sweet message */}
        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#795465]/80 bg-white/40 px-4 py-1.5 rounded-full border border-white/30">
          <Gift className="w-3.5 h-3.5 text-[#e9c349]" />
          <span>Interactive celebration built with love for my sister</span>
        </div>
      </motion.div>
    </div>
  );
};
