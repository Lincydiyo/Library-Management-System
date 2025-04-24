const express = require("express");
const cors = require("cors");
const parse = require("body-parser");
const dotenv = require("dotenv");
const dbconnection = require("./config/dbConnection");
const mainRoute = require("./router/index");
const errorMiddleware = require("./middleware/error.middleware");
const AppError = require("./utils/appError");

dotenv.config();

const app = express();
app.use(cors());
app.use(parse.json());
app.use(express.static(`${__dirname}/upload`));
app.use("/", mainRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorMiddleware);
app.listen(5000, () => console.log("Your port is running on 5000"));
