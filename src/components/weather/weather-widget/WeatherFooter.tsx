import { memo } from "react";
import { CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
import { RefreshCw } from "lucide-react";

interface WeatherFooterProps {
  forecastDays: number;
  setForecastDays: (days: number) => void;
  onRefresh: () => void;
}

const WeatherFooter = memo(({ forecastDays, setForecastDays, onRefresh }: WeatherFooterProps) => (
  <CardFooter className="flex justify-between pt-2">
    <div className="text-xs text-[hsl(var(--muted-foreground))]">
      {forecastDays === 3 ? (
        <Button variant="ghost" size="sm" onClick={() => setForecastDays(5)}>
          Show 5-day forecast
        </Button>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setForecastDays(3)}>
          Show 3-day forecast
        </Button>
      )}
    </div>
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onRefresh}
      className="text-[hsl(var(--muted-foreground))]"
    >
      <RefreshCw className="h-3 w-3 mr-1" />
      Refresh
    </Button>
  </CardFooter>
));
WeatherFooter.displayName = 'WeatherFooter';

export default WeatherFooter; 