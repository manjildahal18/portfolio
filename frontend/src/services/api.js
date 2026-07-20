import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors or handle standard responses (e.g. redirect on auth failure if needed)
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
