import Link from 'next/link';
import { Event } from '@/types/event';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/formatters';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-3">
          <Badge variant={event.is_upcoming ? 'success' : 'default'}>
            {event.is_upcoming ? 'Upcoming' : 'Past'}
          </Badge>
          <span className="text-sm text-gray-500">
            {formatDate(event.event_date)}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>

        {event.library && (
          <p className="text-sm text-gray-500 mt-4 pt-4 border-t">
            📍 {event.library.name}
          </p>
        )}
      </Card>
    </Link>
  );
}
