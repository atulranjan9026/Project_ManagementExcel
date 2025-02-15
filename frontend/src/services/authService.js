import axios from 'axios';

const API_URL = 'https://atulranjan9026-project-managementexcel.onrender.com';
// const API_URL = 'http://localhost:5000';

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
