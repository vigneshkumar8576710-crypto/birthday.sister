import React, { useState } from 'react';
import { magicAudio } from '../utils/audio';
import { SISTER_SECRET_WISHES } from '../data/content';
import { SisterSecretWish } from '../types';
import { Mail, Heart, Sparkles, Edit, Check, Copy, Star, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// --- Cute Bears & Stuffed Toy Corner Decorations ---

// Top-Left: Sweet Brown Teddy Bear with Rosy Cheeks & Ribbon
const TeddyBearTopLeft: React.FC = () => (
  <div className="group relative flex items-center justify-center cursor-pointer select-none">
    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-md transition-all duration-300 group-hover:scale-115 group-hover:-rotate-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left Ear */}
      <circle cx="28" cy="28" r="14" fill="#C68B59" stroke="#9E6233" strokeWidth="1.5" />
      <circle cx="28" cy="28" r="8" fill="#F4B9B8" />
      {/* Right Ear */}
      <circle cx="72" cy="28" r="14" fill="#C68B59" stroke="#9E6233" strokeWidth="1.5" />
      <circle cx="72" cy="28" r="8" fill="#F4B9B8" />
      {/* Body / Paws peek */}
      <ellipse cx="50" cy="78" rx="28" ry="20" fill="#B27B4B" stroke="#9E6233" strokeWidth="1.5" />
      <circle cx="24" cy="74" r="10" fill="#C68B59" stroke="#9E6233" strokeWidth="1" />
      <circle cx="76" cy="74" r="10" fill="#C68B59" stroke="#9E6233" strokeWidth="1" />
      <circle cx="24" cy="74" r="5" fill="#FCE7E7" />
      <circle cx="76" cy="74" r="5" fill="#FCE7E7" />
      {/* Head */}
      <circle cx="50" cy="46" r="30" fill="#C68B59" stroke="#9E6233" strokeWidth="1.5" />
      {/* Snout */}
      <ellipse cx="50" cy="52" rx="14" ry="11" fill="#FDF3E7" />
      {/* Nose */}
      <ellipse cx="50" cy="46" rx="5" ry="3.5" fill="#4A2E18" />
      {/* Mouth */}
      <path d="M50 49.5V55M45 54C46.5 56.5 48.5 57 50 57C51.5 57 53.5 56.5 55 54" stroke="#4A2E18" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="38" cy="42" r="3.5" fill="#2C1810" />
      <circle cx="62" cy="42" r="3.5" fill="#2C1810" />
      {/* Eye highlights */}
      <circle cx="39.5" cy="40.5" r="1.3" fill="#FFFFFF" />
      <circle cx="63.5" cy="40.5" r="1.3" fill="#FFFFFF" />
      {/* Rosy Cheeks */}
      <ellipse cx="31" cy="50" rx="5" ry="3.5" fill="#FF9EAA" opacity="0.85" />
      <ellipse cx="69" cy="50" rx="5" ry="3.5" fill="#FF9EAA" opacity="0.85" />
      {/* Pink Bow Ribbon */}
      <path d="M42 22C36 17 32 24 38 27C44 29 48 24 50 25C52 24 56 29 62 27C68 24 64 17 58 22C54 25 52 24 50 24C48 24 46 25 42 22Z" fill="#F8A5C2" stroke="#F472B6" strokeWidth="1" />
      <circle cx="50" cy="24.5" r="3.5" fill="#F472B6" />
    </svg>
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-white/90 text-[10px] font-sans font-bold text-[#795465] rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Teddy Love 🧸
    </div>
  </div>
);

// Top-Right: Fluffy Plush Bunny Hugging a Heart
const PlushBunnyTopRight: React.FC = () => (
  <div className="group relative flex items-center justify-center cursor-pointer select-none">
    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-md transition-all duration-300 group-hover:scale-115 group-hover:rotate-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left Long Ear */}
      <ellipse cx="34" cy="20" rx="8" ry="20" transform="rotate(-12 34 20)" fill="#FFF5F5" stroke="#F5C6C6" strokeWidth="1.5" />
      <ellipse cx="34" cy="20" rx="4.5" ry="14" transform="rotate(-12 34 20)" fill="#FFD1DC" />
      {/* Right Long Ear */}
      <ellipse cx="66" cy="20" rx="8" ry="20" transform="rotate(12 66 20)" fill="#FFF5F5" stroke="#F5C6C6" strokeWidth="1.5" />
      <ellipse cx="66" cy="20" rx="4.5" ry="14" transform="rotate(12 66 20)" fill="#FFD1DC" />
      {/* Body */}
      <ellipse cx="50" cy="78" rx="26" ry="19" fill="#FFF5F5" stroke="#F5C6C6" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="50" cy="50" r="26" fill="#FFFFFF" stroke="#F5C6C6" strokeWidth="1.5" />
      {/* Eyes with happy curve */}
      <path d="M38 48C40 45 43 45 45 48" stroke="#5E454B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 48C57 45 60 45 62 48" stroke="#5E454B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cute Nose & Mouth */}
      <polygon points="50,53 47,50 53,50" fill="#FF8FA3" />
      <path d="M50 53V56M47 55C48.5 57 50 57 50 57C50 57 51.5 57 53 55" stroke="#5E454B" strokeWidth="1.8" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="33" cy="53" rx="4.5" ry="3" fill="#FFB4C2" opacity="0.85" />
      <ellipse cx="67" cy="53" rx="4.5" ry="3" fill="#FFB4C2" opacity="0.85" />
      {/* Hugging Heart */}
      <path d="M50 68C45 61 36 63 36 70C36 77 47 83 50 86C53 83 64 77 64 70C64 63 55 61 50 68Z" fill="#FF6584" stroke="#E11D48" strokeWidth="1" />
      {/* Paws on heart */}
      <ellipse cx="37" cy="71" rx="5" ry="4" fill="#FFFFFF" stroke="#F5C6C6" strokeWidth="1" />
      <ellipse cx="63" cy="71" rx="5" ry="4" fill="#FFFFFF" stroke="#F5C6C6" strokeWidth="1" />
    </svg>
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-white/90 text-[10px] font-sans font-bold text-[#795465] rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Plush Bunny 🐰
    </div>
  </div>
);

// Bottom-Left: Cute Plush Panda Hugging a Star
const PlushPandaBottomLeft: React.FC = () => (
  <div className="group relative flex items-center justify-center cursor-pointer select-none">
    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-md transition-all duration-300 group-hover:scale-115 group-hover:-rotate-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Panda Black Ears */}
      <circle cx="26" cy="26" r="13" fill="#3D3A45" stroke="#25232A" strokeWidth="1" />
      <circle cx="26" cy="26" r="6" fill="#585461" />
      <circle cx="74" cy="26" r="13" fill="#3D3A45" stroke="#25232A" strokeWidth="1" />
      <circle cx="74" cy="26" r="6" fill="#585461" />
      {/* Body */}
      <ellipse cx="50" cy="78" rx="27" ry="20" fill="#F8F9FA" stroke="#D1D5DB" strokeWidth="1.5" />
      <ellipse cx="50" cy="80" rx="17" ry="12" fill="#3D3A45" />
      {/* Head */}
      <circle cx="50" cy="46" r="28" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
      {/* Panda Eye Patches */}
      <ellipse cx="37" cy="44" rx="8" ry="10" transform="rotate(-15 37 44)" fill="#3D3A45" />
      <ellipse cx="63" cy="44" rx="8" ry="10" transform="rotate(15 63 44)" fill="#3D3A45" />
      {/* Eyes */}
      <circle cx="37" cy="43" r="3" fill="#FFFFFF" />
      <circle cx="63" cy="43" r="3" fill="#FFFFFF" />
      <circle cx="36.5" cy="43" r="1.8" fill="#111827" />
      <circle cx="63.5" cy="43" r="1.8" fill="#111827" />
      {/* Snout & Nose */}
      <ellipse cx="50" cy="53" rx="9" ry="6" fill="#F3F4F6" />
      <ellipse cx="50" cy="50.5" rx="3.5" ry="2.5" fill="#1F2937" />
      <path d="M50 53V56M47 55C48.5 56.5 50 56.5 50 56.5C50 56.5 51.5 56.5 53 55" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="28" cy="50" r="4.5" fill="#FFB5C5" opacity="0.85" />
      <circle cx="72" cy="50" r="4.5" fill="#FFB5C5" opacity="0.85" />
      {/* Yellow Glowing Star Plush */}
      <path d="M50 61L53.5 70L63 70L55.5 75.5L58 84.5L50 79L42 84.5L44.5 75.5L37 70L46.5 70Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
      {/* Paws */}
      <circle cx="34" cy="72" r="6" fill="#3D3A45" />
      <circle cx="66" cy="72" r="6" fill="#3D3A45" />
    </svg>
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-white/90 text-[10px] font-sans font-bold text-[#795465] rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Plush Panda 🐼
    </div>
  </div>
);

// Bottom-Right: Honey Teddy Bear with Birthday Hat & Gift
const HoneyBearBottomRight: React.FC = () => (
  <div className="group relative flex items-center justify-center cursor-pointer select-none">
    <svg viewBox="0 0 100 100" className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-md transition-all duration-300 group-hover:scale-115 group-hover:rotate-6" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Honey Ears */}
      <circle cx="26" cy="27" r="13" fill="#E6A15C" stroke="#B45309" strokeWidth="1" />
      <circle cx="26" cy="27" r="7" fill="#FED7AA" />
      <circle cx="74" cy="27" r="13" fill="#E6A15C" stroke="#B45309" strokeWidth="1" />
      <circle cx="74" cy="27" r="7" fill="#FED7AA" />
      {/* Body */}
      <ellipse cx="50" cy="78" rx="28" ry="20" fill="#D98E48" stroke="#B45309" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="50" cy="46" r="29" fill="#E6A15C" stroke="#B45309" strokeWidth="1.5" />
      {/* Snout */}
      <ellipse cx="50" cy="53" rx="13" ry="9" fill="#FEF3C7" />
      <ellipse cx="50" cy="48" rx="4.5" ry="3" fill="#78350F" />
      <path d="M50 51V55M46 54C47.5 56 49 56.5 50 56.5C51 56.5 52.5 56 54 54" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      {/* Eyes with wink & smile */}
      <circle cx="38" cy="42" r="3" fill="#451A03" />
      <path d="M59 42C61 39 65 39 67 42" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="39.5" cy="40.5" r="1" fill="#FFFFFF" />
      {/* Cheeks */}
      <circle cx="31" cy="49" r="4.5" fill="#FDA4AF" opacity="0.85" />
      <circle cx="69" cy="49" r="4.5" fill="#FDA4AF" opacity="0.85" />
      {/* Birthday Party Hat */}
      <polygon points="50,10 40,30 60,30" fill="#F472B6" stroke="#DB2777" strokeWidth="1" />
      <path d="M43 23L57 23M45 17L55 17" stroke="#FDF2F8" strokeWidth="1.5" />
      <circle cx="50" cy="9" r="3.5" fill="#FBBF24" />
      {/* Gift Box on Lap */}
      <rect x="36" y="67" width="28" height="24" rx="3" fill="#A78BFA" stroke="#7C3AED" strokeWidth="1" />
      <rect x="34" y="64" width="32" height="6" rx="2" fill="#8B5CF6" />
      {/* Ribbon */}
      <rect x="47.5" y="64" width="5" height="27" fill="#FDE047" />
      <ellipse cx="45" cy="61" rx="4" ry="3" fill="#FDE047" />
      <ellipse cx="55" cy="61" rx="4" ry="3" fill="#FDE047" />
      {/* Bear Paws holding gift */}
      <circle cx="31" cy="73" r="6" fill="#E6A15C" stroke="#B45309" strokeWidth="1" />
      <circle cx="69" cy="73" r="6" fill="#E6A15C" stroke="#B45309" strokeWidth="1" />
    </svg>
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-white/90 text-[10px] font-sans font-bold text-[#795465] rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Honey Bear 🧸
    </div>
  </div>
);

export const LetterScreen: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [sisterNote, setSisterNote] = useState(
    'To my dearest sister, you are my best friend, my confidante, and my greatest inspiration. Every memory we share is a treasure, and every dream you chase makes me so endlessly proud. May your year ahead overflow with gentle joy, laughter, and everything your heart desires. Happy Birthday!'
  );
  const [sisterSignOff, setSisterSignOff] = useState('Forever yours with all my love, your sister');
  const [activeWish, setActiveWish] = useState<SisterSecretWish | null>(null);
  const [unlockedWishes, setUnlockedWishes] = useState<string[]>([]);
  const [copiedToast, setCopiedToast] = useState(false);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      magicAudio.playSparkleSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#f8c8dc', '#ffe088', '#e9bacd', '#f9d156', '#d4a373']
      });
    }
  };

  const handleCloseEnvelope = () => {
    setIsOpen(false);
    magicAudio.playChime(500, 'sine', 0.4);
  };

  const handleUnlockWish = (wish: SisterSecretWish) => {
    magicAudio.playChime(800, 'triangle', 0.5);
    setActiveWish(wish);
    if (!unlockedWishes.includes(wish.id)) {
      setUnlockedWishes([...unlockedWishes, wish.id]);
    }
  };

  const handleCopyLetter = () => {
    const fullText = `"${sisterNote}"\n\n— ${sisterSignOff}`;
    navigator.clipboard.writeText(fullText);
    setCopiedToast(true);
    magicAudio.playSparkleSound();
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-73px)] bg-gradient-to-br from-[#faf8f5] via-[#ffd8e7]/25 to-[#f3e8f7]/50 flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden">
      {/* Ambient decorative background glows */}
      <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-[#ffd8e7]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-[#ffe088]/25 rounded-full blur-3xl pointer-events-none" />

      {/* When Envelope is CLOSED */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center justify-center max-w-xl w-full text-center px-4"
        >
          {/* Header */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl w-full mb-8 border border-white/80 shadow-lg">
            <h1 className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#795465] mb-3 gold-foil-text drop-shadow-sm">
              A Heartfelt Letter
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#5c5d6e] leading-relaxed">
              I wrote a special letter just for you. Tap the envelope below to open your keepsake paper note.
            </p>
          </div>

          {/* Interactive Sealed Envelope */}
          <div
            onClick={handleOpenEnvelope}
            id="envelope-trigger"
            className="cursor-pointer group select-none transition-transform duration-500 hover:scale-105"
          >
            <div className="relative w-[280px] sm:w-[360px] h-[190px] sm:h-[230px] rounded-2xl bg-gradient-to-br from-[#f8c8dc] via-[#f4b6cd] to-[#e9bacd] shadow-[0_20px_50px_rgba(121,84,101,0.25)] border-2 border-white/70 flex flex-col items-center justify-center p-6 text-center">
              {/* Envelope Flap Accent */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '140px solid transparent',
                  borderRight: '140px solid transparent',
                  borderTop: '100px solid #e9bacd',
                }}
                className="absolute top-0 left-0 sm:hidden filter drop-shadow-sm pointer-events-none opacity-90"
              />
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '180px solid transparent',
                  borderRight: '180px solid transparent',
                  borderTop: '120px solid #e9bacd',
                }}
                className="absolute top-0 left-0 hidden sm:block filter drop-shadow-sm pointer-events-none opacity-90"
              />

              {/* Heart Wax Seal */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-[#ba1a1a] to-[#e11d48] shadow-lg flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform ring-4 ring-[#ffe088]/80">
                <Heart className="w-7 h-7 fill-white drop-shadow" />
              </div>
              <p className="relative z-10 font-serif italic font-bold text-sm sm:text-base text-[#795465] bg-white/80 px-4 py-1.5 rounded-full shadow-xs">
                Click to Open Letter 💌
              </p>
            </div>
          </div>

          {/* Quick Wishes List Preview */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-md">
            {SISTER_SECRET_WISHES.map((wish, index) => (
              <button
                key={wish.id}
                onClick={() => handleUnlockWish(wish)}
                className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-serif font-bold text-[#795465] border border-[#e9bacd]/60 shadow-xs flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <Star className="w-3 h-3 text-[#f9d156] fill-[#f9d156]" />
                <span>Wish #{index + 1}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* When Envelope is OPEN: Large Paper Letter Covering 75% of Screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-[94vw] sm:w-[86vw] md:w-[75vw] max-w-5xl min-h-[72vh] md:min-h-[76vh] flex flex-col my-auto"
          >
            {/* The Authentic Paper Stationery Card */}
            <div
              id="opened-paper-letter"
              className="relative w-full flex-1 rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_25px_70px_rgba(121,84,101,0.22)] border-2 border-[#e8d5b5] flex flex-col justify-between overflow-hidden"
              style={{
                backgroundColor: '#fffdf7',
                backgroundImage: `
                  radial-gradient(#f0e6d2 1px, transparent 1px),
                  repeating-linear-gradient(transparent, transparent 33px, rgba(235, 214, 222, 0.35) 33px, rgba(235, 214, 222, 0.35) 34px)
                `,
                backgroundSize: '24px 24px, 100% 34px',
              }}
            >
              {/* Inner vintage dashed border frame */}
              <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-dashed border-[#d4a373]/40 pointer-events-none" />

              {/* Top Washi Tape Visual Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-7 bg-[#ffd8e7]/80 backdrop-blur-xs border-x border-[#f4b6cd] rotate-1 shadow-sm opacity-90 pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-mono tracking-widest text-[#795465]/70">★ WITH LOVE ★</span>
              </div>

              {/* ========================================================= */}
              {/* 4 CORNERS DECORATED WITH CUTE BEARS & STUFFED TOYS */}
              {/* ========================================================= */}

              {/* TOP-LEFT CORNER: Sweet Teddy Bear */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 pointer-events-auto">
                <TeddyBearTopLeft />
              </div>

              {/* TOP-RIGHT CORNER: Plush Bunny */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 pointer-events-auto">
                <PlushBunnyTopRight />
              </div>

              {/* BOTTOM-LEFT CORNER: Plush Panda with Star */}
              <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 z-20 pointer-events-auto">
                <PlushPandaBottomLeft />
              </div>

              {/* BOTTOM-RIGHT CORNER: Honey Bear with Party Hat & Gift */}
              <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 pointer-events-auto">
                <HoneyBearBottomRight />
              </div>

              {/* ========================================================= */}
              {/* LETTER CONTENT (Spacious, Elegant Stationery Typography) */}
              {/* ========================================================= */}
              <div className="relative z-10 max-w-3xl mx-auto w-full pt-10 sm:pt-6 pb-12 sm:pb-8 px-2 sm:px-8 text-center flex flex-col justify-between flex-1">
                
                {/* Paper Header / Salutation */}
                <div className="mb-4 sm:mb-6">
                  {/* Decorative Vintage Postage Stamp */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fff2f6] border border-[#f8c8dc] rounded-lg shadow-xs mb-3">
                    <Heart className="w-3.5 h-3.5 fill-[#ba1a1a] text-[#ba1a1a]" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#795465]">
                      Sisters' Special Edition • Official Birthday Letter
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#f9d156]" />
                  </div>

                  <h2 className="font-serif italic font-bold text-2xl sm:text-3xl md:text-4xl text-[#795465] tracking-tight">
                    Dearest Sister,
                  </h2>
                </div>

                {/* Main Body of Letter */}
                <div className="flex-1 flex flex-col justify-center my-2 sm:my-4">
                  {isEditingNote ? (
                    <div className="space-y-4 max-w-2xl mx-auto w-full bg-white/80 p-4 sm:p-6 rounded-2xl border border-[#e9bacd] shadow-inner">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#795465] text-left">
                        Personalize Your Birthday Letter:
                      </label>
                      <textarea
                        value={sisterNote}
                        onChange={(e) => setSisterNote(e.target.value)}
                        rows={6}
                        className="w-full text-base sm:text-lg font-serif italic text-[#4f4448] p-4 bg-white/90 border border-[#e9bacd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#795465]/40 leading-relaxed"
                      />
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <span className="text-xs font-sans text-[#795465] font-semibold">Sign-off:</span>
                        <input
                          type="text"
                          value={sisterSignOff}
                          onChange={(e) => setSisterSignOff(e.target.value)}
                          className="flex-1 text-sm font-serif italic text-[#795465] p-2 bg-white/90 border border-[#e9bacd] rounded-lg text-center"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setIsEditingNote(false)}
                          className="px-5 py-2 rounded-full bg-[#795465] hover:bg-[#5f3c4d] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md transition-colors"
                        >
                          <Check className="w-4 h-4" /> Save Letter
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-2xl mx-auto px-2 sm:px-4">
                      <p className="font-serif italic font-medium text-lg sm:text-xl md:text-2xl text-[#674353] leading-relaxed md:leading-loose drop-shadow-xs">
                        "{sisterNote}"
                      </p>

                      <div className="mt-6 sm:mt-8 flex flex-col items-center">
                        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4a373] to-transparent mb-3" />
                        <p className="font-serif italic font-bold text-sm sm:text-base md:text-lg text-[#795465]">
                          — {sisterSignOff}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Paper Action Toolbar */}
                <div className="mt-4 pt-4 border-t border-[#e8d5b5]/70 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
                  {!isEditingNote && (
                    <button
                      onClick={() => setIsEditingNote(true)}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 hover:bg-[#ffd8e7] text-[#795465] font-semibold flex items-center gap-1.5 border border-[#e9bacd] shadow-xs transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#795465]" /> Edit Letter
                    </button>
                  )}
                  <button
                    onClick={handleCopyLetter}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ffd8e7] hover:bg-[#f8c8dc] text-[#795465] font-bold flex items-center gap-1.5 border border-[#f4b6cd] shadow-xs transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" /> {copiedToast ? 'Copied to Clipboard! ✨' : 'Copy Letter'}
                  </button>
                  <button
                    onClick={handleCloseEnvelope}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#f4ece1] hover:bg-[#eae0d2] text-[#795465] font-semibold flex items-center gap-1.5 border border-[#d8cab8] shadow-xs transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Fold Envelope
                  </button>
                </div>
              </div>
            </div>

            {/* Secret Sister Wishes Bar Beneath the Letter */}
            <div className="mt-4 flex flex-col items-center gap-2.5 z-20">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#795465]">
                <Sparkles className="w-3.5 h-3.5 text-[#f9d156]" />
                <span>Unlock Secret Sister Wishes:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {SISTER_SECRET_WISHES.map((wish, index) => {
                  const isUnlocked = unlockedWishes.includes(wish.id);
                  return (
                    <button
                      key={wish.id}
                      onClick={() => handleUnlockWish(wish)}
                      className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-serif font-bold text-xs sm:text-sm shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 border border-white/80 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-[#ffd8e7] to-[#ffe088] text-[#795465]'
                          : 'bg-white/90 hover:bg-white text-[#795465]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 text-[#f9d156] fill-[#f9d156]" />
                      <span>Wish #{index + 1}</span>
                      {isUnlocked && <Check className="w-3 h-3 text-[#795465]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Wish Modal Dialog */}
      <AnimatePresence>
        {activeWish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-[#fffdf9] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-2 border-[#f9d156] relative"
            >
              <div className="w-12 h-12 rounded-full bg-[#ffe088]/40 flex items-center justify-center text-2xl mx-auto mb-3 shadow-inner">
                ✨
              </div>
              <h3 className="font-serif italic font-bold text-2xl text-[#795465] mb-2">
                {activeWish.title}
              </h3>
              <p className="font-sans text-sm text-[#4f4448] leading-relaxed mb-6">
                "{activeWish.message}"
              </p>
              <button
                onClick={() => {
                  magicAudio.playSparkleSound();
                  setActiveWish(null);
                }}
                className="w-full py-2.5 rounded-full bg-[#795465] text-white font-serif font-bold text-sm hover:bg-[#5f3c4d] shadow-md transition-colors"
              >
                Keep in My Heart ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

