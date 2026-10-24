import { useEffect, useState } from "react";

export function useDebounceState<T = unknown>(v: T, delay: number = 500) {
  const [debounceValue, setDebounceValue] = useState(v);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(v);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [v]);

  return debounceValue;
}
