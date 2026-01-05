import { api } from './client';
import { Library, LibraryFilters } from '@/types/library';

export const librariesApi = {
  getAll: async (filters?: LibraryFilters, page: number = 1) => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...filters,
    });
    return api.get<Library[]>(`/libraries?${params}`);
  },

  getById: async (id: number) => {
    return api.get<Library>(`/libraries/${id}`);
  },
};
