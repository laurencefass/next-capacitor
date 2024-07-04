import { useCallback, useEffect, useRef, useState } from "react";
import { useInterval } from "./useInterval";

export function useMovement() {
  const [position, setPosition] = useState<[number, number, number]>([0, 1, 0]);
  const [moveDirection, setMoveDirection] = useState<string | null>(null);

  const startMove = useCallback((axis: "x" | "y" | "z", direction: 1 | -1) => {
    setMoveDirection(`${axis}${direction === 1 ? "+" : "-"}`);
  }, []);

  const stopMove = useCallback(() => {
    setMoveDirection(null);
  }, []);

  useInterval(
    () => {
      setPosition((prev) => {
        const newPosition = [...prev] as [number, number, number];
        if (moveDirection) {
          const [axis, dir] = moveDirection.split("");
          const moveDir = dir === "+" ? 1 : -1;
          switch (axis) {
            case "x":
              newPosition[0] += moveDir * 2;
              break;
            case "y":
              newPosition[1] += moveDir * 2;
              break;
            case "z":
              newPosition[2] += moveDir * 2;
              break;
          }
        }
        return newPosition;
      });
    },
    moveDirection ? 1 : null
  );

  return { position, setPosition, startMove, stopMove };
}
