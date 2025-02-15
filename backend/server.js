const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const downloadRoutes = require('./routes/download'); // Import downloadRoutes
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
require('dotenv').config(); // Load environment variables
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Use express.json() instead of bodyParser.json()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

app.use('/auth', authRoutes); // Use authRoutes
// app.use('/uploads', express.static(uploadsDir));
app.use('/api', apiRoutes);
app.use('/download', downloadRoutes); // Use downloadRoutes