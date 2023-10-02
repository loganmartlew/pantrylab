import { serverConfig } from '@pantrylab/config';
import { initClient } from '@ts-rest/core';
import { contract } from '../contract';

export const apiBasicClient = initClient(contract, {
  baseUrl: serverConfig.apiUrl,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
