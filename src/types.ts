export type TabId = 'home' | 'reasons' | 'cake' | 'letter';

export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  date?: string;
  location?: string;
  rotation: string;
  note: string;
  tags?: string[];
}

export interface ReasonItem {
  id: string;
  title: string;
  iconName: string;
  iconType: 'favorite' | 'star' | 'sentiment_satisfied' | 'handshake' | 'auto_awesome';
  description: string;
  image?: string;
  imageAlt?: string;
  gridSpan?: string;
  badge?: string;
  highlightText?: string;
}

export interface SisterSecretWish {
  id: string;
  title: string;
  message: string;
  color: string;
}
