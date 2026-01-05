'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useCheckIn } from '@/lib/hooks/useVisits';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface CheckInButtonProps {
  libraryId: number;
  libraryName: string;
}

export function CheckInButton({ libraryId, libraryName }: CheckInButtonProps) {
  const [notes, setNotes] = useState('');
  const [showNotesInput, setShowNotesInput] = useState(false);
  const checkIn = useCheckIn();

  const handleCheckIn = () => {
    checkIn.mutate({ libraryId, notes: notes || undefined });
    setShowNotesInput(false);
    setNotes('');
  };

  return (
    <div className="space-y-3">
      {!showNotesInput ? (
        <div className="flex gap-2">
          <Button
            onClick={handleCheckIn}
            disabled={checkIn.isPending}
            className="flex-1"
          >
            {checkIn.isPending ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Check-in...
              </>
            ) : (
              <>✅ Check-in Sekarang</>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowNotesInput(true)}
          >
            📝
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <textarea
            placeholder="Tambahkan catatan (opsional)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex gap-2">
            <Button onClick={handleCheckIn} disabled={checkIn.isPending} className="flex-1">
              {checkIn.isPending ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Check-in...
                </>
              ) : (
                'Check-in dengan Catatan'
              )}
            </Button>
            <Button variant="ghost" onClick={() => setShowNotesInput(false)}>
              Batal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
