import { useState, useEffect } from "react";
export interface useWindowSizeType {
  clientX: number;
  clientY: number;
  [prs: string]: any;
}

const useWindowClient = (): useWindowSizeType => {
  const [windowDistance, setWindowDistance] = useState<useWindowSizeType>({
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    function handle(e: MouseEvent) {
      setWindowDistance((pre) => {
        return {
          clientX: e.clientX,
          clientY: e.clientY,
        };
      });
    }
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return { ...windowDistance };
};
export default useWindowClient;
