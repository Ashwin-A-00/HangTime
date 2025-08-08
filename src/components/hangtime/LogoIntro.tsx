import { useEffect } from 'react';

export default function LogoIntro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-white/60 dark:bg-black/20 backdrop-blur-md shadow-lg flex items-center justify-center animate-fade-in" aria-label="HangTime logo">
        <img src="/logo.png" alt="HangTime Logo" className="w-86 h-86 object-contain" />
      </div>
    </div>
  );
}
