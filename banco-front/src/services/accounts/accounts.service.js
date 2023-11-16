import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const createAccount = async (account) => {
  try {
    const response = await axios.post(`${BASE_URL}/accounts`, account);
    return response.data;
    } catch (error) {
    throw error;
  }
};


export const getUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/accounts/${username}`);
    return response.data;
    } catch (error) {
    throw error;
  }
};