import { memo } from "react";
import { DragOverlay as DndDragOverlay } from "@dnd-kit/core";
import WeatherWidget from "../WeatherWidget";

interface CityWidget {
  id: string;
  city: string;
}

interface DragOverlayProps {
  activeId: string | null;
  cities: CityWidget[];
  removeCity: (city: string) => void;
  units: "metric" | "imperial";
}

const DragOverlayComponent = memo(({ activeId, cities, removeCity, units }: DragOverlayProps) => {
  if (!activeId) return null;
  
  return (
    <DndDragOverlay>
      <div className="opacity-80">
        <WeatherWidget
          city={cities.find((c) => c.id === activeId)?.city || ""}
          onRemove={removeCity}
          units={units}
        />
      </div>
    </DndDragOverlay>
  );
});

DragOverlayComponent.displayName = 'DragOverlayComponent';

export default DragOverlayComponent; 