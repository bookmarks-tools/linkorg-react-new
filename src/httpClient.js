import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

httpClient.interceptors.request.use(
  (originalRequest) => {
    originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    return originalRequest;
  },
  (err) => {
    return Promise.reject(err);
  }
);
