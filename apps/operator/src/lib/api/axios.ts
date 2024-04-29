'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
  timeout: 50000, // request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.error('error: ', error.response.status, error.request.path);
    return Promise.reject(error);
  }
);
