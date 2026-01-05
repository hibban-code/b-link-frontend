'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { EventCalendar } from '@/components/calendar/EventCalendar';
import { EventDetailModal } from '@/components/calendar/EventDetailModal';
import { CalendarEvent } from '@/lib/api/calendar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <Container>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">📅 Kalender Event</h1>
        <p className="text-gray-600 mb-6">
          Jadwal kegiatan perpustakaan di Bandung
        </p>

        <div className="flex gap-3">
          <Link href="/events">
            <Button variant="outline">📋 List View</Button>
          </Link>
          <Link href="/libraries">
            <Button variant="outline">📚 Perpustakaan</Button>
          </Link>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <EventCalendar onEventClick={handleEventClick} />
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}
