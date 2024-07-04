import React from 'react';
import { Sphere, useTexture } from '@react-three/drei';

interface TexturedSphereProps {
    url: string;
    args: [number, number, number];
    position: [number, number, number];
}

export const TexturedSphere: React.FC<TexturedSphereProps> = ({ url, args, position }) => {
    const texture = useTexture(url);

    return (
        <Sphere args={args} position={position} receiveShadow castShadow>
            <meshStandardMaterial attach="material" map={texture} />
        </Sphere>
    );
};
