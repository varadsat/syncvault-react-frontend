import axios from 'axios';
import type { LoginRequest, SignupRequest, AuthResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await authApi.post('/auth/login', credentials);
    return response.data;
  },

  // Signup user
  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await authApi.post('/auth/signup', userData);
    return response.data;
  },

  // Store token in localStorage
  setToken: (token: string) => {
    localStorage.setItem('syncvault_token', token);
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('syncvault_token');
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem('syncvault_token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('syncvault_token');
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('syncvault_token');
    window.location.href = '/login';
  },
};

export default authService; 