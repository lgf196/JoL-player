import { useReducer } from 'react';

const useMandatoryUpdate = () => {
  const [, forceUpdate] = useReducer((v) => v + 1, 0);

  return forceUpdate;
};

export default useMandatoryUpdate;
