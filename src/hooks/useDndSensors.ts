import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

// Hook for DnD sensors configuration
export const useDndSensors = () => {
    return useSensors(
      useSensor(MouseSensor, {
        activationConstraint: {
          distance: 10,
        },
      }),
      useSensor(TouchSensor, {
        activationConstraint: {
          delay: 250,
          tolerance: 5,
        },
      })
    );
  }; 