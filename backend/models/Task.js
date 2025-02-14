const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  affectedHosts: { type: String, required: true },
  cve: { type: String, required: true },
  description: { type: String, required: true },
  input: { type: String, required: true },
  reference: { type: String, required: true },
  mitigation: { type: String, required: true },
  status: { type: String, required: true, enum: ['Open', 'Close'], default: 'Open' },
  file: { type: String },
  documentUrl: { type: String }, // Add this field
});

module.exports = mongoose.model('Task', taskSchema);