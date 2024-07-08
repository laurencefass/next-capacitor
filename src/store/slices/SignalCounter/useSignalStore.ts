import { useSignal } from "@preact/signals-react";
import { counterSignal } from "./signalSlice";

export const useSignalStore = () => {
  const count = useSignal(counterSignal);
  return { count };
};
