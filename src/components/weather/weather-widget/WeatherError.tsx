import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

interface WeatherErrorProps {
  error: string;
  city: string;
  onRemove: (city: string) => void;
  onRetry: () => void;
}

const WeatherError = memo(({ error, city, onRemove, onRetry }: WeatherErrorProps) => (
  <Card className="min-w-[300px] max-w-sm">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>Error</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => onRemove(city)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-[hsl(var(--destructive))]">{error}</p>
      <Button className="mt-4 w-full" onClick={onRetry}>
        Try Again
      </Button>
    </CardContent>
  </Card>
));
WeatherError.displayName = 'WeatherError';

export default WeatherError; 