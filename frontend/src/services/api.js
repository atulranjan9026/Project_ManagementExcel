import axios from "axios";
import { toast } from "react-toastify";

// const API_URL = "https://atulranjan9026-project-managementexcel.onrender.com/api"; // Ensure the correct API URL
const API_URL = "http://localhost:5000/api"; // Ensure the correct API URL

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch projects:", error);
    throw error;
  }
};

export const addProject = async (payload) => {
  const response = await axios.post(`${API_URL}/add-task`, payload);
  return response.data;
};

export const editProject = async (id, payload) => {
  const response = await axios.put(`${API_URL}/edit-task/${id}`, payload);
  return response.data;
};

export const deleteProject = async (id) => {
  await axios.delete(`${API_URL}/delete-task/${id}`);
};

export const downloadPdf = async (id) => {
  const response = await axios.get(`${API_URL}/download-pdf/${id}`, {
    responseType: "blob",
  });
  return response.data;
};

export const downloadWord = async (id) => {
  const response = await axios.get(`${API_URL}/download-word/${id}`, {
    responseType: "blob",
  });
  return response.data;
};

export const uploadFile = async (file, taskId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('taskId', taskId);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
