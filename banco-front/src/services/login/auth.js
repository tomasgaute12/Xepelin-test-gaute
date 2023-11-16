import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const login = async (credentials) => {
    try {
        console.log("Im here in login");
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username: credentials.usuario,
        password: credentials.contraseña
      });
      console.log("respoinse:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };