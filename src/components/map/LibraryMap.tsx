'use client';

import dynamic from 'next/dynamic';

const LibraryMapClient = dynamic(
  () => import('./LibraryMapClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export function LibraryMap() {
  return <LibraryMapClient />;
}
