import { api } from './client';

export interface Book {
  id: number;
  title: string;
  author: string;
  category?: string;
  description?: string;
  isbn?: string;
  published_year?: number;
  library_id: number;
  library?: any;
  created_at?: string;
  updated_at?: string;
}

export const booksApi = {
  /**
   * Get all books
   */
  getAll: async () => {
    return api.get<{ success: boolean; data: Book[] }>('/books');
  },

  /**
   * Get book by ID
   */
  getById: async (id: number) => {
    return api.get<{ success: boolean; data: Book }>(`/books/${id}`);
  },

  /**
   * Search books by title
   */
  search: async (title: string) => {
    return api.get<{ success: boolean; data: Book[] }>(`/books/search?title=${encodeURIComponent(title)}`);
  },
};
