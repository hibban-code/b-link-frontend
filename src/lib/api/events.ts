import { api } from './client';
import { Event, EventFilters } from '@/types/event';

export const eventsApi = {
  getAll: async (filters?: EventFilters, page: number = 1) => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...filters,
    });
    return api.get<Event[]>(`/events?${params}`);
  },

  getUpcoming: async (page: number = 1) => {
    return api.get<Event[]>(`/events/upcoming?page=${page}`);
  },

  getById: async (id: number) => {
    return api.get<Event>(`/events/${id}`);
  },
};
