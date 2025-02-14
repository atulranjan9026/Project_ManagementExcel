const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const { generateWord } = require('../services/wordService');
const { generatePdf } = require('../services/pdfService');
const Task = require('../models/Task'); // Assuming you have a Task model
const fs = require('fs');
const path = require('path');

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
});

router.post('/add-task', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add task', error });
  }
});

router.put('/edit-task/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }
});

router.delete('/delete-task/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error });
  }
});

router.get('/download-word/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    const filePath = await generateWord([task]);
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error('Error generating Word document:', error);
    res.status(500).send('Error generating Word document');
  }
});

router.get('/download-pdf/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    const filePath = await generatePdf([task]);
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error('Error generating PDF document:', error);
    res.status(500).send('Error generating PDF document');
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Uploading file to Cloudinary...');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('File Path:', req.file.path);

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto', // Automatically detect file type (image, video, raw)
    });

    console.log('File uploaded successfully:', result.secure_url);

    // Save document URL to the database
    const taskId = req.body.taskId;
    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid Task ID' });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.documentUrl = result.secure_url;
    await task.save();

    // Respond with Cloudinary URL
    res.status(200).json({
      message: 'File uploaded successfully!',
      url: result.secure_url, // Secure URL of the uploaded file
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to upload file.', error: error.message });
  }
});

module.exports = router;