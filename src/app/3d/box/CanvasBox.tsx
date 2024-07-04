import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

import { useRotation, useMovement } from './hooks';
import RotationButtons from './RotationButtons';
import DirectionButtons from './DirectionButtons';

import Model from './ModelLoader';

const CanvasBox: React.FC = () => {
  const [position, setPosition] = useState<[number, number, number]>([0, 1, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0.75, 0]);
  const [moveDirection, setMoveDirection] = useState<string | null>(null);

  const handleMove = useCallback((axis: 'x' | 'y' | 'z', direction: 1 | -1) => {
    setPosition(prev => {
      const newPosition = [...prev] as [number, number, number];
      switch (axis) {
        case 'x':
          newPosition[0] += direction * 0.1;
          break;
        case 'y':
          newPosition[1] += direction * 0.1;
          break;
        case 'z':
          newPosition[2] += direction * 0.1;
          break;
      }
      return newPosition;
    });
  }, []);

  const handleRotate = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setRotation(prev => {
      const newRotation = [...prev] as [number, number, number];
      switch (direction) {
        case 'up':
          newRotation[0] -= 0.1;
          break;
        case 'down':
          newRotation[0] += 0.1;
          break;
        case 'left':
          newRotation[1] -= 0.1;
          break;
        case 'right':
          newRotation[1] += 0.1;
          break;
      }
      return newRotation;
    });
  }, []);

  const handleMoveStart = useCallback((axis: 'x' | 'y' | 'z', direction: 1 | -1) => {
    setMoveDirection(`${axis}${direction === 1 ? "+" : "-"}`);
  }, []);

  const handleMoveStop = useCallback(() => {
    setMoveDirection(null);
  }, []);


  const { direction: mobileRotateDirection, startRotate, stopRotate } = useRotation(handleRotate);

  useMovement(moveDirection, handleMove);
  useRotation(handleRotate);

  return (
    <>
      <Canvas
        style={{ background: "black", height: '90vh', width: '100vw' }}
        camera={{ position: [0, 50, 0], rotation: [-Math.PI / 2, 0, 0] }}
        shadows>
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
        <Sphere args={[20, 32, 32]} position={[0, -20, 0]} receiveShadow castShadow>
          <meshStandardMaterial attach="material" color="#FFC3FF" />
        </Sphere>
        <OrbitControls />
      </Canvas>
      <RotationButtons onRotateStart={startRotate} onRotateStop={stopRotate} />
      <DirectionButtons onMoveStart={handleMoveStart} onMoveStop={handleMoveStop} />
    </>
  );
};

export default CanvasBox;
