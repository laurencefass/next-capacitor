export default function sleep(ms: number) {
  return new Promise<number>((resolve) => setTimeout(() => resolve(ms), ms));
}
