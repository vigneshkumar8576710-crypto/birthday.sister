import React from 'react';
import { TabId } from '../types';

interface FooterProps {
  onTabChange?: (tab: TabId) => void;
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenContact }) => {
  return (
    <footer className="bg-[#f4f3f1] relative z-10 w-full mt-auto flex flex-col items-center gap-3.5 py-10 px-4 border-t border-white/60">
      <div className="w-full absolute top-0 h-16 -mt-16 bg-gradient-to-t from-[#f4f3f1] to-transparent pointer-events-none" />

      <div className="font-sans font-bold text-xs uppercase tracking-widest text-[#795465] text-center">
        Made with Love &amp; Magic for My Dearest Sister &copy; 2024
      </div>

      <div className="flex gap-6 text-sm font-medium text-[#5c5d6e]">
        <button
          onClick={onOpenPrivacy}
          className="hover:text-[#795465] transition-colors underline-offset-4 hover:underline cursor-pointer"
          id="footer-link-privacy"
        >
          Privacy
        </button>
        <span className="text-[#d2c3c7]">•</span>
        <button
          onClick={onOpenContact}
          className="hover:text-[#795465] transition-colors underline-offset-4 hover:underline cursor-pointer"
          id="footer-link-contact"
        >
          Contact
        </button>
      </div>
    </footer>
  );
};
