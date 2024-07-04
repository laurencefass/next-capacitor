'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import './styles.css';

const MARGIN_OFFSET = 0;

type DrawerProps = {
    children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ children }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [visible, setVisible] = useState(false);
    const [{ x }, api] = useSpring(() => ({ x: -window.innerWidth + MARGIN_OFFSET }));
    const dragStarted = useRef(false);

    const bind = useDrag(({ down, movement: [mx], distance: [distX], direction: [dx], cancel }) => {
        setIsDragging(down);
        console.log("useDrag");

        if (down) {
            // Move the block as the user drags
            console.log("dragging started");
            dragStarted.current = true;
            api.start({ x: visible ? Math.min(mx, 0) : Math.max(mx, -window.innerWidth + MARGIN_OFFSET) });
        }

        if (!down && dragStarted.current) {
            // Opening logic
            if (!visible) {
                if (distX > window.innerWidth * 0.2 && dx > 0) {
                    setVisible(true);
                    api.start({ x: 0 });
                } else {
                    // Snap back to hidden position if not dragged enough
                    api.start({ x: -window.innerWidth + MARGIN_OFFSET });
                }
            }

            // Closing logic
            if (visible) {
                if (mx < -window.innerWidth * 0.2) {
                    // Snap to hidden position if dragged back beyond 20%
                    setVisible(false);
                    api.start({ x: -window.innerWidth + MARGIN_OFFSET });
                } else {
                    // Snap back to open position if not dragged enough
                    api.start({ x: 0 });
                }
            }
            dragStarted.current = false;
        }
    });

    useEffect(() => {
        const handleResize = () => {
            if (!visible) {
                api.start({ x: -window.innerWidth + MARGIN_OFFSET });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [visible]);

    return (
        <div className="drag-container">
            <div className="drag-edge" {...bind()} />
            <animated.div
                {...bind()}
                className={`draggable ${isDragging ? 'dragging' : ''}`}
                style={{ transform: x.to((x) => `translate3d(${x}px, 0, 0)`), touchAction: 'none' }}
                onClick={(e) => {
                    console.log("onClick");
                    if (!dragStarted.current) e.preventDefault(); // Prevent default click behavior unless it was a drag
                }}
            >
                {children}
            </animated.div>
        </div>
    );
};
