
import { Progress } from '@/components/ui/progress';

type Props = {
  hours: number;
  minutes: number;
  totalHours: number;
};

export default function CircularTimer({ hours, minutes, totalHours }: Props) {
  const percentage = ((totalHours - (hours + minutes / 60)) / totalHours) * 100;
  const remainingPercentage = Math.max(0, Math.min(100, Math.round(percentage)));
  const circumference = 2 * Math.PI * 90; // radius of 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

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
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-display font-bold text-primary">
          {hours}h {minutes}m
        </div>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-muted text-muted-foreground">
          <span className="font-medium">{remainingPercentage}%</span>
          <span className="opacity-80">left</span>
        </div>
      </div>
    </div>
  );
}
