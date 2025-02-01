import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
const ProjectForm = ({
  newProject,
  editingProject,
  handleChange,
  handleEditChange,
  teamMembers,
  selectedEmployees,
  handleEmployeeSelection,
  saveSelectedEmployees,
  addProject,
  saveEditProject,
  setShowDropdown, // Pass setShowDropdown as a prop
}) => {
  const [showDropdown, setShowDropdownLocal] = useState(false); // Local state for dropdown visibility

  const handleSave = () => {
      saveSelectedEmployees(); // Call the parent's save function
      setShowDropdownLocal(false); // Hide the dropdown locally
      
  };

  return (
    <div className="d-flex flex-wrap gap-3 mb-3">
      <Form.Control
        type="text"
        placeholder="Project Name"
        name="projectName"
        value={editingProject ? editingProject.projectName : newProject.projectName}
        onChange={editingProject ? handleEditChange : handleChange}
        className={editingProject ? "editingForm" : ""}
      />

      {/* Project Planning Dropdown */}
      <div className="position-relative">
        <Button variant="secondary" onClick={() => setShowDropdownLocal(!showDropdown)}>
          Select Project Planning
        </Button>

        {showDropdown && (
          <div className="dropdown-menu show p-3" style={{ width: "300px" }}>
            {teamMembers.projectPlanning.map((employee, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={employee}
                checked={selectedEmployees.includes(employee)}
                onChange={() => handleEmployeeSelection(employee)}
              />
            ))}
            <Button variant="primary" onClick={handleSave} className="mt-2">
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Other Form Fields */}
      {Object.keys(teamMembers)
        .filter((key) => key !== "projectPlanning")
        .map((key) => (
          <Form.Select
            key={key}
            name={key}
            value={editingProject ? editingProject[key] : newProject[key]}
            onChange={editingProject ? handleEditChange : handleChange}
            className={editingProject ? "editingForm" : ""}
          >
            <option>Select {key.replace(/([A-Z])/g, " $1")}</option>
            {teamMembers[key].map((emp, index) => (
              <option key={index} value={emp}>
                {emp}
              </option>
            ))}
          </Form.Select>
        ))}

      <Form.Control
        type="date"
        name="startDeliveryDate"
        value={
          editingProject
            ? editingProject.startDeliveryDate.split("T")[0]
            : newProject.startDeliveryDate
        }
        onChange={editingProject ? handleEditChange : handleChange}
        className={editingProject ? "editingForm" : ""}
      />

      <Form.Control
        type="date"
        name="finalDeliveryDate"
        value={
          editingProject
            ? editingProject.finalDeliveryDate.split("T")[0]
            : newProject.finalDeliveryDate
        }
        min={
          editingProject
            ? editingProject.startDeliveryDate
            : newProject.startDeliveryDate
        }
        onChange={editingProject ? handleEditChange : handleChange}
        className={editingProject ? "editingForm" : ""}
      />

      {editingProject ? (
        <Button variant="primary" onClick={saveEditProject}>
          Save Changes
        </Button>
      ) : (
        <Button variant="primary" onClick={addProject}>
          Add Project
        </Button>
      )}
    </div>
  );
};

export default ProjectForm;