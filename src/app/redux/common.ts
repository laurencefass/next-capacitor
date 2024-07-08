import { useState, useEffect } from "react";

export const randomNumber = () => Math.random().toFixed(4);

export const useIsClient = () => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  return client;
};
