const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const mainRoute = require("./router/index");
const errorMiddleware = require("./middleware/error.middleware");
const AppError = require("./utils/appError");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));

// Routes
app.use("/", mainRoute);

// Handle unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));