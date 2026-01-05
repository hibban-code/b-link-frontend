// types/book.ts
export interface BookFilters {
  library?: string;
  category?: string;
  generalCategory?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  library_id: number;
  general_category: string;
  created_at?: string;
  updated_at?: string;
}

export interface Library {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface GeneralCategory {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}
