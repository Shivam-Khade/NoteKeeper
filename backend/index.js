import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import noteRoutes from './routes/note.route.js'
import cors from 'cors'

const app = express()

dotenv.config()

const port = process.env.PORT || 4002

// Database Connection
try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to MongoDB")
}
catch (error) {
    console.error("Error connecting to MongoDB:", error)
}

// Routing Middleware
app.use(express.json())
app.use(cors())
app.use("/api/v1/noteapp", noteRoutes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
