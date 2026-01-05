'use client';

import { useBookRecommendations } from '@/lib/hooks/useBookRecommendations';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface AIRecommendationsProps {
  bookTitle: string;
  currentBookId: number;
}

export function AIRecommendations({ 
  bookTitle,
  currentBookId,
}: AIRecommendationsProps) {
  const { recommendations, isLoading, error } = useBookRecommendations(
    bookTitle,
    currentBookId
  );

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🤖</span>
        <h3 className="text-lg font-semibold">Rekomendasi AI</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Powered by AI - Buku serupa dari Bandung Library Hub:
      </p>

      {isLoading && (
        <div className="py-8 text-center">
          <LoadingSpinner size="md" />
          <p className="text-sm text-gray-500 mt-2">AI sedang menganalisis...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="py-6 px-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-sm text-yellow-800">⚠️ {error}</p>
          <p className="text-xs text-gray-600 mt-1">
            Buku ini mungkin belum ada dalam dataset AI
          </p>
        </div>
      )}

      {!isLoading && !error && recommendations.length > 0 && (
        <div className="space-y-3">
          {recommendations.map((book, index) => (
            <div 
              key={index}
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold text-blue-600 mt-1 flex-shrink-0">
                  #{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h4>
                  {book.author && (
                    <p className="text-xs text-gray-600 mt-1">{book.author}</p>
                  )}

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {book.category && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {book.category}
                      </span>
                    )}
                    {book.library && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        📍 {typeof book.library === 'string' ? book.library : book.library?.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && recommendations.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-4xl mb-2">🤔</p>
          <p className="text-sm text-gray-500">
            Belum ada rekomendasi tersedia
          </p>
        </div>
      )}
    </Card>
  );
}
