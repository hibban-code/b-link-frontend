'use client';

import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@/lib/api/books';
import { BookFilters } from '@/types/book';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: () => booksApi.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBook(id: number) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => booksApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBookCategories() {
  return useQuery({
    queryKey: ['book-categories'],
    queryFn: () => booksApi.getCategories(),
  });
}
