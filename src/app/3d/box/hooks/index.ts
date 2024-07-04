import { useCallback, useEffect, useRef, useState } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export function useRotation() {
  const [rotation, setRotation] = useState<[number, number, number]>([
    0, 0.75, 0,
  ]);
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
            newRotation[0] -= 0.1;
            break;
          case "down":
            newRotation[0] += 0.1;
            break;
          case "left":
            newRotation[1] -= 0.1;
            break;
          case "right":
            newRotation[1] += 0.1;
            break;
        }
        return newRotation;
      });
    },
    direction ? 10 : null
  );

  return { rotation, startRotate, stopRotate };
}

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
              newPosition[0] += moveDir * 0.1;
              break;
            case "y":
              newPosition[1] += moveDir * 0.1;
              break;
            case "z":
              newPosition[2] += moveDir * 0.1;
              break;
          }
        }
        return newPosition;
      });
    },
    moveDirection ? 10 : null
  );

  return { position, startMove, stopMove };
}
