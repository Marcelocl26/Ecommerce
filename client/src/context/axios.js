import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base para todas las solicitudes
  timeout: 5000, // Tiempo de espera de 5 segundos
});

export default instance;
