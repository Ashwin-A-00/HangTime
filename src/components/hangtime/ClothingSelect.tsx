
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TShirt from './icons/TShirt';
import Jeans from './icons/Jeans';
import Blanket from './icons/Blanket';

type Props = {
  onSelect: (type: 'light' | 'medium' | 'heavy') => void;
  onNext: () => void;
  selected?: 'light' | 'medium' | 'heavy';
};

export default function ClothingSelect({ onSelect, selected, onNext }: Props) {
  const cards = [
    { key: 'light', title: 'Light', Icon: TShirt },
    { key: 'medium', title: 'Medium', Icon: Jeans },
    { key: 'heavy', title: 'Heavy', Icon: Blanket },
  ] as const;

  return (
    <section className="container py-10 animate-fade-in" aria-labelledby="clothes-title">
      <h2 id="clothes-title" className="font-display text-3xl font-semibold text-center mb-6">Clothing Type</h2>
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
