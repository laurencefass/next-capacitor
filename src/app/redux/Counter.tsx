'use client';

import { decrementSignal, incrementSignal, incrementState, decrementState, useSignalStore, selectCounterState } from '@/store/slices/SignalCounter';
import { useDispatch, useSelector, ReduxState } from "@/store/store"

import React from 'react';
import { randomNumber, useIsClient } from './common';

import "./Counter.scss";

export function Spaces({count}: {count: number}) {
    const spaces = '\u00A0'.repeat(count);
    return <span>{spaces}</span>;
};


const SubscribeChild: React.FC = () => {
    const client = useIsClient();

    return <>
        <hr/>
            <div className="bordered">
            <h3>SubscribeChild: {client && randomNumber()}</h3>
            <p>This component is not subscribed to redux counter updates</p>
        </div>
    </>
};

const Subscribe: React.FC = () => {
    const stateCount = useSelector(selectCounterState);
    const { count: signalCount } = useSignalStore();
    const client = useIsClient();

    return (
        <div className="bordered">
            <h3>Subscriber: {client && randomNumber()}</h3>
            <p>This component has no inputs and is subscribed to redux counter updates</p>
            <div>signal count: {signalCount}</div>
            <div>state count: {stateCount}</div>
            <SubscribeChild/>
        </div>
    );
};


const Publish: React.FC = () => {
    const client = useIsClient();
    const dispatch = useDispatch();

    return (
        <div className = "counter bordered">  
            <h3>Publisher: {client && randomNumber()}</h3>
            <h3>Signal Counter</h3>
            <button onClick={() => dispatch(decrementSignal())}>Decrement Signal</button>
            <button onClick={() => dispatch(incrementSignal())}>Increment Signal</button>

            <h3>State Counter</h3>
            <button onClick={() => dispatch(decrementState())}>Decrement State</button>
            <button onClick={() => dispatch(incrementState())}>Increment State</button>
        </div>
    );
}

export function Counter() {
    return <>
        <Publish />
        <hr/>
        <Subscribe />
    </>
}