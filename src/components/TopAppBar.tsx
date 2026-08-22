import React from 'react';
import { TabId } from '../types';
import { magicAudio } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface TopAppBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  likeCount: number;
  onLikeClick: () => void;
  hasLiked: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  activeTab,
  onTabChange,
  likeCount,
  onLikeClick,
  hasLiked,
}) => {
  const navItems: { id: TabId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'reasons', label: 'Reasons' },
    { id: 'cake', label: 'Cake' },
    { id: 'letter', label: 'Letter' },
  ];

  return (
    <header className="bg-[#faf9f6]/70 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_24px_rgba(230,230,250,0.35)] flex justify-between items-center w-full px-4 sm:px-8 md:px-16 py-3.5 sticky top-0 z-50 transition-all duration-300">
      {/* Brand Logo */}
      <button
        onClick={() => {
          onTabChange('home');
          magicAudio.playSparkleSound();
        }}
        className="text-left group flex items-center gap-2"
        id="nav-brand-logo"
      >
        <span className="font-serif italic font-bold tracking-tight text-[#795465] text-2xl md:text-3xl hover:text-[#5f3c4d] transition-colors">
          Sisters' Magic
        </span>
        <Sparkles className="w-4 h-4 text-[#f9d156] opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 items-center" aria-label="Main Navigation">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => {
                onTabChange(item.id);
                magicAudio.playChime(600 + navItems.findIndex((x) => x.id === item.id) * 80);
              }}
              className={`font-sans text-base transition-all duration-200 relative py-1 px-1 cursor-pointer ${
                isActive
                  ? 'text-[#795465] font-bold border-b-2 border-[#f9d156]'
                  : 'text-[#4f4448] font-normal hover:text-[#735c00] hover:scale-105'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Trailing Actions: Favorite Hearts */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Heart Favorite Button */}
        <button
          onClick={onLikeClick}
          id="btn-header-favorite"
          aria-label="Send Sister Love"
          className={`relative p-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
            hasLiked
              ? 'text-[#ba1a1a] bg-[#ffd8e7] scale-110 shadow-md'
              : 'text-[#795465] hover:text-[#ba1a1a] hover:bg-[#ffd8e7]/60 active:scale-95'
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-transform duration-300 ${
              hasLiked ? 'fill-current scale-110' : ''
            }`}
          />
          {likeCount > 0 && (
            <span className="text-xs font-bold text-[#795465] px-1">{likeCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};
