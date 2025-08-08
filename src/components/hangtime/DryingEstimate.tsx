
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
      
      {/* Bento Grid Layout */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          
          {/* Main Timer - Spans 2 columns on desktop */}
          <div className="md:col-span-2 md:row-span-2">
            <Card className="h-full flex flex-col items-center justify-center p-8 tilt">
              <div className="text-center">
                <CircularTimer hours={hours} minutes={mins} totalHours={estimateHours} />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">Estimated Drying Time</h3>
                  <div className="text-4xl font-display font-bold text-primary">
                    {hours}h {mins}m
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Status Card - Top right */}
          <div className="md:col-span-1">
            <Card className="h-full tilt">
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <Info className="h-5 w-5 text-primary" aria-hidden="true" />
                <CardTitle className="text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{message}</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Tips Card - Bottom right */}
          <div className="md:col-span-1">
            <Card className="h-full tilt">
              <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Check clothes periodically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Bring in before rain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Flip heavier items halfway through</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

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
