import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import './ProjectForm.css'; // Import the CSS file
import { toast } from "react-toastify";
import { uploadFile } from "../services/api";
const ProjectForm = ({
  newProject,
  editingProject,
  handleChange,
  handleEditChange,
  addProject,
  saveEditProject,
}) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setStatus(editingProject.status);
    }
  }, [editingProject]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    // if (!file && !editingProject) {
    //   toast.error('Please select a file to upload.');
    //   return;
    // }

    // if (!newProject.affectedHosts || !newProject.cve || !newProject.description || !newProject.input || !newProject.reference || !newProject.mitigation) {
    //   toast.error('Please fill all required fields.');
    //   return;
    // }

    setLoading(true);
    try {
      if (editingProject) {
        await saveEditProject(file, status);
      } else {
        await addProject(file, status);
      }
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 const handleUploadFile = async (file) => {
    try {
      const response = await uploadFile(file, editingProject ? editingProject._id : newProject._id);
      toast.success("File uploaded successfully!");
      console.log(response);
    } catch (err) {
      // toast.error("Error uploading the file");
      console.error("Error uploading the file", err);
    }
  };
  return (
    <div className="auth-container">
      <div className="form-group">
        <label>Affected URL:</label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Affected URL"
          name="affectedHosts"
          value={editingProject ? editingProject.affectedHosts : newProject.affectedHosts}
          onChange={editingProject ? handleEditChange : handleChange}
          className={editingProject ? "editingForm" : ""}
        />
      </div>
      
      <div className="form-group">
        <label>CVE:</label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter CVE"
          name="cve"
          value={editingProject ? editingProject.cve : newProject.cve}
          onChange={editingProject ? handleEditChange : handleChange}
          className={editingProject ? "editingForm" : ""}
        />
      </div>
      
      <div className="form-group">
        <label>Description:</label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          name="description"
          value={editingProject ? editingProject.description : newProject.description}
          onChange={editingProject ? handleEditChange : handleChange}
          className={editingProject ? "editingForm" : ""}
        />
      </div>
      
      <div className="form-group">
        <label>Input:</label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter input"
          name="input"
          value={editingProject ? editingProject.input : newProject.input}
          onChange={editingProject ? handleEditChange : handleChange}
          className={editingProject ? "editingForm" : ""}
        />
      </div>
      
      <div className="form-group">
        <label>Reference:</label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter reference"
          name="reference"
          value={editingProject ? editingProject.reference : newProject.reference}
          onChange={editingProject ? handleEditChange : handleChange}
          className={editingProject ? "editingForm" : ""}
        />
      </div>
      
      <div className="form-group">
        <label>Mitigation:</label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter mitigation"
          name="mitigation"
          value={editingProject ? editingProject.mitigation : newProject.mitigation}
          onChange={editingProject ? handleEditChange : handleChange}
          className={editingProject ? "editingForm" : ""}
        />
      </div>
      
      <div className="pocStatus">
        <div className="mt-3">
          {/* <label>POC:</label>
          <input
                type="file"
                onChange={(e) => handleUploadFile(e.target.files[0])}
              />
          {file && <p>Selected file: {file.name}</p>} */}
        </div>
        <div className="mt-3">
          <label>Status:</label>
          <Form.Check
            type="radio"
            label="Open"
            name="status"
            value="Open"
            checked={status === "Open"}
            onChange={handleStatusChange}
          />
          <Form.Check
            type="radio"
            label="Close"
            name="status"
            value="Close"
            checked={status === "Close"}
            onChange={handleStatusChange}
          />
        </div>
      </div>

      <Button variant="primary" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : (editingProject ? 'Save Changes' : 'Add Project')}
      </Button>
    </div>
  );
};

export default ProjectForm;