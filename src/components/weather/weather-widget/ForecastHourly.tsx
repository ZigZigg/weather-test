import { memo } from "react";
import { ForecastData } from "../../../types/weather";
import { formatTemperature, formatTime, getWeatherIcon } from "../../../lib/utils";

interface ForecastHourlyProps {
  forecast: ForecastData;
  units: "metric" | "imperial";
}

const ForecastHourly = memo(({ forecast, units }: ForecastHourlyProps) => (
  <div className="overflow-x-auto">
    <div className="flex space-x-3 py-2">
      {forecast.list.slice(0, 8).map((item) => (
        <div key={item.dt} className="flex flex-col items-center min-w-16">
          <p className="text-xs">{formatTime(item.dt)}</p>
          <img 
            src={getWeatherIcon(item.weather[0].icon)} 
            alt={item.weather[0].description} 
            className="w-8 h-8 my-1"
          />
          <p className="font-medium">{formatTemperature(item.main.temp, units)}</p>
        </div>
      ))}
    </div>
  </div>
));
ForecastHourly.displayName = 'ForecastHourly';

export default ForecastHourly; 