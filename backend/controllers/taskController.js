const Task = require('../models/Task');
const pdfService = require('../services/pdfService');
const wordService = require('../services/wordService');

// Fetch all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks." });
  }
};

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit an existing task
exports.editTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task." });
  }
};

// Download tasks as PDF
exports.downloadPdf = async (req, res) => {
  try {
    const tasks = await Task.find();
    const filePath = await pdfService.generatePdf(tasks);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate PDF." });
  }
};

// Download tasks as Word
exports.downloadWord = async (req, res) => {
  try {
    const tasks = await Task.find();
    const filePath = await wordService.generateWord(tasks);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate Word document." });
  }
};

