'use client';

import { BookCard } from './BookCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useViewHistory, useAIRecommendations, useSimpleRecommendations } from '@/lib/hooks/useRecommendations';

export function RecommendationsSection() {
  const { data: viewHistory } = useViewHistory();
  const { data: aiRecommendations, isLoading: aiLoading } = useAIRecommendations(viewHistory);
  const { data: simpleRecs, isLoading: simpleLoading } = useSimpleRecommendations();

  // Use AI recommendations if available, otherwise use simple recommendations
  const recommendations = aiRecommendations && aiRecommendations.length > 0 
    ? aiRecommendations 
    : simpleRecs?.data || [];

  const isLoading = aiLoading || simpleLoading;

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 mt-4">Memuat rekomendasi untuk Anda...</p>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold">🎯 Rekomendasi Untuk Anda</h2>
        {aiRecommendations && aiRecommendations.length > 0 && (
          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
            AI Powered
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {recommendations.slice(0, 10).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        💡 Rekomendasi berdasarkan buku yang pernah Anda lihat
      </p>
    </section>
  );
}
                                                