import { MemoryItem, ReasonItem, SisterSecretWish } from '../types';

export const MEMORIES_DATA: MemoryItem[] = [
  {
    id: 'summer-bliss',
    title: 'Summer Bliss',
    subtitle: 'Golden sunshine & carefree giggles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtlzWWdtlu_QVlvIky-rbBsssHtxebeqQM-AKoiNoMBDD-SBDsFlNk8vKOhGgbJfrNkaKKCuXpvQpJz4rwAaZYXJ1pJT8k4xY1rn2oq6KVT4g-8IWiqxDkan0Su2WYsUDT-vb8gVDKqYx7ho236B7EZ25q6p2nkxGazdKzAvFGCzP-SY54EFn70OL1zBGmOxhf0LbZEMTAh-jar_lMf4c76Fo9MtF9FbagNAOXzEOi0AmckVeVhxSs',
    date: 'July 14',
    location: 'Sunlit Rose Garden',
    rotation: '-rotate-3',
    note: 'Remember running barefoot through the flowers until sunset? That afternoon reminded me how magical having you as a sister truly is.',
    tags: ['Childhood', 'Sunshine', 'Sisterhood']
  },
  {
    id: 'make-a-wish',
    title: 'Make a Wish',
    subtitle: 'Another sweet year of adventures',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrg8wxjRS1Pk_nJ9HzCJxravYHkw4I_q0m0dy0L6aehDQZ73zYRrOFye904f70rZBoW-xpXsC9yb8ZSvDYIqEyqJtADTipNZy3__eAd6xGwVuS-jCyXcsDO08dytDGSadHSINvzI-ZMF-M_M9yJDryxduv2MPhTKcQw0o1C9h6NOoLUNAjGcDcSGD-1TkdIVLzEcLTlYMhPa3a_vpygiufMKxDKTNQKY1Zn9GOGMoz51F_oZpO7m35',
    date: 'Birthday Tradition',
    location: 'Family Living Room',
    rotation: 'rotate-2',
    note: 'Every single candle you blow out is another wish I pray comes true for you. You deserve all the sweetness and happiness in the universe.',
    tags: ['Celebration', 'Wishes', 'Sweet moments']
  },
  {
    id: 'capturing-magic',
    title: 'Capturing Magic',
    subtitle: 'Polaroids holding timeless joy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv9Mcf_bFGVAQk6QCjmXCQFO5qiHTn5vKNyewBJ_ePu-UOrFUsvhqO2iSNXE9rQIuMx80bI4zMsMuBpy4yIMsI0k3OPOxw4HtAC5FMadufjBLRxqOcnkVqqdTVudJ_C0djguSINnmStRwnX-NLAr09uQ8blm2cWZYFRNVtEnoUQ0cURPEFzMsCys1ucLxdqPKpRpI_5VrXA0JOdNJhkTPCZkhLTLIOZOluFhBqDTlEVL-yS4bN2gvL',
    date: 'Autumn Afternoon',
    location: 'Vintage Photo Corner',
    rotation: '-rotate-1',
    note: 'Shaking instant film until our smiling faces appeared! These little photos captured snapshots of our best stories together.',
    tags: ['Polaroid', 'Nostalgia', 'Pure Joy']
  },
  {
    id: 'cheers-to-us',
    title: 'Cheers to Us',
    subtitle: 'Sparkling toasts to lifelong bond',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw9LrkBkSXJc_hoAnXsqoXLtdnvbEQnSAQpXHEhYoEsLH9B3mxfoZhvtwCCJxl8CbYyEcZ6C9Hd6MtXzvT1HeJ7RkdxazSPnRiQCVRPugCDkk8LICgan1tnhQtFeeQdwRcXx0lXOHmZ_pOBYnh2cJUFG0kMqohWIQ_1yKmJUsyFoD_HcKLmTTLj5jQ3zHfro-8XVWDNynnWz1SvkFZZ2WP2jiiBljg0tnwiCHw7lcsgpFiUzb6eqI5',
    date: 'New Year Eve & Beyond',
    location: 'Candlelit Celebration',
    rotation: 'rotate-4',
    note: 'Here is to all the late night talks, inside jokes that nobody else understands, and cheering each other on in everything.',
    tags: ['Toast', 'Best Friends', 'Laughter']
  },
  {
    id: 'surprises',
    title: 'Surprises',
    subtitle: 'Ribbons, gifts & thoughtful love',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIZ_32k5zEj61Ltk7NRNQAESKFTwfoAjcbdRuoaPxwioV2Bo-EXUnXfDz8mQLVDutkje4yu0lf9ZEkMe-hXVfhVw_nXmxkndKI_m4sTEf3Ofyhrb1dgV1DhJpXpCIYjlKeOKmCaMgm1DazPA9fXEmEiSRkU14O0aib_1DXFOMlhuh9Y2Hn4To-NR6MSDkqOG6r3MpqCKCz553Ex2-Ahylniit7IHDTgEFQe1-A9hS74DeFCBqres2q',
    date: 'Special Days',
    location: 'Wrapped with Care',
    rotation: '-rotate-2',
    note: 'Unwrapping memories together! The biggest gift of all will forever be having you in my life every single day.',
    tags: ['Gifts', 'Gratitude', 'Surprise']
  },
  {
    id: 'that-one-trip',
    title: 'That One Trip',
    subtitle: 'Tranquil sunset over peaceful waters',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0JEwbUoSkGnaly7nK52riCEszlkR7LeSHQ-hgp6erjHoNsJh_6NSh28CJwu36TWvOVpdoVZ_JzIkrFasoATvx3ss_jiuYluTiZ2fodFCjbMIkZjeoYE5_VT_R3Vs2_bd6D5B72aWqggdBhqHqdTFLMtJgMtJ8A5ialtjTJwvXQFWWVIPtJyauYEdMqlwbbim0w3ZGoT9k_GQX2x6EasrAgrvco6bX7-LhSW4Ef6K6-wEsh1UL9sqc',
    date: 'Summer Getaway',
    location: 'Lake Mountain Serenade',
    rotation: 'rotate-1',
    note: 'Sitting by the dock watching the pastel sky reflect across the lake while talking about all our hopes and dreams for the future.',
    tags: ['Adventure', 'Peace', 'Sunset']
  }
];

export const REASONS_DATA: ReasonItem[] = [
  {
    id: 'kindness',
    title: 'Your Kindness',
    iconName: 'favorite',
    iconType: 'favorite',
    description: 'You have a heart that always seeks to help and comfort others. Your kindness is a warm light in a sometimes cold world.',
    badge: 'Pure Gold Heart',
    highlightText: 'Spreading warmth wherever you go'
  },
  {
    id: 'strength',
    title: 'Your Strength',
    iconName: 'star',
    iconType: 'star',
    description: 'No matter what life throws our way, your resilience inspires me. You stand tall and weather every storm with grace.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKN1v_kqjCiXGgiyieavtOw-4QWhJ_rWWLRjsAiz_YKAU4qSX27Zz2OsslRiUMyDgDDP20icXpDT3b6tAelQFEAybm6Qg2h6cD5Ntu1xcRcOnH6cKR2HdH352hMn5RAU-D8gD66dj51CqzFWILCtMD4Tu4Cpdg-X1fL6-__3yuC0zIamGaRuVbX9cFKoiZM32YJ7QdvpQet_qx5m5B7ITNrf_vUDB0JtxqHyAedEgBPiX5qdGAR5Ur',
    imageAlt: 'Strong blooming oak tree in golden sunlight representing resilience',
    gridSpan: 'md:col-span-2 lg:col-span-1 lg:row-span-2',
    badge: 'Unwavering Anchor',
    highlightText: 'Rooted deep in grace and poise'
  },
  {
    id: 'laughter',
    title: 'Your Laughter',
    iconName: 'sentiment_satisfied',
    iconType: 'sentiment_satisfied',
    description: "It's contagious! Just hearing you laugh makes my day instantly better. It's the sweetest melody.",
    badge: 'Sunbeam Joy',
    highlightText: 'The sweetest sound in the room'
  },
  {
    id: 'support',
    title: 'Your Support',
    iconName: 'handshake',
    iconType: 'handshake',
    description: 'You are my biggest cheerleader. Knowing you have my back gives me the courage to pursue anything I dream of.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Iwq1ICvd5SSzrEHSL7uht0r0zqiDjHw_GXsNWPRj5Dh4mlGbGos1IZj5PsCqyLlCxG7bAh2PRvsQtbQHlwx_3RsLdcM3QYmEnl5ZvFd6bDZqtU7CKpDAXecxBG_2MPtBQlqO3ZC3KX7ipNXq59PfNQV3XziBRQPcrhVha5jNyuyie4h7vXZuQXoYh6zwKTde8lObMZ3Q9W7EUusVMmvHTqIYUVKnjXhIC5FQTSKIiJ-8mf1DVhKJ',
    imageAlt: 'Delicate glowing hands supporting a luminous star',
    gridSpan: 'lg:col-span-2',
    badge: 'Always By My Side',
    highlightText: 'Lifting me up every single step'
  },
  {
    id: 'spirit',
    title: 'Your Spirit',
    iconName: 'auto_awesome',
    iconType: 'auto_awesome',
    description: 'Your wild, beautiful, untamed spirit makes life an adventure. Never lose that spark of magic inside you.',
    badge: 'Magical Spark',
    highlightText: 'Lighting up every path you walk'
  }
];

export const SISTER_SECRET_WISHES: SisterSecretWish[] = [
  {
    id: 'w1',
    title: 'A Little Wish',
    message: 'May this upcoming year bring you endless reasons to smile and boundless peace.',
    color: 'from-pink-400 to-rose-300'
  },
  {
    id: 'w2',
    title: 'Sister Secret',
    message: 'You are capable of far more than you realize. I will always believe in you unconditionally!',
    color: 'from-amber-400 to-yellow-300'
  },
  {
    id: 'w3',
    title: 'Forever Bond',
    message: 'No matter the distance or time, my heart is always just a sister-whisper away.',
    color: 'from-purple-400 to-pink-300'
  },
  {
    id: 'w4',
    title: 'Golden Dream',
    message: 'Never doubt your inner light. The world is so much more brilliant with you in it.',
    color: 'from-emerald-400 to-teal-300'
  }
];

export const BUTTERFLY_MESSAGES = SISTER_SECRET_WISHES;
