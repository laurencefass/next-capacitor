import { useEffect } from "react";

export type UseRotationHotkeysProps = {
  onRotateStart: (direction: "up" | "down" | "left" | "right") => void;
  onRotateStop: () => void;
};

export const useRotationHotkeys = ({
  onRotateStart,
  onRotateStop,
}: UseRotationHotkeysProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toUpperCase()) {
        case "W":
          onRotateStart("up");
          break;
        case "A":
          onRotateStart("left");
          break;
        case "S":
          onRotateStart("down");
          break;
        case "D":
          onRotateStart("right");
          break;
        default:
          return; // Ignore other keys
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      // Check if the released key is one of 'WASD'
      if (["W", "A", "S", "D"].includes(event.key.toUpperCase())) {
        onRotateStop();
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onRotateStart, onRotateStop]); // Only re-run the effect if these functions change
};
