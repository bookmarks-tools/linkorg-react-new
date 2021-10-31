import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

httpClient.interceptors.request.use(
  (originalRequest) => {
    originalRequest.headers['Authorization'] = `Bearer ${String(localStorage.getItem('accessToken')).replace(
      /['"]+/g,
      ''
    )}`;
    return originalRequest;
  },
  (err) => {
    return Promise.reject(err);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.statusCode === 401) {
      console.log('EXPIRED TOKEN!');
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
