/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PackType } from '../types';

export interface SubscriptionFeature {
  id: string;
  name: string;
  isPremium: boolean;
}

export const SAAS_CONFIG = {
  pricing: {
    [PackType.PLAYER]: {
      name: "The Player",
      price: "9.99€ / mois",
      features: ["Distances GPS Vent/Pente", "Caddies Adam & Antoni", "Scorecard Simple"]
    },
    [PackType.STUDENT]: {
      name: "The Student",
      price: "29.99€ / mois",
      features: ["Tout The Player", "Caddies Arnold & Josh", "Analyse Bio-Mécanique", "Export 8K PNG"]
    }
  }
};

export function checkAccess(feature: string, currentPack: PackType): boolean {
  if (currentPack === PackType.STUDENT) return true;
  // Logic simple pour démo
  const premiumFeatures = ['arnold', 'josh', 'biomechanics', 'export'];
  return !premiumFeatures.includes(feature);
}
