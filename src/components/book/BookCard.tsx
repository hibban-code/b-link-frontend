import Link from 'next/link';
import { Book } from '@/types/book';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`}>
      <Card hover className="h-full flex flex-col">
        {/* Book Cover Placeholder */}
        <div className="bg-gradient-to-br from-primary-100 to-primary-200 h-48 rounded-t-lg flex items-center justify-center mb-4 -mt-6 -mx-6">
          <span className="text-6xl">📖</span>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <Badge variant="info" className="text-xs">
            {book.category}
          </Badge>
        </div>

        {/* Book Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600 mb-3">
          ✍️ {book.author}
        </p>

        {/* Library */}
        {book.library && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              📍 {book.library.name}
            </p>
          </div>
        )}
      </Card>
    </Link>
  );
}
