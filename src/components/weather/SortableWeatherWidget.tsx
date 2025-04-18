import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import WeatherWidget from "./WeatherWidget";

interface SortableWeatherWidgetProps {
  id: string;
  city: string;
  onRemove: (city: string) => void;
  units?: "metric" | "imperial";
}

const SortableWeatherWidget = ({ id, city, onRemove, units }: SortableWeatherWidgetProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? "relative touch-none z-10" : ""}`}
    >
      <WeatherWidget
        city={city}
        onRemove={onRemove}
        units={units}
      />
    </div>
  );
};

export default SortableWeatherWidget; 