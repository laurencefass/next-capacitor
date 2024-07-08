// store/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { signal } from "@preact/signals-react";
import { ReduxState } from "@/store";

export const counterSignal = signal(0);

export const signalSlice = createSlice({
  name: "signal",
  initialState: {
    counterSignal: counterSignal,
    counterState: 0,
  },
  reducers: {
    incrementSignal: (state) => {
      state.counterSignal.value += 1;
      //   return counterSignal.value;
    },
    decrementSignal: (state) => {
      state.counterSignal.value -= 1;
      //   return counterSignal.value;
    },
    incrementState: (state) => {
      state.counterState += 1;
    },
    decrementState: (state) => {
      state.counterState -= 1;
    },
  },
});

export const {
  incrementSignal,
  decrementSignal,
  incrementState,
  decrementState,
} = signalSlice.actions;

export const CounterReducer = signalSlice.reducer;

export const selectCounterState = (state: ReduxState) => state.counter.counterState
