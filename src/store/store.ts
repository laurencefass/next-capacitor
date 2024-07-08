import { 
  configureStore,
  type ThunkAction,
  type Action
} from "@reduxjs/toolkit";

import { reducer } from "./reducer";

import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

// using this method state is restored between HMR reloads
export const makeStore = () => {
  const store = configureStore({
    reducer,
    // add middleware here: see nextrtk 
  });
  return store;
};

export type ReduxStore = ReturnType<typeof makeStore>;
export type ReduxState = ReturnType<ReduxStore["getState"]>;
export type ReduxDispatch = ReduxStore["dispatch"];

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
