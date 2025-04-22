const express = require("express");
const app = express();
const dbconnection = require("./config/dbConnection");
const cors = require("cors");
const parse = require("body-parser");
const mainRoute = require("./router/index");
const errorMiddleware = require("./middleware/error.middleware");
const AppError = require("./utils/appError");

app.use(cors());
app.use(parse.json());
app.use(express.static(`${__dirname}/upload`));
app.use("/", mainRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorMiddleware);
app.listen(5000, () => console.log("Your port is running on 5000"));
