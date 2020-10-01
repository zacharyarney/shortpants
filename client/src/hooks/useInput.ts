import { useState, ChangeEvent } from 'react';

type useInputTuple = [string, (e: ChangeEvent<HTMLInputElement>) => void];

export const useInput = (initialVal = ''): useInputTuple => {
  // takes in initial value using useState
  const [value, setValue] = useState(initialVal);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return [value, handleChange];
};
