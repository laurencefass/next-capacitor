import { useState, useCallback, useRef } from "react";
import { useInterval } from "./useInterval";
import * as THREE from "three";

export function useRotation(cameraRef: React.RefObject<THREE.Camera>) {
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
      if (!cameraRef.current) return rotation;

      const cameraQuaternion = cameraRef.current.quaternion.clone();
      const rotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation));

      const angle = 0.01;
      let axis = new THREE.Vector3();

      switch (direction) {
        case "up":
          axis.set(1, 0, 0).applyQuaternion(cameraQuaternion);
          break;
        case "down":
          axis.set(-1, 0, 0).applyQuaternion(cameraQuaternion);
          break;
        case "left":
          axis.set(0, 1, 0).applyQuaternion(cameraQuaternion);
          break;
        case "right":
          axis.set(0, -1, 0).applyQuaternion(cameraQuaternion);
          break;
        default:
          return rotation;
      }

      const deltaQuaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      rotationQuaternion.multiplyQuaternions(deltaQuaternion, rotationQuaternion);

      const euler = new THREE.Euler().setFromQuaternion(rotationQuaternion);

      setRotation([euler.x, euler.y, euler.z]);
    },
    direction ? 10 : null
  );

  return { rotation, startRotate, stopRotate };
}
