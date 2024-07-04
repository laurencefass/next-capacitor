import React from 'react';

type DirectionButtonProps = {
    onMoveStart: (axis: 'x' | 'y' | 'z', direction: 1 | -1) => void;
    onMoveStop: () => void;
};

const DirectionButtons: React.FC<DirectionButtonProps> = ({ onMoveStart, onMoveStop }) => {
    return (
        <div className="direction-buttons">
            <button
                onMouseDown={() => onMoveStart('x', 1)}
                onMouseUp={onMoveStop}
                onTouchStart={() => onMoveStart('x', 1)}
                onTouchEnd={onMoveStop}
            >
                +X
            </button>
            <button
                onMouseDown={() => onMoveStart('x', -1)}
                onMouseUp={onMoveStop}
                onTouchStart={() => onMoveStart('x', -1)}
                onTouchEnd={onMoveStop}
            >
                -X
            </button>
            <button
                onMouseDown={() => onMoveStart('y', 1)}
                onMouseUp={onMoveStop}
                onTouchStart={() => onMoveStart('y', 1)}
                onTouchEnd={onMoveStop}
            >
                +Y
            </button>
            <button
                onMouseDown={() => onMoveStart('y', -1)}
                onMouseUp={onMoveStop}
                onTouchStart={() => onMoveStart('y', -1)}
                onTouchEnd={onMoveStop}
            >
                -Y
            </button>
            <button
                onMouseDown={() => onMoveStart('z', 1)}
                onMouseUp={onMoveStop}
                onTouchStart={() => onMoveStart('z', 1)}
                onTouchEnd={onMoveStop}
            >
                +Z
            </button>
            <button
                onMouseDown={() => onMoveStart('z', -1)}
                onMouseUp={onMoveStop}
                onTouchStart={() => onMoveStart('z', -1)}
                onTouchEnd={onMoveStop}
            >
                -Z
            </button>
        </div>
    );
};

export default DirectionButtons;
