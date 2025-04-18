import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { weatherService } from "../../services/weatherService";
import { WeatherData, ForecastData } from "../../types/weather"; 
import {
  WeatherLoading,
  WeatherError,
  WeatherHeader,
  WeatherStats,
  ForecastDaily,
  ForecastHourly,
  WeatherFooter,
  groupForecastByDay
} from "./weather-widget";

interface WeatherWidgetProps {
  city: string;
  onRemove: (city: string) => void;
  onDragStart?: (e: React.DragEvent) => void;
  units?: "metric" | "imperial";
}

const WeatherWidget = ({ city, onRemove, onDragStart, units = "metric" }: WeatherWidgetProps) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [forecastDays, setForecastDays] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await weatherService.getCurrentWeather(city, units);
      const forecastData = await weatherService.getForecast(city, units);
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [city, units]);

  useEffect(() => {
    fetchWeatherData();

    // Auto refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [fetchWeatherData]);

  // Memoize the grouped forecasts calculation
  const groupedForecasts = useMemo(() => 
    groupForecastByDay(forecast, forecastDays), 
    [forecast, forecastDays]
  );

  const handleSetForecastDays = useCallback((days: number) => {
    setForecastDays(days);
  }, []);

  if (loading) {
    return <WeatherLoading />;
  }

  if (error) {
    return (
      <WeatherError 
        error={error} 
        city={city} 
        onRemove={onRemove} 
        onRetry={fetchWeatherData} 
      />
    );
  }

  if (!currentWeather || !forecast) return null;

  return (
    <Card 
      className="min-w-[300px] max-w-sm shadow-lg cursor-move"
      draggable
      onDragStart={onDragStart}
    >
      <WeatherHeader 
        currentWeather={currentWeather} 
        city={city} 
        onRemove={onRemove} 
        units={units} 
      />
      
      <CardContent className="pt-4">
        <WeatherStats currentWeather={currentWeather} units={units} />

        <Tabs defaultValue="daily" className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="daily" className="flex-1">Daily</TabsTrigger>
            <TabsTrigger value="hourly" className="flex-1">Hourly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="space-y-4">
            <ForecastDaily groupedForecasts={groupedForecasts} units={units} />
          </TabsContent>
          <TabsContent value="hourly">
            <ForecastHourly forecast={forecast} units={units} />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <WeatherFooter 
        forecastDays={forecastDays} 
        setForecastDays={handleSetForecastDays} 
        onRefresh={fetchWeatherData} 
      />
    </Card>
  );
};

export default WeatherWidget; 