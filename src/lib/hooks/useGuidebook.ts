'use client';

import { useQuery } from '@tanstack/react-query';
import { guidebookApi } from '@/lib/api/guidebook';

export function useGuidebook() {
  return useQuery({
    queryKey: ['guidebook'],
    queryFn: () => guidebookApi.getAll(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useGuidebookDetail(id: number) {
  return useQuery({
    queryKey: ['guidebook', id],
    queryFn: () => guidebookApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}

export function useTransportationGuide() {
  return useQuery({
    queryKey: ['transportation-guide'],
    queryFn: () => guidebookApi.getTransportation(),
    staleTime: 10 * 60 * 1000,
  });
}
