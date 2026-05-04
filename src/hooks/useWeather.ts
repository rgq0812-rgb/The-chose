/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';

export interface WeatherData {
  windSpeed: number;        // km/h
  windDirection: number;    // 0-360 degrees
  temperature: number;      // °C
  humidity: number;         // %
  pressure: number;         // mb
  status: string;           // Label: "LIGHT BREEZE", "STRONG GUST", etc.
}

const WEATHER_STATUS_MAP = {
  calm: 'CALM',
  lightBreeze: 'LIGHT BREEZE',
  gentleWind: 'GENTLE WIND',
  moderateWind: 'MODERATE WIND',
  freshGale: 'FRESH GALE',
  strongGust: 'STRONG GUST',
  storm: 'STORM',
};

function getWindStatus(speedKmh: number): string {
  if (speedKmh < 3) return WEATHER_STATUS_MAP.calm;
  if (speedKmh < 8) return WEATHER_STATUS_MAP.lightBreeze;
  if (speedKmh < 14) return WEATHER_STATUS_MAP.gentleWind;
  if (speedKmh < 20) return WEATHER_STATUS_MAP.moderateWind;
  if (speedKmh < 28) return WEATHER_STATUS_MAP.freshGale;
  if (speedKmh < 40) return WEATHER_STATUS_MAP.strongGust;
  return WEATHER_STATUS_MAP.storm;
}

// Données simulées par défaut (Pont Royal, Mallemort)
const DEFAULT_WEATHER: WeatherData = {
  windSpeed: 14,
  windDirection: 225,
  temperature: 18,
  humidity: 65,
  pressure: 1013,
  status: 'GENTLE WIND',
};

export function useWeather(lat?: number, lng?: number) {
  const [weather, setWeather] = useState<WeatherData>(DEFAULT_WEATHER);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (latitude: number, longitude: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Open-Meteo API (gratuit, sans clé)
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&timezone=auto`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur API météo');

      const data = await response.json();
      const current = data.current;

      setWeather({
        windSpeed: Math.round(current.wind_speed_10m),
        windDirection: current.wind_direction_10m,
        temperature: Math.round(current.temperature_2m),
        humidity: current.relative_humidity_2m,
        pressure: Math.round(current.pressure_msl),
        status: getWindStatus(current.wind_speed_10m),
      });
    } catch (err) {
      console.warn('Fallback : utilisation des données météo simulées', err);
      setError('Utilisation des données simulées');
      // Fallback : garder les données par défaut avec une petite variation
      const randomWind = DEFAULT_WEATHER.windSpeed + (Math.random() * 6 - 3);
      setWeather((prev) => ({
        ...prev,
        windSpeed: Math.round(randomWind),
        status: getWindStatus(randomWind),
      }));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Récupérer la météo si lat/lng fournis
  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      fetchWeather(lat, lng);
    }
  }, [lat, lng, fetchWeather]);

  return {
    ...weather,
    isLoading,
    error,
    refetch: fetchWeather,
  };
}
