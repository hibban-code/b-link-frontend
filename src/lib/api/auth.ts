import { api } from './client';
import { User, AuthResponse, LoginCredentials, RegisterData } from '@/types/user';

export const authApi = {
  register: async (data: RegisterData) => {
    return api.post<AuthResponse>('/auth/register', data);
  },

  login: async (credentials: LoginCredentials) => {
    return api.post<AuthResponse>('/auth/login', credentials);
  },

  logout: async () => {
    return api.post('/auth/logout');
  },

  me: async () => {
    return api.get<User>('/auth/me');
  },
};
