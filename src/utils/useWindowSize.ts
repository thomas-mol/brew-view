import { useState, useEffect } from "react";

interface windowSize {
  width: number;
  height: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};

export default useWindowSize;
