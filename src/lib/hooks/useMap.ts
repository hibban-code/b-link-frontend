'use client';

import { useQuery } from '@tanstack/react-query';
import { mapApi } from '@/lib/api/map';

export function useMapLibraries() {
  return useQuery({
    queryKey: ['map-libraries'],
    queryFn: () => mapApi.getLibraries(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useNearbyLibraries(lat: number, lng: number, radius: number = 5) {
  return useQuery({
    queryKey: ['nearby-libraries', lat, lng, radius],
    queryFn: () => mapApi.getNearby(lat, lng, radius),
    enabled: !!lat && !!lng,
    staleTime: 5 * 60 * 1000,
  });
}
