const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { erroHandler, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 6000

// Connect to the database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Managament System API' })
  })

}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))