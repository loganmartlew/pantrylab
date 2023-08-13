import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { LoginCredentials } from '../../types';

export const tempCredentialsAtom = atom<LoginCredentials | null>(null);

const lifetime = 300_000; // 5 minutes

export const useTempCredentials = () => {
  const [tempCredentials, setTempCredentials] = useAtom(tempCredentialsAtom);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (tempCredentials) {
      timeout = setTimeout(() => {
        setTempCredentials(null);
      }, lifetime);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [tempCredentials, setTempCredentials]);

  return { credentials: tempCredentials, setCredentials: setTempCredentials };
};
