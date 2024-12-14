const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please provide a valid email address'], // Email format validation
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],  // Password length validation
  },
  mothers: [{
    type: String
  }],
  infants: [{
    type: String
  }]
}, {
  timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;
