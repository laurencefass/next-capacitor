import React, { useEffect, useState, useRef, useCallback } from 'react';
import "./ThrustButton.css";

type ThrustButtonProps = {
    startThrust: () => void;
    stopThrust: () => void;
    toggleAutoThrust: () => void;
    isThrusting: boolean;
};

const ThrustButton: React.FC<ThrustButtonProps> = ({ startThrust, stopThrust, toggleAutoThrust, isThrusting }) => {
    const [tapCount, setTapCount] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSingleTap = useCallback(() => {
        setTapCount((prev) => {
            if (prev === 1) {
                toggleAutoThrust();
                return 0;
            }
            return 1;
        });

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setTapCount(0);
        }, 300);
    }, [toggleAutoThrust]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleClick = () => {
        if (isThrusting) {
            stopThrust();
        } else {
            startThrust();
        }
    };

    const handleMouseDown = () => {
        startThrust();
    };

    const handleMouseUp = () => {
        stopThrust();
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                handleMouseDown();
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                handleMouseUp();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleMouseDown, handleMouseUp]);

    return (
        <button
            className="thrust-button"
            onClick={handleSingleTap}
            onDoubleClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            style={{
                backgroundColor: isThrusting ? 'red' : '#894cd9',
            }}
        >
            Thrust
        </button>
    );
};

export default ThrustButton;
