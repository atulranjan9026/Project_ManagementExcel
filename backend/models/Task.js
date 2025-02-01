const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Project name is required."],
    trim: true,
  },
  projectPlanning: {
    type: [String],
    required: [true, "Project planning is required."],
    validate: {
      validator: function (value) {
        return value.length > 0; // Ensure the array is not empty
      },
      message: "Project planning must contain at least one task.",
    },
  },
  marketResearch: {
    type: String,
    required: [true, "Market research is required."],
    trim: true,
  },
  contentCreation: {
    type: String,
    required: [true, "Content creation is required."],
    trim: true,
  },
  codingDevelopment: {
    type: String,
    required: [true, "Coding and development is required."],
    trim: true,
  },
  testingDebugging: {
    type: String,
    required: [true, "Testing and debugging is required."],
    trim: true,
  },
  uiDesign: {
    type: String,
    required: [true, "UI design is required."],
    trim: true,
  },
  startDeliveryDate: {
    type: Date,
    required: [true, "Start delivery date is required."],
  },
  finalDeliveryDate: {
    type: Date,
    required: [true, "Final delivery date is required."],
    validate: {
      validator: function (value) {
        return value > this.startDeliveryDate; // Ensure final date is after start date
      },
      message: "Final delivery date must be after the start delivery date.",
    },
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

// Export the model
module.exports = mongoose.model('Task', taskSchema);