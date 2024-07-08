import { Suspense } from "react";
import { Parent } from "./Client";
import { Child } from "./ServerChild";

export default function Page() {
    return <>
        <h1>Client and Server component Suspense loading demos</h1>
        <Parent />
        <h1>Suspense already &lsquo;just works&rsquo; for async Server components</h1>
        <Suspense fallback={<div>Loading RSC component...</div>}>
            <Child />
        </Suspense>

        <h1>Explanation</h1>
        <h2>React now has consistent suspense integration for client and server component data handling</h2>
        <p>This page loads a client component which loads a suspense wrapped Child implementing use()</p>
        <p>It also loads an Suspense wrapped async server component</p>
        <p>Effectively these two are now equivalent:</p>
        <ul>
            <li>In the client component: const result = use(sleep(2000));</li>
            <li>In the async client component: const result = await sleep(5000);</li>
        </ul>
        <h1>Client Suspense handling before use()</h1>
        <p>Before use() components needed to throw a promise to trigger suspense, now they can just wrap promise returning functions in use() which hides the implementation</p>
        <p>All of this has been replaced with use();</p>
        <code><pre>{`
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(() => {
                resolve(ms);
                }, ms);
            });
        }
        `}</pre></code>
        <code><pre>{`
        let sleepPromise = null;

        function suspend(ms) {
        if (!sleepPromise) {
            sleepPromise = sleep(ms).then((result) => {
            sleepPromise = null;
            return result;
            });
        }
        throw sleepPromise;
        }
        `}</pre></code>
        <code><pre>{`
        import React, { Suspense } from 'react';

        function SleepComponent({ ms }) {
            const result = suspend(ms);
            return <div>Finished waiting for {result} milliseconds.</div>;
        }

        export default function App() {
            return (
                <div>
                <h1>My App</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <SleepComponent ms={2000} />
                </Suspense>
                </div>
            );
        }
        `}</pre></code>
    </>
}