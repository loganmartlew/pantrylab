import { serverConfig } from '@pantrylab/config';
import { initClient } from '@ts-rest/core';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { getServerSession } from 'next-auth';
import { contract } from '../contract';
import { httpClient } from '../httpClient';
import { formatHeaders } from '../util';

export const getServerApiClient = async () => {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Session not found');
  }

  const { accessToken, refreshToken } = session;

  const client = initClient(contract, {
    baseUrl: serverConfig.apiUrl,
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    api: async ({ path, method, headers, body }) => {
      try {
        // Make request (1st attempt)
        const result = await httpClient.request({
          method: method,
          url: path,
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
          data: body,
        });

        // Success - Return result
        return {
          status: result.status,
          body: result.data,
          headers: formatHeaders(result.headers),
        };
      } catch (error) {
        // Handle non-axios errors
        if (!axios.isAxiosError(error)) throw error;

        const prevReq = error.config as
          | (InternalAxiosRequestConfig<unknown> & { sent: boolean })
          | undefined;

        if (!prevReq || prevReq.sent || error.response?.status !== 401) {
          const response = error.response;
          return {
            status: response?.status ?? 500,
            body: response?.data ?? {},
            headers: formatHeaders(response?.headers ?? {}),
          };
        }

        // Refresh the token
        prevReq.sent = true;

        const result = await httpClient.request({
          method: 'GET',
          url: `/auth/refresh`,
          params: {
            refreshToken,
          },
        });

        if (result.status !== 200) throw error;

        // Use the new access token
        const refreshData = contract.Auth.refresh.responses[200].safeParse(
          result.data,
        );

        if (!refreshData.success) throw error;

        prevReq.headers.Authorization = `Bearer ${refreshData.data.accessToken}`;

        // Update the session
        // TODO: Update the next-auth session - not currently possible in next-auth v4

        // Make request (2nd attempt)
        const secondResult = await httpClient.request(prevReq);

        if (secondResult.status < 200 || secondResult.status > 299) throw error;

        // Success - Return result
        return {
          status: secondResult.status,
          body: secondResult.data,
          headers: formatHeaders(secondResult.headers),
        };
      }
    },
  });

  return client;
};
