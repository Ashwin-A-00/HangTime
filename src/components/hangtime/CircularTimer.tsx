
import { useEffect, useState } from 'react';

type Props = {
  hours: number;
  minutes: number;
  totalHours: number;
};

export default function CircularTimer({ hours, minutes, totalHours }: Props) {
  // Calculate initial time in seconds from the provided hours and minutes
  const initialTimeInSeconds = (hours * 3600) + (minutes * 60);
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  const [isRunning, setIsRunning] = useState(true);

  // Calculate initial percentage based on the actual drying time
  const initialPercentage = 0; // Start at 0% since we're counting down from the full time
  const [percentage, setPercentage] = useState(initialPercentage);
  
  const remainingPercentage = Math.max(0, Math.min(100, Math.round(percentage)));
  const circumference = 2 * Math.PI * 90; // radius of 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Countdown effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          setIsRunning(false);
          return 0;
        }
        
        const newTime = prevTime - 1;
        const newPercentage = ((newTime / initialTimeInSeconds) * 100);
        setPercentage(newPercentage);
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, totalHours]);

  // Format time display
  const displayHours = Math.floor(timeLeft / 3600);
  const displayMinutes = Math.floor((timeLeft % 3600) / 60);
  const displaySeconds = timeLeft % 60;

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Background circle */}
      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_12px_hsl(var(--primary)_/_0.35)]"
        />
        
        {/* Spinning dot indicator */}
        <circle
          cx="100"
          cy="10"
          r="3"
          fill="hsl(var(--primary))"
          className="animate-spin"
          style={{
            animationDuration: '1s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            transformOrigin: '100px 100px'
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-display font-bold text-primary">
          {displayHours}h {displayMinutes}m
        </div>
        <div className="text-lg font-medium text-muted-foreground">
          {displaySeconds.toString().padStart(2, '0')}s
        </div>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-muted text-muted-foreground">
          <span className="font-medium">{remainingPercentage}%</span>
          <span className="opacity-80">left</span>
        </div>
      </div>
    </div>
  );
}
