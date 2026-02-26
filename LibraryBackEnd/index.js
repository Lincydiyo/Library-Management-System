const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const mainRoute = require("./router/index"); // Your API routes
const AppError = require("./utils/appError");
const errorMiddleware = require("./middleware/error.middleware");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));

// Root route (for live check)
app.get("/", (req, res) => {
  res.json({ status: "success", message: "Backend is live!" });
});

// API Routes
app.use("/api", mainRoute);

// Catch all unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));