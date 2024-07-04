import React from 'react';
import './RotationButtons.css';

type RotationButtonsProps = {
    onRotateStart: (direction: 'up' | 'down' | 'left' | 'right') => void;
    onRotateStop: () => void;
};

const RotationButtons: React.FC<RotationButtonsProps> = ({ onRotateStart, onRotateStop }) => {
    return (
        <div className="rotation-buttons">
            <button
                className="up"
                onMouseDown={() => onRotateStart('up')}
                onMouseUp={onRotateStop}
                onTouchStart={() => onRotateStart('up')}
                onTouchEnd={onRotateStop}
            >
                &uarr;
            </button>
            <div className="horizontal-buttons">
                <button
                    className="left"
                    onMouseDown={() => onRotateStart('left')}
                    onMouseUp={onRotateStop}
                    onTouchStart={() => onRotateStart('left')}
                    onTouchEnd={onRotateStop}
                >
                    &larr;
                </button>
                <button
                    className="right"
                    onMouseDown={() => onRotateStart('right')}
                    onMouseUp={onRotateStop}
                    onTouchStart={() => onRotateStart('right')}
                    onTouchEnd={onRotateStop}
                >
                    &rarr;
                </button>
            </div>
            <button
                className="down"
                onMouseDown={() => onRotateStart('down')}
                onMouseUp={onRotateStop}
                onTouchStart={() => onRotateStart('down')}
                onTouchEnd={onRotateStop}
            >
                &darr;
            </button>
        </div>
    );
};

export default RotationButtons;
