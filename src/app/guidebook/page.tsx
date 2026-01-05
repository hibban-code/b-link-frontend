'use client';

import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useGuidebook } from '@/lib/hooks/useGuidebook';
import Link from 'next/link';

export default function GuidebookPage() {
  const { data, isLoading, error } = useGuidebook();

  if (isLoading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Memuat guidebook...</p>
        </div>
      </Container>
    );
  }

  if (error || !data?.data) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold mb-2">Gagal Memuat Guidebook</h2>
          <Button onClick={() => window.location.reload()}>Muat Ulang</Button>
        </div>
      </Container>
    );
  }

  const libraries = data.data;

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">📚 Guidebook Perpustakaan</h1>
        <p className="text-gray-600 mb-6">
          Panduan lengkap keliling perpustakaan di Bandung
        </p>

        {/* Quick Links */}
        <div className="flex gap-3">
          <Link href="/map">
            <Button variant="outline">🗺️ Lihat Peta</Button>
          </Link>
          <Link href="/calendar">
            <Button variant="outline">📅 Kalender Event</Button>
          </Link>
        </div>
      </div>

      {/* Libraries Grid */}
      <div className="space-y-8">
        {libraries.map((library, index) => (
          <Card key={library.id} className="overflow-hidden">
            <div className="md:flex gap-6">
              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 mt-4 md:mt-0">
                <h2 className="text-2xl font-bold mb-2">{library.name}</h2>
                <p className="text-gray-600 mb-4">{library.description}</p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Address */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">📍 Alamat</p>
                    <p className="text-sm">{library.address}</p>
                  </div>

                  {/* Phone */}
                  {library.phone && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">📞 Telepon</p>
                      <p className="text-sm">{library.phone}</p>
                    </div>
                  )}

                  {/* Hours */}
                  {library.opening_hours && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">🕒 Jam Buka</p>
                      <p className="text-sm">{library.opening_hours}</p>
                    </div>
                  )}

                  {/* Books Count */}
                  {library.books_count !== undefined && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">📖 Koleksi</p>
                      <p className="text-sm">{library.books_count} buku</p>
                    </div>
                  )}
                </div>

                {/* Facilities */}
                {library.facilities && library.facilities.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">🏢 Fasilitas</p>
                    <div className="flex flex-wrap gap-2">
                      {library.facilities.map((facility, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transportation */}
                {library.public_transport && library.public_transport.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">🚌 Transportasi</p>
                    <div className="space-y-1">
                      {library.public_transport.map((transport, idx) => (
                        <p key={idx} className="text-sm">
                          • {transport.type}: {transport.route} - {transport.stop}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Link href={`/libraries/${library.id}`}>
                    <Button>Lihat Detail</Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps?q=${library.latitude},${library.longitude}`,
                        '_blank'
                      )
                    }
                  >
                    📍 Buka Maps
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
