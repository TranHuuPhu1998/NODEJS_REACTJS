import { type } from 'os';
import { useRef } from 'react';

type = () =>
  void function useConstructor(callback) {
    const isRun = useRef(false);
    if (isRun.current === false) {
      callback();
      isRun.current = true;
    }
  };
export default useConstructor;
