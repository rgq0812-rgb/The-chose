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
  { id: 'hybrid',  name: 'HYBRIDE',  type: 'hybrid', dist: 195 },
  { id: 'iron4',   name: 'FER 4',    type: 'iron',   dist: 180 },
  { id: 'iron5',   name: 'FER 5',    type: 'iron',   dist: 170 },
  { id: 'iron6',   name: 'FER 6',    type: 'iron',   dist: 158 },
  { id: 'iron7',   name: 'FER 7',    type: 'iron',   dist: 145 },
  { id: 'iron8',   name: 'FER 8',    type: 'iron',   dist: 132 },
  { id: 'iron9',   name: 'FER 9',    type: 'iron',   dist: 118 },
  { id: 'pw',      name: 'PITCHING', type: 'wedge',  dist: 105 },
  { id: 'gw',      name: 'GAP',      type: 'wedge',  dist: 90  },
  { id: 'sw',      name: 'SAND',     type: 'wedge',  dist: 75  },
  { id: 'lw',      name: 'LOB',      type: 'wedge',  dist: 58  },
  { id: 'putter',  name: 'PUTTER',   type: 'putter', dist: 0   },
];

export const ARSENAL = INITIAL_CLUBS;

// ============================================================
// PARCOURS
// ============================================================
export const COURSES: Course[] = [
  {
    id: 'pont-royal-ballesteros',
    name: 'Golf International de Pont Royal',
    subtitle: 'Parcours Ballesteros',
    location: 'Mallemort, Bouches-du-Rhône',
    par: 72,
    totalDistance: { black: 6327, white: 6069, ladies: 5266 },
    rating: { slope: 149, cr: 73.2 },

    holes: [
      {
        number: 1,
        name: 'Heads or Tails',
        par: 4, handicap: 7,
        distanceTee: { black: 324, white: 299, ladies: 236 },
        teeBox: { lat: 43.70650, lng: 5.20800 },
        green: {
          front:  { lat: 43.70755, lng: 5.20695 },
          middle: { lat: 43.70766, lng: 5.20685 },
          back:   { lat: 43.70778, lng: 5.20675 },
        },
        hazards: ['Bois droite', 'Bunker front green'],
        description: 'Fairway gauche impératif. Green peu profond, bunker entrée.',
        tip: 'Place la balle à gauche. Le driver est un piège.',
      },
      {
        number: 2,
        name: 'Plane Trees',
        par: 3, handicap: 13,
        distanceTee: { black: 166, white: 130, ladies: 103 },
        teeBox: { lat: 43.70780, lng: 5.20620 },
        green: {
          front:  { lat: 43.70830, lng: 5.20555 },
          middle: { lat: 43.70842, lng: 5.20540 },
          back:   { lat: 43.70855, lng: 5.20525 },
        },
        hazards: ['Lac front', 'Bunker gauche', 'OB derrière'],
        description: 'Par 3 encadré de platanes centenaires. Lac devant.',
        tip: 'Vise l\'ouverture entre le bunker et le lac. Centre impératif.',
      },
      {
        number: 3,
        name: 'The Valley',
        par: 4, handicap: 3,
        distanceTee: { black: 400, white: 375, ladies: 310 },
        teeBox: { lat: 43.70860, lng: 5.20500 },
        green: {
          front:  { lat: 43.70945, lng: 5.20425 },
          middle: { lat: 43.70960, lng: 5.20410 },
          back:   { lat: 43.70975, lng: 5.20395 },
        },
        hazards: ['Rough profond gauche', 'Bunker droit approche'],
        description: 'Long par 4 en descente. Fairway large mais trompeur.',
        tip: 'La descente donne 10-15m. Prends un club de moins.',
      },
      {
        number: 4,
        name: 'Across the Lake',
        par: 4, handicap: 11,
        distanceTee: { black: 365, white: 340, ladies: 280 },
        teeBox: { lat: 43.70975, lng: 5.20390 },
        green: {
          front:  { lat: 43.71070, lng: 5.20335 },
          middle: { lat: 43.71085, lng: 5.20320 },
          back:   { lat: 43.71100, lng: 5.20305 },
        },
        hazards: ['Lac approche', 'Bunkers green'],
        description: 'Obstacle d\'eau à franchir au deuxième coup.',
        tip: 'Attends d\'avoir le vent avec toi. Sinon vise le front.',
      },
      {
        number: 5,
        name: 'Over the Water',
        par: 3, handicap: 17,
        distanceTee: { black: 175, white: 148, ladies: 118 },
        teeBox: { lat: 43.71100, lng: 5.20290 },
        green: {
          front:  { lat: 43.71195, lng: 5.20245 },
          middle: { lat: 43.71210, lng: 5.20230 },
          back:   { lat: 43.71225, lng: 5.20210 },
        },
        hazards: ['Lac total entre tee et green'],
        description: 'Par 3 tout sur l\'eau. Aucune alternative.',
        tip: 'L\'eau fait peur, pas le green. Club entier en plus.',
      },
      {
        number: 6,
        name: 'Pine Forest',
        par: 5, handicap: 5,
        distanceTee: { black: 515, white: 485, ladies: 420 },
        teeBox: { lat: 43.71225, lng: 5.20215 },
        green: {
          front:  { lat: 43.71305, lng: 5.20175 },
          middle: { lat: 43.71320, lng: 5.20160 },
          back:   { lat: 43.71335, lng: 5.20140 },
        },
        hazards: ['Pins des deux côtés', 'Bunker gauche 3ème coup'],
        description: 'Long par 5 entre les pins. Eagle accessible.',
        tip: 'Layup à 100m. ARNOLD joue le fond. ADAM joue le milieu.',
      },
      {
        number: 7,
        name: 'The Plateau',
        par: 4, handicap: 9,
        distanceTee: { black: 380, white: 355, ladies: 295 },
        teeBox: { lat: 43.71335, lng: 5.20175 },
        green: {
          front:  { lat: 43.71395, lng: 5.20305 },
          middle: { lat: 43.71410, lng: 5.20290 },
          back:   { lat: 43.71425, lng: 5.20275 },
        },
        hazards: ['Pente avant green', 'Bunkers latéraux'],
        description: 'Green surélevé. Approche en montée.',
        tip: 'Club supplémentaire obligatoire. Green dur à tenir.',
      },
      {
        number: 8,
        name: 'The Ravine',
        par: 4, handicap: 1,
        distanceTee: { black: 430, white: 400, ladies: 335 },
        teeBox: { lat: 43.71395, lng: 5.20310 },
        green: {
          front:  { lat: 43.71325, lng: 5.20500 },
          middle: { lat: 43.71340, lng: 5.20480 },
          back:   { lat: 43.71355, lng: 5.20460 },
        },
        hazards: ['Ravin central', 'OB droite', 'Bunkers green'],
        description: 'Trou signature HCP 1. Ravin à franchir.',
        tip: 'Bogey = bon score ici. Joue ta carte sans ego.',
      },
      {
        number: 9,
        name: 'The Lake',
        par: 5, handicap: 15,
        distanceTee: { black: 510, white: 480, ladies: 415 },
        teeBox: { lat: 43.71325, lng: 5.20500 },
        green: {
          front:  { lat: 43.71215, lng: 5.20635 },
          middle: { lat: 43.71230, lng: 5.20620 },
          back:   { lat: 43.71245, lng: 5.20605 },
        },
        hazards: ['Lac autour du green', 'Tentant mais fatal'],
        description: 'Par 5 finissant sur lac. Green entouré d\'eau.',
        tip: 'Layup à 50m. ARNOLD attaque. ADAM joue court.',
      },
      {
        number: 10,
        name: 'The Return',
        par: 4, handicap: 8,
        distanceTee: { black: 370, white: 345, ladies: 285 },
        teeBox: { lat: 43.71215, lng: 5.20640 },
        green: {
          front:  { lat: 43.71135, lng: 5.20800 },
          middle: { lat: 43.71150, lng: 5.20780 },
          back:   { lat: 43.71165, lng: 5.20760 },
        },
        hazards: ['Rough droite départ', 'Bunker approche'],
        description: 'Début du retour. Dog-leg gauche léger.',
        tip: 'Bonne ouverture pour lancer le retour avec confiance.',
      },
      {
        number: 11,
        name: 'The Abyss',
        par: 3, handicap: 16,
        distanceTee: { black: 205, white: 190, ladies: 155 },
        teeBox: { lat: 43.71135, lng: 5.20800 },
        green: {
          front:  { lat: 43.71025, lng: 5.20950 },
          middle: { lat: 43.71040, lng: 5.20930 },
          back:   { lat: 43.71055, lng: 5.20910 },
        },
        hazards: ['Ravin absolu', 'Forêt à perte de vue', 'Falaise droite'],
        description: 'Trou le plus spectaculaire. Ravin 190m. Grand green.',
        tip: 'Vise le centre. Mistral = club entier en plus. Cible verrouillée.',
      },
      {
        number: 12,
        name: 'The Garrigue',
        par: 4, handicap: 12,
        distanceTee: { black: 345, white: 320, ladies: 265 },
        teeBox: { lat: 43.71025, lng: 5.20950 },
        green: {
          front:  { lat: 43.70895, lng: 5.21080 },
          middle: { lat: 43.70910, lng: 5.21060 },
          back:   { lat: 43.70925, lng: 5.21040 },
        },
        hazards: ['Garrigue des deux côtés'],
        description: 'Fairway entre garrigues. Placement essentiel.',
        tip: 'Fairway en premier. La garrigue avale tout.',
      },
      {
        number: 13,
        name: 'Around the Lake',
        par: 3, handicap: 18,
        distanceTee: { black: 180, white: 158, ladies: 125 },
        teeBox: { lat: 43.70895, lng: 5.21080 },
        green: {
          front:  { lat: 43.70765, lng: 5.21170 },
          middle: { lat: 43.70780, lng: 5.21150 },
          back:   { lat: 43.70795, lng: 5.21130 },
        },
        hazards: ['Lac entoure le green', 'Vent amplifié sur l\'eau'],
        description: 'Green entouré par le lac central. HCP 18 mais traître.',
        tip: 'HCP 18 ne veut rien dire avec le vent. Vise le front.',
      },
      {
        number: 14,
        name: 'The Dogleg',
        par: 5, handicap: 6,
        distanceTee: { black: 530, white: 500, ladies: 430 },
        teeBox: { lat: 43.70765, lng: 5.21160 },
        green: {
          front:  { lat: 43.70635, lng: 5.21040 },
          middle: { lat: 43.70650, lng: 5.21020 },
          back:   { lat: 43.70665, lng: 5.21000 },
        },
        hazards: ['Coude serré', 'Rough profond extérieur'],
        description: 'Long par 5 avec dog-leg prononcé.',
        tip: 'Joue en 3 coups propres. Le raccourci est un piège.',
      },
      {
        number: 15,
        name: 'The Slope',
        par: 4, handicap: 10,
        distanceTee: { black: 390, white: 362, ladies: 298 },
        teeBox: { lat: 43.70635, lng: 5.21000 },
        green: {
          front:  { lat: 43.70545, lng: 5.20910 },
          middle: { lat: 43.70560, lng: 5.20890 },
          back:   { lat: 43.70575, lng: 5.20870 },
        },
        hazards: ['Dévers gauche', 'Green incliné'],
        description: 'Descente progressive. Distances trompeuses.',
        tip: 'La descente donne de la distance. Recalcule ton club.',
      },
      {
        number: 16,
        name: 'The Pinewood',
        par: 4, handicap: 4,
        distanceTee: { black: 420, white: 392, ladies: 325 },
        teeBox: { lat: 43.70545, lng: 5.20870 },
        green: {
          front:  { lat: 43.70605, lng: 5.20740 },
          middle: { lat: 43.70620, lng: 5.20720 },
          back:   { lat: 43.70635, lng: 5.20700 },
        },
        hazards: ['Pins des deux côtés', 'Forêt directe — pas de rough'],
        description: 'Couloir de pins. Droit mais très serré.',
        tip: 'Driver uniquement dans l\'axe parfait. Sinon bois 3.',
      },
      {
        number: 17,
        name: 'The Challenge',
        par: 4, handicap: 2,
        distanceTee: { black: 415, white: 385, ladies: 320 },
        teeBox: { lat: 43.70635, lng: 5.20700 },
        green: {
          front:  { lat: 43.70695, lng: 5.20610 },
          middle: { lat: 43.70710, lng: 5.20590 },
          back:   { lat: 43.70725, lng: 5.20570 },
        },
        hazards: ['Bunkers fairway 230m', 'Green très défendu'],
        description: 'Avant-dernier. HCP 2. Décision critique.',
        tip: 'Si tu es bien au score : safe. Si tu es derrière : ARNOLD prend le contrôle.',
      },
      {
        number: 18,
        name: 'The Finale',
        par: 5, handicap: 14,
        distanceTee: { black: 520, white: 490, ladies: 420 },
        teeBox: { lat: 43.70720, lng: 5.20570 },
        green: {
          front:  { lat: 43.70665, lng: 5.20480 },
          middle: { lat: 43.70680, lng: 5.20460 },
          back:   { lat: 43.70695, lng: 5.20440 },
        },
        hazards: ['Bunkers approche', 'Public club-house'],
        description: 'Par 5 final avec vue club-house. Finir en beauté.',
        tip: 'Birdie possible en 2 pour les longs. Sinon 3 coups propres.',
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
  {
    id: 'predator',
    name: 'PRÉDATEUR',
    description: 'Atteindre la zone BACK sur 5 approches',
    target: 5, caddie: 'pred',
    reward: 'Badge Agressivité Contrôlée',
  },
  {
    id: 'clockwork',
    name: 'HORLOGER',
    description: '18 trous sans dépasser le par prévu par JOSH',
    target: 18, caddie: 'clock',
    reward: 'Badge Précision Absolue',
  },
  {
    id: 'mage',
    name: "L'ARCHITECTE",
    description: 'Jouer 9 trous en suivant uniquement ANTONI',
    target: 9, caddie: 'mage',
    reward: 'Badge Maître du Tracé',
  },
  {
    id: 'trizone',
    name: 'TRI-ZONE MASTER',
    description: 'Toucher les 3 zones en une même partie',
    target: 3, caddie: 'strat',
    reward: 'Badge Maître du Protocol',
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
  mage: {
    id: 'mage',
    name: 'ANTONI',
    role: 'Le Mage',
    targetZone: 'middle' as const,
    color: '#C9964A',
    voice: 'antoni',
    isPremium: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    getAdvice: (dist: number, club: string) => `Liaison ANTONI. Visualise la trajectoire. Le vent est ton allié. ${club} plein centre à ${dist}m.`,
    personality: `Tu es ANTONI, architecte de trajectoires.
Tu penses en Draw et Fade, fenêtres d'entrée, angles d'attaque.
Tu vises le CENTRE du green avec une trajectoire travaillée.
Décris la trajectoire idéale de la balle dans l'air.
Jamais de technique sur le corps.`,
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
  clock: {
    id: 'clock',
    name: 'JOSH',
    role: "L'Horloger",
    targetZone: 'middle' as const,
    color: '#60A5FA',
    voice: 'josh',
    isPremium: true,
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&q=80',
    getAdvice: (dist: number, club: string) => `DATA : ${dist}m Net. CLUB : ${club}. Vigueur 100%. Cible verrouillée.`,
    personality: `Tu es JOSH, l'horloger. Données brutes uniquement.
Format strict : Club. Distance. Zone. Vent.
Zéro émotion. Zéro poésie. Que les chiffres.
Termine toujours par : Cible verrouillée.`,
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
