import { api } from './client';
import { Library } from '@/types/library';

export interface TransportationInfo {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  parking_info?: string;
  public_transport?: Array<{
    type: string;
    route: string;
    stop: string;
  }>;
}

export const guidebookApi = {
  /**
   * Get complete guidebook
   */
  getAll: async () => {
    return api.get<Library[]>('/guidebook');
  },

  /**
   * Get single library guidebook
   */
  getById: async (id: number) => {
    return api.get<Library>(`/guidebook/${id}`);
  },

  /**
   * Get transportation guide
   */
  getTransportation: async () => {
    return api.get<TransportationInfo[]>('/guidebook/transportation/all');
  },
};
