// ♻️ Reusable: Single Axios instance — all services import from here
import axios from 'axios';

// log environment variable for debugging
console.log('API base URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

// request logging
api.interceptors.request.use(cfg => {
  console.log(`Request -> ${cfg.method.toUpperCase()} ${cfg.baseURL}${cfg.url}`, cfg.data);
  return cfg;
});
// response logging
api.interceptors.response.use(
  res => {
    console.log(`Response <- ${res.config.url}`, res.data);
    return res;
  },
  err => {
    console.warn('API error', err);
    return Promise.reject(err);
  }
);

// Attach JWT automatically to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally — redirect to login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;