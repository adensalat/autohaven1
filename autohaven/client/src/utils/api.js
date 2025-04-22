import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')).token
    }`;
  }
  return req;
});

export const fetchCars = (filters) => API.get('/cars', { params: filters });
export const fetchCar = (id) => API.get(`/cars/${id}`);
export const createCar = (newCar) => API.post('/cars', newCar);
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);