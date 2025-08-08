import { useEffect } from 'react';

export default function LogoIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-white/60 dark:bg-black/20 backdrop-blur-md shadow-lg flex items-center justify-center animate-fade-in" aria-label="HangTime logo">
        <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden>
          <defs>
            <clipPath id="cloth">
              <rect x="30" y="28" width="40" height="28" rx="4" />
            </clipPath>
          </defs>
          <circle cx="40" cy="40" r="18" fill="hsl(42 92% 72%)" />
          <g clipPath="url(#cloth)">
            <rect x="28" y="26" width="44" height="32" rx="6" fill="hsl(210 40% 96%)" />
            <rect x="28" y="26" width="44" height="8" fill="hsl(210 16% 82%)" />
          </g>
          <line x1="24" y1="24" x2="72" y2="24" stroke="hsl(210 14% 40%)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="24" r="2" fill="hsl(210 14% 40%)" />
          <circle cx="72" cy="24" r="2" fill="hsl(210 14% 40%)" />
        </svg>
      </div>
    </div>
  );
}
