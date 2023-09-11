import axios from 'axios';

const baseUrl = 'http://localhost:3000/api';

const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const httpAuthClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { httpClient, httpAuthClient };
