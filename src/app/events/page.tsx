'use client';

import { Container } from '@/components/layout/Container';
import { EventCard } from '@/components/event/EventCard';
import { useUpcomingEvents } from '@/lib/hooks/useEvents';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function EventsPage() {
  const { data, isLoading } = useUpcomingEvents();

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
        <p className="text-gray-600">
          Jangan lewatkan acara menarik di perpustakaan
        </p>
      </div>

      {isLoading && <LoadingSpinner size="lg" />}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </Container>
  );
}
