const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const dbConnection = require("./config/dbConnection");
const mainRoute = require("./router/index");
const errorMiddleware = require("./middleware/error.middleware");
const AppError = require("./utils/appError");

dotenv.config();

// Connect to MongoDB
dbConnection();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));

// Root route for health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Library Backend is live!" });
});

// Routes
app.use("/api", mainRoute);

// Catch all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});