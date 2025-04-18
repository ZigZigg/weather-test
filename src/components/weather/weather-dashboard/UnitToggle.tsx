import { memo } from "react";
import { Button } from "../../ui/button";

interface UnitToggleProps {
  units: "metric" | "imperial";
  setUnits: (units: "metric" | "imperial") => void;
}

const UnitToggle = memo(({ units, setUnits }: UnitToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={units === "metric" ? "default" : "outline"}
        size="sm"
        onClick={() => setUnits("metric")}
      >
        °C
      </Button>
      <Button
        variant={units === "imperial" ? "default" : "outline"}
        size="sm"
        onClick={() => setUnits("imperial")}
      >
        °F
      </Button>
    </div>
  );
});

UnitToggle.displayName = 'UnitToggle';

export default UnitToggle; 