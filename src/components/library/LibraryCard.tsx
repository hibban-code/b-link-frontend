import Link from 'next/link';
import { Library } from '@/types/library';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface LibraryCardProps {
  library: Library;
}

export function LibraryCard({ library }: LibraryCardProps) {
  return (
    <Link href={`/libraries/${library.id}`}>
      <Card hover className="h-full">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {library.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          📍 {library.address}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {library.facilities?.slice(0, 3).map((facility) => (
            <Badge key={facility} variant="info">
              {facility.replace('_', ' ')}
            </Badge>
          ))}
          {library.facilities && library.facilities.length > 3 && (
            <Badge variant="default">+{library.facilities.length - 3} more</Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mt-4 pt-4 border-t">
          {library.books_count !== undefined && (
            <span>📚 {library.books_count} books</span>
          )}
          {library.events_count !== undefined && (
            <span>📅 {library.events_count} events</span>
          )}
        </div>
      </Card>
    </Link>
  );
}
