'use client';

import { CalendarEvent } from '@/lib/api/calendar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface EventDetailModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Date & Time */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Tanggal & Waktu</p>
            <p className="text-gray-900">
              {new Date(event.start).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="text-sm text-gray-600">
              {new Date(event.start).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          {/* Location */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Lokasi</p>
            <p className="text-gray-900">{event.location}</p>
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Deskripsi</p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          )}

          {/* Type */}
          {event.type && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Tipe Event</p>
              <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                {event.type}
              </span>
            </div>
          )}

          {/* Capacity */}
          {event.capacity && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Kapasitas</p>
              <p className="text-gray-900">
                {event.registered_count || 0} / {event.capacity} peserta
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-primary-500 h-2 rounded-full"
                  style={{
                    width: `${((event.registered_count || 0) / event.capacity) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex gap-3">
          <Link href={`/events/${event.id}`} className="flex-1">
            <Button className="w-full">Lihat Detail Event</Button>
          </Link>
          <Button variant="ghost" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
