import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ProjectForm from "../components/ProjectForm";
import ProjectTable from "../components/ProjectTable";
import { fetchProjects, addProject, editProject, deleteProject, downloadPdf, downloadWord, uploadFile } from "../services/api";
import { formatDate } from "../utils/dateFormatter";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    affectedHosts: "",
    cve: "",
    description: "",
    input: "",
    reference: "",
    mitigation: "",
  });

  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
    }).catch((error) => {
      toast.error(
        error.response?.data?.message || "Failed to fetch projects. Please try again."
      );
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = async (file, status) => {
    const payload = { ...newProject, status };
    try {

      if (file) {
        const uploadResponse = await uploadFile(file);
        console.log("uploadResponse:", uploadResponse);
        payload.file = uploadResponse.file;
      }
      await addProject(payload);
      const data = await fetchProjects();
      setProjects(data);
      setNewProject({
        affectedHosts: "",
        cve: "",
        description: "",
        input: "",
        reference: "",
        mitigation: "",
      });
      toast.success("Project added successfully!"); // Success toast
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add project. Please try again."
      );
      console.error("Error:", error);
    }
  };

  const handleSaveEditProject = async (file, status) => {
    const updatedProject = { ...editingProject, status };

    try {
      if (file) {
        const uploadResponse = await uploadFile(file);
        updatedProject.file = uploadResponse.file;
      }
      await editProject(editingProject._id, updatedProject);
      const data = await fetchProjects();
      setProjects(data);
      setEditingProject(null);
      toast.success("Project updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update project. Please try again."
      );
    }
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    const data = await fetchProjects();
    setProjects(data);
    toast.warn("Project deleted successfully!");
  };

  const handleDownloadPdf = async () => {
    try {
      const blob = await downloadPdf();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tasks.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log("Error downloading the file", err);
    }
  };

  const handleDownloadWord = async () => {
    try {
      const blob = await downloadWord();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tasks.docx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log("Error downloading the file", err);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="container">
      <ProjectForm
        newProject={newProject}
        editingProject={editingProject}
        handleChange={handleChange}
        handleEditChange={handleEditChange}
        addProject={handleAddProject}
        saveEditProject={handleSaveEditProject}
      />
      <ProjectTable
        projects={projects}
        formatDate={formatDate}
        startEditProject={(project) => {
          setEditingProject(project);
          toast.info("You can now edit the project details.");
        }}
        deleteProject={handleDeleteProject}
      />
      {/* <Button variant="success" onClick={handleDownloadPdf}>
        Download PDF
      </Button>
      <Button variant="success" onClick={handleDownloadWord}>
        Download Word
      </Button> */}
    </div>
    </div>
  );
};

export default Home;