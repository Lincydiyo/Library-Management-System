const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const dbConnection = require("./config/dbConnection"); // connects to MongoDB
const mainRoute = require("./router/index");
const errorMiddleware = require("./middleware/error.middleware");
const AppError = require("./utils/appError");

dotenv.config(); // load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/upload`));

// Routes
app.use("/", mainRoute);

// Catch-all for unknown routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling
app.use(errorMiddleware);

// Connect to MongoDB
dbConnection(); // Make sure this is a function that uses process.env.MONGO_URI

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));