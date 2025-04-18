import { Card, CardContent } from "../../ui/card";
import { RefreshCw } from "lucide-react";

const WeatherLoading = () => (
  <Card className="min-w-[300px] max-w-sm h-[400px] flex items-center justify-center">
    <CardContent>
      <div className="text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2">Loading weather data...</p>
      </div>
    </CardContent>
  </Card>
);

export default WeatherLoading; 