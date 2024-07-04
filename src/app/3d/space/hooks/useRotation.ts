import { useState, useCallback } from "react";
import { useInterval } from "./useInterval";

export function useRotation() {
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [direction, setDirection] = useState<string | null>(null);

  const startRotate = useCallback((dir: "up" | "down" | "left" | "right") => {
    setDirection(dir);
  }, []);

  const stopRotate = useCallback(() => {
    setDirection(null);
  }, []);

  useInterval(
    () => {
      setRotation((prev) => {
        const newRotation = [...prev] as [number, number, number];
        switch (direction) {
          case "up":
            newRotation[0] -= 0.01;
            break;
          case "down":
            newRotation[0] += 0.01;
            break;
          case "left":
            newRotation[2] -= 0.01;
            break;
          case "right":
            newRotation[2] += 0.01;
            break;
        }
        return newRotation;
      });
    },
    direction ? 10 : null
  );

  return { rotation, startRotate, stopRotate };
}
