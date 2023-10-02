import { serverConfig } from '@pantrylab/config';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: serverConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
