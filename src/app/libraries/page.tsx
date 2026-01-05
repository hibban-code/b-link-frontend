'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLibraries } from '@/lib/hooks/useLibraries';
import Link from 'next/link';

export default function LibrariesPage() {
  const { data, isLoading, error } = useLibraries();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Memuat perpustakaan...</p>
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
            Terjadi kesalahan saat memuat perpustakaan
          </p>
          <Button onClick={() => window.location.reload()}>
            Muat Ulang
          </Button>
        </div>
      </Container>
    );
  }

  const libraries = data?.data || [];

  const filteredLibraries = libraries.filter((library: any) =>
    library.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    library.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">📚 Perpustakaan</h1>
        <p className="text-gray-600">
          Ditemukan {libraries.length} perpustakaan di Bandung
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari perpustakaan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Libraries Grid */}
      {filteredLibraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLibraries.map((library: any) => (
            <Card key={library.id} className="hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{library.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {library.description || 'Tidak ada deskripsi'}
                </p>
              </div>

              {library.address && (
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-gray-400">📍</span>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {library.address}
                  </p>
                </div>
              )}

              {library.phone && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-400">📞</span>
                  <p className="text-sm text-gray-600">{library.phone}</p>
                </div>
              )}

              {library.opening_hours && (
                <div className="flex items-start gap-2 mb-4">
                  <span className="text-gray-400">🕒</span>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {library.opening_hours}
                  </p>
                </div>
              )}

              {library.facilities && library.facilities.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {library.facilities.slice(0, 4).map((facility: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                      >
                        {facility}
                      </span>
                    ))}
                    {library.facilities.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{library.facilities.length - 4} lainnya
                      </span>
                    )}
                  </div>
                </div>
              )}

              {library.books_count !== undefined && (
                <div className="mb-4 text-sm text-gray-600">
                  📖 {library.books_count} koleksi buku
                </div>
              )}

              <Link href={`/libraries/${library.id}`}>
                <Button className="w-full">Lihat Detail</Button>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600">
            {searchQuery
              ? 'Tidak ada perpustakaan yang cocok dengan pencarian'
              : 'Belum ada perpustakaan terdaftar'}
          </p>
        </div>
      )}
    </Container>
  );
}
