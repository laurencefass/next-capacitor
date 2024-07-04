import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

import { useRotation, useMovement } from './hooks';
import RotationButtons from './RotationButtons';
import DirectionButtons from './DirectionButtons';
import Model from './ModelLoader';

const TexturedSphere: React.FC = () => {
  const texture = useLoader(THREE.TextureLoader, '/textures/jupiter.jpg'); // Replace with your texture path

  return (
    <Sphere args={[20, 32, 32]} position={[0, -20, 0]} receiveShadow castShadow>
      <meshStandardMaterial attach="material" map={texture} />
    </Sphere>
  );
};

const CameraController: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const controlsRef = useRef<any>(null);

  useFrame(({ camera }) => {
    if (controlsRef.current) {
      // Adjust the camera's position smoothly
      const desiredPosition = new THREE.Vector3(position[0], position[1] + 50, position[2]);
      camera.position.lerp(desiredPosition, 0.1);
      // Make sure the OrbitControls target is updated
      controlsRef.current.target.lerp(new THREE.Vector3(position[0], position[1], position[2]), 0.1);
      controlsRef.current.update();
    }
  });

  return <OrbitControls ref={controlsRef} />;
};

const CanvasBox: React.FC = () => {
  const { position, startMove, stopMove } = useMovement();
  const { rotation, startRotate, stopRotate } = useRotation();

  return (
    <>
      <Canvas
        style={{ background: "black", height: '100vh', width: '100vw' }}
        camera={{ position: [0, 50, 0], rotation: [-Math.PI / 2, 0, 0] }}
        shadows>
        <CameraController position={position} />
        <ambientLight intensity={0.5} />
        <directionalLight
          color="white"
          position={[0, 10, 0]}
          castShadow
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <Model url="/models/capsule.glb" rotation={rotation} position={position} scale={[0.1, 0.1, 0.1]} />
        <TexturedSphere />
        <Stars />
      </Canvas>
      <RotationButtons onRotateStart={startRotate} onRotateStop={stopRotate} />
      <DirectionButtons onMoveStart={startMove} onMoveStop={stopMove} />
    </>
  );
};

export default CanvasBox;
