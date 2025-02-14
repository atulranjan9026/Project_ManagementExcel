const express = require('express');
const router = express.Router();
const { generateWord } = require('../services/wordService');
const { generatePdf } = require('../services/pdfService');
const Task = require('../models/Task'); // Assuming you have a Task model
const fs = require('fs');
const path = require('path');

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

module.exports = router;
