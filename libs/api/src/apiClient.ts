import { initClient } from '@ts-rest/core';
import { contract } from './contract';

export const apiClient = initClient(contract, {
  baseUrl: 'http://localhost:3000/api',
  baseHeaders: {},
});
