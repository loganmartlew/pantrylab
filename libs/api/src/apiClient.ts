import { initClient } from '@ts-rest/core';
import { contract } from './contract';

export const baseUrl = 'http://localhost:3000/api';

export const apiBasicClient = initClient(contract, {
  baseUrl,
  baseHeaders: {},
  credentials: 'include',
});
