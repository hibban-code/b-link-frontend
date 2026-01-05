'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { CalendarEvent } from '@/lib/api/calendar';
import { useCalendarEvents } from '@/lib/hooks/useCalendar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'id': idLocale,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: idLocale }),
  getDay,
  locales,
});

interface EventCalendarProps {
  onEventClick?: (event: CalendarEvent) => void;
}

export function EventCalendar({ onEventClick }: EventCalendarProps) {
  const { data, isLoading } = useCalendarEvents();
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const events = (data?.data || []).map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={(newView) => setView(newView as any)}
        culture="id"
        messages={{
          next: 'Berikutnya',
          previous: 'Sebelumnya',
          today: 'Hari Ini',
          month: 'Bulan',
          week: 'Minggu',
          day: 'Hari',
          agenda: 'Agenda',
          date: 'Tanggal',
          time: 'Waktu',
          event: 'Event',
          noEventsInRange: 'Tidak ada event dalam periode ini',
        }}
        onSelectEvent={(event) => onEventClick?.(event as CalendarEvent)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: '#3b82f6',
            borderRadius: '4px',
            opacity: 0.9,
            color: 'white',
            border: 'none',
            display: 'block',
          },
        })}
      />
    </div>
  );
}
