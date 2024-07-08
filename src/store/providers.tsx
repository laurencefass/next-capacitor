"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { ReduxStore, makeStore } from "./store";

interface ProviderWithStateProps {
  children: React.ReactNode;
  initialState?: any;
}

export const Providers: React.FC<ProviderWithStateProps> = ({ children, initialState }) => {
  const storeRef = useRef<ReduxStore | undefined>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};