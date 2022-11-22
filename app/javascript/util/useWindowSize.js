import { useLayoutEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  const [debounced, setDebounced] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useDebounce(() => setDebounced(size), 100, [size]);
  return debounced;
};
