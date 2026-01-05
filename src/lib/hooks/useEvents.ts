'use client';

import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '@/lib/api/events';
import { EventFilters } from '@/types/event';

export function useEvents(filters?: EventFilters, page: number = 1) {
  return useQuery({
    queryKey: ['events', filters, page],
    queryFn: () => eventsApi.getAll(filters, page),
  });
}

export function useUpcomingEvents(page: number = 1) {
  return useQuery({
    queryKey: ['events', 'upcoming', page],
    queryFn: () => eventsApi.getUpcoming(page),
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => eventsApi.getById(id),
    enabled: !!id,
  });
}
