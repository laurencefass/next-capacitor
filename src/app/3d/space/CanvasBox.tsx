import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { useRotation, useMovement, useThrust, useRotationHotkeys } from './hooks';
import RotationButtons from './RotationButtons';
import DirectionButtons from './DirectionButtons';
import ThrustButton from './ThrustButton';

import Model from './Model';
import { Stars } from './Stars';
import { CameraTracker } from './CameraTracker';
import { TexturedSphere } from './TexturedSphere';

import "./CanvasBox.scss";


const CanvasBox: React.FC = () => {
  const { position, setPosition, startMove, stopMove } = useMovement();
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const { rotation, startRotate, stopRotate } = useRotation(camera);
  useRotationHotkeys({ onRotateStart: startRotate, onRotateStop: stopRotate });

  const modelRef = useRef<THREE.Group>(null);

  const handleThrust = (velocity: THREE.Vector3) => {
    if (modelRef.current) {
      // Calculate the forward direction vector based on the model's rotation
      const forward = new THREE.Vector3(0, 1, 0).applyQuaternion(modelRef.current.quaternion);

      // Update position based on the forward direction vector
      setPosition((prev) => [
        prev[0] + forward.x * 2,
        prev[1] + forward.y * 2,
        prev[2] + forward.z * 2,
      ]);
    }
  };

  const { thrust, startThrust, stopThrust, toggleAutoThrust, isAutoThrust } = useThrust(handleThrust);

  const groupRef = useRef<THREE.Group>(null);

  type Light = {
    position: [number, number, number]
    color: string;
  }

  const worldLights: Array<Light> = [
    {
      position: [0, -100, 0],
      color: "white"
    },
    {
      position: [0, 100, 0],
      color: "purple"
    },
    {
      position: [0, 0, 100],
      color: "pink"
    }
  ]

  return (
    <>
      <div className="banner">
        <h1>React 3D demo: Space Explorer</h1>
        <p>Simple demo of react-three-fiber and drei utility functions</p>
        <p>Look around with mouse or drag, fly and rotate with WASD keys or buttons</p>
      </div>
      <Canvas
        camera={{ position: [0, 50, 0], rotation: [-Math.PI / 2, 0, 0], near: 0.1, far: 20000 }}
        shadows
        onCreated={({ camera }) => {
          setCamera(camera);
        }}
      >
        <CameraTracker position={position} />
        <ambientLight intensity={0.5} />
        {worldLights.map((light, index) => (
          <directionalLight
            key={index}
            color={light.color}
            position={light.position}
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
        ))}
        <Model ref={modelRef} rotation={rotation} position={position} url="/models/capsule.glb" scale={[0.05, 0.05, 0.05]} />
        <TexturedSphere args={[200, 32, 32]} position={[0, -250, 0]} url='/textures/earth.jpg' />
        <TexturedSphere args={[200, 32, 32]} position={[0, 0, 1200]} url='/textures/mars.jpg' />
        <TexturedSphere args={[200, 32, 32]} position={[600, 0, -600]} url='/textures/venus.jpg' />
        <TexturedSphere args={[600, 32, 32]} position={[0, 1200, 0]} url='/textures/jupiter.jpg' />
        <TexturedSphere args={[1200, 32, 32]} position={[0, 4800, 4800]} url='/textures/sun.jpg' />
        {/* <Sun /> */}
        <Stars />
      </Canvas >
      <div className="controls">
        <RotationButtons onRotateStart={startRotate} onRotateStop={stopRotate} />
        <DirectionButtons onMoveStart={startMove} onMoveStop={stopMove} />
        <ThrustButton
          startThrust={startThrust}
          stopThrust={stopThrust}
          toggleAutoThrust={toggleAutoThrust}
          isThrusting={thrust || isAutoThrust}
        />
      </div>
    </>
  );
};

export default CanvasBox;
