import React from "react";
import { Table, Button } from "react-bootstrap";

const ProjectTable = ({ projects, formatDate, startEditProject, deleteProject }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Project Name</th>
          <th>Project Planning</th>
          <th>Market Research</th>
          <th>Content Creation</th>
          <th>Coding and Development</th>
          <th>Testing and Debugging</th>
          <th>UI Design</th>
          <th>Start Date</th>
          <th>Final Delivery Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={project._id}>
            <td>{index + 1}</td>
            <td>{project.projectName}</td>
            <td>
              {Array.isArray(project.projectPlanning)
                ? project.projectPlanning
                    .map((employee, index) => `${index + 1}. ${employee}`)
                    .join("\n")
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                : String(project.projectPlanning)}
            </td>
            <td>{project.marketResearch}</td>
            <td>{project.contentCreation}</td>
            <td>{project.codingDevelopment}</td>
            <td>{project.testingDebugging}</td>
            <td>{project.uiDesign}</td>
            <td>
              {project.startDeliveryDate
                ? formatDate(project.startDeliveryDate)
                : "N/A"}
            </td>
            <td>
              {project.finalDeliveryDate
                ? formatDate(project.finalDeliveryDate)
                : "N/A"}
            </td>
            <td>
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
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectTable;