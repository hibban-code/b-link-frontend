'use client';

import { useQuery } from '@tanstack/react-query';
import { calendarApi } from '@/lib/api/calendar';

export function useCalendarEvents(start?: string, end?: string) {
  return useQuery({
    queryKey: ['calendar-events', start, end],
    queryFn: () => calendarApi.getEvents(start, end),
    staleTime: 5 * 60 * 1000,
  });
}
