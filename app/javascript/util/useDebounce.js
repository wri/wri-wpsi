import { useEffect } from "react";
import { useTimeoutFn } from "./useTimeoutFn";

// export type UseDebounceReturn = [() => boolean | null, () => void];

export function useDebounce(fn, ms = 0, deps = []) {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);
  return [isReady, cancel];
}
