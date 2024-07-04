import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useInterval } from "./useInterval"; // Assuming useInterval is in a separate file

export function useThrust(handleThrust: (velocity: THREE.Vector3) => void) {
  const [thrust, setThrust] = useState<boolean>(false);
  const [isLongPress, setIsLongPress] = useState<boolean>(false);
  const velocity = useRef(new THREE.Vector3(0, 0, -0.1)); // Adjusted velocity for forward thrust
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startThrust = useCallback(() => {
    console.log("startThrust");
    setThrust(true);
    timeoutRef.current = setTimeout(() => {
      setIsLongPress(true);
      setThrust(true);
    }, 3000); // 3 seconds
  }, []);

  const stopThrust = useCallback(() => {
    console.log("stopThrust");
    setThrust(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isLongPress) {
      setThrust(false);
    } else {
      setIsLongPress(false);
    }
  }, [isLongPress]);

  const toggleThrust = useCallback(() => {
    setThrust((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        startThrust();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        stopThrust();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [startThrust, stopThrust]);

  useInterval(
    () => {
      if (thrust) {
        handleThrust(velocity.current);
      }
    },
    thrust ? 10 : null
  );

  return { thrust, startThrust, stopThrust, toggleThrust, isLongPress };
}
