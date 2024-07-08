'use client'

import { use, useEffect } from "react";
import sleep from "./sleep";

export function Child() {
  useEffect(() => {
    console.log("Child");
  }, []);

  // Using the value returned from the sleep function
  const result = use(sleep(2000));
  console.log("result", result);
  return <>
    <h2>React client component</h2>
    <div>Finished waiting for {result} milliseconds.</div>
  </>;
}
