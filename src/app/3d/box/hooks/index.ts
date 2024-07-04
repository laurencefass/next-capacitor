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

export function useRotation(
  onRotate: (direction: "up" | "down" | "left" | "right") => void
) {
  const [direction, setDirection] = useState<string | null>(null);

  const startRotate = useCallback((dir: "up" | "down" | "left" | "right") => {
    setDirection(dir);
  }, []);

  const stopRotate = useCallback(() => {
    setDirection(null);
  }, []);

  useInterval(
    () => {
      if (direction) {
        onRotate(direction as "up" | "down" | "left" | "right");
      }
    },
    direction ? 10 : null
  );

  return { direction, startRotate, stopRotate };
}

export function useMovement(
  moveDirection: string | null,
  handleMove: (axis: "x" | "y" | "z", direction: 1 | -1) => void
) {
  useInterval(
    () => {
      if (moveDirection) {
        const [axis, dir] = moveDirection.split("");
        handleMove(axis as "x" | "y" | "z", dir === "+" ? 1 : -1);
      }
    },
    moveDirection ? 10 : null
  );
}
