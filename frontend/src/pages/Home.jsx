import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ProjectForm from "../components/ProjectForm";
import ProjectTable from "../components/ProjectTable";
import { fetchProjects, addProject, editProject, deleteProject, downloadExcel } from "../services/api";
import { formatDate } from "../utils/dateFormatter";
import { toast } from "react-toastify";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectName: "",
    projectPlanning: [],
    marketResearch: "",
    contentCreation: "",
    codingDevelopment: "",
    testingDebugging: "",
    uiDesign: "",
    startDeliveryDate: "",
    finalDeliveryDate: "",
  });

  const [editingProject, setEditingProject] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown

  const teamMembers = {
    projectPlanning: ["Alice Roberts", "Brian Mitchell", "Catherine Evans"],
    marketResearch: ["George Bennett", "Hannah Scott", "Isaac Cooper"],
    contentCreation: ["Nathan Rogers", "Olivia Sanders", "Patrick Kelly"],
    codingDevelopment: ["Ursula Grant", "Victor Ross", "Wendy Simmons"],
    testingDebugging: ["Blake Stewart", "Caroline Peterson", "Derek Barnes"],
    uiDesign: ["Isabelle Foster", "Jack Richards", "Katherine Dean"],
  };

  useEffect(() => {
    fetchProjects().then((data) => {
      const formattedData = data.map((project) => ({
        ...project,
        projectPlanning: Array.isArray(project.projectPlanning)
          ? project.projectPlanning
          : [],
      }));
      setProjects(formattedData);
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

  const handleEmployeeSelection = (employee) => {
    setSelectedEmployees((prev) =>
      prev.includes(employee)
        ? prev.filter((emp) => emp !== employee)
        : [...prev, employee]
    );
  };

  const saveSelectedEmployees = () => {
    setNewProject((prev) => ({
      ...prev,
      projectPlanning: selectedEmployees,
    }));
    setShowDropdown(false); // Hide the dropdown after saving
  };

  const handleAddProject = async () => {
    if (!newProject.startDeliveryDate || !newProject.finalDeliveryDate) {
        toast.error("Please provide both Start and Final Delivery Dates!"); // Error toast
      return;
    }

    if (newProject.startDeliveryDate >= newProject.finalDeliveryDate) {
        toast.error("Start Delivery Date must be before Final Delivery Date!"); // Error toast
      return;
    }

    const payload = {
      ...newProject,
      projectPlanning: Array.isArray(newProject.projectPlanning)
        ? newProject.projectPlanning
        : [newProject.projectPlanning],
    };

    try {
      await addProject(payload);
      const data = await fetchProjects();
      setProjects(data);
      setNewProject({
        projectName: "",
        projectPlanning: [],
        marketResearch: "",
        contentCreation: "",
        codingDevelopment: "",
        testingDebugging: "",
        uiDesign: "",
        startDeliveryDate: "",
        finalDeliveryDate: "",
      });
      setSelectedEmployees([]);
      toast.success("Project added successfully!"); // Success toast
    } catch (error) {   toast.error(
        error.response?.data?.message || "Failed to add project. Please try again."
      ); 
      console.error("Error:", error);
    }
  };

  const handleSaveEditProject = async () => {
    if (editingProject.startDeliveryDate >= editingProject.finalDeliveryDate) {
        toast.error("Start Delivery Date must be before Final Delivery Date!");
      return;
    }

    const updatedProject = {
      ...editingProject,
      projectPlanning: selectedEmployees,
    };

    try {
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

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadExcel();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tasks.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log("Error downloading the file", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Project Management System</h2>
      <ProjectForm
        newProject={newProject}
        editingProject={editingProject}
        handleChange={handleChange}
        handleEditChange={handleEditChange}
        teamMembers={teamMembers}
        selectedEmployees={selectedEmployees}
        handleEmployeeSelection={handleEmployeeSelection}
        saveSelectedEmployees={saveSelectedEmployees}
        addProject={handleAddProject}
        saveEditProject={handleSaveEditProject}
      />
      <ProjectTable
        projects={projects}
        formatDate={formatDate}
        startEditProject={(project) => {
          setEditingProject(project);
          setSelectedEmployees(project.projectPlanning);
          toast.info("You can now edit the project details.");
        }}
        deleteProject={handleDeleteProject}
      />
      <Button variant="success" onClick={handleDownloadExcel}>
        Download Excel
      </Button>
    </div>
  );
};

export default Home;