
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Info, Lightbulb } from 'lucide-react';
import CircularTimer from './CircularTimer';

type Props = {
  estimateHours: number;
  message: string;
  onNext: () => void;
};

export default function DryingEstimate({ estimateHours, message, onNext }: Props) {
  const hours = Math.floor(estimateHours);
  const mins = Math.round((estimateHours - hours) * 60);
  
  return (
    <section className="container py-12 animate-fade-in" aria-labelledby="estimate-title">
      <h2 id="estimate-title" className="font-display text-3xl font-semibold text-center mb-8">Drying Dashboard</h2>
      
      <div className="max-w-lg mx-auto">
        {/* Circular Timer */}
        <div className="mb-8">
          <CircularTimer hours={hours} minutes={mins} totalHours={estimateHours} />
        </div>
        
        {/* Dashboard Cards */}
        <div className="space-y-4">
          <Card className="tilt">
            <CardHeader className="flex flex-row items-center gap-2">
              <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
              <CardTitle>Estimated Drying Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold text-primary">
                {hours}h {mins}m
              </div>
            </CardContent>
          </Card>

          <Card className="tilt">
            <CardHeader className="flex flex-row items-center gap-2">
              <Info className="h-5 w-5 text-primary" aria-hidden="true" />
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{message}</p>
            </CardContent>
          </Card>

          <Card className="tilt">
            <CardHeader className="flex flex-row items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check clothes periodically</li>
                <li>• Bring in before rain</li>
                <li>• Flip heavier items halfway through</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button onClick={onNext} variant="default" className="hover-scale">
          See activity ideas
        </Button>
      </div>
    </section>
  );
}
