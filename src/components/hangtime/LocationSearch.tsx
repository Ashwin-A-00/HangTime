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
    if (query.length < 2) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
        const data = await res.json();
        const items: LocationItem[] = (data?.results || []).map((r: any) => ({
          name: `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}${r.country ? ', ' + r.country : ''}`,
          country: r.country,
          latitude: r.latitude,
          longitude: r.longitude,
        }));
        setResults(items);
      } catch (e) {
        console.error('Geocoding error', e);
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
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&format=json`);
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
      <p className="text-center text-muted-foreground mb-8">Enter your location to get real‑time drying advice.</p>
      <div className="relative">
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${glow ? 'animate-[pulse_1.5s_ease-in-out_infinite]' : ''}`}>
          <MapPin className={`${glow ? 'text-ring' : ''}`} />
        </div>
        <Input
          placeholder="Enter your location"
          className="pl-10 py-6 text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Enter your location"
        />
        <Button variant="secondary" className="mt-4 w-full" onClick={useMyLocation}>
          <LocateFixed className="mr-2 h-4 w-4" /> Use my location
        </Button>
        {loading && <div className="mt-2 text-sm text-muted-foreground">Searching…</div>}
        {suggestions.length > 0 && (
          <ul className="mt-4 bg-card border rounded-lg overflow-hidden card-shadow">
            {suggestions.map((item, idx) => (
              <li key={idx}>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-accent hover-scale"
                  onClick={() => onSelect(item)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
