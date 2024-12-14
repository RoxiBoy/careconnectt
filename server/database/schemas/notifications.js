const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
