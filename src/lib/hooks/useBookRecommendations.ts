'use client';

import { useState, useEffect } from 'react';
import { Client } from '@gradio/client';

interface Book {
  id?: number;
  title: string;
  author?: string;
  category?: string;
  general_category?: string;
  description?: string;
  library?: string | any;
}

interface RecommendationResult {
  recommendations: Book[];
  isLoading: boolean;
  error: string | null;
}

export function useBookRecommendations(
  bookTitle: string,
  currentBookId: number
): RecommendationResult {
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookTitle) {
      setRecommendations([]);
      setIsLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('🤖 Fetching AI recommendations for:', bookTitle);

        // Connect to Gradio Space
        const client = await Client.connect('ZakyAlf/Compros');

        // Get recommendations
        const result = await client.predict('/lambda_1', {
          title: bookTitle,
          k: 10,
        });

        console.log('📦 Full Response:', result);
        console.log('📊 Response.data:', result.data);

        // Parse response - handle multiple formats
        let aiBooks: Book[] = [];

        if (Array.isArray(result.data)) {
          // Check if nested array [[...]] or direct [...]
          const data = result.data.length > 0 && Array.isArray(result.data[0]) 
            ? result.data[0] 
            : result.data;

          console.log('📚 Parsing data:', data);

          aiBooks = data
            .filter((item: any) => item && typeof item === 'object' && item.title)
            .map((item: any) => ({
              title: item.title,
              author: item.author || '',
              category: item.general_category || item.category || '',
              library: typeof item.library === 'string' 
                ? { name: item.library } 
                : item.library,
            }));
        }

        console.log('✅ Parsed books:', aiBooks.length);

        if (aiBooks.length === 0) {
          setError('No recommendations found for this book');
        } else {
          setRecommendations(aiBooks.slice(0, 5));
        }

      } catch (err: any) {
        console.error('💥 AI Error:', err);
        setError('Failed to load AI recommendations');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchRecommendations();
    }, 300);

    return () => clearTimeout(timer);
  }, [bookTitle, currentBookId]);

  return { recommendations, isLoading, error };
}
