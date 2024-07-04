import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

type ModelProps = {
    url: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
};

const Model = forwardRef<Group, ModelProps>(({ url, position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }, ref) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} position={position} scale={scale} rotation={rotation} ref={ref} />;
});

export default Model;
