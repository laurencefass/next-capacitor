import sleep from "./sleep";

export async function Child() {
    const result = await sleep(5000);
    console.log("result", result);
    return <>
        <h2>React Server component</h2>
        <div>Finished waiting for {result} milliseconds.</div>
    </>;
}