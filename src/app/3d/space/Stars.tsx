import React, { useMemo } from 'react';
import { Float32BufferAttribute, BufferGeometry, PointsMaterial, Points } from 'three';

export const Stars: React.FC = () => {
    const starGeo = useMemo(() => {
        const geometry = new BufferGeometry();
        const positions = new Float32Array(100 * 3);
        const colors = new Float32Array(100 * 3);

        for (let i = 0; i < 100; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

            colors[i * 3] = Math.random();
            colors[i * 3 + 1] = Math.random();
            colors[i * 3 + 2] = Math.random();
        }

        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
        return geometry;
    }, []);

    const material = new PointsMaterial({ size: 0.5, vertexColors: true });

    return <points geometry={starGeo} material={material} />;
};

export default Stars;
