import { api } from './client';

export interface CalendarEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  description?: string;
  location: string;
  library_id: number;
  type?: string;
  capacity?: number;
  registered_count?: number;
}

export const calendarApi = {
  /**
   * Get calendar events
   */
  getEvents: async (start?: string, end?: string) => {
    const params = new URLSearchParams();
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    
    return api.get<CalendarEvent[]>(`/events/calendar?${params.toString()}`);
  },
};
