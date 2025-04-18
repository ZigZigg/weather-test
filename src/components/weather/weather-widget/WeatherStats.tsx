import { memo } from "react";
import { WeatherData } from "../../../types/weather";

interface WeatherStatsProps {
  currentWeather: WeatherData;
  units: "metric" | "imperial";
}

const WeatherStats = memo(({ currentWeather, units }: WeatherStatsProps) => (
  <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
    <div>
      <p className="text-[hsl(var(--muted-foreground))]">Humidity</p>
      <p className="font-medium">{currentWeather.main.humidity}%</p>
    </div>
    <div>
      <p className="text-[hsl(var(--muted-foreground))]">Wind</p>
      <p className="font-medium">
        {currentWeather.wind.speed} {units === "imperial" ? "mph" : "m/s"}
      </p>
    </div>
    <div>
      <p className="text-[hsl(var(--muted-foreground))]">Pressure</p>
      <p className="font-medium">{currentWeather.main.pressure} hPa</p>
    </div>
  </div>
));
WeatherStats.displayName = 'WeatherStats';

export default WeatherStats; 