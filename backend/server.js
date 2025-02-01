const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config(); // Load environment variables
require('./config/db');  // MongoDB connection

const app = express();

app.use(cors({ origin: "*" })); // Allow all origins
app.use(bodyParser.json());
app.use('/api', taskRoutes);  

app.get('/', (req, res) => {
  res.send('Hello World!')
})
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});