import { Library } from './library';

export interface Event {
  id: number;
  title: string;
  description: string;
  event_date: string;
  library_id: number;
  is_upcoming: boolean;
  created_at: string;
  updated_at: string;
  library?: Library;
}

export interface EventFilters {
  library_id?: number;
  from?: string;
  to?: string;
  upcoming?: boolean;
}
