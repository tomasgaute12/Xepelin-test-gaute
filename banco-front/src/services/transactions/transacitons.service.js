import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const createTransaction = async (transaction) => {
  try {
  
    const response = await axios.post(`${BASE_URL}/transactions`, transaction);
    console.log("response:", response.data);
    return response.data;
    } catch (error) {
      console.log("ERROR INSTA");
    throw error;
  }
};
