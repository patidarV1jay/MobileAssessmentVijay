import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://gutendex.careers.ignitesol.com',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.log(
        'API Error:',
        error.response.status,
        error.response.data,
      );
    } else if (error.request) {
      console.log('Network Error:', error.message);
    } else {
      console.log('Request Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;