/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface GPSPosition {
  lat: number;
  lng: number;
}

export interface UseGPSReturn {
  position: GPSPosition | null;
  accuracy: number | null;
  error: string | null;
  isActive: boolean;
  startGPS: () => void;
  stopGPS: () => void;
}

export function useGPS(): UseGPSReturn {
  const [position, setPosition] = useState<GPSPosition | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  const startGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Géolocalisation non supportée par le navigateur');
      return;
    }

    setIsActive(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const onSuccess = (geoposition: GeolocationPosition) => {
      setPosition({
        lat: geoposition.coords.latitude,
        lng: geoposition.coords.longitude,
      });
      setAccuracy(geoposition.coords.accuracy);
      setError(null);
    };

    const onError = (geoError: GeolocationPositionError) => {
      let errorMsg = 'Erreur de géolocalisation';
      switch (geoError.code) {
        case geoError.PERMISSION_DENIED:
          errorMsg = 'Permission de géolocalisation refusée';
          break;
        case geoError.POSITION_UNAVAILABLE:
          errorMsg = 'Position non disponible';
          break;
        case geoError.TIMEOUT:
          errorMsg = 'Timeout de géolocalisation';
          break;
      }
      setError(errorMsg);
      console.warn(errorMsg, geoError);
    };

    watchIdRef.current = navigator.geolocation.watchPosition(onSuccess, onError, options);
  }, []);

  const stopGPS = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsActive(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    position,
    accuracy,
    error,
    isActive,
    startGPS,
    stopGPS,
  };
}
