/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coordinates } from '../types';

/**
 * MOTEUR BALISTIQUE ONYX-CORE
 * Calcule les distances ajustées et la recommandation de club.
 */

// --- 1. CALCUL GPS (HAVERSINE) ---
export function calculateHaversineDistance(pos1: Coordinates, pos2: Coordinates): number {
  const R = 6371e3; // Rayon de la Terre en mètres
  const phi1 = (pos1.lat * Math.PI) / 180;
  const phi2 = (pos2.lat * Math.PI) / 180;
  const deltaPhi = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const deltaLambda = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance en mètres
}

// --- 2. AJUSTEMENTS ENVIRONNEMENTAUX ---
export interface EnvironmentalData {
  windSpeedKmh: number;      // km/h
  windDirectionDeg: number;  // 0-360 (0=Nord)
  elevationChange: number;   // mètres (+ pour montée, - pour descente)
  playerHeading: number;     // Direction du joueur vers le green (0-360)
}

export function calculateAdjustedDistance(rawDistance: number, env: EnvironmentalData): number {
  let adjusted = rawDistance;

  // Ajustement Dénivelé: 1m dénivelé = 1m distance (Règle d'or THE CHOSE)
  adjusted += env.elevationChange;

  // Ajustement Vent
  // On calcule l'angle relatif du vent par rapport à la ligne de jeu
  const relativeWindAngle = (env.windDirectionDeg - env.playerHeading + 360) % 360;
  const windRad = (relativeWindAngle * Math.PI) / 180;
  
  // Composante longitudinale (face/dos)
  // Math.cos(0) = 1 (vent de face si 0 est face), mais ici on simplifie:
  // Face wind (+ distance nécessaire), Tail wind (- distance nécessaire)
  const longitudinalWind = env.windSpeedKmh * Math.cos(windRad);
  
  // Facteur de conversion simplifié: 10km/h de face = +8m (moyenne fer 7)
  adjusted += (longitudinalWind * 0.8);

  return Math.round(adjusted);
}

// --- 3. RECOMMANDATION CLUB ---
export interface Club {
  name: string;
  carryDistance: number;
}

export function recommendClub(targetDistance: number, arsenal: Club[]): Club {
  // On cherche le club dont la distance de carry est la plus proche sans dépasser 
  // (ou en dépassant légèrement selon le caddie, ici logique safe par défaut)
  const sortedArsenal = [...arsenal].sort((a, b) => a.carryDistance - b.carryDistance);
  
  // Trouver le club qui couvre la distance
  let recommendation = sortedArsenal[sortedArsenal.length - 1]; // Par défaut le plus long
  for (const club of sortedArsenal) {
    if (club.carryDistance >= targetDistance) {
      recommendation = club;
      break;
    }
  }
  return recommendation;
}
