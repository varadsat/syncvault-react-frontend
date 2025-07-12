import axios, { type InternalAxiosRequestConfig, AxiosError } from 'axios';
import type { Snippet, CreateSnippetRequest, SnippetFilters } from '../types/snippet';
import type { Device } from '../types/device';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance with JWT interceptor
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to all requests
api.interceptors.request.use((config : InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('syncvault_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses (token expired/invalid)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('syncvault_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Device API functions
export const deviceApi = {
  // Get all user's devices
  getDevices: async (): Promise<Device[]> => {
    const response = await api.get('/devices');
    return response.data;
  },

  // Register a new device
  registerDevice: async (name: string): Promise<Device> => {
    const response = await api.post('/devices/register', { name });
    return response.data;
  },

  // Delete a device
  deleteDevice: async (id: string): Promise<void> => {
    await api.delete(`/devices/${id}`);
  },
};

// Snippet API functions
export const snippetApi = {
  // Get all snippets with optional filters
  getSnippets: async (filters?: SnippetFilters): Promise<Snippet[]> => {
    const params = new URLSearchParams();
    
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.deviceId) params.append('deviceId', filters.deviceId);
    
    const response = await api.get(`/snippets?${params.toString()}`);
    return response.data;
  },

  // Get a specific snippet by ID
  getSnippet: async (id: string): Promise<Snippet> => {
    const response = await api.get(`/snippets/${id}`);
    return response.data;
  },

  // Create a new snippet
  createSnippet: async (snippet: CreateSnippetRequest): Promise<Snippet> => {
    const response = await api.post('/snippets', snippet);
    return response.data;
  },

  // Delete a snippet
  deleteSnippet: async (id: string): Promise<void> => {
    await api.delete(`/snippets/${id}`);
  },
};

export default api; 