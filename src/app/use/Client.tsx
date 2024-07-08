'use client'

import { Suspense, useEffect } from "react";
import { Child } from "./ClientChild";

export function Parent() {
  useEffect(() => {
    console.log("Parent");
  }, []);
  return (
    <div>
      <h1>Parent (client component using Suspense)</h1>
      <Suspense fallback={<div>Loading client component...</div>}>
        <Child />
      </Suspense>
    </div>
  );
}
