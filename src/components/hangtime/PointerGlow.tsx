import { useEffect, useRef } from 'react';

export default function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = e.clientX;
      const y = e.clientY;
      ref.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, hsl(var(--ring) / 0.08), transparent 40%)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-0" aria-hidden />
  );
}
