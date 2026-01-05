'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { CalendarEvent } from '@/lib/api/calendar';
import { useCalendarEvents } from '@/lib/hooks/useCalendar';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useState } from 'react';

// Import CSS directly in component
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

interface EventCalendarClientProps {
  onEventClick?: (event: CalendarEvent) => void;
}

export default function EventCalendarClient({ onEventClick }: EventCalendarClientProps) {
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
      <style jsx global>{`
        /* Custom Calendar Styles */
        .rbc-calendar {
          font-family: inherit;
        }

        .rbc-header {
          padding: 10px 3px;
          font-weight: 600;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .rbc-today {
          background-color: #eff6ff;
        }

        .rbc-event {
          padding: 2px 5px;
          background-color: #3b82f6;
          border-radius: 4px;
          font-size: 13px;
        }

        .rbc-event:hover {
          background-color: #2563eb;
        }

        .rbc-selected {
          background-color: #1e40af !important;
        }

        .rbc-toolbar button {
          padding: 8px 16px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background-color: white;
          color: #374151;
          font-weight: 500;
          transition: all 0.2s;
        }

        .rbc-toolbar button:hover {
          background-color: #f3f4f6;
        }

        .rbc-toolbar button.rbc-active {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .rbc-month-view {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }
      `}</style>

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
