import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { RecommendationsSection } from '@/components/book/RecommendationsSection';
import { useAuth } from '@/lib/hooks/useAuth';

export default function HomePage() {
  return (
    <Container>
      <div className="text-center py-20">
        {/* Hero Section */}
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          📚 Bandung Library Integrated Network
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Jelajahi perpustakaan di Bandung, temukan buku favorit!
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <Link href="/libraries">
            <Button size="lg">
              Jelajahi Perpustakaan
            </Button>
          </Link>
          <Link href="/map">
            <Button size="lg" variant="outline">
              🗺️ Lihat Peta
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link href="/libraries" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-semibold mb-2">Perpustakaan</h3>
            <p className="text-gray-600 text-sm">
              Temukan perpustakaan terbaik di Bandung
            </p>
          </Link>

          <Link href="/books" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-lg font-semibold mb-2">Koleksi Buku</h3>
            <p className="text-gray-600 text-sm">
              Ribuan buku untuk Anda baca
            </p>
          </Link>

          <Link href="/map" className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-lg font-semibold mb-2">Peta Interaktif</h3>
            <p className="text-gray-600 text-sm">
              Navigasi mudah ke perpustakaan
            </p>
          </Link>
        </div>
        {/* Recommendations Section */}
      <Container className="py-12">
        <RecommendationsSection />
      </Container>
      </div>
    </Container>
  );
}
