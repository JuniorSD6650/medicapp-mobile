import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Si el token expiró (401), cerrar sesión
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      // Aquí podrías navegar al login
    }
    return Promise.reject(error);
  }
);

export default api;
