
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Mock user credentials
const mockUser = {
  email: "demo@nexora.com",
  password: "Demo@123",
};

// Test route
app.get("/", (req, res) => {
  res.send("NEXORA Backend is Running!");
});

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  // Check empty fields
  if (typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  // Verify mock credentials
  if (
    email.trim().toLowerCase() === mockUser.email &&
    password === mockUser.password
  ) {
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        name: "Demo User",
        email: mockUser.email,
      },
    });
  }

  // Incorrect credentials
  return res.status(401).json({
    success: false,
    message: "Invalid email or password.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
