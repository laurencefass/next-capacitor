import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Box3, Vector3, Mesh } from 'three';

type ModelProps = {
    url: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation: [number, number, number];
};

const Model: React.FC<ModelProps> = ({ url, rotation = [0, 0, 0], position = [0, 0, 0], scale = [1, 1, 1] }) => {
    const { scene } = useGLTF(url);
    const groupRef = useRef<Group>(null);
    const modelRef = useRef<Group>(null);

    useEffect(() => {
        if (modelRef.current) {
            const box = new Box3().setFromObject(modelRef.current);
            const center = box.getCenter(new Vector3());
            modelRef.current.position.sub(center); // Center the model
            if (groupRef.current) {
                groupRef.current.position.copy(center); // Move group to center position
            }
            modelRef.current.traverse((child) => {
                if (child instanceof Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [scene]);

    console.log('Model loaded:', scene);

    return (
        <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
            <primitive object={scene as Group} ref={modelRef} />
        </group>
    );
};

export default Model;
