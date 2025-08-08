import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, LocateFixed } from 'lucide-react';

export type LocationItem = {
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
};

type Props = {
  onSelect: (loc: LocationItem) => void;
};

export default function LocationSearch({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(false);

  const glow = query.length > 0;

  useEffect(() => {
    if (query.length < 2) { 
      console.log('Query too short, clearing results');
      setResults([]); 
      return; 
    }
    
    console.log('Setting up search for:', query);
    const t = setTimeout(async () => {
      console.log('Executing search for:', query);
      setLoading(true);
      
      try {
        // Using Nominatim API - a reliable free geocoding service
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10&addressdetails=1`);
        const data = await res.json();
        console.log('API response:', data);
        
        if (data && data.length > 0) {
          const items: LocationItem[] = data.map((r: any) => ({
            name: `${r.name || r.display_name.split(',')[0]}${r.address?.state ? ', ' + r.address.state : ''}${r.address?.country ? ', ' + r.address.country : ''}`,
            country: r.address?.country || '',
            latitude: parseFloat(r.lat),
            longitude: parseFloat(r.lon),
          }));
          console.log('Real API results:', items);
          setResults(items);
        } else {
          console.log('No results from API, using fallback');
          // Fallback to filtered mock data
          const mockResults = [
            { name: 'London, England, United Kingdom', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
            { name: 'New York, New York, United States', country: 'United States', latitude: 40.7128, longitude: -74.0060 },
            { name: 'Paris, Île-de-France, France', country: 'France', latitude: 48.8566, longitude: 2.3522 },
            { name: 'Tokyo, Tokyo, Japan', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
            { name: 'Sydney, New South Wales, Australia', country: 'Australia', latitude: -33.8688, longitude: 151.2093 },
            { name: 'Berlin, Berlin, Germany', country: 'Germany', latitude: 52.5200, longitude: 13.4050 },
            { name: 'Rome, Lazio, Italy', country: 'Italy', latitude: 41.9028, longitude: 12.4964 },
            { name: 'Madrid, Madrid, Spain', country: 'Spain', latitude: 40.4168, longitude: -3.7038 },
            { name: 'Los Angeles, California, United States', country: 'United States', latitude: 34.0522, longitude: -118.2437 },
            { name: 'Chicago, Illinois, United States', country: 'United States', latitude: 41.8781, longitude: -87.6298 },
            { name: 'Toronto, Ontario, Canada', country: 'Canada', latitude: 43.6532, longitude: -79.3832 },
            { name: 'Vancouver, British Columbia, Canada', country: 'Canada', latitude: 49.2827, longitude: -123.1207 },
          ].filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
          );
          setResults(mockResults);
        }
      } catch (e) {
        console.error('API call failed:', e);
        // Fallback to filtered mock data
        const mockResults = [
          { name: 'London, England, United Kingdom', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
          { name: 'New York, New York, United States', country: 'United States', latitude: 40.7128, longitude: -74.0060 },
          { name: 'Paris, Île-de-France, France', country: 'France', latitude: 48.8566, longitude: 2.3522 },
          { name: 'Tokyo, Tokyo, Japan', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
          { name: 'Sydney, New South Wales, Australia', country: 'Australia', latitude: -33.8688, longitude: 151.2093 },
          { name: 'Berlin, Berlin, Germany', country: 'Germany', latitude: 52.5200, longitude: 13.4050 },
          { name: 'Rome, Lazio, Italy', country: 'Italy', latitude: 41.9028, longitude: 12.4964 },
          { name: 'Madrid, Madrid, Spain', country: 'Spain', latitude: 40.4168, longitude: -3.7038 },
          { name: 'Los Angeles, California, United States', country: 'United States', latitude: 34.0522, longitude: -118.2437 },
          { name: 'Chicago, Illinois, United States', country: 'United States', latitude: 41.8781, longitude: -87.6298 },
          { name: 'Toronto, Ontario, Canada', country: 'Canada', latitude: 43.6532, longitude: -79.3832 },
          { name: 'Vancouver, British Columbia, Canada', country: 'Canada', latitude: 49.2827, longitude: -123.1207 },
        ].filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(mockResults);
      } finally {
        setLoading(false);
      }
    }, 350);
    
    return () => clearTimeout(t);
  }, [query]);

  const suggestions = useMemo(() => results, [results]);

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/geocoding?latitude=${latitude}&longitude=${longitude}&language=en&format=json`);
        const data = await res.json();
        const name = data?.results?.[0]?.name || 'Your location';
        onSelect({ name, latitude, longitude });
      } catch {
        onSelect({ name: 'Your location', latitude, longitude });
      }
    });
  };

  return (
    <section className="container max-w-xl mx-auto py-12 animate-fade-in" aria-labelledby="location-title">
      <h1 id="location-title" className="font-display text-4xl md:text-5xl font-bold text-center mb-6">HangTime</h1>
      <p className="text-center text-muted-foreground mb-8">When to Hang? We Did the Math, So You Don't Have To.</p>
      
      {/* Enhanced Search Container */}
      <div className="relative max-w-md mx-auto">
        {/* Search Input with Enhanced Styling */}
        <div className="relative group">
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            glow ? 'text-primary scale-110' : 'text-muted-foreground'
          }`}>
            <MapPin className={`h-5 w-5 ${glow ? 'animate-pulse' : ''}`} />
          </div>
          <Input
            placeholder="Where to Hangout?"
            className="pl-12 pr-4 py-4 text-lg border-2 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl group-hover:border-primary/50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for your location"
          />
          {/* Subtle glow effect on focus */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Enhanced Location Button */}
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full py-3 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
            onClick={useMyLocation}
          >
            <LocateFixed className="mr-3 h-4 w-4 group-hover:animate-pulse" />
            <span className="font-medium">Use My Current Location</span>
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            Searching locations...
          </div>
        )}

        {/* Enhanced Results Dropdown */}
        {suggestions.length > 0 && (
          <div className="mt-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50 relative">
            <div className="p-2 bg-gray-100 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-700 px-3 py-1">Search Results ({suggestions.length})</p>
            </div>
            <ul className="max-h-60 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <li key={idx} className="border-b border-gray-200 last:border-b-0">
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-all duration-200 group flex items-center"
                    onClick={() => onSelect(item)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {item.name.split(',')[0]}
                      </div>
                      {item.name.includes(',') && (
                        <div className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-200">
                          {item.name.split(',').slice(1).join(',').trim()}
                        </div>
                      )}
                    </div>
                    <MapPin className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        

      </div>
    </section>
  );
}
