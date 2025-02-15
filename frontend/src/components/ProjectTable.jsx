import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import './ProjectTable.css'; // Import the CSS file
import { downloadPdf, downloadWord, uploadFile } from "../services/api";
import { toast } from "react-toastify";

const ProjectTable = ({ projects, formatDate, startEditProject, deleteProject }) => {
  const [loading, setLoading] = useState(false); // Loading state for file upload

  const handleDownloadPdf = async (id) => {
    try {
      const blob = await downloadPdf(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `task_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      // toast.error("Error downloading the PDF file");
      console.error("Error downloading the PDF file", err);
    }
  };

  const handleDownloadWord = async (id) => {
    try {
      const blob = await downloadWord(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `task_${id}.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast.error("Error downloading the Word file");
      console.error("Error downloading the Word file", err);
    }
  };

  const handleUploadFile = async (file, taskId) => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setLoading(true);
    try {
      const response = await uploadFile(file, taskId);
      toast.success("File uploaded successfully!");
      console.log(response);
    } catch (err) {
      toast.error("Error uploading the file");
      console.error("Error uploading the file", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table striped bordered hover responsive className="project-table-container">
      <thead>
        <tr>
          <th>#</th>
          <th>Affected URL</th>
          <th>CVE</th>
          <th>Description</th>
          <th>Input</th>
          <th>Reference</th>
          <th>Mitigation</th>
          <th>Status</th>
          <th>Document</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={project._id}>
            <td>{index + 1}</td>
            <td>{project.affectedHosts}</td>
            <td>{project.cve}</td>
            <td>{project.description}</td>
            <td>{project.input}</td>
            <td>{project.reference}</td>
            <td>{project.mitigation}</td>
            <td>{project.status}</td>
            <td>
              {project.documentUrl ? (
                <a href={project.documentUrl} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              ) : (
                'No document uploaded'
              )}
            </td>
            <td className="buttons-container">
              <Button
                variant="warning"
                className="me-2"
                onClick={() => startEditProject(project)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => deleteProject(project._id)}>
                Delete
              </Button>
              <Button variant="success" onClick={() => handleDownloadPdf(project._id)}>
                Download PDF
              </Button>
              <Button variant="primary" onClick={() => handleDownloadWord(project._id)}>
                Download Word
              </Button>
              <div className="upload-container">
              <label htmlFor="">POC </label>
              <input
                type="file"
                onChange={(e) => handleUploadFile(e.target.files[0], project._id)}
                disabled={loading} // Disable input while uploading
              />
              {loading && <p>Uploading file...</p>}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectTable;