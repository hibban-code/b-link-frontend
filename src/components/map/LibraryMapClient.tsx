'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLibraries } from '@/lib/hooks/useLibraries';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LibraryMapClient() {
  const { data, isLoading, error } = useLibraries();

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 mt-4">Loading libraries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <p className="text-xl font-bold mb-2">Failed to load map</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  const libraries = data?.data || [];
  
  // Calculate center (Bandung default)
  const bandungCenter: [number, number] = [-6.9175, 107.6191];

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={bandungCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {libraries.map((library: any) => {
          if (!library.latitude || !library.longitude) return null;

          return (
            <Marker 
              key={library.id} 
              position={[library.latitude, library.longitude]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-1">{library.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {library.address || 'No address'}
                  </p>
                  {library.books_count !== undefined && (
                    <p className="text-xs text-gray-500 mb-2">
                      📚 {library.books_count} books
                    </p>
                  )}
                  <Link href={`/libraries/${library.id}`}>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default LibraryMapClient;
