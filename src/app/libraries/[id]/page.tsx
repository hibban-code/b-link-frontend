'use client';

import { use } from 'react';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MiniMap } from '@/components/map/MiniMap';
import { useLibrary } from '@/lib/hooks/useLibraries';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LibraryDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const libraryId = parseInt(resolvedParams.id);
  const { data, isLoading, error } = useLibrary(libraryId);

  if (isLoading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Memuat detail perpustakaan...</p>
        </div>
      </Container>
    );
  }

  if (error || !data?.data) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold mb-2">Perpustakaan Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">
            Perpustakaan yang Anda cari tidak ada atau telah dihapus
          </p>
          <Link href="/libraries">
            <Button>Kembali ke Daftar Perpustakaan</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const library = data.data;

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <Link href="/libraries">
          <Button variant="ghost" className="mb-4">
            ← Kembali
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">{library.name}</h1>
        <p className="text-gray-600">{library.description || 'Tidak ada deskripsi'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">📍 Informasi Dasar</h2>
            
            <div className="space-y-3">
              {/* Address */}
              {library.address && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Alamat</p>
                  <p className="text-gray-900">{library.address}</p>
                </div>
              )}

              {/* Phone */}
              {library.phone && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Telepon</p>
                  <a
                    href={`tel:${library.phone}`}
                    className="text-primary-600 hover:underline"
                  >
                    {library.phone}
                  </a>
                </div>
              )}

              {/* Email */}
              {library.email && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a
                    href={`mailto:${library.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {library.email}
                  </a>
                </div>
              )}

              {/* Website */}
              {library.website_url && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Website</p>
                  <a
                    href={library.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    {library.website_url}
                  </a>
                </div>
              )}

              {/* Opening Hours */}
              {library.opening_hours && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jam Operasional</p>
                  <p className="text-gray-900">{library.opening_hours}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Facilities */}
          {library.facilities && library.facilities.length > 0 && (
            <Card>
              <h2 className="text-xl font-semibold mb-4">🏢 Fasilitas</h2>
              <div className="flex flex-wrap gap-2">
                {library.facilities.map((facility: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Books */}
          {library.books && library.books.length > 0 && (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">📚 Koleksi Buku</h2>
                <Link href={`/books?library=${library.id}`}>
                  <Button variant="ghost" size="sm">
                    Lihat Semua →
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {library.books.slice(0, 5).map((book: any) => (
                  <Link key={book.id} href={`/books/${book.id}`}>
                    <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100">
                      <h4 className="font-medium mb-1">{book.title}</h4>
                      <p className="text-sm text-gray-600">{book.author}</p>
                      {book.category && (
                        <span className="inline-block mt-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {book.category}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <h3 className="font-semibold mb-4">📊 Statistik</h3>
            <div className="space-y-3">
              {library.books_count !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Koleksi Buku</span>
                  <span className="font-semibold">{library.books_count}</span>
                </div>
              )}
              {library.events_count !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Event</span>
                  <span className="font-semibold">{library.events_count}</span>
                </div>
              )}
              {library.visits_count !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Kunjungan</span>
                  <span className="font-semibold">{library.visits_count}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Map Card */}
          {library.latitude && library.longitude ? (
            <Card>
              <h3 className="font-semibold mb-3">🗺️ Lokasi</h3>
              <p className="text-xs text-gray-500 mb-3">
                Koordinat: {library.latitude}, {library.longitude}
              </p>
              <MiniMap
                latitude={library.latitude}
                longitude={library.longitude}
                name={library.name}
                height="250px"
              />
              <Button
                className="w-full mt-3"
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${library.latitude},${library.longitude}`,
                    '_blank'
                  )
                }
              >
                Buka di Google Maps
              </Button>
            </Card>
          ) : (
            <Card>
              <h3 className="font-semibold mb-3">🗺️ Lokasi</h3>
              <p className="text-sm text-gray-500">Koordinat belum tersedia</p>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}
