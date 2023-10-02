import { contract, formatHeaders } from '@pantrylab/api/interface';
import { clientConfig } from '@pantrylab/config/client';
import { initQueryClient } from '@ts-rest/react-query';
import { useHttp } from './useHttp';

export const useApi = () => {
  const httpClient = useHttp();

  const client = initQueryClient(contract, {
    baseUrl: clientConfig.apiUrl,
    baseHeaders: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    api: async ({ path, method, headers, body }) => {
      const result = await httpClient.request({
        method: method,
        url: path,
        headers: headers,
        data: body,
      });

      return {
        status: result.status,
        body: result.data,
        headers: formatHeaders(result.headers),
      };
    },
  });

  return client;
};
