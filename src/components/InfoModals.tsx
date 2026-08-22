import React from 'react';
import { X, Heart, Shield, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { magicAudio } from '../utils/audio';

interface InfoModalsProps {
  type: 'privacy' | 'contact' | 'love' | null;
  onClose: () => void;
  likeCount: number;
}

export const InfoModals: React.FC<InfoModalsProps> = ({ type, onClose, likeCount }) => {
  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-white/80"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-[#795465] hover:bg-[#faf9f6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {type === 'privacy' && (
            <div>
              <div className="w-12 h-12 rounded-full bg-[#ffd8e7] flex items-center justify-center text-[#795465] mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif italic font-bold text-2xl text-[#795465] mb-2">
                Privacy &amp; Sister Secrets
              </h3>
              <p className="font-sans text-xs text-[#5c5d6e] leading-relaxed mb-4">
                Every memory, wish, and loving note written in <strong>Sisters' Magic</strong> is private, safe, and stored directly in your browser. No personal data is shared.
              </p>
              <div className="bg-[#faf9f6] p-3 rounded-xl border border-gray-100 text-xs text-[#4f4448] space-y-1.5">
                <p>✨ 100% Client-side privacy</p>
                <p>🌸 No tracking or external profiling</p>
                <p>💖 Dedicated solely to birthday joy</p>
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div>
              <div className="w-12 h-12 rounded-full bg-[#ffe088]/40 flex items-center justify-center text-[#735c00] mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif italic font-bold text-2xl text-[#795465] mb-2">
                Sister Direct Line
              </h3>
              <p className="font-sans text-xs text-[#5c5d6e] leading-relaxed mb-4">
                Have a special memory, inside joke, or birthday song to send? Call or hug your sister right now!
              </p>
              <div className="bg-[#ffd8e7]/30 p-4 rounded-xl text-center space-y-2 border border-[#f8c8dc]">
                <p className="font-serif italic font-bold text-base text-[#795465]">
                  "You'll always have my number, my listening ear, and my whole heart."
                </p>
                <p className="text-xs text-[#795465]/80">— Your loving sibling</p>
              </div>
            </div>
          )}

          {type === 'love' && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#ffd8e7] flex items-center justify-center text-[#ba1a1a] mx-auto mb-4 animate-bounce">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <h3 className="font-serif italic font-bold text-3xl text-[#795465] mb-2">
                Sister Love Sent!
              </h3>
              <p className="font-sans text-sm text-[#4f4448] mb-4">
                You have sent <strong>{likeCount}</strong> celebration hearts to your amazing sister!
              </p>
              <div className="bg-[#faf9f6] p-3 rounded-xl border border-[#e9bacd]/40 text-xs text-[#735c00] mb-4">
                May every single heart bring a warm smile to her face today.
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                magicAudio.playChime(600, 'sine', 0.3);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#795465] hover:bg-[#5f3c4d] text-white text-xs font-bold shadow-md transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
