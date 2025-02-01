const API_URL = "https://atulranjan9026-project-managementexcel.onrender.com"; // Updated backend URL

export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
};

export const addProject = async (payload) => {
  const response = await fetch(`${API_URL}/add-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to add project");
  return response.json();
};

export const editProject = async (id, payload) => {
  const response = await fetch(`${API_URL}/edit-task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to edit project");
  return response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/delete-task/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete project");
};

export const downloadExcel = async () => {
  const response = await fetch(`${API_URL}/download-excel`, {
    method: "GET",
    headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  });
  if (!response.ok) throw new Error("Failed to download Excel");
  return response.blob(); // Return file as blob
};
