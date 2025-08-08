
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Info, Lightbulb, Coffee, Sun, Cloud, CloudRain, ArrowLeft, RotateCcw, Tv, Music, Play } from 'lucide-react';
import CircularTimer from './CircularTimer';

type Props = {
  estimateHours: number;
  message: string;
  condition: 'sunny' | 'cloudy' | 'rainy';
  onRestart: () => void;
  onBack?: () => void;
};

const SUGGESTIONS: Record<string, string[]> = {
  sunny: ['Sip a cool drink 🥤', 'Read a chapter 📖', 'Quick walk outside 🚶'],
  cloudy: ['Make a cup of tea 🍵', 'Tidy a shelf 🧹', 'Call a friend ☎️'],
  rainy: ['Watch an episode 📺', 'Listen to this playlist 🎵', 'Stretch for 10 minutes 🧘']
};

export default function DryingEstimate({ estimateHours, message, condition, onRestart, onBack }: Props) {
  const hours = Math.floor(estimateHours);
  const mins = Math.round((estimateHours - hours) * 60);
  const suggestions = SUGGESTIONS[condition] ?? SUGGESTIONS.cloudy;
  
  const getWeatherIcon = () => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-24 w-24 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-24 w-24 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-24 w-24 text-blue-500" />;
      default:
        return <Sun className="h-24 w-24 text-yellow-500" />;
    }
  };

  return (
    <section className="container py-6 animate-fade-in" aria-labelledby="estimate-title">
      
      {/* Rearranged Bento Grid Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-6 gap-3 auto-rows-fr min-h-[80vh]">
          


          {/* While You Wait - Top right */}
          <div className="col-span-2 row-span-2">
            <Card className="h-full tilt" style={{ backgroundColor: '#E8D5B7' }}>
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Coffee className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">While You Wait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion, i) => (
                    <div key={i} className="p-3 transition-colors">
                      <div className="text-base font-medium flex items-center gap-3">
                        {suggestion.includes('Watch an episode') && <Tv className="h-5 w-5 text-primary" />}
                        {suggestion.includes('Listen to this playlist') && <Music className="h-5 w-5 text-primary" />}
                        {suggestion.includes('Stretch for 10 minutes') && <Play className="h-5 w-5 text-red-500" />}
                        {suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 99 and Vid stacked as 1:1 squares */}
          <div className="col-span-1 row-span-2 flex flex-col gap-3">
            {/* 99 - Top square */}
            <div className="row-span-1">
              <Card className="h-full flex flex-col items-center justify-center p-0 tilt" style={{ aspectRatio: '1/1', backgroundColor: '#B8D4E3' }}>
                <CardContent className="flex-1 flex items-center justify-center p-0">
                  <img 
                    src="/logo.png" 
                    alt="HangTime Logo" 
                    className="w-full h-full object-contain"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Vid - Bottom square */}
            <div className="row-span-1 mt-1.5">
              <Card className="h-full tilt" style={{ aspectRatio: '1/1' }}>
                <CardContent className="flex-1 flex items-center justify-center p-0">
                  <video 
                    className="w-full h-full object-cover border-2 border-white rounded-lg"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/dry.mp4" type="video/mp4" />
                    <source src="/dry.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Status and Icon on top of timer */}
          <div className="col-span-2 row-span-1">
            <Card className="h-full tilt" style={{ aspectRatio: '2/1', marginLeft: '2px', backgroundColor: '#EBEBEB' }}>
              <CardHeader className="flex flex-row items-center gap-2 pb-2 px-4">
                <Info className="h-6 w-6 text-primary" />
                <CardTitle className="text-base">Status</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <p className="text-base text-muted-foreground leading-relaxed">{message}</p>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 row-span-1">
            <Card className="h-full flex flex-col items-center justify-center p-2 tilt" style={{ aspectRatio: '1/1', marginLeft: '4px', backgroundColor: '#C5E1ED' }}>
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="w-24 h-24 flex items-center justify-center">
                  {getWeatherIcon()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timer - Largest component on bottom with 3:2 ratio */}
          <div className="col-span-3 row-span-2">
            <Card className="h-full flex flex-col items-center justify-center p-6 tilt" style={{ aspectRatio: '3/2', backgroundColor: '#F2D7A8' }}>

              <CardContent className="flex-1 flex flex-col items-center justify-center h-full">
                <div className="scale-125 flex items-center justify-center mt-12">
                  <CircularTimer hours={hours} minutes={mins} totalHours={estimateHours} />
                </div>
                <div className="mt-6 text-center">
                  <div className="text-5xl font-display font-bold text-primary">
                    {hours}h {mins}m
                  </div>
                  <div className="text-lg text-muted-foreground mt-2">Estimated Time</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Aa - Next to timer */}
          <div className="col-span-1 row-span-1">
            <Card className="h-full tilt" style={{ aspectRatio: '1/1', backgroundColor: '#D4C4A3' }}>
              <CardContent className="flex flex-col gap-3 p-4 justify-center items-center h-full">
                <Button 
                  onClick={onRestart} 
                  variant="secondary" 
                  size="lg"
                  className="w-5/6 hover:scale-110 hover:bg-black hover:text-white transition-all duration-300 ease-in-out transform hover:rotate-1 hover:shadow-lg flex items-center gap-3 text-base font-semibold py-4"
                >
                  <RotateCcw className="h-5 w-5 animate-pulse" />
                  Start
                </Button>
                {onBack && (
                  <Button 
                    onClick={onBack} 
                    variant="outline" 
                    size="lg"
                    className="w-5/6 hover:scale-110 hover:bg-amber-800 hover:text-white hover:border-transparent transition-all duration-300 ease-in-out transform hover:-rotate-1 hover:shadow-lg flex items-center gap-3 text-base font-semibold py-4"
                  >
                    <ArrowLeft className="h-5 w-5 animate-bounce" />
                    Back
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Tips - Next to timer with 2:1 ratio */}
          <div className="col-span-2 row-span-1">
            <Card className="h-full tilt" style={{ aspectRatio: '2/1', backgroundColor: '#B8D4E3' }}>
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                <CardTitle className="text-base">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-base text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Check clothes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Bring in before rain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Flip items</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}


