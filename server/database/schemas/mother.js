const mongoose = require('mongoose');

// Define the schema
const motherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,  // Remove leading and trailing spaces
  },
  lastName: {
    type: String,
    required: true,
    trim: true,  // Remove leading and trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please fill a valid email address'], // Email format validation
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  trimester: {
    type: {
      first: {
        type: Boolean,
        default: false,
      },
      second: {
        type: Boolean,
        default: false,
      },
      third: {
        type: Boolean,
        default: false,
      },
    },
    default: {},  // Ensures trimester is an empty object by default
  },
 address: {
    type: String,
    required: true,
    trim: true,  // Clean up any unwanted spaces
  },
  phoneNo: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'],  // Phone number validation (international format)
  },
  childrenNo: {
    type: Number,
    required: true,
    min: 0,  // Ensure childrenNo is not negative
  },
  pregnanciesNo: {
    type: Number,
    required: true,
    min: 0,  // Ensure pregnanciesNo is not negative
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  fetusCount: {
    type: Number,
    required: true,
    min: 1,  // Ensure fetus count is at least 1 (no negatives or zero)
  },
  children: [{
    type: String,
}]
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

// Index the email field to improve search performance
motherSchema.index({ email: 1 });

const Mother = mongoose.model('Mother', motherSchema);

module.exports = Mother;
