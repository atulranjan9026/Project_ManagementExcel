const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasks);
router.post('/add-task', taskController.addTask);
router.put('/edit-task/:id', taskController.editTask);
router.delete('/delete-task/:id', taskController.deleteTask);
router.get('/download-pdf', taskController.downloadPdf);
router.get('/download-word', taskController.downloadWord);

module.exports = router;
