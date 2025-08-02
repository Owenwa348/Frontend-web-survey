// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // ชี้ไปยัง backend NestJS
  withCredentials: true,
});

export default api;
