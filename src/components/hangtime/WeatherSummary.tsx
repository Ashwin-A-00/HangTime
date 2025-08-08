
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Cloud, CloudRain } from 'lucide-react';

export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy';

type Props = {
  temp: number;
  humidity: number;
  wind: number;
  rainSoon: boolean;
  condition: WeatherCondition;
  location: string;
  onNext: () => void;
};

export default function WeatherSummary({ temp, humidity, wind, rainSoon, condition, location, onNext }: Props) {
  const items = [
    { title: 'Temperature', value: `${Math.round(temp)}°C` },
    { title: 'Humidity', value: `${Math.round(humidity)}%` },
    { title: 'Wind', value: `${Math.round(wind)} m/s` },
  ];

  const getWeatherIcon = () => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getWeatherText = () => {
    switch (condition) {
      case 'sunny':
        return 'Sunny';
      case 'cloudy':
        return 'Cloudy';
      case 'rainy':
        return 'Rainy';
      default:
        return 'Clear';
    }
  };

  return (
    <section className="container py-10 animate-fade-in" aria-labelledby="summary-title">
      <h2 id="summary-title" className="font-display text-3xl font-semibold text-center mb-4">Current Weather</h2>
      
      {/* Weather Condition Display */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {getWeatherIcon()}
        <span className="text-2xl font-semibold">{getWeatherText()}</span>
      </div>
      
      {/* Location Display */}
      <div className="text-center mb-6">
        <p className="text-lg text-muted-foreground">{location}</p>
      </div>
      
      {/* Weather Data Cards */}
      <div className="flex flex-col gap-3 max-w-sm mx-auto mb-6">
        {items.map((it, i) => (
          <Card key={it.title} className="tilt">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{it.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xl font-semibold">{it.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {rainSoon && (
        <div className="mt-6 p-3 rounded-lg bg-accent card-shadow text-accent-foreground max-w-md mx-auto">
          <p className="text-sm">Rain expected soon (within 2 hours). Plan accordingly!</p>
        </div>
      )}
      <div className="text-center mt-4">
        <button onClick={onNext} className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover-scale">Next</button>
      </div>
    </section>
  );
}
