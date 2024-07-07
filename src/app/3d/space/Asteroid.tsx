import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Model from './Model'; // Adjust the import path as necessary

const Asteroid: React.FC = () => {
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x += 0.001;
    }
  });

  return (
    <Model
      ref={modelRef}
      rotation={[0, 0, 0]}
      position={[2000, -1000, -1000]}
      url="/models/asteroid.glb"
      scale={[100, 100, 100]}
    />
  );
};


export default Asteroid;
