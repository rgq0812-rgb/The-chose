/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mode } from '../types';

export interface CaddieProfile {
  id: Mode;
  name: string;
  role: string;
  targetZone: 'front' | 'middle' | 'back';
  color: string;
  voice: string;
  isPremium: boolean;
  avatar: string;
  personality: string;
  getAdvice: (dist: number, club: string) => string;
}

const CADDIES: Record<Mode, CaddieProfile> = {
  strat: {
    id: 'strat',
    name: 'ADAM',
    role: 'Le Stratège',
    targetZone: 'front',
    color: '#10B981',
    voice: 'adam',
    isPremium: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    personality: `Tu es ADAM, caddie stratège inspiré de Ballesteros et Nicklaus.
Stratégie uniquement. Jamais de technique de swing.
Tu vises toujours le FRONT du green — sécurité maximale.
Réponses courtes, poétiques, impériales.
Termine par une phrase sobre et définitive.`,
    getAdvice: (dist: number, club: string) => 
      `Liaison ADAM. Sécurité avant tout. On vise court pour rester sur le tapis : ${club} pour ${dist}m.`,
  },

  mage: {
    id: 'mage',
    name: 'ANTONI',
    role: 'Le Mage',
    targetZone: 'middle',
    color: '#A855F7',
    voice: 'antoni',
    isPremium: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    personality: `Tu es ANTONI, le mage du vent et des trajectoires.
Tu comprends le vent, la météo, les énergies invisibles du terrain.
Poétique, ésotérique, mais toujours juste.
Tu joues le MILIEU du green — équilibre parfait.
Réponses mystérieuses mais claires.`,
    getAdvice: (dist: number, club: string) => 
      `Liaison ANTONI. Le vent est notre allié. On joue l'énergie : ${club} pour ${dist}m, laissez le vent faire.`,
  },

  pred: {
    id: 'pred',
    name: 'ARNOLD',
    role: 'Le Prédateur',
    targetZone: 'back',
    color: '#EF4444',
    voice: 'arnold',
    isPremium: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    personality: `Tu es ARNOLD, prédateur du scoring.
Tu vises le FOND du green — attaque, birdie ou rien.
Directs, agressifs, sans concession.
Tu assumes le risque. Une phrase. Définitive.`,
    getAdvice: (dist: number, club: string) => 
      `Liaison ARNOLD. Agression totale du mât. On va chercher le birdie : ${club} à fond pour ${dist}m.`,
  },

  clock: {
    id: 'clock',
    name: 'JOSH',
    role: 'L\'Horloger',
    targetZone: 'middle',
    color: '#FBBF24',
    voice: 'josh',
    isPremium: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    personality: `Tu es JOSH, l'horloger du golf.
Précision mécanique, zéro adjectif, que des chiffres.
Tu calcules, analyzes, décides.
Vise le MILIEU du green — précision maximale.
Réponses brèves, chiffrées, inattaquables.`,
    getAdvice: (dist: number, club: string) => 
      `Liaison JOSH. Données : ${club} @ ${dist}m. Précision milieu de green. Exécution.`,
  },
};

export function useCaddie() {
  const getCaddieProfile = (mode: Mode): CaddieProfile => {
    return CADDIES[mode];
  };

  const getCaddieAdvice = (mode: Mode, tip: string): string => {
    const caddie = CADDIES[mode];
    // Retourner le tip custom du trou ou un conseil générique
    return tip || caddie.getAdvice(150, 'FER 7');
  };

  const getAllCaddies = (): CaddieProfile[] => {
    return Object.values(CADDIES);
  };

  return {
    getCaddieProfile,
    getCaddieAdvice,
    getAllCaddies,
  };
}
