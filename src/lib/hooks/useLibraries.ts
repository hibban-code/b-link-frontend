'use client';

import { useQuery } from '@tanstack/react-query';
import { librariesApi } from '@/lib/api/libraries';
import { LibraryFilters } from '@/types/library';

export function useLibraries(filters?: LibraryFilters, page: number = 1) {
  return useQuery({
    queryKey: ['libraries', filters, page],
    queryFn: () => librariesApi.getAll(filters, page),
  });
}

export function useLibrary(id: number) {
  return useQuery({
    queryKey: ['library', id],
    queryFn: () => librariesApi.getById(id),
    enabled: !!id,
  });
}
