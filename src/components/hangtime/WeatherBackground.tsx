import { ReactNode } from "react";

type Props = {
  condition: 'sunny' | 'cloudy' | 'rainy';
  children: ReactNode;
};

export default function WeatherBackground({ condition, children }: Props) {
  const bgClass =
    condition === 'sunny' ? 'bg-gradient-sunny' : condition === 'rainy' ? 'bg-gradient-rainy' : 'bg-gradient-cloudy';

  return (
    <div className={`min-h-screen w-full ${bgClass} transition-colors duration-500`}> 
      {children}
    </div>
  );
}
