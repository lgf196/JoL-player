import { useEffect, useRef } from 'react';

/**
 * @description 返回上一次的值
 */
const usePrevious = <T = unknown>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
export default usePrevious;
