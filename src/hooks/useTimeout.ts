import { useEffect, useRef } from "react";
import { getValues } from "../utils";

export const useTimeout = <T extends Record<string, unknown>>(states: T = {} as T) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const statesRef = useRef<T>(states);

  const createTimeout = (callback: (upToDateStates: T) => void, ms: number) => {
    removeTimeout();
    timeoutRef.current = setTimeout(() => callback(statesRef.current), ms);
  };

  const removeTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    statesRef.current = states;
  }, [...getValues(states)]);

  return { createTimeout, removeTimeout };
};
