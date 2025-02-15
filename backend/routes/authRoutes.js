const express = require('express');
const router = express.Router();
const { signup, login } = require('../services/authService');

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await signup(username, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
