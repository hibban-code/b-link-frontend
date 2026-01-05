import axios, { AxiosError } from 'axios';
import { APIError, APIResponse } from '@/types/api';
import { getSessionId } from '@/lib/utils/session';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // Add session ID
      config.headers['X-Session-ID'] = getSessionId();
      
      // Add auth token if exists
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<APIError>) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, config?: any) =>
    apiClient.get<APIResponse<T>>(url, config).then((res) => res.data),
  
  post: <T>(url: string, data?: any, config?: any) =>
    apiClient.post<APIResponse<T>>(url, data, config).then((res) => res.data),
  
  put: <T>(url: string, data?: any, config?: any) =>
    apiClient.put<APIResponse<T>>(url, data, config).then((res) => res.data),
  
  delete: <T>(url: string, config?: any) =>
    apiClient.delete<APIResponse<T>>(url, config).then((res) => res.data),
};
