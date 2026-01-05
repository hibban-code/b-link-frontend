'use client';

import { use } from 'react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AIRecommendations } from '@/components/books/AIRecommendations';
import { useBook } from '@/lib/hooks/useBooks';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const bookId = parseInt(resolvedParams.id);
  const { data, isLoading, error } = useBook(bookId);

  if (isLoading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Memuat detail buku...</p>
        </div>
      </Container>
    );
  }

  // Safe data access with fallback
  const book = data?.data;

  if (error || !book) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold mb-2">Buku Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">
            Buku yang Anda cari tidak ada atau telah dihapus
          </p>
          <Link href="/books">
            <Button>Kembali ke Daftar Buku</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Back Button */}
      <Link href="/books">
        <Button variant="ghost" className="mb-4">
          ← Kembali
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            {/* Book Cover */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-64 flex items-center justify-center mb-6">
              <span className="text-8xl">📖</span>
            </div>

            {/* Book Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">oleh {book.author}</p>

              {book.category && (
                <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {book.category}
                </span>
              )}
            </div>

            {/* Description */}
            {book.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">📝 Deskripsi</h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            {/* Book Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {book.isbn && (
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="font-medium">{book.isbn}</p>
                </div>
              )}
              {book.published_year && (
                <div>
                  <p className="text-sm text-gray-500">Tahun Terbit</p>
                  <p className="font-medium">{book.published_year}</p>
                </div>
              )}
            </div>

            {/* Library Info */}
            {book.library && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">📍 Lokasi</h3>
                <Link href={`/libraries/${book.library.id}`}>
                  <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="font-medium">{book.library.name}</p>
                    {book.library.address && (
                      <p className="text-sm text-gray-600 mt-1">
                        {book.library.address}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar - AI Recommendations */}
        <div>
          <AIRecommendations 
            bookTitle={book.title}
            currentBookId={book.id}
          />
        </div>
      </div>
    </Container>
  );
}
