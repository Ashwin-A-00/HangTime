import { useCallback, useMemo, useState } from 'react';
import WeatherBackground from '@/components/hangtime/WeatherBackground';
import PointerGlow from '@/components/hangtime/PointerGlow';
import LogoIntro from '@/components/hangtime/LogoIntro';
import LocationSearch, { LocationItem } from '@/components/hangtime/LocationSearch';
import WeatherSummary from '@/components/hangtime/WeatherSummary';
import ClothingSelect from '@/components/hangtime/ClothingSelect';
import DryingEstimate from '@/components/hangtime/DryingEstimate';
import ActivitySuggestions from '@/components/hangtime/ActivitySuggestions';

// Helpers
function classifyCondition(weathercode: number, precipProbNext2h: number): 'sunny' | 'cloudy' | 'rainy' {
  if (precipProbNext2h >= 40) return 'rainy';
  if ([0].includes(weathercode)) return 'sunny';
  if ([1,2,3,45,48].includes(weathercode)) return 'cloudy';
  if (weathercode >= 51) return 'rainy';
  return 'cloudy';
}

function estimateDryTime(base: number, temp: number, humidity: number, wind: number, rainSoon: boolean) {
  let hours = base;
  // temperature adjustment (baseline 20C)
  hours += (20 - temp) * 0.04; // -0.2h per +5C
  // humidity adjustment (baseline 50%)
  hours += (humidity - 50) * 0.05; // +0.5h per +10%
  // wind adjustment (threshold 2 m/s)
  hours += Math.max(0, 2 - wind) * 0.15; // slower if low wind
  hours -= Math.max(0, wind - 2) * 0.1; // faster if windy
  if (rainSoon) hours += 1.5;
  return Math.max(1, Number(hours.toFixed(2)));
}

export default function Index() {
  const [step, setStep] = useState<'logo'|'location'|'summary'|'clothes'|'estimate'|'suggestions'>('logo');
  const [loc, setLoc] = useState<LocationItem | null>(null);
  const [weather, setWeather] = useState<any | null>(null);
  const [condition, setCondition] = useState<'sunny'|'cloudy'|'rainy'>('sunny');
  const [selected, setSelected] = useState<'light'|'medium'|'heavy'|undefined>();
  const [estimate, setEstimate] = useState<number>(0);

  const fetchWeather = useCallback(async (latitude: number, longitude: number) => {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current_weather: 'true',
      hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m',
      forecast_days: '1',
      timezone: 'auto'
    });
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    const data = await res.json();
    setWeather(data);
    const nowIdx = data.hourly.time.findIndex((t: string) => t === data.current_weather.time);
    const p1 = data.hourly.precipitation_probability[nowIdx + 1] ?? 0;
    const p2 = data.hourly.precipitation_probability[nowIdx + 2] ?? 0;
    const precipProbNext2h = Math.max(p1, p2);
    const cond = classifyCondition(data.current_weather.weathercode, precipProbNext2h);
    setCondition(cond);
  }, []);

  const onLocationSelect = async (l: LocationItem) => {
    setLoc(l);
    setStep('summary');
    await fetchWeather(l.latitude, l.longitude);
  };

  const rainSoon = useMemo(() => {
    if (!weather) return false;
    const nowIdx = weather.hourly.time.findIndex((t: string) => t === weather.current_weather.time);
    const p1 = weather.hourly.precipitation_probability[nowIdx + 1] ?? 0;
    const p2 = weather.hourly.precipitation_probability[nowIdx + 2] ?? 0;
    return Math.max(p1, p2) >= 40 || (weather.hourly.precipitation[nowIdx + 1] ?? 0) > 0;
  }, [weather]);

  const temp = weather?.current_weather?.temperature ?? 20;
  const wind = weather?.current_weather?.windspeed ?? 2;
  const humidity = (() => {
    if (!weather) return 50;
    const nowIdx = weather.hourly.time.findIndex((t: string) => t === weather.current_weather.time);
    return weather.hourly.relative_humidity_2m[nowIdx] ?? 50;
  })();

  const computeEstimate = useCallback(() => {
    const base = selected === 'light' ? 2.5 : selected === 'medium' ? 4 : 6;
    const h = estimateDryTime(base, temp, humidity, wind, rainSoon);
    setEstimate(h);
  }, [selected, temp, humidity, wind, rainSoon]);

  const message = useMemo(() => {
    if (estimate <= 2) return 'Perfect time to get these on the line!';
    if (estimate <= 4) return 'Good drying conditions today.';
    if (rainSoon) return 'Might be tricky with rain — consider indoor drying.';
    return 'It will take a while — pick a cozy activity!';
  }, [estimate, rainSoon]);

  const restart = () => {
    setStep('location');
    setSelected(undefined);
    setLoc(null);
  };

  return (
    <WeatherBackground condition={condition}>
      <PointerGlow />
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        {step === 'logo' && <LogoIntro onDone={() => setStep('location')} />}
        {step === 'location' && <LocationSearch onSelect={onLocationSelect} />}
        {step === 'summary' && (
          <div className="w-full">
            <WeatherSummary 
              temp={temp} 
              humidity={humidity} 
              wind={wind} 
              rainSoon={rainSoon} 
              condition={condition}
              location={loc?.name || 'Unknown location'}
              onNext={() => setStep('clothes')} 
            />
          </div>
        )}
        {step === 'clothes' && (
          <ClothingSelect 
            selected={selected} 
            onSelect={(t) => setSelected(t)} 
            onNext={() => { if (selected) { computeEstimate(); setStep('estimate'); } }}
            condition={condition}
          />
        )}
        {step === 'estimate' && (
          <DryingEstimate estimateHours={estimate} message={message} onNext={() => setStep('suggestions')} />
        )}
        {step === 'suggestions' && (
          <ActivitySuggestions condition={condition} onRestart={restart} />
        )}
      </main>
    </WeatherBackground>
  );
}
