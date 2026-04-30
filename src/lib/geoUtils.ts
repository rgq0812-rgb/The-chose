/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coordinates } from '../types';
import { calculateHaversineDistance } from './ballistics';

export interface GreenZones {
  front: number;
  middle: number;
  back: number;
  heading: number;
}

export function getGreenZones(player: Coordinates, green: { front: Coordinates, middle: Coordinates, back: Coordinates }): GreenZones {
  const dFront = Math.round(calculateHaversineDistance(player, green.front));
  const dMiddle = Math.round(calculateHaversineDistance(player, green.middle));
  const dBack = Math.round(calculateHaversineDistance(player, green.back));

  // Calcul du heading (angle du joueur vers le green)
  const dy = green.middle.lat - player.lat;
  const dx = Math.cos(Math.PI/180 * player.lat) * (green.middle.lng - player.lng);
  const heading = (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;

  return { front: dFront, middle: dMiddle, back: dBack, heading };
}
