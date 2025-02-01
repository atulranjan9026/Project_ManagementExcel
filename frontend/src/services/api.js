import axios from "axios";

// const API_URL = "https://atulranjan9026-project-managementexcel.onrender.com"; // Updated backend URL
const API_URL = "localhost:5000"; // Updated backend URL

export const fetchProjects = async () => {
  const { data } = await axios.get(`${API_URL}/api/tasks`);
  return data;
};

export const addProject = async (payload) => {
  const response = await axios.post(`${API_URL}/api/add-task`, payload);
  return response.data;
};

export const editProject = async (id, payload) => {
  const response = await axios.put(`${API_URL}/api/edit-task/${id}`, payload);
  return response.data;
};

export const deleteProject = async (id) => {
  await axios.delete(`${API_URL}/api/delete-task/${id}`);
};

export const downloadExcel = async () => {
  const response = await axios.get(`${API_URL}/api/download-excel`, {
    responseType: "blob",
  });
  return response.data;
};
