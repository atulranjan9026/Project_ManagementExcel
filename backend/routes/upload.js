const express = require('express');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload'); // Multer middleware
const router = express.Router();

// Upload endpoint
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto', // Automatically detect file type (image, video, raw)
    });

    // Respond with Cloudinary URL
    res.status(200).json({
      message: 'File uploaded successfully!',
      url: result.secure_url, // Secure URL of the uploaded file
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload file.', error: error.message });
  }
});

module.exports = router;