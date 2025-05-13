const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require("mongodb")
const bcrypt = require("bcryptjs")

const app = express()
const port = 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
const uri =
  "mongodb+srv://securebankdb:ridoy007@cluster0.0b7ezwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

// Database and collections
let db
let usersCollection

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    db = client.db("securebankdb")
    usersCollection = db.collection("users")

    // Create a unique index on email to prevent duplicate registrations
    await usersCollection.createIndex({ email: 1 }, { unique: true })

    console.log("Database and collections initialized")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
  }
}

// Connect to MongoDB when server starts
connectToMongo()

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accounts: {
        current: 5400,
        savings: 10200,
      },
      createdAt: new Date(),
    }

    // Insert user into database
    const result = await usersCollection.insertOne(newUser)

    // Return success response without password
    const { password: _, ...userWithoutPassword } = newUser
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error during registration" })
  }
})

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    // Find user by email
    const user = await usersCollection.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    res.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error during login" })
  }
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
