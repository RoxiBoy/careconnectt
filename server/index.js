require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectdb = require('./database/connectdb')

const DATABASE_URI = process.env.MONGO_URI 
const PORT = process.env.PORT

// Database connection
connectdb(DATABASE_URI)

// Server init
const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log('Server is up and running')
})

// Route
const motherRoutes = require('./routes/motherRoutes')
const infantRoutes = require('./routes/infantRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/api/mother', motherRoutes)
app.use('/api/infant', infantRoutes)
app.use('/api/user', userRoutes)

// SMS

const { sendSMS } = require('./sms')

// sendSMS('9779816015362', 'Hey buddy')











