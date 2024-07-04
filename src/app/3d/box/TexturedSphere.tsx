import { Sphere, useTexture } from '@react-three/drei';

export const TexturedSphere: React.FC<{ url: string }> = ({ url }) => {
    const texture = useTexture(url); // Replace with your texture path

    return (
        <Sphere args={[500, 32, 32]} position={[0, -520, 0]} receiveShadow castShadow>
            <meshStandardMaterial attach="material" map={texture} />
        </Sphere>
    );
};