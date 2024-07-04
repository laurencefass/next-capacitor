import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const CameraTracker: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const controlsRef = useRef<any>(null);

    useFrame(({ camera }) => {
        if (cameraRef.current && controlsRef.current) {
            const fixedDistance = 20; // Fixed distance from the model
            const modelPosition = new THREE.Vector3(...position);
            const direction = new THREE.Vector3().subVectors(camera.position, modelPosition).normalize();
            const desiredPosition = direction.multiplyScalar(fixedDistance).add(modelPosition);

            camera.position.lerp(desiredPosition, 0.1);

            const target = new THREE.Vector3(...position);
            controlsRef.current.target.copy(target);
            controlsRef.current.update();
        }
    });
    return (
        <>
            <perspectiveCamera ref={cameraRef} />
            <OrbitControls ref={controlsRef} />
        </>
    );
};