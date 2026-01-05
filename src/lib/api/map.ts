import { api } from './client';
import { Library } from '@/types/library';

export const mapApi = {
  /**
   * Get all libraries for map
   */
  getLibraries: async () => {
    return api.get<Library[]>('/map/libraries');
  },

  /**
   * Get nearby libraries
   */
  getNearby: async (lat: number, lng: number, radius: number = 5) => {
    return api.get<Library[]>(`/map/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  },
};
