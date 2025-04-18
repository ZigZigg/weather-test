import { memo } from "react";
import { CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { WeatherData } from "../../../types/weather";
import { formatDate, formatTime, getWeatherIcon, formatTemperature } from "../../../lib/utils";

interface WeatherHeaderProps {
  currentWeather: WeatherData;
  city: string;
  onRemove: (city: string) => void;
  units: "metric" | "imperial";
}

const WeatherHeader = memo(({ currentWeather, city, onRemove, units }: WeatherHeaderProps) => {
  const mainWeather = currentWeather.weather[0];
  
  return (
    <CardHeader className={`bg-zinc-600 text-white rounded-t-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-2xl font-bold">
            {currentWeather.name}
            {currentWeather.sys.country && `, ${currentWeather.sys.country}`}
          </CardTitle>
          <p className="text-sm opacity-90">{formatDate(currentWeather.dt)}</p>
          <p className="text-sm opacity-90">{formatTime(currentWeather.dt)}</p>
        </div>
        <Button variant="ghost" size="icon" className="text-white" onClick={() => onRemove(city)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <img 
            src={getWeatherIcon(mainWeather.icon)} 
            alt={mainWeather.description} 
            className="w-16 h-16"
          />
          <div className="ml-2">
            <p className="capitalize">{mainWeather.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">{formatTemperature(currentWeather.main.temp, units)}</p>
          <p className="text-sm">
            Feels like {formatTemperature(currentWeather.main.feels_like, units)}
          </p>
        </div>
      </div>
    </CardHeader>
  );
});
WeatherHeader.displayName = 'WeatherHeader';

export default WeatherHeader; 