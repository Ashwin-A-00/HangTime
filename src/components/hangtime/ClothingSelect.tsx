
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CloudRain, Cloud, Sun } from 'lucide-react';
import TShirt from './icons/TShirt';
import Jeans from './icons/Jeans';
import Blanket from './icons/Blanket';

type Props = {
  onSelect: (type: 'light' | 'medium' | 'heavy') => void;
  onNext: () => void;
  selected?: 'light' | 'medium' | 'heavy';
  condition: 'sunny' | 'cloudy' | 'rainy';
};

export default function ClothingSelect({ onSelect, selected, onNext, condition }: Props) {
  const cards = [
    { key: 'light', title: 'Light', Icon: TShirt },
    { key: 'medium', title: 'Medium', Icon: Jeans },
    { key: 'heavy', title: 'Heavy', Icon: Blanket },
  ] as const;

  const getWeatherAlert = () => {
    switch (condition) {
      case 'rainy':
        return {
          icon: <CloudRain className="h-4 w-4" />,
          variant: 'destructive' as const,
          title: 'Not ideal for air-drying',
          description: 'It\'s currently raining or rain is expected soon. Consider indoor drying or wait for better weather conditions.'
        };
      case 'cloudy':
        return {
          icon: <Cloud className="h-4 w-4" />,
          variant: 'default' as const,
          title: 'Cloudy conditions',
          description: 'You can hang clothes outside, but they will take longer to dry due to reduced sunlight and potentially higher humidity.'
        };
      case 'sunny':
        return {
          icon: <Sun className="h-4 w-4" />,
          variant: 'default' as const,
          title: 'Great drying conditions!',
          description: 'Perfect weather for air-drying clothes. Warm temperatures and sunlight will help clothes dry quickly.'
        };
      default:
        return null;
    }
  };

  const weatherAlert = getWeatherAlert();

  return (
    <section className="container py-10 animate-fade-in" aria-labelledby="clothes-title">
      <h2 id="clothes-title" className="font-display text-3xl font-semibold text-center mb-6">Clothing Type</h2>
      
      {/* Weather Alert */}
      {weatherAlert && (
        <div className="max-w-md mx-auto mb-6">
          <Alert variant={weatherAlert.variant}>
            <div className="flex items-center gap-2">
              {weatherAlert.icon}
              <AlertDescription className="font-medium">
                {weatherAlert.title}
              </AlertDescription>
            </div>
            <AlertDescription className="mt-2">
              {weatherAlert.description}
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {cards.map(({ key, title, Icon }) => {
          const active = selected === key;
          return (
            <button key={key} onClick={() => onSelect(key)} aria-pressed={active} className={`rounded-xl border p-4 bg-card card-shadow hover-scale tilt ${active ? 'ring-2 ring-ring' : ''}`}>
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0 flex flex-row items-center gap-4">
                  <div className="w-16 h-16">
                    <Icon />
                  </div>
                  <div className="text-lg font-medium">{title}</div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <Button onClick={onNext} disabled={!selected}>Next</Button>
      </div>
    </section>
  );
}
