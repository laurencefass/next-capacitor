'use client'

import React, { useState, useEffect } from 'react';

export const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Checking React is working...</h2>
            <h3>React Counter: {count}</h3>
        </div>
    );
};
