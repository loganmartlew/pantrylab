'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { httpAuthClient } from '../httpClient';
import { LoginEntity } from '@pantrylab/auth/server';

export const useHttp = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const reqIntercept = httpAuthClient.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    const resIntercept = httpAuthClient.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevReq = err.config;

        if (err.response?.status === 401 && !prevReq.sent) {
          prevReq.sent = true;

          const res = await httpAuthClient.get<LoginEntity>('/auth/refresh');

          if (session) {
            session.accessToken = res.data.accessToken;
          }

          prevReq.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return httpAuthClient(prevReq);
        }

        return Promise.reject(err);
      }
    );

    return () => {
      httpAuthClient.interceptors.request.eject(reqIntercept);
      httpAuthClient.interceptors.response.eject(resIntercept);
    };
  }, []);

  return httpAuthClient;
};
