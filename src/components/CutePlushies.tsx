import React from 'react';

// Cute Brown Teddy Bear with Pink Ribbon & Rosy Cheeks (Top-Left)
export const TeddyBearTopLeft: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="transition-transform duration-300 hover:scale-110">
      {/* Left Ear */}
      <circle cx="28" cy="28" r="14" fill="#C68B59" />
      <circle cx="28" cy="28" r="8" fill="#F4B9B8" />
      {/* Right Ear */}
      <circle cx="72" cy="28" r="14" fill="#C68B59" />
      <circle cx="72" cy="28" r="8" fill="#F4B9B8" />
      {/* Body / Paws peek */}
      <ellipse cx="50" cy="78" rx="28" ry="20" fill="#B27B4B" />
      <circle cx="25" cy="74" r="10" fill="#C68B59" />
      <circle cx="75" cy="74" r="10" fill="#C68B59" />
      <circle cx="25" cy="74" r="5" fill="#FCE7E7" />
      <circle cx="75" cy="74" r="5" fill="#FCE7E7" />
      {/* Head */}
      <circle cx="50" cy="46" r="30" fill="#C68B59" />
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
      <circle cx="39.5" cy="40.5" r="1.2" fill="#FFFFFF" />
      <circle cx="63.5" cy="40.5" r="1.2" fill="#FFFFFF" />
      {/* Rosy Cheeks */}
      <ellipse cx="32" cy="50" rx="4.5" ry="3" fill="#FF9EAA" opacity="0.8" />
      <ellipse cx="68" cy="50" rx="4.5" ry="3" fill="#FF9EAA" opacity="0.8" />
      {/* Pink Bow Ribbon */}
      <path d="M42 22C36 17 32 24 38 27C44 29 48 24 50 25C52 24 56 29 62 27C68 24 64 17 58 22C54 25 52 24 50 24C48 24 46 25 42 22Z" fill="#F8A5C2" />
      <circle cx="50" cy="24.5" r="3" fill="#F78FB3" />
    </g>
  </svg>
);

// Cute Plush Bunny with Heart (Top-Right)
export const PlushBunnyTopRight: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="transition-transform duration-300 hover:scale-110">
      {/* Left Long Ear */}
      <ellipse cx="34" cy="22" rx="8" ry="20" transform="rotate(-10 34 22)" fill="#FFF4F2" stroke="#F5C6C6" strokeWidth="1.5" />
      <ellipse cx="34" cy="22" rx="4.5" ry="14" transform="rotate(-10 34 22)" fill="#FFD1DC" />
      {/* Right Long Ear */}
      <ellipse cx="66" cy="22" rx="8" ry="20" transform="rotate(10 66 22)" fill="#FFF4F2" stroke="#F5C6C6" strokeWidth="1.5" />
      <ellipse cx="66" cy="22" rx="4.5" ry="14" transform="rotate(10 66 22)" fill="#FFD1DC" />
      {/* Body */}
      <ellipse cx="50" cy="78" rx="25" ry="18" fill="#FFF4F2" stroke="#F5C6C6" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="50" cy="52" r="26" fill="#FFFBF9" stroke="#F5C6C6" strokeWidth="1.5" />
      {/* Eyes with happy curve */}
      <path d="M38 50C40 47 43 47 45 50" stroke="#5E454B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 50C57 47 60 47 62 50" stroke="#5E454B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cute Nose & Mouth */}
      <polygon points="50,55 47,52 53,52" fill="#FF8FA3" />
      <path d="M50 55V58M47 57C48.5 59 50 59 50 59C50 59 51.5 59 53 57" stroke="#5E454B" strokeWidth="1.8" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="34" cy="56" rx="4" ry="2.5" fill="#FFB4C2" opacity="0.85" />
      <ellipse cx="66" cy="56" rx="4" ry="2.5" fill="#FFB4C2" opacity="0.85" />
      {/* Hugging Heart */}
      <path d="M50 70C46 64 38 66 38 72C38 78 47 84 50 87C53 84 62 78 62 72C62 66 54 64 50 70Z" fill="#FF6584" />
      {/* Paws on heart */}
      <ellipse cx="38" cy="73" rx="5" ry="4" fill="#FFFBF9" stroke="#F5C6C6" strokeWidth="1" />
      <ellipse cx="62" cy="73" rx="5" ry="4" fill="#FFFBF9" stroke="#F5C6C6" strokeWidth="1" />
    </g>
  </svg>
);

// Cute Stuffed Panda / Bear with Star (Bottom-Left)
export const PlushPandaBottomLeft: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="transition-transform duration-300 hover:scale-110">
      {/* Panda Black Ears */}
      <circle cx="26" cy="28" r="12" fill="#3D3A45" />
      <circle cx="26" cy="28" r="6" fill="#585461" />
      <circle cx="74" cy="28" r="12" fill="#3D3A45" />
      <circle cx="74" cy="28" r="6" fill="#585461" />
      {/* Body */}
      <ellipse cx="50" cy="78" rx="26" ry="19" fill="#F8F9FA" stroke="#E2E3E8" strokeWidth="1.5" />
      <ellipse cx="50" cy="80" rx="16" ry="12" fill="#3D3A45" />
      {/* Head */}
      <circle cx="50" cy="48" r="28" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      {/* Panda Eye Patches */}
      <ellipse cx="37" cy="46" rx="8" ry="10" transform="rotate(-15 37 46)" fill="#3D3A45" />
      <ellipse cx="63" cy="46" rx="8" ry="10" transform="rotate(15 63 46)" fill="#3D3A45" />
      {/* Eyes */}
      <circle cx="37" cy="45" r="3" fill="#FFFFFF" />
      <circle cx="63" cy="45" r="3" fill="#FFFFFF" />
      <circle cx="36.5" cy="45" r="1.8" fill="#1F2937" />
      <circle cx="63.5" cy="45" r="1.8" fill="#1F2937" />
      {/* Snout & Nose */}
      <ellipse cx="50" cy="55" rx="9" ry="6" fill="#F3F4F6" />
      <ellipse cx="50" cy="52.5" rx="3.5" ry="2.5" fill="#374151" />
      <path d="M50 55V58M47 57C48.5 58.5 50 58.5 50 58.5C50 58.5 51.5 58.5 53 57" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="28" cy="53" r="4" fill="#FFB5C5" opacity="0.8" />
      <circle cx="72" cy="53" r="4" fill="#FFB5C5" opacity="0.8" />
      {/* Yellow Glowing Star Plush */}
      <path d="M50 63L53 71L61 71L55 76L57 84L50 79L43 84L45 76L39 71L47 71Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.2" />
      {/* Paws */}
      <circle cx="34" cy="74" r="6" fill="#3D3A45" />
      <circle cx="66" cy="74" r="6" fill="#3D3A45" />
    </g>
  </svg>
);

// Cute Honey Teddy Bear with Birthday Gift (Bottom-Right)
export const HoneyBearBottomRight: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="transition-transform duration-300 hover:scale-110">
      {/* Honey Ears */}
      <circle cx="26" cy="27" r="12" fill="#E6A15C" />
      <circle cx="26" cy="27" r="7" fill="#FED7AA" />
      <circle cx="74" cy="27" r="12" fill="#E6A15C" />
      <circle cx="74" cy="27" r="7" fill="#FED7AA" />
      {/* Body */}
      <ellipse cx="50" cy="78" rx="27" ry="19" fill="#D98E48" />
      {/* Head */}
      <circle cx="50" cy="46" r="29" fill="#E6A15C" />
      {/* Snout */}
      <ellipse cx="50" cy="53" rx="13" ry="9" fill="#FEF3C7" />
      <ellipse cx="50" cy="48" rx="4.5" ry="3" fill="#78350F" />
      <path d="M50 51V55M46 54C47.5 56 49 56.5 50 56.5C51 56.5 52.5 56 54 54" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      {/* Eyes with wink or happy dots */}
      <circle cx="38" cy="42" r="3" fill="#451A03" />
      <path d="M59 42C61 39 65 39 67 42" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="39.5" cy="40.5" r="1" fill="#FFFFFF" />
      {/* Cheeks */}
      <circle cx="31" cy="49" r="4.5" fill="#FDA4AF" opacity="0.85" />
      <circle cx="69" cy="49" r="4.5" fill="#FDA4AF" opacity="0.85" />
      {/* Birthday Party Hat */}
      <polygon points="50,10 40,30 60,30" fill="#F472B6" />
      <path d="M43 23L57 23M45 17L55 17" stroke="#FDF2F8" strokeWidth="1.5" />
      <circle cx="50" cy="9" r="3" fill="#FBBF24" />
      {/* Gift Box on Lap */}
      <rect x="36" y="68" width="28" height="24" rx="3" fill="#A78BFA" />
      <rect x="34" y="65" width="32" height="6" rx="2" fill="#8B5CF6" />
      {/* Ribbon */}
      <rect x="47.5" y="65" width="5" height="27" fill="#FDE047" />
      <ellipse cx="45" cy="62" rx="4" ry="3" fill="#FDE047" />
      <ellipse cx="55" cy="62" rx="4" ry="3" fill="#FDE047" />
      {/* Bear Paws holding gift */}
      <circle cx="31" cy="74" r="6" fill="#E6A15C" />
      <circle cx="69" cy="74" r="6" fill="#E6A15C" />
    </g>
  </svg>
);
