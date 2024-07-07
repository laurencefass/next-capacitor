import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Model from './Model'; // Adjust the import path as necessary

const SpaceStation: React.FC = () => {
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x += 0.001; // Adjust the rotation speed as necessary
    }
  });

  return (
    <Model
      ref={modelRef}
      rotation={[0, 0, 0]}
      position={[500, 500, 500]}
      url="/models/ISS.glb"
      scale={[1, 1, 1]}
    />
  );
};


export default SpaceStation;
