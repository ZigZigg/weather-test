import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  SearchBar,
  EmptyState,
  WeatherGrid,
  DragOverlayComponent,
} from "./weather-dashboard";
import { useCityManager } from "../../hooks/useCityManager";
import { useDndSensors } from "../../hooks/useDndSensors";

const WeatherDashboard = () => {
  const {
    searchCity,
    setSearchCity,
    cities,
    setCities,
    error,
    addCity,
    removeCity
  } = useCityManager();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [units] = useState<"metric" | "imperial">("metric");
  const [draggedOverId, setDraggedOverId] = useState<UniqueIdentifier | null>(null);

  const sensors = useDndSensors();

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    if (event.over) {
      setDraggedOverId(event.over.id);
    } else {
      setDraggedOverId(null);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setDraggedOverId(null);

    if (over && active.id !== over.id) {
      setCities((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, [setCities]);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setDraggedOverId(null);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
        
        <div className="w-full max-w-md">
          <SearchBar 
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            addCity={addCity}
            error={error}
          />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {cities.length > 0 ? (
          <WeatherGrid 
            cities={cities}
            draggedOverId={draggedOverId}
            removeCity={removeCity}
            units={units}
          />
        ) : (
          <EmptyState />
        )}

        <DragOverlayComponent 
          activeId={activeId}
          cities={cities}
          removeCity={removeCity}
          units={units}
        />
      </DndContext>
    </div>
  );
};

export default WeatherDashboard; 