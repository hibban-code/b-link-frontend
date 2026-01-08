'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useBooks } from '@/lib/hooks/useBooks';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  category?: string;
  description?: string;
  library?: {
    id: number;
    name: string;
  };
}

export default function BooksPage() {
  const { data, isLoading, error } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Memuat buku...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold mb-2">Gagal Memuat Data</h2>
          <p className="text-gray-600 mb-4">
            Terjadi kesalahan saat memuat buku
          </p>
          <Button onClick={() => window.location.reload()}>
            Muat Ulang
          </Button>
        </div>
      </Container>
    );
  }

  // Handle all possible response structures
  let books: Book[] = [];
  
  if (data) {
    // Case 1: data is directly an array
    if (Array.isArray(data)) {
      books = data;
    }
    // Case 2: data has a 'data' property that's an array
    else if (typeof data === 'object' && 'data' in data) {
      const innerData = (data as any).data;
      
      // Case 2a: data.data is an array
      if (Array.isArray(innerData)) {
        books = innerData;
      }
      // Case 2b: data.data has nested data property
      else if (typeof innerData === 'object' && innerData !== null && 'data' in innerData) {
        books = Array.isArray(innerData.data) ? innerData.data : [];
      }
    }
  }

  // Filter books
  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">📖 Koleksi Buku</h1>
        <p className="text-gray-600">
          Ditemukan {books.length} buku
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari buku berdasarkan judul, penulis, atau kategori..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  oleh {book.author}
                </p>
                {book.category && (
                  <span className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                    {book.category}
                  </span>
                )}
              </div>

              {book.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {book.description}
                </p>
              )}

              {book.library && (
                <p className="text-xs text-gray-500 mb-4">
                  📍 {book.library.name}
                </p>
              )}

              <Link href={`/books/${book.id}`}>
                <Button className="w-full" size="sm">
                  Lihat Detail
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600">
            {searchQuery
              ? 'Tidak ada buku yang cocok dengan pencarian'
              : 'Belum ada buku terdaftar'}
          </p>
        </div>
      )}
    </Container>
  );
}
