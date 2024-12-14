const mongoose = require('mongoose');

// Define the Infant schema
const infantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Remove leading and trailing spaces
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true
  },
  birthWeight: {
    type: Number,  // Birth weight in kilograms or pounds, depending on your requirement
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],  // Restrict to predefined gender options
    required: true,
  },
  healthStatus: {
    type: String,
    default: 'Healthy',  // Default health status
    enum: ['Healthy', 'Critical', 'Needs Attention', 'Recovered'],
  },
  vaccinations: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,  // Automatically add `createdAt` and `updatedAt` fields
});

// Create the Infant model
const Infant = mongoose.model('Infant', infantSchema);

module.exports = Infant;
