import React, { useState, useRef, useEffect } from 'react';
import "./ThrustButton.css";

type ThrustButtonProps = {
    startThrust: () => void;
    stopThrust: () => void;
    toggleThrust: () => void;
    isThrusting: boolean;
};

const ThrustButton: React.FC<ThrustButtonProps> = ({
    startThrust,
    stopThrust,
    toggleThrust,
    isThrusting
}) => {
    const [isLongPress, setIsLongPress] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseDown = () => {
        startThrust();
        timeoutRef.current = setTimeout(() => {
            setIsLongPress(true);
            toggleThrust();
        }, 3000); // 3 seconds
    };

    const handleMouseUp = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (!isLongPress) {
            stopThrust();
        } else {
            toggleThrust();
        }
        setIsLongPress(false);
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
    }, []);

    return (
        <button
            className="thrust-button"
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
