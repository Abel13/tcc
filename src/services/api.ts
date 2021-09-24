import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://127.0.0.1:8080',
  baseURL: 'https://sheep-finance.herokuapp.com',
});

export default api;
