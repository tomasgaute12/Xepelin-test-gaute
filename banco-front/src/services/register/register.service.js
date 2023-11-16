import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const registerUser = async (credentials) => {
  try {
    
    const response = await axios.post(`${BASE_URL}/auth/register`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};