import { LibraryMap } from '@/components/map/LibraryMap';

export const metadata = {
  title: 'Map - Bandung Library Hub',
  description: 'Interactive map of libraries in Bandung',
};

export default function MapPage() {
  return <LibraryMap />;
}
