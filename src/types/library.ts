export interface Library {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  facilities: string[];
  opening_hours: OpeningHours;
  website_url?: string;
  description: string;
  created_at: string;
  updated_at: string;
  books_count?: number;
  events_count?: number;
  visits_count?: number;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
}

export interface LibraryFilters {
  search?: string;
  facility?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
