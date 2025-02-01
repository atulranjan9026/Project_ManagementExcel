import axios from "axios";

const API_URL = "https://atulranjan9026-project-managementexcel.onrender.com/api"; // Updated backend URL
// const API_URL = "localhost:5000/api"; // Updated backend URL

export const fetchProjects = async () => {
  const { data } = await axios.get(`${API_URL}/tasks`);
  return data;
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
  console.log(id);
  await axios.delete(`${API_URL}/delete-task/${id}`);
};

export const downloadExcel = async () => {
  const response = await axios.get(`${API_URL}/download-excel`, {
    responseType: "blob",
  });
  return response.data;
};
