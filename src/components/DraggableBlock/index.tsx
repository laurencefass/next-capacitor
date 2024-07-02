'use client'

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import './styles.css';

export const DraggableBlock: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [visible, setVisible] = useState(false);
    const [{ x }, api] = useSpring(() => ({ x: -window.innerWidth + 50 }));

    const bind = useDrag(({ down, movement: [mx], distance: [distX], direction: [dx] }) => {
        setIsDragging(down);

        if (down) {
            // Move the block as the user drags
            api.start({ x: visible ? Math.min(mx, 0) : Math.max(mx, -window.innerWidth + 50) });
        } else {
            // Opening logic
            if (!visible && distX > window.innerWidth * 0.2 && dx > 0) {
                setVisible(true);
                api.start({ x: 0 });
            } else if (!visible) {
                // Snap back to hidden position if not dragged enough
                api.start({ x: -window.innerWidth + 50 });
            } else if (visible && mx < -window.innerWidth * 0.2) {
                // Snap to hidden position if dragged back beyond 20%
                setVisible(false);
                api.start({ x: -window.innerWidth + 50 });
            } else {
                // Snap back to open position if not dragged enough
                api.start({ x: 0 });
            }
        }
    });

    useEffect(() => {
        const handleResize = () => {
            if (!visible) {
                api.start({ x: -window.innerWidth + 50 });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [visible]);

    return (
        <div className="drag-container">
            <animated.div
                {...bind()}
                className={`draggable ${isDragging ? 'dragging' : ''}`}
                style={{ transform: x.to((x) => `translate3d(${x}px, 0, 0)`), touchAction: 'none' }}
            >
                Drag me
            </animated.div>
        </div>
    );
};
