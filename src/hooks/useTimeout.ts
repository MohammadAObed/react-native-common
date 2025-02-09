import { useRef } from "react";

export const useTimeout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createTimeout = (callback: () => void, ms: number) => {
    timeoutRef.current = setTimeout(callback, ms);
  };

  const removeTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { createTimeout, removeTimeout };
};
