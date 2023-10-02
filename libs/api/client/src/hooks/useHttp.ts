'use client';

import { httpClient } from '@pantrylab/api/interface';
import { Credentials } from '@pantrylab/auth/interface';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useHttp = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const reqIntercept = httpClient.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err),
    );

    const resIntercept = httpClient.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevReq = err.config;

        if (err.response?.status === 401 && !prevReq.sent) {
          prevReq.sent = true;

          const res = await httpClient.get<Credentials>('/auth/refresh');

          if (session) {
            session.accessToken = res.data.accessToken;
          }

          prevReq.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return httpClient(prevReq);
        }

        return Promise.reject(err);
      },
    );

    return () => {
      httpClient.interceptors.request.eject(reqIntercept);
      httpClient.interceptors.response.eject(resIntercept);
    };
  }, []);

  return httpClient;
};
