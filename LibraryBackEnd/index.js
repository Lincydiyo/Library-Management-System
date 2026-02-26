// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");

// Load env variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));

// Routes
const mainRoute = require("./router/index");
app.use("/", mainRoute);

// Default route for Render health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Library backend is running!" });
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
});

// Use Render PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});