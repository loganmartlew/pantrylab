import { clientConfig } from '@pantrylab/config/client';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: clientConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
