import { memo } from "react";
import { formatTemperature, getWeatherIcon } from "../../../lib/utils";
import { getDayHighLow, groupForecastByDay } from "./utils";


interface ForecastDailyProps {
  groupedForecasts: ReturnType<typeof groupForecastByDay>;
  units: "metric" | "imperial";
}

const ForecastDaily = memo(({ groupedForecasts, units }: ForecastDailyProps) => (
  <div className="grid grid-cols-1 gap-2 mt-2">
    {groupedForecasts.map(({ date, items }) => {
      const { high, low } = getDayHighLow(items);
      const dayWeather = items[Math.floor(items.length / 2)].weather[0]; // Midday weather
      
      return (
        <div key={date} className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center">
            <img 
              src={getWeatherIcon(dayWeather.icon)} 
              alt={dayWeather.description} 
              className="w-10 h-10"
            />
            <div className="ml-2">
              <p className="font-medium">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize">{dayWeather.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p>{formatTemperature(high, units)} / {formatTemperature(low, units)}</p>
          </div>
        </div>
      );
    })}
  </div>
));
ForecastDaily.displayName = 'ForecastDaily';

export default ForecastDaily; 