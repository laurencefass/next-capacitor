'use client'

import { selectCounterState, useSignalStore } from "@/store";
import { useSelector } from "react-redux";
import { useIsClient } from "../common";

export default function Page() {
    const stateCount = useSelector(selectCounterState);
    const { count: signalCount } = useSignalStore();
    const client = useIsClient();

    return <>
            <h1>Redux verification</h1>
            <p>This page verifies that Redux state persists across routes when navigating the site</p>
            <div>signal count: {signalCount}</div>
            <div>state count: {stateCount}</div>    
    </>
};