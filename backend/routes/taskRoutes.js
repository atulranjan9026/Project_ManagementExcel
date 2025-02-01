const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasks);
router.post('/add-task', taskController.addTask);
router.get('/download-excel', taskController.downloadExcel);
router.put('/edit-task/:id', taskController.editTask);
router.delete('/delete-task/:id', taskController.deleteTask);

module.exports = router;
