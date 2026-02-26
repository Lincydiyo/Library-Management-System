// LibraryBackEnd/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));

// Test default route
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Library backend is running!" });
});

// Example test route
app.get("/books", (req, res) => {
  res.status(200).json({ status: "success", books: ["Book 1", "Book 2", "Book 3"] });
});

// 404 handler for unknown routes
app.all("*", (req, res) => {
  res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});