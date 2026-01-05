import { api } from './client';

export interface Visit {
  id: number;
  user_id: number;
  library_id: number;
  visited_at: string;
  notes?: string;
  library?: any;
  created_at: string;
  updated_at: string;
}

export interface VisitStamp {
  library: any;
  visited: boolean;
  visit_count: number;
  last_visit?: string;
}

export interface CheckInResponse {
  success: boolean;
  message: string;
  data: Visit;
  new_badges: any[];
  points_earned: number;
}

export const visitsApi = {
  /**
   * Check-in to library
   */
  checkIn: async (libraryId: number, notes?: string) => {
    return api.post<CheckInResponse>('/visits/check-in', {
      library_id: libraryId,
      notes,
    });
  },

  /**
   * Get visit history
   */
  getHistory: async () => {
    return api.get<Visit[]>('/visits/history');
  },

  /**
   * Get visit stamps (library collection progress)
   */
  getStamps: async () => {
    return api.get<VisitStamp[]>('/visits/stamps');
  },
};
