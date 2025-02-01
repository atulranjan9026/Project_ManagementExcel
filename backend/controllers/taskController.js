const Task = require('../models/Task');
const xlsx = require('xlsx');
const fs = require('fs');
const { generateExcel } = require('../services/excelService');
const { validateTaskData, validateDates } = require('../utils/validation');

// Controller for getting tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while fetching tasks." });
  }
};

// Controller for adding a task
exports.addTask = async (req, res) => {
  const { projectName, projectPlanning, marketResearch, contentCreation, codingDevelopment, testingDebugging, uiDesign, startDeliveryDate, finalDeliveryDate } = req.body;

  const error = validateTaskData(req.body);
  if (error) return res.status(400).json(error);

  const dateError = validateDates(startDeliveryDate, finalDeliveryDate);
  if (dateError) return res.status(400).json(dateError);

  const task = new Task({ projectName, projectPlanning, marketResearch, contentCreation, codingDevelopment, testingDebugging, uiDesign, startDeliveryDate, finalDeliveryDate });
  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "An error occurred while saving the task." });
  }
};

// Controller for generating Excel
exports.downloadExcel = async (req, res) => {
  try {
    const tasks = await Task.find();
    const filePath = await generateExcel(tasks);
    res.download(filePath, "tasks.xlsx", (err) => {
      if (err) console.error("Error downloading file:", err);
      fs.unlinkSync(filePath);  // Delete the file after download
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating the Excel file", error: err.message });
  }
};
