/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum CaddieType {
  ADAM = 'strat',
  ANTONI = 'mage',
  ARNOLD = 'pred',
  JOSH = 'clock',
}

export enum GameMode {
  STROKE = 'STROKE',
  STABLEFORD = 'STABLEFORD',
  MATCH = 'MATCH',
}

export type AppPath = 'player' | 'student' | 'pro';
export type Mode = 'strat' | 'mage' | 'pred' | 'clock';
export type Tab = 'dashboard' | 'map' | 'cam' | 'challenges' | 'scorecard' | 'circle' | 'settings' | 'chat';
export enum PackType {
  PLAYER = 'player',
  STUDENT = 'student',
}

export interface HoleScore {
  hole: number;
  par: number;
  strokes: number;
  putts: number;
  fairwayHit: boolean | null;
  gir: boolean | null;
  timestamp: number;
}

export interface Club {
  id: string;
  name: string;
  type: 'wood' | 'iron' | 'wedge' | 'hybrid' | 'putter';
  dist: number;
}

export interface Hole {
  number: number;
  name: string;
  par: number;
  handicap: number;
  distanceTee: { black: number; white: number; ladies: number; yellow?: number; blue?: number; red?: number };
  teeBox: { lat: number; lng: number };
  green: {
    front: { lat: number; lng: number };
    middle: { lat: number; lng: number };
    back: { lat: number; lng: number };
  };
  hazards: string[];
  description: string;
  tip: string;
}

export interface Course {
  id: string;
  name: string;
  subtitle?: string;
  location: string;
  par: number;
  totalDistance: { black: number; white: number; ladies: number; yellow?: number; blue?: number; red?: number };
  rating: { slope: number; cr: number };
  holes: Hole[];
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  target: number;
  caddie: string;
  reward: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ScoreEntry {
  hole: number;
  score: number;
  par: number;
  putts: number;
  fairway?: 'left' | 'center' | 'right' | 'miss';
  gir?: boolean;
}
