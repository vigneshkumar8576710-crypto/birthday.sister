/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabId } from './types';
import { TopAppBar } from './components/TopAppBar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ReasonsScreen } from './components/ReasonsScreen';
import { CakeScreen } from './components/CakeScreen';
import { LetterScreen } from './components/LetterScreen';
import { InfoModals } from './components/InfoModals';
import { magicAudio } from './utils/audio';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [likeCount, setLikeCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sisters_magic_likes');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });
  const [hasLiked, setHasLiked] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'contact' | 'love' | null>(null);

  // Sync tab with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as TabId;
      if (['home', 'reasons', 'cake', 'letter'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '' : `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLikeClick = () => {
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    setHasLiked(true);
    try {
      localStorage.setItem('sisters_magic_likes', newCount.toString());
    } catch {}

    magicAudio.playSparkleSound();

    // Heart sparkle confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.15, x: 0.9 },
      colors: ['#ffd8e7', '#f8c8dc', '#ba1a1a', '#ffe088']
    });

    if (!hasLiked) {
      setModalType('love');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#1a1c1a] font-sans antialiased overflow-x-hidden">
      {/* Top Header Navigation */}
      <TopAppBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        likeCount={likeCount}
        onLikeClick={handleLikeClick}
        hasLiked={hasLiked}
      />

      {/* Main Screen Views */}
      <main className="flex-grow flex flex-col">
        {activeTab === 'home' && (
          <HomeScreen
            onEnterCelebration={() => handleTabChange('reasons')}
            onSendLove={handleLikeClick}
          />
        )}

        {activeTab === 'reasons' && <ReasonsScreen />}

        {activeTab === 'cake' && <CakeScreen />}

        {activeTab === 'letter' && <LetterScreen />}
      </main>

      {/* Footer */}
      <Footer
        onTabChange={handleTabChange}
        onOpenPrivacy={() => setModalType('privacy')}
        onOpenContact={() => setModalType('contact')}
      />

      {/* Privacy / Contact / Love Dialogs */}
      <InfoModals
        type={modalType}
        onClose={() => setModalType(null)}
        likeCount={likeCount}
      />
    </div>
  );
}
