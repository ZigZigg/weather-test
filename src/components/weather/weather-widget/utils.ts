import { ForecastData, ForecastItem } from "../../../types/weather";

// Helper function for high/low temperatures
export const getDayHighLow = (items: ForecastItem[]) => {
  let high = -Infinity;
  let low = Infinity;

  items.forEach((item) => {
    if (item.main.temp_max > high) high = item.main.temp_max;
    if (item.main.temp_min < low) low = item.main.temp_min;
  });

  return { high, low };
};

// Helper function to group forecast by day
export const groupForecastByDay = (forecast: ForecastData | null, forecastDays: number) => {
  if (!forecast) return [];

  const dailyForecasts: { [key: string]: ForecastItem[] } = {};

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(item);
  });

  // Convert to array and limit by forecastDays
  return Object.entries(dailyForecasts)
    .slice(0, forecastDays)
    .map(([date, items]) => ({
      date,
      items,
    }));
}; 