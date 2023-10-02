import { contract } from '@pantrylab/api/interface';
import { clientConfig } from '@pantrylab/config/client';
import { initClient } from '@ts-rest/core';

export const apiBasicClient = initClient(contract, {
  baseUrl: clientConfig.apiUrl,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
