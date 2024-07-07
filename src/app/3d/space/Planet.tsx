import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type PlanetProps = {
  children: React.ReactNode;
  position: [number, number, number];
};

const Planet: React.FC<PlanetProps> = ({ children, position }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Rotate around the y-axis
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
};

export default Planet;
