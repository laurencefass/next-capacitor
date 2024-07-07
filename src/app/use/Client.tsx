"use client";

import { Suspense, use } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Child() {
  // Using `use()` to await the sleep promise and specify its type
  const result = use(sleep(5000)) as number;
  return <div>Finished waiting for {result} milliseconds.</div>;
}

export function Parent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Child />
      </Suspense>
    </div>
  );
}
