// modified version to support json https://github.com/dance2die/react-use-localstorage/blob/master/src/index.ts

import { Dispatch, useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | string = ''): [T, Dispatch<T>] {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setItem = (newValue: string | T) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    const newValue = window.localStorage.getItem(key);
    if (JSON.stringify(value) !== newValue) {
      setValue(newValue || initialValue);
    }
  });

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key === key && event.newValue !== value) {
        setValue(event.newValue || initialValue);
      }
    },
    [value]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [value, setItem];
}
