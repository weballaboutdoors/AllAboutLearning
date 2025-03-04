import axios from 'axios';

const api = axios.create({
  baseURL: 'https://allaboutlearning-api-aab4440a7226.herokuapp.com/api',  // Your Flask backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await axios.post('https://allaboutlearning-api-aab4440a7226.herokuapp.com/api/login', credentials);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createAccount = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getDocuments = async () => {
  try {
    const response = await api.get('/documents');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api;