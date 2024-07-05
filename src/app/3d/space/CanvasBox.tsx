import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
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
  const { rotation, startRotate, stopRotate } = useRotation();
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

  const { startThrust, stopThrust, toggleThrust, isLongPress } = useThrust(handleThrust);

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
      </div>
      <Canvas
        camera={{ position: [0, 50, 0], rotation: [-Math.PI / 2, 0, 0], near: 0.1, far: 5000 }}
        shadows
      >
        <CameraTracker position={position} />
        <ambientLight intensity={0.5} />
        {worldLights.map((light, index) => (<directionalLight
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
        {/* <group ref={groupRef} rotation={rotation} position={position}> */}
        <Model ref={modelRef} rotation={rotation} position={position} url="/models/capsule.glb" scale={[0.1, 0.1, 0.1]} />
        {/* <GlowingTorus isVisible={true} position={[0, 0, -0.1]} /> */}
        {/* </group> */}
        a
        <TexturedSphere args={[200, 32, 32]} position={[0, -250, 0]} url='/textures/earth.jpg' />
        <TexturedSphere args={[200, 32, 32]} position={[0, 0, 1200]} url='/textures/mars.jpg' />
        <TexturedSphere args={[200, 32, 32]} position={[600, 0, -600]} url='/textures/venus.jpg' />
        <TexturedSphere args={[600, 32, 32]} position={[0, 1200, 0]} url='/textures/jupiter.jpg' />
        <Stars />
      </Canvas >
      <div className="controls">
        <RotationButtons onRotateStart={startRotate} onRotateStop={stopRotate} />
        <DirectionButtons onMoveStart={startMove} onMoveStop={stopMove} />
        <ThrustButton
          startThrust={startThrust}
          stopThrust={stopThrust}
          toggleThrust={toggleThrust}
          isThrusting={isLongPress}
        />
      </div>
    </>
  );
};

export default CanvasBox;
