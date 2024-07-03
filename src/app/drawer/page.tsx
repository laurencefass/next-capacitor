'use client'

import { Drawer } from "@/components/Drawer";
import "./styles.css";
import { useState } from "react";

export default function Page() {
    const [count, setCount] = useState(0);
    return <>
        <div className="drawer-page">
            <h1>Draggable block demonstration</h1>
            <h2>Swipe from the left to reveal an interactive drawer</h2>
            <p>Check this page is still interactive</p>
            <button onClick={() => setCount(count => count + 1)}>Increment</button>
            <div>count: {count}</div>
        </div>
        <Drawer>
            <div className="drawer-page">
                <h1>This is an interactive draggable drawer!</h1>
                <button onClick={() => setCount(count => count + 1)}>Increment</button>
                <div>count: {count}</div>
            </div>
        </Drawer>

    </>
}