'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { Book } from '@/types/book';
import { booksApi } from '@/lib/api/books';
import { getMultipleRecommendations } from '@/lib/api/recommendations';

interface ViewHistoryItem {
  id: number;
  book: Book;
  created_at: string;
}

/**
 * Get view history
 */
export function useViewHistory() {
  return useQuery({
    queryKey: ['book-history'],
    queryFn: async () => {
      const response = await api.get<ViewHistoryItem[]>('/books/history/views');
      return response.data;
    },
    enabled: typeof window !== 'undefined',
  });
}

/**
 * Get simple recommendations (from backend)
 */
export function useSimpleRecommendations(limit: number = 5) {
  return useQuery({
    queryKey: ['book-recommendations'],
    queryFn: async () => {
      const response = await api.get<Book[]>('/books/recommendations/for-you');
      return response;
    },
  });
}

/**
 * Get AI recommendations (from Hugging Face)
 */
export function useAIRecommendations(viewHistory?: ViewHistoryItem[]) {
  return useQuery({
    queryKey: ['ai-recommendations', viewHistory?.length],
    queryFn: async () => {
      if (!viewHistory || viewHistory.length === 0) {
        return [];
      }

      // Get titles from view history
      const recentTitles = viewHistory
        .slice(0, 5)
        .map((item) => item.book.title);

      // Get recommendations from HF
      const recommendedTitles = await getMultipleRecommendations(recentTitles, 10);

      // Find books by titles
      const books = await Promise.all(
        recommendedTitles.map(async (title) => {
          try {
            const response = await booksApi.getAll({ search: title });
            return response.data[0];
          } catch {
            return null;
          }
        })
      );

      return books.filter((book): book is Book => book !== null);
    },
    enabled: !!viewHistory && viewHistory.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
