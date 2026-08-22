import React, { useState } from 'react';
import { REASONS_DATA } from '../data/content';
import { magicAudio } from '../utils/audio';
import { Heart, Star, Smile, Users, Sparkles, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const ReasonsScreen: React.FC = () => {
  const [lovedReasons, setLovedReasons] = useState<Record<string, boolean>>({});

  const toggleLove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLovedReasons((prev) => {
      const next = !prev[id];
      if (next) {
        magicAudio.playSparkleSound();
      } else {
        magicAudio.playChime(500, 'sine', 0.3);
      }
      return { ...prev, [id]: next };
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'favorite':
        return <Heart className="w-6 h-6 fill-current" />;
      case 'star':
        return <Star className="w-8 h-8 fill-current" />;
      case 'sentiment_satisfied':
        return <Smile className="w-6 h-6 fill-current" />;
      case 'handshake':
        return <Users className="w-6 h-6 fill-current" />;
      case 'auto_awesome':
      default:
        return <Sparkles className="w-6 h-6 fill-current" />;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-73px)] bg-gradient-to-br from-[#ffd8e7]/40 via-[#faf9f6] to-[#e1e1f5]/50 py-12 md:py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center relative overflow-hidden">
      {/* Background soft ambient radial blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#ffd8e7]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#e1e1f5]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <header className="text-center mb-12 md:mb-16 max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f9d156]/20 border border-[#f9d156]/40 text-[#735c00] text-xs font-bold uppercase tracking-widest mb-4">
          <Award className="w-3.5 h-3.5" />
          <span>Sisterhood Tribute</span>
        </div>

        <h1 className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#795465] mb-4 drop-shadow-sm">
          5 Reasons Why You're the Best Sister
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#5c5d6e] leading-relaxed max-w-2xl mx-auto">
          A little reminder of all the magical ways you make my life infinitely better, brighter, and full of joy.
        </p>
      </header>

      {/* Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-6xl mx-auto relative z-10">
        {/* Card 1: Your Kindness */}
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          id="reason-card-kindness"
          className="glass-card rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#f8c8dc] rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f9d156]/25 flex items-center justify-center text-[#735c00] shadow-sm">
                  {getIcon('favorite')}
                </div>
                <h2 className="font-serif font-bold text-2xl text-[#795465]">Your Kindness</h2>
              </div>

              <button
                onClick={(e) => toggleLove('kindness', e)}
                className={`p-2 rounded-full transition-all ${
                  lovedReasons['kindness']
                    ? 'text-[#ba1a1a] bg-[#ffd8e7] scale-110'
                    : 'text-gray-400 hover:text-[#ba1a1a] hover:bg-white/60'
                }`}
                title="Heart this trait"
              >
                <Heart
                  className={`w-5 h-5 ${lovedReasons['kindness'] ? 'fill-current' : ''}`}
                />
              </button>
            </div>

            <p className="font-sans text-base text-[#4f4448] leading-relaxed">
              You have a heart that always seeks to help and comfort others. Your kindness is a warm light in a sometimes cold world.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#795465]/80">
            <span>✨ Pure Gold Heart</span>
            <span className="text-[11px] text-[#735c00] bg-[#ffe088]/40 px-2.5 py-0.5 rounded-full">
              Warmest Soul
            </span>
          </div>
        </motion.article>

        {/* Card 2: Your Strength (Tall card spanning 2 rows in large) */}
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          id="reason-card-strength"
          className="glass-card rounded-2xl p-8 relative overflow-hidden md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-between group"
        >
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#ffe088]/40 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#f8c8dc]/40 flex items-center justify-center text-[#795465] shadow-sm">
                  {getIcon('star')}
                </div>
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#795465]">
                  Your Strength
                </h2>
              </div>

              <button
                onClick={(e) => toggleLove('strength', e)}
                className={`p-2 rounded-full transition-all ${
                  lovedReasons['strength']
                    ? 'text-[#ba1a1a] bg-[#ffd8e7] scale-110'
                    : 'text-gray-400 hover:text-[#ba1a1a] hover:bg-white/60'
                }`}
                title="Heart this trait"
              >
                <Heart
                  className={`w-5 h-5 ${lovedReasons['strength'] ? 'fill-current' : ''}`}
                />
              </button>
            </div>

            <p className="font-sans text-base text-[#4f4448] leading-relaxed mb-6">
              No matter what life throws our way, your resilience inspires me. You stand tall and weather every storm with grace.
            </p>

            {/* Illustration Image of Oak Tree bathed in golden sunlight */}
            <div className="rounded-xl overflow-hidden h-52 sm:h-64 relative shadow-md group-hover:shadow-lg transition-shadow">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKN1v_kqjCiXGgiyieavtOw-4QWhJ_rWWLRjsAiz_YKAU4qSX27Zz2OsslRiUMyDgDDP20icXpDT3b6tAelQFEAybm6Qg2h6cD5Ntu1xcRcOnH6cKR2HdH352hMn5RAU-D8gD66dj51CqzFWILCtMD4Tu4Cpdg-X1fL6-__3yuC0zIamGaRuVbX9cFKoiZM32YJ7QdvpQet_qx5m5B7ITNrf_vUDB0JtxqHyAedEgBPiX5qdGAR5Ur"
                alt="Strong blooming oak tree in golden sunlight representing strength"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-semibold drop-shadow-md">
                  Rooted deep in resilience &amp; poise
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#795465]/80">
            <span>🛡️ Unwavering Anchor</span>
            <span className="text-[11px] text-[#795465] bg-[#ffd8e7] px-2.5 py-0.5 rounded-full">
              My Inspiration
            </span>
          </div>
        </motion.article>

        {/* Card 3: Your Laughter */}
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          id="reason-card-laughter"
          className="glass-card rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#e9bacd]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e1e1f5] flex items-center justify-center text-[#5c5d6e] shadow-sm">
                  {getIcon('sentiment_satisfied')}
                </div>
                <h2 className="font-serif font-bold text-2xl text-[#795465]">Your Laughter</h2>
              </div>

              <button
                onClick={(e) => toggleLove('laughter', e)}
                className={`p-2 rounded-full transition-all ${
                  lovedReasons['laughter']
                    ? 'text-[#ba1a1a] bg-[#ffd8e7] scale-110'
                    : 'text-gray-400 hover:text-[#ba1a1a] hover:bg-white/60'
                }`}
                title="Heart this trait"
              >
                <Heart
                  className={`w-5 h-5 ${lovedReasons['laughter'] ? 'fill-current' : ''}`}
                />
              </button>
            </div>

            <p className="font-sans text-base text-[#4f4448] leading-relaxed">
              It's contagious! Just hearing you laugh makes my day instantly better. It's the sweetest melody.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#795465]/80">
            <span>🎵 Pure Melody</span>
            <span className="text-[11px] text-[#5c5d6e] bg-[#e1e1f5] px-2.5 py-0.5 rounded-full">
              Instant Sunshine
            </span>
          </div>
        </motion.article>

        {/* Card 4: Your Support (Spans 2 columns on lg) */}
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          id="reason-card-support"
          className="glass-card rounded-2xl p-8 relative overflow-hidden lg:col-span-2 flex flex-col justify-between group"
        >
          <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-[#ffd8e7]/30 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f8c8dc]/35 flex items-center justify-center text-[#795465] shadow-sm">
                  {getIcon('handshake')}
                </div>
                <h2 className="font-serif font-bold text-2xl text-[#795465]">Your Support</h2>
              </div>

              <button
                onClick={(e) => toggleLove('support', e)}
                className={`p-2 rounded-full transition-all ${
                  lovedReasons['support']
                    ? 'text-[#ba1a1a] bg-[#ffd8e7] scale-110'
                    : 'text-gray-400 hover:text-[#ba1a1a] hover:bg-white/60'
                }`}
                title="Heart this trait"
              >
                <Heart
                  className={`w-5 h-5 ${lovedReasons['support'] ? 'fill-current' : ''}`}
                />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <p className="font-sans text-base text-[#4f4448] flex-1 leading-relaxed">
                You are my biggest cheerleader. Knowing you have my back gives me the courage to pursue anything I dream of. No goal feels out of reach with you in my corner.
              </p>

              <div className="w-full md:w-5/12 rounded-xl overflow-hidden h-36 relative shadow-md">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Iwq1ICvd5SSzrEHSL7uht0r0zqiDjHw_GXsNWPRj5Dh4mlGbGos1IZj5PsCqyLlCxG7bAh2PRvsQtbQHlwx_3RsLdcM3QYmEnl5ZvFd6bDZqtU7CKpDAXecxBG_2MPtBQlqO3ZC3KX7ipNXq59PfNQV3XziBRQPcrhVha5jNyuyie4h7vXZuQXoYh6zwKTde8lObMZ3Q9W7EUusVMmvHTqIYUVKnjXhIC5FQTSKIiJ-8mf1DVhKJ"
                  alt="Delicate hands holding a glowing star"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#795465]/80">
            <span>🤝 Always in My Corner</span>
            <span className="text-[11px] text-[#795465] bg-[#ffd8e7] px-2.5 py-0.5 rounded-full">
              Biggest Fan
            </span>
          </div>
        </motion.article>

        {/* Card 5: Your Spirit */}
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          id="reason-card-spirit"
          className="glass-card rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#f9d156]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ffe088]/40 flex items-center justify-center text-[#735c00] shadow-sm">
                  {getIcon('auto_awesome')}
                </div>
                <h2 className="font-serif font-bold text-2xl text-[#795465]">Your Spirit</h2>
              </div>

              <button
                onClick={(e) => toggleLove('spirit', e)}
                className={`p-2 rounded-full transition-all ${
                  lovedReasons['spirit']
                    ? 'text-[#ba1a1a] bg-[#ffd8e7] scale-110'
                    : 'text-gray-400 hover:text-[#ba1a1a] hover:bg-white/60'
                }`}
                title="Heart this trait"
              >
                <Heart
                  className={`w-5 h-5 ${lovedReasons['spirit'] ? 'fill-current' : ''}`}
                />
              </button>
            </div>

            <p className="font-sans text-base text-[#4f4448] leading-relaxed">
              Your wild, beautiful, untamed spirit makes life an adventure. Never lose that spark of magic inside you.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#795465]/80">
            <span>✨ Magical Essence</span>
            <span className="text-[11px] text-[#735c00] bg-[#ffe088]/40 px-2.5 py-0.5 rounded-full">
              Pure Spark
            </span>
          </div>
        </motion.article>
      </section>
    </div>
  );
};
