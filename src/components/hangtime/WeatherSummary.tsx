
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy';

type Props = {
  temp: number;
  humidity: number;
  wind: number;
  rainSoon: boolean;
  onNext: () => void;
};

export default function WeatherSummary({ temp, humidity, wind, rainSoon, onNext }: Props) {
  const items = [
    { title: 'Temperature', value: `${Math.round(temp)}°C` },
    { title: 'Humidity', value: `${Math.round(humidity)}%` },
    { title: 'Wind', value: `${Math.round(wind)} m/s` },
  ];

  return (
    <section className="container py-10 animate-fade-in" aria-labelledby="summary-title">
      <h2 id="summary-title" className="font-display text-3xl font-semibold text-center mb-6">Current Weather</h2>
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {items.map((it, i) => (
          <Card key={it.title} className="tilt">
            <CardHeader>
              <CardTitle>{it.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{it.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {rainSoon && (
        <div className="mt-6 p-4 rounded-lg bg-accent card-shadow text-accent-foreground max-w-md mx-auto">
          Rain expected soon (within 2 hours). Plan accordingly!
        </div>
      )}
      <div className="text-center mt-8">
        <button onClick={onNext} className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover-scale">Next</button>
      </div>
    </section>
  );
}
