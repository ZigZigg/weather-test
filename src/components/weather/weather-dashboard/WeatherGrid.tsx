import { memo } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import SortableWeatherWidget from "../SortableWeatherWidget";

interface CityWidget {
  id: string;
  city: string;
}

interface WeatherGridProps {
  cities: CityWidget[];
  draggedOverId: UniqueIdentifier | null;
  removeCity: (city: string) => void;
  units: "metric" | "imperial";
}

const WeatherGrid = memo(({ cities, draggedOverId, removeCity, units }: WeatherGridProps) => {
  return (
    <SortableContext items={cities.map((c) => c.id)} strategy={rectSortingStrategy}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div 
            key={city.id} 
            className={`
              p-1 rounded-lg transition-all duration-200
              ${draggedOverId === city.id ? 'bg-[hsl(var(--primary)_/_0.2)] scale-105' : ''}
            `}
          >
            <SortableWeatherWidget
              id={city.id}
              city={city.city}
              onRemove={removeCity}
              units={units}
            />
          </div>
        ))}
      </div>
    </SortableContext>
  );
});

WeatherGrid.displayName = 'WeatherGrid';

export default WeatherGrid; 