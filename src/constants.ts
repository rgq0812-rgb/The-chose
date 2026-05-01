import { Club, Course, Challenge } from './types';

// ============================================================
// COLORS
// ============================================================
export const COLORS = {
  ONYX: '#07080a',
  BRITISH_RACING_GREEN: '#004225',
  GOLD: '#D4AF37'
};

// ============================================================
// CLUBS
// ============================================================
export const INITIAL_CLUBS: Club[] = [
  { id: 'driver',  name: 'DRIVER',   type: 'wood',   dist: 230 },
  { id: 'wood3',   name: 'BOIS 3',   type: 'wood',   dist: 210 },
  { id: 'iron7',   name: 'FER 7',    type: 'iron',   dist: 145 },
  { id: 'sw',      name: 'SAND',     type: 'wedge',  dist: 75  },
  { id: 'putter',  name: 'PUTTER',   type: 'putter', dist: 0   },
];

export const ARSENAL = INITIAL_CLUBS;

// ============================================================
// PARCOURS
// ============================================================
export const COURSES: Course[] = [
  {
    id: 'pont-royal-ballesteros',
    name: 'Pont Royal',
    subtitle: 'Parcours Ballesteros',
    location: 'Mallemort, Bouches-du-Rhône',
    par: 72,
    totalDistance: { black: 6327, white: 6069, yellow: 5691, red: 5266, ladies: 5266 },
    rating: { slope: 149, cr: 73.2 },

    holes: [
      {
        number: 1,
        name: 'Pile ou Face',
        par: 4, handicap: 7,
        distanceTee: { black: 324, white: 299, yellow: 278, red: 236, ladies: 236 },
        teeBox: { lat: 43.70650, lng: 5.20800 },
        green: {
          front:  { lat: 43.70755, lng: 5.20695 },
          middle: { lat: 43.70766, lng: 5.20685 },
          back:   { lat: 43.70778, lng: 5.20675 },
        },
        hazards: ['Bois droite', 'Bunker front green'],
        description: 'Fairway gauche impératif.',
        tip: 'Visez le bunker de gauche pour assurer le fairway.',
      },
      {
        number: 2,
        name: 'Les Platanes',
        par: 4, handicap: 13,
        distanceTee: { black: 321, white: 292, yellow: 266, red: 221, ladies: 221 },
        teeBox: { lat: 43.70785, lng: 5.20650 },
        green: {
          front:  { lat: 43.70920, lng: 5.20510 },
          middle: { lat: 43.70935, lng: 5.20495 },
          back:   { lat: 43.70950, lng: 5.20480 },
        },
        hazards: ['Hors limites gauche', 'Platanes centenaires'],
        description: 'Drive court ou hybride recommandé.',
        tip: 'Restez à droite du platane central.',
      },
      {
        number: 3,
        name: 'L\'Arboretum',
        par: 4, handicap: 3,
        distanceTee: { black: 435, white: 408, yellow: 387, red: 333, ladies: 333 },
        teeBox: { lat: 43.70960, lng: 5.20450 },
        green: {
          front:  { lat: 43.71200, lng: 5.20230 },
          middle: { lat: 43.71215, lng: 5.20215 },
          back:   { lat: 43.71230, lng: 5.20200 },
        },
        hazards: ['Rough épais à gauche', 'Bunker de green à droite'],
        description: 'Par 4 long et exigeant.',
        tip: 'Un par ici vaut un birdie.',
      },
      {
        number: 4,
        name: 'Le Mistral',
        par: 3, handicap: 11,
        distanceTee: { black: 178, white: 157, yellow: 138, red: 109, ladies: 109 },
        teeBox: { lat: 43.71250, lng: 5.20180 },
        green: {
          front:  { lat: 43.71350, lng: 5.20080 },
          middle: { lat: 43.71365, lng: 5.20065 },
          back:   { lat: 43.71380, lng: 5.20050 },
        },
        hazards: ['Vent de face fréquent', 'Bunkers entourant le green'],
        description: 'Attention au vent soufflant de la vallée.',
        tip: 'Prenez un club de plus si le Mistral souffle.',
      },
      {
        number: 5,
        name: 'Le Pont Royal',
        par: 4, handicap: 17,
        distanceTee: { black: 340, white: 318, yellow: 295, red: 246, ladies: 246 },
        teeBox: { lat: 43.71340, lng: 5.20100 },
        green: {
          front:  { lat: 43.71150, lng: 5.20150 },
          middle: { lat: 43.71165, lng: 5.20165 },
          back:   { lat: 43.71180, lng: 5.20180 },
        },
        hazards: ['Lac à gauche', 'Bunkers fairway'],
        description: 'Dogleg gauche au-dessus de l\'eau.',
        tip: 'Le slice est punitif ici, restez centre-gauche.',
      },
      {
        number: 6,
        name: 'Les Alpilles',
        par: 5, handicap: 5,
        distanceTee: { black: 516, white: 490, yellow: 465, red: 404, ladies: 404 },
        teeBox: { lat: 43.71130, lng: 5.20120 },
        green: {
          front:  { lat: 43.70850, lng: 5.20050 },
          middle: { lat: 43.70865, lng: 5.20065 },
          back:   { lat: 43.70880, lng: 5.20080 },
        },
        hazards: ['Bunker croisé fairway', 'Green surélevé'],
        description: 'Long par 5 en montée légère.',
        tip: 'Visez le sommet de la colline au drive.',
      },
      {
        number: 7,
        name: 'Le Luberon',
        par: 4, handicap: 9,
        distanceTee: { black: 396, white: 375, yellow: 350, red: 308, ladies: 308 },
        teeBox: { lat: 43.70830, lng: 5.20020 },
        green: {
          front:  { lat: 43.70600, lng: 5.20150 },
          middle: { lat: 43.70615, lng: 5.20165 },
          back:   { lat: 43.70630, lng: 5.20180 },
        },
        hazards: ['Rough pénalisant à droite'],
        description: 'Vue splendide sur le Luberon.',
        tip: 'Appuyez-vous sur la gauche du fairway.',
      },
      {
        number: 8,
        name: 'Le Tournant',
        par: 4, handicap: 1,
        distanceTee: { black: 410, white: 405, yellow: 375, red: 331, ladies: 331 },
        teeBox: { lat: 43.70580, lng: 5.20120 },
        green: {
          front:  { lat: 43.70350, lng: 5.19950 },
          middle: { lat: 43.70365, lng: 5.19965 },
          back:   { lat: 43.70380, lng: 5.19980 },
        },
        hazards: ['Dogleg droit serré', 'Bunkers de protection'],
        description: 'Le trou le plus difficile du parcours.',
        tip: 'Ne coupez pas le dogleg, visez large.',
      },
      {
        number: 9,
        name: 'Seve',
        par: 3, handicap: 15,
        distanceTee: { black: 167, white: 147, yellow: 127, red: 97, ladies: 97 },
        teeBox: { lat: 43.70330, lng: 5.19980 },
        green: {
          front:  { lat: 43.70250, lng: 5.20100 },
          middle: { lat: 43.70265, lng: 5.20115 },
          back:   { lat: 43.70280, lng: 5.20130 },
        },
        hazards: ['Lac devant le green'],
        description: 'Par 3 signature avec green en île partielle.',
        tip: 'Ignorez l\'eau, jouez le centre du green.',
      },
      {
        number: 10,
        name: 'La Cascade',
        par: 4, handicap: 8,
        distanceTee: { black: 381, white: 358, yellow: 335, red: 289, ladies: 289 },
        teeBox: { lat: 43.70150, lng: 5.20300 },
        green: {
          front:  { lat: 43.70400, lng: 5.20450 },
          middle: { lat: 43.70415, lng: 5.20465 },
          back:   { lat: 43.70430, lng: 5.20480 },
        },
        hazards: ['Cascade à droite du green', 'Bunkers fairway'],
        description: 'Remontée vers le club-house.',
        tip: 'Restez à gauche pour éviter la cascade.',
      },
      {
        number: 11,
        name: 'Le Grand Canyon',
        par: 3, handicap: 16,
        distanceTee: { black: 205, white: 190, yellow: 170, red: 155, ladies: 155 },
        teeBox: { lat: 43.71135, lng: 5.20800 },
        green: {
          front:  { lat: 43.71025, lng: 5.20950 },
          middle: { lat: 43.71040, lng: 5.20930 },
          back:   { lat: 43.71055, lng: 5.20910 },
        },
        hazards: ['Ravin abyssal', 'Hors limites'],
        description: 'Trou impressionnant au-dessus du vide.',
        tip: 'Prenez un club de plus, le ravin est intimidant.',
      },
      {
        number: 12,
        name: 'Le Grand Chêne',
        par: 4, handicap: 12,
        distanceTee: { black: 351, white: 334, yellow: 286, red: 245, ladies: 245 },
        teeBox: { lat: 43.71050, lng: 5.20930 },
        green: {
          front:  { lat: 43.70850, lng: 5.21150 },
          middle: { lat: 43.70865, lng: 5.21165 },
          back:   { lat: 43.70880, lng: 5.21180 },
        },
        hazards: ['Chêne massif en plein milieu'],
        description: 'Le placement du drive est crucial.',
        tip: 'Passez à gauche du chêne ou par-dessus.',
      },
      {
        number: 13,
        name: 'Les Saules',
        par: 5, handicap: 18,
        distanceTee: { black: 480, white: 455, yellow: 430, red: 380, ladies: 380 },
        teeBox: { lat: 43.70840, lng: 5.21180 },
        green: {
          front:  { lat: 43.70550, lng: 5.21350 },
          middle: { lat: 43.70565, lng: 5.21365 },
          back:   { lat: 43.70580, lng: 5.21380 },
        },
        hazards: ['Ruisseau transversal', 'Saules pleureurs'],
        description: 'Par 5 accessible en deux pour les longs frappeurs.',
        tip: 'Attention au ruisseau sur le deuxième coup.',
      },
      {
        number: 14,
        name: 'Le Couloir',
        par: 4, handicap: 6,
        distanceTee: { black: 360, white: 345, yellow: 320, red: 270, ladies: 270 },
        teeBox: { lat: 43.70530, lng: 5.21380 },
        green: {
          front:  { lat: 43.70250, lng: 5.21550 },
          middle: { lat: 43.70265, lng: 5.21565 },
          back:   { lat: 43.70280, lng: 5.21580 },
        },
        hazards: ['Fairway étroit', 'Pins parasols'],
        description: 'Nécessite une précision chirurgicale au drive.',
        tip: 'Hybride ou Fer 3 pour assurer le fairway.',
      },
      {
        number: 15,
        name: 'Le Juge de Paix',
        par: 4, handicap: 10,
        distanceTee: { black: 390, white: 365, yellow: 340, red: 290, ladies: 290 },
        teeBox: { lat: 43.70230, lng: 5.21580 },
        green: {
          front:  { lat: 43.70000, lng: 5.21450 },
          middle: { lat: 43.70015, lng: 5.21465 },
          back:   { lat: 43.70030, lng: 5.21480 },
        },
        hazards: ['Longue approche', 'Bunkers profonds'],
        description: 'Une deuxième partie de parcours qui commence fort.',
        tip: 'Un drive long est nécessaire pour voir le green.',
      },
      {
        number: 16,
        name: 'La Restanque',
        par: 5, handicap: 4,
        distanceTee: { black: 530, white: 505, yellow: 480, red: 430, ladies: 430 },
        teeBox: { lat: 43.69980, lng: 5.21430 },
        green: {
          front:  { lat: 43.69750, lng: 5.21150 },
          middle: { lat: 43.69765, lng: 5.21165 },
          back:   { lat: 43.69780, lng: 5.21180 },
        },
        hazards: ['Mur de pierres (restanque)', 'Green à trois plateaux'],
        description: 'Long par 5 avec un green très technique.',
        tip: 'Placez votre balle sur le bon plateau du green.',
      },
      {
        number: 17,
        name: 'Le Toboggan',
        par: 3, handicap: 2,
        distanceTee: { black: 210, white: 185, yellow: 160, red: 110, ladies: 110 },
        teeBox: { lat: 43.69730, lng: 5.21130 },
        green: {
          front:  { lat: 43.69850, lng: 5.20900 },
          middle: { lat: 43.69865, lng: 5.20915 },
          back:   { lat: 43.69880, lng: 5.20930 },
        },
        hazards: ['Pente forte', 'Bunkers de green'],
        description: 'Par 3 long et plongeant.',
        tip: 'Le vent arrière peut rendre le clubbing difficile.',
      },
      {
        number: 18,
        name: 'Le Verdict',
        par: 5, handicap: 14,
        distanceTee: { black: 510, white: 485, yellow: 460, red: 410, ladies: 410 },
        teeBox: { lat: 43.69880, lng: 5.20880 },
        green: {
          front:  { lat: 43.70550, lng: 5.20750 },
          middle: { lat: 43.70566, lng: 5.20765 },
          back:   { lat: 43.70578, lng: 5.20775 },
        },
        hazards: ['Bunkers fairway partout', 'Green double plateau'],
        description: 'Fin du parcours face à la terrasse du club-house.',
        tip: 'Assurez le par pour finir en beauté devant le public.',
      },
    ],
  },
];

// ============================================================
// CHALLENGES
// ============================================================
export const CHALLENGES: Challenge[] = [
  {
    id: 'sniper',
    name: 'SNIPER',
    description: 'Viser la zone FRONT 3 fois de suite',
    target: 3, caddie: 'strat',
    reward: 'Badge Précision Chirurgicale',
  },
];

// ============================================================
// CADDIES — 4 PERSONNALITÉS NEURALES
// ============================================================
export const CADDIES = {
  strat: {
    id: 'strat',
    name: 'ADAM',
    role: 'Le Stratège',
    targetZone: 'front' as const,
    color: '#10B981',
    voice: 'adam',
    isPremium: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    getAdvice: (dist: number, club: string) => `Liaison ADAM. Sécurité avant tout. On vise court pour rester sur le tapis : ${club} pour ${dist}m.`,
    personality: `Tu es ADAM, caddie stratège inspiré de Ballesteros et Nicklaus.
Stratégie uniquement. Jamais de technique de swing.
Tu vises toujours le FRONT du green — sécurité maximale.
Réponses courtes, poétiques, impériales.
Termine par une phrase sobre et définitive.`,
  },
  pred: {
    id: 'pred',
    name: 'ARNOLD',
    role: 'Le Prédateur',
    targetZone: 'back' as const,
    color: '#EF4444',
    voice: 'arnold',
    isPremium: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    getAdvice: (dist: number, club: string) => `Liaison ARNOLD. Agression totale du mât. On va chercher le birdie : ${club} à fond pour ${dist}m.`,
    personality: `Tu es ARNOLD, prédateur du scoring.
Tu vises le FOND du green — attaque, birdie ou rien.
Directs, agressifs, sans concession.
Tu assumes le risque. Une phrase. Définitive.`,
  },
};

export const CADDIES_CONFIG = Object.values(CADDIES);

export const THE_STUDENT_LEVELS = [
  { id: 'fundamental', name: 'Fondamentaux', tagline: 'Analyse Pure' },
  { id: 'shotmaking', name: 'Shotmaking', tagline: 'Créativité Tactique' },
  { id: 'clutch', name: 'Clutch', tagline: 'Mental d\'Acier' },
  { id: 'elite', name: 'Elite', tagline: 'Symptômes Bugatti' }
];

export const STROKE_INDEX = [
  7, 13, 3, 11, 17, 5, 9, 1, 15,
  8, 16, 12, 18, 6, 10, 4, 2, 14
];
