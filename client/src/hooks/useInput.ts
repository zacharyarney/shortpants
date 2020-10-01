import { useState, ChangeEvent } from 'react';

type useInputTuple = [string, (e: ChangeEvent<HTMLInputElement>) => void];

export const useInput = (initialVal = ''): useInputTuple => {
  // takes in initial value using useState
  const [value, setValue] = useState(initialVal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  // can also use const assertion instead of defining the output type
  // i.e. return [value, handlChange] as const;
  return [value, handleChange];
};
